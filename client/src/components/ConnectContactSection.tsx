import { useState } from "react";
import { Mail, MapPin, Phone } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { OFFICE } from "@/lib/office";

type Props = {
  variant?: "page" | "modal";
  showHeading?: boolean;
  title?: string;
  description?: string;
  onSuccess?: () => void;
  className?: string;
};

export function ConnectContactSection({
  variant = "page",
  showHeading = true,
  title = "Let’s Talk!",
  description = "Use one of the methods below to get in touch!",
  onSuccess,
  className,
}: Props) {
  const { toast } = useToast();

  const [sending, setSending] = useState(false);
  const [formName, setFormName] = useState("");
  const [formContact, setFormContact] = useState("");
  const [formMessage, setFormMessage] = useState("");

  async function submitContact(e: React.FormEvent) {
    e.preventDefault();
    if (!formMessage.trim()) {
      toast({ title: "Message is required" });
      return;
    }

    setSending(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formName.trim(),
          contact: formContact.trim(),
          message: formMessage.trim(),
        }),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body?.message || "Failed to send message");
      }

      toast({ title: "Message sent", description: "Thanks — I’ll get back to you soon." });
      setFormName("");
      setFormContact("");
      setFormMessage("");
      onSuccess?.();
    } catch (err: any) {
      toast({
        title: "Couldn’t send message",
        description: err?.message || "If this keeps happening, email thehybridbroker@gmail.com directly.",
      });
    } finally {
      setSending(false);
    }
  }

  const content = (
    <>
      {showHeading ? (
        <div className="max-w-2xl">
          <h2 className="font-display text-3xl md:text-4xl font-semibold">{title}</h2>
          <p className="mt-3 text-muted-foreground">{description}</p>
        </div>
      ) : null}

      <div className={`${showHeading ? "mt-8" : ""} grid gap-6 md:grid-cols-2`}>
        <div className="space-y-4">
            <div className="rounded-xl border bg-secondary/20 p-4">
              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-primary mt-0.5" />
                <div>
                  <div className="font-medium">Call/Text</div>
                  <div className="space-y-1 text-sm">
                    <a className="block text-primary hover:underline" href="tel:+16123866155">
                      Mobile: (612) 386-6155
                    </a>
                    <a className="block text-primary hover:underline" href="tel:+19523686014">
                      Direct: (952) 368-6014
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-xl border bg-secondary/20 p-4">
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-primary mt-0.5" />
                <div>
                  <div className="font-medium">Email</div>
                  <a className="text-sm text-primary hover:underline" href="mailto:thehybridbroker@gmail.com">
                    thehybridbroker@gmail.com
                  </a>
                </div>
              </div>
            </div>

            <div className="rounded-xl border bg-secondary/20 p-4">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary mt-0.5" />
                <div>
                  <div className="font-medium">Office</div>
                  <div className="text-sm text-muted-foreground">
                    {OFFICE.addressLines[0]}
                    <br />
                    {OFFICE.addressLines[1]}
                  </div>
                  <a
                    className="mt-2 inline-flex text-sm text-primary hover:underline"
                    href={OFFICE.googleMapsShareUrl || OFFICE.googleMapsQueryUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View on Google Maps
                  </a>
                </div>
              </div>
            </div>
        </div>

        <form onSubmit={submitContact} className="space-y-3">
            <div>
              <label className="block text-sm font-medium mb-1">Name</label>
              <input
                value={formName}
                onChange={(e) => setFormName(e.target.value)}
                className="w-full rounded-lg border bg-input px-3 py-2"
                placeholder="Your name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Contact info</label>
              <input
                value={formContact}
                onChange={(e) => setFormContact(e.target.value)}
                className="w-full rounded-lg border bg-input px-3 py-2"
                placeholder="Email or phone"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Message</label>
              <textarea
                value={formMessage}
                onChange={(e) => setFormMessage(e.target.value)}
                className="w-full rounded-lg border bg-input px-3 py-2 min-h-[120px]"
                placeholder="Tell me what you’re thinking…"
              />
            </div>
            <button
              type="submit"
              disabled={sending}
              className="w-full rounded-lg bg-primary px-4 py-2 font-medium text-primary-foreground disabled:opacity-50"
            >
              {sending ? "Sending…" : "Send message"}
            </button>
            <p className="text-xs text-muted-foreground">
              This will email <span className="font-medium">thehybridbroker@gmail.com</span>.
            </p>
        </form>
      </div>
    </>
  );

  if (variant === "modal") {
    return <div className={className}>{content}</div>;
  }

  return (
    <section className={className}>
      <div className="max-w-6xl mx-auto px-6 lg:px-8">{content}</div>
    </section>
  );
}
