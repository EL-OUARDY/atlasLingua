import { ROUTES } from "@/routes/routes";

export const APP_NAME = "AtlasLingua";
export const APP_INFO =
  "Our app offers AI-powered translations, a rich vocabulary dictionary from English to Darija, and plenty of helpful learning materials";

export const APP_EMAIL = "contact@wadi3.codes";
export const APP_GITHUB = "https://github.com/EL-OUARDY/atlasLingua";
export const APP_TWITTER = "https://x.com/_ELOUARDY";
export const APP_BMC = "https://ko-fi.com/atlaslingua";

export const GET_STARTED: {
  title: string;
  href: string;
  description: string;
}[] = [
  {
    title: "Our Vision",
    href: "#",
    description:
    "Create a powerful platform that facilitates accurate and intuitive translation.",
  },
  {
    title: "Community",
    href: ROUTES.community,
    description:
      "Connect with fellow learners and Moroccans. Share tips, ask questions, and practice Darija together.",
  },
  {
    title: "Contributions",
    href: ROUTES.contribution,
    description:
      "We're working to gather a complete language data set and build smarter translation tools, and you can be a part of it!",
  },
];

export const FEATURES: {
  title: string;
  href: string;
  description: string;
}[] = [
  {
    title: "AI-Powered Translation",
    href: ROUTES.translate.index,
    description:
      "Continually learns and adapts, delivering nuanced translations.",
  },
  {
    title: "Community",
    href: ROUTES.community,
    description:
      "Join a vibrant ecosystem of language enthusiasts and native speakers.",
  },
  {
    title: "Dictionary",
    href: ROUTES.dictionary,
    description:
      "Discover the richness of Darija with our user-friendly dictionary!",
  },
  {
    title: "Summarization",
    href: ROUTES.translate.summarization,
    description:
      "Transform lengthy texts into concise, actionable insights.",
  },
  {
    title: "Learn",
    href: ROUTES.learn,
    description:
      "Access a vast, well-organized collection of Darija vocabulary.",
  },
  {
    title: "On-Demand Help (Contact Us)",
    href: ROUTES.contact,
    description:
      "Translations or cultural queries with personalized, real-time assistance.",
  },
];
