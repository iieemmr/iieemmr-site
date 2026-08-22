export const TIER_ORDER = [
  "Jade",
  "Ruby",
  "Diamond",
  "Gold",
  "Fellowship",
  "Lunch",
  "Others",
] as const;

export type Tier = (typeof TIER_ORDER)[number];

export type Sponsor = {
  name: string;
  tier: Tier;
  logoSrc: string;
  alt: string;
  subCategory?: string;
};

export const sponsors: Sponsor[] = [
  // Jade
  { name: "Westco", tier: "Jade", logoSrc: "/photos/sponsors/JADE_Westco_logo.png", alt: "Westco logo" },
  { name: "American Wire & Cable", tier: "Jade", logoSrc: "/photos/sponsors/JADE_AmericanWireCable_logo.png", alt: "American Wire & Cable logo" },
  { name: "Cargill", tier: "Jade", logoSrc: "/photos/sponsors/JADE_Cargill_logo.png", alt: "Cargill logo" },
  { name: "Exquis", tier: "Jade", logoSrc: "/photos/sponsors/JADE_Exquis_logo.png", alt: "Exquis logo" },
  { name: "Meralco", tier: "Jade", logoSrc: "/photos/sponsors/JADE_Meralco_logo.png", alt: "Meralco logo" },
  { name: "Switch Industrial", tier: "Jade", logoSrc: "/photos/sponsors/JADE_SwitchIndustrial_logo.png", alt: "Switch Industrial logo" },

  // Ruby
  { name: "PPI", tier: "Ruby", logoSrc: "/photos/sponsors/RUBY_PPI_logo.png", alt: "PPI logo" },

  // Diamond
  { name: "Danitech", tier: "Diamond", logoSrc: "/photos/sponsors/DIAMOND_Danitech_logo.png", alt: "Danitech logo" },
  { name: "London Industrial Products", tier: "Diamond", logoSrc: "/photos/sponsors/DIAMOND_LondonIndustrialProducts_logo.png", alt: "London Industrial Products logo" },
  { name: "Sim Marketing", tier: "Diamond", logoSrc: "/photos/sponsors/DIAMOND_SimMarketing_logo.png", alt: "Sim Marketing logo" },
  { name: "Total Solar", tier: "Diamond", logoSrc: "/photos/sponsors/DIAMOND_TotalSolar_logo.png", alt: "Total Solar logo" },
  { name: "The Sentinel", tier: "Diamond", logoSrc: "/photos/sponsors/DIAMOND_TheSentinel_logo.png", alt: "The Sentinel logo" },

  // Gold
  { name: "ASPAP", tier: "Gold", logoSrc: "/photos/sponsors/GOLD_ASPAP_logo.png", alt: "ASPAP logo" },
  { name: "Centrade", tier: "Gold", logoSrc: "/photos/sponsors/GOLD_Centrade_logo.png", alt: "Centrade logo" },
  { name: "Hypertech Wire & Cable", tier: "Gold", logoSrc: "/photos/sponsors/GOLD_HypertechWireCable_logo.png", alt: "Hypertech Wire & Cable logo" },
  { name: "Kings Safety", tier: "Gold", logoSrc: "/photos/sponsors/GOLD_KingsSafety_logo.png", alt: "Kings Safety logo" },
  { name: "Kinmo", tier: "Gold", logoSrc: "/photos/sponsors/GOLD_Kinmo_logo.png", alt: "Kinmo logo" },
  { name: "LS Electric", tier: "Gold", logoSrc: "/photos/sponsors/GOLD_LSElectric_logo.png", alt: "LS Electric logo" },
  { name: "Miescor", tier: "Gold", logoSrc: "/photos/sponsors/GOLD_Miescor_logo.png", alt: "Miescor logo" },
  { name: "MSpectrum", tier: "Gold", logoSrc: "/photos/sponsors/GOLD_MSpectrum_logo.png", alt: "MSpectrum logo" },
  { name: "Philflex", tier: "Gold", logoSrc: "/photos/sponsors/GOLD_Philflex_logo.png", alt: "Philflex logo" },
  { name: "RPV", tier: "Gold", logoSrc: "/photos/sponsors/GOLD_RPV_logo.png", alt: "RPV logo" },
  { name: "RS Components", tier: "Gold", logoSrc: "/photos/sponsors/GOLD_RSComponents_logo.png", alt: "RS Components logo" },
  { name: "Secore Global", tier: "Gold", logoSrc: "/photos/sponsors/GOLD_SecoreGlobal_logo.png", alt: "Secore Global logo" },
  { name: "Shieldcon", tier: "Gold", logoSrc: "/photos/sponsors/GOLD_Shieldcon_logo.png", alt: "Shieldcon logo" },
  { name: "Shihlin Electric", tier: "Gold", logoSrc: "/photos/sponsors/GOLD_ShihlinElectric_logo.png", alt: "Shihlin Electric logo" },
  { name: "Solidtech Metal", tier: "Gold", logoSrc: "/photos/sponsors/GOLD_Solidtech_logo.png", alt: "Solidtech Metal logo" },
  { name: "Watts App", tier: "Gold", logoSrc: "/photos/sponsors/GOLD_WattsApp_logo.png", alt: "Watts App logo" },
  { name: "Weichai", tier: "Gold", logoSrc: "/photos/sponsors/GOLD_Weichai_logo.png", alt: "Weichai logo" },
  { name: "SPMC Schwer", tier: "Gold", logoSrc: "/photos/sponsors/GOLD_SPMCSchwer_logo.png", alt: "SPMC Schwer logo" },

  // Fellowship
  { name: "LM Power", tier: "Fellowship", logoSrc: "/photos/sponsors/FELLOWSHIP_LMPower_logo.png", alt: "LM Power logo" },

  // Lunch
  { name: "EBSI", tier: "Lunch", logoSrc: "/photos/sponsors/LUNCH_EBSI_logo.png", alt: "EBSI logo" },
  { name: "Emerald", tier: "Lunch", logoSrc: "/photos/sponsors/LUNCH_Emerald_logo.png", alt: "Emerald logo" },

  // Others
  { name: "Harrix Wires & Cables", tier: "Others", subCategory: "Souvenir Program", logoSrc: "/photos/sponsors/OTHERS_HarrixWiresCables_logo.png", alt: "Harrix Wires & Cables logo" },
  { name: "Aplus Power Solution Corp", tier: "Others", subCategory: "STP", logoSrc: "/photos/sponsors/OTHERS_AplusPowerSolutionCorp_logo.png", alt: "Aplus Power Solution Corp logo" },
  { name: "Columbia Wires and Cables", tier: "Others", subCategory: "Event I.D Lace", logoSrc: "/photos/sponsors/OTHERS_ColumbiaWiresCables_logo.png", alt: "Columbia Wires and Cables logo" },
  { name: "Direct Eletrix", tier: "Others", subCategory: "Logo & Inside Half", logoSrc: "/photos/sponsors/OTHERS_DirectEletrix_logo.png", alt: "Direct Eletrix logo" },
  { name: "Form Factor Dynamics", tier: "Others", subCategory: "Logo", logoSrc: "/photos/sponsors/OTHERS_FormFactorDynamics_logo.png", alt: "Form Factor Dynamics logo" },
  { name: "JDAS", tier: "Others", subCategory: "Logo", logoSrc: "/photos/sponsors/OTHERS_JDAS_logo.png", alt: "JDAS logo" },
  { name: "Koten", tier: "Others", subCategory: "Event I.D Card", logoSrc: "/photos/sponsors/OTHERS_Koten_logo.png", alt: "Koten logo" },
  { name: "M.E.D Electrical Trading", tier: "Others", subCategory: "Logo", logoSrc: "/photos/sponsors/OTHERS_MEDElectricalTrading_logo.png", alt: "M.E.D Electrical Trading logo" },
  { name: "Poly-Ion Engineering Services", tier: "Others", subCategory: "Souvenir Program", logoSrc: "/photos/sponsors/OTHERS_PolyIonEngineeringServices_logo.png", alt: "Poly-Ion Engineering Services logo" },
  { name: "Up-Tech Builders", tier: "Others", subCategory: "Logo", logoSrc: "/photos/sponsors/OTHERS_UpTechBuilders_logo.png", alt: "Up-Tech Builders logo" },
];

export type Acknowledgment = {
  name: string;
  alt: string;
  note: string;
};

export const acknowledgments: Acknowledgment[] = [
  {
    name: "Cavite State University – Bacoor Campus",
    alt: "Cavite State University – Bacoor Campus logo",
    note: "Makatikas Exhibition Drill Team — performed the opening ceremony",
  },
];
