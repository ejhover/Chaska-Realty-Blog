import { Link } from "wouter";
import { ArrowRight, Play, CheckCircle } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { BlogCard } from "@/components/BlogCard";
import { blogPosts } from "@/lib/blogData";
import heroHome from "@assets/stock_images/luxury_home_exterior_4a6b3f4f.jpg";
import agentPhoto from "@assets/stock_images/professional_real_es_441f93e4.jpg";

const benefits = [
  "Free real estate education with no hidden agenda",
  "Local Chaska market expertise since 2010",
  "Personalized guidance for buyers and sellers",
  "No commercials or sponsored content",
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
              alt="Beautiful home in Chaska, Minnesota"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/80 to-background/40" />
          </div>

          <div className="relative max-w-6xl mx-auto px-6 lg:px-8 py-24 md:py-32 lg:py-40">
            <div className="max-w-2xl animate-fade-up">
              <p className="text-primary font-medium tracking-wide mb-4">
                Chaska, Minnesota Real Estate
              </p>
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-semibold text-foreground leading-tight mb-6">
                Free Real Estate Advice You Can Trust
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8 max-w-xl">
                Expert guidance for buying and selling homes in the Twin Cities. 
                No commercials, no hidden agendas—just honest advice from a local broker.
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
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-card border border-border rounded-lg font-medium hover:bg-secondary transition-colors"
                  data-testid="button-hero-about"
                >
                  <Play className="w-4 h-4" />
                  Meet Your Broker
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Value Proposition */}
        <section className="py-20 md:py-28 bg-secondary/30">
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
              <div className="order-2 md:order-1">
                <h2 className="font-display text-3xl md:text-4xl font-semibold mb-6 leading-tight">
                  Real Estate Education, Made Simple
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-8">
                  Whether you're buying your first home or selling your forever home, 
                  navigating real estate can feel overwhelming. That's why I create free, 
                  no-nonsense content to help you make confident decisions.
                </p>
                <ul className="space-y-4">
                  {benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-foreground">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="order-1 md:order-2">
                <div className="relative">
                  <img
                    src={agentPhoto}
                    alt="Your Chaska real estate broker"
                    className="w-full rounded-lg shadow-lg"
                  />
                  <div className="absolute -bottom-6 -left-6 bg-card p-6 rounded-lg shadow-lg border border-border/50 max-w-xs hidden lg:block">
                    <p className="font-display text-2xl font-semibold text-primary mb-1">15+</p>
                    <p className="text-sm text-muted-foreground">Years helping families find their perfect home in Chaska</p>
                  </div>
                </div>
              </div>
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
              Whether you're thinking about buying, selling, or just exploring your options, 
              I'm here to help with honest, pressure-free guidance.
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
