import Image from "next/image";
import Head from "next/head";
import HeroSection from "@/components/landingPage/HeroSection";
import CTASection from "@/components/landingPage/CTASection";
import ExampleStrategy from "@/components/landingPage/ExampleStrategy";
import FeaturesSection from "@/components/landingPage/FeatureSection";
import HowItWorks from "@/components/landingPage/HowItWorks";

export default function Home() {
    return (
        <>
            <Head>
                <title>AI Trading Assistant | Coming Soon</title>
                <meta name="description" content="Automate your trading strategy with AI" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className="min-h-screen bg-forex-elegant text-white">
    <div className="bg-black/80 backdrop-blur-sm">
        <HeroSection />
        <FeaturesSection />
        <HowItWorks />
        <ExampleStrategy />
        <CTASection />
    </div>
</main>
        </>
    );
}
