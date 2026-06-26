import React from 'react';
import Hero from '../components/Hero';
import About from '../components/About';
import Applications from '../components/Applications';
import Products from '../components/Products';
import Services from '../components/Services';
import OurBrands from '../components/OurBrands';
import SEO from '../components/SEO';

const HOME_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Inventa Systems Product Categories',
  description: 'Lab instruments and solutions across 13 categories',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'PCR Thermal Cyclers', url: 'https://www.inventasystems.in/products/pcr' },
    { '@type': 'ListItem', position: 2, name: 'Real-Time PCR Systems', url: 'https://www.inventasystems.in/products/realtime-pcr' },
    { '@type': 'ListItem', position: 3, name: 'Next-Generation Sequencing', url: 'https://www.inventasystems.in/products/ngs' },
    { '@type': 'ListItem', position: 4, name: 'Genetic Analyzers', url: 'https://www.inventasystems.in/products/genetic-analyzer' },
    { '@type': 'ListItem', position: 5, name: 'Centrifuges', url: 'https://www.inventasystems.in/products/centrifuges' },
    { '@type': 'ListItem', position: 6, name: 'Chromatography & Mass Spectrometry', url: 'https://www.inventasystems.in/products/chromatography' },
    { '@type': 'ListItem', position: 7, name: 'Lab Chemicals & Reagents', url: 'https://www.inventasystems.in/products/chemicals' },
    { '@type': 'ListItem', position: 8, name: 'Lab Refrigerators & Freezers', url: 'https://www.inventasystems.in/products/refrigerators' },
    { '@type': 'ListItem', position: 9, name: 'Plasticware & Consumables', url: 'https://www.inventasystems.in/products/plasticware' },
    { '@type': 'ListItem', position: 10, name: 'Molecular Biology Kits', url: 'https://www.inventasystems.in/products/mol-bio' },
    { '@type': 'ListItem', position: 11, name: 'Lab Solutions & Buffers', url: 'https://www.inventasystems.in/products/lab-solutions' },
    { '@type': 'ListItem', position: 12, name: 'Turnkey Lab Setup', url: 'https://www.inventasystems.in/products/turnkey-lab-setup' },
    { '@type': 'ListItem', position: 13, name: 'Backup Lab & Training', url: 'https://www.inventasystems.in/products/backup-lab-training' },
  ],
};

const HomePage = () => {
  return (
    <>
      <SEO
        description="India's trusted supplier of PCR, NGS, HPLC, mass spectrometry, centrifuges, lab reagents and 200+ products. Turnkey laboratory setup and complete lab solutions across India."
        keywords="lab instruments India, PCR thermal cyclers, NGS sequencer India, HPLC systems, mass spectrometry, laboratory reagents, centrifuges, turnkey lab setup, Ahmedabad laboratory"
        canonical="/"
        structuredData={HOME_SCHEMA}
      />
      <Hero />
      <About />
      <Applications />
      <Products />
      <Services />
      <OurBrands />
    </>
  );
};

export default HomePage;
