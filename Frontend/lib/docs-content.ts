export const docContent: Record<string, { title: string; description: string; sections: { id: string; subtitle: string; text: string }[] }> = {
    "getting-started": {
        title: "Getting Started",
        description: "Learn the basics and create your first track",
        sections: [
            { id: "quick-start", subtitle: "Quick Start Guide", text: "Welcome to iRenown! To get started immediately, head to the Studio, upload a clear vocal sample, select 'Pop' genre, and hit Produce. Our AI will handle the rest." },
            { id: "platform-overview", subtitle: "Platform Overview", text: "iRenown is a professional AI music production suite. We combine vocal enhancement with generative instrumentation to create studio-quality music in minutes." },
            { id: "account-setup", subtitle: "Account Setup", text: "Create your profile to save projects and manage credits. Every new user receives 1 free trial generation to explore our premium output quality." }
        ]
    },
    "uploading-vocals": {
        title: "Uploading Vocals",
        description: "Best practices for vocal recording and upload",
        sections: [
            { id: "supported-formats", subtitle: "Supported Formats", text: "We support high-quality WAV and MP3 files. For professional results, we recommend 44.1kHz / 24-bit WAV files." },
            { id: "recording-tips", subtitle: "Recording Tips", text: "Record in a quiet environment. Use a pop filter and keep a consistent distance from the microphone to ensure your AI generation has the best possible input." },
            { id: "audio-requirements", subtitle: "Audio Requirements", text: "Files should be under 50MB and up to 10 minutes long. Ensure the vocal is 'dry' (no reverb or delay) for the most flexible AI processing." }
        ]
    },
    "ai-generation": {
        title: "AI Generation",
        description: "Understanding instrumental and mixing options",
        sections: [
            { id: "genre-selection", subtitle: "Genre Selection", text: "Choose from Pop, Rock, EDM, Jazz, or Hip-Hop. Each genre features unique instruments and professional arrangement logic tailored to your vocals." },
            { id: "style-prompts", subtitle: "Style Prompts", text: "Guide the mood of your track by adding prompts like 'energetic', 'soulful', 'dark', or 'cinematic' to specialize the AI's creative direction." },
            { id: "quality-tiers", subtitle: "Quality Tiers", text: "Premium tracks use our high-fidelity generation engine with multi-layered instrumentation and advanced stereo imaging for a commercial-grade sound." }
        ]
    },
    "mixing-mastering": {
        title: "Mixing & Mastering",
        description: "Fine-tune your final track",
        sections: [
            { id: "vocal-effects", subtitle: "Vocal Effects", text: "Our engine automatically applies professional compression, EQ, and optional transparent pitch correction to ensure your vocals sound polished." },
            { id: "mix-controls", subtitle: "Mix Controls", text: "The AI balances vocal clarity against the generated instrumental, ensuring no frequencies clash and the production remains transparent and powerful." },
            { id: "mastering-options", subtitle: "Mastering Options", text: "Every track is finalized with Loudnorm normalization, matching industry loudness standards while preserving the dynamic range of your performance." }
        ]
    },
    "exporting": {
        title: "Exporting",
        description: "Download and share your finished music",
        sections: [
            { id: "file-formats", subtitle: "File Formats", text: "Export your mastered track in 320kbps MP3 for quick sharing or 24-bit Lossless WAV for professional use and distribution." },
            { id: "stem-downloads", subtitle: "Stem Downloads", text: "Premium users can download separate stems for vocals, drums, bass, and melodic elements, providing full control for secondary mixing in any DAW." },
            { id: "sharing-options", subtitle: "Sharing Options", text: "Directly share your tracks to social media or generate a private listening link for collaborators to review your production." }
        ]
    },
    "api-reference": {
        title: "API Reference",
        description: "Integrate iRenown into your workflow",
        sections: [
            { id: "authentication", subtitle: "Authentication", text: "Secure your requests using your private API Key. Pass the 'x-api-key' header with every request to our production endpoints." },
            { id: "endpoints", subtitle: "Endpoints", text: "Access our core production via the /api/produce POST endpoint. You can monitor project status and fetch results programmatically." },
            { id: "webhooks", subtitle: "Webhooks", text: "Register a webhook URL to receive automated POST notifications the moment your AI generation and mastering process is complete." }
        ]
    }
}
