import { HeroSection } from "@/components/marketing/HeroSection";
import { TrustedLogosSection } from "@/components/marketing/TrustedLogosSection";
import { FeatureSwitcherSection } from "@/components/marketing/FeatureSwitcherSection";
import { SmartTrafficDeepDive } from "@/components/marketing/SmartTrafficDeepDive";
import { TemplateShowcaseSection } from "@/components/marketing/TemplateShowcaseSection";
import { RoiMetricsSection } from "@/components/marketing/RoiMetricsSection";
import { TestimonialsSection } from "@/components/marketing/TestimonialsSection";
import { FinalCtaBanner } from "@/components/marketing/FinalCtaBanner";

export default function MarketingHomePage() {
  return (
    <div className="min-h-screen bg-white text-[#141414]">
      {/* Section 1: Hero + Interactive AI Builder & Preset Preview */}
      <HeroSection />

      {/* Section 2: Social Proof Logo Strip */}
      <TrustedLogosSection />

      {/* Section 3: Interactive 4-Way Feature Switcher Tabs */}
      <FeatureSwitcherSection />

      {/* Section 4: Smart Traffic AI Routing & Dynamic Text Replacement Deep-Dive */}
      <SmartTrafficDeepDive />

      {/* Section 5: High-Converting Template Showcase with Filter Tabs & Previews */}
      <TemplateShowcaseSection />

      {/* Section 6: Deep Ink Conversion Benchmarks Band */}
      <RoiMetricsSection />

      {/* Section 7: Customer Stories & Measurable ROI Grid */}
      <TestimonialsSection />

      {/* Section 8: High-Impact Conversion Closer Banner */}
      <FinalCtaBanner />
    </div>
  );
}
