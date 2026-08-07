/**
 * Enterprise SEO JSON-LD Schema Generators
 * This file contains reusable functions to generate strictly typed Schema.org JSON-LD objects.
 */

const DOMAIN = "https://www.krahejacorpvistas.com";

export function generateOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    name: "K Raheja Vistas",
    url: DOMAIN,
    logo: `${DOMAIN}/assets/logo.png`,
    description: "Premium Luxury Deck Residences in Mahalunge, Baner Annex, Pune.",
    address: {
      "@type": "PostalAddress",
      streetAddress: "K Raheja Vistas, Mahalunge",
      addressLocality: "Pune",
      addressRegion: "Maharashtra",
      postalCode: "411045",
      addressCountry: "IN",
    },
    telephone: "+91-0000000000",
  };
}

export function generateApartmentComplexSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ApartmentComplex",
    name: "K Raheja Vistas Mahalunge",
    description: "7.5 Acres of Ultra-Luxury Living in West Pune",
    url: `${DOMAIN}/project/overview`,
    numberOfAccommodationUnits: {
      "@type": "QuantitativeValue",
      value: "400", // Placeholder
    },
    amenityFeature: [
      {
        "@type": "LocationFeatureSpecification",
        name: "Twin Clubhouses",
        value: "True",
      },
      {
        "@type": "LocationFeatureSpecification",
        name: "Infinity Pool",
        value: "True",
      },
    ],
  };
}

export function generateBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${DOMAIN}${item.url}`,
    })),
  };
}

export function generateFAQSchema(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function generateArticleSchema(title: string, description: string, datePublished: string, authorName: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description: description,
    datePublished: datePublished,
    author: {
      "@type": "Person",
      name: authorName,
    },
    publisher: {
      "@type": "Organization",
      name: "K Raheja Vistas",
      logo: {
        "@type": "ImageObject",
        url: `${DOMAIN}/assets/logo.png`,
      },
    },
  };
}

export function generateRealEstateListingSchema(title: string, description: string, url: string, price: string = "On Request") {
  return {
    "@context": "https://schema.org",
    "@type": "RealEstateListing",
    name: title,
    description: description,
    url: `${DOMAIN}${url}`,
    datePosted: new Date().toISOString().split('T')[0],
    about: {
      "@type": "ApartmentComplex",
      name: "K Raheja Vistas Mahalunge",
      address: {
        "@type": "PostalAddress",
        streetAddress: "K Raheja Vistas, Mahalunge",
        addressLocality: "Pune",
        addressRegion: "Maharashtra",
        postalCode: "411045",
        addressCountry: "IN"
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: "18.5721",
        longitude: "73.7432"
      }
    },
    offers: {
      "@type": "Offer",
      price: price,
      priceCurrency: "INR",
      availability: "https://schema.org/InStock",
      seller: {
        "@type": "RealEstateAgent",
        name: "K Raheja Corp",
        image: `${DOMAIN}/assets/logo.png`
      }
    }
  };
}
