import {
  FlaskConical, Microscope, TestTube, HeartPulse, Droplets,
  Leaf, Bug, Settings, Box, Scale, Dna, ShieldCheck,
  Syringe, Pill, Eye, Monitor, Thermometer, Cpu, Beaker,
  BarChart3, Pipette, HardDrive, Building2
} from 'lucide-react';

export const productsData = [
  /* ─────────────────────────────────────────────────────────────
     1. PCR (PowerFlex Thermal Cycler)
     Source: PCR.docx
  ───────────────────────────────────────────────────────────── */
  {
    id: 'pcr',
    title: 'PCR — Thermal Cyclers',
    shortTitle: 'PCR',
    icon: Dna,
    color: '#3B82F6',
    image: '/PowerFlexThermalCycler.png',
    overview: 'PowerFlex and MiniAmp thermal cyclers for end-point PCR, gradient optimisation, and high-throughput amplification workflows.',
    relatedApplications: ['molecular-diagnostics', 'forensic-science', 'cell-gene-therapy'],
    families: [
      {
        id: 'powerflex-thermal-cycler',
        name: 'PowerFlex Thermal Cycler',
        tagline: 'Flexible blocks, fast ramp rates, intuitive touchscreen',
        description: 'The Applied Biosystems PowerFlex thermal cycler offers interchangeable block modules, rapid ramp rates, and an intuitive 7-inch colour touchscreen for effortless PCR setup and monitoring.',
        extendedDescription: 'PowerFlex supports 96-well, 384-well, and dual 48-well block configurations. With VeriFlex zone technology, users can run up to six independent temperature zones in a single experiment, enabling gradient-free optimisation and multi-assay capability on one instrument.',
        image: '/PowerFlexThermalCycler.png',
        keyFeatures: ['VeriFlex 6-zone technology', 'Interchangeable block modules (96, 384, dual 48)', '7-inch colour touchscreen', 'Up to 5 °C/s ramp rate', 'MicroAmp plastic consumable compatible'],
        relatedApplications: ['molecular-diagnostics', 'forensic-science'],
                documents: [
          {
            header: 'Product Information',
            links: [
              {
                text: 'User Guide: PowerFlex Thermal Cycler (Chinese)',
                url: 'https://documents.thermofisher.com/TFS-Assets/LSG/manuals/MAN1001717-PowerFlexPCRSystem-UG-zh-CN.pdf'
              },
              {
                text: 'User Guide: PowerFlex Thermal Cycler Installation, Use, and Maintenance',
                url: 'https://documents.thermofisher.com/TFS-Assets/LSG/manuals/MAN1001717-PowerFlexPCRSystem-UG.pdf'
              }
            ]
          },
          {
            header: 'Scientific Resources',
            links: [
              {
                text: 'Brochure: Thermal Cyclers - Key Thermal Cycling Concepts and Ramp Rates',
                url: 'https://documents.thermofisher.com/TFS-Assets/LSG/brochures/Thermal_Cycler_Ramp_RatesAppNote.pdf'
              },
              {
                text: 'Application Note: VeriFlex Temperature Control Technology for Thermal Cycling',
                url: 'https://documents.thermofisher.com/TFS-Assets/LSG/brochures/veriflex-temperature-control-application-note.pdf'
              }
            ]
          }
        ],
models: [
          {
            id: 'powerflex-96',
            name: 'PowerFlex 96-Well System',
            tier: 'Premium',
            specs: { 'Catalog Number': 'A40008063', 'Block Format': '96-well (0.2 mL)', 'Ramp Rate': 'Up to 5 °C/s', 'Temperature Range': '0–100 °C', 'Uniformity': '±0.2 °C', 'Display': '7-inch colour touch' },
            keyFeatures: ['VeriFlex 6-zone gradient', 'Fast and Standard ramp protocols', 'USB data export', 'Compact benchtop footprint'],
            relatedProducts: ['PowerFlex 96-Well Base Unit', 'MicroAmp Fast 96-Well Plates', 'MicroAmp Optical Adhesive Film'],
          },
          {
            id: 'powerflex-384',
            name: 'PowerFlex 384-Well System',
            tier: 'Advanced',
            specs: { 'Catalog Number': 'A40008063', 'Block Format': '384-well', 'Ramp Rate': 'Up to 4 °C/s', 'Temperature Range': '0–100 °C', 'Uniformity': '±0.3 °C', 'Display': '7-inch colour touch' },
            keyFeatures: ['High-throughput 384-well block', 'Gradient optimisation', 'Cloud connectivity option', 'Energy-saving idle mode'],
            relatedProducts: ['PowerFlex 384-Well Block Module', 'MicroAmp 384-Well Plates', 'PowerFlex Dust Cover'],
          },
        ],
      },
      {
        id: 'miniamp-thermal-cycler',
        name: 'MiniAmp Plus Thermal Cycler',
        tagline: 'Compact, reliable end-point PCR for every lab',
        description: 'The MiniAmp Plus thermal cycler delivers consistent PCR performance in a small, energy-efficient footprint ideal for teaching labs, small research groups, and shared instrument spaces.',
        extendedDescription: 'With a fixed 96-well block, rapid ramp rates, and a user-friendly interface, MiniAmp Plus enables reliable PCR without the complexity of advanced systems while supporting both standard and fast cycling protocols.',
        image: '/MiniAmpPlusThermalCycler.png',
        keyFeatures: ['Compact lightweight design', '96-well 0.2 mL block', 'VeriFlex technology', 'Energy-efficient operation', 'Quiet thermal management'],
        relatedApplications: ['molecular-diagnostics'],
                documents: [
          {
            header: 'Product Information',
            links: [
              {
                text: 'User Guide: MiniAmp and MiniAmp Plus Thermal Cycler - Installation, Use and Maintenance',
                url: 'https://documents.thermofisher.com/TFS-Assets/LSG/manuals/MAN0017492_miniamp_miniampplus_UG.pdf'
              },
              {
                text: 'Quick Reference: MiniAmp Thermal Cycler and MiniAmp Plus Thermal Cycler - Installation and Operation',
                url: 'https://documents.thermofisher.com/TFS-Assets/LSG/manuals/100070430_miniamp_miniampplus_QR.pdf'
              },
              {
                text: 'User Guide: PCR Starter Kit for MiniAmp and MiniAmp Plus PCR Systems',
                url: 'https://documents.thermofisher.com/TFS-Assets/LSG/manuals/100070431_miniamp_miniampplus_starter_kit_UG.pdf'
              }
            ]
          },
          {
            header: 'Scientific Resources',
            links: [
              {
                text: 'Flyer: Services and support for the MiniAmp thermal cyclers',
                url: 'https://documents.thermofisher.com/TFS-Assets/LSG/Flyers/miniamp-global-service-plans-flyer.pdf'
              },
              {
                text: 'Flyer: Routine PCR, elevated. Introducing MiniAmp Plus and MiniAmp Thermal Cyclers.',
                url: 'https://documents.thermofisher.com/TFS-Assets/BID/Flyers/routine-pcr-elevated-miniamp-thermal-cyclers-flyer.pdf'
              },
              {
                text: 'Specification Sheet: MiniAmp Thermal Cyclers',
                url: 'https://documents.thermofisher.com/TFS-Assets/BID/Reference-Materials/miniamp-thermal-cyclers-specification-sheet.pdf'
              }
            ]
          }
        ],
models: [
          {
            id: 'miniamp-plus',
            name: 'MiniAmp Plus Thermal Cycler',
            tier: 'Standard',
            specs: { 'Catalog Number': 'A37834', 'Block Format': '96-well (0.2 mL)', 'Ramp Rate': 'Up to 3 °C/s', 'Temperature Range': '4–99 °C', 'Uniformity': '±0.5 °C', 'Weight': '<5 kg' },
            keyFeatures: ['VeriFlex zone support', 'Simple protocol programming', 'USB connectivity', 'Low power consumption'],
            relatedProducts: ['MiniAmp Plus System', 'MicroAmp Reaction Tubes', 'MicroAmp 8-Strip Tubes'],
          },
        ],
      },
    ],
  },

  /* ─────────────────────────────────────────────────────────────
     2. Real-Time PCR (QuantStudio Systems)
     Source: Realtime PCR.docx
  ───────────────────────────────────────────────────────────── */
  {
    id: 'realtime-pcr',
    title: 'Real-Time PCR Systems',
    shortTitle: 'qPCR',
    icon: BarChart3,
    color: '#8B5CF6',
    image: '/QuantStudio.png',
    overview: 'QuantStudio real-time PCR systems for gene expression analysis, genotyping, pathogen detection, and high-resolution melt analysis.',
    relatedApplications: ['molecular-diagnostics', 'cell-biology', 'forensic-science'],
    families: [
      {
        id: 'quantstudio-family',
        name: 'QuantStudio Real-Time PCR Systems',
        tagline: 'From routine qPCR to high-throughput multiplexing',
        description: 'The QuantStudio family of real-time PCR systems — QuantStudio 3, 5, 6 Flex, and 7 Flex — provides scalable solutions from 96-well entry-level to 384-well high-throughput platforms with advanced multiplexing.',
        extendedDescription: 'Featuring OptiFlex optical systems with up to 6 filter sets, TaqMan and SYBR Green chemistry support, and cloud-connected Design & Analysis software, QuantStudio instruments deliver precise quantitation for gene expression, SNP genotyping, and pathogen detection workflows.',
        image: '/QuantStudio.png',
        keyFeatures: ['OptiFlex optics with up to 6 channels', 'TaqMan and SYBR Green compatible', 'Cloud Connect remote monitoring', 'Fast 40-minute cycling protocols', 'Design & Analysis v2 software'],
        relatedApplications: ['molecular-diagnostics', 'cell-biology'],
                documents: [
          {
            header: 'Product Information',
            links: [
              {
                text: 'User Guide: SAE Administrator Console v2.1 - for use with QuantStudio 5 Real-Time PCR System with QuantStudio Design and Analysis Desktop Software',
                url: 'https://documents.thermofisher.com/TFS-Assets/LSG/manuals/MAN0028414-SAEAdminConsole2.1-UG-RUO-EN.pdf'
              },
              {
                text: 'Networking Quick Reference: QuantStudio 3 and 5 Real-Time PCR Systems',
                url: 'https://documents.thermofisher.com/TFS-Assets/LSG/manuals/MAN0026035-QS35Networking-QR.pdf'
              },
              {
                text: 'User Guide: QuantStudio 3 and 5 Real-Time PCR Systems - Installation, Use, and Maintenance',
                url: 'https://documents.thermofisher.com/TFS-Assets/LSG/manuals/MAN0010407_QuantStudio3_5_InstallUseMaint_UG.pdf'
              },
              {
                text: 'Site Preparation Guide: QuantStudio 3 and 5 Real-Time PCR Systems',
                url: 'https://documents.thermofisher.com/TFS-Assets/LSG/manuals/MAN0010405_QuantStudio_3_5_Sys_SPG.pdf'
              },
              {
                text: 'QS_3&5_AQ_QR_ZH',
                url: 'https://documents.thermofisher.com/TFS-Assets/GSD/manuals/QS_3%265_AQ_QR_ZH.pdf'
              },
              {
                text: 'User Guide: QuantStudio Design and Analysis Desktop Software',
                url: 'https://documents.thermofisher.com/TFS-Assets/LSG/manuals/MAN0010408_QuantStudioDesign_Analysis_Desktop_Software_UG.pdf'
              },
              {
                text: 'IT Checklist: QuantStudio 3 and 5 Real-Time PCR Systems',
                url: 'https://documents.thermofisher.com/TFS-Assets/LSG/manuals/MAN0013738_QuantStudio_3_5_RealTimePCRSys_IT_Checklist.pdf'
              },
              {
                text: 'User Guide: QuantStudio 3 and 5 Real-Time PCR Systems - Installation, Use and Maintenance',
                url: 'https://documents.thermofisher.com/TFS-Assets/LSG/manuals/MAN0010407_QuantStudio_3_5_InstallUseMaint_UG.pdf'
              },
              {
                text: 'Site Prep Guide: QuantStudio 3 and 5 Real-Time PCR Systems',
                url: 'https://documents.thermofisher.com/TFS-Assets/LSG/manuals/MAN0010405_QuantStudioSys_SPG.pdf'
              },
              {
                text: 'User Bulletin: How to Use MicroAmp Reaction Plates, Tube Strips, and Tubes',
                url: 'https://documents.thermofisher.com/TFS-Assets/LSG/manuals/100033471_MicroAmpReactionPlates_TubeStrips_Tubes_UB.pdf'
              }
            ]
          },
          {
            header: 'Application Notes',
            links: [
              {
                text: 'Brochure: QuantStudio 3 and 5 Real-Time PCR Systems',
                url: 'https://documents.thermofisher.com/TFS-Assets/LSG/Application-Notes/quantstudio-3-and-5-real-time-pcr-systems.pdf'
              },
              {
                text: 'Application Note: Protein Thermal Shift Technology',
                url: 'https://documents.thermofisher.com/TFS-Assets/LSG/Application-Notes/protein-thermal-shift-app-note.pdf'
              },
              {
                text: 'Application Notes & Tutorials: High Resolution Melting for Genotyping Applications (English)',
                url: 'https://documents.thermofisher.com/TFS-Assets/LSG/Application-Notes/cms_070383.pdf'
              }
            ]
          },
          {
            header: 'Brochures',
            links: [
              {
                text: 'Brochure: QuantStudio 3/5 Real-Time PCR System (Japanese)',
                url: 'https://documents.thermofisher.com/TFS-Assets/GSD/brochures/quantstudio-3-5-real-time-pcr-system-pb-12-ja.pdf'
              },
              {
                text: 'Brochure: qPCR for who you are—QuantStudio real-time PCR and digital PCR systems',
                url: 'https://documents.thermofisher.com/TFS-Assets/LSG/brochures/quantstudio-real-time-pcr-system-family-brochure.pdf'
              }
            ]
          }
        ],
models: [
          {
            id: 'quantstudio-3',
            name: 'QuantStudio 3 System',
            tier: 'Standard',
            specs: { 'Catalog Number': 'A28132', 'Well Format': '96-well', 'Channels': '4 filter sets', 'Run Time': '<40 min (fast mode)', 'Dynamic Range': '10 orders of magnitude', 'Software': 'Design & Analysis v2' },
            keyFeatures: ['Affordable entry-level qPCR', '4-colour multiplexing', 'Touchscreen interface', 'Compact footprint'],
            relatedProducts: ['QuantStudio 3 System', 'TaqMan Fast Advanced Master Mix', 'Fast 96-Well Plates'],
          },
          {
            id: 'quantstudio-5',
            name: 'QuantStudio 5 System',
            tier: 'Advanced',
            specs: { 'Catalog Number': '7161533', 'Well Format': '96-well (0.1 or 0.2 mL)', 'Channels': '5 filter sets', 'Uniformity': '±0.2 °C', 'Run Time': '<45 min (standard)', 'Connectivity': 'Cloud Connect' },
            keyFeatures: ['5-colour multiplexing', 'Optimised for TaqMan arrays', 'Cloud-based data analysis', 'Remote run monitoring'],
            relatedProducts: ['QuantStudio 5 System', 'TaqMan Universal Master Mix II', 'TaqMan Gene Expression Assays'],
          },
          {
            id: 'quantstudio-6-flex',
            name: 'QuantStudio 6 Flex System',
            tier: 'Premium',
            specs: { 'Catalog Number': '4485694', 'Well Formats': '96-well, 384-well, TaqMan Array Cards', 'Channels': '6 filter sets', 'Blocks': 'Interchangeable', 'HRM': 'High-resolution melt', 'Software': 'Design & Analysis v2 + HRM' },
            keyFeatures: ['Interchangeable block system', '6-dye multiplexing', 'HRM genotyping', 'TaqMan Array Card support'],
            relatedProducts: ['QuantStudio 6 Flex', 'TaqMan Array Cards', 'MeltDoctor HRM Reagent'],
          },
          {
            id: 'quantstudio-7-flex',
            name: 'QuantStudio 7 Flex System',
            tier: 'Premium',
            specs: { 'Catalog Number': '4485701', 'Well Format': '384-well', 'Channels': '6 filter sets', 'Throughput': '4 × 384-well plates/day', 'Uniformity': '±0.1 °C', 'Automation': 'Robotic plate loading' },
            keyFeatures: ['High-throughput 384-well', 'Industry-leading uniformity', 'OpenArray compatibility', 'LIMS integration'],
            relatedProducts: ['QuantStudio 7 Flex System', '384-Well Fast Reaction Plates', 'OpenArray Accessories'],
          },
        ],
      },
    ],
  },

  /* ─────────────────────────────────────────────────────────────
     3. NGS (Genexus, Ion GeneStudio)
     Source: NGS.docx
  ───────────────────────────────────────────────────────────── */
  {
    id: 'ngs',
    title: 'Next-Generation Sequencing',
    shortTitle: 'NGS',
    icon: Cpu,
    color: '#EC4899',
    image: '/Genexus.png',
    overview: 'Genexus Integrated Sequencer and Ion GeneStudio S5 systems for targeted and comprehensive NGS testing in oncology, infectious disease, and research.',
    relatedApplications: ['molecular-diagnostics', 'cell-gene-therapy', 'forensic-science'],
    families: [
      {
        id: 'genexus-system',
        name: 'Genexus Integrated Sequencer',
        tagline: 'Sample to results in a single day — fully automated',
        description: 'The Ion Torrent Genexus System automates library preparation, templating, sequencing, and data analysis in a single integrated workflow, delivering targeted NGS results from tissue, liquid biopsy, and FFPE samples.',
        extendedDescription: 'Genexus enables same-day actionable results with Oncomine assay panels for solid tumours, haematological malignancies, and pan-cancer profiling. The walk-away workflow minimises hands-on time and reduces technical errors.',
        image: '/Genexus.png',
        keyFeatures: ['Fully automated sample-to-report', 'Oncomine assay panel library', 'Same-day results', 'Liquid biopsy compatible', 'Integrated Ion Reporter analysis'],
        relatedApplications: ['molecular-diagnostics', 'cell-gene-therapy'],
                documents: [
          {
            header: 'Product Information',
            links: [
              {
                text: 'User Guide: Genexus Software 7.0',
                url: 'https://documents.thermofisher.com/TFS-Assets/LSG/manuals/MAN0029327-GenexusSoftware7.0-UG.pdf'
              },
              {
                text: 'Product Information Sheet: Genexus Software 7.0.2.0 Bill of Material',
                url: 'https://documents.thermofisher.com/TFS-Assets/LSG/manuals/MAN1002097-GenexusSoftware7.0.2.0BillofMaterial-PI.pdf'
              },
              {
                text: 'Release Notes: Genexus Software 7.0',
                url: 'https://documents.thermofisher.com/TFS-Assets/LSG/manuals/MAN0029330-GXSW7-0-RN-EN.pdf'
              },
              {
                text: 'User Guide: Genexus Integrated Sequencer',
                url: 'https://documents.thermofisher.com/TFS-Assets/LSG/manuals/MAN0017910_GenexusIntegratedSequencer_UG.pdf'
              },
              {
                text: 'User Guide: Ion AmpliSeq & Ion AmpliSeq HD Custom Assay',
                url: 'https://documents.thermofisher.com/TFS-Assets/LSG/manuals/MAN0028005-AmpliSeqCustomAssayGX-UG.pdf'
              },
              {
                text: 'User Guide: Genexus Deep Clean Kit',
                url: 'https://documents.thermofisher.com/TFS-Assets/LSG/manuals/MAN1000882-GenexusDeepCleanKit-UG.pdf'
              },
              {
                text: 'Site Prep Guide: Genexus Integrated Sequencer',
                url: 'https://documents.thermofisher.com/TFS-Assets/LSG/manuals/MAN0017918_GenexusIntegratedSequencer_SPG.pdf'
              },
              {
                text: 'Product Information Sheet: Genexus Primer Pool Tube Holder',
                url: 'https://documents.thermofisher.com/TFS-Assets/LSG/manuals/MAN1001399-GXPrimerPoolTubeHolder-PI.pdf'
              },
              {
                text: 'User Bulletin: Ion AmpliSeq Custom Assays - Activation and denaturation temps in PCR',
                url: 'https://documents.thermofisher.com/TFS-Assets/LSG/manuals/MAN0030213-AmpliseqCustomAssayTemps-GX6-8-UB.pdf'
              },
              {
                text: 'Quick Reference: Genexus Integrated Sequencer',
                url: 'https://documents.thermofisher.com/TFS-Assets/LSG/manuals/MAN0017912_GenexusIntegratedSequencer_QR.pdf'
              }
            ]
          },
          {
            header: 'Brochures',
            links: [
              {
                text: 'Brochure: Targeted NGS Applications',
                url: 'https://documents.thermofisher.com/TFS-Assets/CSD/brochures/ngs-applications-brochure.pdf'
              },
              {
                text: 'Brochure: The Genexus System: An end-to-end NGS platform to automate your workflow (Japanese)',
                url: 'https://documents.thermofisher.com/TFS-Assets/CSD/brochures/genexus-system-end-to-end-brochure-ja.pdf'
              },
              {
                text: 'Brochure: Ion Torrent Genexus System',
                url: 'https://documents.thermofisher.com/TFS-Assets/CSD/brochures/ion-torrent-genexus-system-brochure.pdf'
              },
              {
                text: 'Brochure: Genexus Integrated NGS System (Japanese)',
                url: 'https://documents.thermofisher.com/TFS-Assets/LSG/brochures/genexus-purfication-and-sequencing-system-brochure-ja.pdf'
              },
              {
                text: 'Advances in epidemiological research using next-generation sequencing e-book',
                url: 'https://documents.thermofisher.com/TFS-Assets/CSD/brochures/Advances-epidemiological-research-next-generation-sequencing-ebook.pdf'
              }
            ]
          },
          {
            header: 'Flyers',
            links: [
              {
                text: 'Flyer: The Genexus System—the future of NGS is here',
                url: 'https://documents.thermofisher.com/TFS-Assets/CSD/Flyers/genexus-e2e-statement-flyer.pdf'
              },
              {
                text: 'Flyer: Sharpen your focus with Ion Torrent next-generation sequencing solutions',
                url: 'https://documents.thermofisher.com/TFS-Assets/CSD/Flyers/genexus-genestudio-flyer.pdf'
              },
              {
                text: 'Flyer: The future of NGS is here infographic',
                url: 'https://documents.thermofisher.com/TFS-Assets/CSD/Flyers/genexus-workflow-infographic.pdf'
              },
              {
                text: 'Flyer: Services & Support for Genexus Integrated Sequencer',
                url: 'https://documents.thermofisher.com/TFS-Assets/CSD/Flyers/genexus-services-support-flyer.pdf'
              }
            ]
          },
          {
            header: 'Application Notes',
            links: [
              {
                text: 'Application Note: Rapid, automated NGS solution to survey the complete SARS-CoV-2 genome for epidemiological investigation',
                url: 'https://documents.thermofisher.com/TFS-Assets/CSD/Application-Notes/rapid-automated-sars-cov-2-workflow-genexus-app-note.pdf'
              },
              {
                text: 'Application Note: Identification of relevant genetic variants in hereditary cancer research samples',
                url: 'https://documents.thermofisher.com/TFS-Assets/CSD/Application-Notes/hereditary-cancer-research-using-ngs-genexus-integrated-sequencer-appnote.pdf'
              }
            ]
          },
          {
            header: 'Posters',
            links: [
              {
                text: 'Poster: Rapid and Accurate Variant Calling of FFPE Samples with the Genexus System',
                url: 'https://documents.thermofisher.com/TFS-Assets/CSD/posters/AACR_2021_2282_AccurateVariantCallingGenexus_poster.pdf'
              }
            ]
          },
          {
            header: 'Technical Notes',
            links: [
              {
                text: 'Technical Note: Comparison of hands-on time in next-generation sequencing workflows for the Ion Torrent Genexus Integrated Sequencer and the Illumina MiSeq System',
                url: 'https://documents.thermofisher.com/TFS-Assets/CSD/Technical-Notes/ngs-workflow-comparison-genexus-miseq-technote.pdf'
              }
            ]
          }
        ],
models: [
          {
            id: 'genexus-instrument',
            name: 'Genexus Integrated Sequencer',
            tier: 'Premium',
            specs: { 'Catalog Number': 'A40221', 'Automation': 'Full (library prep → analysis)', 'Assay Panels': 'Oncomine Precision Assay', 'Sample Types': 'FFPE, blood, liquid biopsy', 'Turnaround': '<24 hours', 'Software': 'Ion Reporter + Genexus Software' },
            keyFeatures: ['Walk-away automation', 'Integrated chip loading', 'Real-time run monitoring', 'CE-IVD marking (select assays)'],
            relatedProducts: ['Genexus Integrated Sequencer', 'Oncomine Precision Assay', 'Genexus Purification Instrument'],
          },
        ],
      },
      {
        id: 'genestudio-s5',
        name: 'Ion GeneStudio S5 System',
        tagline: 'Scalable semiconductor sequencing for every lab',
        description: 'The Ion GeneStudio S5 Series leverages semiconductor sequencing technology to deliver rapid, cost-effective NGS for targeted panels, exome sequencing, and transcriptome analysis.',
        extendedDescription: 'Available in S5, S5 Plus, and S5 Prime configurations, the GeneStudio platform scales from small targeted panels on Ion 510 chips to comprehensive exome-level sequencing on Ion 550 chips with consistent turnaround times.',
        image: '/IonGeneStudioS5.png',
        keyFeatures: ['Semiconductor sequencing technology', 'Scalable chip formats (510, 520, 530, 540, 550)', 'Ion Chef automated templating', '2–4 hour run times', 'Torrent Suite analysis software'],
        relatedApplications: ['molecular-diagnostics'],
                documents: [
          {
            header: 'General Documents',
            links: [
              {
                text: 'User Guide: Ion 540 Kit - Chef - Instructions for automated template preparation, chip loading, and sequencing',
                url: 'https://documents.thermofisher.com/TFS-Assets/LSG/manuals/MAN0010851_Ion_540_Kit_Chef_UG.pdf'
              },
              {
                text: 'User Guide: Ion GeneStudio S5 Instrument',
                url: 'https://documents.thermofisher.com/TFS-Assets/LSG/manuals/MAN0017528_Ion_GeneStudio_S5_Instrument_UG.pdf'
              },
              {
                text: 'User Guide: Ion 510 and Ion 520 and Ion 530 Kit - Chef - Instructions for automated template preparation, chip loading, and sequencing',
                url: 'https://documents.thermofisher.com/TFS-Assets/LSG/manuals/MAN0016854_510_520_530_Kit_Chef_UG.pdf'
              },
              {
                text: 'Site Prep Guide: Ion GeneStudio S5 Instrument',
                url: 'https://documents.thermofisher.com/TFS-Assets/LSG/manuals/MAN0017529_Ion_GeneStudio_S5_SPG.pdf'
              },
              {
                text: 'User Guide: Ion ReproSeq PGS Kits − Ion S5 and Ion GeneStudio S5 Systems',
                url: 'https://documents.thermofisher.com/TFS-Assets/LSG/manuals/MAN0016712_IonReproSeqPGS_S5_UG.pdf'
              },
              {
                text: 'Quick Reference: Ion ReproSeq PGS Kits - Ion S5 and Ion GeneStudio S5 Systems',
                url: 'https://documents.thermofisher.com/TFS-Assets/LSG/manuals/MAN0016713_IonReproSeqPGS_S5_QR.pdf'
              },
              {
                text: 'Quick Reference: Ion 510 and Ion 520 and Ion 530 Kit – Chef',
                url: 'https://documents.thermofisher.com/TFS-Assets/LSG/manuals/MAN0016855_510_520_530_Kit_Chef_QR.pdf'
              },
              {
                text: 'Quick Reference: Ion 540 Kit - Chef',
                url: 'https://documents.thermofisher.com/TFS-Assets/LSG/manuals/MAN0014119_Ion_540_Kit_Chef_QR.pdf'
              },
              {
                text: 'Quick Reference: Ion 520 and Ion 530 ExT Kit - Chef',
                url: 'https://documents.thermofisher.com/TFS-Assets/LSG/manuals/MAN0015806_Ion520_530ExTKit_QR.pdf'
              },
              {
                text: 'User Guide: Ion 520 and Ion 530 ExT Kit - Chef',
                url: 'https://documents.thermofisher.com/TFS-Assets/LSG/manuals/MAN0015805_Ion520_530ExTKit_UG.pdf'
              }
            ]
          },
          {
            header: 'Scientific Resources → Flyers',
            links: [
              {
                text: 'Flyer: Ion AmpliSeq panels for focused clinical NGS research',
                url: 'https://documents.thermofisher.com/TFS-Assets/CSD/Flyers/flyer-ampliseq-ampliseq-hd.pdf'
              },
              {
                text: 'Flyer: Sharpen your focus with Ion Torrent next-generation sequencing solutions',
                url: 'https://documents.thermofisher.com/TFS-Assets/CSD/Flyers/genexus-genestudio-flyer.pdf'
              },
              {
                text: 'Flyer: Service and support for the Ion GeneStudio S5 Series',
                url: 'https://documents.thermofisher.com/TFS-Assets/CSD/Flyers/genestudio-global-service-plans-flyer.pdf'
              },
              {
                text: 'Ion GeneStudio S5 シリーズ製品カタログ',
                url: 'https://documents.thermofisher.com/TFS-Assets/CSD/Flyers/ion-genestudio-s5-series-flyer-ja.pdf'
              },
              {
                text: 'Flyer: Ion GeneStudio S5 Series',
                url: 'https://documents.thermofisher.com/TFS-Assets/CSD/Flyers/ion-genestudio-s5-series-flyer.pdf'
              }
            ]
          },
          {
            header: 'Scientific Resources → Brochures',
            links: [
              {
                text: 'Brochure: Targeted NGS Applications',
                url: 'https://documents.thermofisher.com/TFS-Assets/CSD/brochures/ngs-applications-brochure.pdf'
              },
              {
                text: 'Brochure: Ion GeneStudio S5 Series Systems',
                url: 'https://documents.thermofisher.com/TFS-Assets/CSD/brochures/ion-genestudio-s5-ngs-system-brochure.pdf'
              }
            ]
          },
          {
            header: 'Scientific Resources → Posters',
            links: [
              {
                text: 'Poster: TEG-seq - An Ion Torrent-adapted NGS workflow for in cellulo mapping of CRISPR specificity',
                url: 'https://documents.thermofisher.com/TFS-Assets/BID/posters/teg-seq-ion-torrent-adapted-ngs-mapping-crispr-specificity-poster.pdf'
              },
              {
                text: 'Poster: Science is beautifully complex; Mastering your sequence can be simple',
                url: 'https://documents.thermofisher.com/TFS-Assets/GSD/posters/ngs-ce-sequencing-poster.pdf'
              }
            ]
          },
          {
            header: 'Scientific Resources → Application Notes',
            links: [
              {
                text: 'Product Selection Guide: Ion GeneStudio S5 Systems',
                url: 'https://documents.thermofisher.com/TFS-Assets/LSG/Application-Notes/Ion-S5-S5XL-Product-Selection-Guide.pdf'
              }
            ]
          }
        ],
models: [
          {
            id: 'genestudio-s5-standard',
            name: 'Ion GeneStudio S5 System',
            tier: 'Standard',
            specs: { 'Catalog Number': 'A38194', 'Chips': 'Ion 510, 520, 530', 'Output': 'Up to 15 Gb', 'Read Length': 'Up to 600 bp', 'Run Time': '2–4 hours', 'Software': 'Torrent Suite' },
            keyFeatures: ['Affordable targeted sequencing', 'Fast turnaround', 'Simple touchscreen interface', 'Small footprint'],
            relatedProducts: ['Ion GeneStudio S5 System', 'Ion 530 Chip Kit', 'Ion Chef Instrument'],
          },
          {
            id: 'genestudio-s5-prime',
            name: 'Ion GeneStudio S5 Prime',
            tier: 'Premium',
            specs: { 'Catalog Number': 'A38194', 'Chips': 'Ion 540, 550 (+ all lower)', 'Output': 'Up to 50 Gb', 'Read Length': 'Up to 600 bp', 'Run Time': '2–5 hours', 'Software': 'Torrent Suite + Ion Reporter' },
            keyFeatures: ['Exome-scale sequencing', 'High-output 550 chip', 'Oncomine panel compatible', 'Pharmacogenomics applications'],
            relatedProducts: ['Ion GeneStudio S5 Prime', 'Ion 550 Chip Kit', 'Oncomine Comprehensive Assay'],
          },
        ],
      },
    ],
  },

  /* ─────────────────────────────────────────────────────────────
     4. Genetic Analyzer (SeqStudio Flex)
     Source: Genetic Analyzer.docx
  ───────────────────────────────────────────────────────────── */
  {
    id: 'genetic-analyzer',
    title: 'Genetic Analyzers',
    shortTitle: 'Genetic Analyzer',
    icon: Dna,
    color: '#7C3AED',
    image: '/SeqStudioFlexSeries.png',
    overview: 'Applied Biosystems SeqStudio Flex and 3500 Series capillary electrophoresis genetic analyzers for Sanger sequencing, fragment analysis, and human identification (HID).',
    relatedApplications: ['molecular-diagnostics', 'forensic-science'],
    families: [
      {
        id: 'seqstudio-flex',
        name: 'SeqStudio Flex Series Genetic Analyzers',
        tagline: 'Flexible capillary count, powerful HID and Sanger workflows',
        description: 'The SeqStudio Flex Series offers 4-capillary and 8-capillary configurations for Sanger sequencing, microsatellite analysis, and forensic human identification with industry-leading capillary electrophoresis performance.',
        extendedDescription: 'SeqStudio Flex features a cartridge-based reagent system eliminating manual polymer and buffer preparation. Validated with GlobalFiler, PowerPlex, and BigDye Terminator chemistries, it supports routine forensic casework, paternity testing, and clinical Sanger confirmation workflows.',
        image: '/SeqStudioFlexSeries.png',
        keyFeatures: ['4 or 8 capillary configurations', 'Cartridge-based reagent delivery', 'HID-validated (GlobalFiler, PowerPlex)', 'BigDye Terminator Sanger support', 'Remote monitoring via Connect'],
        relatedApplications: ['forensic-science', 'molecular-diagnostics'],
                documents: [
          {
            header: 'General Documents',
            links: [
              {
                text: 'Making forensic DNA analysis more efficient and effective',
                url: 'https://documents.thermofisher.com/TFS-Assets/GSD/Flyers/hid_efficient_technologies_forensic_dna_analysis_customer_profile.pdf'
              },
              {
                text: 'Flyer: HPS standard validation packages for SeqStudio Flex Genetic Analyzers for human identification',
                url: 'https://documents.thermofisher.com/TFS-Assets/GSD/Flyers/HPS-seqstudio-flex-human-identification-validation-package-flyer.pdf'
              }
            ]
          },
          {
            header: 'Scientific Resources → Brochures',
            links: [
              {
                text: 'Brochure: SeqStudio Flex Genetic Analyzers for Human Identification',
                url: 'https://documents.thermofisher.com/TFS-Assets/GSD/brochures/seqstudio-flex-genetic-anlyzer-human-Identification-brochure.pdf'
              }
            ]
          },
          {
            header: 'Scientific Resources → Posters',
            links: [
              {
                text: 'Poster: SeqStudio Flex Genetic Analyzers for Human Identification - a fluorescence-based benchtop capillary electrophoresis system with intuitive operation and plate loading flexibility',
                url: 'https://documents.thermofisher.com/TFS-Assets/GSD/posters/SeqStudio-flex-dev-val-poster-2023.pdf'
              }
            ]
          },
          {
            header: 'Scientific Resources → Reference Materials',
            links: [
              {
                text: 'Certificate: SeqStudio Flex Genetic Analyzer for Human Identification',
                url: 'https://documents.thermofisher.com/TFS-Assets/GSD/Reference-Materials/seqstudio-flex-genetic-anlyzer-validation-human-identification-certificate.pdf'
              }
            ]
          },
          {
            header: 'Product Information → Manuals',
            links: [
              {
                text: 'User Guide: SeqStudio Flex Series Genetic Analyzer with Instrument Software v1.1.1',
                url: 'https://documents.thermofisher.com/TFS-Assets/LSG/manuals/100104689_SeqStudioFlex_v1_RUO_UG.pdf'
              },
              {
                text: 'User Bulletin: SeqStudio Flex Series Genetic Analyzer - Instrument use and validation for HID applications',
                url: 'https://documents.thermofisher.com/TFS-Assets/LSG/manuals/MAN0028463-SeqStudioFlex-HIDValidation-UB-RUO.pdf'
              }
            ]
          },
          {
            header: 'Product Information → Specification Sheets',
            links: [
              {
                text: 'Specification Sheet: SeqStudio Flex Genetic Analyzers for Human Identification',
                url: 'https://documents.thermofisher.com/TFS-Assets/GSD/Specification-Sheets/seqstudio-flex-human-identification-specification-sheet.pdf'
              }
            ]
          }
        ],
models: [
          {
            id: 'seqstudio-flex-8',
            name: 'SeqStudio Flex 8-Capillary',
            tier: 'Premium',
            specs: { 'Catalog Number': 'A57770', 'Capillaries': '8', 'Applications': 'Sanger, fragment analysis, HID', 'Dye Sets': '4, 5, 6 dye options', 'Plate Format': '96-well', 'Software': 'SeqStudio Flex Software' },
            keyFeatures: ['Higher throughput 8-capillary', 'Walk-up operation', 'RFID cartridge tracking', 'LIMS integration ready'],
            relatedProducts: ['SeqStudio Flex 8-Cap System', 'BigDye Terminator v3.1 Kit', 'GlobalFiler PCR Kit'],
          },
          {
            id: 'seqstudio-flex-4',
            name: 'SeqStudio Flex 4-Capillary',
            tier: 'Standard',
            specs: { 'Catalog Number': 'A57770', 'Capillaries': '4', 'Applications': 'Sanger, fragment analysis, HID', 'Dye Sets': '4, 5, 6 dye options', 'Plate Format': '96-well', 'Software': 'SeqStudio Flex Software' },
            keyFeatures: ['Cost-effective 4-capillary', 'Same cartridge system', 'Ideal for low-volume labs', 'Upgrade path to 8-capillary'],
            relatedProducts: ['SeqStudio Flex 4-Cap System', 'POP-4 Polymer Cartridge', 'Hi-Di Formamide'],
          },
          {
            id: 'seqstudio-standard',
            name: 'SeqStudio Genetic Analyzer System',
            tier: 'Standard',
            specs: { 'Catalog Number': '7138028', 'Capillaries': '4', 'Applications': 'Sanger, fragment analysis', 'Plate Format': '96-well', 'Software': 'SeqStudio Software' },
            keyFeatures: ['Standard 4-capillary system', 'Cartridge-based reagent delivery', 'HID and Sanger support'],
            relatedProducts: ['SeqStudio System Base Unit', 'POP-1 polymer cartridge', 'SeqStudio Cartridge'],
            image: '/SeqStudioFlexSeries.png'
          },
        ],
      },
    ],
  },

  /* ─────────────────────────────────────────────────────────────
     5. Centrifuges
     Source: Centrifuges.docx
  ───────────────────────────────────────────────────────────── */
  {
    id: 'centrifuges',
    title: 'Centrifuges',
    shortTitle: 'Centrifuges',
    icon: Settings,
    color: '#F59E0B',
    image: '/Benchtop&Floor-Standing.png',
    overview: 'Thermo Scientific micro, benchtop, and floor-standing centrifuges with a comprehensive range of rotors for clinical, research, and industrial applications.',
    relatedApplications: ['lab-equipment', 'molecular-diagnostics', 'cell-biology'],
    families: [
      {
        id: 'microcentrifuges',
        name: 'Microcentrifuges',
        tagline: 'High-speed sample processing in a compact design',
        description: 'Thermo Scientific microcentrifuges for rapid DNA, RNA, and protein pelleting, quick-spin applications, and PCR tube processing in personal or shared lab benches.',
        extendedDescription: 'From the Pico 17 personal microcentrifuge to the Sorvall Legend Micro 21R refrigerated model, these instruments deliver up to 21,000 × g in footprints under 30 cm wide, with quiet operation and maintenance-free brushless motors.',
        image: '/Microcentrifuges.png',
        keyFeatures: ['Up to 21,000 × g', 'Fixed-angle and strip-tube rotors', 'Refrigerated options (4 °C)', 'Brushless maintenance-free motors', 'Autoclavable rotor options'],
        relatedApplications: ['molecular-diagnostics', 'cell-biology'],
                documents: [
          {
            header: 'Manuals',
            links: [
              {
                text: 'Sorvall Legend Micro Series Instructions for Use [sr]',
                url: 'https://documents.thermofisher.com/TFS-Assets/LED/manuals/50165211-e-Sorvall%20Legend%20Micro%20Series-sr.pdf'
              },
              {
                text: 'Sorvall Legend Micro Series Instructions for Use [fr]',
                url: 'https://documents.thermofisher.com/TFS-Assets/LED/manuals/50165187-e-Sorvall%20Legend%20Micro%20Series-fr.pdf'
              },
              {
                text: 'Sorvall Legend Micro Series Instructions for Use [en]',
                url: 'https://documents.thermofisher.com/TFS-Assets/LED/manuals/50165185-e-Sorvall%20Legend%20Micro%20Series-en.pdf'
              },
              {
                text: 'Sorvall Legend Micro Series Instructions for Use [ru]',
                url: 'https://documents.thermofisher.com/TFS-Assets/LED/manuals/50165190-e-Sorvall%20Legend%20Micro%20Series-ru.pdf'
              },
              {
                text: 'Sorvall Legend Micro Series Instructions for Use [lv]',
                url: 'https://documents.thermofisher.com/TFS-Assets/LED/manuals/50165203-e-Sorvall%20Legend%20Micro%20Series-lv.pdf'
              },
              {
                text: 'Sorvall Legend Micro Series Instructions for Use [hu]',
                url: 'https://documents.thermofisher.com/TFS-Assets/LED/manuals/50165202-e-Sorvall%20Legend%20Micro%20Series-hu.pdf'
              },
              {
                text: 'Sorvall Legend Micro Series Instructions for Use [cs]',
                url: 'https://documents.thermofisher.com/TFS-Assets/LED/manuals/50165198-e-Sorvall%20Legend%20Micro%20Series-cs.pdf'
              },
              {
                text: 'Sorvall Legend Micro Series Instructions for Use [hr]',
                url: 'https://documents.thermofisher.com/TFS-Assets/LED/manuals/50165197-e-Sorvall%20Legend%20Micro%20Series-hr.pdf'
              },
              {
                text: 'Sorvall Legend Micro Series Instructions for Use [sk]',
                url: 'https://documents.thermofisher.com/TFS-Assets/LED/manuals/50165207-e-Sorvall%20Legend%20Micro%20Series-sk.pdf'
              },
              {
                text: 'Sorvall Legend Micro Series Instructions for Use [el]',
                url: 'https://documents.thermofisher.com/TFS-Assets/LED/manuals/50165201-e-Sorvall%20Legend%20Micro%20Series-el.pdf'
              }
            ]
          },
          {
            header: 'Warranties',
            links: [
              {
                text: 'Sorvall Legend Microcentrifuge Warranty Statement',
                url: 'https://documents.thermofisher.com/TFS-Assets/LPD/Warranties/warranty-statement-sorvall-legend-micro.pdf'
              }
            ]
          },
          {
            header: 'Application Notes',
            links: [
              {
                text: 'Isolating Genomic DNA from Whole Blood',
                url: 'https://documents.thermofisher.com/TFS-Assets/LED/Application-Notes/D11063.pdf'
              },
              {
                text: 'Isolating DNA from Soil Samples',
                url: 'https://documents.thermofisher.com/TFS-Assets/LED/Application-Notes/D11062.pdf'
              }
            ]
          },
          {
            header: 'Brochures',
            links: [
              {
                text: 'Sorvall Legend Micro 17 and 21 Microcentrifuge Series [EN]',
                url: 'https://documents.thermofisher.com/TFS-Assets/LED/brochures/D17321.pdf'
              },
              {
                text: 'How does an engineered polymer rotor impact the operation and maintenance of a microcentrifuge?',
                url: 'https://documents.thermofisher.com/TFS-Assets/LED/brochures/Engineered-polymer-rotor-impact-microcentrifuge-smart-note-PFCFGMICROROTOR.pdf'
              }
            ]
          },
          {
            header: 'Catalogs',
            links: [
              {
                text: '微量高速遠心機SorvallLegendMicro',
                url: 'https://documents.thermofisher.com/TFS-Assets/LED/Catalogs/legendmicro-centrifuges-catalog-ja.pdf'
              }
            ]
          }
        ],
models: [
          {
            id: 'sorvall-legend-micro-21r',
            name: 'Sorvall Legend Micro 21R',
            tier: 'Premium',
            specs: { 'Catalog Number': 'Multiple Catalog Numbers', 'Max Speed': '21,300 × g', 'Capacity': '24 × 1.5/2.0 mL', 'Temperature': '−10 to +40 °C', 'Acceleration Time': '<12 s to max', 'Noise Level': '<56 dB(A)' },
            keyFeatures: ['Refrigerated microcentrifuge', 'Quick-spin button', 'Bio-certified rotor lid option', 'Small 26 cm wide footprint'],
            relatedProducts: ['Sorvall Legend Micro 21R', '24 × 1.5 mL Fixed-Angle Rotor', 'Rotor Bio-Containment Lid'],
          },
          {
            id: 'pico-17',
            name: 'Pico 17 Microcentrifuge',
            tier: 'Standard',
            specs: { 'Catalog Number': 'Multiple Catalog Numbers', 'Max Speed': '17,000 × g', 'Capacity': '24 × 1.5/2.0 mL', 'Temperature': 'Ambient', 'Weight': '<5 kg', 'Noise Level': '<55 dB(A)' },
            keyFeatures: ['Ultra-compact personal centrifuge', 'Quiet motor', 'One-button quick spin', 'Low-cost laboratory standard'],
            relatedProducts: ['Pico 17 Centrifuge', '24-Place Fixed-Angle Rotor', 'Adaptor Set for 0.5 mL Tubes'],
          },
        ],
      },
      {
        id: 'benchtop-centrifuges',
        name: 'Benchtop & Floor-Standing Centrifuges',
        tagline: 'Versatile multi-rotor centrifuges for high-volume labs',
        description: 'Sorvall Legend and Multifuge X Pro series centrifuges supporting swing-out, fixed-angle, and continuous-flow rotors for blood banking, cell harvesting, and high-throughput sample processing.',
        extendedDescription: 'High-capacity centrifuges with up to 6 × 1000 mL capacity, refrigeration from −10 to +40 °C, and a virtual tour experience to explore rotor combinations before purchase.',
        image: '/Benchtop&Floor-Standing.png',
        keyFeatures: ['Up to 25,830 × g', 'Swing-out and fixed-angle rotors', 'Refrigerated and ambient models', 'Auto-Lock rotor exchange', 'Touchscreen programming'],
        relatedApplications: ['lab-equipment', 'cell-biology'],
                documents: [
          {
            header: 'General Documents',
            links: [
              {
                text: 'Resin Characteristics',
                url: 'https://documents.thermofisher.com/TFS-Assets/LCD/Product-Guides/D20454.pdf'
              },
              {
                text: 'Biobank storage temperatures',
                url: 'https://documents.thermofisher.com/TFS-Assets/LPD/Product-Information/Biobank-Storage-Infographic-COL015701-EN.pdf'
              },
              {
                text: 'Product drawing: 004150xxxx1_0602',
                url: 'https://documents.thermofisher.com/TFS-Assets/LCD/Schematics-%26-Diagrams/004150xxxx1_0602.pdf'
              },
              {
                text: 'Chemical Compatibility Quick Reference Chart',
                url: 'https://documents.thermofisher.com/TFS-Assets/LCD/Specification-Sheets/D20481.pdf'
              }
            ]
          }
        ],
models: [
          {
            id: 'multifuge-x-pro',
            name: 'Multifuge X Pro Series',
            tier: 'Premium',
            specs: { 'Catalog Number': 'Multiple Catalog Numbers', 'Max Speed': '25,830 × g', 'Capacity': '4 × 750 mL (swing-out)', 'Temperature': '−10 to +40 °C', 'Rotors': '>30 rotor options', 'Interface': 'Colour LCD touchscreen' },
            keyFeatures: ['Auto-Lock rotor exchange', 'Bio-containment rotors', 'Blood bank protocols', 'LIMS connectivity'],
            relatedProducts: ['Multifuge X Pro', 'TX-1000 Swing-Out Rotor', 'Fiberlite F15 Fixed-Angle Rotor'],
          },
          {
            id: 'sorvall-legend-xtr',
            name: 'Sorvall Legend XTR',
            tier: 'Standard',
            specs: { 'Catalog Number': 'Multiple Catalog Numbers', 'Max Speed': '15,200 × g', 'Capacity': '4 × 400 mL', 'Temperature': '−10 to +40 °C', 'Acceleration': '9 profiles', 'Display': 'Colour LCD' },
            keyFeatures: ['Compact benchtop design', 'Wide rotor compatibility', 'Pre-programmed protocols', 'Quiet operation'],
            relatedProducts: ['Sorvall Legend XTR', 'TX-750 Rotor', 'Round Bucket Set'],
          },
        ],
      },
    ],
  },

  /* ─────────────────────────────────────────────────────────────
     6. Chromatography
     Source: Chromatography.docx
  ───────────────────────────────────────────────────────────── */
  {
    id: 'chromatography',
    title: 'Chromatography',
    shortTitle: 'Chromatography',
    icon: FlaskConical,
    color: '#10B981',
    image: '/HPLC_UHPLCSystems.png',
    overview: 'HPLC, UHPLC, and ion chromatography systems with Chromeleon CDS software, columns, and consumables for analytical, preparative, and QC workflows.',
    relatedApplications: ['analytical-science', 'chemicals', 'forensic-science'],
    families: [
      {
        id: 'hplc-uhplc-systems',
        name: 'HPLC & UHPLC Systems',
        tagline: 'Sub-2-minute separations at sub-2-micron resolution',
        description: 'Vanquish UHPLC and UltiMate 3000 HPLC platforms for pharmaceutical QC, food safety, environmental analysis, and bioanalytical LC-MS workflows.',
        extendedDescription: 'Ranging from the entry-level Vanquish Core to the research-grade Vanquish Horizon, these systems support pressures up to 1500 bar with biocompatible flow path options, integrated column compartments, and Chromeleon CDS compliance.',
        image: '/HPLC_UHPLCSystems.png',
        keyFeatures: ['Up to 1500 bar operating pressure', 'Biocompatible flow path option', 'Chromeleon CDS integration', '21 CFR Part 11 compliance', 'Auto-sampler with cooled tray'],
        relatedApplications: ['analytical-science', 'chemicals'],
                documents: [
          {
            header: 'Manuals',
            links: [
              {
                text: 'Vanquish Neo 系统 (VN-A10, VN-C10, VN-P10, VN-S10) 操作手册',
                url: 'https://docs.thermofisher.com/access?partNo=4822.5001-ZH'
              },
              {
                text: 'Vanquish Neo System (VN-A10, VN-C10, VN-P10, VN-S10) Betriebsanleitung',
                url: 'https://docs.thermofisher.com/access?partNo=4822.5011-EN'
              },
              {
                text: 'Vanquish Neo System (VN-A10, VN-C10, VN-P10, VN-S10) User Guide',
                url: 'https://docs.thermofisher.com/access?partNo=4822.5011-EN'
              },
              {
                text: 'Vanquish Neo 二元泵 (VN-P10) 操作手册',
                url: 'https://docs.thermofisher.com/access?partNo=4822.5101-ZH'
              },
              {
                text: "Vanquish Neo System (VN-A10, VN-C10, VN-P10, VN-S10) Manuel d'utilisation",
                url: 'https://docs.thermofisher.com/access?partNo=4822.5001-FR'
              },
              {
                text: 'Vanquish Neo Binäre Pumpe (VN-P10) Betriebsanleitung',
                url: 'https://docs.thermofisher.com/access?partNo=4822.5101-DE'
              },
              {
                text: "Vanquish Neo Pompe Binaire (VN-P10) Manuel d'utilisation",
                url: 'https://docs.thermofisher.com/access?partNo=4822.5101-FR'
              }
            ]
          },
          {
            header: 'Specification Sheets',
            links: [
              {
                text: 'Product Specifications: Vanquish Neo UHPLC System',
                url: 'https://documents.thermofisher.com/TFS-Assets/CMD/Specification-Sheets/ps-74081-lc-vanquish-neo-uhplc-ps74081-en.pdf'
              }
            ]
          },
          {
            header: 'Brochures',
            links: [
              {
                text: 'Brochure: Vanquish Neo UHPLC System',
                url: 'https://documents.thermofisher.com/TFS-Assets/CMD/brochures/br-74142-lc-vanquish-neo-uhplc-br74142-en.pdf'
              },
              {
                text: 'Product Spotlight: All-in-one nano-, capillary- and micro-flow Vanquish Neo UHPLC system binary pump',
                url: 'https://documents.thermofisher.com/TFS-Assets/CMD/brochures/sp-74066-lc-ms-vanquish-neo-nano-capillary-micro-flow-applications-sp74066-en.pdf'
              }
            ]
          },
          {
            header: 'Application Notes',
            links: [
              {
                text: 'Application Note: Comprehensive reversed-phase analysis of nucleic acids across a wide size range using a monodisperse reversed-phase particle platform',
                url: 'https://documents.thermofisher.com/TFS-Assets/CMD/Application-Notes/an-004530-ccs-hplc-columns-biopharma-an004530-na-en.pdf'
              }
            ]
          },
          {
            header: 'Flyers',
            links: [
              {
                text: 'Flyer: Intact Protein Characterization Workflows',
                url: 'https://documents.thermofisher.com/TFS-Assets/CMD/Flyers/xx-90728-en0327a-intact-protein-characterization-workflows-xx90728-en.pdf'
              }
            ]
          },
          {
            header: 'Reference Materials',
            links: [
              {
                text: 'Presentation Slides: LC-MS Solutions for Biopharmaceutical Characterisation',
                url: 'https://documents.thermofisher.com/TFS-Assets/CMD/Reference-Materials/pp-lc-ms-solutions-biopharmaceutical-dr-jonathan-bones-pp-en.pdf'
              }
            ]
          }
        ],
models: [
          {
            id: 'vanquish-uhplc',
            name: 'Vanquish UHPLC System',
            tier: 'Premium',
            specs: { 'Catalog Number': 'VF-A10-A', 'Pressure': 'Up to 1500 bar', 'Flow Range': '0.001–5 mL/min', 'Delay Volume': '<30 µL', 'Detector': 'DAD / FLD / MS-ready', 'Software': 'Chromeleon CDS' },
            keyFeatures: ['Ternary gradient capability', 'Active pre-heater', 'Stainless or biocompatible path', 'Integrated column oven'],
            relatedProducts: ['Vanquish Horizon UHPLC', 'Acclaim C18 Column', 'Chromeleon CDS License'],
          },
          {
            id: 'vanquish-hplc',
            name: 'Vanquish HPLC System',
            tier: 'Standard',
            specs: { 'Catalog Number': 'VHPLC10', 'Pressure': 'Up to 600 bar', 'Flow Range': '0.001–10 mL/min', 'Detector': 'DAD / FLD / MS-ready', 'Software': 'Chromeleon CDS' },
            keyFeatures: ['Standard HPLC pressure ranges', 'SmartFlow technology', 'Biocompatible design option', 'Precise column temperature control'],
            relatedProducts: ['Vanquish Core HPLC', 'Acclaim C18 Columns', 'Chromeleon CDS Software'],
            image: '/HPLC_UHPLCSystems.png'
          },
          {
            id: 'ultimate3000',
            name: 'UltiMate 3000 HPLC',
            tier: 'Standard',
            specs: { 'Catalog Number': 'Multiple Catalog Numbers', 'Pressure': 'Up to 620 bar', 'Flow Range': '0.001–10 mL/min', 'Detector': 'UV/Vis, DAD, RI, FLD', 'Compliance': '21 CFR Part 11', 'Scale': 'Analytical to semi-prep' },
            keyFeatures: ['Modular architecture', 'Wide solvent compatibility', 'Automated column switching', 'Cost-effective routine HPLC'],
            relatedProducts: ['UltiMate 3000 RS System', 'Hypersil GOLD Columns', 'Autosampler WPS-3000'],
          },
        ],
      },
      {
        id: 'columns-consumables',
        name: 'Columns & Consumables',
        tagline: 'Application-specific columns for every separation challenge',
        description: 'Accucore, Acclaim, and Hypersil GOLD columns and consumables catalogue covering reversed-phase, ion exchange, HILIC, and size exclusion chromatography.',
        extendedDescription: 'An extensive consumables portfolio including vials, caps, syringe filters, and guard cartridges designed for seamless integration with Thermo Scientific chromatography platforms.',
        image: '/Columns&Consumables.png',
        keyFeatures: ['Accucore core-shell particles', 'Acclaim mixed-mode phases', 'Hypersil GOLD fully porous C18', 'Guard cartridge system', 'Certified LC-MS vials'],
        relatedApplications: ['analytical-science'],
                documents: [
          {
            header: 'Manuals',
            links: [
              {
                text: 'Vanquish Neo 系统 (VN-A10, VN-C10, VN-P10, VN-S10) 操作手册',
                url: 'https://docs.thermofisher.com/access?partNo=4822.5001-ZH'
              },
              {
                text: 'Vanquish Neo System (VN-A10, VN-C10, VN-P10, VN-S10) Betriebsanleitung',
                url: 'https://docs.thermofisher.com/access?partNo=4822.5001-DE'
              },
              {
                text: 'Vanquish Neo System (VN-A10, VN-C10, VN-P10, VN-S10) User Guide',
                url: 'https://docs.thermofisher.com/access?partNo=4822.5011-EN'
              },
              {
                text: 'Vanquish Neo 二元泵 (VN-P10) 操作手册',
                url: 'https://docs.thermofisher.com/access?partNo=4822.5101-ZH'
              },
              {
                text: "Vanquish Neo System (VN-A10, VN-C10, VN-P10, VN-S10) Manuel d'utilisation",
                url: 'https://docs.thermofisher.com/access?partNo=4822.5001-FR'
              },
              {
                text: 'Vanquish Neo Binäre Pumpe (VN-P10) Betriebsanleitung',
                url: 'https://docs.thermofisher.com/access?partNo=4822.5101-DE'
              },
              {
                text: "Vanquish Neo Pompe Binaire (VN-P10) Manuel d'utilisation",
                url: 'https://docs.thermofisher.com/access?partNo=4822.5101-FR'
              }
            ]
          },
          {
            header: 'Specification Sheets',
            links: [
              {
                text: 'Product Specifications: Vanquish Neo UHPLC System',
                url: 'https://documents.thermofisher.com/TFS-Assets/CMD/Specification-Sheets/ps-74081-lc-vanquish-neo-uhplc-ps74081-en.pdf'
              }
            ]
          },
          {
            header: 'Brochures',
            links: [
              {
                text: 'Brochure: Vanquish Neo UHPLC System',
                url: 'https://documents.thermofisher.com/TFS-Assets/CMD/brochures/br-74142-lc-vanquish-neo-uhplc-br74142-en.pdf'
              },
              {
                text: 'Product Spotlight: All-in-one nano-, capillary- and micro-flow Vanquish Neo UHPLC system binary pump',
                url: 'https://documents.thermofisher.com/TFS-Assets/CMD/brochures/sp-74066-lc-ms-vanquish-neo-nano-capillary-micro-flow-applications-sp74066-en.pdf'
              }
            ]
          },
          {
            header: 'Application Notes',
            links: [
              {
                text: 'Application Note: Comprehensive reversed-phase analysis of nucleic acids across a wide size range using a monodisperse reversed-phase particle platform',
                url: 'https://documents.thermofisher.com/TFS-Assets/CMD/Application-Notes/an-004530-ccs-hplc-columns-biopharma-an004530-na-en.pdf'
              }
            ]
          },
          {
            header: 'Flyers',
            links: [
              {
                text: 'Flyer: Intact Protein Characterization Workflows',
                url: 'https://documents.thermofisher.com/TFS-Assets/CMD/Flyers/xx-90728-en0327a-intact-protein-characterization-workflows-xx90728-en.pdf'
              }
            ]
          },
          {
            header: 'Reference Materials',
            links: [
              {
                text: 'Presentation Slides: LC-MS Solutions for Biopharmaceutical Characterisation',
                url: 'https://documents.thermofisher.com/TFS-Assets/CMD/Reference-Materials/pp-lc-ms-solutions-biopharmaceutical-dr-jonathan-bones-pp-en.pdf'
              }
            ]
          }
        ],
models: [
          {
            id: 'accucore-c18',
            name: 'Accucore C18 Column',
            tier: 'Advanced',
            specs: { 'Catalog Number': 'Multiple Catalog Numbers', 'Particle': '2.6 µm core-shell', 'Phase': 'C18 reversed phase', 'Dimensions': '50–250 mm × 2.1–4.6 mm', 'pH Range': '1.5–11', 'Temperature': 'Up to 90 °C' },
            keyFeatures: ['Sub-2-µm equivalent efficiency', 'Lower backpressure', 'Batch-to-batch consistency', 'USP L1 classification'],
            relatedProducts: ['Accucore C18 2.6 µm (100 × 2.1 mm)', 'Accucore Guard Cartridges', 'Accucore Phenyl-Hexyl Column'],
          },
        ],
      },
      {
        id: 'chromeleon-cds',
        name: 'Chromeleon CDS Software',
        tagline: 'Unified chromatography data system for all instruments',
        description: 'Chromeleon Chromatography Data System (CDS) provides instrument control, data acquisition, processing, and regulatory-compliant reporting from a single platform.',
        extendedDescription: 'Chromeleon supports multi-vendor instrument control (LC, GC, IC), electronic signatures, audit trails, and automated compliance workflows meeting 21 CFR Part 11, EU Annex 11, and USP requirements.',
        image: '/ChromeleonSoftware.png',
        keyFeatures: ['Multi-vendor instrument support', '21 CFR Part 11 / EU Annex 11', 'Automated peak detection', 'eWorkflow templates', 'Enterprise-wide data management'],
        relatedApplications: ['analytical-science'],
                documents: [
          {
            header: 'General Documents',
            links: [
              {
                text: 'Brochure: Complete Chromeleon CDS Connectivity – 247 Instrument Controller',
                url: 'https://documents.thermofisher.com/TFS-Assets/CMD/brochures/br-002138-cds-247-instrument-controller-br002138-na-en.pdf'
              },
              {
                text: 'Brochure: Targeted MS Quantitation - Controlled and accessed from anywhere',
                url: 'https://documents.thermofisher.com/TFS-Assets/CMD/brochures/BR-70660-CDS-Chromeleon-BR70660-EN.pdf'
              },
              {
                text: 'Brochure: Chromeleon 7.3.2 Chromatography Data System',
                url: 'https://documents.thermofisher.com/TFS-Assets/CMD/brochures/br-001975-sw-chromeleon-cds-7-3-2-br001975-en.pdf'
              },
              {
                text: 'Brochure: Chromeleon CDS Enterprise – Compliance, Connectivity, Confidence [JA]',
                url: 'https://documents.thermofisher.com/TFS-Assets/CMD/brochures/br-72617-chromeleon-cds-enterprise-br72617-ja.pdf'
              },
              {
                text: 'Brochure: Chromeleon CDS [JA]',
                url: 'https://documents.thermofisher.com/TFS-Assets/CMD/brochures/br-hplc071-hplc-chromeleon-cds-br80076-ja.pdf'
              },
              {
                text: 'Brochure: Chromeleon CDS – Instruments, Intelligence, Insight',
                url: 'https://documents.thermofisher.com/TFS-Assets/CMD/brochures/BR-80076-CDS-Chromeleon-BR80076-EN.pdf'
              },
              {
                text: 'Brochure: Chromeleon CDS Enterprise Support Plan and Services',
                url: 'https://documents.thermofisher.com/TFS-Assets/CMD/brochures/br-73926-chromeleon-cds-enterprise-support-services-br73926-en.pdf'
              },
              {
                text: 'Brochure: Chromeleon CDS Enterprise – Compliance, Connectivity, Confidence',
                url: 'https://documents.thermofisher.com/TFS-Assets/CMD/brochures/br-72617-chromeleon-cds-enterprise-br72617-en.pdf'
              },
              {
                text: 'Flyer: Oligonucleotide & mRNA Analytical Workflows',
                url: 'https://documents.thermofisher.com/TFS-Assets/CMD/Flyers/fl-004496-ccs-hplc-columns-biopharma-fl004496-na-en.pdf'
              },
              {
                text: 'Specification Sheet: Workstation computer requirements for Thermo Scientific Chromeleon 7.3.2 Chromatography Data System',
                url: 'https://documents.thermofisher.com/TFS-Assets/CMD/Specification-Sheets/ps-001765-sw-chromeleon-cds-software-specification-ps001765-na-en.pdf'
              }
            ]
          }
        ],
models: [
          {
            id: 'chromeleon-7',
            name: 'Chromeleon 7 CDS',
            tier: 'Premium',
            specs: { 'Catalog Number': 'CHROMELEON7', 'Instruments': 'LC, GC, IC multi-vendor', 'Compliance': '21 CFR Part 11, EU Annex 11', 'Data Integrity': 'Full audit trail', 'Deployment': 'Workstation, Client/Server, Cloud', 'Integration': 'LIMS / ERP connectable' },
            keyFeatures: ['SmartLink technology', 'Sequence-by-example setup', 'Automated SST checks', 'Role-based access control'],
            relatedProducts: ['Chromeleon 7.3 CDS License', 'Chromeleon Enterprise Server', 'Chromeleon Connector Modules'],
          },
        ],
      },
    ],
  },

  /* ─────────────────────────────────────────────────────────────
     7. Chemicals
     Source: Chemicals.docx
  ───────────────────────────────────────────────────────────── */
  {
    id: 'chemicals',
    title: 'Chemicals & Reagents',
    shortTitle: 'Chemicals',
    icon: TestTube,
    color: '#EF4444',
    image: '/Solvents.png',
    overview: 'High-purity laboratory chemicals, analytical solvents, biochemical reagents, and reference standards for research, QC, and regulated laboratory environments.',
    relatedApplications: ['chemicals', 'analytical-science'],
    families: [
      {
        id: 'analytical-solvents',
        name: 'Analytical & HPLC-Grade Solvents',
        tagline: 'HPLC to LC-MS grade — guaranteed purity',
        description: 'Fisher Chemical Optima LC-MS and HPLC-grade solvents with low UV absorbance, minimal residue, and lot-specific Certificates of Analysis for analytical laboratories.',
        extendedDescription: 'Manufactured under ISO 9001 with guaranteed low-particulate filtration, these solvents meet or exceed USP and BP specifications for chromatographic analysis, mass spectrometry, and spectrophotometric applications.',
        image: '/Solvents.png',
        keyFeatures: ['Optima LC-MS purity grade', 'UV cutoff certified', 'Low residue after evaporation', 'Lot-to-lot CoA provided', '1 L to 20 L pack sizes'],
        relatedApplications: ['analytical-science', 'chemicals'],
        models: [
          {
            id: 'optima-lcms-solvents',
            name: 'Optima LC-MS Grade Solvents',
            tier: 'Premium',
            specs: { 'Catalog Number': 'Multiple Catalog Numbers', 'Purity': '≥99.9% LC-MS grade', 'Residue': '<0.0001%', 'UV Absorbance': 'ACN <190 nm; MeOH <205 nm', 'Particulates': '<0.2 µm filtered', 'Pack Sizes': '1 L, 4 L, 20 L' },
            keyFeatures: ['Acetonitrile, methanol, water, IPA', 'Suitable for nano-flow LC', 'Formic acid and TFA buffers', 'Ammonium acetate solutions'],
            relatedProducts: ['Acetonitrile Optima LC-MS (4 L)', 'Methanol Optima LC-MS (4 L)', 'Water Optima LC-MS (4 L)'],
          },
        ],
      },
      {
        id: 'general-lab-chemicals',
        name: 'General Laboratory Chemicals',
        tagline: 'Comprehensive catalogue for every lab discipline',
        description: 'ACS-grade, reagent-grade, and technical-grade chemicals covering acids, bases, salts, buffers, and organic solvents for general laboratory and research applications.',
        extendedDescription: 'Fisher Chemical and Thermo Scientific laboratory chemicals portfolio spanning >10,000 SKUs with consistent quality documentation, safety data sheets, and rapid local delivery from Indian distribution centres.',
        image: '/GeneralChemicals.png',
        keyFeatures: ['ACS, reagent, and technical grades', 'Comprehensive catalogue >10,000 SKUs', 'Safety data sheets included', 'Local distribution in India', 'Bulk packaging available'],
        relatedApplications: ['chemicals'],
        models: [
          {
            id: 'fisher-chemical-range',
            name: 'Fisher Chemical Range',
            tier: 'Standard',
            specs: { 'Catalog Number': 'Multiple Catalog Numbers', 'Grades': 'ACS, reagent, purified, technical', 'Coverage': '>10,000 products', 'Packaging': '100 mL to 25 L', 'Documentation': 'CoA, SDS, specifications', 'Compliance': 'ISO 9001 manufactured' },
            keyFeatures: ['Acids, bases, salts, buffers', 'Organic and inorganic solvents', 'Indicator and staining reagents', 'Custom packaging options'],
            relatedProducts: ['Hydrochloric Acid ACS (2.5 L)', 'Sodium Hydroxide Pellets (1 kg)', 'Ethanol Absolute (2.5 L)'],
          },
        ],
      },
    ],
  },

  /* ─────────────────────────────────────────────────────────────
     8. Refrigerators & Cold Storage
     Source: Refrigerator.docx
  ───────────────────────────────────────────────────────────── */
  {
    id: 'refrigerators',
    title: 'Refrigerators & Cold Storage',
    shortTitle: 'Refrigerators',
    icon: Thermometer,
    color: '#06B6D4',
    image: '/TSXSeries.png',
    overview: 'TSX, TSE, and TSG series laboratory refrigerators and freezers providing reliable temperature-controlled storage for samples, reagents, and biological materials.',
    relatedApplications: ['lab-equipment', 'cell-biology'],
    families: [
      {
        id: 'tsx-series',
        name: 'TSX Series High-Performance Refrigerators',
        tagline: 'V-drive technology for unmatched temperature uniformity',
        description: 'TSX Series high-performance laboratory refrigerators with V-drive adaptive compressor technology delivering ±0.5 °C uniformity and up to 30% energy savings vs. conventional lab refrigerators.',
        extendedDescription: 'Available in 1–51 cu. ft. capacities with solid or glass door options, TSX refrigerators feature convection cooling, door-open alarms, temperature data logging, and USB download capability for regulatory compliance.',
        image: '/TSXSeries.png',
        keyFeatures: ['V-drive compressor technology', '±0.5 °C uniformity', 'Door-open and high-temp alarms', 'USB temperature data export', 'Up to 30% energy savings'],
        relatedApplications: ['lab-equipment'],
                documents: [
          {
            header: 'Application Notes',
            links: [
              {
                text: 'Temperature performance measurement in life science refrigerators - Smartnote',
                url: 'https://documents.thermofisher.com/TFS-Assets/LPD/Application-Notes/ctt-peakvariation-smartnote.pdf'
              },
              {
                text: 'What does the thermal performance data for the TSX Series refrigerators and freezers really mean?',
                url: 'https://documents.thermofisher.com/TFS-Assets/LPD/Application-Notes/Thermal%20Performance%20in%20TSX%20SmartNote%20SNTSXTHERMALPER%200121%20Rev%20Web.pdf'
              },
              {
                text: 'SmartNote Covid19 Cold Storage Products',
                url: 'https://documents.thermofisher.com/TFS-Assets/LPD/Application-Notes/FINALMCovid19_CTT_SmartNote.pdf'
              }
            ]
          },
          {
            header: 'Datasheets',
            links: [
              {
                text: 'TSX Refrigerators Green Fact Sheet',
                url: 'https://documents.thermofisher.com/TFS-Assets/LED/Datasheets/PG1789-1.pdf'
              }
            ]
          }
        ],
models: [
          {
            id: 'tsx-51',
            name: 'TSX Series 51 cu. ft. Refrigerator',
            tier: 'Premium',
            specs: { 'Catalog Number': 'Multiple Catalog Numbers', 'Capacity': '51.1 cu. ft. (1447 L)', 'Temp Range': '1–8 °C', 'Uniformity': '±0.5 °C', 'Shelves': '4 adjustable wire', 'Door': 'Solid or glass' },
            keyFeatures: ['Large capacity floor model', 'V-drive adaptive cooling', 'Access port for monitoring', 'GLP/GMP documentation'],
            relatedProducts: ['TSX Series 51 cu. ft. Refrigerator', 'Additional Wire Shelf Kit', 'External Temperature Probe'],
          },
          {
            id: 'tsx-freezer-400',
            name: 'TSX Series Ultra-Low Freezer (400 Box)',
            tier: 'Premium',
            specs: { 'Catalog Number': 'TSX40086A', 'Capacity': '400 Box / 548 L', 'Temp Range': '−50 to −86 °C', 'Uniformity': '±1.2 °C', 'Interface': 'Touchscreen' },
            keyFeatures: ['V-drive adaptive cooling', 'Natural refrigerants', 'Touchscreen user interface', 'Fast door opening recovery'],
            relatedProducts: ['TSX Series Ultra-Low Freezer', 'Cardboard Box Dividers', 'LN2 Backup System'],
            image: '/TSXSeries.png'
          },
          {
            id: 'tsx-freezer-500',
            name: 'TSX Series Ultra-Low Freezer (500 Box)',
            tier: 'Premium',
            specs: { 'Catalog Number': 'TSX50086A', 'Capacity': '500 Box / 682 L', 'Temp Range': '−50 to −86 °C', 'Uniformity': '±1.3 °C', 'Interface': 'Touchscreen' },
            keyFeatures: ['V-drive adaptive cooling', 'Low energy consumption', 'Quiet operation <46 dBA', 'USB data download'],
            relatedProducts: ['TSX Series Ultra-Low Freezer', 'Stainless Steel Racks', 'CO2 Backup System'],
            image: '/TSXSeries.png'
          },
          {
            id: 'tsx-freezer-600',
            name: 'TSX Series Ultra-Low Freezer (600 Box)',
            tier: 'Premium',
            specs: { 'Catalog Number': 'TSX60086A', 'Capacity': '600 Box / 815 L', 'Temp Range': '−50 to −86 °C', 'Uniformity': '±1.5 °C', 'Interface': 'Touchscreen' },
            keyFeatures: ['Maximum storage density', 'Eco-friendly natural refrigerants', 'Ergonomic handle and access', 'Cloud connect monitoring ready'],
            relatedProducts: ['TSX Series Ultra-Low Freezer', 'Cryo Gloves', 'Wireless Monitoring System'],
            image: '/TSXSeries.png'
          },
        ],
      },
      {
        id: 'tse-tsg-series',
        name: 'TSE & TSG Series Refrigerators',
        tagline: 'Reliable everyday storage for labs and sample prep',
        description: 'TSE solid-door and TSG general-purpose laboratory refrigerators ranging from 564 L to 1297 L for routine reagent storage, sample prep areas, and clinical laboratories.',
        extendedDescription: 'Cost-effective storage solutions with adjustable shelving, magnetic door gaskets, interior lighting, and temperature alarms meeting basic laboratory refrigeration requirements.',
        image: '/TSXSeries.png',
        keyFeatures: ['564 L to 1297 L capacity', 'Adjustable wire shelving', 'Interior LED lighting', 'Audible high-temp alarm', 'CFC-free refrigerant'],
        relatedApplications: ['lab-equipment'],
        models: [
          {
            id: 'tse-564',
            name: 'TSE Series 564 L Refrigerator',
            tier: 'Standard',
            specs: { 'Catalog Number': 'TSE40086FA', 'Capacity': '564 L', 'Temp Range': '1–10 °C', 'Door': 'Solid', 'Shelves': '3 adjustable', 'Alarm': 'Audible high/low' },
            keyFeatures: ['Economical lab storage', 'Compact single-door design', 'Easy-clean interior', 'Key lock security'],
            relatedProducts: ['TSE Series 564 L Refrigerator', 'Replacement Shelf Kit', 'Digital Temperature Logger'],
          },
          {
            id: 'tsg-1297',
            name: 'TSG Series 1297 L Refrigerator',
            tier: 'Advanced',
            specs: { 'Catalog Number': 'TSG505SA', 'Capacity': '1297 L', 'Temp Range': '1–10 °C', 'Door': 'Solid double-door', 'Shelves': '6 adjustable', 'Alarm': 'Audible + visual' },
            keyFeatures: ['High-capacity double-door', 'Sample prep area storage', 'Uniform forced-air circulation', 'Door-open alarm'],
            relatedProducts: ['TSG Series 1297 L Refrigerator', 'Temperature Monitoring Kit', 'Additional Shelf Set'],
          },
        ],
      },
    ],
  },

  /* ─────────────────────────────────────────────────────────────
     9. Plasticware & Labware
     Source: Plasticware.docx
  ───────────────────────────────────────────────────────────── */
  {
    id: 'plasticware',
    title: 'Plasticware & Lab Supplies',
    shortTitle: 'Plasticware',
    icon: Box,
    color: '#D97706',
    image: '/Nalgene.png',
    overview: 'Nalgene labware, pipette tips, microcentrifuge tubes, cell culture plasticware, and general lab supplies from Thermo Scientific and Nunc brands.',
    relatedApplications: ['lab-consumables', 'cell-biology', 'molecular-diagnostics'],
    families: [
      {
        id: 'nalgene-labware',
        name: 'Nalgene Labware',
        tagline: 'Trusted bottles, carboys, and containers for every lab',
        description: 'Nalgene HDPE, polypropylene, and polycarbonate bottles, carboys, and containers for chemical storage, media preparation, waste containment, and field sampling.',
        extendedDescription: 'The complete Nalgene portfolio covers narrow-mouth and wide-mouth bottles from 15 mL to 50 L carboys, with autoclavable, chemical-resistant, and certified leak-proof options for regulated laboratory environments.',
        image: '/Nalgene.png',
        keyFeatures: ['HDPE, PP, PC materials', 'Wide-mouth and narrow-mouth', 'Autoclavable options', 'Chemical resistance data', 'Graduated markings'],
        relatedApplications: ['lab-consumables'],
                documents: [
          {
            header: 'Manuals',
            links: [
              {
                text: 'Nalgene Product Guarantee for Calibrated Ware',
                url: 'https://documents.thermofisher.com/TFS-Assets/LCD/manuals/Nalgene-Calibrated-Ware-Guarantee-EN-8-0404-02-0609.pdf'
              },
              {
                text: 'Nalgene Polypropylene (PP) Graduated Cylinders Package Inserts',
                url: 'https://documents.thermofisher.com/TFS-Assets/LCD/manuals/Nalgene-PP-Grad-Cylinders-EN-8-0402-93-0411.pdf'
              },
              {
                text: 'Nalgene Autoclaving Instruction',
                url: 'https://documents.thermofisher.com/TFS-Assets/LCD/manuals/Nalgene-Autoclaving_Inst-EN-8-1007-21-0912.pdf'
              }
            ]
          },
          {
            header: 'Warranties',
            links: [
              {
                text: 'Nalgene Labware Value Pack',
                url: 'https://documents.thermofisher.com/TFS-Assets/LCD/Warranties/PFLSPLABVALUPK%200212%20LabwareValuePack_LR.pdf'
              }
            ]
          },
          {
            header: 'Flyers',
            links: [
              {
                text: 'See-Titles-on-the-Inserts',
                url: 'https://documents.thermofisher.com/TFS-Assets/LPD/Flyers/nalgene-calibrated-ware-guarantee.pdf'
              }
            ]
          }
        ],
models: [
          {
            id: 'nalgene-bottles',
            name: 'Nalgene Bottles & Carboys',
            tier: 'Standard',
            specs: { 'Catalog Number': 'Multiple Catalog Numbers', 'Materials': 'HDPE, PP, PC, PETG', 'Volumes': '15 mL – 50 L', 'Temperature': '−100 to +120 °C (PP)', 'Autoclavable': 'Yes (PP, PC)', 'Certifications': 'Non-pyrogenic, lot-traceable' },
            keyFeatures: ['Leak-proof closure system', 'Spigot options for carboys', 'Colour-coded caps', 'Translucent for level check'],
            relatedProducts: ['Nalgene 1 L Wide-Mouth HDPE', 'Nalgene 20 L Carboy with Spigot', 'Nalgene Narrow-Mouth 500 mL PP'],
          },
        ],
      },
      {
        id: 'tips-tubes-plates',
        name: 'Pipette Tips, Tubes & Plates',
        tagline: 'Certified consumables for reliable results',
        description: 'ART filtered and standard pipette tips, Nunc microcentrifuge tubes, PCR strip tubes, and microplates for molecular biology, cell culture, and analytical applications.',
        extendedDescription: 'GenLab and Thermo Scientific consumables catalogue covering the full range of laboratory plasticware with RNase/DNase-free certification, universal pipette compatibility, and automation-ready SBS-format plates.',
        image: '/PipetteTips.png',
        keyFeatures: ['ART aerosol barrier tips', 'RNase/DNase-free certified', 'Universal pipette compatibility', 'SBS-format microplates', 'Sterile and non-sterile options'],
        relatedApplications: ['lab-consumables', 'molecular-diagnostics'],
                documents: [
          {
            header: 'Application Notes',
            links: [
              {
                text: 'Improve pipetting performance with pipette systems: Finnpipette F2 pipettes and Finntip Flex pipette tips',
                url: 'https://documents.thermofisher.com/TFS-Assets/LCD/Application-Notes/Finnpipette-F2-Finntip-Flex-Performance-Note.pdf'
              },
              {
                text: 'Application Note: Finnpipette F2-durabilty you can rely on',
                url: 'https://documents.thermofisher.com/TFS-Assets/LSG/Application-Notes/D21353.pdf'
              },
              {
                text: 'Technical Bulletin: Effect of Liquid Properties in Pipetting Liquid Handling Note No. 1',
                url: 'https://documents.thermofisher.com/TFS-Assets/LSG/Application-Notes/D00178.pdf'
              },
              {
                text: 'Application Note: Dispense Liquids Containing Proteins More Reliably with Reverse Pipetting',
                url: 'https://documents.thermofisher.com/TFS-Assets/LSG/Application-Notes/D00177.pdf'
              },
              {
                text: 'Application Note: Pipetting performance of Finnpipette F2 with Finntip Flex',
                url: 'https://documents.thermofisher.com/TFS-Assets/LSG/Application-Notes/D00187.pdf'
              }
            ]
          },
          {
            header: 'Brochures',
            links: [
              {
                text: 'Finnpipette F1 and F2, Finnpipette Novus catalog [JA]',
                url: 'https://documents.thermofisher.com/TFS-Assets/LED/brochures/Finnpipette-F1-F2-Novus-catalog-2026.pdf'
              },
              {
                text: 'Finnpipette Manual Pipetting Systems Brochure',
                url: 'https://documents.thermofisher.com/TFS-Assets/LCD/brochures/Finnpipette-F1-and-Finnpipette-F2-brochure.pdf'
              },
              {
                text: '移液宝典',
                url: 'https://documents.thermofisher.com/TFS-Assets/LSG/brochures/%E7%A7%BB%E6%B6%B2%E5%AE%9D%E5%85%B8.pdf'
              },
              {
                text: 'Finnpipette F2移液器',
                url: 'https://documents.thermofisher.com/TFS-Assets/LSG/brochures/Finnpipette%20F2%E7%A7%BB%E6%B6%B2%E5%99%A8.pdf'
              }
            ]
          },
          {
            header: 'Technical Notes',
            links: [
              {
                text: 'Tech Note: Emphazing accuracy and precision of pipette Systems for human identification applications (EMEA version)',
                url: 'https://documents.thermofisher.com/TFS-Assets/LPD/Technical-Notes/technote-accuracy-precision-pipetting-for-hid-emea.pdf'
              },
              {
                text: 'Tech Note: Emphazing accuracy and precision of pipette Systems for human identification applications',
                url: 'https://documents.thermofisher.com/TFS-Assets/LPD/Technical-Notes/technote-accuracy-precision-pipetting-for-hid.pdf'
              }
            ]
          },
          {
            header: 'Manuals',
            links: [
              {
                text: 'Finnpipette F2 Instructions for Use [ZH]',
                url: 'https://documents.thermofisher.com/TFS-Assets/LPD/manuals/F2-Instructions-For-Use-15087000-ZH.pdf'
              },
              {
                text: 'Finnpipette F2 Instructions for Use [EN, DE, ES, FR, JA]',
                url: 'https://documents.thermofisher.com/TFS-Assets/LPD/manuals/F2-Instructions-For-Use-1508700.pdf'
              }
            ]
          },
          {
            header: 'Specification Sheets',
            links: [
              {
                text: 'Specification Sheet: ClipTip Pipette Tip Specification Sheet',
                url: 'https://documents.thermofisher.com/TFS-Assets/LCD/Specification-Sheets/D21086~.pdf'
              }
            ]
          }
        ],
models: [
          {
            id: 'art-tips',
            name: 'ART Filtered Pipette Tips',
            tier: 'Standard',
            specs: { 'Catalog Number': 'Multiple Catalog Numbers', 'Sizes': '10, 20, 100, 200, 1000 µL', 'Filter': 'Polyethylene aerosol barrier', 'Certifications': 'RNase, DNase, pyrogen-free', 'Fit': 'Universal + brand-specific', 'Pack': '96/rack, 10 racks/box' },
            keyFeatures: ['Aerosol barrier filter', 'Wide-bore and extended options', 'Colour-coded by volume', 'Low-retention surface'],
            relatedProducts: ['ART 200 µL Filtered Tips (10 racks)', 'ART 1000 µL Filtered Tips', 'ART 10 µL Extended Tips'],
            image: '/PipetteTips.png',
          },
          {
            id: 'nunc-plates',
            name: 'Nunc Cell Culture Plates',
            tier: 'Advanced',
            specs: { 'Catalog Number': 'Multiple Catalog Numbers', 'Formats': '6, 12, 24, 48, 96-well', 'Surface': 'TC-treated, MaxiSorp, ULA', 'Material': 'Polystyrene', 'Sterility': 'Gamma-irradiated', 'Lid': 'Low-evaporation lid' },
            keyFeatures: ['TC-treated for cell adhesion', 'MaxiSorp for ELISA', 'Ultra-low attachment spheroid', 'Clear bottom for imaging'],
            relatedProducts: ['Nunc 96-Well TC Plates (50/cs)', 'Nunc MaxiSorp 96-Well (10/pk)', 'Nunc ULA 96-Well Plates'],
            image: '/Plates.png',
          },
          {
            id: 'nunc-tubes',
            name: 'Nunc Microcentrifuge Tubes',
            tier: 'Standard',
            specs: { 'Catalog Number': 'Multiple Catalog Numbers', 'Sizes': '0.5, 1.5, 2.0 mL', 'Material': 'Polypropylene', 'Certifications': 'RNase, DNase-free', 'Max RCF': 'Up to 25,000 × g', 'Closure': 'Flat cap click seal' },
            keyFeatures: ['High clarity polypropylene', 'Writing area and graduation marks', 'Boiling-resistant design', 'Autoclavable'],
            relatedProducts: ['Nunc 1.5 mL Tubes (500/pk)', 'Nunc 2.0 mL Screw Cap Tubes', 'Microcentrifuge Tube Racks'],
            image: '/Tubes.png',
          },
        ],
      },
    ],
  },

  /* ─────────────────────────────────────────────────────────────
     10. Mol Bio (Molbio Diagnostics / Truenat)
     Source: Mol Bio.docx
  ───────────────────────────────────────────────────────────── */
  {
    id: 'mol-bio',
    title: 'Molecular Biology — Truenat',
    shortTitle: 'Mol Bio',
    icon: Microscope,
    color: '#059669',
    image: '/Truelab Uno Dx.png',
    overview: 'Molbio Diagnostics Truenat point-of-care real-time PCR platform for rapid molecular testing of infectious diseases including TB, COVID-19, HIV, HBV, HCV, and dengue.',
    relatedApplications: ['molecular-diagnostics', 'point-of-care'],
    families: [
      {
        id: 'truenat-platform',
        name: 'Truenat Real-Time PCR Platform',
        tagline: 'True point-of-care molecular diagnostics',
        description: 'The Truenat system from Molbio Diagnostics delivers chip-based real-time quantitative PCR at the point of care with minimal training, battery operation, and connectivity for remote and resource-limited settings.',
        extendedDescription: 'WHO-endorsed for TB diagnosis, Truenat integrates automated extraction (Trueprep AUTO v2) with real-time detection (Truelab) in a portable workflow. The platform supports a growing menu of infectious disease assays with results in under 1 hour.',
        image: '/Truelab Uno Dx.png',
        keyFeatures: ['Chip-based real-time qPCR', 'Battery-powered portable operation', 'WHO-endorsed for TB testing', 'Results in <60 minutes', 'Automated sample extraction'],
        relatedApplications: ['molecular-diagnostics', 'point-of-care'],
                documents: [
          {
            header: 'Brochures',
            links: [
              {
                text: 'Product Overview: Real-time PCR solutions from sample preparation to data analysis',
                url: 'https://documents.thermofisher.com/TFS-Assets/GSD/brochures/real-time-pcr-solutions-product-overview.pdf'
              },
              {
                text: 'Brochure: QuantStudio Pro Systems',
                url: 'https://documents.thermofisher.com/TFS-Assets/GSD/brochures/quantstudiopro-real-time-pcr-instrument-brochure.pdf'
              }
            ]
          },
          {
            header: 'Application Notes',
            links: [
              {
                text: 'Application Note: Efficient analysis of gene expression differences using TaqMan arrays, QuantStudio 6 Pro and 7 Pro systems, and Relative Quantification software',
                url: 'https://documents.thermofisher.com/TFS-Assets/GSD/Application-Notes/gex-taqman-qspro-app-note.pdf'
              }
            ]
          },
          {
            header: 'Flyers',
            links: [
              {
                text: 'Flyer: Superior services and support for QuantStudio 6 and 7 Pro Real-Time PCR Systems',
                url: 'https://documents.thermofisher.com/TFS-Assets/GSD/Flyers/quantstudio-6-7-pro-services-flyer.pdf'
              }
            ]
          },
          {
            header: 'Reference Materials',
            links: [
              {
                text: 'White Paper: QuantStudio Pro Performance Comparison',
                url: 'https://documents.thermofisher.com/TFS-Assets/GSD/Reference-Materials/quantstudio-pro-white-paper.pdf'
              }
            ]
          },
          {
            header: 'Manuals',
            links: [
              {
                text: 'User Guide: QuantStudio 6 Pro Real-Time PCR System and QuantStudio 7 Pro Real-Time PCR System',
                url: 'https://documents.thermofisher.com/TFS-Assets/LSG/manuals/MAN0018045_QS_6Pro_7Pro_UG.pdf'
              }
            ]
          },
          {
            header: 'Product Information',
            links: [
              {
                text: 'QuantStudio 6 and 7 Pro Real-Time PCR Systems - Green Fact Sheet',
                url: 'https://documents.thermofisher.com/TFS-Assets/LSG/Product-Information/PG2030-PJT4622-COL18955-QuantStudio-Sustainability-Flyer-Global-FHR.pdf'
              }
            ]
          },
          {
            header: 'Specification Sheets',
            links: [
              {
                text: 'Specification Sheet: QuantStudio 6 and 7 Pro Real-Time PCR Systems',
                url: 'https://documents.thermofisher.com/TFS-Assets/GSD/Specification-Sheets/quantstudio-pro-spec-sheet.pdf'
              }
            ]
          },
          {
            header: 'Software Updates',
            links: [
              {
                text: 'Design & Analysis 2 (DA2)',
                url: 'https://apps.thermofisher.com/apps/gm/beta/#/2d66f075-d27d-438c-9d10-9c83ea55aa50/accessrequest'
              },
              {
                text: 'QuantStudio 6/7 Pro Touchscreen Software',
                url: 'https://apps.thermofisher.com/apps/gm/beta/#/48afce76-4674-4418-bc59-afb06f22c621/accessrequest'
              }
            ]
          }
        ],
models: [
          {
            id: 'truelab-uno-dx',
            name: 'Truelab Uno Dx Analyser',
            tier: 'Standard',
            specs: { 'Catalog Number': '602041000', 'Technology': 'Chip-based real-time qPCR', 'Channels': '2 fluorescence', 'Power': 'Battery or mains', 'Weight': '<1 kg', 'Connectivity': 'Bluetooth, USB, Cloud' },
            keyFeatures: ['Single-test portable analyser', 'Battery operation for field use', 'Cloud data upload', 'Minimal training required'],
            relatedProducts: ['Truelab Uno Dx', 'Truenat MTB Chip (pack of 4)', 'Trueprep AUTO v2 Extraction'],
            image: '/Truelab Uno Dx.png',
          },
          {
            id: 'truelab-quattro',
            name: 'Truelab Quattro Analyser',
            tier: 'Advanced',
            specs: { 'Catalog Number': '602042000', 'Technology': 'Chip-based real-time qPCR', 'Channels': '4 fluorescence', 'Throughput': '4 samples simultaneously', 'Power': 'Mains + battery backup', 'Connectivity': 'Wi-Fi, Bluetooth, Cloud' },
            keyFeatures: ['4-sample concurrent testing', 'Higher throughput for labs', 'Multi-disease screening', 'Integrated data management'],
            relatedProducts: ['Truelab Quattro', 'Truenat COVID-19 Chip', 'Truenat Dengue Chip'],
            image: '/Truelab Quattro.png',
          },
        ],
      },
    ],
  },

  /* ─────────────────────────────────────────────────────────────
     11. Lab Solutions (Mass Spectrometry)
     Source: Lab Solutions.docx
  ───────────────────────────────────────────────────────────── */
  {
    id: 'lab-solutions',
    title: 'Lab Solutions & Mass Spectrometry',
    shortTitle: 'Lab Solutions',
    icon: Scale,
    color: '#14B8A6',
    image: '/Orbitrap.png',
    overview: 'Orbitrap Astral, Orbitrap Excedion, and comprehensive lab solutions for proteomics, metabolomics, environmental analysis, and pharmaceutical QC.',
    relatedApplications: ['analytical-science', 'chemicals'],
    families: [
      {
        id: 'orbitrap-platforms',
        name: 'Orbitrap Mass Spectrometry',
        tagline: 'Ultra-high resolution accurate mass analysis',
        description: 'Orbitrap Astral Zoom and Orbitrap Excedion Series mass spectrometers delivering industry-leading resolution, mass accuracy, and sensitivity for proteomics, metabolomics, and pharmaceutical characterisation.',
        extendedDescription: 'The Orbitrap platform provides resolution up to 500,000 FWHM with sub-ppm mass accuracy, enabling deep proteome coverage, untargeted metabolomics, and impurity identification workflows with Thermo Scientific data analysis software.',
        image: '/Orbitrap.png',
        keyFeatures: ['Up to 500,000 FWHM resolution', 'Sub-ppm mass accuracy', 'Proteomics and metabolomics', 'Intact protein analysis', 'Compound Discoverer software'],
        relatedApplications: ['analytical-science'],
                documents: [
          {
            header: 'Scientific Resources → Posters',
            links: [
              {
                text: 'Poster: Maximizing Proteome Coverage Through Improved On-line Orbitrap Peak Determination',
                url: 'https://documents.thermofisher.com/TFS-Assets/CMD/posters/PO-65026-Orbitrap-MS-On-Line-Proteome-Coverage-ASMS2017-PO65026-EN.pdf'
              },
              {
                text: 'Poster: Implementation of 213 nm Ultra Violet Photodissociation (UVPD) on a Modified Orbitrap Fusion Lumos',
                url: 'https://documents.thermofisher.com/TFS-Assets/CMD/posters/PO-65023-Orbitrap-MS-213nm-UVPD-ASMS2017-PO65023-EN.pdf'
              },
              {
                text: 'Poster: In-Depth Characterization of Intact Protein Standards Using HRAM Top Down Mass Spectrometry with Multiple MSMS Strategies',
                url: 'https://documents.thermofisher.com/TFS-Assets/CMD/posters/PO-65019-HRAM-MS-Intact-Proteins-ASMS2017-PO65019-EN.pdf'
              },
              {
                text: 'Poster: LipidSearch 5.0: A New Software for Processing Data from Direct Infusion and LC-MS High Resolution Mass Spectrometry Based Lipidomics Workflows',
                url: 'https://documents.thermofisher.com/TFS-Assets/CMD/posters/PO-65031-LC-MS-Lipidomics-LipidSearch-ASMS2017-PO65031-EN.pdf'
              },
              {
                text: 'Poster: Utilizing Ultra High Resolution for Selective Component Separation in Complex Matrices',
                url: 'https://documents.thermofisher.com/TFS-Assets/CMD/posters/PO-65027-HRAM-MS-Selective-Component-Complex-Matrices-ASMS2017-PO65027-EN.pdf'
              }
            ]
          },
          {
            header: 'Scientific Resources → Brochures',
            links: [
              {
                text: 'Designed to unravel complex chemical structures; Thermo Scientific Orbitrap IQ-X Tribrid mass spectrometer for small molecules',
                url: 'https://documents.thermofisher.com/TFS-Assets/CMD/brochures/br65964-lsms-orbitrap-iqx-tribrid-br65964-na-en.pdf'
              },
              {
                text: 'Brochure: Orbitrap Fusion Lumos Tribrid Mass Spectrometer – The Most Powerful Instrument, Designed to Advance Your Scientific Pursuits',
                url: 'https://documents.thermofisher.com/TFS-Assets/CMD/brochures/BR-64392-LC-MS-Orbitrap-Fusion-Lumos-Tribrid-BR64392-EN.pdf'
              },
              {
                text: 'Orbitrap Fusion Lumos Tribrid Mass Spectrometer with UVPD – Designed to Fragment the Most Challenging Compounds',
                url: 'https://documents.thermofisher.com/TFS-Assets/CMD/brochures/OT-64953-Orbitrap-Fusion-Lumos-MS-UVPD-OT64953-EN.pdf'
              },
              {
                text: 'Orbitrap Fusion Lumos Tribrid Mass Spectrometer with 1M – In-Depth Characterization of Structurally Diverse Targets',
                url: 'https://documents.thermofisher.com/TFS-Assets/CMD/brochures/OT-64954-Orbitrap-Fusion-Lumos-MS-1M-OT64954-EN.pdf'
              }
            ]
          },
          {
            header: 'Scientific Resources → Technical Notes',
            links: [
              {
                text: 'Technical Note: Quality assurance and quality control in metabolomics: achieving high-quality data for high-quality results',
                url: 'https://documents.thermofisher.com/TFS-Assets/CMD/Technical-Notes/tn-001771-ov-pierce-amino-acid-standard-h-metabolomics-qaqc-tn001771-na-en.pdf'
              },
              {
                text: 'Technical Note: LC-MS for Detection of SARS-CoV-2 Viral and Host Proteins',
                url: 'https://documents.thermofisher.com/TFS-Assets/CMD/Technical-Notes/tn-65974-lc-ms-detection-sars-cov2-viral-host-proteins-tn65974-en.pdf'
              }
            ]
          },
          {
            header: 'Scientific Resources → Reference Materials',
            links: [
              {
                text: 'White Paper: Simultaneous Quantitation and Discovery (SQUAD) analysis: Combining targeted and untargeted metabolomics on Orbitrap-based mass spectrometers',
                url: 'https://documents.thermofisher.com/TFS-Assets/CMD/Reference-Materials/wp-002540-squad-analysis-metabolomics-orbitrap-wp002540-na-en.pdf'
              }
            ]
          },
          {
            header: 'Product Information → Manuals',
            links: [
              {
                text: 'Orbitrap™ Tribrid™ MS Series: Instrument Control Software v.3.5 and v3.5 SP1 Overview',
                url: 'https://documents.thermofisher.com/TFS-Assets/CMD/manuals/Orbitrap-Tribrid-MS-Series-ICSW-v35-and-v3-5SP1-Overview-en.pdf'
              },
              {
                text: 'UVPD Module for the Orbitrap Lumos Tribrid Mass Spectrometer – User Guide (Revision A)',
                url: 'https://documents.thermofisher.com/TFS-Assets/CMD/manuals/Man-80011-97502-Orbitrap-Fusion-UVPD-User-Man8001197502-EN.pdf'
              }
            ]
          },
          {
            header: 'Product Information → Specification Sheets',
            links: [
              {
                text: 'Specification Sheet: Orbitrap IQ-X Tribrid Mass Spectrometer',
                url: 'https://documents.thermofisher.com/TFS-Assets/CMD/Specification-Sheets/ps-65965-ms-orbitrap-iq-x-tribrid-ps65965-en.pdf'
              }
            ]
          }
        ],
models: [
          {
            id: 'orbitrap-astral',
            name: 'Orbitrap Astral Zoom',
            tier: 'Premium',
            specs: { 'Catalog Number': 'Multiple Catalog Numbers', 'Resolution': 'Up to 500,000 FWHM', 'Mass Accuracy': '<1 ppm', 'Scan Speed': '200 Hz MS/MS', 'Source': 'H-ESI, APCI', 'Software': 'Proteome Discoverer, Compound Discoverer' },
            keyFeatures: ['Deep proteome coverage', 'Astral analyser for speed', 'DIA and DDA acquisition', 'Clinical research applications'],
            relatedProducts: ['Orbitrap Astral Zoom System', 'EASY-Spray Source', 'Proteome Discoverer Software'],
          },
          {
            id: 'orbitrap-excedion',
            name: 'Orbitrap Excedion Series',
            tier: 'Advanced',
            specs: { 'Catalog Number': 'Multiple Catalog Numbers', 'Resolution': 'Up to 240,000 FWHM', 'Mass Accuracy': '<1 ppm RMS', 'Mass Range': '50–8000 m/z', 'Polarity Switching': '<1 ms', 'Source': 'H-ESI, APCI, APPI' },
            keyFeatures: ['Biopharmaceutical characterisation', 'Intact and native MS', 'Small molecule quantitation', 'Multi-attribute method (MAM)'],
            relatedProducts: ['Orbitrap Excedion Series', 'BioPharma Finder Software', 'MassLynx Interface Kit'],
          },
          {
            id: 'orbitrap-exploris-120',
            name: 'Orbitrap Exploris 120',
            tier: 'Advanced',
            specs: { 'Catalog Number': 'IQLAAEGAAPFADBMBHQ', 'Resolution': 'Up to 120,000 FWHM', 'Mass Accuracy': '<1 ppm', 'Scan Speed': 'Up to 22 Hz', 'Mass Range': '40–3,000 m/z' },
            keyFeatures: ['High-resolution accurate-mass (HRAM)', 'Fast polarity switching', 'Easy instrument setup', 'Robust day-to-day operation'],
            relatedProducts: ['Orbitrap Exploris 120 System', 'BioPharma Option', 'Chromeleon Compliance Software'],
            image: '/Orbitrap.png'
          },
          {
            id: 'orbitrap-exploris-240',
            name: 'Orbitrap Exploris 240',
            tier: 'Advanced',
            specs: { 'Catalog Number': 'IQLAAEGAAPFADBQMBH', 'Resolution': 'Up to 240,000 FWHM', 'Mass Accuracy': '<1 ppm', 'Scan Speed': 'Up to 22 Hz', 'Mass Range': '40–6,000 m/z' },
            keyFeatures: ['Exceptional resolution and accuracy', 'Flexibility for proteomics & small molecules', 'Comprehensive characterisation', 'Integrated workflow options'],
            relatedProducts: ['Orbitrap Exploris 240 System', 'FAIMS Pro Duo Interface', 'Proteome Discoverer'],
            image: '/Orbitrap.png'
          },
          {
            id: 'orbitrap-exploris-480',
            name: 'Orbitrap Exploris 480',
            tier: 'Premium',
            specs: { 'Catalog Number': 'IQLAAEGAAPFADBPMBH', 'Resolution': 'Up to 480,000 FWHM', 'Mass Accuracy': '<1 ppm', 'Scan Speed': 'Up to 40 Hz', 'Mass Range': '40–6,000 m/z' },
            keyFeatures: ['Next-generation performance', 'Ultra-high resolution', 'Fast scanning capabilities', 'Ideal for deep proteomics'],
            relatedProducts: ['Orbitrap Exploris 480 System', 'FAIMS Pro Interface', 'Astral MS Upgrade Option'],
            image: '/Orbitrap.png'
          },
        ],
      },
    ],
  },

  /* ─────────────────────────────────────────────────────────────
     12. Turnkey Lab Setup
     Source: Turnkey lab Setup.docx
  ───────────────────────────────────────────────────────────── */
  {
    id: 'turnkey-lab-setup',
    title: 'Turnkey Lab Setup',
    shortTitle: 'Turnkey Lab',
    icon: Building2,
    color: '#6366F1',
    image: '/Lab Design & Build Services.png',
    overview: 'End-to-end laboratory design, construction, furniture, equipment installation, and commissioning services — from concept to a fully operational laboratory.',
    relatedApplications: ['turnkey-lab-design', 'lab-equipment'],
    families: [
      {
        id: 'lab-design-build',
        name: 'Lab Design & Build Services',
        tagline: 'Complete lab, your vision — our execution',
        description: 'Comprehensive turnkey laboratory solutions including site assessment, architectural design, MEP engineering, lab furniture selection, equipment procurement, installation, and IQ/OQ commissioning.',
        extendedDescription: 'Our experienced project team delivers laboratories for molecular biology, clinical diagnostics, forensics, food testing, and quality control applications. From layout drawings to final validation, we manage every phase of the project lifecycle.',
        image: '/Lab Design & Build Services.png',
        keyFeatures: ['End-to-end project management', 'Architectural & MEP design', 'Lab furniture and fume hoods', 'Equipment procurement & installation', 'IQ/OQ/PQ commissioning'],
        relatedApplications: ['turnkey-lab-design'],
                documents: [
          {
            header: 'Scientific Resources → Application Notes',
            links: [
              {
                text: 'Orbital shaker benchmarks: best practices for use and maintenance',
                url: 'https://documents.thermofisher.com/TFS-Assets/LED/Application-Notes/Orbital-Shaker-Benchmarks-Best-Practices-App-Note-ANMAXQBEST.pdf'
              },
              {
                text: 'Choosing the Right Orbital Shaker for Your Application',
                url: 'https://documents.thermofisher.com/TFS-Assets/LED/Application-Notes/D20064.pdf'
              },
              {
                text: 'Shaker Agitation Rate and Orbit Affect Growth of Cultured Bacteria',
                url: 'https://documents.thermofisher.com/TFS-Assets/LED/Application-Notes/D02594.pdf'
              }
            ]
          },
          {
            header: 'Scientific Resources → Brochures',
            links: [
              {
                text: 'Thermo Scientific Orbital Shaker Family Brochure',
                url: 'https://documents.thermofisher.com/TFS-Assets/LPD/brochures/thermo-scientific-orbital-shaker-family-brochure.pdf'
              },
              {
                text: 'MaxQ Shakers',
                url: 'https://documents.thermofisher.com/TFS-Assets/LED/brochures/MaxQ-Shaker-Brochure.pdf'
              },
              {
                text: 'What is an inexpensive way to maximize capacity in an orbital shaker when minimal bench space is available?',
                url: 'https://documents.thermofisher.com/TFS-Assets/LPD/brochures/orbital-shakers-dual-tier-smartnote-SNSHKDUAL-EN.pdf'
              }
            ]
          },
          {
            header: 'Product Information → Manuals',
            links: [
              {
                text: 'MaxQ 6000 Stackable Incubated and Refrigerated Shaker - Operating Manual and Parts List',
                url: 'https://documents.thermofisher.com/TFS-Assets/LED/manuals/maxq-6000-stackable-incubated-refrigerated-shaker-user-manual-7004352.pdf'
              }
            ]
          },
          {
            header: 'Product Information → Package Inserts',
            links: [
              {
                text: 'Symbols Glossary for Microgenics package inserts [EN]',
                url: 'https://documents.thermofisher.com/TFS-Assets/CDD/Package-Inserts/10024281-Glossary-ML.pdf'
              },
              {
                text: 'CEDIA Specialty Control Set Package Insert [NO]',
                url: 'https://documents.thermofisher.com/TFS-Assets/CDD/Package-Inserts/10001586-CEDIA-Specialty-Ctrl-Set-NO.pdf'
              },
              {
                text: 'CEDIA Specialty Control Set Package Insert [IT]',
                url: 'https://documents.thermofisher.com/TFS-Assets/CDD/Package-Inserts/10001586-CEDIA-Specialty-Ctrl-Set-IT.pdf'
              },
              {
                text: 'CEDIA Specialty Control Set Package Insert [FR]',
                url: 'https://documents.thermofisher.com/TFS-Assets/CDD/Package-Inserts/10001586-CEDIA-Specialty-Ctrl-Set-FR.pdf'
              },
              {
                text: 'CEDIA Specialty Control Set Package Insert [ES]',
                url: 'https://documents.thermofisher.com/TFS-Assets/CDD/Package-Inserts/10001586-CEDIA-Specialty-Ctrl-Set-ES.pdf'
              },
              {
                text: 'CEDIA Specialty Control Set Package Insert [EN]',
                url: 'https://documents.thermofisher.com/TFS-Assets/CDD/Package-Inserts/10001586-CEDIA-Specialty-Ctrl-Set-EN.pdf'
              },
              {
                text: 'CEDIA Specialty Control Set Package Insert [DE]',
                url: 'https://documents.thermofisher.com/TFS-Assets/CDD/Package-Inserts/10001586-CEDIA-Specialty-Ctrl-Set-DE.pdf'
              },
              {
                text: 'MGC Select DAU Control Set Package Insert [CS]',
                url: 'https://documents.thermofisher.com/TFS-Assets/CDD/Package-Inserts/10009065-MGC-Select-DAU-Ctrl-CS.pdf'
              },
              {
                text: 'MGC Select DAU Control Set Package Insert [TR]',
                url: 'https://documents.thermofisher.com/TFS-Assets/CDD/Package-Inserts/10009065-MGC-Select-DAU-Ctrl-TR.pdf'
              },
              {
                text: 'MGC Select DAU Control Set Package Insert [SV]',
                url: 'https://documents.thermofisher.com/TFS-Assets/CDD/Package-Inserts/10009065-MGC-Select-DAU-Ctrl-SV.pdf'
              }
            ]
          }
        ],
models: [
          {
            id: 'turnkey-molecular',
            name: 'Molecular Biology Lab Setup',
            tier: 'Premium',
            specs: { 'Catalog Number': 'Service (No Catalog Number)', 'Scope': 'PCR, qPCR, NGS, extraction', 'Clean Room': 'ISO Class 5–7 options', 'Furniture': 'Anti-vibration, ESD-safe', 'Utilities': 'UPS, compressed air, gases', 'Validation': 'IQ/OQ/PQ documentation' },
            keyFeatures: ['PCR suite with positive/negative areas', 'Dedicated extraction room', 'Integrated data management', 'Workflow-optimised layout'],
            relatedProducts: ['Lab Design Consultation', 'Anti-Vibration Lab Bench', 'Fume Hood Installation'],
          },
          {
            id: 'turnkey-clinical',
            name: 'Clinical & Diagnostics Lab Setup',
            tier: 'Advanced',
            specs: { 'Catalog Number': 'Service (No Catalog Number)', 'Scope': 'Biochemistry, haematology, serology', 'Standards': 'NABL / ISO 15189 ready', 'Safety': 'BSL-2 containment', 'Automation': 'Pneumatic tube system option', 'Validation': 'Regulatory documentation' },
            keyFeatures: ['NABL accreditation support', 'BSL-2 safety design', 'Automated sample transport', 'Patient flow optimisation'],
            relatedProducts: ['Clinical Lab Design Package', 'BSL-2 Biosafety Cabinet', 'Pneumatic Tube System'],
          },
        ],
      },
    ],
  },

  /* ─────────────────────────────────────────────────────────────
     13. Backup Lab & Training Centre
     Source: Backup Lab and Training Centre.docx
  ───────────────────────────────────────────────────────────── */
  {
    id: 'backup-lab-training',
    title: 'Backup Lab & Training Centre',
    shortTitle: 'Training Centre',
    icon: Eye,
    color: '#84CC16',
    image: '/training_centre.png',
    overview: 'Decipher Genomics & Research backup laboratory and training centre — hands-on equipment training, application support, and genomic innovation workshops.',
    relatedApplications: ['molecular-diagnostics', 'lab-equipment'],
    families: [
      {
        id: 'decipher-genomics',
        name: 'Decipher Genomics & Research Centre',
        tagline: 'Advancing genomic innovation through hands-on training',
        description: 'Our state-of-the-art backup laboratory and training centre provides hands-on training on PCR, qPCR, NGS, Sanger sequencing, and sample preparation instruments for researchers, lab technicians, and clinical staff.',
        extendedDescription: 'Decipher Genomics & Research centre serves as both a demonstration laboratory and a training facility. Scientists can receive application-specific training, troubleshoot protocols, evaluate instruments before purchase, and access backup instrumentation during equipment downtime.',
        image: '/training_centre.png',
        keyFeatures: ['Hands-on instrument training', 'Application support & troubleshooting', 'Instrument demonstration & evaluation', 'Backup lab during equipment downtime', 'Genomics & molecular biology workshops'],
        relatedApplications: ['molecular-diagnostics'],
        models: [
          {
            id: 'training-genomics',
            name: 'Genomics Training Programme',
            tier: 'Standard',
            specs: { 'Catalog Number': 'Service (No Catalog Number)', 'Topics': 'PCR, qPCR, NGS, Sanger, extraction', 'Duration': '1–5 day modules', 'Mode': 'In-person hands-on', 'Certificate': 'Completion certificate provided', 'Max Batch': '10 participants' },
            keyFeatures: ['Customisable training modules', 'Certificate of completion', 'Post-training support', 'Application-specific workflows'],
            relatedProducts: ['Genomics Starter Training (2-day)', 'Advanced NGS Workshop (3-day)', 'qPCR Masterclass (1-day)'],
          },
          {
            id: 'backup-lab-service',
            name: 'Backup Laboratory Services',
            tier: 'Standard',
            specs: { 'Catalog Number': 'Service (No Catalog Number)', 'Equipment': 'PCR, qPCR, sequencer, centrifuge', 'Availability': 'By appointment', 'Support': 'Application scientist on-site', 'Data': 'Secure data transfer to customer', 'Turnaround': 'Same-day results' },
            keyFeatures: ['Instrument access during downtime', 'Expert application support', 'Confidential sample handling', 'Quick turnaround service'],
            relatedProducts: ['Backup Lab Access (per day)', 'Priority Access Membership', 'Remote Troubleshooting Session'],
          },
        ],
      },
    ],
  },
];
