export const profile = {
  name: "Dani Harmade",
  role: "QA Engineer · Software Engineer · System Analyst",
  tagline: "1+ years of experience in software development.",
  email: "daniharmade@gmail.com",
  portfolioUrl: "https://daniharmade.vercel.app/",
  openToWork: true,
  lastUpdated: "2026",
  stack: ["Appium", "Playwright", "Laravel", "JavaScript", "Kotlin", "Python", "Postman"],
};

// Icon row at the top. `copy: true` copies the value instead of navigating.
export const socials = [
  { label: "LinkedIn", url: "https://www.linkedin.com/in/daniharmade/", icon: "fa-brands fa-linkedin-in" },
  { label: "GitHub", url: "https://github.com/daniharmade", icon: "fa-brands fa-github" },
  { label: "Copy email address", copy: profile.email, icon: "fa-solid fa-envelope" },
  { label: "Google Scholar", url: "https://scholar.google.com/citations?user=TYSZfHQAAAAJ&hl=id", icon: "fa-solid fa-graduation-cap" },
];

export const links = [
  { group: "Featured", title: "Website", description: "Experience, projects, and CV", url: "https://daniharmade.vercel.app/", icon: "fa-solid fa-globe" },
  { group: "Featured", title: "Portfolio (PDF)", description: "Selected work in one document", url: "asset/portfolio.pdf", icon: "fa-solid fa-folder-open" },
  { group: "Featured", title: "Download CV", description: "Latest resume as PDF", url: "https://daniharmade.vercel.app/pdf/cv-dani-harmade.pdf", icon: "fa-solid fa-file" },

  { group: "Social", title: "LinkedIn", description: "Let's connect", url: "https://www.linkedin.com/in/daniharmade/", icon: "fa-brands fa-linkedin" },
  { group: "Social", title: "GitHub", description: "View my code", url: "https://github.com/daniharmade", icon: "fa-brands fa-github" },
  { group: "Social", title: "Dicoding", description: "Learning journey", url: "https://www.dicoding.com/users/dani_harmade/academies", icon: "fa-solid fa-graduation-cap" },
  { group: "Social", title: "YouTube", description: "Watch videos", url: "https://www.youtube.com/channel/UC6k1jD6eKMEUN5sD4ICTrzw", icon: "fa-brands fa-youtube" },
  { group: "Social", title: "Instagram", description: "Follow me", url: "https://www.instagram.com/daniharmade/", icon: "fa-brands fa-instagram" },
  { group: "Social", title: "Facebook", description: "Say hi", url: "https://www.facebook.com/daniharmade", icon: "fa-brands fa-facebook" },

  { group: "Research", title: "Google Scholar", description: "Research papers", url: "https://scholar.google.com/citations?user=TYSZfHQAAAAJ&hl=id", icon: "fa-solid fa-book" },
  { group: "Research", title: "ResearchGate", description: "Publications and collaboration", url: "https://www.researchgate.net/profile/Dani-Harmade", icon: "fa-solid fa-flask" },
  { group: "Research", title: "ORCID", description: "Researcher profile", url: "https://orcid.org/0009-0009-1044-4653", icon: "fa-solid fa-id-badge" },

  { group: "Contact", title: "Email", description: "daniharmade@gmail.com", url: "mailto:daniharmade@gmail.com", icon: "fa-solid fa-envelope", external: false },
  { group: "Contact", title: "Support via QRIS", description: "Scan with any e-wallet", action: "qris", icon: "fa-solid fa-qrcode" },
];
