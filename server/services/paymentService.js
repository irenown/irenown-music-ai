import Stripe from 'stripe';
import db from './database.js';

/**
 * Service to handle Stripe payments and subscriptions
 */
class PaymentService {
    constructor() {
        this.stripe = null;
        if (process.env.STRIPE_SECRET_KEY) {
            this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
        }
    }

    /**
     * Creates a Stripe Checkout Session for a subscription
     */
    async createSubscriptionSession(userId, priceId) {
        if (!this.stripe) throw new Error('Stripe is not configured');

        const user = db.prepare('SELECT * FROM users WHERE id = ?').get(userId);

        const session = await this.stripe.checkout.sessions.create({
            customer: user.stripe_customer_id || undefined,
            customer_email: user.stripe_customer_id ? undefined : `${user.username}@irenown.ai`, // Fallback for MVP
            payment_method_types: ['card'],
            line_items: [{ price: priceId, quantity: 1 }],
            mode: 'subscription',
            success_url: `${process.env.FRONTEND_URL}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.FRONTEND_URL}/payment/cancel`,
            metadata: { userId }
        });

        return session;
    }

    /**
     * Creates a Payment Intent for "Pay-per-song" (Premium Credits)
     */
    async createCreditSession(userId, amount = 1) {
        if (!this.stripe) throw new Error('Stripe is not configured');

        // Logic for one-time payment to buy credits
        // For MVP, we'll use a checkout session for simplicity
        const session = await this.stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [{
                price_data: {
                    currency: 'usd',
                    product_data: { name: 'iRenown Premium Song Credit' },
                    unit_amount: 500, // $5.00 per premium song
                },
                quantity: amount,
            }],
            mode: 'payment',
            success_url: `${process.env.FRONTEND_URL}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.FRONTEND_URL}/payment/cancel`,
            metadata: { userId, type: 'credit_purchase', amount }
        });

        return session;
    }

    /**
     * Handles Stripe Webhooks
     */
    async handleWebhook(event) {
        switch (event.type) {
            case 'checkout.session.completed':
                const session = event.data.object;
                const userId = session.metadata.userId;

                if (session.mode === 'subscription') {
                    // Update user to premium tier
                    db.prepare('UPDATE users SET tier = ?, subscription_id = ?, subscription_status = ?, stripe_customer_id = ? WHERE id = ?')
                        .run('platinum', session.subscription, 'active', session.customer, userId);
                } else if (session.metadata.type === 'credit_purchase') {
                    // Add premium credits
                    const credits = parseInt(session.metadata.amount);
                    db.prepare('UPDATE users SET premium_credits = premium_credits + ? WHERE id = ?')
                        .run(credits, userId);
                }
                break;

            case 'customer.subscription.deleted':
                const subscription = event.data.object;
                db.prepare('UPDATE users SET tier = ?, subscription_status = ? WHERE subscription_id = ?')
                    .run('silver', 'canceled', subscription.id);
                break;
        }
    }
}

export default new PaymentService();
