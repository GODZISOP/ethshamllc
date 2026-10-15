export const companyInfo = {
  name: 'Ehthesham Ventures LLC',
  legalName: 'EHTHESHAM VENTURES LLC',
  tagline: 'Wholesale Product Sourcing',
  heroSubtitle: 'THE ONLY ONE',
  heroTitle: 'Wholesale Product Sourcing',
  heroDescription: 'We source authentic branded products for resale on Amazon and across e-commerce.',
  aboutTitle: 'About Our Business',
  aboutDescription: 'Ehthesham Ventures LLC is a U.S.-based trading company focused on sourcing authentic branded products from legitimate brands, manufacturers, and authorized distributors for resale through Amazon and other e-commerce channels.',
  sourcingTitle: 'Our Sourcing',
  sourcingDescription: 'Ehthesham Ventures LLC sources branded products through legitimate brands, manufacturers, and authorized distributors for resale across e-commerce channels.',
  businessTitle: 'Authentic Product Sourcing',
  businessDescription: 'We source authentic branded products through legitimate brands, manufacturers, and authorized distributors for resale across established e-commerce channels.',
  commitmentTitle: 'Our Commitment',
  commitmentQuote: 'We’re building trusted supplier relationships; customer testimonials will appear here as our store grows.',
  address: '30 N Gould St # 68440 Sheridan, WYOMING 82801',
  street: '30 N Gould St # 68440',
  cityStateZip: 'Sheridan, WYOMING 82801',
  email: 'ehteshamishraq787@gmail.com',
  phone: '(+966) 9362206795',
  phoneRaw: '+9669362206795',
  whatsappUrl: 'https://wa.me/+9669362206795',
  hours: '9am – 6pm',
  mapEmbedUrl: 'https://www.google.com/maps?q=30%20N%20Gould%20St%20%23%2068440%20Sheridan%2C%20WYOMING%2082801&output=embed',
  videoUrl: 'https://videos.pexels.com/video-files/30014429/12877565_1920_1080_30fps.mp4'
};

export const categories = [
  {
    id: 'beauty-care',
    name: 'Beauty & Personal Care',
    description: 'Authentic skincare, beauty essentials, and personal grooming sourced for multichannel resale.',
    buttonText: 'Browse',
    image: 'https://images.unsplash.com/photo-1627384113710-424c9181ebbb?q=85&w=800&fit=crop',
    itemCount: 1
  },
  {
    id: 'health-household',
    name: 'Health & Household',
    description: 'Everyday household care supplies and essential consumables with steady year-round turnover.',
    buttonText: 'Browse',
    image: 'https://images.unsplash.com/photo-1696937520232-30e356f4078b?q=85&w=800&fit=crop',
    itemCount: 1
  },
  {
    id: 'home-kitchen',
    name: 'Home & Kitchen',
    description: 'Storage solutions, kitchenware, and modern home goods for organized, comfortable spaces.',
    buttonText: 'Browse',
    image: 'https://images.unsplash.com/photo-1684332927099-21e94a83d88b?q=85&w=800&fit=crop',
    itemCount: 1
  },
  {
    id: 'office-products',
    name: 'Office Products',
    description: 'Dependable office supplies, stationery, and organizational tools for desks and workspaces.',
    buttonText: 'Browse',
    image: 'https://images.unsplash.com/photo-1603985585179-3d71c35a537c?q=85&w=800&fit=crop',
    itemCount: 1
  },
  {
    id: 'pet-care',
    name: 'Pet Care Essentials',
    description: 'Carefully chosen pet care and feeding essentials meeting stringent pet wellness standards.',
    buttonText: 'Browse',
    image: 'https://images.unsplash.com/photo-1611378037174-7fa8cbbc588c?q=85&w=800&fit=crop',
    itemCount: 1
  }
];

