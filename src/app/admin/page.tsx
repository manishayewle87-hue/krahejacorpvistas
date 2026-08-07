import { Users, Target, Building2, Upload, AlertCircle } from 'lucide-react';

import { Lead } from '@prisma/client';

export const dynamic = 'force-dynamic';

export default async function AdminDashboard() {
  let liveLeads: Lead[] = [];
  let dbError = false;

  try {
    const { prisma } = await import('@/lib/prisma');
    liveLeads = await prisma.lead.findMany({
      orderBy: { createdAt: 'desc' },
      take: 50,
    });
  } catch {
    dbError = true;
  }

  // KPI Calculations
  const totalLeads = liveLeads.length;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const newLeadsToday = liveLeads.filter(l => new Date(l.createdAt) >= today).length;

  return (
    <div className="min-h-screen bg-[var(--color-luxury-charcoal)] pt-32 pb-20 px-6">
      <div className="container mx-auto max-w-7xl">
        <div className="flex justify-between items-end mb-12 border-b border-white/10 pb-6">
          <div>
            <h1 className="text-4xl font-serif text-[var(--color-luxury-pearl)] mb-2">Command Center</h1>
            <p className="text-white/60">Sales & Marketing Administration</p>
          </div>
          <div className="flex gap-4">
            <button className="text-white text-sm bg-white/10 px-6 py-2 hover:bg-white/20 transition-colors">
              Export Leads CSV
            </button>
            <button className="text-[var(--color-luxury-charcoal)] text-sm font-bold bg-[var(--color-luxury-gold)] px-6 py-2 hover:bg-white transition-colors">
              Sign Out
            </button>
          </div>
        </div>

        {/* Database Setup Notice */}
        {dbError && (
          <div className="mb-8 p-6 rounded-xl border border-amber-500/40 bg-amber-500/10 flex items-start gap-4">
            <AlertCircle className="w-6 h-6 text-amber-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-amber-400 font-bold mb-1">Database not connected</p>
              <p className="text-white/60 text-sm">Add your <code className="text-amber-300">DATABASE_URL</code> to <code className="text-amber-300">.env.local</code> and run <code className="text-amber-300">npx prisma db push</code> to activate live CRM data.</p>
            </div>
          </div>
        )}

        {/* High-level KPIs */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div className="glass-panel p-6 rounded-xl border-l-4 border-[var(--color-luxury-gold)]">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-white/60 text-sm">New Leads (Today)</p>
                <h3 className="text-3xl font-serif text-white mt-2">{newLeadsToday}</h3>
              </div>
              <Users className="text-[var(--color-luxury-gold)] opacity-50" />
            </div>
          </div>
          <div className="glass-panel p-6 rounded-xl border-l-4 border-green-500">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-white/60 text-sm">Total Leads Captured</p>
                <h3 className="text-3xl font-serif text-white mt-2">{totalLeads}</h3>
              </div>
              <Target className="text-green-500 opacity-50" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* CRM Lead Table */}
          <div className="lg:col-span-2 glass-panel p-8 rounded-2xl">
            <h2 className="text-xl font-serif text-[var(--color-luxury-pearl)] mb-6">Recent CRM Captures</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-white/10 text-white/50 text-xs uppercase tracking-wider">
                    <th className="pb-4 font-normal">Name</th>
                    <th className="pb-4 font-normal">Contact</th>
                    <th className="pb-4 font-normal">Intent</th>
                    <th className="pb-4 font-normal">City</th>
                    <th className="pb-4 font-normal">Date</th>
                  </tr>
                </thead>
                <tbody className="text-sm text-white/80">
                  {liveLeads.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="py-8 text-center text-white/40">No leads captured yet.</td>
                    </tr>
                  ) : liveLeads.map((lead) => (
                    <tr key={lead.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                      <td className="py-4 text-white font-medium">{lead.name}</td>
                      <td className="py-4">
                        <div className="flex flex-col">
                          <span>{lead.phone}</span>
                          <span className="text-xs text-white/40">{lead.email}</span>
                        </div>
                      </td>
                      <td className="py-4 text-[var(--color-luxury-gold)]">{lead.configuration}</td>
                      <td className="py-4 text-white/60">{lead.geoCity || 'Unknown'}</td>
                      <td className="py-4 text-white/50">{new Date(lead.createdAt).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <button className="w-full mt-6 py-3 text-sm text-[var(--color-luxury-gold)] border border-[var(--color-luxury-gold)]/30 hover:bg-[var(--color-luxury-gold)] hover:text-black transition-colors">
              View All Leads in Salesforce
            </button>
          </div>

          {/* Portal Management Tool */}
          <div className="glass-panel p-8 rounded-2xl flex flex-col">
            <div className="flex items-center gap-3 mb-6">
              <Building2 className="text-[var(--color-luxury-gold)]" />
              <h2 className="text-xl font-serif text-[var(--color-luxury-pearl)]">Portal Manager</h2>
            </div>
            <p className="text-sm text-white/60 mb-6">Push construction updates to buyers&apos; post-sale portals.</p>
            
            <div className="space-y-4 flex-1">
              <div>
                <label className="text-xs text-white/50 uppercase tracking-wider mb-2 block">Select Tower</label>
                <select className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white text-sm focus:outline-none focus:border-[var(--color-luxury-gold)]">
                  <option>Tower A (The Crown)</option>
                  <option>Tower B</option>
                  <option>The Grand Clubhouse</option>
                </select>
              </div>
              
              <div>
                <label className="text-xs text-white/50 uppercase tracking-wider mb-2 block">Update Title</label>
                <input type="text" placeholder="e.g., 14th Floor Slab Casting" className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white text-sm focus:outline-none focus:border-[var(--color-luxury-gold)]" />
              </div>
              
              <div className="border-2 border-dashed border-white/20 rounded-xl p-8 flex flex-col items-center justify-center text-center cursor-pointer hover:border-[var(--color-luxury-gold)] transition-colors">
                <Upload className="text-white/40 mb-3" />
                <p className="text-sm text-white/70">Drag & drop drone footage</p>
                <p className="text-xs text-white/40 mt-1">MP4 or JPG, max 50MB</p>
              </div>
            </div>

            <button className="w-full mt-6 bg-[var(--color-luxury-gold)] text-[var(--color-luxury-charcoal)] py-3 text-sm font-bold tracking-widest uppercase hover:bg-white transition-colors shadow-lg">
              Push to Buyer Portals
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
