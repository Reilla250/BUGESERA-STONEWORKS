export type Locale = "en" | "rw";

export const LOCALE_COOKIE = "locale";
export const DEFAULT_LOCALE: Locale = "en";

export function getLocaleFromValue(value?: string): Locale {
  return value === "rw" ? "rw" : "en";
}

export const dictionary = {
  en: {
    nav: {
      products: "Products",
      process: "How we work",
      about: "About",
      career: "Career",
      contact: "Contact",
    },
    actions: {
      browseProducts: "Browse products",
      signIn: "Sign in",
      signOut: "Sign out",
      myAccount: "My account",
      admin: "Admin",
      orderOnline: "Order online",
      backToProducts: "Back to products",
      viewDetails: "View details",
    },
    home: {
      location: "Bugesera District, Eastern Province, Rwanda",
      heroTitle: "Stone from Bugesera, quarried, crushed and cut to your order.",
      heroText:
        "One quarry, many products: building stone, graded gravel, stone dust and manufactured sand for contractors, road builders and developers across Rwanda.",
      productsTitle: "Everything the quarry can make",
      productsText: "Six product lines, so every part of the rock finds a buyer and little goes to waste.",
      gradingTitle: "Aggregates by grade",
      gradingText: "Final sizes are confirmed by laboratory tests and applicable RSB standards before supply.",
      processTitle: "From rock face to your site",
      processText: "We aim to cut waste and use as much of each blasted rock as possible.",
      marketTitle: "Rwanda is building",
      marketText:
        "NISR's 2025 report shows growth in both construction and quarrying. Growth in a sector does not guarantee that every quarry earns a profit, so we plan from tested stone and signed demand.",
      roadmapTitle: "Three phases of growth",
      ctaTitle: "Tell us what you are building and how much stone you need.",
      stats: { activity: "Construction activity, 2025 (NISR)", mining: "Mining and quarrying, 2025 (NISR)" },
    },
    footer: {
      explore: "Explore",
      talk: "Talk to us",
      allRights: "All rights reserved.",
    },
    about: {
      heroTitle: "A quarry built to sell more than rock",
      heroText:
        "Bugesera Stoneworks combines quarrying, crushing, cutting and manufacturing so one site can supply many kinds of construction material.",
      vision: "Vision",
      mission: "Mission",
      locationTitle: "Where we work",
      commitmentTitle: "What we are committed to",
      openingTeam: "Opening team",
      startingPlan: "A starting plan that will change with plant size, technology and shift pattern.",
    },
    process: {
      heroTitle: "How stone becomes product",
      heroText: "Nine steps from survey to delivery, with testing before anything leaves the yard.",
      rolloutPlan: "Rollout plan",
    },
    contact: {
      heroTitle: "Contact us",
      heroText: "Tell us what you need or call us directly for the best stone and aggregate supply support.",
      reachUs: "Reach us directly",
      location: "Location",
      message: "Message on WhatsApp",
    },
    career: {
      heroTitle: "Build your career with Bugesera Stoneworks",
      heroText:
        "We are growing a practical quarry and stoneworks team in Rwanda. If you enjoy safety, teamwork and production discipline, this is a place to build a real career in construction materials.",
      opportunities: "Career opportunities",
      value: "What we value",
    },
    login: {
      title: "Sign in",
      email: "Email",
      password: "Password",
      error: "Email or password is incorrect.",
      createAccount: "Create an account",
      newHere: "New here?",
    },
    account: {
      hello: "Hello",
      orders: "Orders",
      noOrders: "No orders yet.",
      placeOrder: "Place your first order",
      quoteRequests: "Quote requests",
      noQuotes: "No quote requests yet.",
      trackOrder: "Track order",
      payNow: "Pay now",
      thanks: "Thanks. We are confirming payment for order",
      statusUpdate: "The status below updates as soon as the provider confirms.",
    },
  },
  rw: {
    nav: {
      products: "Ibicuruzwa",
      process: "Ukora gute",
      about: "Ibyerekeye",
      career: "Akazi",
      contact: "Twandikire",
    },
    actions: {
      browseProducts: "Reba ibicuruzwa",
      signIn: "Injira",
      signOut: "Sohoka",
      myAccount: "Konti yanjye",
      admin: "Admin",
      orderOnline: "Gutumiza online",
      backToProducts: "Subira ku bicuruzwa",
      viewDetails: "Reba ibisobanuro",
    },
    home: {
      location: "Bugesera, Rwanda",
      heroTitle: "Amabuye ya Bugesera, yakuwe mu bitare, akajyanwa mu ruganda, akagurishwa ukurikije ibyo ukeneye.",
      heroText:
        "Twiteguye guha abatuye Rwanda ibikoresho by’ubwubatsi byiza, byizewe kandi bifite igiciro gihwanye n’ibyo bukeneye.",
      productsTitle: "Ibicuruzwa boroshye guhitamo",
      productsText: "Dufite ibicuruzwa bitandukanye, byo kubaka, gutunganya, gutanga, no gusohoza ibice byose by’amabuye.",
      gradingTitle: "Imfubyi y’amabuye",
      gradingText: "Ingano za buri cyiciro zigenzurwa neza mbere yo gutanga ibicuruzwa ku basoresha.",
      processTitle: "Kuva ku bitare kugeza ku rubuga rwawe",
      processText: "Dushaka kugabanya ibyangiritse tukakoresha ibice byose by’amabuye byakenewe.",
      marketTitle: "Rwanda irimo kubaka",
      marketText:
        "Ubwubatsi n’ukorora ibikoresho by’amabuye biriyongera buri mwaka. Ni yo mpamvu dukora mu buryo bwizewe, tukareba ibyo abakiriya bakeneye.",
      roadmapTitle: "Ibyiciro bitatu by’iterambere",
      ctaTitle: "Tubwire icyo urimo kubaka, maze tukubaze igiciro ry’ibikoresho ukeneye.",
      stats: { activity: "Ubwubatsi, 2025 (NISR)", mining: "Ubukorikori bw’ibitare, 2025 (NISR)" },
    },
    footer: {
      explore: "Reba",
      talk: "Tuvugishe",
      allRights: "Uburenganzira bwose burabitswe.",
    },
    about: {
      heroTitle: "Ikigo cy’amabuye cyubakiye gutanga ibicuruzwa byinshi kuruta amabuye gusa",
      heroText:
        "Bugesera Stoneworks ihuriza hamwe gucukura, gutunganya, no gukora ibikoresho by’ubwubatsi, kugira ngo inyubako, inzira n’imirimo byose bigere ku muturage wacu.",
      vision: "Icyo twifuza",
      mission: "Intego",
      locationTitle: "Aho dukorera",
      commitmentTitle: "Ibyo twizeza",
      openingTeam: "Itsinda ry’ingenzi",
      startingPlan: "Gahunda y’ibanze ihinduka bitewe n’akazi, ikoranabuhanga n’ibikorwa by’ingenzi.",
    },
    process: {
      heroTitle: "Amabuye ahinduka ibicuruzwa byateguwe",
      heroText: "Intambwe cyenda, kuva mu isesengura kugeza ku itangwa ry’ibicuruzwa.",
      rolloutPlan: "Gahunda y’iterambere",
    },
    contact: {
      heroTitle: "Twandikire",
      heroText: "Tubwire icyo ukeneye cyangwa ukuhamagare kugira ngo dukorereho ibicuruzwa by’amabuye n’umusenyi wizewe.",
      reachUs: "Tuvugishe neza",
      location: "Ahantu",
      message: "Uhamagare kuri WhatsApp",
    },
    career: {
      heroTitle: "Kora akazi ku Bugesera Stoneworks",
      heroText:
        "Turimo kubaka itsinda ry’abakozi bashoboye gukora neza, kubika umutekano, no gukora ibicuruzwa by’ubwubatsi byizewe.",
      opportunities: "Amahirwe yo gukorana",
      value: "Ibyo twubaha",
    },
    login: {
      title: "Injira",
      email: "Imeyili",
      password: "Ijambobanga",
      error: "Imeyili cyangwa ijambobanga sibyo.",
      createAccount: "Kora konti",
      newHere: "Ushya hano?",
    },
    account: {
      hello: "Muraho",
      orders: "Amabwiriza",
      noOrders: "Nta mabwiriza ufite.",
      placeOrder: "Shyiraho ibicuruzwa bya mbere",
      quoteRequests: "Ibyasabwe ku giciro",
      noQuotes: "Nta cyasabwe ku giciro.",
      trackOrder: "Kurikira ibicuruzwa",
      payNow: "Kwishyura none",
      thanks: "Murakoze. Turimo kwemeza amafaranga y’ibicuruzwa.",
      statusUpdate: "Imimerere izahinduka igihe uburyo bwo kwishyura bwemezwa.",
    },
  },
} as const;

export function getDictionary(locale: Locale) {
  return dictionary[locale];
}
