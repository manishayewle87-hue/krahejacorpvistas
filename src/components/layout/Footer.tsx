import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="bg-[#111] text-[var(--color-luxury-pearl)] py-16 border-t border-white/10">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          
          <div className="col-span-1 md:col-span-1">
            <Image src="/assets/logo.png" alt="K Raheja Corp" width={160} height={48} className="h-12 w-auto mb-6 opacity-90" />
            <p className="text-sm text-gray-400 mb-6 leading-relaxed">
              Timeless Living Above the City. Experience premium deck residences surrounded by panoramic foothills and thoughtfully designed luxury living.
            </p>
          </div>
          
          <div>
            <div className="md:col-span-1">
              <h4 className="text-white font-serif mb-4">Location Map</h4>
              <div className="w-full h-40 rounded-lg overflow-hidden border border-white/10 shadow-lg">
                <iframe 
                  src="https://maps.google.com/maps?q=Raheja+Vistas,+Baner+Annex&t=&z=15&ie=UTF8&iwloc=&output=embed" 
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
            <h4 className="text-[var(--color-luxury-gold)] font-serif text-lg mb-6 tracking-wide">Exclusive Floor Plans</h4>
            <ul className="space-y-4 text-sm text-gray-400">
              <li><Link href="/project/floorplans?type=2bhk" className="hover:text-white transition-colors">2BHK Flats in West Pune</Link></li>
              <li><Link href="/project/floorplans?type=3bhk" className="hover:text-white transition-colors">3BHK Luxury Flats Mahalunge</Link></li>
              <li><Link href="/project/floorplans?type=4bhk" className="hover:text-white transition-colors">4BHK Duplex Baner Annex</Link></li>
              <li><Link href="/project/floorplans#download" className="hover:text-white transition-colors">Download Pricing & Plans</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-[var(--color-luxury-gold)] font-serif text-lg mb-6 tracking-wide">Contact Us</h4>
            <ul className="space-y-4 text-sm text-gray-400">
              <li>Site Address: K Raheja Vistas, Mahalunge, Pune, Maharashtra 411045</li>
              <li>Phone: +91 98765 43210</li>
              <li>Email: sales@krahejavistas-mahalunge.com</li>
            </ul>
          </div>

        </div>
        
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
          <p>&copy; {new Date().getFullYear()} K Raheja Vistas Mahalunge. All Rights Reserved.</p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <Link href="/directory" className="hover:text-white">Real Estate Directory</Link>
            <Link href="/privacy-policy" className="hover:text-white" rel="nofollow">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white" rel="nofollow">Terms of Service</Link>
            <Link href="/rera" className="hover:text-white" rel="nofollow">RERA Information</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
