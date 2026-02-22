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
  const featuredPost = posts[0];
  const smallPosts = posts.slice(1);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950">
      <Navbar />

      <main className="flex-1">
        {/* Newsroom-Style Header with Blog Focus */}
        <section className="bg-white dark:bg-slate-900 border-b-4 border-red-600">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
            <div className="flex items-center justify-between">
              {/* Left - Site Title/Branding */}
              <div>
                <h1 className="font-display text-4xl md:text-5xl font-black text-foreground mb-1">
                  GREG ANDERSON
                </h1>
                <p className="text-sm text-muted-foreground uppercase tracking-wider">
                  Carver County Real Estate Intelligence
                </p>
              </div>

              {/* Right - Quick Contact */}
              <button
                type="button"
                onClick={() => setConnectOpen(true)}
                className="hidden md:flex items-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-none font-bold uppercase tracking-wide transition-all cursor-pointer"
                data-testid="button-header-connect"
              >
                Contact
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </section>

        {/* Main Content - Featured Post + Grid */}
        <section className="py-8 bg-slate-50 dark:bg-slate-950">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Featured Post - Takes 2 columns */}
              {featuredPost && (
                <div className="lg:col-span-2">
                  <Link href={`/blog/${featuredPost.id}`}>
                    <article className="bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 hover:border-red-600 dark:hover:border-red-600 transition-all group cursor-pointer">
                      {/* Featured Image */}
                      <div className="relative aspect-[16/9] overflow-hidden bg-slate-200 dark:bg-slate-800">
                        <img
                          src={featuredPost.image}
                          alt={featuredPost.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute top-4 left-4 px-3 py-1 bg-red-600 text-white text-sm font-bold uppercase">
                          Featured
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-8">
                        <div className="flex items-center gap-4 mb-4">
                          <span className="px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-semibold uppercase">
                            {featuredPost.category}
                          </span>
                          <span className="text-sm text-muted-foreground">{featuredPost.date}</span>
                        </div>
                        
                        <h2 className="font-display text-3xl md:text-4xl font-bold mb-4 leading-tight group-hover:text-red-600 transition-colors">
                          {featuredPost.title}
                        </h2>
                        
                        <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                          {featuredPost.excerpt}
                        </p>

                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">{featuredPost.readTime}</span>
                          <span className="inline-flex items-center gap-2 text-red-600 font-semibold group-hover:gap-3 transition-all">
                            Read More
                            <ArrowRight className="w-4 h-4" />
                          </span>
                        </div>
                      </div>
                    </article>
                  </Link>
                </div>
              )}

              {/* Sidebar - Greg's Profile + Small Posts */}
              <div className="lg:col-span-1 space-y-6">
                {/* Greg's Profile Card */}
                <div className="bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 p-6">
                  <div className="text-center mb-6">
                    <div className="w-24 h-24 mx-auto rounded-full overflow-hidden border-4 border-red-600 mb-4 shadow-lg">
                      <img
                        src={`${import.meta.env.BASE_URL}foodtruck_greg.jpg`}
                        alt="Greg Anderson"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h3 className="font-display text-2xl font-black mb-1">GREG ANDERSON</h3>
                    <p className="text-sm text-muted-foreground uppercase tracking-wide mb-4">
                      RE/MAX Hall of Fame
                    </p>
                    <div className="h-1 w-16 bg-red-600 mx-auto mb-4" />
                  </div>

                  <div className="space-y-3 mb-6">
                    <div className="flex items-center justify-between py-2 border-b border-slate-200 dark:border-slate-800">
                      <span className="text-sm text-muted-foreground uppercase">Experience</span>
                      <span className="font-bold">41 Years</span>
                    </div>
                    <div className="flex items-center justify-between py-2 border-b border-slate-200 dark:border-slate-800">
                      <span className="text-sm text-muted-foreground uppercase">Families Helped</span>
                      <span className="font-bold">3,000+</span>
                    </div>
                    <div className="flex items-center justify-between py-2">
                      <span className="text-sm text-muted-foreground uppercase">Since</span>
                      <span className="font-bold">1985</span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setConnectOpen(true)}
                    className="w-full px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-bold uppercase tracking-wide transition-all cursor-pointer"
                    data-testid="button-hero-connect"
                  >
                    Let's Connect
                  </button>
                </div>

                {/* More Articles List */}
                <div className="bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 p-6">
                  <h3 className="font-display text-lg font-bold mb-4 uppercase tracking-wide">More Articles</h3>
                  <div className="space-y-4">
                    {smallPosts.map((post) => (
                      <Link key={post.id} href={`/blog/${post.id}`}>
                        <div className="group cursor-pointer">
                          <div className="flex gap-3">
                            <div className="w-20 h-20 flex-shrink-0 bg-slate-200 dark:bg-slate-800 rounded overflow-hidden">
                              <img
                                src={post.image}
                                alt={post.title}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="font-semibold text-sm leading-tight mb-1 group-hover:text-red-600 transition-colors line-clamp-2">
                                {post.title}
                              </h4>
                              <p className="text-xs text-muted-foreground">{post.date}</p>
                            </div>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                  <Link
                    href="/blog"
                    className="block mt-6 text-center text-sm font-semibold text-red-600 hover:text-red-700 uppercase tracking-wide"
                  >
                    View All Articles →
                  </Link>
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

        {/* Why Choose Me */}
        <section className="py-20 bg-white dark:bg-slate-900">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-14">
              <h2 className="font-display text-3xl md:text-4xl font-black mb-4 uppercase tracking-wide">
                Why Families Choose Greg
              </h2>
              <div className="h-1 w-24 bg-red-600 mx-auto" />
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {whyChooseMe.map((item, index) => (
                <div key={index} className="text-center p-8 border-2 border-slate-200 dark:border-slate-800 hover:border-red-600 transition-all">
                  <div className="w-16 h-16 bg-red-600 flex items-center justify-center mx-auto mb-6">
                    <item.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-display text-xl font-bold mb-3 uppercase">{item.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats Bar */}
        <section className="py-16 bg-red-600 text-white">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {highlights.map((item, index) => (
                <div key={index}>
                  <item.icon className="w-10 h-10 mx-auto mb-3" />
                  <p className="font-display text-4xl md:text-5xl font-black mb-2">{item.value}</p>
                  <p className="text-sm uppercase tracking-wider">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* About Section */}
        <section className="py-20 bg-slate-50 dark:bg-slate-950">
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="font-display text-3xl md:text-4xl font-black mb-6 uppercase tracking-wide">
                  Your Neighbor, Your Advocate
                </h2>
                <div className="h-1 w-24 bg-red-600 mb-6" />
                <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                  I've called Carver County home for decades. I raised my family here, I know the schools, the parks, the best spots for coffee. When I help you find a home, I'm not just looking at square footage—I'm thinking about your life here.
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                  Whether you're buying your first home, selling a place full of memories, or navigating a difficult situation, I approach every conversation with patience, honesty, and genuine care.
                </p>
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 text-red-600 hover:text-red-700 font-bold uppercase tracking-wide transition-all hover:gap-3"
                  data-testid="link-learn-more"
                >
                  Learn More
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
              <div>
                <img
                  src={`${import.meta.env.BASE_URL}wide_greg.jpg`}
                  alt="Greg Anderson - Carver County"
                  className="w-full border-4 border-white dark:border-slate-900 shadow-2xl"
                />
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
