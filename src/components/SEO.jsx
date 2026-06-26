import { Helmet } from 'react-helmet-async';

const SITE = 'Inventa Systems';
const SITE_URL = 'https://www.inventasystems.in';
const OG_IMAGE = `${SITE_URL}/og-image.png`;
const FAVICON = `${SITE_URL}/favicon.png`;

function SEO({ title, description, keywords, canonical, ogImage, ogType = 'website', structuredData }) {
  const fullTitle = title
    ? `${title} | ${SITE}`
    : `${SITE} | Lab Instruments, Reagents & Turnkey Lab Solutions India`;
  const url = canonical ? `${SITE_URL}${canonical}` : SITE_URL;
  const img = ogImage || OG_IMAGE;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <link rel="canonical" href={url} />
      <link rel="icon" type="image/png" href={FAVICON} />
      <link rel="apple-touch-icon" href={FAVICON} />

      {/* Developer credit */}
      <meta name="generator" content="Techsentinals LLP — https://techsentinals.in/" />

      {/* Open Graph */}
      <meta property="og:type" content={ogType} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={img} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={`${SITE} — ${title || 'Lab Instruments & Solutions'}`} />
      <meta property="og:site_name" content={SITE} />
      <meta property="og:locale" content="en_IN" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={img} />
      <meta name="twitter:image:alt" content={`${SITE} — ${title || 'Lab Instruments & Solutions'}`} />

      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
    </Helmet>
  );
}

export default SEO;
