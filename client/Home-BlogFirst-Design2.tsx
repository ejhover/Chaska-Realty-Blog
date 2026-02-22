import { Link } from "wouter";
import { useState } from "react";
import { ArrowRight, Home as HomeIcon, TrendingUp, Award, Users, Heart, Shield, MessageCircle, Star } from "lucide-react";
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
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-background to-secondary/10">
      <Navbar />

      <main className="flex-1">
        {/* Blog-First Hero Section */}
        <section className="pt-8 pb-16">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            {/* Intro Text */}
            <div className="text-center mb-12">
              <div className="inline-block mb-4">
                <span className="px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold">
                  Expert Real Estate Guidance
                </span>
              </div>
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
                Latest Market Insights
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Stay informed with expert analysis, local market trends, and insider tips from Greg Anderson—Carver County's trusted realtor for 41 years
              </p>
            </div>

            {/* Blog Posts + Greg Sidebar */}
            <div className="grid lg:grid-cols-4 gap-8">
              {/* Main Content - Blog Posts (3 columns) */}
              <div className="lg:col-span-3">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {posts.map((post) => (
                    <BlogCard key={post.id} post={post} />
                  ))}
                </div>
                <div className="mt-8 text-center">
                  <Link
                    href="/blog"
                    className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-all shadow-lg"
                    data-testid="link-view-all-posts"
                  >
                    View All Posts
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </div>
              </div>

              {/* Sidebar - Greg's Info */}
              <div className="lg:col-span-1">
                <div className="sticky top-8 space-y-6">
                  {/* Greg's Card */}
                  <div className="bg-card border border-border rounded-2xl p-6 shadow-lg">
                    <div className="aspect-square rounded-xl overflow-hidden mb-4 shadow-md">
                      <img
                        src={`${import.meta.env.BASE_URL}foodtruck_greg.jpg`}
                        alt="Greg Anderson"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h3 className="font-display text-2xl font-bold mb-2">Greg Anderson</h3>
                    <p className="text-muted-foreground text-sm mb-4">
                      RE/MAX Hall of Fame • Carver County Expert
                    </p>
                    <div className="space-y-3 mb-6">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                          <Star className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-semibold text-foreground">3,000+</p>
                          <p className="text-xs text-muted-foreground">Families Helped</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                          <TrendingUp className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-semibold text-foreground">41 Years</p>
                          <p className="text-xs text-muted-foreground">Experience</p>
                        </div>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => setConnectOpen(true)}
                      className="w-full px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-all cursor-pointer shadow-lg"
                      data-testid="button-hero-connect"
                    >
                      Let's Connect
                    </button>
                  </div>

                  {/* Quick Links */}
                  <div className="bg-card border border-border rounded-2xl p-6 shadow-lg">
                    <h4 className="font-semibold mb-4">Quick Links</h4>
                    <div className="space-y-2">
                      <Link href="/about" className="block text-muted-foreground hover:text-primary transition-colors">
                        → About Greg
                      </Link>
                      <Link href="/blog" className="block text-muted-foreground hover:text-primary transition-colors">
                        → All Resources
                      </Link>
                    </div>
                  </div>
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

        {/* Stats Bar */}
        <section className="py-12 bg-primary text-primary-foreground">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {highlights.map((item, index) => (
                <div key={index}>
                  <item.icon className="w-8 h-8 mx-auto mb-3 opacity-90" />
                  <p className="font-display text-3xl md:text-4xl font-bold mb-1">{item.value}</p>
                  <p className="text-sm opacity-90">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Me */}
        <section className="py-20 bg-background">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-14">
              <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
                Why Families Choose Greg
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                More than a realtor—a partner you can trust
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {whyChooseMe.map((item, index) => (
                <div key={index} className="bg-card p-8 rounded-2xl border border-border/50 hover:shadow-lg transition-shadow">
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                    <item.icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="font-display text-xl font-semibold mb-3">{item.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Personal Introduction */}
        <section className="py-20 bg-secondary/20">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
              <div>
                <h2 className="font-display text-3xl md:text-4xl font-bold mb-6 leading-tight">
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
                  className="inline-flex items-center gap-2 text-primary font-semibold text-lg hover:gap-3 transition-all"
                  data-testid="link-learn-more"
                >
                  Learn More About Me
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
              <div>
                <div className="relative">
                  <img
                    src={`${import.meta.env.BASE_URL}wide_greg.jpg`}
                    alt="Greg Anderson - Carver County"
                    className="w-full rounded-2xl shadow-lg"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
