import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Bot, X, Send, ChevronDown, MessageCircle, Phone } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { productsData } from '../data/productsData';
import { applicationsData } from '../data/applicationsData';
import './ChatBot.css';

// ── Business hours — for STATUS INDICATOR only, never blocks answering ────────
const BIZ_OPEN  = 11;
const BIZ_CLOSE = 19;

function getIST() {
  const utcMs = Date.now() + new Date().getTimezoneOffset() * 60000;
  const ist = new Date(utcMs + 5.5 * 3600000);
  return { h: ist.getHours(), day: ist.getDay() };
}

function bizOpen() {
  const { h, day } = getIST();
  return day >= 1 && day <= 6 && h >= BIZ_OPEN && h < BIZ_CLOSE;
}

// ── Contact constants ─────────────────────────────────────────────────────────
const PHONE      = '+91 93138 40714';
const PHONE_HREF = 'tel:+919313840714';
const WA_HREF    = `https://wa.me/919313840714?text=${encodeURIComponent('Hi Inventa Systems! I came across your website and would like to know more about your lab instruments and solutions.')}`;
const EMAIL      = 'inquiry@inventasystems.in';

const A_CALL     = { label: `Call ${PHONE}`, href: PHONE_HREF, style: 'call' };
const A_WA       = { label: 'WhatsApp Us', href: WA_HREF, style: 'whatsapp' };
const A_CALLBACK = { label: 'Request a Callback', action: 'callback', style: 'call' };
const A_QUOTE    = { label: 'Get a Quote', to: '/products', style: 'primary' };
const A_PRODUCTS = { label: 'View Products', to: '/products', style: 'outline' };
const A_CONTACT  = { label: 'Contact Us', to: '/contact', style: 'primary' };
const A_SERVICES = { label: 'Our Services', to: '/services', style: 'outline' };
const A_CAREERS  = { label: 'View Careers', to: '/careers', style: 'outline' };
const A_APPS     = { label: 'View Applications', to: '/applications', style: 'outline' };

// ── Synonym map ───────────────────────────────────────────────────────────────
const synonyms = {
  machine:'equipment', instrument:'equipment', device:'equipment', unit:'equipment',
  cost:'price', rate:'price', pricing:'price', charge:'price', expense:'price', fee:'price',
  buy:'purchase', order:'purchase', procure:'purchase', acquire:'purchase',
  ship:'delivery', dispatch:'delivery', courier:'delivery', transport:'delivery',
  repair:'service', servicing:'service', fix:'service', broken:'service',
  maintenance:'service', amc:'service',
  warranty:'guarantee', warrantee:'guarantee',
  job:'career', vacancy:'career', hiring:'career', opening:'career', recruit:'career',
  apply:'career', resume:'career', cv:'career', internship:'career',
  lab:'laboratory', labs:'laboratory',
  fridge:'refrigerator', cooler:'refrigerator', freezer:'refrigerator',
  hplc:'chromatography', uhplc:'chromatography', lc:'chromatography',
  gene:'genomics', genome:'genomics', dna:'genomics', rna:'genomics',
  spin:'centrifuge', rotor:'centrifuge',
  tube:'plasticware', tip:'plasticware', plate:'plasticware',
  consumable:'plasticware', glove:'plasticware', ppe:'plasticware',
  solvent:'chemical', reagent:'chemical', acid:'chemical', buffer:'chemical',
  call:'contact', phone:'contact', email:'contact', reach:'contact',
  talk:'contact', speak:'contact',
  learn:'training', workshop:'training', course:'training', demo:'training',
  setup:'turnkey', build:'turnkey', furnish:'turnkey', furniture:'turnkey',
  hello:'hi', hey:'hi', greetings:'hi', morning:'hi', afternoon:'hi',
  evening:'hi', namaste:'hi',
  thanks:'thank', thx:'thank', appreciate:'thank',
  bye:'goodbye', cya:'goodbye',
  sequencer:'sequencing', sequenced:'sequencing',
  ms:'mass_spec', spectrometry:'mass_spec', orbitrap:'mass_spec', lcms:'mass_spec',
  ftir:'spectroscopy', raman:'spectroscopy', uv:'spectroscopy',
  cell:'cell_bio', culture:'cell_bio', incubator:'cell_bio',
  crispr:'cgt', cart:'cgt', viral:'cgt', vector:'cgt', bioreactor:'cgt',
  pesticide:'agri', soil:'agri', mycotoxin:'agri', allergen:'agri',
  rapid:'poc', portable:'poc', hba1c:'poc', glucose:'poc', cardiac:'poc',
  truenat:'truenat', tuberculosis:'truenat', tb:'truenat',
  whatsapp:'whatsapp', wa:'whatsapp',
  hours:'timing', when:'timing', available:'timing',
  validation:'iqoqpq', qualification:'iqoqpq', commissioning:'iqoqpq',
  calibration:'calibration', nabl:'calibration', traceable:'calibration',
  // Product-specific brand/model terms
  powerflex:'pcr', miniamp:'pcr', veriflex:'pcr',
  quantstudio:'qpcr', qpcr:'qpcr', hrm:'qpcr', taqman:'qpcr',
  genexus:'ngs', genestudio:'ngs', torrent:'ngs',
  seqstudio:'genetic_analyzer', bigdye:'genetic_analyzer', capillary:'genetic_analyzer', sanger:'genetic_analyzer',
  sorvall:'centrifuge', multifuge:'centrifuge', pico:'centrifuge', rcf:'centrifuge',
  vanquish:'chromatography', ultimate3000:'chromatography', accucore:'chromatography', chromeleon:'chromatography',
  exploris:'mass_spec', astral:'mass_spec', excedion:'mass_spec', tof:'mass_spec', qtof:'mass_spec',
  truelab:'truenat', trueprep:'truenat', molbio:'truenat',
  tsx:'refrigerator', tse:'refrigerator', tsg:'refrigerator', ult:'refrigerator', dewar:'refrigerator', cryo:'refrigerator',
  nalgene:'plasticware', nunc:'plasticware', microplate:'plasticware',
  optima:'chemicals', fisher:'chemicals', agarose:'chemicals',
  cytometry:'cell_bio', sorter:'cell_bio', biosafety:'cell_bio', microscope:'cell_bio', fluorescence:'cell_bio',
  transfection:'cgt', electroporation:'cgt', aav:'cgt', lentiviral:'cgt',
  dispenser:'automation', washer:'automation', robotic:'automation', workstation:'automation', pipetting:'automation',
  eln:'lims', qms:'lims', audit:'lims', notebook:'lims',
  icp:'agri', aflatoxin:'agri', quecchers:'agri', fssai:'agri', residue:'agri',
  troponin:'poc', lateral:'poc', crp:'poc', pct:'poc', sepsis:'poc', hba1c:'poc',
  veterinary:'animal_health', livestock:'animal_health', poultry:'animal_health', fmd:'animal_health', avian:'animal_health',
  extraction:'genomics', nucleic:'genomics',
};

