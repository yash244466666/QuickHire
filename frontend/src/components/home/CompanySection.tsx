'use client';

const companies = [
  { name: 'Nomad', logo: '/images/companies/company_logo.svg' },
  { name: 'Dropbox', logo: '/images/companies/amd_logo_1.svg' },
  { name: 'Revolut', logo: '/images/companies/vodafone_2017_logo.svg' },
  { name: 'Canva', logo: '/images/companies/netlify_logo_1.svg' },
  { name: 'Terraform', logo: '/images/companies/godaddy_logo_0_1.svg' }
];

export default function CompanySection() {
  return (
    <section className="bg-white border-y border-neutrals-20 py-10">
      <div className="container-main">
        <p className="text-body-md text-neutrals-60 text-center mb-8 opacity-50">
          Companies we helped grow
        </p>
        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
          {companies.map((company) => (
            <div
              key={company.name}
              className="flex items-center gap-2 opacity-50 hover:opacity-100 transition-opacity cursor-default"
            >
              <img
                src={company.logo}
                alt={company.name}
                className="h-7 w-auto object-contain grayscale"
              />
              <span className="font-semibold text-neutrals-100 text-body-md hidden sm:block">
                {company.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
