import type { BlogPost } from "@/components/BlogCard";
import livingRoom1 from "@assets/stock_images/cozy_modern_living_r_531f80ac.jpg";
import livingRoom2 from "@assets/stock_images/cozy_modern_living_r_4d621c4c.jpg";

export const categories = [
  "Buying Tips",
  "Selling Tips",
  "Market Updates",
  "Home Staging",
  "First-Time Buyers",
  "Investment",
];

export const blogPosts: BlogPost[] = [
  {
    id: "understanding-chaska-market-2024",
    title: "Understanding the Chaska Real Estate Market in 2024",
    excerpt: "A comprehensive look at current trends, pricing, and what buyers and sellers should expect in our local market this year.",
    category: "Market Updates",
    type: "video",
    image: livingRoom1,
    date: "Jan 8, 2026",
    readTime: "12 min watch",
  },
  {
    id: "5-mistakes-first-time-buyers",
    title: "5 Costly Mistakes First-Time Homebuyers Make",
    excerpt: "Learn from others' experiences. These common pitfalls can cost you thousands—here's how to avoid them.",
    category: "First-Time Buyers",
    type: "article",
    image: livingRoom2,
    date: "Jan 5, 2026",
    readTime: "6 min read",
  },
  {
    id: "staging-tips-sell-faster",
    title: "Home Staging Tips That Actually Help You Sell Faster",
    excerpt: "Simple, budget-friendly staging techniques that make a real difference in how quickly your home sells.",
    category: "Home Staging",
    type: "gallery",
    image: livingRoom1,
    date: "Jan 2, 2026",
    readTime: "8 min read",
  },
  {
    id: "when-to-sell-your-home",
    title: "When Is the Best Time to Sell Your Home in Minnesota?",
    excerpt: "Timing matters. Discover the seasonal patterns and market conditions that could maximize your sale price.",
    category: "Selling Tips",
    type: "video",
    image: livingRoom2,
    date: "Dec 28, 2025",
    readTime: "9 min watch",
  },
  {
    id: "negotiation-strategies-buyers",
    title: "Negotiation Strategies Every Buyer Should Know",
    excerpt: "Real-world tactics to help you get the best deal possible without losing the home you love.",
    category: "Buying Tips",
    type: "article",
    image: livingRoom1,
    date: "Dec 22, 2025",
    readTime: "7 min read",
  },
  {
    id: "investment-property-basics",
    title: "Getting Started with Investment Properties",
    excerpt: "Everything you need to know about buying your first rental property in the Twin Cities area.",
    category: "Investment",
    type: "video",
    image: livingRoom2,
    date: "Dec 18, 2025",
    readTime: "15 min watch",
  },
];