// ── Knowledge base ────────────────────────────────────────────────────────────
const KB = [
  {
    id: 'greeting',
    tags: ['hi', 'hello', 'hey', 'greetings', 'morning', 'afternoon', 'evening', 'namaste', 'start', 'help'],
    response: {
      text: `Hi! Great to have you here.\n\nI'm Inventa Assistant — I know everything about our lab instruments, reagents, and solutions. Whether you're comparing PCR cyclers, evaluating an NGS platform, or planning an entire lab, I can guide you.\n\nWhat are you looking for today?`,
      followUps: ['What products do you offer?', 'How do I get a quote?', 'Tell me about lab design', 'I need to speak with someone'],
      actions: [],
    }
  },
  {
    id: 'thanks',
    tags: ['thank', 'appreciate', 'thx', 'great', 'awesome', 'perfect', 'excellent', 'helpful', 'nice'],
    response: {
      text: `You're very welcome! Happy to help anytime.\n\nIs there anything else you'd like to explore — a specific product, a quote, or a demo booking?`,
      followUps: ['What products do you offer?', 'How do I get a quote?', 'I need to speak with someone'],
      actions: [],
    }
  },
  {
    id: 'goodbye',
    tags: ['goodbye', 'bye', 'cya', 'see you', 'done', 'exit', 'close'],
    response: {
      text: `Thank you for chatting with Inventa Assistant! Have a great day.\n\nIf you need anything in the future, I'm always here. You can also reach our team directly:\n\n${PHONE}  |  ${EMAIL}`,
      followUps: [],
      actions: [A_CALL, A_WA],
    }
  },

  // ── About ───────────────────────────────────────────────────────────────────
  {
    id: 'about',
    tags: ['who', 'about', 'inventa', 'company', 'what do you do', 'background', 'overview', 'history'],
    response: {
      text: `Inventa Systems is one of India's leading scientific instrument and laboratory solutions providers.\n\nWe supply precision instruments across 13+ product categories — PCR & NGS sequencers, HPLC, mass spectrometry, centrifuges, chemicals, and end-to-end turnkey lab solutions.\n\nWe serve:\n• Research institutions & universities\n• Clinical & diagnostic labs\n• Pharma & biotech companies\n• Forensic & government labs\n• Veterinary & agri-food testing labs\n\nOur Decipher Genomics & Research Centre also provides hands-on training and backup lab access for scientists across India.`,
      followUps: ['What products do you offer?', 'Tell me about training', 'Where are you located?'],
      actions: [A_PRODUCTS, A_CONTACT],
    }
  },

  // ── Products overview ───────────────────────────────────────────────────────
  {
    id: 'products',
    tags: ['product', 'offer', 'catalogue', 'catalog', 'sell', 'equipment', 'range', 'portfolio', 'list', 'available', 'have', 'provide', 'categories', 'what do you sell'],
    response: {
      text: `We cover 13+ product categories:\n\n🔬 Molecular Instruments\n• PCR Thermal Cyclers — PowerFlex, MiniAmp\n• Real-Time PCR — QuantStudio 3/5/6/7 Flex\n• NGS Sequencers — Genexus, Ion GeneStudio\n• Genetic Analyzers — SeqStudio Flex\n• Truenat POC Molecular Dx\n\n⚗️ Analytical Instruments\n• Chromatography & HPLC — Vanquish, UltiMate\n• Mass Spectrometry — Orbitrap series\n• Centrifuges — Sorvall, Multifuge\n\n🧪 Lab Supplies\n• Chemicals & LC-MS grade reagents\n• Plasticware & consumables\n• Lab refrigerators & ULT freezers\n\n🏗️ Solutions & Services\n• Turnkey lab design & build\n• LIMS & informatics\n• Liquid handling & automation\n• Training & demos (Decipher Centre)\n\nTell me which area interests you and I'll give you the full picture.`,
      followUps: ['Tell me about PCR', 'What NGS systems do you have?', 'Tell me about chromatography', 'Do you offer lab design?'],
      actions: [A_PRODUCTS, A_QUOTE],
    }
  },

  // ── Quote ───────────────────────────────────────────────────────────────────
  {
    id: 'quote',
    tags: ['price', 'pricing', 'cost', 'purchase', 'buy', 'budget', 'rate', 'how much', 'quotation', 'enquiry', 'quote'],
    response: {
      text: `Getting a quote from us is simple:\n\n1. Browse our Products or Applications pages\n2. Click "Add to Quote" on any model\n3. Submit via the Quote Cart with your contact details\n\nOur sales team responds within 24 business hours with pricing, lead time, and payment terms.\n\nFor urgent or complex requirements — multi-instrument setups, tenders, or custom configurations — call, WhatsApp, or request a callback for the fastest turnaround.`,
      followUps: ['What payment methods do you accept?', 'What are delivery timelines?'],
      actions: [A_QUOTE, A_CALLBACK, A_WA],
    }
  },

  // ── PCR ─────────────────────────────────────────────────────────────────────
  {
    id: 'pcr',
    tags: ['pcr', 'thermal cycler', 'powerflex', 'miniamp', 'amplification', 'endpoint', 'thermocycler', 'veriflex'],
    response: {
      text: `Our PCR Thermal Cyclers are built on Applied Biosystems technology:\n\n• PowerFlex 96-Well — Premium\n  VeriFlex 6-zone gradient, 5°C/s ramp, 7" touchscreen, interchangeable blocks\n\n• PowerFlex 384-Well — Advanced\n  High-throughput, gradient optimisation, cloud connectivity\n\n• MiniAmp Plus — Standard\n  Compact & energy-efficient, ideal for routine or teaching labs\n\nAll compatible with MicroAmp consumables. VeriFlex technology lets you run 6 independent temperature zones in a single experiment — great for optimising new assays.`,
      followUps: ['What is VeriFlex technology?', 'Tell me about Real-Time PCR', 'How do I get a quote?'],
      actions: [A_QUOTE, A_PRODUCTS],
      card: {
        title: 'PCR Thermal Cyclers', category: 'PCR — Thermal Cyclers', image: '/pcr_product.png',
        features: ['VeriFlex 6-zone gradient', 'Up to 5°C/s ramp rate', '96 / 384-well formats', 'Interchangeable block modules'],
      },
    }
  },

  // ── Real-Time PCR ────────────────────────────────────────────────────────────
  {
    id: 'qpcr',
    tags: ['real-time', 'real time', 'qpcr', 'quantstudio', 'gene expression', 'genotyping', 'hrm', 'taqman', 'sybr', 'multiplexing'],
    response: {
      text: `Our QuantStudio Real-Time PCR lineup covers every throughput level:\n\n• QuantStudio 3 — Standard  |  96-well, 4-colour\n• QuantStudio 5 — Advanced  |  96-well, 5-colour, Cloud Connect\n• QuantStudio 6 Flex — Premium  |  96/384-well, 6-dye multiplex, HRM\n• QuantStudio 7 Flex — Premium  |  384-well, ±0.1°C uniformity, robotic loading\n\nAll support TaqMan, SYBR Green, and HRM chemistries with Design & Analysis v2 software. Tell me your application (gene expression, viral load, genotyping) and I'll recommend the right model.`,
      followUps: ['Difference between QS3 and QS5?', 'What is HRM analysis?', 'How do I get a quote?'],
      actions: [A_QUOTE, A_PRODUCTS],
      card: {
        title: 'QuantStudio Real-Time PCR', category: 'Real-Time PCR Systems', image: '/realtime_pcr.png',
        features: ['4–6 colour multiplexing', 'Cloud Connect monitoring', '96 / 384-well formats', 'TaqMan & SYBR Green support'],
      },
    }
  },

  // ── NGS ─────────────────────────────────────────────────────────────────────
  {
    id: 'ngs',
    tags: ['ngs', 'sequencing', 'sequencer', 'genexus', 'ion torrent', 'genestudio', 'next generation', 'next-gen', 'library prep', 'semiconductor sequencing', 'oncology'],
    response: {
      text: `For Next-Generation Sequencing, we offer Ion Torrent semiconductor sequencing platforms:\n\n• Genexus Integrated Sequencer — Premium\n  Fully automated sample-to-variant in <24 hrs, Oncomine panels, FFPE & liquid biopsy compatible\n\n• Ion GeneStudio S5 — Standard\n  Targeted panels, fast 2–4 hr runs, up to 15 Gb\n\n• Ion GeneStudio S5 Prime — Premium\n  Exome-scale, up to 50 Gb, pharmacogenomics\n\nFaster and more cost-effective than optical platforms for targeted applications. What's your sequencing application — oncology, infectious disease, or research?`,
      followUps: ['What is the Genexus?', 'What oncology panels are available?', 'How do I get a quote?'],
      actions: [A_QUOTE, A_PRODUCTS],
      card: {
        title: 'NGS Sequencers', category: 'Next-Generation Sequencing', image: '/ngs_sequencer.png',
        features: ['Sample-to-report <24 hrs (Genexus)', 'Oncomine oncology panels', 'Scalable throughput chips', 'Semiconductor sequencing'],
      },
    }
  },

  // ── Genetic Analyzer ─────────────────────────────────────────────────────────
  {
    id: 'genetic_analyzer',
    tags: ['genetic analyzer', 'seqstudio', 'capillary', 'sanger', 'fragment analysis', 'str', 'hid', 'human identification', 'paternity', 'bigdye'],
    response: {
      text: `For Sanger sequencing and fragment analysis, we supply SeqStudio Flex Genetic Analyzers:\n\n• SeqStudio Flex 8-Capillary — Premium  |  higher throughput, RFID cartridge tracking, HID-validated\n• SeqStudio Flex 4-Capillary — Standard  |  same cartridge system, lower volume labs\n\nBoth support Sanger (BigDye v3.1), fragment analysis, forensic HID (GlobalFiler, PowerPlex — CODIS-compatible), and paternity/kinship testing. The cartridge-based system simplifies daily operation significantly.`,
      followUps: ['What is Sanger sequencing used for?', 'Do you have forensic solutions?', 'How do I get a quote?'],
      actions: [A_QUOTE, A_PRODUCTS],
      card: {
        title: 'SeqStudio Flex Genetic Analyzers', category: 'Genetic Analyzers', image: '/genetic_analyzer.png',
        features: ['4 or 8 capillary configs', 'RFID cartridge tracking', 'Sanger + HID + fragment analysis', 'CODIS-compatible HID kits'],
      },
    }
  },

  // ── Chromatography ────────────────────────────────────────────────────────────
  {
    id: 'chromatography',
    tags: ['chromatography', 'hplc', 'uhplc', 'column', 'vanquish', 'ultimate', 'chromeleon', 'separation', 'reversed phase', 'analytical'],
    response: {
      text: `Our chromatography portfolio is built around Thermo Scientific platforms:\n\n• Vanquish UHPLC — Premium  |  up to 1500 bar, biocompatible flow path, MS-ready\n• UltiMate 3000 HPLC — Standard  |  analytical to semi-prep, 21 CFR Part 11 ready\n• Accucore C18 Columns — Advanced  |  2.6 µm core-shell, sub-2µm efficiency at lower pressure\n• Chromeleon 7 CDS — multi-vendor LC/GC/IC software, EU Annex 11 / FDA 21 CFR\n\nWe also supply a complete column range (C18, HILIC, ion exchange, SEC, chiral). What's your application — pharma QC, food testing, environmental?`,
      followUps: ['Tell me about Vanquish UHPLC', 'What columns do you offer?', 'How do I get a quote?'],
      actions: [A_QUOTE, A_PRODUCTS],
      card: {
        title: 'Chromatography & HPLC', category: 'Chromatography', image: '/chromatography_hplc.png',
        features: ['Up to 1500 bar (Vanquish UHPLC)', 'Chromeleon multi-vendor CDS', 'Full column catalogue', '21 CFR Part 11 compliant'],
      },
    }
  },

  // ── Mass Spectrometry ─────────────────────────────────────────────────────────
  {
    id: 'mass_spec',
    tags: ['mass_spec', 'mass spectrometry', 'orbitrap', 'lc-ms', 'gc-ms', 'triple quadrupole', 'qtof', 'metabolomics', 'proteomics', 'hrms', 'exploris', 'astral', 'excedion', 'exploris 120', 'exploris 240', 'exploris 480', 'intact protein', 'mam', 'dia'],
    response: {
      text: `We offer the full Thermo Scientific Orbitrap and targeted MS lineup:\n\n🔬 High-Resolution Orbitrap\n• Orbitrap Exploris 120 — Standard  |  120,000 FWHM, benchtop, pharma QC & routine HRMS\n• Orbitrap Exploris 240 — Advanced  |  240,000 FWHM, versatile research & biopharma\n• Orbitrap Exploris 480 — Premium  |  480,000 FWHM, full proteomics, metabolomics, DIA\n• Orbitrap Astral — Premium  |  500,000 FWHM, 200 Hz MS/MS — ultra-deep proteomics\n• Orbitrap Excedion — Advanced  |  MAM, intact protein, biopharmaceutical characterisation\n\n🎯 Targeted MS\n• LC-MS/MS Triple Quadrupole — targeted MRM, clinical biomarkers, toxicology\n• QTOF High-Resolution — untargeted metabolomics, impurity profiling\n\nTell me your application and I'll narrow down the right platform.`,
      followUps: ['What is Orbitrap technology?', 'Which is better for metabolomics?', 'Tell me about Exploris 480', 'How do I get a quote?'],
      actions: [A_QUOTE, A_PRODUCTS],
      card: {
        title: 'Orbitrap Mass Spectrometry', category: 'Lab Solutions & Mass Spectrometry', image: '/lab_solutions.png',
        features: ['Exploris 120/240/480 & Astral series', 'Up to 500,000 FWHM resolution', 'Proteomics, metabolomics, pharma QC', 'Intact protein & MAM workflows'],
      },
    }
  },

  // ── Spectroscopy ──────────────────────────────────────────────────────────────
  {
    id: 'spectroscopy',
    tags: ['spectroscopy', 'uv-vis', 'uv vis', 'ftir', 'raman', 'infrared', 'absorption', 'atr', 'handheld', 'material identification'],
    response: {
      text: `Our spectroscopy range:\n\n• UV-Vis Spectrophotometer  |  190–1100 nm, double-beam, GMP-ready, 21 CFR Part 11\n• ATR-FTIR Spectrometer  |  4000–400 cm⁻¹, material ID, polymorphism screening\n• Handheld Raman Analyzer  |  portable, through-container, 10,000+ compound library\n\nFor most QC labs, FTIR is the go-to workhorse. Raman excels when you need through-container analysis or field use. Tell me your use case and I'll recommend the right one.`,
      followUps: ['When do I use FTIR vs Raman?', 'Tell me about chromatography', 'How do I get a quote?'],
      actions: [A_QUOTE, A_CALLBACK],
    }
  },

  // ── Centrifuges ───────────────────────────────────────────────────────────────
  {
    id: 'centrifuge',
    tags: ['centrifuge', 'spin', 'rotor', 'sorvall', 'multifuge', 'microcentrifuge', 'benchtop centrifuge', 'ultracentrifuge', 'pico', 'rcf'],
    response: {
      text: `Our Thermo Scientific centrifuge range:\n\n• Sorvall Legend Micro 21R — refrigerated, up to 21,300 × g, compact 26 cm wide\n• Pico 17 — personal microcentrifuge, 17,000 × g, one-touch operation\n• Multifuge X Pro — up to 25,830 × g, >30 rotors, blood bank protocols\n• Sorvall Legend XTR — compact benchtop, 4 × 400 mL\n• Ultracentrifuges up to 150,000 × g also available\n\nTell me your application and volume and I'll recommend the right model.`,
      followUps: ['What rotors are compatible?', 'Do you have refrigerated models?', 'How do I get a quote?'],
      actions: [A_QUOTE, A_PRODUCTS],
      card: {
        title: 'Centrifuges', category: 'Centrifuges', image: '/centrifuge_lab.png',
        features: ['Up to 150,000 × g (ultracentrifuge)', 'Refrigerated −10 to +40°C', '>30 rotor options (Multifuge)', 'Imbalance detection & auto-stop'],
      },
    }
  },

  // ── Chemicals ─────────────────────────────────────────────────────────────────
  {
    id: 'chemicals',
    tags: ['chemical', 'reagent', 'solvent', 'acid', 'base', 'optima', 'lc-ms grade', 'acs grade', 'buffer', 'reference standard', 'enzyme', 'agarose'],
    response: {
      text: `We supply a comprehensive chemicals and reagents portfolio:\n\n• Optima LC-MS Grade Solvents — ≥99.9% purity, <0.2µm filtered (ACN, MeOH, water, IPA)\n• Fisher Chemical Range — ACS, reagent, purified and technical grades, >10,000 SKUs\n• Reference Standards — USP, EP, BP, NIST/SI traceable for pharma and environmental testing\n• Biochemicals — restriction enzymes, agarose, Bradford assay kits, molecular biology buffers\n\nAll with lot-specific CoA. Custom sourcing also available for less common reagents.`,
      followUps: ['Do you have HPLC grade solvents?', 'Tell me about reference standards', 'How do I get a quote?'],
      actions: [A_QUOTE, A_PRODUCTS],
      card: {
        title: 'Chemicals & Reagents', category: 'Chemicals & Reagents', image: '/lab_chemicals.png',
        features: ['LC-MS to technical grade', '>10,000 SKUs', 'USP / EP reference standards', 'Lot-specific CoA supplied'],
      },
    }
  },

  // ── Plasticware ───────────────────────────────────────────────────────────────
  {
    id: 'plasticware',
    tags: ['plasticware', 'consumable', 'tube', 'tip', 'plate', 'nalgene', 'nunc', 'pipette', 'cell culture', 'microcentrifuge', 'pcr strip', 'microplate', 'nitrile', 'lab coat'],
    response: {
      text: `Our lab consumables range:\n\n• Nalgene Labware — HDPE/PP/PC bottles & carboys, 15 mL to 50 L, autoclavable\n• ART Filtered Pipette Tips — aerosol barrier, RNase/DNase/pyrogen-free, 10–1000 µL\n• Nunc Cell Culture Plates — TC-treated, MaxiSorp ELISA, ultra-low attachment, 6–96 well\n• PCR Consumables — 8-strip tubes, 96/384-well plates, adhesive films\n• PPE — powder-free nitrile gloves, lab coats, anti-fog goggles\n\nAll certified with lot documentation. Bulk institutional supply available.`,
      followUps: ['Tell me about Nunc plates', 'Do you have low-retention tips?', 'How do I get a quote?'],
      actions: [A_QUOTE, A_PRODUCTS],
      card: {
        title: 'Plasticware & Lab Supplies', category: 'Plasticware & Lab Supplies', image: '/lab_plasticware.png',
        features: ['Nalgene 15 mL – 50 L storage', 'ART aerosol barrier tips', 'Nunc TC/MaxiSorp/ULA plates', 'Full PPE range'],
      },
    }
  },

  // ── Refrigerators ─────────────────────────────────────────────────────────────
  {
    id: 'refrigerator',
    tags: ['refrigerator', 'cold storage', 'tsx', 'tse', 'tsg', 'ult freezer', '-80', 'blood bank', 'liquid nitrogen', 'cryogenic', 'dewar', 'freezer', 'cold'],
    response: {
      text: `Our lab cold storage portfolio:\n\n• TSX Refrigerators — Premium  |  V-drive adaptive compressor, ±0.5°C, IoT monitoring, 30% energy savings\n• TSE (564 L) — Standard  |  everyday storage, audible alarms\n• TSG (1297 L) — Advanced  |  high-capacity double-door\n• −80°C ULT Freezers — cascade cooling, continuous monitoring\n• Blood Bank Refrigerators — AABB-grade, 1–6°C precise control\n• Liquid Nitrogen Dewars — 50 L to 500 L, −196°C cryogenic storage\n\nAll can connect to your LIMS or facility monitoring system.`,
      followUps: ['What is V-drive technology?', 'Do you have −80°C freezers?', 'How do I get a quote?'],
      actions: [A_QUOTE, A_PRODUCTS],
      card: {
        title: 'Lab Cold Storage', category: 'Refrigerators & Cold Storage', image: '/lab_refrigerator.png',
        features: ['±0.5°C uniformity (TSX)', 'IoT temperature monitoring', '−80°C ULT & blood bank models', 'Liquid nitrogen dewars (50–500 L)'],
      },
    }
  },

  // ── Truenat ───────────────────────────────────────────────────────────────────
  {
    id: 'truenat',
    tags: ['truenat', 'molbio', 'tuberculosis', 'tb', 'covid', 'dengue', 'chip-based', 'truelab', 'trueprep', 'icmr', 'poc pcr'],
    response: {
      text: `Truenat by Molbio is a game-changer for point-of-care molecular testing:\n\n• Truelab Uno Dx — single-test portable, battery-powered, <1 kg, WHO-endorsed for TB\n• Truelab Quattro — 4-sample concurrent, Wi-Fi + Cloud\n• Trueprep AUTO v2 — automated extraction to pair with Truenat\n\nAssay menu: TB, DR-TB, COVID-19, HIV, HBV, HCV, Dengue, Chikungunya, Influenza A/B — results in <60 minutes.\n\nICMR-approved, WHO-endorsed. Perfect for district hospitals, remote clinics, and peripheral health centres.`,
      followUps: ['Is Truenat WHO approved?', 'What diseases can Truenat detect?', 'How do I get a quote?'],
      actions: [A_QUOTE, A_CALLBACK],
      card: {
        title: 'Truenat Real-Time PCR Platform', category: 'Molecular Biology — Truenat', image: '/mol_bio_diagnostics.png',
        features: ['WHO-endorsed for TB', 'Battery-powered portable', 'Results in <60 minutes', '4-sample concurrent (Quattro)'],
      },
    }
  },

  // ── Cell Biology ──────────────────────────────────────────────────────────────
  {
    id: 'cell_bio',
    tags: ['cell_bio', 'cell culture', 'co2 incubator', 'flow cytometry', 'cell sorter', 'imaging', 'microscope', 'fluorescence', 'biosafety cabinet'],
    response: {
      text: `Our cell biology solutions span culture, analysis, and imaging:\n\n🔬 Cell Culture\n• CO2 Incubator (170 L) — precision humidity/CO2, HEPA-filtered\n• Class II Biosafety Cabinet — NSF 49 / EN 12469 certified\n• Serum-Free Media — animal-free, defined formulations\n\n🌊 Flow Cytometry\n• High-Parameter Flow Cytometer — up to 40 parameters, spectral unmixing\n• Cell Sorter — >50,000 events/sec, multi-way sorting\n\n📸 Imaging\n• Inverted Fluorescence Microscope — live-cell, DIC\n• High-Content Imaging System — 96/384-well automated\n• CellProfiler Software — AI-driven cell segmentation`,
      followUps: ['Tell me about cell therapy', 'What flow cytometry options do you have?', 'How do I get a quote?'],
      actions: [A_QUOTE, A_APPS],
    }
  },

  // ── Cell & Gene Therapy ───────────────────────────────────────────────────────
  {
    id: 'cgt',
    tags: ['cgt', 'crispr', 'gene editing', 'car-t', 'viral vector', 'bioreactor', 'transfection', 'electroporation', 'aav', 'lentiviral', 'gene therapy'],
    response: {
      text: `Our Cell & Gene Therapy workflow solutions:\n\n🧬 Viral Vector Production\n• Single-Use Bioreactors (3–50 L) — GMP-compatible, scalable\n• Transfection Reagent Kits — high-efficiency, serum-compatible\n• AAV Purification Columns — serotype-specific affinity resin\n\n✂️ CRISPR Gene Editing\n• CRISPR-Cas9 Kits — pre-designed sgRNA libraries, RNP delivery\n• Electroporation System — Nucleofection-based, optimised for primary cells\n\n💉 CAR-T Manufacturing\n• G-Rex Cell Expansion — scalable T-cell expansion\n• CAR-T Activation Kits — GMP-grade anti-CD3/CD28 dynabeads\n• Controlled-Rate Freezer — GMP cryopreservation\n\nWe can support the full workflow from gene editing to clinical-scale manufacturing.`,
      followUps: ['What bioreactor sizes do you offer?', 'Tell me about CRISPR tools', 'How do I get a quote?'],
      actions: [A_QUOTE, A_CALLBACK],
    }
  },

  // ── Turnkey Lab ───────────────────────────────────────────────────────────────
  {
    id: 'turnkey',
    tags: ['turnkey', 'lab design', 'lab build', 'furniture', 'fume hood', 'commissioning', 'iq', 'oq', 'pq', 'mep', 'architectural', 'greenfield', 'lab setup'],
    response: {
      text: `We handle turnkey lab design and build — from blueprint to fully operational:\n\n📐 Planning & Design\n• CAD & BIM 3D architectural design\n• Workflow optimisation, regulatory compliance (ISO 17025, GMP, NABL)\n• MEP utilities and HVAC planning\n\n🪑 Lab Furniture\n• Height-adjustable benches (680–1000 mm, 150 kg/m rated)\n• Epoxy resin chemical-resistant worktops\n• Overhead storage and mobile trolleys\n\n💨 Containment\n• Ducted fume cupboards (EN 14175 certified)\n• Ductless carbon-filtered hoods, laminar flow benches (ISO Class 5)\n\nFrom single room to multi-floor research facility. Request a consultation and we'll start with your floor plan.`,
      followUps: ['What lab types do you design?', 'How long does a build take?', 'Request a consultation'],
      actions: [A_CALLBACK, A_CONTACT],
      card: {
        title: 'Turnkey Lab Setup', category: 'Lab Design & Build', image: '/turnkey_lab.png',
        features: ['BIM 3D design & layout', 'Modular furniture supply', 'Fume hood & containment', 'IQ/OQ/PQ commissioning'],
      },
    }
  },

  // ── Training ──────────────────────────────────────────────────────────────────
  {
    id: 'training',
    tags: ['training', 'learn', 'workshop', 'backup lab', 'decipher', 'course', 'demo', 'hands-on', 'evaluation', 'instrument demo', 'certificate'],
    response: {
      text: `Our Decipher Genomics & Research Centre offers:\n\n📚 Training Programmes\n• Genomics Starter (2-day) — PCR, qPCR, NGS basics\n• Advanced NGS Workshop (3-day) — library prep to data analysis\n• qPCR Masterclass (1-day) — assay design & troubleshooting\n• Custom modules for specific applications\n\nAll include Certificate of Completion. Max 10 participants per batch.\n\n🔧 Backup Lab Services\n• Instrument access (PCR, qPCR, sequencer, centrifuge) during your lab's downtime\n• Expert application scientist on-site, same-day turnaround\n\n🎯 Demos\n• Hands-on instrument evaluation before purchase\n• Test in your actual workflow before committing\n\nWant to book a session? I can arrange a callback.`,
      followUps: ['How do I book a session?', 'What topics are covered?', 'Is backup lab available?'],
      actions: [A_CALLBACK, A_CONTACT],
      card: {
        title: 'Decipher Genomics Training', category: 'Backup Lab & Training', image: '/training_centre.png',
        features: ['Genomics + NGS + qPCR workshops', 'Certificate of completion', 'Backup lab access during downtime', 'Hands-on demos before purchase'],
      },
    }
  },

  // ── Service & AMC ─────────────────────────────────────────────────────────────
  {
    id: 'service',
    tags: ['service', 'maintenance', 'amc', 'service contract', 'repair', 'fix', 'servicing', 'broken', 'not working', 'preventive', 'emergency repair', 'field engineer'],
    response: {
      text: `Our service and maintenance options:\n\n🔧 Annual Maintenance Contracts (AMC)\n• Comprehensive — preventive + corrective maintenance, genuine OEM parts, 4–24 hr emergency response\n• Preventive Maintenance — scheduled visits, performance verification, report\n• Emergency Repair — priority SLA 4–8 hrs, field engineers\n\n📋 Additional\n• On-call breakdown repair\n• Genuine OEM spare parts\n• Post-warranty support\n\nFor urgent breakdowns, I can arrange a priority callback from our service team right now.`,
      followUps: ['What does AMC cover?', 'How quickly do you respond?', 'Do you offer calibration?'],
      actions: [A_CALLBACK, A_CALL, A_WA],
    }
  },

  // ── IQ/OQ/PQ ─────────────────────────────────────────────────────────────────
  {
    id: 'iqoqpq',
    tags: ['iqoqpq', 'validation', 'qualification', 'iq', 'oq', 'pq', 'commissioning', 'gmp', 'fda', 'installation qualification'],
    response: {
      text: `We provide complete IQ/OQ/PQ validation services:\n\n• IQ — verify correct installation per manufacturer spec\n• OQ — confirm instrument operates within spec across full range\n• PQ — validate performance in your specific application\n\nAll with FDA / EU GMP compliant documentation, deviation reports, CAPA support, and requalification scheduling.\n\nWe also supply pre-written Validation Documentation Packages (21 CFR Part 11, EU Annex 11, GAMP 5 aligned).`,
      followUps: ['Do you offer calibration services?', 'Tell me about AMC plans'],
      actions: [A_CALLBACK, A_CONTACT],
    }
  },

  // ── Calibration ───────────────────────────────────────────────────────────────
  {
    id: 'calibration',
    tags: ['calibration', 'nabl', 'traceable', 'certificate', 'pipette calibration', 'balance', 'temperature', 'iso 17025', 'accredited', 'services'],
    response: {
      text: `Our NABL-accredited calibration services:\n\n• Pipette Calibration — ISO 8655 gravimetric, NIST/NPL traceable, on-site or in-lab\n• Balance Calibration — OIML/ISO 17025, Class E2/F1 weights, GLP format\n• Temperature Logger Verification — −80°C to +300°C range, traceable certificate\n\nAll issued with NABL / ISO/IEC 17025 accredited certificates. On-site service available across India.`,
      followUps: ['Do you offer IQ/OQ/PQ services?', 'What AMC plans do you have?'],
      actions: [A_CALLBACK, A_CONTACT],
    }
  },

  // ── LIMS ─────────────────────────────────────────────────────────────────────
  {
    id: 'lims',
    tags: ['lims', 'software', 'data management', 'digital', 'informatics', 'eln', 'electronic lab notebook', 'qms', 'audit', 'compliance', 'erp', 'lab software'],
    response: {
      text: `Our LIMS and informatics solutions:\n\n🖥️ LIMS\n• Cloud LIMS (SaaS) — 21 CFR Part 11, sample chain-of-custody, custom CoA\n• On-Premise Enterprise LIMS — data sovereignty, multi-site, SAP/Oracle integration\n• Implementation & validation service included\n\n📊 Data & Quality\n• Electronic Lab Notebook (ELN) — e-signatures, IP protection\n• QMS Software — ISO 17025/15189/GMP, CAPA, deviation tracking\n• Calibration Management — equipment scheduling, automated reminders\n\nWe configure and validate systems for your specific accreditation (NABL, GMP, CAP).`,
      followUps: ['Can I get a LIMS demo?', 'Do you help with NABL accreditation?'],
      actions: [A_CALLBACK, A_QUOTE],
    }
  },

  // ── Automation ────────────────────────────────────────────────────────────────
  {
    id: 'automation',
    tags: ['automation', 'liquid handling', 'robot', 'automated', 'pipetting', 'high throughput', 'electronic pipette', 'workstation', 'dispenser', 'washer'],
    response: {
      text: `Our liquid handling and lab automation range:\n\n🔬 Electronic Pipettes\n• Single-Channel (0.1 µL–10 mL) — CV <0.5%, Bluetooth logging\n• 12-Channel (5–300 µL) — adjustable tip spacing, reverse pipetting\n\n🤖 Robotic Systems\n• 96-Channel Robot — sub-µL accuracy, NGS/ELISA/drug discovery\n• Compact 8-Channel Workstation — 6–12 deck positions\n• Automated Plate Sealer — <10 sec/plate, SBS compatible\n\n⚗️ Dispensers & Washers\n• Microplate Washer (96/384-well) — dual-row manifold\n• Reagent Dispenser — 1–2000 µL, <20 sec per 96-well plate`,
      followUps: ['Tell me about robotic liquid handlers', 'Do you have plate washers?', 'How do I get a quote?'],
      actions: [A_QUOTE, A_CALLBACK],
    }
  },

  // ── Forensic ─────────────────────────────────────────────────────────────────
  {
    id: 'forensic',
    tags: ['forensic', 'crime', 'evidence', 'genetic identity', 'str', 'paternity', 'hid', 'toxicology', 'drugs of abuse', 'trace evidence', 'gsr', 'codis'],
    response: {
      text: `Our forensic science solutions cover the complete workflow:\n\n🧬 Human Identification (HID)\n• Forensic DNA Extraction Kit — CODIS-compatible, LCN support\n• GlobalFiler STR Kit — 24 loci, CODIS 20-core compliant\n• SeqStudio Flex Genetic Analyzer — HID-validated\n\n🔍 Toxicology\n• DOA Immunoassay Analyzer — 10+ drug classes\n• Toxicology LC-MS/MS — hair/blood/urine confirmation libraries\n\n🔬 Trace & Digital Evidence\n• Forensic FTIR Microscope — fibre, paint, GSR, >10,000 compound library\n• SEM-EDX System — elemental mapping, automated particle search\n• Digital Evidence Workstation — write-blocked imaging, chain-of-custody\n\nAll HID solutions are CODIS-validated.`,
      followUps: ['Tell me about STR profiling', 'Do you have forensic LC-MS?', 'How do I get a quote?'],
      actions: [A_QUOTE, A_APPS],
    }
  },

  // ── Animal Health ─────────────────────────────────────────────────────────────
  {
    id: 'animal_health',
    tags: ['animal', 'veterinary', 'vet', 'livestock', 'poultry', 'aquaculture', 'canine', 'feline', 'avian influenza', 'fmd', 'haematology', 'bovine'],
    response: {
      text: `Our animal health and veterinary diagnostics:\n\n🐾 Rapid Diagnostics\n• Canine/Feline Combo Rapid Test — 10–15 min, no refrigeration\n• Avian Influenza Antigen Kit — OIE-validated, H5/H7, 15 min\n• FMD Test — all serotypes, rapid + ELISA formats\n\n🔬 Clinical Chemistry\n• Veterinary Haematology Analyzer — 22-parameter CBC, species-specific ranges\n• Portable Biochemistry Analyzer — 25 parameters, 12-min result\n\n🧬 Molecular\n• Veterinary Real-Time PCR — OIE-validated, multi-pathogen panels\n• Avian Serology ELISA — AI, ND, IBD, IBV\n\nWe supply government veterinary departments, private clinics, and FSSAI accredited labs.`,
      followUps: ['Do you have livestock diagnostic tools?', 'Tell me about veterinary PCR', 'How do I get a quote?'],
      actions: [A_QUOTE, A_APPS],
    }
  },

  // ── Agri / Food ───────────────────────────────────────────────────────────────
  {
    id: 'agri',
    tags: ['agri', 'pesticide', 'soil', 'water analysis', 'mycotoxin', 'allergen', 'aflatoxin', 'food safety', 'food testing', 'environmental', 'quecchers', 'icp-oes', 'fssai'],
    response: {
      text: `Our agri, food safety and environmental testing solutions:\n\n🌿 Pesticide & Residue Testing\n• GC-MS/MS Triple Quadrupole — >500 compound panels, EU MRL-compliant\n• QuEChERS Extraction Kits — EN 15662 / AOAC\n• Pesticide Reference Standard Mixes — >100 pesticides, ISO 17034\n\n🌱 Soil & Water\n• ICP-OES Spectrometer — 70+ elements, sub-ppb detection\n• Ion Chromatography — fluoride, chloride, nitrate, sulfate\n• Portable Multiparameter Meter — pH, EC, DO, turbidity, IP67\n\n🌾 Mycotoxins & Allergens\n• Mycotoxin Rapid Test Reader — aflatoxin, DON, ZEN (quantitative)\n• Allergen ELISA — 14 EU-regulated allergens, FSSAI & Codex compliant`,
      followUps: ['Tell me about pesticide testing', 'Do you have ICP-OES?', 'How do I get a quote?'],
      actions: [A_QUOTE, A_APPS],
    }
  },

  // ── POC ───────────────────────────────────────────────────────────────────────
  {
    id: 'poc',
    tags: ['point of care', 'rapid', 'bedside', 'poc', 'near patient', 'portable', 'hba1c', 'glucose', 'cardiac', 'troponin', 'crp', 'pct', 'lateral flow', 'flu'],
    response: {
      text: `Our point-of-care diagnostics range:\n\n⚡ Molecular POC\n• Portable Molecular POC Reader — CLIA-waived, <30 min\n• Respiratory Panel — Flu A/B, RSV, COVID-19, para-Influenza in 15–30 min\n• STI Panel — CT, NG, TV simultaneous\n\n💉 Immunoassay\n• Quantitative Rapid Test Reader — Bluetooth data connectivity\n• Cardiac Panel — Troponin I/T, BNP, D-dimer in <10 min\n• CRP/PCT — infection & sepsis triage, 15 min, fingerstick\n\n🩸 Glucose & Metabolites\n• HbA1c Analyzer — NGSP-certified, EMR/LIS connectivity\n• Blood Glucose Monitor (Clinical) — ISO 15197:2013, <5 sec result\n• Blood Gas & Electrolyte Analyzer — pH, pO2, Na, K, Cl, Ca, Lactate in <60 sec`,
      followUps: ['Do you have COVID-19 tests?', 'Tell me about HbA1c testing', 'How do I get a quote?'],
      actions: [A_QUOTE, A_APPS],
    }
  },

  // ── Applications ──────────────────────────────────────────────────────────────
  {
    id: 'applications',
    tags: ['application', 'field', 'industry', 'sector', 'use case', 'workflow', 'solution', 'what can i use'],
    response: {
      text: `We serve 15+ application areas:\n\n🧬 Life Sciences\n• Molecular Diagnostics\n• Cell Biology & Flow Cytometry\n• Cell & Gene Therapy\n• Genomics & Sequencing\n\n⚗️ Analytical\n• Analytical Science (HPLC, MS, Spectroscopy)\n• Chemicals & Reagents\n\n🔬 Specialty\n• Forensic Science & HID\n• Animal Health & Veterinary\n• Agri, Food & Environmental Testing\n• Point of Care Diagnostics\n\n🏗️ Infrastructure\n• Lab Equipment & Cold Storage\n• Plasticware & Automation\n• LIMS & Software\n• Turnkey Lab Design\n\nTell me your field and I'll point you to the right products.`,
      followUps: ['Tell me about molecular diagnostics', 'Do you serve forensic labs?', 'Animal health solutions?'],
      actions: [A_APPS, A_PRODUCTS],
    }
  },

  // ── Contact ───────────────────────────────────────────────────────────────────
  {
    id: 'contact',
    tags: ['contact', 'support', 'phone', 'email', 'reach', 'helpline', 'talk', 'speak', 'connect', 'get in touch', 'number', 'call us'],
    response: {
      text: `Here's how to reach our team:\n\n📞 Phone: ${PHONE}\n💬 WhatsApp: ${PHONE}\n📧 Email: ${EMAIL}\n\n🕐 Business Hours: Mon–Sat, 11:00 AM – 7:00 PM IST\n\nI can also arrange a callback — just click below and our team will call you during business hours.`,
      followUps: ['Where are you located?', 'Do you have WhatsApp support?'],
      actions: [A_CALLBACK, A_CALL, A_WA],
    }
  },

  // ── WhatsApp ──────────────────────────────────────────────────────────────────
  {
    id: 'whatsapp',
    tags: ['whatsapp', 'wa', 'instant message', 'chat with you'],
    response: {
      text: `Yes, we're on WhatsApp!\n\n💬 ${PHONE}\n\nSend us product enquiries, quote requests, service bookings, or any query. Outside business hours, we'll reply the next working day.\n\nOr if you'd prefer a phone conversation, I can arrange a callback.`,
      followUps: ['How do I call you?', 'What is your email?'],
      actions: [A_WA, A_CALLBACK],
    }
  },

  // ── Location ──────────────────────────────────────────────────────────────────
  {
    id: 'location',
    tags: ['location', 'address', 'where', 'headquarters', 'office', 'city', 'based', 'visit'],
    response: {
      text: `Inventa Systems is headquartered in Ahmedabad, India.\n\n📍 Plot no. 69, Sunshine Industrial Hub, - 1, Near Navapura Railway Crossing, Near Changodar, Navapura, Ahmedabad, Gujarat 382213\n\nWe serve customers pan-India with local sales and service support. Our Decipher Genomics & Research Centre is also open for demos, hands-on training, and instrument evaluations.\n\nWant to visit? I can arrange a tour.`,
      followUps: ['How do I contact you?', 'Do you deliver across India?', 'Book a training session'],
      actions: [A_CALLBACK, A_CONTACT],
    }
  },

  // ── Delivery ──────────────────────────────────────────────────────────────────
  {
    id: 'delivery',
    tags: ['delivery', 'shipping', 'tracking', 'lead time', 'dispatch', 'timeline', 'when will', 'how long', 'import', 'eta'],
    response: {
      text: `Typical delivery timelines:\n\n• Lab consumables & chemicals — 3–5 business days\n• Standard in-stock instruments — 1–3 weeks\n• Specialised / imported equipment — 4–8 weeks\n• Turnkey lab projects — per project schedule\n\nTracking information is shared once dispatched. For urgent requirements, call or WhatsApp directly — we can often expedite.`,
      followUps: ['How do I place an order?', 'How do I get a quote?'],
      actions: [A_CALL, A_WA],
    }
  },

  // ── Careers ───────────────────────────────────────────────────────────────────
  {
    id: 'career',
    tags: ['career', 'job', 'jobs', 'hiring', 'vacancy', 'opening', 'recruit', 'work with', 'apply', 'resume', 'cv', 'internship', 'fresher'],
    response: {
      text: `Interested in joining Inventa Systems?\n\nWe hire for:\n• Sales & Business Development\n• Service & Application Engineering\n• Product Specialists (PCR, NGS, Chromatography)\n• Operations & Logistics\n• Marketing & Digital\n\nTo apply:\n• Visit our Careers page for current openings\n• Email resume to ${EMAIL}\n• Or WhatsApp your profile directly\n\nFreshers and experienced candidates both welcome!`,
      followUps: ['What roles are currently open?', 'Where is your office?'],
      actions: [A_CAREERS, { label: 'Email HR', href: `mailto:${EMAIL}`, style: 'outline' }, A_WA],
    }
  },

  // ── Payment ───────────────────────────────────────────────────────────────────
  {
    id: 'payment',
    tags: ['payment', 'pay', 'transaction', 'invoice', 'billing', 'credit', 'bank', 'upi', 'neft', 'rtgs', 'purchase order', 'po', 'invoicing'],
    response: {
      text: `We accept:\n\n• Bank Transfer — NEFT / RTGS\n• Cheque payments\n• Purchase Orders (PO) — institutions, hospitals, government departments\n• GST invoices for all orders\n\nPayment terms are agreed during the quotation process. Contact our accounts team for billing queries.`,
      followUps: ['How do I get a quote?', 'How do I contact you?'],
      actions: [A_CALL, A_CONTACT],
    }
  },

  // ── Warranty ──────────────────────────────────────────────────────────────────
  {
    id: 'warranty',
    tags: ['warranty', 'guarantee', 'covered', 'claim', 'defective', 'replacement', 'breakdown', 'cover', 'support'],
    response: {
      text: `Warranty and extended coverage:\n\n• All instruments carry 1–2 year manufacturer warranty\n• Covers manufacturing defects and component failures under normal use\n• Does not cover consumable wear, misuse, or accidental damage\n\nFor extended protection, Annual Maintenance Contracts (AMC) include priority response (4–24 hrs) and genuine OEM parts.\n\nTo log a warranty claim, contact our service team with your invoice and instrument serial number.`,
      followUps: ['Tell me about AMC plans', 'How do I contact support?'],
      actions: [A_CALLBACK, A_WA],
    }
  },

  // ── Business hours ────────────────────────────────────────────────────────────
  {
    id: 'timing',
    tags: ['timing', 'hours', 'open', 'closed', 'working hours', 'business hours', 'time', 'schedule', 'sunday', 'saturday', 'holiday'],
    response: {
      text: `Our business hours:\n\n🟢 Monday to Saturday: 11:00 AM – 7:00 PM IST\n🔴 Sunday & Public holidays: Closed\n\nOutside these hours:\n• WhatsApp us — we'll respond next business day\n• Leave a contact form message on our website\n• Email us at ${EMAIL}\n\nI'm available 24/7 to answer your questions! The human team comes in at 11 AM.`,
      followUps: ['How do I contact you?', 'Do you have WhatsApp support?'],
      actions: [A_WA, A_CONTACT],
    }
  },
];

