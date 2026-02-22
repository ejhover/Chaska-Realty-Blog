import { Link } from "wouter";
import { useState } from "react";
import { ArrowRight, Home as HomeIcon, TrendingUp, Award, Users, Heart, Shield, MessageCircle, Sparkles } from "lucide-react";
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
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-violet-50 via-blue-50 to-cyan-50 dark:from-violet-950 dark:via-blue-950 dark:to-cyan-950">
      <Navbar />

      <main className="flex-1">
        {/* Hero Section - Greg's Floating Badge + Blog Title */}
        <section className="relative pt-12 pb-8 overflow-hidden">
          {/* Decorative Background Elements */}
          <div className="absolute inset-0 overflow-hidden opacity-20">
            <div className="absolute top-20 left-10 w-72 h-72 bg-violet-400 rounded-full blur-3xl" />
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-400 rounded-full blur-3xl" />
          </div>

          <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-12">
              {/* Greg's Floating Badge */}
              <div className="inline-block mb-8 group cursor-pointer" onClick={() => setConnectOpen(true)}>
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-violet-500 to-cyan-500 rounded-2xl blur-xl group-hover:blur-2xl transition-all" />
                  <div className="relative bg-white dark:bg-slate-900 rounded-2xl shadow-2xl p-6 border-2 border-violet-200 dark:border-violet-800 group-hover:scale-105 transition-transform">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-full overflow-hidden border-4 border-gradient-to-r from-violet-500 to-cyan-500 shadow-lg">
                        <img
                          src={`${import.meta.env.BASE_URL}foodtruck_greg.jpg`}
                          alt="Greg Anderson"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="text-left">
                        <h3 className="font-display text-xl font-bold bg-gradient-to-r from-violet-600 to-cyan-600 bg-clip-text text-transparent">
                          Greg Anderson
                        </h3>
                        <p className="text-sm text-muted-foreground">Carver County Expert • 41 Years</p>
                      </div>
                      <div className="ml-4 px-4 py-2 bg-gradient-to-r from-violet-500 to-cyan-500 text-white rounded-lg font-semibold text-sm whitespace-nowrap group-hover:shadow-lg transition-shadow">
                        Let's Talk →
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Main Heading */}
              <div className="max-w-4xl mx-auto">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm rounded-full border border-violet-200 dark:border-violet-800 mb-6">
                  <Sparkles className="w-4 h-4 text-violet-600" />
                  <span className="text-sm font-semibold bg-gradient-to-r from-violet-600 to-cyan-600 bg-clip-text text-transparent">
                    Your Real Estate Resource Hub
                  </span>
                </div>
                <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-black mb-6 leading-tight">
                  <span className="bg-gradient-to-r from-violet-600 via-blue-600 to-cyan-600 bg-clip-text text-transparent">
                    Expert Insights
                  </span>
                  <br />
                  <span className="text-foreground">For Your Journey Home</span>
                </h1>
                <p className="text-xl text-muted-foreground mb-8 leading-relaxed max-w-2xl mx-auto">
                  Navigate Carver County real estate with confidence through expert guidance, market analysis, and local wisdom.
                </p>
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

        {/* Blog Posts - Beautiful Card Grid */}
        <section className="pb-16">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="grid md:grid-cols-3 gap-8">
              {posts.map((post, index) => (
                <Link key={post.id} href={`/blog/${post.id}`}>
                  <article className="group cursor-pointer h-full">
                    <div className="relative h-full bg-white dark:bg-slate-900 rounded-3xl shadow-xl overflow-hidden border-2 border-transparent hover:border-violet-500 transition-all hover:shadow-2xl hover:-translate-y-2">
                      {/* Gradient Accent Bar */}
                      <div className={`absolute top-0 left-0 right-0 h-2 bg-gradient-to-r ${
                        index === 0 ? 'from-violet-500 to-purple-500' :
                        index === 1 ? 'from-blue-500 to-cyan-500' :
                        'from-teal-500 to-emerald-500'
                      }`} />

                      {/* Image */}
                      <div className="relative aspect-[16/9] overflow-hidden bg-slate-200 dark:bg-slate-800">
                        <img
                          src={post.image}
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                        <div className="absolute bottom-4 left-4 px-3 py-1 bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm rounded-full">
                          <span className="text-xs font-bold bg-gradient-to-r from-violet-600 to-cyan-600 bg-clip-text text-transparent">
                            {post.category}
                          </span>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-6">
                        <div className="flex items-center gap-3 mb-3 text-sm text-muted-foreground">
                          <span>{post.date}</span>
                          <span>•</span>
                          <span>{post.readTime}</span>
                        </div>

                        <h2 className="font-display text-xl font-bold mb-3 leading-tight group-hover:bg-gradient-to-r group-hover:from-violet-600 group-hover:to-cyan-600 group-hover:bg-clip-text group-hover:text-transparent transition-all line-clamp-2">
                          {post.title}
                        </h2>

                        <p className="text-muted-foreground leading-relaxed line-clamp-3 mb-4">
                          {post.excerpt}
                        </p>

                        <div className="flex items-center gap-2 text-violet-600 dark:text-violet-400 font-semibold group-hover:gap-3 transition-all">
                          <span>Read Article</span>
                          <ArrowRight className="w-4 h-4" />
                        </div>
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>

            <div className="text-center mt-12">
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-violet-600 to-cyan-600 hover:from-violet-700 hover:to-cyan-700 text-white rounded-full font-semibold text-lg shadow-xl hover:shadow-2xl transition-all"
                data-testid="link-view-all-posts"
              >
                Explore All Articles
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </section>

        {/* Stats - Colorful Gradient Cards */}
        <section className="py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-violet-500 via-blue-500 to-cyan-500 opacity-90" />
          <div className="absolute inset-0 backdrop-blur-3xl" />
          
          <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {highlights.map((item, index) => (
                <div key={index} className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl mb-4">
                    <item.icon className="w-8 h-8 text-white" />
                  </div>
                  <p className="font-display text-4xl md:text-5xl font-black text-white mb-2">{item.value}</p>
                  <p className="text-white/90 text-sm uppercase tracking-wider font-semibold">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Me - Colorful Cards */}
        <section className="py-20 bg-white dark:bg-slate-900">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="font-display text-4xl md:text-5xl font-black mb-4">
                <span className="bg-gradient-to-r from-violet-600 to-cyan-600 bg-clip-text text-transparent">
                  Why Choose Greg
                </span>
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                More than expertise—a partnership built on trust
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {whyChooseMe.map((item, index) => (
                <div key={index} className="group relative">
                  <div className={`absolute inset-0 bg-gradient-to-br ${
                    index === 0 ? 'from-violet-500 to-purple-500' :
                    index === 1 ? 'from-blue-500 to-cyan-500' :
                    'from-teal-500 to-emerald-500'
                  } rounded-3xl blur-xl group-hover:blur-2xl transition-all opacity-30`} />
                  <div className="relative bg-white dark:bg-slate-900 p-8 rounded-3xl border-2 border-slate-200 dark:border-slate-800 hover:border-violet-500 transition-all shadow-lg group-hover:shadow-2xl">
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${
                      index === 0 ? 'from-violet-500 to-purple-500' :
                      index === 1 ? 'from-blue-500 to-cyan-500' :
                      'from-teal-500 to-emerald-500'
                    } flex items-center justify-center mb-6 shadow-lg`}>
                      <item.icon className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="font-display text-xl font-bold mb-3">{item.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* About Section */}
        <section className="py-20 bg-gradient-to-br from-violet-50 via-blue-50 to-cyan-50 dark:from-violet-950 dark:via-blue-950 dark:to-cyan-950">
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="font-display text-4xl md:text-5xl font-black mb-6">
                  <span className="bg-gradient-to-r from-violet-600 to-cyan-600 bg-clip-text text-transparent">
                    Your Neighbor,
                  </span>
                  <br />
                  <span className="text-foreground">Your Guide</span>
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                  I've called Carver County home for decades. I raised my family here, I know the schools, the parks, the best spots for coffee. When I help you find a home, I'm not just looking at square footage—I'm thinking about your life here.
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                  Whether you're buying your first home, selling a place full of memories, or navigating a difficult situation, I approach every conversation with patience, honesty, and genuine care.
                </p>
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-violet-600 to-cyan-600 hover:from-violet-700 hover:to-cyan-700 text-white rounded-full font-semibold shadow-xl hover:shadow-2xl transition-all"
                  data-testid="link-learn-more"
                >
                  My Story
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
              <div>
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-violet-500 to-cyan-500 rounded-3xl blur-2xl opacity-30" />
                  <img
                    src={`${import.meta.env.BASE_URL}wide_greg.jpg`}
                    alt="Greg Anderson"
                    className="relative w-full rounded-3xl shadow-2xl border-4 border-white dark:border-slate-900"
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
