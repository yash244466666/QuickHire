import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const categories = [
  { name: 'Design', icon: '🎨', jobs: 235 },
  { name: 'Sales', icon: '📊', jobs: 756 },
  { name: 'Marketing', icon: '📣', jobs: 310 },
  { name: 'Finance', icon: '💰', jobs: 89 },
  { name: 'Engineering', icon: '⚙️', jobs: 542 },
  { name: 'Business', icon: '💼', jobs: 178 },
  { name: 'HR', icon: '👥', jobs: 143 },
  { name: 'Tech', icon: '💻', jobs: 621 },
];

export default function CategorySection() {
  return (
    <section className="bg-white py-16 lg:py-24">
      <div className="container-main">
        {/* Header */}
        <div className="flex items-center justify-between mb-10 flex-wrap gap-4">
          <h2 className="section-title">Explore by <span className="text-primary">category</span></h2>
          <Link
            href="/jobs"
            className="flex items-center gap-2 text-body-md font-semibold text-primary hover:gap-3 transition-all"
          >
            Show all jobs <ArrowRight size={18} />
          </Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {categories.map((cat) => (
            <Link key={cat.name} href={`/jobs?category=${cat.name}`}>
              <div
                className="rounded-md p-6 border transition-all duration-200 group cursor-pointer bg-white border-neutrals-20 hover:border-primary hover:bg-primary-25"
              >
                <span className="text-3xl mb-4 block">{cat.icon}</span>
                <h3 className="font-semibold text-body-lg mb-1 text-neutrals-100">
                  {cat.name}
                </h3>
                <div className="flex items-center gap-2 text-body-sm text-neutrals-60">
                  <span>{cat.jobs} jobs available</span>
                  <ArrowRight
                    size={14}
                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                  />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