// ── Inverted index ────────────────────────────────────────────────────────────
const invertedIndex = {};
KB.forEach(entry => {
  entry.tags.forEach(tag => {
    const key = tag.toLowerCase();
    if (!invertedIndex[key]) invertedIndex[key] = [];
    invertedIndex[key].push(entry.id);
  });
});

const normalizeInput = (text) =>
  text.toLowerCase().replace(/[^\w\s-]/g, '').split(/\s+/).map(w => synonyms[w] || w);

// ── Sub-components ────────────────────────────────────────────────────────────
const TIER_CLS = { premium: 'tier-premium', advanced: 'tier-advanced', standard: 'tier-standard' };

const ProductCard = ({ card }) => (
  <div className="chatbot-product-card">
    {card.image && (
      <div className="chatbot-card-img-wrap">
        <img src={card.image} alt={card.title} className="chatbot-card-img" />
      </div>
    )}
    <div className="chatbot-card-body">
      {card.tier && (
        <span className={`chatbot-tier-badge ${TIER_CLS[card.tier.toLowerCase()] || ''}`}>{card.tier}</span>
      )}
      <h4 className="chatbot-card-title">{card.title}</h4>
      {card.category && <p className="chatbot-card-category">{card.category}</p>}
      {card.features?.length > 0 && (
        <ul className="chatbot-card-features">
          {card.features.slice(0, 4).map((f, i) => <li key={i}>{f}</li>)}
        </ul>
      )}
    </div>
  </div>
);

