export const docContent: Record<string, { title: string; description: string; content: string[] }> = {
    "getting-started": {
        title: "Getting Started",
        description: "Learn the basics and create your first track",
        content: [
            "Welcome to iRenown! Our platform allows you to transform simple vocal recordings into professional-grade music tracks using advanced AI.",
            "**Step 1: Account Setup** - Create your account and explore the dashboard. Every new user gets 1 trial track (up to 1 minute) to test the quality.",
            "**Step 2: The Studio** - Head over to the Studio to start your first project. You'll need a vocal recording to begin.",
            "**Step 3: Pick a Genre** - Choose from our curated genres like Pop, Rock, EDM, or Jazz to define the sound of your track."
        ]
    },
    "uploading-vocals": {
        title: "Uploading Vocals",
        description: "Best practices for vocal recording and upload",
        content: [
            "The quality of your AI generation depends heavily on the quality of your input vocal.",
            "**Supported Formats**: We support MP3 and WAV files. For the best results, use high-bitrate WAV files.",
            "**Recording Tips**: Record in a quiet room with minimal reverb. Ensure your vocals are clear and not peaking (distorting).",
            "**Audio Requirements**: Files should be under 50MB. Aim for a dry vocal track without heavy existing effects for the most creative AI processing."
        ]
    },
    "ai-generation": {
        title: "AI Generation",
        description: "Understanding instrumental and mixing options",
        content: [
            "iRenown's AI generates a full instrumental backing that harmonizes perfectly with your vocals.",
            "**Genre Selection**: Each genre has a unique sonic signature. Pop is polished and catchy, while Rock features authentic guitar tones.",
            "**Style Prompts**: You can provide additional context to guide the AI, such as 'upbeat', 'melancholic', or 'high energy'.",
            "**Quality Tiers**: Standard generation is fast and efficient. Premium generation uses our most advanced models for maximum musicality and depth."
        ]
    },
    "mixing-mastering": {
        title: "Mixing & Mastering",
        description: "Fine-tune your final track",
        content: [
            "Once the instrumental is generated, our engine performs a professional mix and master.",
            "**Vocal Effects**: We apply intelligent EQ, compression, and optional auto-tune to make your vocals sit perfectly in the mix.",
            "**Mix Controls**: Our engine balances the levels between your vocals and the AI-generated instruments automatically.",
            "**Mastering Options**: Every track is mastered with commercial-grade loudness normalization (Loudnorm) to ensure it's radio-ready."
        ]
    },
    "exporting": {
        title: "Exporting",
        description: "Download and share your finished music",
        content: [
            "Your music is ready for the world. Here's how to take it further.",
            "**File Formats**: Download your final mix as a high-quality 320kbps MP3 or a lossless WAV file.",
            "**Stem Downloads**: Premium users can download 'stems' (separate tracks for vocals and instruments) for further mixing in any DAW like Ableton or Logic.",
            "**Sharing**: Use our built-in sharing tools to send your creation directly to social media or your collaborators."
        ]
    },
    "api-reference": {
        title: "API Reference",
        description: "Integrate iRenown into your workflow",
        content: [
            "Developers can leverage the iRenown engine through our secure REST API.",
            "**Authentication**: All requests require a valid API Key passed in the 'x-api-key' header.",
            "**Endpoints**: The `/api/produce` endpoint handles vocal processing and music generation.",
            "**Webhooks**: Set up webhooks to receive instant notifications when your project processing is complete."
        ]
    }
}
