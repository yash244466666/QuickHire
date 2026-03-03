import { Suspense } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/home/HeroSection';
import CompanySection from '@/components/home/CompanySection';
import CategorySection from '@/components/home/CategorySection';
import CTASection from '@/components/home/CTASection';
import FeaturedJobsSection from '@/components/home/FeaturedJobsSection';
import LatestJobsSection from '@/components/home/LatestJobsSection';

function JobsSkeleton({ rows = 4 }: { rows?: number }) {
  return (
    <div className="space-y-4">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="bg-white border border-neutrals-20 rounded-md p-6 animate-pulse">
          <div className="flex gap-4">
            <div className="w-12 h-12 bg-neutrals-20 rounded-md" />
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-neutrals-20 rounded w-1/3" />
              <div className="h-3 bg-neutrals-20 rounded w-1/4" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <CompanySection />
        <CategorySection />
        <CTASection />
        <Suspense
          fallback={
            <section className="bg-white py-16 lg:py-24">
              <div className="container-main">
                <div className="h-8 bg-neutrals-20 rounded w-48 mb-10 animate-pulse" />
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                  {Array.from({ length: 8 }).map((_, i) => (
                    <div key={i} className="bg-white border border-neutrals-20 rounded-md p-6 animate-pulse">
                      <div className="w-12 h-12 bg-neutrals-20 rounded-md mb-4" />
                      <div className="h-4 bg-neutrals-20 rounded w-3/4 mb-2" />
                      <div className="h-3 bg-neutrals-20 rounded w-1/2" />
                    </div>
                  ))}
                </div>
              </div>
            </section>
          }
        >
          <FeaturedJobsSection />
        </Suspense>
        <Suspense
          fallback={
            <section className="bg-neutrals-10 py-16 lg:py-24">
              <div className="container-main">
                <div className="h-8 bg-neutrals-20 rounded w-48 mb-10 animate-pulse" />
                <JobsSkeleton rows={6} />
              </div>
            </section>
          }
        >
          <LatestJobsSection />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