const ActionBtn = ({ action, onAction }) => {
  const cls = `chatbot-action-btn chatbot-action-${action.style || 'default'}`;
  if (action.action === 'callback') {
    return <button className={cls} onClick={() => onAction && onAction('callback')}>{action.label}</button>;
  }
  if (action.href) {
    return (
      <a href={action.href}
         target={action.href.startsWith('http') ? '_blank' : undefined}
         rel="noopener noreferrer"
         className={cls}>
        {action.label}
      </a>
    );
  }
  return <Link to={action.to} className={cls}>{action.label}</Link>;
};

const DEFAULT_CHIPS = [
  'What products do you offer?',
  'How do I get a quote?',
  'PCR thermal cyclers',
  'Real-time PCR / qPCR',
  'NGS sequencers',
  'HPLC & chromatography',
  'Mass spectrometry',
  'Centrifuges',
  'Lab chemicals & reagents',
  'Cold storage & freezers',
  'Plasticware & consumables',
  'Turnkey lab design',
  'Service & maintenance (AMC)',
  'Training & demos',
  'Calibration services',
  'LIMS & lab software',
  'Truenat POC diagnostics',
  'Liquid handling & automation',
  'Forensic science solutions',
  'Animal health & veterinary',
  'Food safety & agri testing',
  'Point-of-care testing',
  'Cell & gene therapy',
  'Delivery timelines',
  'Working hours',
  'Where are you located?',
  'Careers & jobs',
  'Payment & invoicing',
  'Warranty & support',
  'I need a callback',
];

