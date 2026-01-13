import { Link } from "wouter";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ArrowRight, Mail, Phone, MapPin, Facebook, Instagram, Youtube, FileText, Award, Users, Home, Heart, Dumbbell, GraduationCap, Utensils, Building2 } from "lucide-react";
import agentPhoto from "@assets/stock_images/professional_real_es_441f93e4.jpg";

const stats = [
  { icon: Home, value: "3,000+", label: "Homes Sold" },
  { icon: Users, value: "41", label: "Years Experience" },
  { icon: Award, value: "1985", label: "Licensed Since" },
  { icon: Heart, value: "100%", label: "Client Focus" },
];

const socialLinks = [
  { icon: Facebook, href: "https://facebook.com/Advisors.West", label: "Facebook" },
  { icon: Instagram, href: "https://www.instagram.com/thehybridbroker/", label: "Instagram" },
  { icon: Youtube, href: "https://www.youtube.com/@HelloIamGregAnderson", label: "YouTube" },
  { icon: FileText, href: "https://substack.com/@helloiamgreganderson", label: "Substack" },
];

const specialties = [
  "Development Land",
  "Luxury Homes",
  "Buyer Brokerage",
  "Foreclosure Property",
  "Relocation",
  "New Construction",
  "Investments",
  "REO & Short Sales",
];

const serviceAreas = [
  "Chaska",
  "Chanhassen",
  "Victoria",
  "Eden Prairie",
  "Carver",
  "Waconia",
  "Mayer",
  "Cologne",
  "Minnetonka",
  "Norwood Young America",
];

