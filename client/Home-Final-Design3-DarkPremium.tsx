import { Link } from "wouter";
import { useState } from "react";
import { ArrowRight, Home as HomeIcon, TrendingUp, Award, Users, Heart, Shield, MessageCircle, Star, Crown } from "lucide-react";
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
    <div className="min-h-screen flex flex-col bg-slate-950">
      <Navbar />

      <main className="flex-1">
        {/* Premium Hero - Greg's Badge + Blog Intro */}
        <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border-b border-amber-500/20">
          {/* Subtle Grid Pattern */}
          <div className="absolute inset-0 opacity-10" style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, rgb(251 191 36) 1px, transparent 0)',
            backgroundSize: '40px 40px'
          }} />

          <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-16">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              {/* Left - Greg's Premium Badge */}
              <div className="flex items-center gap-6 group cursor-pointer" onClick={() => setConnectOpen(true)}>
                <div className="relative">
                  {/* Glow Effect */}
                  <div className="absolute inset-0 bg-amber-500 rounded-full blur-2xl opacity-30 group-hover:opacity-50 transition-opacity" />
                  
                  {/* Photo */}
                  <div className="relative w-28 h-28 rounded-full overflow-hidden border-4 border-amber-500 shadow-2xl shadow-amber-500/20">
                    <img
                      src={`${import.meta.env.BASE_URL}foodtruck_greg.jpg`}
                      alt="Greg Anderson"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Crown Badge */}
                  <div className="absolute -top-2 -right-2 w-10 h-10 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center border-2 border-slate-900 shadow-xl">
                    <Crown className="w-5 h-5 text-white" />
                  </div>
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                    <span className="text-xs text-amber-500 font-semibold uppercase tracking-wide">RE/MAX Hall of Fame</span>
                  </div>
                  <h3 className="font-display text-3xl font-bold text-white mb-1">
                    Greg Anderson
                  </h3>
                  <p className="text-slate-400">Carver County Expert • 41 Years</p>
                </div>

                <div className="hidden lg:block ml-4 px-6 py-3 bg-amber-500 hover:bg-amber-600 text-slate-900 rounded-lg font-bold transition-all shadow-xl shadow-amber-500/20">
                  Connect →
                </div>
              </div>

              {/* Right - Quick Stats */}
              <div className="flex gap-8">
                <div className="text-center">
                  <div className="text-4xl font-black text-white mb-1">3,000+</div>
                  <div className="text-xs text-slate-400 uppercase tracking-wider">Families</div>
                </div>
                <div className="w-px bg-slate-700" />
                <div className="text-center">
                  <div className="text-4xl font-black text-white mb-1">41</div>
                  <div className="text-xs text-slate-400 uppercase tracking-wider">Years</div>
                </div>
                <div className="w-px bg-slate-700" />
                <div className="text-center">
                  <div className="text-4xl font-black text-white mb-1">1985</div>
                  <div className="text-xs text-slate-400 uppercase tracking-wider">Since</div>
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

        {/* Blog Posts - Premium Dark Cards */}
        <section className="py-20 bg-slate-950">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            {/* Section Header */}
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-900 border border-amber-500/20 rounded-full mb-6">
                <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse" />
                <span className="text-sm text-amber-500 font-semibold uppercase tracking-wide">
                  Expert Insights
                </span>
              </div>
              <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-black text-white mb-4">
                Latest Market Intelligence
              </h2>
              <p className="text-xl text-slate-400 max-w-2xl mx-auto">
                Stay ahead with data-driven insights and expert analysis for Carver County real estate
              </p>
            </div>

            {/* Blog Grid */}
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              {posts.map((post, index) => (
                <Link key={post.id} href={`/blog/${post.id}`}>
                  <article className="group cursor-pointer h-full">
                    <div className="relative h-full bg-slate-900 rounded-2xl overflow-hidden border border-slate-800 hover:border-amber-500/50 transition-all shadow-2xl hover:shadow-amber-500/10">
                      {/* Golden Accent Line */}
                      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-amber-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                      {/* Image */}
                      <div className="relative aspect-[16/9] overflow-hidden bg-slate-800">
                        <img
                          src={post.image}
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent" />
                        
                        {/* Category Badge */}
                        <div className="absolute top-4 left-4 px-3 py-1 bg-slate-900/90 backdrop-blur-sm border border-amber-500/30 rounded-full">
                          <span className="text-xs font-bold text-amber-500 uppercase tracking-wide">
                            {post.category}
                          </span>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-6">
                        <div className="flex items-center gap-3 mb-4 text-xs text-slate-500 uppercase tracking-wider">
                          <span>{post.date}</span>
                          <span>•</span>
                          <span>{post.readTime}</span>
                        </div>

                        <h3 className="font-display text-xl font-bold text-white mb-3 leading-tight group-hover:text-amber-500 transition-colors line-clamp-2">
                          {post.title}
                        </h3>

                        <p className="text-slate-400 leading-relaxed line-clamp-3 mb-4">
                          {post.excerpt}
                        </p>

                        <div className="flex items-center gap-2 text-amber-500 font-semibold text-sm group-hover:gap-3 transition-all">
                          <span>Read More</span>
                          <ArrowRight className="w-4 h-4" />
                        </div>
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>

            {/* View All Button */}
            <div className="text-center">
              <Link
                href="/blog"
                className="inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-900 rounded-xl font-bold text-lg uppercase tracking-wide shadow-2xl shadow-amber-500/20 hover:shadow-amber-500/40 transition-all"
                data-testid="link-view-all-posts"
              >
                Explore All Articles
                <ArrowRight className="w-6 h-6" />
              </Link>
            </div>
          </div>
        </section>

        {/* Why Choose Me - Premium Cards */}
        <section className="py-20 bg-slate-900">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="font-display text-4xl md:text-5xl font-black text-white mb-4">
                Why Choose Greg
              </h2>
              <div className="h-1 w-24 bg-gradient-to-r from-transparent via-amber-500 to-transparent mx-auto" />
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {whyChooseMe.map((item, index) => (
                <div key={index} className="group relative">
                  {/* Glow Effect on Hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-amber-500/20 to-transparent rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-all" />
                  
                  <div className="relative bg-slate-800 p-8 rounded-2xl border border-slate-700 group-hover:border-amber-500/50 transition-all">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center mb-6 shadow-lg shadow-amber-500/20">
                      <item.icon className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="font-display text-xl font-bold text-white mb-3">{item.title}</h3>
                    <p className="text-slate-400 leading-relaxed">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats Banner */}
        <section className="py-16 bg-gradient-to-r from-amber-500 via-amber-600 to-amber-500 relative overflow-hidden">
          {/* Pattern Overlay */}
          <div className="absolute inset-0 opacity-10" style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, rgb(255 255 255) 1px, transparent 0)',
            backgroundSize: '30px 30px'
          }} />

          <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {highlights.map((item, index) => (
                <div key={index}>
                  <item.icon className="w-10 h-10 mx-auto mb-4 text-slate-900" />
                  <p className="font-display text-4xl md:text-5xl font-black text-slate-900 mb-2">{item.value}</p>
                  <p className="text-slate-800 text-sm uppercase tracking-wider font-bold">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* About Section */}
        <section className="py-20 bg-slate-900">
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-800 border border-amber-500/20 rounded-full mb-6">
                  <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                  <span className="text-sm text-amber-500 font-semibold uppercase tracking-wide">
                    About Greg
                  </span>
                </div>
                <h2 className="font-display text-4xl md:text-5xl font-black text-white mb-6 leading-tight">
                  Your Neighbor,<br />Your Advocate
                </h2>
                <p className="text-lg text-slate-400 leading-relaxed mb-6">
                  I've called Carver County home for decades. I raised my family here, I know the schools, the parks, the best spots for coffee. When I help you find a home, I'm not just looking at square footage—I'm thinking about your life here.
                </p>
                <p className="text-lg text-slate-400 leading-relaxed mb-8">
                  Whether you're buying your first home, selling a place full of memories, or navigating a difficult situation, I approach every conversation with patience, honesty, and genuine care.
                </p>
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 text-amber-500 hover:text-amber-400 font-bold text-lg uppercase tracking-wide transition-all hover:gap-3"
                  data-testid="link-learn-more"
                >
                  Learn More
                  <ArrowRight className="w-6 h-6" />
                </Link>
              </div>
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-amber-500 to-transparent rounded-2xl blur-3xl opacity-20" />
                <img
                  src={`${import.meta.env.BASE_URL}wide_greg.jpg`}
                  alt="Greg Anderson"
                  className="relative w-full rounded-2xl border-2 border-amber-500/30 shadow-2xl shadow-amber-500/10"
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
