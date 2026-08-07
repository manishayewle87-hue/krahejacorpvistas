import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  baseUrl: string;
}

export default function Pagination({ currentPage, totalPages, baseUrl }: PaginationProps) {
  if (totalPages <= 1) return null;

  const prevPage = currentPage > 1 ? currentPage - 1 : null;
  const nextPage = currentPage < totalPages ? currentPage + 1 : null;

  return (
    <div className="flex items-center justify-center space-x-4 mt-12 mb-8">
      {prevPage ? (
        <Link 
          href={`${baseUrl}?page=${prevPage}`}
          className="flex items-center space-x-2 px-4 py-2 border border-white/20 rounded-md text-white/70 hover:text-[var(--color-luxury-gold)] hover:border-[var(--color-luxury-gold)] transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Previous</span>
        </Link>
      ) : (
        <div className="flex items-center space-x-2 px-4 py-2 border border-white/5 rounded-md text-white/30 cursor-not-allowed">
          <ChevronLeft className="w-4 h-4" />
          <span>Previous</span>
        </div>
      )}

      <span className="text-white/60 text-sm font-medium">
        Page {currentPage} of {totalPages}
      </span>

      {nextPage ? (
        <Link 
          href={`${baseUrl}?page=${nextPage}`}
          className="flex items-center space-x-2 px-4 py-2 border border-white/20 rounded-md text-white/70 hover:text-[var(--color-luxury-gold)] hover:border-[var(--color-luxury-gold)] transition-colors"
        >
          <span>Next</span>
          <ChevronRight className="w-4 h-4" />
        </Link>
      ) : (
        <div className="flex items-center space-x-2 px-4 py-2 border border-white/5 rounded-md text-white/30 cursor-not-allowed">
          <span>Next</span>
          <ChevronRight className="w-4 h-4" />
        </div>
      )}
    </div>
  );
}
