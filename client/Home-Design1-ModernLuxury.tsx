import { Link } from "wouter";
import { useState } from "react";
import { ArrowRight, Home as HomeIcon, TrendingUp, Award, Users, Heart, Shield, MessageCircle, Phone, Mail, MapPin } from "lucide-react";
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

export default function Home() {
  const { data: posts = [] } = usePostPreviews(3);
  const [connectOpen, setConnectOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-background to-secondary/20">
      <Navbar />

      <main className="flex-1">
        {/* Hero Section - Full Screen Luxury */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0">
            <img
              src={`${import.meta.env.BASE_URL}wide_greg.jpg`}
              alt="Greg Anderson - Carver County Realtor"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/30" />
          </div>

          <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-20 text-center z-10">
            <div className="inline-block mb-6 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20">
              <p className="text-white/90 text-sm font-medium tracking-wide">
                Carver County's Most Trusted Realtor Since 1985
              </p>
            </div>
            
            <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold text-white leading-tight mb-6">
              Greg Anderson
            </h1>
            
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto mb-12 leading-relaxed">
              Your neighbor, your advocate, your guide through one of life's biggest decisions.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button
                type="button"
                onClick={() => setConnectOpen(true)}
                className="group px-8 py-4 bg-white text-foreground rounded-full font-semibold text-lg hover:bg-white/90 transition-all cursor-pointer shadow-2xl hover:shadow-white/20 hover:scale-105"
                data-testid="button-hero-connect"
              >
                <span className="flex items-center gap-2">
                  Let's Find Your Home
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </button>
              
              <Link
                href="/about"
                className="px-8 py-4 bg-white/10 backdrop-blur-md text-white border-2 border-white/30 rounded-full font-semibold text-lg hover:bg-white/20 transition-all"
              >
                Learn My Story
              </Link>
            </div>

            {/* Stats Floating Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-20 max-w-4xl mx-auto">
              {highlights.map((item, index) => (
                <div key={index} className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all">
                  <item.icon className="w-8 h-8 mx-auto mb-3 text-white" />
                  <p className="font-display text-3xl md:text-4xl font-bold text-white">{item.value}</p>
                  <p className="text-sm text-white/80 mt-1">{item.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
            <div className="w-6 h-10 border-2 border-white/40 rounded-full flex items-start justify-center p-2">
              <div className="w-1 h-3 bg-white/60 rounded-full" />
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

        {/* Why Choose Me - Elegant Cards */}
        <section className="py-32 bg-background">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-20">
              <div className="inline-block mb-4 px-4 py-2 rounded-full bg-primary/10">
                <p className="text-primary font-semibold text-sm tracking-wide">WHY FAMILIES CHOOSE ME</p>
              </div>
              <h2 className="font-display text-4xl md:text-6xl font-bold mb-6">
                More Than a Realtor
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                A partner you can trust with your biggest life decision
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {whyChooseMe.map((item, index) => (
                <div key={index} className="group relative bg-gradient-to-br from-card to-card/50 p-10 rounded-3xl border border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-2xl hover:scale-105">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="relative">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center mb-6 shadow-lg">
                      <item.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="font-display text-2xl font-bold mb-4">{item.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* About Section - Side by Side */}
        <section className="py-32 bg-secondary/30">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="relative">
                <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl">
                  <img
                    src={`${import.meta.env.BASE_URL}foodtruck_greg.jpg`}
                    alt="Greg Anderson - RE/MAX Advisors West"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-8 -right-8 bg-white dark:bg-card p-8 rounded-2xl shadow-2xl border border-border max-w-xs">
                  <p className="font-display text-2xl font-bold text-foreground mb-2">Serving</p>
                  <p className="text-muted-foreground">Chaska, Chanhassen, Victoria, Eden Prairie & Carver County</p>
                </div>
              </div>

              <div>
                <div className="inline-block mb-4 px-4 py-2 rounded-full bg-primary/10">
                  <p className="text-primary font-semibold text-sm tracking-wide">A LITTLE ABOUT ME</p>
                </div>
                <h2 className="font-display text-4xl md:text-5xl font-bold mb-6 leading-tight">
                  I'm Your Neighbor, Too
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                  I've called Carver County home for decades. I raised my family here, I know the schools, the parks, the best spots for coffee. When I help you find a home, I'm not just looking at square footage—I'm thinking about your life here.
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                  Whether you're buying your first home, selling a place full of memories, or navigating a difficult situation, I approach every conversation with patience, honesty, and genuine care.
                </p>
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-full font-semibold text-lg hover:bg-primary/90 transition-all hover:gap-3 shadow-lg"
                  data-testid="link-learn-more"
                >
                  Learn More About Me
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Latest Content - Modern Grid */}
        <section className="py-32 bg-background">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
              <div>
                <div className="inline-block mb-4 px-4 py-2 rounded-full bg-primary/10">
                  <p className="text-primary font-semibold text-sm tracking-wide">FREE RESOURCES</p>
                </div>
                <h2 className="font-display text-4xl md:text-5xl font-bold">
                  Helpful Insights for You
                </h2>
              </div>
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 px-6 py-3 bg-secondary text-foreground rounded-full font-semibold hover:bg-secondary/80 transition-all hover:gap-3"
                data-testid="link-view-all-posts"
              >
                View All Posts
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {posts.map((post) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
