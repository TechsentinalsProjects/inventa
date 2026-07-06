import {
  Dna, Microscope, ShieldCheck, FlaskConical, TestTube,
  Fingerprint, HeartPulse, Leaf, Droplets, Box,
  Pill, Syringe, Monitor, Scale, Settings
} from 'lucide-react';

export const applicationsData = [
  {
    id: 'molecular-diagnostics',
    title: 'Molecular Diagnostics',
    shortTitle: 'Mol. Diagnostics',
    icon: Dna,
    color: '#3B82F6',
    bannerImage: null,
    image: '/applications/molecular_diagnostics_new.png',
    overview: 'Advanced PCR, NGS, and sequencing platforms enabling precise molecular-level disease detection and research.',
    workflows: [
      {
        title: 'Nucleic Acid Extraction',
        description: 'Automated and manual extraction systems for DNA/RNA from diverse biological samples.',
        extendedDescription: 'High-purity nucleic acid extraction platforms supporting magnetic bead, spin-column, and automated liquid-handling approaches for clinical and research specimens.',
        keyFeatures: ['Automated 96-sample processing', 'High-purity A260/280 > 1.8', 'Blood, tissue, swab compatibility', 'Integrated inhibitor removal'],
        relatedProducts: [
          {
            name: 'Automated Nucleic Acid Extractor',
            docs: [
              { text: 'Brochure: KingFisher Instruments Experience', url: 'https://documents.thermofisher.com/TFS-Assets/BID/brochures/kingfisher-instruments-experience-brochure.pdf' }
            ]
          },
          { name: 'RNA Extraction Spin Kit', docs: [] },
          { name: 'Viral RNA Isolation Kit', docs: [] },
        ],
        icon: Dna, image: '/applicaion_images/ Molecular Diagnostics/NucleicAcidExtraction.jpg',
      },
      {
        title: 'Real-Time PCR & qPCR Reagents',
        description: 'High-sensitivity quantitative PCR systems and reagents for food safety, pathogen detection, and genomics.',
        extendedDescription: 'Real-time PCR platforms deliver quantitative insights with unmatched sensitivity. Specialized in food molecular solutions and diagnostic applications with high-accuracy multiplex assay kits.',
        keyFeatures: [
          'Real-time Food PCR System (QuantStudio 5, 0.1 mL block, 96-well)',
          'Pathogen Detection – SureTect Assay Kits',
          'Label Claim – GMO Solutions/Vegan ID Assay',
          'Food Fraud – Meat ID Assays'
        ],
        relatedProducts: [
          {
            name: 'Real-Time PCR System (96-well)',
            docs: [
              { text: 'Brochure: QuantStudio Real-Time PCR System Family', url: 'https://documents.thermofisher.com/TFS-Assets/LSG/brochures/quantstudio-real-time-pcr-system-family-brochure.pdf' },
              { text: 'User Guide: QuantStudio 3 & 5 Real-Time PCR Systems', url: 'https://documents.thermofisher.com/TFS-Assets/LSG/manuals/MAN0010407_QuantStudio3_5_InstallUseMaint_UG.pdf' },
            ],
          },
          {
            name: 'Pathogen Detection Kit Panel',
            docs: [
              { text: 'GMO Testing Solutions Brochure', url: '/brochures/pcr/GMO-Testing-Solutions-Brochure-EN.pdf' },
              { text: 'Meat Species Detection Brochure', url: '/brochures/pcr/Meat-Species-Detection-Brochure_EN_May_2020.pdf' },
              { text: 'QuantStudio 5 Food Testing Brochure', url: '/brochures/pcr/QS5%20capability%20brochure%20food%20testing.pdf' },
              { text: 'SureTect Range Brochure', url: '/brochures/pcr/SureTect-Range-Brochure-EN.pdf' }
            ]
          },
          { name: 'Multiplex qPCR Master Mix', docs: [] },
        ],
        icon: Dna, image: '/applicaion_images/ Molecular Diagnostics/Real-TimePCR.jpg',
      },
      {
        title: 'Sanger Sequencing',
        description: 'Capillary electrophoresis platforms for confirmatory sequencing and fragment analysis.',
        extendedDescription: 'Gold-standard Sanger sequencing systems used for mutation confirmation, microbial identification, and plasmid verification in clinical and research settings.',
        keyFeatures: ['1–24 capillary configurations', 'Bidirectional sequencing support', 'Fragment analysis capability', 'PhiX-calibrated accuracy'],
        relatedProducts: [
          {
            name: 'Capillary Electrophoresis System',
            docs: [
              { text: 'Brochure: SeqStudio Flex Genetic Analyzers for Human Identification', url: 'https://documents.thermofisher.com/TFS-Assets/GSD/brochures/seqstudio-flex-genetic-anlyzer-human-Identification-brochure.pdf' },
              { text: 'User Guide: SeqStudio Flex Series Genetic Analyzer', url: 'https://documents.thermofisher.com/TFS-Assets/LSG/manuals/100104689_SeqStudioFlex_v1_RUO_UG.pdf' },
            ],
          },
          { name: 'BigDye Terminator Kit', docs: [] },
          { name: 'Fragment Analysis Reagents', docs: [] },
        ],
        icon: Dna, image: '/applicaion_images/ Molecular Diagnostics/Sanger Sequencing.jpg',
      },
      {
        title: 'Next-Generation Sequencing',
        description: 'High-throughput NGS platforms for whole-genome, targeted panel, and RNA sequencing workflows.',
        extendedDescription: 'Scalable NGS solutions from benchtop to clinical-grade instruments, delivering comprehensive genomic insights for research, oncology, and infectious disease applications.',
        keyFeatures: ['Short-read and long-read platforms', 'Automated library preparation', 'On-board bioinformatics pipeline', 'Clinical-grade variant calling'],
        relatedProducts: [
          {
            name: 'Benchtop NGS Sequencer',
            docs: [
              { text: 'Brochure: Ion Torrent Genexus System', url: 'https://documents.thermofisher.com/TFS-Assets/CSD/brochures/ion-torrent-genexus-system-brochure.pdf' },
              { text: 'Brochure: Targeted NGS Applications', url: 'https://documents.thermofisher.com/TFS-Assets/CSD/brochures/ngs-applications-brochure.pdf' },
              { text: 'User Guide: Genexus Integrated Sequencer', url: 'https://documents.thermofisher.com/TFS-Assets/LSG/manuals/MAN0017910_GenexusIntegratedSequencer_UG.pdf' },
            ],
          },
          { name: 'Library Prep Automation Kit', docs: [] },
          { name: 'Variant Analysis Software', docs: [] },
        ],
        icon: Dna, image: '/applicaion_images/ Molecular Diagnostics/Next-Generation Sequencing.jpg',
      }
    ]
  },
  {
    id: 'cell-biology',
    title: 'Cell Biology',
    shortTitle: 'Cell Biology',
    icon: Microscope,
    color: '#10B981',
    bannerImage: null,
    image: '/applications/cell_biology_new.png',
    overview: 'Complete cell culture, imaging, and analysis solutions for life science and biomedical research.',
    workflows: [
      {
        title: 'Cell Culture & Expansion',
        description: 'Incubators, media, and consumables for reliable primary and immortalized cell culture.',
        extendedDescription: 'End-to-end cell culture infrastructure including CO2 incubators, culture media, cryopreservation systems, and biosafety cabinets to maintain cell viability and reproducibility.',
        keyFeatures: ['Precision CO2 and humidity control', 'T-flask, spinner, and bioreactor formats', 'Animal-free defined media', 'Cryopreservation and biobanking support'],
        relatedProducts: [
          { name: 'CO2 Incubator (170L)', docs: [] },
          {
            name: 'Serum-Free Cell Culture Media',
            docs: [
              { text: 'Reference: Mammalian Cell Culture Reagents', url: 'https://www.thermofisher.com/in/en/home/life-science/cell-culture/mammalian-cellculture/reagents.html' }
            ]
          },
          { name: 'Class II Biosafety Cabinet', docs: [] },
        ],
        icon: Microscope, image: '/applicaion_images/update/Cell Culture & Expansion.jpg',
      },
      {
        title: 'Flow Cytometry',
        description: 'Multi-parameter analyzers and cell sorters for immunophenotyping and functional assays.',
        extendedDescription: 'The 2020 Attune NxT Flow Cytometer has expanded functionalities to drive your research forward. Designed and developed to remove common barriers associated with flow cytometry, the evolutionary capabilities of the Attune NxT Flow Cytometer offer adaptable optical configuration options so you can get the most out of your multicolor analysis.\n\n• New CytKick and CytKick Max autosampler—more efficiency for high-throughput assays\n• New 21 CFR part 11 compliant software for regulated laboratories on Windows 10 operating system\n• Improved workflow for run protocol and instrument settings management',
        keyFeatures: ['Up to 40-parameter detection', 'High-speed cell sorting (>50,000 events/sec)', 'Spectral unmixing algorithms', 'Validated antibody panels'],
        relatedProducts: [
          {
            name: 'High-Parameter Flow Cytometer',
            docs: [
              { text: 'Brochure: Attune NxT Flow Cytometer', url: 'https://documents.thermofisher.com/TFS-Assets/BID/brochures/attune-nxt-and-flow-brochure.pdf' },
            ]
          },
          { name: 'Cell Sorter System', docs: [] },
          { name: 'Lyophilized Antibody Panel Kit', docs: [] },
        ],
        icon: Microscope, image: '/applicaion_images/Cell Biology/Flow Cytometry.jpg',
      },
      {
        title: 'Cell Imaging & Analysis',
        description: 'Fluorescence microscopes and automated imaging systems for morphological and functional studies.',
        extendedDescription: 'Wide-field, confocal, and high-content screening platforms providing quantitative cell imaging with automated image analysis software for high-throughput applications.',
        keyFeatures: ['Confocal and widefield configurations', 'Automated plate imaging', 'AI-driven image segmentation', 'Live-cell time-lapse imaging'],
        relatedProducts: [
          { name: 'Inverted Fluorescence Microscope', docs: [] },
          {
            name: 'High-Content Imaging System',
            docs: [
              { text: 'Brochure: High-Content Imaging Systems', url: 'https://documents.thermofisher.com/TFS-Assets/BID/brochures/imaging-systems-brochure.pdf' }
            ]
          },
          { name: 'CellProfiler Analysis Software', docs: [] },
        ],
        icon: Microscope, image: '/applicaion_images/Cell Biology/Cell Imaging & Analysis.jpg',
      }
    ]
  },
  {
    id: 'cell-gene-therapy',
    title: 'Cell and Gene Therapy',
    shortTitle: 'CGT',
    icon: ShieldCheck,
    color: '#8B5CF6',
    bannerImage: null,
    image: '/applications/cell_gene_therapy_new.png',
    overview: 'Specialized platforms for viral vector production, cell therapy manufacturing, and gene editing applications.',
    workflows: [
      {
        title: 'Gene Editing (CRISPR)',
        description: 'CRISPR-Cas9 delivery tools, guide RNA libraries, and on-target verification assays.',
        extendedDescription: 'Comprehensive CRISPR gene editing toolkits enabling precise genome modification in primary cells and cell lines, with off-target detection and functional validation workflows.',
        keyFeatures: ['Pre-designed sgRNA libraries', 'Cas9 ribonucleoprotein delivery', 'T7E1 and digital PCR validation', 'HDR and NHEJ efficiency analysis'],
        relatedProducts: [
          { name: 'CRISPR-Cas9 Editing Kit', docs: [{ text: 'Genome Editing Resource Guide', url: '/brochures/genome-editing-resource-guide-brochurepdf.pdf' }] },
          { name: 'Electroporation System', docs: [] },
          { name: 'Guide RNA Synthesis Kit', docs: [] },
        ],
        icon: ShieldCheck, image: '/applicaion_images/Cell and Gene Therapy/Gene Editing.jpg',
      },
      {
        title: 'Cell Therapy Manufacturing',
        description: 'GMP-grade T-cell expansion, CAR-T manufacturing, and quality testing platforms.',
        extendedDescription: 'Closed-system, GMP-compliant cell therapy manufacturing solutions for CAR-T, NK cell, and dendritic cell therapies, including activation, expansion, and cryopreservation.',
        keyFeatures: ['Closed-system GMP bioreactors', 'T-cell activation and expansion kits', 'Cryopreservation bags and systems', 'Release testing assay panels'],
        relatedProducts: [
          { name: 'G-Rex Cell Expansion System', docs: [{ text: 'Cell Therapy Brochure', url: '/brochures/cell-therapy-brochure.pdf' }] },
          { name: 'CAR-T Activation Kit', docs: [] },
          { name: 'Controlled-Rate Cell Freezer', docs: [] },
        ],
        icon: ShieldCheck, image: '/applicaion_images/update/Cell Therapy Manufacturing.jpg',
        ourWorkflow: [
          {
            step: 1,
            title: 'Collection and tracking',
            items: ['Apheresis', 'Supply and cold chain logistics', 'Documentation', 'Chain of custody'],
          },
          {
            step: 2,
            title: 'Cell isolation, activation, and processing',
            items: ['Closed modular cell processing systems', 'Magnetic bead-based cell isolation and activation', 'Single-use platforms', 'High cell purity and viability', 'Flexible, high-speed, and scalable solutions'],
          },
          {
            step: 3,
            title: 'Cell engineering and genome editing',
            items: ['Genome editing technologies—CRISPR and TALEN tools', 'Closed modular electroporation system', 'Lentiviral production system', 'Lipid nanoparticles', 'Sequence confirmation, verification, and QC'],
          },
          {
            step: 4,
            title: 'Cell expansion',
            items: ['Custom and catalog media', 'PeproGMP cytokines and recombinant proteins', 'Premium fetal bovine serum (FBS) that meets USP/EP guidelines', 'Serum-free and xeno-free reagents', 'Closed modular cell processing systems', 'Single-use technologies (SUTs), incubators, bioreactors, centrifuges, and biosafety cabinets'],
          },
          {
            step: 5,
            title: 'Formulation, fill, finish, and cryopreservation',
            items: ['Automated formulation and filling', 'Broader compatibility to various outputs and volume ranges', 'Precise and consistent volumes', 'Cryopreservation platforms'],
          },
          {
            step: 6,
            title: 'Lot release, characterization, and purity analysis',
            items: ['Identity, purity, and potency assays', 'Contamination and impurity solutions', 'Microbial safety', 'Genomic, proteomic, and cellular analytical tools'],
          },
          {
            step: 7,
            title: 'Supply and logistics',
            items: ['Supply and cold chain logistics', 'Clinical trial support', 'Global distribution'],
          },
        ],
      }
    ]
  },
  {
    id: 'analytical-science',
    title: 'Analytical Science',
    shortTitle: 'Analytical',
    icon: FlaskConical,
    color: '#F59E0B',
    bannerImage: null,
    image: '/applications/analytical_science.png',
    overview: 'Chromatography, spectroscopy, and mass spectrometry instruments for precise chemical and biochemical analysis.',
    workflows: [
      {
        title: 'Chromatography (HPLC/UHPLC)',
        description: 'High-performance liquid chromatography systems for pharmaceutical, food, and environmental analysis.',
        extendedDescription: 'Robust HPLC and UHPLC platforms with UV, DAD, fluorescence, and MS detection for method development, QC testing, and regulated pharmaceutical analysis.',
        keyFeatures: ['Quaternary and binary gradient systems', 'Sub-2-micron column compatibility', 'CFR Part 11 compliant software', 'Automated sample injection'],
        relatedProducts: [
          {
            name: 'UHPLC System with DAD',
            docs: [
              { text: 'User Guide: Vanquish Neo UHPLC System', url: 'https://docs.thermofisher.com/access?partNo=4822.5011-EN' },
              { text: 'Specification Sheet: Vanquish Neo UHPLC System', url: 'https://documents.thermofisher.com/TFS-Assets/CMD/Specification-Sheets/ps-74081-lc-vanquish-neo-uhplc-ps74081-en.pdf' },
              { text: 'Brochure: Vanquish Neo UHPLC System', url: 'https://documents.thermofisher.com/TFS-Assets/CMD/brochures/br-74142-lc-vanquish-neo-uhplc-br74142-en.pdf' },
            ],
          },
          {
            name: 'Reversed-Phase C18 Columns',
            docs: [
              { text: 'Brochure: Vanquish Neo UHPLC System', url: 'https://documents.thermofisher.com/TFS-Assets/CMD/brochures/br-74142-lc-vanquish-neo-uhplc-br74142-en.pdf' },
            ],
          },
          { name: 'Chromatography Data System (CDS)', docs: [] },
        ],
        icon: FlaskConical, image: '/applicaion_images/ Analytical Science/Chromatography.jpg',
      },
      {
        title: 'Mass Spectrometry',
        description: 'LC-MS/MS and GC-MS systems for targeted quantitation and untargeted metabolomics.',
        extendedDescription: 'Triple-quadrupole and high-resolution mass spectrometry platforms for clinical biomarker discovery, toxicology, environmental testing, and pharmaceutical impurity profiling.',
        keyFeatures: ['Triple-quadrupole MRM workflows', 'High-resolution accurate mass (QTOF)', 'Automated sample preparation', 'Spectral library matching'],
        relatedProducts: [
          {
            name: 'LC-MS/MS Triple Quadrupole',
            docs: [
              { text: 'Brochure: Orbitrap Exploris 480 Mass Spectrometer', url: 'https://documents.thermofisher.com/TFS-Assets/CMD/brochures/br-65448-ms-orbitrap-exploris480-br65448-en.pdf' },
              { text: 'Product Details: Orbitrap Exploris 120 Mass Spectrometer', url: 'https://www.thermofisher.com/order/catalog/product/BRE725539?SID=srch-srp-BRE725539' }
            ]
          },
          { name: 'QTOF High-Resolution System', docs: [] },
          { name: 'Automated SPE Station', docs: [] },
        ],
        icon: FlaskConical, image: '/applicaion_images/ Analytical Science/Mass Spectrometry.jpg',
      },
      {
        title: 'ICP-MS',
        description: 'Inductively Coupled Plasma Mass Spectrometry systems for trace elemental analysis.',
        extendedDescription: 'High-sensitivity ICP-MS instruments for multi-element analysis, providing trace and ultra-trace element detection in environmental, food safety, geological, and clinical laboratories.',
        keyFeatures: ['Ultra-trace multi-element detection', 'Advanced interference removal', 'Robust plasma interface', 'Fast sample analysis throughput'],
        relatedProducts: [
          {
            name: 'ICP-MS Trace Element Analyzer',
            docs: [
              { text: 'Brochure: iCAP RQ ICP-MS System', url: 'https://documents.thermofisher.com/TFS-Assets/CMD/brochures/br-003092-tea-icp-ms-icap-mtx-discovery-br003092-em-en.pdf' },
              { text: 'Product Details: iCAP RQ ICP-MS System', url: 'https://www.thermofisher.com/order/catalog/product/BRE731459A?SID=srch-srp-BRE731459A' }
            ]
          }
        ],
        icon: FlaskConical, image: '/applicaion_images/ Analytical Science/ICP-MS.jpg',
      },
      {
        title: 'Battery Technology Solutions',
        description: 'Analytical instruments and tools for battery materials characterization and safety analysis.',
        extendedDescription: 'Advanced analytical characterization solutions for lithium-ion battery research, development, and quality control, covering chemical compositions, structural evaluation, and failure analysis.',
        keyFeatures: ['Battery material purity analysis', 'Structural characterization', 'Safety and thermal evaluation', 'In-line process control solutions'],
        relatedProducts: [
          {
            name: 'Battery Characterization Systems',
            docs: [
              { text: 'AN 001967: Inorganic anions in lithium carbonate solution', url: '/brochures/battery/AN%20001967%20Determination%20of%20inorganic%20anions%20in%20saturated%20lithium%20carbonate%20solution.pdf' },
              { text: 'AN 002666: IC ICP MS iCAP RQplus Batteries', url: '/brochures/battery/AN%20002666%20IC%20ICP%20MS%20iCAP%20RQplus%20Batteries.pdf' },
              { text: 'Battery material analysis from Lab to Line', url: '/brochures/battery/Battery%20material%20analysis%20from%20Lab%20to%20Line%20March%202023.pdf' },
              { text: 'Characterization of battery samples by FlashSmart', url: '/brochures/battery/Characterization%20of%20battery%20samples%20by%20the%20FlashSmart%20Elemental%20Analyzer.pdf' },
              { text: 'Analysis of electrolyte solutions for lithium-ion batteries by GC-MS', url: '/brochures/battery/Comprehensive%20analysis%20of%20electrolyte%20solutions%20for%20lithiumion%20batteries%20using%20gas%20chromatography-mass%20spectrometry.pdf' },
              { text: 'Determination of Dissolved Manganese in Battery Electrolyte', url: '/brochures/battery/Determination%20of%20Dissolved%20Manganese%20in%20Lithium-Manganese%20Oxide%20Battery%20Electrolyte.pdf' },
              { text: 'Determination of tetrafluoroborate, perchlorate, and hexafluorophosphate', url: '/brochures/battery/Determination%20of%20tetrafluoroborate,%20perchlorate,%20and%20hexafluorophosphate%20in%20a%20simulated%20electrolyte%20sample%20from%20lithium%20ion%20battery%20production.pdf' },
              { text: 'GC-MS measures electrolyte components of lithium-ion batteries', url: '/brochures/battery/Gas%20chromatography–mass%20spectrometry%20measures%20the%20electrolyte%20components%20of%20lithium-ion%20batteries.pdf' }
            ]
          }
        ],
        icon: FlaskConical, image: '/applicaion_images/ Analytical Science/netdose-labcoat.jpg',
      },
      {
        title: 'Extreva',
        description: 'Automated extraction and evaporation systems for sample preparation workflows.',
        extendedDescription: 'Integrated extraction and concentration platforms delivering fast, automated, and reliable sample prep workflows for complex biological and environmental matrices.',
        keyFeatures: ['Automated parallel extraction', 'Integrated evaporation and concentration', 'Minimized solvent consumption', 'Validated method protocols'],
        relatedProducts: [
          {
            name: 'Extreva Extraction System',
            docs: [
              { text: 'Extreva ASE Accelerated Solvent Extractor Brochure', url: '/brochures/br-000940-ic-sample-preparation-extreva-ase-br000940-en.pdf' }
            ]
          }
        ],
        icon: FlaskConical, image: '/applicaion_images/ Analytical Science/Extreva.jpg',
      },
      {
        title: 'Spectroscopy (UV/Vis & IR)',
        description: 'UV-Vis, FTIR, and Raman instruments for material characterization and purity testing.',
        extendedDescription: 'Bench-top and portable spectroscopy instruments for identity testing, concentration measurement, and polymorphism screening in QC and materials research.',
        keyFeatures: ['Single and double-beam UV-Vis', 'ATR-FTIR accessories', 'Handheld Raman analyzers', 'GMP-ready software modules'],
        relatedProducts: [
          { name: 'UV-Vis Spectrophotometer', docs: [] },
          { name: 'ATR-FTIR Spectrometer', docs: [] },
          { name: 'Handheld Raman Analyzer', docs: [] },
        ],
        icon: FlaskConical, image: '/applicaion_images/ Analytical Science/Spectroscopy.jpg',
      }
    ]
  },
  {
    id: 'chemicals',
    title: 'Chemicals & Reagents',
    shortTitle: 'Chemicals',
    icon: TestTube,
    color: '#EC4899',
    bannerImage: null,
    image: '/applications/chemicals.png',
    overview: 'High-purity solvents, organic building blocks, custom synthesis reagents, and biological buffers.',
    workflows: [
      {
        title: 'High-Purity Solvents (LC-MS & HPLC)',
        description: 'Highly-characterized solvents guaranteeing minimal background interference in mass spectrometry and chromatography.',
        extendedDescription: 'Solvents filtered to 0.1 microns, metal-tested at ppb levels, and packed under inert gas to prevent oxidation, ideal for UHPLC, LC-MS, and analytical testing.',
        keyFeatures: ['Low UV background absorbance', 'Low trace metal contamination (<5ppb)', 'High assay purity (>99.9%)', 'Packaged in amber glass and stainless steel drum'],
        relatedProducts: [
          { name: 'LC-MS Grade Acetonitrile (4L)', docs: [] },
          { name: 'HPLC Grade Methanol (4L)', docs: [] },
          { name: 'High-Purity Water (LC-MS Grade)', docs: [] },
        ],
        icon: TestTube, image: '/applicaion_images/ Chemicals & Reagents/High-Purity Solvents.jpg',
      },
      {
        title: 'Fine Chemicals & Synthesis Reagents',
        description: 'Organic catalysts, building blocks, and custom synthesis chemical reagents.',
        extendedDescription: 'An extensive portfolio of organic compounds, catalysts, ligands, and custom synthesis reactants supporting academic research and pharmaceutical R&D.',
        keyFeatures: ['Over 30,000 catalog items', 'Custom pack sizes (milligrams to kilograms)', 'CoAs with GC/NMR characterisation', 'Strict temperature-controlled supply chain'],
        relatedProducts: [
          { name: 'Grignard Reagents & Organometallics', docs: [] },
          { name: 'Chiral Catalysts & Ligands', docs: [] },
          { name: 'Custom Synthesis Precursors', docs: [] },
        ],
        icon: TestTube, image: '/applicaion_images/ Chemicals & Reagents/Fine Chemicals & Synthesis Reagents.jpg',
      },
      {
        title: 'Biological Buffers & Biochemicals',
        description: 'Molecular biology grade buffer salts, detergents, and amino acids for life science assays.',
        extendedDescription: 'Ultra-pure buffer reagents including Tris, HEPES, EDTA, and SDS tested for DNase/RNase contamination and heavy metals, critical for bio-pharmaceutical manufacturing and academic research.',
        keyFeatures: ['DNase, RNase, and protease-free', 'Endotoxin-tested options', 'Consistent lot-to-lot pH properties', 'Bulk packaging for manufacturing'],
        relatedProducts: [
          { name: 'Tris Buffer Salt (Molecular Grade)', docs: [] },
          { name: 'EDTA Disodium Salt (Dihydrate)', docs: [] },
          { name: 'HEPES Buffer Salt (Biotech Grade)', docs: [] },
        ],
        icon: TestTube, image: '/applicaion_images/ Chemicals & Reagents/Biochemicals.jpg',
      }
    ]
  },
  {
    id: 'forensic-science',
    title: 'Forensic Science',
    shortTitle: 'Forensics',
    icon: Fingerprint,
    color: '#6366F1',
    bannerImage: null,
    image: '/applications/forensic_science.png',
    overview: 'Specialized forensic DNA, toxicology, and trace evidence solutions for law enforcement and legal laboratories.',
    workflows: [
      {
        title: 'Human Identification (HID)',
        description: 'STR profiling and genetic analysis platforms for forensic human identification.',
        extendedDescription: 'Validated HID workflows from DNA extraction through CE-based STR profiling, meeting CODIS and international database standards for criminal investigation and mass disaster identification.',
        keyFeatures: ['CODIS-compatible STR kits', 'Low-copy number (LCN) protocols', 'Mixture interpretation software', 'Chain-of-custody tracking'],
        relatedProducts: [
          { name: 'Forensic DNA Extraction Kit', docs: [] },
          { name: 'GlobalFiler STR Amplification Kit', docs: [] },
          {
            name: 'Genetic Analyzer (HID)',
            docs: [
              { text: 'Brochure: SeqStudio Flex for Human Identification', url: 'https://documents.thermofisher.com/TFS-Assets/GSD/brochures/seqstudio-flex-genetic-anlyzer-human-Identification-brochure.pdf' },
              { text: 'Poster: SeqStudio Flex Genetic Analyzers for Human Identification', url: 'https://documents.thermofisher.com/TFS-Assets/GSD/posters/SeqStudio-flex-dev-val-poster-2023.pdf' },
              { text: 'User Guide: SeqStudio Flex Series Genetic Analyzer', url: 'https://documents.thermofisher.com/TFS-Assets/LSG/manuals/100104689_SeqStudioFlex_v1_RUO_UG.pdf' },
            ],
          },
        ],
        icon: Fingerprint, image: '/applicaion_images/Forensic Science/Human Identification.jpg',
      },
      {
        title: 'Toxicology',
        description: 'LC-MS/MS and immunoassay platforms for drugs-of-abuse, poison, and toxin screening.',
        extendedDescription: 'More than 1600 unique compounds of interest to the food safety and environmental testing communities:\nCompound Class and Number of Compounds:\nPesticides: 698 compounds\nEmerging contaminants: 756 compounds\nVeterinary drugs: 108 compounds\nMycotoxins: 44 compounds\nPFCs: 21 compounds',
        keyFeatures: ['Multi-drug immunoassay panels', 'LC-MS/MS confirmation libraries', 'Hair, blood, urine matrices', 'SOFT/AAFS-compliant protocols'],
        relatedProducts: [
          { name: 'DOA Immunoassay Analyzer', docs: [] },
          {
            name: 'Toxicology LC-MS/MS System',
            docs: [
              { text: 'Brochure: HRAM MS/MS Spectral Libraries', url: 'https://documents.thermofisher.com/TFS-Assets/CMD/brochures/BR-64309-HRAM-MSMS-Spectral-Libraries-BR64309-EN.pdf' },
            ]
          },
          { name: 'Solid-Phase Extraction Plates', docs: [] },
        ],
        icon: Fingerprint, image: '/applicaion_images/Forensic Science/Toxicology.jpg',
      }
    ]
  },
  {
    id: 'agri-veterinary',
    title: 'Agri, Veterinary & Animal Health',
    shortTitle: 'Agri & Vet',
    icon: Leaf,
    color: '#84CC16',
    bannerImage: null,
    image: '/applications/agri_veterinary.png',
    overview: 'Agricultural testing, soil analysis, food safety, and veterinary residue detection instruments.',
    workflows: [
      {
        title: 'Pesticide & Residue Testing',
        description: 'GC-MS/MS and LC-MS/MS systems for multi-residue pesticide analysis in food and feed.',
        extendedDescription: 'Rapid and sensitive multi-residue pesticide screening workflows using QuEChERS extraction followed by GC-MS/MS or LC-MS/MS confirmation meeting EU MRL and Codex standards.',
        keyFeatures: ['QuEChERS-optimised workflows', '>500 compound screening panels', 'EU MRL-compliant reporting', 'Automated data processing'],
        relatedProducts: [
          { name: 'GC-MS/MS Triple Quadrupole', docs: [] },
          { name: 'QuEChERS Extraction Kits', docs: [] },
          { name: 'Pesticide Reference Standard Mix', docs: [] },
        ],
        icon: Leaf, image: '/applicaion_images/Agri, Veterinary & Animal Health/Pesticide.jpg',
      },
      {
        title: 'Soil & Water Analysis',
        description: 'ICP-OES, ion chromatography, and pH/nutrient analysers for soil and water quality monitoring.',
        extendedDescription: 'Comprehensive soil and water analytical instrumentation for measuring heavy metals, anions, cations, pH, and nutrient levels to support agronomic decision-making and regulatory compliance.',
        keyFeatures: ['ICP-OES multi-element analysis', 'Ion chromatography for anions', 'Portable field pH/EC meters', 'BOD/COD/TOC measurement'],
        relatedProducts: [
          { name: 'ICP-OES Spectrometer', docs: [] },
          { name: 'Ion Chromatography System', docs: [] },
          { name: 'Portable Multiparameter Meter', docs: [] },
        ],
        icon: Leaf, image: '/applicaion_images/Agri, Veterinary & Animal Health/Water Analysis.jpg',
      },
      {
        title: 'Mycotoxin & Allergen Testing',
        description: 'Lateral flow and ELISA kits for rapid mycotoxin, allergen, and adulterant detection.',
        extendedDescription: 'Rapid immunoassay platforms for aflatoxin, ochratoxin, deoxynivalolen, and major food allergen detection in grain, feed, and processed food matrices meeting FSSAI and Codex limits.',
        keyFeatures: ['Lateral flow quantitative readers', 'ELISA microplate formats', 'ppb-level sensitivity', 'FSSAI and Codex compliant'],
        relatedProducts: [
          { name: 'Mycotoxin Rapid Test Reader', docs: [] },
          { name: 'Aflatoxin ELISA Kit', docs: [] },
          { name: 'Allergen Detection Panel', docs: [] },
        ],
        icon: Leaf, image: '/applicaion_images/Agri, Veterinary & Animal Health/Allergen Testing.jpg',
      },
      {
        title: 'Animal Health Diagnostics',
        description: 'Veterinary diagnostic instruments, molecular assays, and rapid tests for production and companion animals.',
        extendedDescription: 'Comprehensive animal health solutions from molecular diagnostics to clinical pathology, supporting livestock management, poultry health, and companion animal diagnostics.',
        keyFeatures: ['USDA/OIE-validated diagnostic assays', 'Real-time PCR pathogen detection', 'High-sensitivity ELISA serology panels', 'Species-specific biochemistry testing'],
        relatedProducts: [
          {
            name: 'Veterinary Diagnostic Solutions',
            docs: [
              { text: 'Brochure: Animal Health Product Catalog', url: 'https://documents.thermofisher.com/TFS-Assets/GSD/brochures/animal-health-product-catalog-2026.pdf' },
              { text: 'Reference: Thermo Fisher Animal Health', url: 'https://www.thermofisher.com/in/en/home/industrial/animal-health.html?SID=fr-animal-main' }
            ]
          }
        ],
        icon: Leaf, image: '/applicaion_images/Agri, Veterinary & Animal Health/Animal Health Diagnostics.jpg',
      }
    ]
  },
  {
    id: 'point-of-care',
    title: 'Point of Care Solutions',
    shortTitle: 'Point of Care',
    icon: Droplets,
    color: '#F97316',
    bannerImage: null,
    image: '/applications/point_of_care.png',
    overview: 'Rapid, portable diagnostic platforms delivering lab-quality results in minutes at the bedside or clinic.',
    workflows: [
      {
        title: 'Molecular POC Testing',
        description: 'Rapid molecular (LAMP/PCR) platforms for infectious disease detection within 30 minutes.',
        extendedDescription: 'CLIA-waived portable molecular instruments delivering PCR-quality results for respiratory viruses, STIs, and sepsis markers in emergency departments, clinics, and remote settings.',
        keyFeatures: ['Results in under 30 minutes', 'CLIA-waived operation', 'Cartridge-based, no sample prep', 'Respiratory, GI, and STI panels'],
        relatedProducts: [
          { name: 'Portable Molecular POC Reader', docs: [] },
          { name: 'Respiratory Syndromic Panel', docs: [] },
          { name: 'STI Cartridge Panel', docs: [] },
        ],
        icon: Droplets, image: '/applicaion_images/Point of Care Solutions/Molecular POC Testing.jpg',
      },
      {
        title: 'Immunoassay & Lateral Flow',
        description: 'Rapid antigen and antibody tests for infectious disease, cardiac markers, and hormones.',
        extendedDescription: 'Quantitative lateral flow readers and multiplex immunoassay platforms for cardiac troponin, CRP, D-dimer, HbA1c, and infectious disease screening at the point of care.',
        keyFeatures: ['Quantitative reader-based results', 'Cardiac biomarker panels', '10-minute turnaround', 'Bluetooth data connectivity'],
        relatedProducts: [
          { name: 'Quantitative Rapid Test Reader', docs: [] },
          { name: 'Cardiac Panel Cartridge', docs: [] },
          { name: 'CRP/PCT Rapid Test Kit', docs: [] },
        ],
        icon: Droplets, image: '/applicaion_images/Point of Care Solutions/Immunoassay & Lateral Flow.jpg',
      },
      {
        title: 'Blood Glucose & HbA1c',
        description: 'POCT glucose monitors, HbA1c analyzers, and whole-blood metabolite systems.',
        extendedDescription: 'Handheld and desktop blood glucose and HbA1c monitoring systems for diabetes management in clinical and community health settings with connectivity to EMR systems.',
        keyFeatures: ['Fingerstick whole-blood analysis', 'NGSP-certified HbA1c method', 'EMR/LIS connectivity', 'QC data management software'],
        relatedProducts: [
          { name: 'Point-of-Care HbA1c Analyzer', docs: [] },
          { name: 'Blood Glucose Monitor (Clinical)', docs: [] },
          { name: 'Blood Gas & Electrolyte Analyzer', docs: [] },
        ],
        icon: Droplets, image: '/applicaion_images/Point of Care Solutions/Blood Glucose.jpg',
      },
      {
        title: 'Truenat & Molbio POC Solutions',
        description: 'Truenat real-time micro PCR, breast screening, ultraportable X-ray, and digital pathology solutions.',
        extendedDescription: 'State-of-the-art point-of-care diagnostics including Molbio\'s Truenat molecular platforms, iBreastExam screening, ProRad Atlas ultraportable X-ray, and OptraScan digital pathology.',
        keyFeatures: ['Truenat micro PCR assays for 40+ diseases', 'iBreastExam early breast cancer detection', 'ProRad Atlas ultraportable digital X-ray', 'OptraScan digital pathology & cloud storage'],
        relatedProducts: [
          {
            name: 'Truenat Real-Time Micro PCR',
            docs: [
              { text: 'Truenat Assays List', url: 'https://www.molbiodiagnostics.com/truenat-assays/' },
              { text: 'Brochure: Truenat Real-Time PCR Device', url: 'https://www.molbiodiagnostics.com/truenat/' }
            ]
          },
          {
            name: 'iBreastExam Breast Screening',
            docs: [
              { text: 'iBreastExam Details', url: 'https://www.molbiodiagnostics.com/ibreastexam/' }
            ]
          },
          {
            name: 'ProRad Atlas Ultraportable X-ray',
            docs: [
              { text: 'ProRad Atlas Details', url: 'https://www.molbiodiagnostics.com/prorad-atlas-ultraportable/' }
            ]
          },
          {
            name: 'OptraScan Digital Pathology',
            docs: [
              { text: 'OptraScan Solutions', url: 'https://www.molbiodiagnostics.com/optrascan-digital-pathology-solutions/' }
            ]
          }
        ],
        icon: Droplets, image: '/applicaion_images/update/Truenat & Molbio POC Solutions.png',
      }
    ]
  },
  {
    id: 'lab-equipment',
    title: 'Lab Equipment',
    shortTitle: 'Lab Equipment',
    icon: Box,
    color: '#64748B',
    bannerImage: null,
    image: '/applications/lab_equipment.png',
    overview: 'General and specialized laboratory instruments — centrifuges, incubators, sterilizers, and cold storage for every lab.',
    workflows: [
      {
        title: 'Centrifugation',
        description: 'Microcentrifuges, refrigerated centrifuges, and ultracentrifuges for sample processing.',
        extendedDescription: 'Comprehensive centrifugation portfolio from compact personal micro centrifuges to high-capacity floor-standing refrigerated units, supporting density gradient, cell harvesting, and preparative isolation.',
        keyFeatures: ['Up to 150,000 × g ultracentrifuge', 'Refrigerated (−20°C to +40°C) models', 'Swinging-bucket and fixed-angle rotors', 'Imbalance detection and auto-stop'],
        relatedProducts: [
          {
            name: 'Refrigerated Microcentrifuge',
            docs: [
              { text: 'Brochure: Thermo Scientific General Purpose Centrifuge', url: 'https://documents.thermofisher.com/TFS-Assets/LPD/brochures/TFSAssets_LPD_brochures_6410r11_ThermoFisher_GP-Pro-eBro.pdf' },
              { text: 'Brochure: Sorvall Legend Micro 17 and 21 Series', url: 'https://documents.thermofisher.com/TFS-Assets/LED/brochures/D17321.pdf' },
              { text: 'Application Note: Isolating Genomic DNA from Whole Blood', url: 'https://documents.thermofisher.com/TFS-Assets/LED/Application-Notes/D11063.pdf' },
              { text: 'Instructions for Use: Sorvall Legend Micro Series', url: 'https://documents.thermofisher.com/TFS-Assets/LED/manuals/50165185-e-Sorvall%20Legend%20Micro%20Series-en.pdf' },
            ],
          },
          { name: 'Floor-Standing Ultracentrifuge', docs: [] },
          { name: 'High-Capacity Centrifuge (6×1L)', docs: [] },
        ],
        icon: Box, image: '/applicaion_images/Lab Equipment/Centrifugation.jpg',
      },
      {
        title: 'Cold Chain & Storage',
        description: 'Ultra-low temperature freezers, laboratory refrigerators, and temperature-controlled storage.',
        extendedDescription: 'Thermo Scientific™ TDE -40°C ultra-low temperature freezer packages include one ULT freezer and two shelves of sliding drawer racks and boxes.\nPackage includes:\nOne Thermo Scientific TDE -40°C Ultra-Low temperature freezer\n2 shelves of sliding drawer racks with 2-inch cryoboxes and 100-count cell dividers. (see product specifications for details)',
        keyFeatures: ['TSX and TDE Series ULT freezers', 'Energy-efficient hydrocarbon refrigerants', 'Advanced microprocessor controls', 'AABB and FDA compliant cold storage'],
        relatedProducts: [
          {
            name: 'TDE Series -80°C ULT Freezer',
            docs: [
              { text: 'Brochure: TDE Series -80°C ULT Freezer', url: 'https://documents.thermofisher.com/TFS-Assets/LED/brochures/-40%20EU_TDE_1019%20Web.pdf' },
              { text: 'Flyer: Spectrum AABB Cold Storage Flyer', url: 'https://documents.thermofisher.com/TFS-Assets/LPD/Application-Notes/Spectrum-AABB-Cold-Storage-Flyer-FWR.pdf' },
            ]
          }
        ],
        icon: Box, image: '/applicaion_images/update/Cold Chain & Storage.jpg',
      },
      {
        title: 'Sterilization & Safety',
        description: 'Autoclaves, biosafety cabinets, and fume hoods ensuring laboratory safety and sterility.',
        extendedDescription: 'Laboratory sterilization and safety equipment including bench-top and floor-standing autoclaves, Class II biological safety cabinets, and chemical fume hoods meeting EN12469 standards.',
        keyFeatures: ['Gravity and vacuum cycle autoclaves', 'Class II Type A2 biosafety cabinets', 'HEPA filtered airflow systems', 'EN/NSF certified models'],
        relatedProducts: [
          { name: 'Bench-Top Autoclave (23L)', docs: [] },
          { name: 'Class II Biosafety Cabinet', docs: [] },
          { name: 'Chemical Fume Hood (1.2m)', docs: [] },
        ],
        icon: Box, image: '/applicaion_images/Lab Equipment/Sterilization.jpg',
      },
      {
        title: 'Biological Safety Cabinets',
        description: 'Class II biosafety cabinets providing operator, product, and environmental protection.',
        extendedDescription: 'Thermo Scientific biological safety cabinets designed to deliver exceptional protection from biological hazards while optimizing ergonomics, energy efficiency, and airflow control.',
        keyFeatures: ['Class II Type A2 airflow configuration', 'SmartClean window design for sanitization', 'Energy-efficient DC motors', 'Aerosol-tight containment chamber'],
        relatedProducts: [
          {
            name: 'Class II Biological Safety Cabinet',
            docs: [
              { text: 'Brochure: Thermo Scientific biological safety cabinets', url: 'https://documents.thermofisher.com/TFS-Assets/LED/brochures/D20817.pdf' }
            ]
          }
        ],
        icon: Box, image: '/applicaion_images/update/Biological Safety Cabinets.jpg',
      },
      {
        title: 'Water Purification Systems',
        description: 'Type 1 ultrapure and Type 2 pure water systems for sensitive lab applications.',
        extendedDescription: 'A variety of complete systems implementing state-of-the-art technologies to meet critical and everyday water purification needs.',
        keyFeatures: ['Barnstead Type 1 ultrapure water', 'Type 2 pure water distillation', 'Integrated UV and ultrafiltration', 'Real-time TOC monitoring'],
        relatedProducts: [
          {
            name: 'Barnstead Ultrapure Water System',
            docs: [
              { text: 'Brochure: Barnstead Water Purification Systems', url: 'https://documents.thermofisher.com/TFS-Assets/LED/brochures/BRWPOVERVIEW-FR-0413.pdf' },
            ]
          }
        ],
        icon: Box, image: '/applicaion_images/update/Water Purification Systems.jpg',
      },
      {
        title: 'Wireless Data Loggers',
        description: 'Smart wireless data logging systems for real-time laboratory temperature monitoring.',
        extendedDescription: 'Ensuring that the cold chain has been preserved, whether your products are in storage or in transit, just makes sense. Thermo Scientific™ Smart-Tracker™ makes temperature monitoring in the cold chain easy.',
        keyFeatures: ['Smart-Vue wireless data logging', 'Real-time SMS/Email alerts', '21 CFR Part 11 compliant data', 'Continuous cloud-based monitoring'],
        relatedProducts: [
          {
            name: 'Smart-Vue Wireless Client Data Logger',
            docs: [
            ]
          }
        ],
        icon: Box, image: '/applicaion_images/Lab Equipment/Wireless Data Loggers.jpg',
      }
    ]
  },
  {
    id: 'lab-consumables',
    title: 'Lab Consumables',
    shortTitle: 'Consumables',
    icon: Pill,
    color: '#EC4899',
    bannerImage: null,
    image: '/applications/lab_consumables.png',
    overview: 'High-purity plastic ware, pipette tips, tubes, plates, and PPE for daily laboratory operations.',
    workflows: [
      {
        title: 'Pipette Tips & Tubes',
        description: 'RNase/DNase-free filtered tips, microtubes, and PCR strips for molecular workflows.',
        extendedDescription: 'Ultra-clean, low-retention filtered and unfiltered pipette tips paired with microcentrifuge tubes, PCR strips, and cryovials manufactured under ISO Class 7 clean room conditions.',
        keyFeatures: ['RNase/DNase and pyrogen-free', 'Low-retention surface treatment', 'Universal tip compatibility', 'Lot-traceable QC documentation'],
        relatedProducts: [
          {
            name: 'Filtered Pipette Tips (10µL–1000µL)',
            docs: [
              { text: 'Brochure: Finnpipette F1 and Finnpipette F2', url: 'https://documents.thermofisher.com/TFS-Assets/LCD/brochures/Finnpipette-F1-and-Finnpipette-F2-brochure.pdf' },
              { text: 'Brochure: Finnpipette F1/F2 Novus Catalog', url: 'https://documents.thermofisher.com/TFS-Assets/LED/brochures/Finnpipette-F1-F2-Novus-catalog-2026.pdf' },
              { text: 'Application Note: Safe Pipetting Practices', url: 'https://documents.thermofisher.com/TFS-Assets/LSG/Application-Notes/D21336.pdf' },
              { text: 'Application Note: Improved Ergonomics Pipette Tip Selection', url: 'https://documents.thermofisher.com/TFS-Assets/LPD/Product-Information/Improved-ergonomics-pipette-tip-selection-AN-ERGPIPTIPS-EN.pdf' }
            ]
          },
          { name: 'Low-Binding Microcentrifuge Tubes', docs: [] },
          { name: 'PCR 8-Strip Tubes with Caps', docs: [] },
        ],
        icon: Pill, image: '/applicaion_images/update/Pipette Tips & Tubes.jpg',
      },
      {
        title: 'Microplates & Dishes',
        description: 'Cell culture plates, 96/384-well PCR plates, and ELISA plates for high-throughput assays.',
        extendedDescription: 'Full range of tissue culture treated, non-binding, and specialty microplates in standard SBS footprints compatible with liquid handlers and automated plate readers.',
        keyFeatures: ['TC-treated and ultra-low attachment', 'White, black, and clear well formats', 'Half-area and small-volume plates', 'Automation-compatible skirted plates'],
        relatedProducts: [
          {
            name: '96-Well PCR Plate (semi-skirted)',
            docs: [
              { text: 'Brochure: MicroAmp Plastics Compatibility Chart', url: 'https://documents.thermofisher.com/TFS-Assets/LSG/brochures/microamp-plastics-compatibility-chart.pdf' }
            ]
          },
          { name: '384-Well White Microplate', docs: [] },
          { name: '6-Well Cell Culture Plate', docs: [] },
        ],
        icon: Pill, image: '/applicaion_images/update/Microplates & Dishes.jpg',
      }
    ]
  },
  {
    id: 'liquid-handling-automation',
    title: 'Liquid Handling & Lab Automation',
    shortTitle: 'Liquid Handling',
    icon: Syringe,
    color: '#0EA5E9',
    bannerImage: null,
    image: '/applications/liquid_handling_automation.png',
    overview: 'Electronic pipettes, robotic liquid handlers, and workflow automation solutions reducing error and increasing throughput.',
    workflows: [
      {
        title: 'Electronic Pipettes',
        description: 'Ergonomic electronic and motorised multichannel pipettes for repetitive pipetting tasks.',
        extendedDescription: 'Bluetooth-enabled electronic pipettes with programmable mixing, dispensing, and dilution modes that reduce RSI risk and improve CV% in liquid transfers from 0.1µL to 10mL.',
        keyFeatures: ['Single and multichannel formats', 'CV < 0.5% at nominal volume', 'Bluetooth data logging', 'GLP-compliant calibration records'],
        relatedProducts: [
          { name: 'Electronic Single-Channel Pipette', docs: [] },
          { name: 'Electronic 12-Channel Pipette', docs: [] },
          { name: 'Pipette Calibration System', docs: [] },
        ],
        icon: Syringe, image: '/applicaion_images/update/Electronic Pipettes.jpg',
      },
      {
        title: 'Robotic Liquid Handlers',
        description: 'Automated 96/384-well pipetting robots for NGS sample prep, ELISA, and drug discovery.',
        extendedDescription: 'Flexible robotic workstations with 8 to 384-channel pipetting heads delivering sub-microliter accuracy for genomics sample preparation, compound management, and high-throughput screening.',
        keyFeatures: ['8–384 channel simultaneous transfer', 'Sub-µL accuracy and precision', 'Integrated labware gripper', 'Method programming software'],
        relatedProducts: [
          { name: '96-Channel Liquid Handling Robot', docs: [] },
          { name: 'Compact 8-Channel Workstation', docs: [] },
          { name: 'Automated Plate Sealer', docs: [] },
        ],
        icon: Syringe, image: '/applicaion_images/update/Robotic Liquid Handlers.jpg',
      },
      {
        title: 'Automated Dispensers & Washers',
        description: 'Microplate washers, reagent dispensers, and automated strip handlers for ELISA workflows.',
        extendedDescription: 'High-throughput reagent dispensing and plate washing systems ensuring uniform coating, blocking, and washing in ELISA, cell-based, and bead-based assay workflows.',
        keyFeatures: ['Adjustable dispense volume 1–2000µL', '96/384-well compatible manifolds', 'Vacuum and positive-pressure wash', 'Protocol storage and recall'],
        relatedProducts: [
          { name: 'Microplate Washer (96/384-well)', docs: [] },
          { name: 'Automated Reagent Dispenser', docs: [] },
          { name: 'Automated Plate Stacker', docs: [] },
        ],
        icon: Syringe, image: '/applicaion_images/update/Automated Dispensers & Washers.jpg',
      }
    ]
  },
  {
    id: 'lims-software',
    title: 'LIMS & Software',
    shortTitle: 'LIMS',
    icon: Monitor,
    color: '#7C3AED',
    bannerImage: null,
    image: '/applications/lims_software.png',
    overview: 'Laboratory information management systems, data management, and instrument connectivity software for modern labs.',
    workflows: [
      {
        title: 'Laboratory Information Management (LIMS)',
        description: 'Cloud and on-premise LIMS for sample tracking, test management, and result reporting.',
        extendedDescription: 'Scalable LIMS platforms managing the full sample lifecycle from accession to report, with integrated QC management, instrument interfacing, and 21 CFR Part 11 / GAMP 5 compliance.',
        keyFeatures: ['Full sample chain-of-custody', '21 CFR Part 11 compliant audit trail', 'Instrument bidirectional interfacing', 'Custom report and CoA generation'],
        relatedProducts: [
          { name: 'Cloud LIMS (SaaS)', docs: [] },
          { name: 'On-Premise Enterprise LIMS', docs: [] },
          { name: 'LIMS Implementation Service', docs: [] },
        ],
        icon: Monitor, image: '/applicaion_images/update/Laboratory Information Management (LIMS).jpg',
      },
      {
        title: 'Instrument Data Management',
        description: 'Chromatography data systems, spectroscopy software, and multi-instrument data platforms.',
        extendedDescription: 'Unified instrument data management platforms integrating chromatography (CDS), spectroscopy, and qPCR data into a single compliant repository with electronic signatures and version control.',
        keyFeatures: ['Multi-vendor instrument support', 'Electronic laboratory notebook (ELN)', 'Automated data review rules', 'Cloud backup and disaster recovery'],
        relatedProducts: [
          { name: 'Chromatography Data System', docs: [] },
          { name: 'Electronic Lab Notebook (ELN)', docs: [] },
          { name: 'Scientific Data Management Platform', docs: [] },
        ],
        icon: Monitor, image: '/applicaion_images/LIMS & Software/Instrument Data Management.jpg',
      },
      {
        title: 'Quality & Compliance Tools',
        description: 'QMS software, equipment qualification tools, and audit management systems.',
        extendedDescription: 'Integrated quality management software covering document control, CAPA, deviation management, equipment calibration scheduling, and supplier qualification for ISO 17025, ISO 15189, and GMP laboratories.',
        keyFeatures: ['Document and SOP control', 'CAPA and deviation tracking', 'Equipment calibration scheduler', 'ISO 17025 and GMP gap analysis'],
        relatedProducts: [
          { name: 'Quality Management System (QMS)', docs: [] },
          { name: 'Calibration Management Software', docs: [] },
          { name: 'Audit Preparation Toolkit', docs: [] },
        ],
        icon: Monitor, image: '/applicaion_images/update/Quality & Compliance Tools.jpg',
      }
    ]
  },
  {
    id: 'turnkey-lab-design',
    title: 'Turnkey Lab Design & Furniture',
    shortTitle: 'Lab Design',
    icon: Scale,
    color: '#D97706',
    bannerImage: null,
    image: '/applications/turnkey_lab_design.png',
    overview: 'End-to-end laboratory design, modular furniture, fume hoods, and validated turnkey lab setup services.',
    workflows: [
      {
        title: 'Laboratory Space Planning & Layout',
        description: 'Complete architectural space planning, traffic patterns, and workflow optimization. Ensuring safety, efficiency, and flexibility.',
        extendedDescription: 'Comprehensive space planning services to optimize traffic flow, prevent cross-contamination, and ensure proper equipment placement and clearances. We assist with designing safe, ergonomic, and future-proof floor plans.',
        keyFeatures: ['Needs assessment & space mapping', 'BIM 3D modeling and workflow analysis', 'Equipment layout planning', 'Future expansion flexibility planning'],
        relatedProducts: [
          {
            name: 'Lab Construction & Design Consultation',
            docs: [
            ]
          }
        ],
        icon: Scale, image: '/applicaion_images/Turnkey Lab Design & Furniture/Laboratory Space Planning & Layout.jpg',
      },
      {
        title: 'Utility & HVAC Connections',
        description: 'Design and specification of power, water, drainage, specialty gases, and ventilation infrastructure.',
        extendedDescription: 'Engineering specifications for complex utility routing, including stable electrical supplies, high-purity water piping, gas cylinder cabinets, and dedicated HVAC systems providing appropriate air change rates and pressure cascades.',
        keyFeatures: ['Electrical load calculation & backup', 'Pure water loop plumbing layout', 'Gas line manifold & safety valving', 'Dedicated exhaust and BSL containment HVAC'],
        relatedProducts: [
          { name: 'Specialty Gas Piping Layout', docs: [] },
          { name: 'Utility Interface Panels', docs: [] }
        ],
        icon: Scale, image: '/applicaion_images/update/Utility & HVAC Connections.jpg',
      },
      {
        title: 'Safety, Ergonomics & Surface Materials',
        description: 'Integration of eyewash stations, chemical storage, fire safety, and ergonomic workspaces.',
        extendedDescription: 'Design configurations incorporating emergency eyewash/shower stations, safety cabinets for flammable/corrosive storage, exhaust venting, and selection of chemical-resistant countertops (epoxy vs phenolic resin).',
        keyFeatures: ['ADA-compliant emergency eyewash/shower', 'Flammable/Corrosive gas cabinets', 'Chemical-resistant worktops', 'Ergonomic task chairs & benches'],
        relatedProducts: [
          { name: 'Emergency Eyewash & Shower Unit', docs: [] },
          { name: 'Epoxy Resin Countertop Bench', docs: [] }
        ],
        icon: Scale, image: '/applicaion_images/update/Safety, Ergonomics & Surface Materials.jpg',
      }
    ]
  },
  {
    id: 'service-management',
    title: 'Service Management',
    shortTitle: 'Services',
    icon: Settings,
    color: '#059669',
    bannerImage: null,
    image: '/applications/service_management.png',
    overview: 'Installation, qualification, calibration, preventive maintenance, and AMC services to keep your instruments operating at peak performance.',
    workflows: [
      {
        title: 'Installation & Qualification (IQ/OQ/PQ)',
        description: 'Validated instrument installation and operational qualification services for GMP and ISO labs.',
        extendedDescription: 'Factory and field-based IQ/OQ/PQ validation services ensuring instruments are installed correctly, operating within specification, and performing consistently in your specific laboratory environment and application.',
        keyFeatures: ['IQ, OQ, and PQ protocol execution', 'Deviation report and CAPA support', 'Electronic validation documentation', 'FDA/EU GMP compliant reports'],
        relatedProducts: [
          { name: 'IQ/OQ Validation Service', docs: [] },
          { name: 'PQ Performance Qualification', docs: [] },
          { name: 'Validation Documentation Package', docs: [] },
        ],
        icon: Settings, image: '/applicaion_images/update/Installation.jpg',
      },
      {
        title: 'Calibration & NABL Testing',
        description: 'Traceable calibration services for pipettes, balances, centrifuges, and temperature devices.',
        extendedDescription: 'ISO/IEC 17025 accredited calibration services providing traceable certificates for laboratory instruments, ensuring metrological compliance and supporting regulatory inspections and audits.',
        keyFeatures: ['NABL-accredited calibration', 'Pipette and balance calibration', 'Temperature device verification', 'On-site and in-lab options'],
        relatedProducts: [
          { name: 'Pipette Calibration Service', docs: [] },
          { name: 'Balance Calibration Certificate', docs: [] },
          { name: 'Temperature Logger Verification', docs: [] },
        ],
        icon: Settings, image: '/applicaion_images/update/Calibration & NABL Testing.jpg',
      },
      {
        title: 'Annual Maintenance Contracts (AMC)',
        description: 'Comprehensive preventive maintenance and emergency repair contracts for laboratory instruments.',
        extendedDescription: 'Flexible AMC packages covering scheduled preventive maintenance, parts replacement, emergency breakdown response, and application support to maximise instrument uptime and lifecycle value.',
        keyFeatures: ['Scheduled preventive maintenance visits', 'Priority emergency response (4–24hr)', 'Genuine OEM parts included', 'Application and method support'],
        relatedProducts: [
          { name: 'Comprehensive AMC Package', docs: [] },
          { name: 'Preventive Maintenance Service', docs: [] },
          { name: 'Emergency Repair Contract', docs: [] },
        ],
        icon: Settings, image: '/applicaion_images/update/Annual Maintenance Contracts (AMC).jpg',
      }
    ]
  }
];
