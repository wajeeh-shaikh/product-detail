export interface ProductImage {
  id: string;
  src: string;
  alt: string;
}

export interface ProductVariant {
  id: string;
  name: string;
  inStock: boolean;
}

export interface ProductColor {
  id: string;
  name: string;
  value: string;
}

export interface ProductSize {
  id: string;
  name: string;
  inStock: boolean;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  discountPrice?: number;
  currency: string;
  rating: number;
  reviewCount: number;
  description: string;
  features: string[];
  specifications: Record<string, string>;
  images: ProductImage[];
  colors: ProductColor[];
  sizes: ProductSize[];
}