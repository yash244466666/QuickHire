import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/home/HeroSection';
import CompanySection from '@/components/home/CompanySection';
import CategorySection from '@/components/home/CategorySection';
import CTASection from '@/components/home/CTASection';
import FeaturedJobsSection from '@/components/home/FeaturedJobsSection';
import LatestJobsSection from '@/components/home/LatestJobsSection';

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <CompanySection />
        <CategorySection />
        <CTASection />
        <FeaturedJobsSection />
        <LatestJobsSection />
      </main>
      <Footer />
    </>
  );
}
