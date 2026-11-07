export const siteConfig = {
  name: "FitPassport",
  description:
    "Stop guessing your clothing size. Build your personal Fit Passport and discover better-fitting clothes across brands.",
  category: "Men's T-shirts",
} as const;

export const primaryNav = [
  { label: "How it works", href: "/#how-it-works" },
] as const;

export const howItWorksSteps = [
  {
    title: "Add sizes you already wear",
    description:
      "Start with the men's T-shirts in your wardrobe. Note the brand and the size that fits you well.",
  },
  {
    title: "Build your fit profile",
    description:
      "Those sizes become one Fit Passport — a consistent picture of how clothing fits you, not how a label describes it.",
  },
  {
    title: "Shop with a recommendation",
    description:
      "Check a suggested size before you buy, so a new brand's sizing stops being a guess.",
  },
] as const;

export const footerNav = [
  {
    heading: "Product",
    links: [
      { label: "How it works", href: "/#how-it-works" },
      { label: "Create your Fit Passport", href: "/register" },
    ],
  },
  {
    heading: "Account",
    links: [
      { label: "Log in", href: "/login" },
      { label: "Dashboard", href: "/dashboard" },
    ],
  },
] as const;
