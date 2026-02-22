import { Link } from "wouter";
import { useState } from "react";
import { ArrowRight, Home as HomeIcon, TrendingUp, Award, Users, Heart, Shield, MessageCircle, CheckCircle } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { BlogCard } from "@/components/BlogCard";
import { usePostPreviews } from "@/lib/postsApi";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ConnectContactSection } from "@/components/ConnectContactSection";

const highlights = [
  { icon: HomeIcon, value: "3,000+", label: "Families Helped" },
  { icon: TrendingUp, value: "41", label: "Years Experience" },
  { icon: Award, value: "Hall of Fame", label: "RE/MAX" },
  { icon: Users, value: "Since 1985", label: "Trusted" },
];

const whyChooseMe = [
  {
    icon: Heart,
    title: "I Care About Your Story",
    description: "Every family is different. I take time to understand your unique needs, timeline, and dreams before we look at a single listing.",
  },
  {
    icon: Shield,
    title: "41 Years of Trust",
    description: "Over 3,000 families have trusted me with their biggest decision. I've earned that trust by always putting your interests first.",
  },
  {
    icon: MessageCircle,
    title: "Always Here for You",
    description: "Questions at 9pm? Nervous about an offer? I'm accessible, responsive, and here to guide you through every step.",
  },
];

const services = [
  "First-Time Home Buyers",
  "Luxury Home Sales",
  "Investment Properties",
  "Estate Sales & Probate",
  "Downsizing Assistance",
  "New Construction"
];