const designations = ["ABR", "CDPE", "CLHMS", "CRS", "GRI", "RFS"];

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
                <h1 className="font-display text-4xl md:text-5xl font-semibold mb-4 leading-tight">
                  Greg Anderson
                </h1>
                <p className="text-xl text-primary font-medium mb-6">
                  Broker/Owner, RE/MAX Advisors West
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                  Family guy who lives in Carver County Minnesota, and has been selling homes in the southwest Minneapolis suburbs since 1985. Host of "The Living In Carver County Podcast."
                </p>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  Connecting friends, building community—one conversation at a time. I also compete worldwide in kettlebell sport, traditional and marathon events.
                </p>
                <div className="flex flex-wrap gap-2">
                  {designations.map((d) => (
                    <span key={d} className="px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full">
                      {d}
                    </span>
                  ))}
                </div>
              </div>
              <div className="relative">
                <img
                  src={agentPhoto}
                  alt="Greg Anderson - RE/MAX Advisors West"
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

        {/* Philosophy */}
        <section className="py-20 md:py-28">
          <div className="max-w-3xl mx-auto px-6 lg:px-8">
            <h2 className="font-display text-3xl md:text-4xl font-semibold mb-8 text-center">
              My Philosophy
            </h2>
            <div className="prose prose-lg max-w-none text-muted-foreground">
              <p className="leading-relaxed mb-6">
                To provide the best possible service available, I assembled a team to make sure each step of the transaction runs smoothly & efficiently. We follow a simple business philosophy: to provide an outstanding service experience.
              </p>
              <p className="leading-relaxed mb-6">
                It's our goal to exceed all expectations both during & after every transaction. As a result, clients enthusiastically refer family members, friends, neighbors, & co-workers to us for any aspect of the real estate process.
              </p>
              <p className="leading-relaxed mb-6">
                Real estate evolves constantly—and so do I. Since 1985, I've solved complex property challenges, but my focus is what works NOW: AI-enhanced analysis, data-driven pricing, and technology delivering results clients can't achieve alone.
              </p>
            </div>
          </div>
        </section>

        {/* Three Specializations */}
        <section className="py-20 md:py-28 bg-secondary/30">
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-12">
              <p className="text-primary font-medium tracking-wide mb-2">Expertise</p>
              <h2 className="font-display text-3xl md:text-4xl font-semibold">
                Three Areas of Focus
              </h2>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-card p-8 rounded-xl border border-border/50">
                <h3 className="font-display text-xl font-semibold mb-4">Traditional Residential Sales</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Helping families buy and sell with deep local knowledge from hundreds of annual transactions. I know which neighborhoods appreciate, which streets command premiums, and how to maximize value.
                </p>
              </div>
              <div className="bg-card p-8 rounded-xl border border-border/50">
                <h3 className="font-display text-xl font-semibold mb-4">Distressed Property Solutions</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Working with homeowners facing hardship, lenders managing REO portfolios, and investors. Clients include Fannie Mae, JP Morgan Chase, Bank of America, Wells Fargo, and national private equity firms.
                </p>
              </div>
              <div className="bg-card p-8 rounded-xl border border-border/50">
                <h3 className="font-display text-xl font-semibold mb-4">New Construction & Land</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Partnering with builders from single-lot sales to large-scale liquidations, with expertise in Carver County's Highway 212 corridor development.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Specialties & Service Areas */}
        <section className="py-20 md:py-28">
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <h3 className="font-display text-2xl font-semibold mb-6">Specialties</h3>
                <div className="flex flex-wrap gap-2">
                  {specialties.map((s) => (
                    <span key={s} className="px-4 py-2 bg-secondary rounded-lg text-sm text-secondary-foreground">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="font-display text-2xl font-semibold mb-6">Service Areas</h3>
                <div className="flex flex-wrap gap-2">
                  {serviceAreas.map((area) => (
                    <span key={area} className="px-4 py-2 bg-secondary rounded-lg text-sm text-secondary-foreground">
                      {area}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Recognition */}
        <section className="py-16 bg-primary text-primary-foreground">
          <div className="max-w-6xl mx-auto px-6 lg:px-8 text-center">
            <h3 className="font-display text-2xl font-semibold mb-6">Recognition</h3>
            <p className="text-primary-foreground/80 max-w-2xl mx-auto mb-6">
              RE/MAX Circle of Legends, Lifetime Achievement, Hall of Fame | NAR: CRS, GRI, ABR, CDPE | Founded RE/MAX Advisors West (1997) | Featured in Star Tribune, REALTOR Magazine
            </p>
          </div>
        </section>

        {/* Personal */}
        <section className="py-20 md:py-28">
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="font-display text-3xl md:text-4xl font-semibold mb-4">
                Beyond Real Estate
              </h2>
              <p className="text-muted-foreground">
                When I'm not helping clients, here's what keeps me busy.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center p-6">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary mb-4">
                  <Utensils className="w-6 h-6" />
                </div>
                <h4 className="font-display text-lg font-semibold mb-2">Food & Wine</h4>
                <p className="text-sm text-muted-foreground">Exploring culinary experiences</p>
              </div>
              <div className="text-center p-6">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary mb-4">
                  <Dumbbell className="w-6 h-6" />
                </div>
                <h4 className="font-display text-lg font-semibold mb-2">Kettlebell Sport</h4>
                <p className="text-sm text-muted-foreground">Worldwide competitor in traditional and marathon events</p>
              </div>
              <div className="text-center p-6">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary mb-4">
                  <Building2 className="w-6 h-6" />
                </div>
                <h4 className="font-display text-lg font-semibold mb-2">Civic Activities</h4>
                <p className="text-sm text-muted-foreground">Chamber of Commerce & Rotary member</p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-20 md:py-28 bg-secondary/30">
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-12 lg:gap-20">
              <div>
                <h2 className="font-display text-3xl md:text-4xl font-semibold mb-6">
                  Let's Connect
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-8">
                  Whether you're thinking about buying, selling, or just want to chat about the Carver County market—I'd love to hear from you. No pressure, just a friendly conversation.
                </p>

                <div className="space-y-4 mb-8">
                  <a
                    href="tel:+19525551234"
                    className="flex items-center gap-3 text-foreground hover:text-primary transition-colors"
                    data-testid="link-contact-phone"
                  >
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <Phone className="w-5 h-5 text-primary" />
                    </div>
                    Contact Office
                  </a>
                  <a
                    href="mailto:greg@advisorswest.com"
                    className="flex items-center gap-3 text-foreground hover:text-primary transition-colors"
                    data-testid="link-contact-email"
                  >
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <Mail className="w-5 h-5 text-primary" />
                    </div>
                    greg@advisorswest.com
                  </a>
                  <div className="flex items-start gap-3 text-foreground">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p>207 Chestnut St, Ste. 100</p>
                      <p>Chaska, MN 55318</p>
                    </div>
                  </div>
                </div>

                <div className="mb-8">
                  <p className="text-sm font-medium text-muted-foreground mb-3">
                    Connect with me
                  </p>
                  <div className="flex items-center gap-3">
                    {socialLinks.map((social) => (
                      <a
                        key={social.label}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 rounded-full bg-background hover:bg-primary hover:text-primary-foreground flex items-center justify-center transition-colors"
                        aria-label={social.label}
                        data-testid={`link-about-social-${social.label.toLowerCase()}`}
                      >
                        <social.icon className="w-5 h-5" />
                      </a>
                    ))}
                  </div>
                </div>

                <a
                  href="https://livingincarvercounty.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-primary font-medium hover:gap-3 transition-all"
                  data-testid="link-podcast-cta"
                >
                  Listen to the Living In Carver County Podcast
                  <ArrowRight className="w-4 h-4" />
                </a>
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