// ── Main component ────────────────────────────────────────────────────────────
const ChatBot = () => {

  const [winOpen, setWinOpen]           = useState(false);
  const [inputValue, setInputValue]     = useState('');
  const [isTyping, setIsTyping]         = useState(false);
  const [isStreaming, setIsStreaming]   = useState(false);
  const [followUps, setFollowUps]       = useState([]);
  const [callbackStep, setCallbackStep] = useState(null); // null | 'name' | 'phone'
  const [callbackData, setCallbackData] = useState({ name: '', phone: '' });
  const [messages, setMessages]         = useState([{
    id: 'init', type: 'bot',
    text: `Hi! I'm Inventa Assistant — your AI guide for lab instruments, reagents, and complete laboratory solutions from Inventa Systems.\n\nI can help you:\n• Explore 13+ product categories (PCR, NGS, HPLC, MS, and more)\n• Match instruments to your specific workflow\n• Build and submit a quote\n• Book a demo, training, or service call\n\nWhat are you working on today?`,
    actions: [], card: null,
  }]);
  const messagesEndRef = useRef(null);
  const streamRef      = useRef(null);

  const scrollDown = () => messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });

  React.useEffect(() => { if (winOpen) scrollDown(); }, [messages, winOpen, isTyping]);
  React.useEffect(() => () => { if (streamRef.current) clearInterval(streamRef.current); }, []);

  // ── Match engine ──────────────────────────────────────────────────────────────
  const findResponse = (userInput) => {
    const words = normalizeInput(userInput);
    const lower = userInput.toLowerCase();
    const scores = {};

    for (const w of words) {
      if (invertedIndex[w]) {
        for (const id of invertedIndex[w]) scores[id] = (scores[id] || 0) + 3;
      }
      for (const tag of Object.keys(invertedIndex)) {
        if (tag.length > 2 && (tag.includes(w) || w.includes(tag))) {
          for (const id of invertedIndex[tag]) scores[id] = (scores[id] || 0) + 1;
        }
      }
    }
    for (const entry of KB) {
      for (const tag of entry.tags) {
        if (tag.includes(' ') && lower.includes(tag)) {
          scores[entry.id] = (scores[entry.id] || 0) + 5;
        }
      }
    }

    let bestId = null, bestScore = 0;
    for (const [id, score] of Object.entries(scores)) {
      if (score > bestScore) { bestScore = score; bestId = id; }
    }

    const tokens = words.filter(w => w.length > 2);

    // ── PRIORITY 1: exact model name match (most specific) ────────────────────
    for (const cat of productsData) {
      for (const family of (cat.families || [])) {
        for (const model of (family.models || [])) {
          const mName = (model.name || '').toLowerCase();
          if (mName && lower.includes(mName)) {
            const specs = Object.entries(model.specs || {}).slice(0, 4).map(([k, v]) => `  • ${k}: ${v}`).join('\n');
            return {
              text: `${model.name} is a ${model.tier || ''} tier system in our ${cat.title} range.\n\nKey specs:\n${specs || 'Contact us for full specifications.'}\n\nHighlights: ${(model.keyFeatures || []).slice(0, 3).join(', ')}.`,
              followUps: ['How do I get a quote?', `Tell me about ${cat.shortTitle}`, 'Book a demo'],
              actions: [A_QUOTE, A_CALLBACK],
              card: { title: model.name, category: cat.title, image: cat.image, tier: model.tier, features: model.keyFeatures?.slice(0, 4) || [] },
            };
          }
        }
        // ── family name fuzzy match ──────────────────────────────────────────
        let fScore = 0;
        const fText = ((family.name || '') + ' ' + (family.description || '')).toLowerCase();
        for (const t of tokens) { if (fText.includes(t)) fScore++; }
        if (fScore >= 2) {
          return {
            text: `${family.name} is part of our ${cat.title} range.\n\n${(family.description || '').split('.')[0]}.\n\nVisit our Products page for full specifications and pricing.`,
            followUps: ['How do I get a quote?', `Tell me about ${cat.shortTitle}`],
            actions: [A_QUOTE, A_PRODUCTS],
            card: { title: family.name, category: cat.title, image: cat.image, tier: null, features: family.keyFeatures?.slice(0, 4) || [] },
          };
        }
      }
    }

    // ── PRIORITY 2: KB match (rich category-level responses) ─────────────────
    if (bestId && bestScore >= 2) {
      const entry = KB.find(e => e.id === bestId);
      if (entry) return entry.response;
    }

    // ── PRIORITY 3: application workflow title match ───────────────────────────
    for (const app of applicationsData) {
      for (const wf of (app.workflows || [])) {
        const wfTitle = (wf.title || '').toLowerCase();
        const wfWords = wfTitle.split(/[\s&/()]+/).filter(w => w.length >= 3);
        const matchCount = wfWords.filter(w => lower.includes(w)).length;
        if (wfTitle && (lower.includes(wfTitle) || (matchCount >= 2 && matchCount / wfWords.length >= 0.6))) {
          return {
            text: `${wf.title} is a key workflow in our ${app.title} solutions.\n\n${wf.description || ''}\n\nKey capabilities:\n${(wf.keyFeatures || []).slice(0, 4).map(f => `• ${f}`).join('\n')}\n\nVisit our Applications page to explore instruments and submit a quote.`,
            followUps: [`Tell me about ${app.shortTitle}`, 'How do I get a quote?', 'What products support this?'],
            actions: [A_APPS, A_QUOTE],
          };
        }
      }
    }

    // ── PRIORITY 4: top-level product category or application match ───────────
    for (const cat of productsData) {
      if (lower.includes(cat.title?.toLowerCase()) || lower.includes(cat.shortTitle?.toLowerCase())) {
        return {
          text: `Great question! We offer ${cat.title}.\n\n${cat.overview || ''}\n\nVisit our Products page to browse models and add to your quote.`,
          followUps: ['How do I get a quote?', `Tell me more about ${cat.shortTitle}`],
          actions: [A_QUOTE, A_PRODUCTS],
          card: { title: cat.title, category: cat.shortTitle, image: cat.image, tier: null, features: cat.families?.[0]?.keyFeatures?.slice(0, 4) || [] },
        };
      }
    }
    for (const app of applicationsData) {
      if (lower.includes(app.title?.toLowerCase()) || lower.includes(app.shortTitle?.toLowerCase())) {
        return {
          text: `We provide comprehensive solutions for ${app.title}.\n\n${app.overview || ''}\n\nVisit our Applications page to explore workflows and products.`,
          followUps: ['What products do you offer?', 'How do I get a quote?'],
          actions: [A_APPS, A_QUOTE],
        };
      }
    }

    // ── Generic fallback ──────────────────────────────────────────────────────
    return {
      text: `I want to make sure I give you accurate information! Could you tell me a bit more?\n\nYou can ask me about:\n• A specific product or category\n• Getting a quote\n• Lab design or turnkey solutions\n• Service, calibration, or validation\n• Training and demos\n• Or anything else about Inventa!\n\nAlternatively, speak with our team directly at ${PHONE}.`,
      followUps: ['What products do you offer?', 'How do I get a quote?', 'I need to speak with someone'],
      actions: [A_CALLBACK, A_WA],
    };
  };

  // ── Stream response ───────────────────────────────────────────────────────────
  const streamResponse = (result) => {
    const { text, actions = [], card = null, followUps: fu = [] } = result;
    const msgId = Date.now().toString();
    setMessages(prev => [...prev, { id: msgId, type: 'bot', text: '', actions: [], card: null }]);
    setIsStreaming(true);

    const words = text.split(' ');
    let idx = 0;
    streamRef.current = setInterval(() => {
      if (idx < words.length) {
        idx++;
        setMessages(prev => prev.map(m => m.id === msgId ? { ...m, text: words.slice(0, idx).join(' ') } : m));
      } else {
        clearInterval(streamRef.current);
        streamRef.current = null;
        setMessages(prev => prev.map(m => m.id === msgId ? { ...m, actions, card } : m));
        setIsStreaming(false);
        setFollowUps(fu);
        scrollDown();
      }
    }, 28);
  };

  // ── Callback flow ─────────────────────────────────────────────────────────────
  const startCallback = () => {
    setCallbackStep('name');
    setFollowUps([]);
    streamResponse({
      text: `I'd be happy to arrange a callback! Our team will call you during business hours (Mon–Sat, 11 AM – 7 PM IST).\n\nFirst, what's your name?`,
      actions: [], followUps: [],
    });
  };

  const handleAction = (actionType) => {
    if (actionType === 'callback' && !callbackStep && !isStreaming) {
      setMessages(prev => [...prev, { id: Date.now().toString(), type: 'user', text: 'Request a Callback' }]);
      setIsTyping(true);
      setTimeout(() => { setIsTyping(false); startCallback(); }, 400);
    }
  };

  // ── Send message ──────────────────────────────────────────────────────────────
  const sendMessage = (text) => {
    if (!text.trim() || isStreaming) return;
    const trimmed = text.trim();

    if (callbackStep === 'name') {
      setMessages(prev => [...prev, { id: Date.now().toString(), type: 'user', text: trimmed }]);
      setInputValue('');
      setCallbackData(d => ({ ...d, name: trimmed }));
      setCallbackStep('phone');
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        streamResponse({ text: `Thanks, ${trimmed}! What's the best phone number for our team to reach you?`, actions: [], followUps: [] });
      }, 400);
      return;
    }

    if (callbackStep === 'phone') {
      setMessages(prev => [...prev, { id: Date.now().toString(), type: 'user', text: trimmed }]);
      setInputValue('');
      const name = callbackData.name;
      const phone = trimmed;
      setCallbackStep(null);
      setIsTyping(true);

      fetch('/api/callback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, phone }),
      })
        .then(r => r.json())
        .then(data => {
          setIsTyping(false);
          if (data.success) {
            streamResponse({
              text: `Your callback request is confirmed!\n\nOur team will call you at ${phone} during business hours (Mon–Sat, 11 AM – 7 PM IST).\n\nIs there anything else I can help you with while you wait?`,
              actions: [A_WA, A_PRODUCTS],
              followUps: ['What products do you offer?', 'How do I get a quote?'],
            });
          } else {
            streamResponse({
              text: `Something went wrong. Please call us directly at ${PHONE} or WhatsApp us — our team will respond right away.`,
              actions: [A_CALL, A_WA],
              followUps: [],
            });
          }
        })
        .catch(() => {
          setIsTyping(false);
          streamResponse({
            text: `Couldn't submit your request — please call us at ${PHONE} or WhatsApp us. We're happy to help!`,
            actions: [A_CALL, A_WA], followUps: [],
          });
        });
      return;
    }

    // Normal message
    setMessages(prev => [...prev, { id: Date.now().toString(), type: 'user', text: trimmed }]);
    setInputValue('');
    setFollowUps([]);
    setIsTyping(true);

    // Callback intent detection
    if (/call me( back)?|callback|call back|ring me|speak to (someone|agent|team)|talk to (someone|agent|team)|connect me to/.test(trimmed.toLowerCase())) {
      setTimeout(() => { setIsTyping(false); startCallback(); }, 400);
      return;
    }

    setTimeout(() => {
      setIsTyping(false);
      streamResponse(findResponse(trimmed));
    }, 280 + Math.random() * 280);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(inputValue); }
  };

  const chips = followUps.length > 0 ? followUps : DEFAULT_CHIPS;

  const inputPlaceholder =
    callbackStep === 'name'  ? 'Type your name…' :
    callbackStep === 'phone' ? 'Type your phone number…' :
    'Ask me anything about Inventa…';

  return (
    <div className="chatbot-container">
      <AnimatePresence>
        {winOpen && (
          <motion.div
            className="chatbot-window"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            {/* Header */}
            <div className="chatbot-header">
              <div className="chatbot-header-info">
                <div className="chatbot-avatar"><Bot size={20} color="#fff" /></div>
                <div>
                  <h3 className="chatbot-title">Inventa Assistant</h3>
                  <span className="chatbot-subtitle">AI-powered lab solutions guide</span>
                </div>
              </div>
              <div className="chatbot-header-btns">
                <a href={PHONE_HREF} className="chatbot-hdr-icon-btn" title={`Call ${PHONE}`}><Phone size={15} /></a>
                <a href={WA_HREF} target="_blank" rel="noopener noreferrer" className="chatbot-hdr-icon-btn" title="WhatsApp us"><MessageCircle size={15} /></a>
                <button className="chatbot-close-btn" onClick={() => setWinOpen(false)}><X size={20} /></button>
              </div>
            </div>

            {/* Messages */}
            <div className="chatbot-messages">
              {messages.map((msg, i) => (
                <div key={i} className={`chatbot-message-row ${msg.type}`}>
                  {msg.type === 'bot' && <div className="chatbot-msg-avatar"><Bot size={14} /></div>}
                  <div className={`chatbot-bubble ${msg.type}`}>
                    <div className="chatbot-bubble-text">{msg.text}</div>
                    {msg.card && <ProductCard card={msg.card} />}
                    {msg.actions?.length > 0 && (
                      <div className="chatbot-actions">
                        {msg.actions.map((a, j) => <ActionBtn key={j} action={a} onAction={handleAction} />)}
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="chatbot-message-row bot">
                  <div className="chatbot-msg-avatar"><Bot size={14} /></div>
                  <div className="chatbot-bubble bot chatbot-typing">
                    <span className="dot" /><span className="dot" /><span className="dot" />
                  </div>
                </div>
              )}

              {!isTyping && !isStreaming && !callbackStep && chips.length > 0 && (
                <div className="chatbot-suggestions">
                  <p className="chatbot-suggestions-label">{followUps.length > 0 ? 'You might also ask:' : 'Suggested:'}</p>
                  <div className="chatbot-suggestions-chips">
                    {chips.map((q, i) => (
                      <button key={i} className="chatbot-suggestion-chip"
                        onClick={() => {
                          if (q === 'I need a callback' || q === 'I need to speak with someone') { handleAction('callback'); return; }
                          sendMessage(q);
                        }}>
                        {q}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Callback step indicator */}
            {callbackStep && (
              <div className="chatbot-callback-bar">
                <span className="chatbot-callback-dot" />
                {callbackStep === 'name' ? 'Callback request — Step 1 of 2: Your name' : 'Callback request — Step 2 of 2: Your phone number'}
              </div>
            )}

            {/* Footer */}
            <div className="chatbot-footer">
              <div className="chatbot-input-wrap">
                <input
                  type="text"
                  className="chatbot-input"
                  placeholder={inputPlaceholder}
                  value={inputValue}
                  onChange={e => setInputValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                  disabled={isTyping || isStreaming}
                  autoComplete="off"
                />
                <button
                  className={`chatbot-send-btn ${inputValue.trim() && !isStreaming ? 'active' : ''}`}
                  onClick={() => sendMessage(inputValue)}
                  disabled={!inputValue.trim() || isTyping || isStreaming}
                >
                  <Send size={16} />
                </button>
              </div>
              <p className="chatbot-footer-note">Inventa Systems · Mon–Sat 11 AM – 7 PM IST</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FAB */}
      <motion.button
        className="chatbot-fab"
        onClick={() => setWinOpen(v => !v)}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.94 }}
        title="Chat with Inventa Assistant"
      >
        <AnimatePresence mode="wait">
          {winOpen
            ? <motion.span key="c" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}><ChevronDown size={24} /></motion.span>
            : <motion.span key="o" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}><MessageCircle size={24} /></motion.span>
          }
        </AnimatePresence>
      </motion.button>
    </div>
  );
};

export default ChatBot;