export default function Home() {
  const { data: posts = [] } = usePostPreviews(3);
  const [connectOpen, setConnectOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1">
        {/* Hero Section - Bold Minimalist */}
        <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <img
              src={`${import.meta.env.BASE_URL}wide_greg.jpg`}
              alt="Background"
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-24 md:py-32 lg:py-40">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              {/* Left - Content */}
              <div>
                <div className="flex items-center gap-3 mb-8">
                  <div className="h-1 w-12 bg-red-600" />
                  <span className="text-red-600 font-bold text-sm tracking-wider uppercase">RE/MAX Hall of Fame</span>
                </div>

                <h1 className="font-display text-6xl md:text-7xl lg:text-8xl font-black text-white mb-6 leading-none">
                  GREG<br />
                  ANDERSON
                </h1>

                <p className="text-2xl md:text-3xl text-slate-300 mb-8 font-light">
                  Carver County Real Estate Expert
                </p>

                <p className="text-lg text-slate-400 mb-10 leading-relaxed max-w-xl">
                  With 41 years of experience and 3,000+ families served, I deliver results through local expertise, proven strategies, and unwavering dedication to your success.
                </p>

                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    type="button"
                    onClick={() => setConnectOpen(true)}
                    className="group px-10 py-5 bg-red-600 hover:bg-red-700 text-white rounded-none font-bold text-lg uppercase tracking-wider transition-all cursor-pointer shadow-2xl flex items-center justify-center gap-3"
                    data-testid="button-hero-connect"
                  >
                    Schedule Consultation
                    <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
                  </button>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-4 gap-6 mt-16 pt-16 border-t border-slate-700">
                  {highlights.map((item, index) => (
                    <div key={index}>
                      <p className="font-display text-3xl md:text-4xl font-bold text-white mb-1">{item.value}</p>
                      <p className="text-xs text-slate-400 uppercase tracking-wide">{item.label}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right - Image */}
              <div className="relative">
                <div className="aspect-[3/4] rounded-none overflow-hidden shadow-2xl border-4 border-slate-700">
                  <img
                    src={`${import.meta.env.BASE_URL}foodtruck_greg.jpg`}
                    alt="Greg Anderson - RE/MAX Advisors West"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-8 -left-8 bg-red-600 text-white p-8 shadow-2xl">
                  <p className="font-display text-4xl font-black mb-2">41</p>
                  <p className="text-sm uppercase tracking-wider">Years Experience</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <Dialog open={connectOpen} onOpenChange={setConnectOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Let&apos;s Talk!</DialogTitle>
              <DialogDescription>
                Use one of the methods below to get in touch!
              </DialogDescription>
            </DialogHeader>
            <div data-connect-contact>
              <ConnectContactSection variant="modal" showHeading={false} />
            </div>
            <style>{`
              [data-connect-contact] button[type="submit"] { cursor: pointer; }
            `}</style>
          </DialogContent>
        </Dialog>

        {/* Services Section */}
        <section className="py-24 bg-white dark:bg-background">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16">
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-1 w-12 bg-red-600" />
                  <span className="text-red-600 font-bold text-sm tracking-wider uppercase">Specialized Services</span>
                </div>
                <h2 className="font-display text-5xl md:text-6xl font-black mb-8 leading-tight">
                  Every Situation.<br />
                  Every Goal.
                </h2>
                <p className="text-xl text-muted-foreground leading-relaxed mb-10">
                  Whether you're a first-time buyer or managing a complex estate sale, I have the experience and expertise to guide you through every scenario.
                </p>
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 text-red-600 hover:text-red-700 font-bold text-lg uppercase tracking-wider transition-all hover:gap-3"
                  data-testid="link-learn-more"
                >
                  Learn More
                  <ArrowRight className="w-6 h-6" />
                </Link>
              </div>

              <div className="grid grid-cols-2 gap-6">
                {services.map((service, index) => (
                  <div key={index} className="bg-slate-50 dark:bg-slate-900 p-6 border-l-4 border-red-600 hover:shadow-lg transition-all">
                    <CheckCircle className="w-6 h-6 text-red-600 mb-3" />
                    <p className="font-bold text-foreground">{service}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Me - Bold Cards */}
        <section className="py-24 bg-slate-50 dark:bg-slate-900">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-20">
              <div className="flex items-center justify-center gap-3 mb-6">
                <div className="h-1 w-12 bg-red-600" />
                <span className="text-red-600 font-bold text-sm tracking-wider uppercase">The Difference</span>
                <div className="h-1 w-12 bg-red-600" />
              </div>
              <h2 className="font-display text-5xl md:text-6xl font-black mb-6">
                Why Families Choose Greg
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                More than transactions. Building relationships and communities.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {whyChooseMe.map((item, index) => (
                <div key={index} className="bg-white dark:bg-slate-800 p-10 border-l-4 border-red-600 hover:shadow-2xl transition-all group">
                  <div className="w-16 h-16 bg-red-600 flex items-center justify-center mb-6">
                    <item.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-display text-2xl font-black mb-4 text-foreground group-hover:text-red-600 transition-colors">{item.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Local Expertise */}
        <section className="py-24 bg-white dark:bg-background">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="order-2 lg:order-1">
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-1 w-12 bg-red-600" />
                  <span className="text-red-600 font-bold text-sm tracking-wider uppercase">Local Expert</span>
                </div>
                <h2 className="font-display text-5xl md:text-6xl font-black mb-8 leading-tight">
                  Your Neighbor.<br />
                  Your Advocate.
                </h2>
                <div className="space-y-4 text-lg text-muted-foreground leading-relaxed mb-10">
                  <p>
                    I've called Carver County home for decades. I raised my family here, I know the schools, the parks, the best spots for coffee. When I help you find a home, I'm not just looking at square footage—I'm thinking about your life here.
                  </p>
                  <p>
                    Whether you're buying your first home, selling a place full of memories, or navigating a difficult situation, I approach every conversation with patience, honesty, and genuine care.
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div className="border-l-4 border-red-600 pl-4">
                    <p className="font-display text-3xl font-black text-foreground mb-1">Chaska</p>
                    <p className="text-sm text-muted-foreground">Hometown Roots</p>
                  </div>
                  <div className="border-l-4 border-red-600 pl-4">
                    <p className="font-display text-3xl font-black text-foreground mb-1">Carver County</p>
                    <p className="text-sm text-muted-foreground">Full Coverage</p>
                  </div>
                </div>
              </div>

              <div className="order-1 lg:order-2">
                <div className="relative">
                  <img
                    src={`${import.meta.env.BASE_URL}wide_greg.jpg`}
                    alt="Carver County"
                    className="w-full rounded-none shadow-2xl"
                  />
                  <div className="absolute inset-0 border-8 border-white dark:border-slate-800 -m-4 pointer-events-none" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Latest Content */}
        <section className="py-24 bg-slate-900 dark:bg-slate-950 text-white">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-1 w-12 bg-red-600" />
                  <span className="text-red-600 font-bold text-sm tracking-wider uppercase">Resources</span>
                </div>
                <h2 className="font-display text-5xl md:text-6xl font-black">
                  Market Insights
                </h2>
              </div>
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 px-8 py-4 bg-red-600 hover:bg-red-700 text-white font-bold uppercase tracking-wider transition-all hover:gap-3"
                data-testid="link-view-all-posts"
              >
                View All
                <ArrowRight className="w-6 h-6" />
              </Link>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {posts.map((post) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-32 bg-red-600 text-white text-center">
          <div className="max-w-4xl mx-auto px-6 lg:px-8">
            <h2 className="font-display text-5xl md:text-7xl font-black mb-8">
              Ready to Make Your Move?
            </h2>
            <p className="text-2xl mb-12 text-red-100">
              Let's discuss your real estate goals today.
            </p>
            <button
              type="button"
              onClick={() => setConnectOpen(true)}
              className="px-12 py-6 bg-white text-red-600 hover:bg-slate-100 rounded-none font-black text-xl uppercase tracking-wider transition-all cursor-pointer shadow-2xl"
            >
              Get Started
            </button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
