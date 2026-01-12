import { Link } from "wouter";
import { Facebook, Instagram, Youtube, Linkedin, Mail, Phone, MapPin } from "lucide-react";

const socialLinks = [
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Youtube, href: "#", label: "YouTube" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
];

export function Footer() {
  return (
    <footer className="bg-secondary/50 border-t border-border/50 mt-auto">
      <div className="max-w-6xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <span className="font-display text-2xl font-semibold tracking-tight text-foreground">
              Chaska<span className="text-primary">Realty</span>
            </span>
            <p className="mt-4 text-muted-foreground text-sm leading-relaxed max-w-xs">
              Your trusted real estate partner in Chaska, Minnesota. Free advice, no commercials, just honest guidance.
            </p>
          </div>

          <div>
            <h4 className="font-display text-lg font-medium mb-4">Quick Links</h4>
            <div className="flex flex-col gap-3">
              <Link href="/" className="text-sm text-muted-foreground hover:text-primary transition-colors" data-testid="link-footer-home">
                Home
              </Link>
              <Link href="/blog" className="text-sm text-muted-foreground hover:text-primary transition-colors" data-testid="link-footer-blog">
                Blog
              </Link>
              <Link href="/about" className="text-sm text-muted-foreground hover:text-primary transition-colors" data-testid="link-footer-about">
                About
              </Link>
            </div>
          </div>

          <div>
            <h4 className="font-display text-lg font-medium mb-4">Contact</h4>
            <div className="flex flex-col gap-3">
              <a href="tel:+16125551234" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors" data-testid="link-phone">
                <Phone className="w-4 h-4" />
                (612) 555-1234
              </a>
              <a href="mailto:hello@chaskarealty.com" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors" data-testid="link-email">
                <Mail className="w-4 h-4" />
                hello@chaskarealty.com
              </a>
              <span className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4" />
                Chaska, Minnesota
              </span>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border/50 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} ChaskaRealty. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                className="p-2 rounded-full bg-background hover:bg-primary hover:text-primary-foreground transition-colors"
                aria-label={social.label}
                data-testid={`link-social-${social.label.toLowerCase()}`}
              >
                <social.icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
