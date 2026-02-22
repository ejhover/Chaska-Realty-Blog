import { Link } from "wouter";
import { useState } from "react";
import { ArrowRight, Home as HomeIcon, TrendingUp, Award, Users, Heart, Shield, MessageCircle, Clock, Calendar } from "lucide-react";
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
  const featuredPost = posts[0];
  const remainingPosts = posts.slice(1);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1">
        {/* Featured Blog Post - Magazine Hero */}
        {featuredPost && (
          <section className="relative bg-gradient-to-br from-slate-900 to-slate-800 dark:from-slate-950 dark:to-slate-900 text-white overflow-hidden">
            <div className="absolute inset-0 opacity-20">
              <img
                src={featuredPost.image}
                alt={featuredPost.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/80 to-transparent" />
            </div>

            <div className="relative max-w-7xl mx-auto px-6 lg:px-8 pt-20 pb-16">
              <div className="grid lg:grid-cols-2 gap-12 items-end">
                {/* Featured Post Content */}
                <div>
                  <div className="inline-block mb-4 px-4 py-2 bg-primary/20 backdrop-blur-sm rounded-full border border-primary/30">
                    <span className="text-primary-foreground text-sm font-semibold">Featured Article</span>
                  </div>
                  
                  <Link href={`/blog/${featuredPost.id}`}>
                    <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight hover:text-primary/90 transition-colors cursor-pointer">
                      {featuredPost.title}
                    </h1>
                  </Link>
                  
                  <p className="text-xl text-white/80 mb-8 leading-relaxed">
                    {featuredPost.excerpt}
                  </p>

                  <div className="flex items-center gap-6 mb-8">
                    <div className="flex items-center gap-2 text-white/70">
                      <Calendar className="w-4 h-4" />
                      <span className="text-sm">{featuredPost.date}</span>
                    </div>
                    <div className="flex items-center gap-2 text-white/70">
                      <Clock className="w-4 h-4" />
                      <span className="text-sm">{featuredPost.readTime}</span>
                    </div>
                    <div className="px-3 py-1 bg-white/10 rounded-full">
                      <span className="text-sm font-medium">{featuredPost.category}</span>
                    </div>
                  </div>

                  <Link
                    href={`/blog/${featuredPost.id}`}
                    className="inline-flex items-center gap-2 px-8 py-4 bg-white text-slate-900 hover:bg-white/90 rounded-lg font-semibold transition-all shadow-xl"
                  >
                    Read Full Article
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </div>

                {/* Greg's Info Card */}
                <div>
                  <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-white/20 shadow-xl">
                        <img
                          src={`${import.meta.env.BASE_URL}foodtruck_greg.jpg`}
                          alt="Greg Anderson"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <h3 className="font-display text-2xl font-bold">Greg Anderson</h3>
                        <p className="text-white/70">Your Carver County Expert</p>
                      </div>
                    </div>
                    <p className="text-white/80 mb-6 leading-relaxed">
                      With 41 years of experience and 3,000+ families served, I provide the expert guidance you need for your real estate journey.
                    </p>
                    <button
                      type="button"
                      onClick={() => setConnectOpen(true)}
                      className="w-full px-6 py-3 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg font-semibold transition-all cursor-pointer shadow-lg"
                      data-testid="button-hero-connect"
                    >
                      Let's Connect
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

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

        {/* More Articles */}
        <section className="py-16 bg-background">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="flex items-center justify-between mb-10">
              <div>
                <h2 className="font-display text-3xl md:text-4xl font-bold mb-2">
                  More Insights
                </h2>
                <p className="text-muted-foreground text-lg">
                  Expert real estate guidance for Carver County
                </p>
              </div>
              <Link
                href="/blog"
                className="hidden md:inline-flex items-center gap-2 px-6 py-3 bg-secondary hover:bg-secondary/80 rounded-lg font-semibold transition-all"
                data-testid="link-view-all-posts"
              >
                View All Posts
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-8">
              {remainingPosts.map((post) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>

            <div className="text-center md:hidden">
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 px-6 py-3 bg-secondary hover:bg-secondary/80 rounded-lg font-semibold transition-all"
                data-testid="link-view-all-posts-mobile"
              >
                View All Posts
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </section>

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
        <section className="py-20 bg-secondary/20">
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
        <section className="py-20 bg-background">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
              <div className="order-2 md:order-1">
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
              <div className="order-1 md:order-2">
                <div className="relative">
                  <img
                    src={`${import.meta.env.BASE_URL}wide_greg.jpg`}
                    alt="Greg Anderson - RE/MAX Advisors West"
                    className="w-full rounded-2xl shadow-lg"
                  />
                  <div className="absolute -bottom-6 -left-6 bg-card p-6 rounded-xl shadow-lg border border-border/50 max-w-xs hidden lg:block">
                    <p className="font-display text-lg font-semibold text-foreground mb-1">Serving</p>
                    <p className="text-sm text-muted-foreground">Chaska, Chanhassen, Victoria, Eden Prairie & more</p>
                  </div>
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
