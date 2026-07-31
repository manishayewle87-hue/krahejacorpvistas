// Setup instructions for Phase 13.1 Sanity CMS Integration
import { createClient } from 'next-sanity'

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'your-project-id',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-07-06',
  // Set to `true` for production environments to fetch from edge cache
  useCdn: process.env.NODE_ENV === 'production', 
  // Required for writing data or previewing drafts
  token: process.env.SANITY_API_READ_TOKEN 
})

// Example helper function to fetch SEO Pages from the CMS
export async function getSeoPages() {
  const query = `*[_type == "seoPage"]{
    _id,
    title,
    slug,
    description,
    category
  }`
  
  return client.fetch(query)
}
