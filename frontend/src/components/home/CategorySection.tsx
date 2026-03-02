import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const categories = [
  { name: 'Design', icon: '🎨', jobs: 235, active: false },
  { name: 'Sales', icon: '📊', jobs: 756, active: false },
  { name: 'Marketing', icon: '📣', jobs: 310, active: true },
  { name: 'Finance', icon: '💰', jobs: 89, active: false },
  { name: 'Engineering', icon: '⚙️', jobs: 542, active: false },
  { name: 'Business', icon: '💼', jobs: 178, active: false },
  { name: 'HR', icon: '👥', jobs: 143, active: false },
  { name: 'Tech', icon: '💻', jobs: 621, active: false },
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
                className={`rounded-md p-6 border transition-all duration-200 group cursor-pointer
                  ${
                    cat.active
                      ? 'bg-primary border-primary text-white'
                      : 'bg-white border-neutrals-20 hover:border-primary hover:bg-primary-25'
                  }`}
              >
                <span className="text-3xl mb-4 block">{cat.icon}</span>
                <h3
                  className={`font-semibold text-body-lg mb-1 ${
                    cat.active ? 'text-white' : 'text-neutrals-100'
                  }`}
                >
                  {cat.name}
                </h3>
                <div
                  className={`flex items-center gap-2 text-body-sm ${
                    cat.active ? 'text-white/80' : 'text-neutrals-60'
                  }`}
                >
                  <span>{cat.jobs} jobs available</span>
                  <ArrowRight
                    size={14}
                    className={`opacity-0 group-hover:opacity-100 transition-opacity ${
                      cat.active ? 'opacity-100' : ''
                    }`}
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
