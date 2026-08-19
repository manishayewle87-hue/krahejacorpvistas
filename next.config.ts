import type { NextConfig } from "next";
import withPWAInit from "@ducanh2912/next-pwa";

const withPWA = withPWAInit({
  dest: "public",
  disable: process.env.NODE_ENV === "development",
  register: true,
});

const nextConfig: NextConfig = {
  reactStrictMode: true,
  turbopack: {},
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 86400, // 24hr cache for all optimized images
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  compress: true,
  poweredByHeader: false,
  trailingSlash: false,
  async redirects() {
    return [
      // 301 Permanent Redirect: Enforce canonical www domain
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'krahejacorpvistas.com' }],
        destination: 'https://www.krahejacorpvistas.com/:path*',
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-XSS-Protection', value: '1; mode=block' },
          { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'geolocation=(), microphone=(), camera=(), payment=(), usb=(), magnetometer=(), accelerometer=(), gyroscope=(), display-capture=()' },
          { key: 'X-Permitted-Cross-Domain-Policies', value: 'none' },
          { key: 'X-DNS-Prefetch-Control', value: 'on' },
          { key: 'Content-Language', value: 'en-IN' },
          { key: 'Link', value: '<https://fonts.googleapis.com>; rel=preconnect, <https://fonts.gstatic.com>; rel=preconnect; crossorigin, <https://www.clarity.ms>; rel=preconnect' },
          { key: 'Content-Security-Policy', value: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.clarity.ms https://*.clarity.ms https://app.posthog.com https://*.posthog.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; img-src 'self' data: https: blob:; connect-src 'self' https://*.google-analytics.com https://analytics.google.com https://www.clarity.ms https://*.clarity.ms https://app.posthog.com https://region1.posthog.com https://*.posthog.com; font-src 'self' https://fonts.gstatic.com https:; frame-src 'self' https://maps.google.com https://www.google.com; frame-ancestors 'none'; media-src 'self' https:; worker-src 'self' blob:;" },
        ],
      },
      {
        // Cache static assets aggressively (1 year immutable)
        source: '/:static*{.(js|css|png|jpg|jpeg|svg|webp|avif|gif|ico|woff2|woff)}',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
      {
        // Sitemaps cache control
        source: '/sitemaps/:path*',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=3600, s-maxage=86400' },
          { key: 'Content-Type', value: 'application/xml; charset=utf-8' },
        ],
      },
    ];
  },
};

export default withPWA(nextConfig);
