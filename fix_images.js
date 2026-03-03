const fs = require('fs');

const FILE = 'frontend/src/components/home/CompanySection.tsx';
let content = fs.readFileSync(FILE, 'utf8');

// Replace all log.clearbit.com with local SVGs based on names
content = content.replace(/'https:\/\/logo\.clearbit\.com\/nomad\.com'/g, "'/images/companies/company_logo.svg'");
content = content.replace(/'https:\/\/logo\.clearbit\.com\/dropbox\.com'/g, "'/images/companies/amd_logo_1.svg'");
content = content.replace(/'https:\/\/logo\.clearbit\.com\/revolut\.com'/g, "'/images/companies/vodafone_2017_logo.svg'");
content = content.replace(/'https:\/\/logo\.clearbit\.com\/canva\.com'/g, "'/images/companies/netlify_logo_1.svg'");
content = content.replace(/'https:\/\/logo\.clearbit\.com\/terraform\.io'/g, "'/images/companies/godaddy_logo_0_1.svg'");
content = content.replace(/'https:\/\/logo\.clearbit\.com\/classpass\.com'/g, "'/images/companies/logo_2.svg'");
content = content.replace(/'https:\/\/logo\.clearbit\.com\/pitch\.com'/g, "'/images/companies/company_logo.svg'");
content = content.replace(/'https:\/\/logo\.clearbit\.com\/netlify\.com'/g, "'/images/companies/netlify_logo_1.svg'");

// Optional: fix the grayscale img to match figma exactly
// We'll trust tailwind works for now. 

fs.writeFileSync(FILE, content);
console.log('Fixed CompanySection.tsx');
