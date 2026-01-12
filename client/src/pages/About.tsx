import { Link } from "wouter";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ArrowRight, Mail, Phone, MapPin, Facebook, Instagram, Youtube, Linkedin, Award, Users, Home, Heart } from "lucide-react";
import agentPhoto from "@assets/stock_images/professional_real_es_441f93e4.jpg";

const stats = [
  { icon: Home, value: "500+", label: "Homes Sold" },
  { icon: Users, value: "15+", label: "Years Experience" },
  { icon: Award, value: "Top 5%", label: "MN Realtors" },
  { icon: Heart, value: "100%", label: "Client Focus" },
];

const socialLinks = [
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Youtube, href: "#", label: "YouTube" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
];

export default function About() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1">
        {/* Hero */}
        <section className="py-16 md:py-24 bg-secondary/30">
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
              <div>
                <p className="text-primary font-medium tracking-wide mb-4">About Me</p>
                <h1 className="font-display text-4xl md:text-5xl font-semibold mb-6 leading-tight">
                  Your Chaska Real Estate Partner
                </h1>
                <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                  I'm a real estate broker based in Chaska, Minnesota, dedicated to helping 
                  families navigate one of life's biggest decisions—with honesty, expertise, 
                  and zero sales pressure.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  My mission is simple: provide free, valuable real estate education to 
                  anyone who needs it. Through my blog, videos, and one-on-one conversations, 
                  I share everything I've learned from 15+ years in the industry.
                </p>
              </div>
              <div className="relative">
                <img
                  src={agentPhoto}
                  alt="Your Chaska real estate broker"
                  className="w-full rounded-xl shadow-lg"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-16 border-b border-border/50">
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary mb-4">
                    <stat.icon className="w-6 h-6" />
                  </div>
                  <p className="font-display text-3xl font-semibold text-foreground mb-1">
                    {stat.value}
                  </p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* My Story */}
        <section className="py-20 md:py-28">
          <div className="max-w-3xl mx-auto px-6 lg:px-8">
            <h2 className="font-display text-3xl md:text-4xl font-semibold mb-8 text-center">
              My Story
            </h2>
            <div className="prose prose-lg max-w-none text-muted-foreground">
              <p className="leading-relaxed mb-6">
                I grew up in the Twin Cities area and fell in love with Chaska's unique blend 
                of small-town charm and modern amenities. After spending years in corporate 
                sales, I realized my true passion was helping people—not just closing deals.
              </p>
              <p className="leading-relaxed mb-6">
                When I became a real estate broker, I saw an industry full of pushy sales 
                tactics and confusing jargon. I knew there had to be a better way. That's 
                when I started creating free educational content to help buyers and sellers 
                feel empowered, not pressured.
              </p>
              <p className="leading-relaxed mb-6">
                Today, my blog and video content reaches thousands of people each month. 
                Whether you work with me directly or simply benefit from my free resources, 
                my goal is the same: help you make confident, informed decisions about 
                your real estate journey.
              </p>
              <p className="leading-relaxed">
                When I'm not helping clients or creating content, you'll find me exploring 
                Minnesota's beautiful lakes, cheering on the Vikings (yes, really), and 
                spending time with my family in our Chaska home.
              </p>
            </div>
          </div>
        </section>

        {/* Why Free Content */}
        <section className="py-20 md:py-28 bg-secondary/30">
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="font-display text-3xl md:text-4xl font-semibold mb-6">
                Why Free Content?
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                I believe everyone deserves access to quality real estate education, 
                regardless of whether they're ready to buy or sell. No commercials, 
                no sponsored content, no hidden agenda—just genuine advice from someone 
                who cares about doing right by people.
              </p>
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-primary font-medium hover:gap-3 transition-all"
                data-testid="link-explore-content"
              >
                Explore Free Content
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-20 md:py-28">
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-12 lg:gap-20">
              <div>
                <h2 className="font-display text-3xl md:text-4xl font-semibold mb-6">
                  Let's Connect
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-8">
                  Have questions about the Chaska market? Thinking about buying or selling? 
                  Or just want to say hi? I'd love to hear from you. No pressure, 
                  just a friendly conversation.
                </p>

                <div className="space-y-4 mb-8">
                  <a
                    href="tel:+16125551234"
                    className="flex items-center gap-3 text-foreground hover:text-primary transition-colors"
                    data-testid="link-contact-phone"
                  >
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <Phone className="w-5 h-5 text-primary" />
                    </div>
                    (612) 555-1234
                  </a>
                  <a
                    href="mailto:hello@chaskarealty.com"
                    className="flex items-center gap-3 text-foreground hover:text-primary transition-colors"
                    data-testid="link-contact-email"
                  >
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <Mail className="w-5 h-5 text-primary" />
                    </div>
                    hello@chaskarealty.com
                  </a>
                  <div className="flex items-center gap-3 text-foreground">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <MapPin className="w-5 h-5 text-primary" />
                    </div>
                    Chaska, Minnesota 55318
                  </div>
                </div>

                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-3">
                    Follow for daily tips
                  </p>
                  <div className="flex items-center gap-3">
                    {socialLinks.map((social) => (
                      <a
                        key={social.label}
                        href={social.href}
                        className="w-10 h-10 rounded-full bg-secondary hover:bg-primary hover:text-primary-foreground flex items-center justify-center transition-colors"
                        aria-label={social.label}
                        data-testid={`link-about-social-${social.label.toLowerCase()}`}
                      >
                        <social.icon className="w-5 h-5" />
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              <div className="bg-card border border-border/50 rounded-xl p-8 shadow-sm">
                <h3 className="font-display text-xl font-semibold mb-6">
                  Send a Message
                </h3>
                <form className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      className="w-full px-4 py-3 bg-secondary border-0 rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
                      placeholder="Your name"
                      data-testid="input-contact-name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="w-full px-4 py-3 bg-secondary border-0 rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
                      placeholder="your@email.com"
                      data-testid="input-contact-email"
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium mb-2">
                      Message
                    </label>
                    <textarea
                      id="message"
                      rows={4}
                      className="w-full px-4 py-3 bg-secondary border-0 rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none"
                      placeholder="How can I help you?"
                      data-testid="input-contact-message"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
                    data-testid="button-contact-submit"
                  >
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
