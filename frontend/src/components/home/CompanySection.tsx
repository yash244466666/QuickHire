const companies = [
  { name: 'Nomad', logo: 'https://logo.clearbit.com/nomad.com' },
  { name: 'Dropbox', logo: 'https://logo.clearbit.com/dropbox.com' },
  { name: 'Revolut', logo: 'https://logo.clearbit.com/revolut.com' },
  { name: 'Canva', logo: 'https://logo.clearbit.com/canva.com' },
  { name: 'Terraform', logo: 'https://logo.clearbit.com/terraform.io' },
  { name: 'ClassPass', logo: 'https://logo.clearbit.com/classpass.com' },
  { name: 'Pitch', logo: 'https://logo.clearbit.com/pitch.com' },
  { name: 'Netlify', logo: 'https://logo.clearbit.com/netlify.com' },
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
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={company.logo}
                alt={company.name}
                className="h-7 w-auto object-contain grayscale"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                }}
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
