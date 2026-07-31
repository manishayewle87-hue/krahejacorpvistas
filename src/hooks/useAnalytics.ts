'use client';

declare global {
  interface Window {
    gtag: (...args: unknown[]) => void;
  }
}

type EventParams = {
  category?: string;
  label?: string;
  value?: number;
  [key: string]: unknown;
};

function fireEvent(eventName: string, params: EventParams = {}) {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag('event', eventName, {
      event_category: params.category || 'engagement',
      event_label: params.label || '',
      value: params.value || 0,
      ...params,
    });
  }
}

// ============================================================
// CONVERSION EVENTS — Tracked in GA4 as Goal Completions
// ============================================================

/** Fire when AI widget lead form is successfully submitted */
export function trackLeadSubmit(config: string, source: string) {
  fireEvent('generate_lead', {
    category: 'CRM',
    label: `Lead: ${config}`,
    configuration: config,
    traffic_source: source,
    currency: 'INR',
    value: 1,
  });
}

/** Fire when user clicks the WhatsApp floating button */
export function trackWhatsAppClick(pageSlug: string) {
  fireEvent('whatsapp_click', {
    category: 'Conversion',
    label: `WhatsApp from: ${pageSlug}`,
    page_slug: pageSlug,
    value: 1,
  });
}

/** Fire when user navigates to Buyer Portal */
export function trackPortalLogin() {
  fireEvent('portal_login', {
    category: 'Engagement',
    label: 'Buyer Portal Access',
    value: 1,
  });
}

/** Fire when user clicks "Download Brochure" */
export function trackBrochureDownload(pageName: string) {
  fireEvent('file_download', {
    category: 'Content',
    label: `Brochure: ${pageName}`,
    file_name: 'K-Raheja-Vistas-Brochure.pdf',
    page_name: pageName,
  });
}

/** Fire when user plays a property tour video */
export function trackVideoPlay(videoTitle: string) {
  fireEvent('video_start', {
    category: 'Content',
    label: `Video: ${videoTitle}`,
    video_title: videoTitle,
    video_provider: 'youtube',
  });
}

/** Fire when user clicks a CTA on a competitor comparison page */
export function trackComparePageCTA(competitor: string) {
  fireEvent('compare_page_cta', {
    category: 'Conversion',
    label: `Compare CTA vs ${competitor}`,
    competitor,
    value: 1,
  });
}

/** Fire when user clicks "Explore Project" from an NRI page */
export function trackNriPageCTA(market: string) {
  fireEvent('nri_cta_click', {
    category: 'Conversion',
    label: `NRI CTA: ${market}`,
    nri_market: market,
    value: 1,
  });
}

/** Fire scroll depth milestone (25%, 50%, 75%, 100%) */
export function trackScrollDepth(depth: number, pageName: string) {
  fireEvent('scroll_depth', {
    category: 'Engagement',
    label: `${depth}% on ${pageName}`,
    scroll_percentage: depth,
    page_name: pageName,
  });
}

// ============================================================
// SCROLL DEPTH TRACKER HOOK
// ============================================================
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export function useScrollDepthTracker() {
  const pathname = usePathname();
  
  useEffect(() => {
    const milestones = [25, 50, 75, 100];
    const fired = new Set<number>();

    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = Math.round((scrollTop / docHeight) * 100);

      milestones.forEach(milestone => {
        if (scrollPercent >= milestone && !fired.has(milestone)) {
          fired.add(milestone);
          trackScrollDepth(milestone, pathname);
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [pathname]);
}