export const products = [
  {
    id: 11,
    name: 'Daily Skincare Essentials',
    category: 'beauty-care',
    categoryName: 'Beauty & Personal Care',
    sku: 'EV-BEAUTY-011',
    price: '₨ 12',
    priceNumeric: 12,
    packSize: 'Standard Retail Pack',
    availability: 'In Stock (Ready to Ship)',
    stockUnits: 1850,
    minOrder: '1 Unit',
    rating: 5.0,
    reviewCount: 24,
    priceNote: 'Wholesale Tiered Sourcing Available',
    image: 'https://images.unsplash.com/photo-1685764289969-2c47735c36c7?q=85&w=1024&h=1024',
    description: 'A practical skincare essential for everyday routines, presented as a sample category listing. Product availability, brand, and wholesale terms can be confirmed when you inquire.',
    longDescription: 'Ehthesham Ventures LLC sources authentic branded skincare products directly from certified brands and authorized distributors. Daily Skincare Essentials represents our high-turnover cosmetic and personal care category, packaged for direct retail or rapid e-commerce resale.',
    features: [
      'Authentic brand procurement verified through authorized channels',
      'Gentle, tested daily formulation for all skin types',
      'Tamper-evident, shelf-ready packaging with standard barcodes',
      'High repeat purchase velocity across Amazon and e-commerce stores',
      'Full supplier invoices and resale documentation support'
    ],
    tiers: [
      { range: '1 - 19 Units', price: '₨ 12', discount: 'Base Rate' },
      { range: '20 - 99 Units', price: '₨ 10', discount: '16% Wholesale' },
      { range: '100+ Units', price: '₨ 8', discount: '33% Volume Pallet' }
    ],
    specs: [
      { label: 'Category', value: 'Beauty & Personal Care' },
      { label: 'Sourcing Source', value: 'Authorized Brand Distributors' },
      { label: 'Condition', value: 'Brand New / Factory Sealed' },
      { label: 'Distribution Channels', value: 'Amazon FBA, E-Commerce, Retail' }
    ]
  },
  {
    id: 17,
    name: 'Everyday Office Supplies',
    category: 'office-products',
    categoryName: 'Office Products',
    sku: 'EV-OFFICE-017',
    price: '₨ 7',
    priceNumeric: 7,
    packSize: 'Workspace Multi-Pack',
    availability: 'In Stock (Ready to Ship)',
    stockUnits: 3400,
    minOrder: '1 Unit',
    rating: 5.0,
    reviewCount: 31,
    priceNote: 'Wholesale & Volume Tier Available',
    image: 'https://images.unsplash.com/photo-1676866536847-6a279cc0cf43?q=85&w=1024&h=1024',
    description: 'Stock up on dependable office essentials for workspaces and study areas. This sample listing is for illustration; specific products and quantities are subject to confirmation.',
    longDescription: 'Curated by Ehthesham Ventures LLC for business centers, academic institutions, and retail merchants, Everyday Office Supplies delivers reliable, durable stationery tools that keep daily workspaces running efficiently.',
    features: [
      'Durable, high-utility tools for executive desks, classrooms, and study hubs',
      'Compact bundle packaging engineered for space-efficient logistics',
      'Standardized UPC barcode labels ready for immediate listing',
      'Sourced directly from authorized manufacturers and volume wholesalers',
      'Flexible order quantities with rapid dispatch from Sheridan, WY'
    ],
    tiers: [
      { range: '1 - 24 Units', price: '₨ 7', discount: 'Base Catalog' },
      { range: '25 - 99 Units', price: '₨ 6', discount: '14% Bulk Pack' },
      { range: '100+ Units', price: '₨ 5', discount: '28% Master Carton' }
    ],
    specs: [
      { label: 'Category', value: 'Office Products & Stationery' },
      { label: 'Sourcing Channel', value: 'Direct Factory & Authorized Distributors' },
      { label: 'Package Type', value: 'Carton Master Pack' },
      { label: 'Compatibility', value: 'Commercial & Educational Fit' }
    ]
  },
  {
    id: 13,
    name: 'Household Care Basics',
    category: 'health-household',
    categoryName: 'Health & Household',
    sku: 'EV-HOUSE-013',
    price: '₨ 10',
    priceNumeric: 10,
    packSize: 'Household Value Pack',
    availability: 'In Stock (Ready to Ship)',
    stockUnits: 2600,
    minOrder: '1 Unit',
    rating: 5.0,
    reviewCount: 42,
    priceNote: 'Wholesale Tiered Sourcing Available',
    image: 'https://images.unsplash.com/photo-1642764733814-2974d47f8dbb?q=85&w=1024&h=1024',
    description: 'Everyday household care supplies selected for resale across online channels. Ask us about current sourcing options, case quantities, and product details.',
    longDescription: 'Household Care Basics covers essential domestic cleaning and wellness supplies sourced by Ehthesham Ventures LLC. Built to fulfill high consumer demand across Amazon and online retail channels with consistent quality.',
    features: [
      'High-velocity consumable item with strong recurring re-order rate',
      'Leak-proof, heavy-duty protective transit packaging',
      'Compliant with North American household safety specifications',
      'Direct traceability to authorized manufacturer lots',
      'Competitive B2B wholesale pricing with tiered discounts'
    ],
    tiers: [
      { range: '1 - 19 Units', price: '₨ 10', discount: 'Standard Rate' },
      { range: '20 - 99 Units', price: '₨ 8.5', discount: '15% Case Pack' },
      { range: '100+ Units', price: '₨ 7', discount: '30% Pallet Tier' }
    ],
    specs: [
      { label: 'Category', value: 'Health & Household Essentials' },
      { label: 'Sourcing Source', value: 'Authorized Brand Distributors' },
      { label: 'Safety Standard', value: 'Certified Non-Hazardous Consumer Fit' },
      { label: 'Origin', value: 'Legitimate Global Supply Chain' }
    ]
  },
  {
    id: 15,
    name: 'Kitchen Storage Set',
    category: 'home-kitchen',
    categoryName: 'Home & Kitchen',
    sku: 'EV-KTCHN-015',
    price: '₨ 18',
    priceNumeric: 18,
    packSize: 'Multi-Piece Storage Set',
    availability: 'In Stock (Ready to Ship)',
    stockUnits: 1950,
    minOrder: '1 Unit',
    rating: 5.0,
    reviewCount: 29,
    priceNote: 'Wholesale & Pallet Pricing Available',
    image: 'https://images.unsplash.com/photo-1697308024659-92d81610fc6d?q=85&w=1024&h=1024',
    description: 'Useful kitchen and home goods for daily living, shown as a representative catalog example. Contact us to discuss current availability and wholesale pricing.',
    longDescription: 'Ehthesham Ventures LLC sources top-grade Home & Kitchen products. This Kitchen Storage Set features food-grade, BPA-free airtight containers designed to maximize pantry space and preserve ingredient freshness.',
    features: [
      'Airtight silicone locking lids keep dry food crisp and pest-free',
      'Modular stackable design maximizes cupboard and refrigerator space',
      'BPA-free crystal clear durable polymer for quick contents view',
      'Dishwasher and freezer safe construction for versatile usage',
      'High-demand consumer kitchen essential for online store resale'
    ],
    tiers: [
      { range: '1 - 19 Units', price: '₨ 18', discount: 'Catalog Base' },
      { range: '20 - 99 Units', price: '₨ 15', discount: '16% Merchant Pack' },
      { range: '100+ Units', price: '₨ 13', discount: '27% Pallet Tier' }
    ],
    specs: [
      { label: 'Category', value: 'Home & Kitchen Storage' },
      { label: 'Material', value: 'BPA-Free Food Grade Polymer' },
      { label: 'Care Instructions', value: 'Dishwasher Safe' },
      { label: 'Warranty', value: '1 Year Manufacturer Guarantee' }
    ]
  },
  {
    id: 19,
    name: 'Pet Care Essentials',
    category: 'pet-care',
    categoryName: 'Pet Care Essentials',
    sku: 'EV-PET-019',
    price: '₨ 11',
    priceNumeric: 11,
    packSize: 'Pet Comfort & Care Pack',
    availability: 'In Stock (Ready to Ship)',
    stockUnits: 2200,
    minOrder: '1 Unit',
    rating: 5.0,
    reviewCount: 38,
    priceNote: 'Wholesale Bulk Tier Available',
    image: 'https://images.unsplash.com/photo-1611378037174-7fa8cbbc588c?q=85&w=1024&h=1024',
    description: 'A sample pet supplies listing for buyers looking to source everyday essentials. Reach out to confirm available products, packaging, and purchasing terms.',
    longDescription: 'Curated by Ehthesham Ventures LLC to address the booming pet care market, Pet Care Essentials brings safe, pet-friendly products from trusted manufacturers for resale on Amazon and specialist retail channels.',
    features: [
      'Veterinary-conscious materials safe for dogs, cats, and small animals',
      'Easy to clean, durable construction engineered for long-lasting use',
      'Compact retail packaging ideal for both direct delivery and store displays',
      'High margins and consistent turnover in the growing pet supplies sector',
      'Volume wholesale terms and express dispatch to fulfillment hubs'
    ],
    tiers: [
      { range: '1 - 24 Units', price: '₨ 11', discount: 'Base Catalog' },
      { range: '25 - 99 Units', price: '₨ 9.5', discount: '13% Volume Tier' },
      { range: '100+ Units', price: '₨ 8', discount: '27% Pallet Rate' }
    ],
    specs: [
      { label: 'Category', value: 'Pet Care & Accessories' },
      { label: 'Suitability', value: 'Universal Pet Care' },
      { label: 'Material Safety', value: 'Non-Toxic / BPA-Free' },
      { label: 'Packaging', value: 'Protective Retail Box' }
    ]
  }
];
