import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { OfficeLocationSection } from "@/components/OfficeLocationSection";
import { ConnectContactSection } from "@/components/ConnectContactSection";
import { ArrowRight, Facebook, Instagram, Youtube, Award, Users, Home, Heart, Quote, Star } from "lucide-react";
import { MediumIcon, SubstackIcon } from "@/components/icons/SocialIcons";

const stats = [
  { icon: Home, value: "3,000+", label: "Families Helped" },
  { icon: Users, value: "41", label: "Years of Trust" },
  { icon: Star, value: "Top 1%", label: "MN Realtors" },
  { icon: Heart, value: "100%", label: "Client Focused" },
];

const socialLinks = [
  { icon: Facebook, href: "https://facebook.com/Advisors.West", label: "Facebook" },
  { icon: Instagram, href: "https://www.instagram.com/thehybridbroker/", label: "Instagram" },
  { icon: Youtube, href: "https://www.youtube.com/@HelloIamGregAnderson", label: "YouTube" },
  { icon: MediumIcon, href: "https://medium.com/@thehybridbroker", label: "Medium" },
  { icon: SubstackIcon, href: "https://substack.com/@helloiamgreganderson", label: "Substack" },
];

const serviceAreas = [
  "Chaska",
  "Chanhassen",
  "Victoria",
  "Eden Prairie",
  "Carver",
  "Waconia",
  "Mayer",
  "Cologne",
];

const designations = [
  "41 Years",
  "Trusted Advisor",
  "Top 1% MN",
  "Luxury Specialist",
  "Certified Negotiator",
  "Community Expert",
];

export default function About() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1">
        
        <OfficeLocationSection className="py-20 md:py-28 bg-secondary/30" />

        <ConnectContactSection
          className="py-20 md:py-28"
          title="Let’s Talk"
          description=""
        />

        <section className="py-14">
          <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
            <div className="flex items-center justify-center gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full bg-secondary hover:bg-primary hover:text-primary-foreground flex items-center justify-center transition-colors"
                  aria-label={social.label}
                  data-testid={`link-about-social-${social.label.toLowerCase()}`}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>

            <div className="mt-10 pt-10 border-t border-border/50">
              <a
                href="https://livingincarvercountypodcast.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-primary font-medium hover:gap-3 transition-all"
                data-testid="link-podcast-cta"
              >
                Listen to the Living In Carver County Podcast
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
