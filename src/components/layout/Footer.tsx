import Link from 'next/link';
import Image from 'next/image';
import KeywordMesh from '@/components/seo/KeywordMesh';

export default function Footer() {
  return (
    <>
      <footer className="bg-[#111] text-[var(--color-luxury-pearl)] py-16 border-t border-white/10">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            
            <div className="col-span-1 md:col-span-1">
              <Image src="/assets/logo.png" alt="K Raheja Vistas Mahalunge Pune" width={160} height={48} className="h-12 w-auto mb-6 opacity-90" />
              <p className="text-sm text-gray-400 mb-6 leading-relaxed">
                Timeless Living Above the City. Experience ultra-luxury 2, 3 &amp; 4 BHK premium deck residences on 7.5 acres at Baner Annexe, Mahalunge by K Raheja Corp.
              </p>
              <div className="text-xs text-[var(--color-luxury-gold)]">
                MahaRERA Reg: <strong className="text-white">PR1260002501530</strong>
              </div>
            </div>
            
            <div>
              <div className="md:col-span-1">
                <h4 className="text-white font-serif mb-4">Verified Project Location</h4>
                <div className="w-full h-40 rounded-lg overflow-hidden border border-white/10 shadow-lg">
                  <iframe 
                    src="https://maps.google.com/maps?q=18.563551,73.7339978&t=&z=17&ie=UTF8&iwloc=&output=embed" 
                    width="100%" 
                    height="100%" 
                    style={{ border: 0 }} 
                    allowFullScreen={true} 
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade"
                    title="K Raheja Vistas Mahalunge Pune Google Maps Location"
                  ></iframe>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="text-[var(--color-luxury-gold)] font-serif text-lg mb-6 tracking-wide">Floor Plans &amp; Hubs</h4>
              <ul className="space-y-3 text-sm text-gray-400">
                <li><Link href="/project/floorplans?type=2bhk" className="hover:text-white transition-colors">2 BHK Deck Residences</Link></li>
                <li><Link href="/project/floorplans?type=3bhk" className="hover:text-white transition-colors">3 BHK Luxury Deck Homes</Link></li>
                <li><Link href="/project/floorplans?type=4bhk" className="hover:text-white transition-colors">4 BHK Palatial &amp; Duplexes</Link></li>
                <li><Link href="/nri/invest-in-pune-real-estate-from-dubai" className="hover:text-white transition-colors">Global NRI Investment Desk</Link></li>
                <li><Link href="/compare" className="hover:text-white transition-colors">K Raheja Vistas vs Competitors</Link></li>
                <li><Link href="/investment-calculator" className="hover:text-white transition-colors">Real Estate ROI Calculator</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-[var(--color-luxury-gold)] font-serif text-lg mb-6 tracking-wide">Sales &amp; Site Office</h4>
              <ul className="space-y-3 text-sm text-gray-400">
                <li><strong>Site Address:</strong> Baner Annexe, Mahalunge, Pune, Maharashtra 411045</li>
                <li><strong>Sales Hotline:</strong> <a href="tel:+917744009295" className="text-[var(--color-luxury-gold)] hover:underline">+91 77440 09295</a></li>
                <li><strong>WhatsApp:</strong> <a href="https://wa.me/917744009295" target="_blank" rel="noopener noreferrer" className="hover:text-white">+91 77440 09295</a></li>
                <li><strong>Hours:</strong> Mon - Sun (9:00 AM - 7:00 PM IST)</li>
              </ul>
            </div>

          </div>
          
          <div className="pt-8 mb-8 border-t border-white/10 text-[10px] text-gray-500 leading-relaxed text-justify">
            <strong className="text-gray-400">Disclaimer:</strong> The information provided on this website is for informational purposes only and does not constitute an offer, invitation, or contract. The visuals, master plans, floor plans, specifications, amenities, and facilities described herein are conceptual and subject to change at the sole discretion of K Raheja Corp and the competent authorities. We have officially registered K Raheja Vistas Mahalunge under MahaRERA No. PR1260002501530 and is available on the website maharera.mahaonline.gov.in under registered projects. By accessing this website, the viewer confirms that the information, including brochures and marketing collaterals, is solely for informational purposes and that they have not relied on this information for making any booking or purchase. Nothing on this website constitutes advertising, marketing, booking, selling or an offer for sale, or invitation to purchase a unit in any project by the company.
          </div>
          
          <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
            <p>&copy; {new Date().getFullYear()} K Raheja Vistas Mahalunge by K Raheja Corp. All Rights Reserved.</p>
            <div className="flex flex-wrap gap-4 mt-4 md:mt-0">
              <Link href="/directory" className="hover:text-white">Real Estate Directory</Link>
              <Link href="/project/masterplan" className="hover:text-white">Masterplan</Link>
              <Link href="/project/amenities" className="hover:text-white">Amenities</Link>
              <Link href="/project/location" className="hover:text-white">Location</Link>
              <Link href="/llms.txt" className="hover:text-white">AI Summary (llms.txt)</Link>
            </div>
          </div>
        </div>
      </footer>
      <KeywordMesh />
    </>
  );
}
