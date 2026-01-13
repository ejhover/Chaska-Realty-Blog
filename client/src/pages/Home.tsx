import { Link } from "wouter";
import { ArrowRight, Play, CheckCircle, Award, Home as HomeIcon, TrendingUp, Users } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { BlogCard } from "@/components/BlogCard";
import { blogPosts } from "@/lib/blogData";
import heroHome from "@assets/stock_images/luxury_home_exterior_4a6b3f4f.jpg";
import agentPhoto from "@assets/stock_images/professional_real_es_441f93e4.jpg";

const highlights = [
  { icon: HomeIcon, value: "3,000+", label: "Homes Sold" },
  { icon: TrendingUp, value: "41", label: "Years Experience" },
  { icon: Award, value: "RE/MAX", label: "Hall of Fame" },
  { icon: Users, value: "Since 1985", label: "Licensed" },
];

const specialties = [
  "Traditional Residential Sales",
  "Distressed Property Solutions & REO",
  "New Construction & Land Liquidations",
  "Luxury Homes & Development Land",
  "Investments & Relocation",
];

export default function Home() {
  const featuredPosts = blogPosts.slice(0, 3);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0">
            <img
              src={heroHome}
              alt="Beautiful home in Carver County, Minnesota"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/85 to-background/50" />
          </div>

          <div className="relative max-w-6xl mx-auto px-6 lg:px-8 py-24 md:py-32 lg:py-40">
            <div className="max-w-2xl animate-fade-up">
              <p className="text-primary font-medium tracking-wide mb-4">
                RE/MAX Advisors West | Chaska, Minnesota
              </p>
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-semibold text-foreground leading-tight mb-6">
                Hello, I'm Greg Anderson
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed mb-4">
                MN REALTOR since 1985. Over 3,000 homes sold. Broker/Owner of RE/MAX Advisors West.
              </p>
              <p className="text-base text-muted-foreground leading-relaxed mb-8">
                Host of the "Living In Carver County" podcast. Connecting friends, building community—one conversation at a time.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/blog"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
                  data-testid="button-hero-blog"
                >
                  Browse Free Content
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <a
                  href="https://livingincarvercounty.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-card border border-border rounded-lg font-medium hover:bg-secondary transition-colors"
                  data-testid="button-hero-podcast"
                >
                  <Play className="w-4 h-4" />
                  Listen to Podcast
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Bar */}
        <section className="py-12 bg-primary text-primary-foreground">
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {highlights.map((item, index) => (
                <div key={index} className="text-center">
                  <item.icon className="w-6 h-6 mx-auto mb-2 opacity-80" />
                  <p className="font-display text-2xl md:text-3xl font-semibold">{item.value}</p>
                  <p className="text-sm opacity-80">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* About Preview */}
        <section className="py-20 md:py-28">
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
              <div className="order-2 md:order-1">
                <p className="text-primary font-medium tracking-wide mb-4">Local Expertise</p>
                <h2 className="font-display text-3xl md:text-4xl font-semibold mb-6 leading-tight">
                  Why Local Knowledge Matters
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  Chaska's $452,000 median tells you nothing about the $900,000+ variation between Historic Downtown and Lake Bavaria estates. Generic metro agents miss these distinctions. I don't.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-8">
                  Four decades tracking every development, infrastructure change, and market cycle means I know not just what's happening—but why it matters to your transaction.
                </p>
                <div className="space-y-3">
                  {specialties.map((specialty, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                      <span className="text-foreground">{specialty}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="order-1 md:order-2">
                <div className="relative">
                  <img
                    src={agentPhoto}
                    alt="Greg Anderson - RE/MAX Advisors West"
                    className="w-full rounded-lg shadow-lg"
                  />
                  <div className="absolute -bottom-6 -left-6 bg-card p-6 rounded-lg shadow-lg border border-border/50 max-w-xs hidden lg:block">
                    <p className="font-display text-xl font-semibold text-foreground mb-1">Serving</p>
                    <p className="text-sm text-muted-foreground">Chaska, Chanhassen, Victoria, Eden Prairie, Carver, Waconia, Mayer, Cologne</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Recognition */}
        <section className="py-16 bg-secondary/30">
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-10">
              <p className="text-primary font-medium tracking-wide mb-2">Recognition</p>
              <h2 className="font-display text-2xl md:text-3xl font-semibold">Awards & Designations</h2>
            </div>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              {["RE/MAX Circle of Legends", "Lifetime Achievement", "Hall of Fame", "CRS", "GRI", "ABR", "CDPE", "CLHMS", "RFS"].map((award) => (
                <span key={award} className="px-4 py-2 bg-card rounded-full border border-border/50 text-muted-foreground">
                  {award}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Latest Content */}
        <section className="py-20 md:py-28">
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
              <div>
                <p className="text-primary font-medium tracking-wide mb-2">Latest Content</p>
                <h2 className="font-display text-3xl md:text-4xl font-semibold">
                  Fresh Insights & Advice
                </h2>
              </div>
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-primary font-medium hover:gap-3 transition-all"
                data-testid="link-view-all-posts"
              >
                View All Posts
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredPosts.map((post) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 md:py-28 bg-primary text-primary-foreground">
          <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
            <h2 className="font-display text-3xl md:text-4xl font-semibold mb-6">
              Ready to Make Your Move?
            </h2>
            <p className="text-primary-foreground/80 text-lg mb-8 max-w-2xl mx-auto">
              Whether buying your first Chaska home, selling Carver County property, managing distressed assets, or exploring investments—I bring local expertise and current market knowledge.
            </p>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-primary rounded-lg font-semibold hover:bg-white/90 transition-colors"
              data-testid="button-cta-connect"
            >
              Let's Connect
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
