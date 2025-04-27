'use client';

import React from 'react';
import { product } from '@/data/product';
import ProductGallery from './ProductGallery';
import ProductInfo from './ProductInfo';
import { ThemeProvider } from '@/components/theme/ThemeProvider';
import { Toaster } from '@/components/ui/sonner';
import { ProductProvider } from '@/context/ProductContext';

export default function ProductPage() {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <ProductProvider product={product}>
        <main className="min-h-screen">
          <div className="container mx-auto px-4 py-8 max-w-7xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
              <ProductGallery />
              <ProductInfo />
            </div>
          </div>
        </main>
      </ProductProvider>
      <Toaster />
    </ThemeProvider>
  );
}