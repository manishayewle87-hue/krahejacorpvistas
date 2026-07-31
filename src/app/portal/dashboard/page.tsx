import { prisma } from '@/lib/prisma';
import { FileText, CheckCircle2, Clock, Wallet } from 'lucide-react';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function PortalDashboard() {
  // Ensure we have a mock customer for demonstration if the DB is empty
  let customer = await prisma.customer.findFirst({
    include: { payments: true, documents: true }
  });

  if (!customer) {
    customer = await prisma.customer.create({
      data: {
        name: 'Arjun Singhania',
        email: 'arjun@example.com',
        phone: '+91 98765 43210',
        unitNumber: 'A-1402',
        tower: 'The Crown (Tower A)',
        payments: {
          create: [
            { amount: 1500000, status: 'PAID', milestone: 'Booking Amount' },
            { amount: 2500000, status: 'PAID', milestone: 'Agreement Registration' },
            { amount: 1800000, status: 'PENDING', milestone: '14th Floor Slab Casting' }
          ]
        },
        documents: {
          create: [
            { title: 'Registered Agreement', fileUrl: '#', type: 'PDF' },
            { title: 'Allotment Letter', fileUrl: '#', type: 'PDF' },
            { title: 'Payment Receipt #1', fileUrl: '#', type: 'PDF' }
          ]
        }
      },
      include: { payments: true, documents: true }
    });
  }

  const totalPaid = customer.payments.filter(p => p.status === 'PAID').reduce((sum, p) => sum + p.amount, 0);
  const totalPending = customer.payments.filter(p => p.status === 'PENDING').reduce((sum, p) => sum + p.amount, 0);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount);
  };

  return (
    <div className="min-h-screen bg-[var(--color-luxury-charcoal)] pt-32 pb-20 px-6">
      <div className="container mx-auto max-w-6xl">
        
        {/* Header Profile */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 pb-6 border-b border-white/10 gap-6">
          <div>
            <p className="text-[var(--color-luxury-gold)] uppercase tracking-widest text-xs font-bold mb-2">Welcome Back</p>
            <h1 className="text-4xl font-serif text-[var(--color-luxury-pearl)]">{customer.name}</h1>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-xl p-4 flex gap-8">
            <div>
              <p className="text-white/40 text-xs uppercase tracking-widest mb-1">Unit</p>
              <p className="text-white font-medium">{customer.unitNumber}</p>
            </div>
            <div>
              <p className="text-white/40 text-xs uppercase tracking-widest mb-1">Tower</p>
              <p className="text-white font-medium">{customer.tower}</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Financial Dashboard */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Payment Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="glass-panel p-6 rounded-2xl border-l-4 border-green-500">
                <Wallet className="w-6 h-6 text-green-500 mb-4 opacity-50" />
                <p className="text-white/50 text-sm uppercase tracking-wider mb-1">Total Paid</p>
                <h3 className="text-3xl font-serif text-white">{formatCurrency(totalPaid)}</h3>
              </div>
              <div className="glass-panel p-6 rounded-2xl border-l-4 border-[var(--color-luxury-gold)] bg-[var(--color-luxury-gold)]/5">
                <Clock className="w-6 h-6 text-[var(--color-luxury-gold)] mb-4 opacity-50" />
                <p className="text-white/50 text-sm uppercase tracking-wider mb-1">Current Due</p>
                <h3 className="text-3xl font-serif text-[var(--color-luxury-gold)]">{formatCurrency(totalPending)}</h3>
                <button className="mt-4 w-full bg-[var(--color-luxury-gold)] text-black text-xs font-bold uppercase tracking-wider py-2 rounded">
                  Make Payment
                </button>
              </div>
            </div>

            {/* Payment Schedule Table */}
            <div className="glass-panel p-8 rounded-2xl">
              <h2 className="text-xl font-serif text-[var(--color-luxury-pearl)] mb-6">Payment Ledger</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-white/10 text-white/40 text-xs uppercase tracking-wider">
                      <th className="pb-4 font-normal">Milestone</th>
                      <th className="pb-4 font-normal">Amount</th>
                      <th className="pb-4 font-normal">Status</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm text-white/80">
                    {customer.payments.map((payment) => (
                      <tr key={payment.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                        <td className="py-4">{payment.milestone}</td>
                        <td className="py-4 font-medium">{formatCurrency(payment.amount)}</td>
                        <td className="py-4">
                          {payment.status === 'PAID' ? (
                            <span className="inline-flex items-center gap-1.5 bg-green-500/10 text-green-500 px-3 py-1 rounded-full text-xs font-medium">
                              <CheckCircle2 className="w-3 h-3" /> Paid
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1.5 bg-[var(--color-luxury-gold)]/10 text-[var(--color-luxury-gold)] px-3 py-1 rounded-full text-xs font-medium">
                              <Clock className="w-3 h-3" /> Pending
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Document Vault Sidebar */}
          <div className="space-y-8">
            <div className="glass-panel p-8 rounded-2xl h-full flex flex-col">
              <h2 className="text-xl font-serif text-[var(--color-luxury-pearl)] mb-6">Document Vault</h2>
              
              <div className="flex-1 space-y-4">
                {customer.documents.map((doc) => (
                  <div key={doc.id} className="group p-4 border border-white/10 rounded-xl hover:border-[var(--color-luxury-gold)]/50 transition-colors bg-black/20 flex items-center justify-between cursor-pointer">
                    <div className="flex items-center gap-4">
                      <div className="bg-[var(--color-luxury-charcoal)] p-2 rounded-lg group-hover:text-[var(--color-luxury-gold)] transition-colors">
                        <FileText className="w-5 h-5 opacity-70" />
                      </div>
                      <div>
                        <p className="text-sm text-white font-medium">{doc.title}</p>
                        <p className="text-xs text-white/40">{doc.type}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 pt-6 border-t border-white/10">
                <Link href="/" className="block text-center text-xs text-white/50 uppercase tracking-widest hover:text-[var(--color-luxury-gold)] transition-colors">
                  ← Back to Website
                </Link>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
