import { Link } from "wouter";
import { useState } from "react";
import { ArrowRight, Home as HomeIcon, TrendingUp, Award, Users, Heart, Shield, MessageCircle, Phone, Mail } from "lucide-react";
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
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1">
        {/* Hero Section - Split Screen */}
        <section className="relative min-h-[85vh] lg:min-h-[90vh]">
          <div className="grid lg:grid-cols-2 h-full">
            {/* Left - Content */}
            <div className="flex items-center justify-center bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/20 px-6 lg:px-12 py-20">
              <div className="max-w-xl">
                <div className="mb-6">
                  <span className="inline-block px-4 py-2 bg-amber-600/10 text-amber-700 dark:text-amber-400 rounded-full text-sm font-semibold">
                    Carver County's Trusted Realtor
                  </span>
                </div>
                
                <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 leading-tight">
                  Hello, I'm<br />
                  <span className="text-amber-600 dark:text-amber-500">Greg Anderson</span>
                </h1>
                
                <p className="text-xl text-muted-foreground mb-4 leading-relaxed">
                  Your neighbor, your advocate, and your guide through one of life's biggest decisions.
                </p>

                <p className="text-lg text-muted-foreground mb-10 leading-relaxed">
                  With 41 years of experience and over 3,000 families helped, I'm here to make your home buying or selling journey personal, simple, and successful.
                </p>

                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    type="button"
                    onClick={() => setConnectOpen(true)}
                    className="group px-8 py-4 bg-amber-600 hover:bg-amber-700 text-white rounded-xl font-semibold text-lg transition-all cursor-pointer shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                    data-testid="button-hero-connect"
                  >
                    Let's Connect
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                  
                  <Link
                    href="/about"
                    className="px-8 py-4 bg-white dark:bg-card border-2 border-amber-600/20 text-foreground rounded-xl font-semibold text-lg hover:border-amber-600/40 transition-all flex items-center justify-center gap-2"
                  >
                    My Story
                  </Link>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-2 gap-6 mt-12 pt-12 border-t border-amber-200 dark:border-amber-900">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 rounded-lg bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center">
                        <HomeIcon className="w-5 h-5 text-amber-600 dark:text-amber-500" />
                      </div>
                      <span className="font-display text-3xl font-bold text-foreground">3,000+</span>
                    </div>
                    <p className="text-sm text-muted-foreground">Families Helped</p>
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 rounded-lg bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center">
                        <Award className="w-5 h-5 text-amber-600 dark:text-amber-500" />
                      </div>
                      <span className="font-display text-3xl font-bold text-foreground">41</span>
                    </div>
                    <p className="text-sm text-muted-foreground">Years Experience</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right - Image */}
            <div className="relative h-full min-h-[400px] lg:min-h-0">
              <img
                src={`${import.meta.env.BASE_URL}wide_greg.jpg`}
                alt="Greg Anderson - Carver County Realtor"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent lg:bg-gradient-to-r lg:from-amber-50 lg:dark:from-amber-950/20 lg:to-transparent" />
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

        {/* Why Choose Me - Warm Cards */}
        <section className="py-24 bg-white dark:bg-background">
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-16">
              <span className="inline-block px-4 py-2 bg-amber-600/10 text-amber-700 dark:text-amber-400 rounded-full text-sm font-semibold mb-4">
                Why Families Choose Me
              </span>
              <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
                More Than a Realtor
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                A partner you can trust with your family's future
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {whyChooseMe.map((item, index) => (
                <div key={index} className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/10 dark:to-orange-950/10 p-8 rounded-2xl border-2 border-amber-100 dark:border-amber-900/30 hover:border-amber-300 dark:hover:border-amber-700 transition-all hover:shadow-xl">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center mb-6 shadow-lg">
                    <item.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="font-display text-xl font-bold mb-3 text-foreground">{item.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* About Section - Personal Story */}
        <section className="py-24 bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/20">
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <div className="grid lg:grid-cols-5 gap-12 items-center">
              <div className="lg:col-span-2">
                <div className="relative">
                  <div className="aspect-[3/4] rounded-3xl overflow-hidden shadow-2xl border-4 border-white dark:border-card">
                    <img
                      src={`${import.meta.env.BASE_URL}foodtruck_greg.jpg`}
                      alt="Greg Anderson - RE/MAX Advisors West"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute -bottom-6 -right-6 bg-amber-600 text-white p-6 rounded-2xl shadow-xl max-w-[200px]">
                    <p className="font-display text-lg font-bold mb-1">Proudly Serving</p>
                    <p className="text-sm text-amber-100">Carver County Since 1985</p>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-3">
                <span className="inline-block px-4 py-2 bg-amber-600/10 text-amber-700 dark:text-amber-400 rounded-full text-sm font-semibold mb-4">
                  A Little About Me
                </span>
                <h2 className="font-display text-4xl md:text-5xl font-bold mb-6 leading-tight">
                  I'm Your Neighbor, Too
                </h2>
                <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
                  <p>
                    I've called Carver County home for decades. I raised my family here, I know the schools, the parks, the best spots for coffee. When I help you find a home, I'm not just looking at square footage—I'm thinking about your life here.
                  </p>
                  <p>
                    Whether you're buying your first home, selling a place full of memories, or navigating a difficult situation, I approach every conversation with patience, honesty, and genuine care.
                  </p>
                </div>
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 mt-8 px-6 py-3 bg-amber-600 hover:bg-amber-700 text-white rounded-xl font-semibold transition-all hover:gap-3 shadow-lg"
                  data-testid="link-learn-more"
                >
                  Learn More About Me
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Bar */}
        <section className="py-16 bg-amber-600 text-white">
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {highlights.map((item, index) => (
                <div key={index} className="text-center">
                  <item.icon className="w-8 h-8 mx-auto mb-3 opacity-90" />
                  <p className="font-display text-3xl md:text-4xl font-bold">{item.value}</p>
                  <p className="text-sm opacity-90 mt-1">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Latest Content */}
        <section className="py-24 bg-white dark:bg-background">
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-16">
              <span className="inline-block px-4 py-2 bg-amber-600/10 text-amber-700 dark:text-amber-400 rounded-full text-sm font-semibold mb-4">
                Free Resources
              </span>
              <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
                Helpful Insights for You
              </h2>
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-amber-600 hover:text-amber-700 dark:text-amber-500 dark:hover:text-amber-400 font-semibold transition-all hover:gap-3"
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
