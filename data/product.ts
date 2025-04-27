import { Product } from '@/types/product';

export const product: Product = {
  id: 'premium-backpack-2023',
  name: 'Premium Adventure Backpack',
  price: 189.99,
  discountPrice: 149.99,
  currency: 'USD',
  rating: 4.8,
  reviewCount: 127,
  description: 'Our Premium Adventure Backpack is designed for the modern explorer. Built with high-quality water-resistant materials and featuring multiple compartments for optimal organization, this backpack is perfect for hiking, traveling, or daily commutes. The ergonomic design provides comfort even during long journeys.',
  features: [
    'Water-resistant material',
    'Padded laptop compartment (fits up to 15.6")',
    'Ergonomic shoulder straps with breathable mesh',
    'Hidden anti-theft pocket',
    'External USB charging port',
    'Reinforced bottom panel',
    'Side water bottle pockets',
    'Chest strap for added stability'
  ],
  specifications: {
    'Material': 'Nylon with water-resistant coating',
    'Capacity': '32L',
    'Dimensions': '52 × 31 × 18 cm',
    'Weight': '0.9 kg',
    'Warranty': '5 years limited warranty'
  },
  images: [
    {
      id: '1',
      src: 'https://images.pexels.com/photos/2905238/pexels-photo-2905238.jpeg',
      alt: 'Premium Adventure Backpack - Front view'
    },
    {
      id: '2',
      src: 'https://images.pexels.com/photos/1546003/pexels-photo-1546003.jpeg',
      alt: 'Premium Adventure Backpack - Side view'
    },
    {
      id: '3',
      src: 'https://images.pexels.com/photos/1102874/pexels-photo-1102874.jpeg',
      alt: 'Premium Adventure Backpack - Back view'
    },
    {
      id: '4',
      src: 'https://images.pexels.com/photos/2905347/pexels-photo-2905347.jpeg',
      alt: 'Premium Adventure Backpack - Detail view'
    }
  ],
  colors: [
    {
      id: 'black',
      name: 'Black',
      value: '#000000'
    },
    {
      id: 'navy',
      name: 'Navy Blue',
      value: '#0A2472'
    },
    {
      id: 'olive',
      name: 'Olive Green',
      value: '#556B2F'
    },
    {
      id: 'burgundy',
      name: 'Burgundy',
      value: '#800020'
    }
  ],
  sizes: [
    {
      id: 'compact',
      name: 'Compact (24L)',
      inStock: true
    },
    {
      id: 'standard',
      name: 'Standard (32L)',
      inStock: true
    },
    {
      id: 'large',
      name: 'Large (40L)',
      inStock: false
    }
  ]
};