'use client';

import { useState } from 'react';
import { useProductContext } from '@/context/ProductContext';
import { ProductColor, ProductSize } from '@/types/product';
import { formatCurrency } from '@/lib/formatters';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ProductColorSelector from './ProductColorSelector';
import ProductSizeSelector from './ProductSizeSelector';
import ProductQuantity from './ProductQuantity';
import { ShoppingBagIcon, HeartIcon, StarIcon } from '@/components/icons/Icons';

export default function ProductInfo() {
  const { product, selectedColor, selectedSize, quantity, addToCart, setSelectedColor, setSelectedSize, setQuantity } = useProductContext();
  const [addedToCart, setAddedToCart] = useState(false);

  const handleAddToCart = () => {
    addToCart();
    setAddedToCart(true);
    setTimeout(() => {
      setAddedToCart(false);
    }, 2000);
  };

  return (
    <div className="flex flex-col space-y-6">
      <div>
        <h2 className="text-sm tracking-widest text-muted-foreground uppercase mb-2">Adventure Gear</h2>
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight">{product.name}</h1>
      </div>
      <div className="flex items-center space-x-3">
        {product.discountPrice ? (
          <>
            <span className="text-2xl font-bold">{formatCurrency(product.discountPrice, product.currency)}</span>
            <span className="text-lg text-muted-foreground line-through">{formatCurrency(product.price, product.currency)}</span>
            <span className="px-2 py-1 bg-destructive/10 text-destructive rounded text-sm font-medium">
              {Math.round((1 - product.discountPrice / product.price) * 100)}% OFF
            </span>
          </>
        ) : (
          <span className="text-2xl font-bold">{formatCurrency(product.price, product.currency)}</span>
        )}
      </div>
      <div className="flex items-center space-x-2">
        <div className="flex">
          {[...Array(5)].map((_, i) => (
            <StarIcon 
              key={i} 
              className={`w-4 h-4 ${i < Math.floor(product.rating) ? "text-amber-500" : "text-muted-foreground/30"}`} 
              fill={i < Math.floor(product.rating) ? "currentColor" : "none"}
            />
          ))}
        </div>
        <span className="text-sm text-muted-foreground">
          {product.rating.toFixed(1)} ({product.reviewCount} reviews)
        </span>
      </div>
      <p className="text-muted-foreground">{product.description}</p>
      <div>
        <h3 className="text-sm font-medium mb-3">Color</h3>
        <ProductColorSelector />
      </div>

      <div>
        <h3 className="text-sm font-medium mb-3">Size</h3>
        <ProductSizeSelector />
      </div>
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 pt-4">
        <ProductQuantity />
        
        <Button 
          size="lg" 
          className={`w-full sm:w-auto flex-1 ${addedToCart ? 'bg-green-600 hover:bg-green-700' : ''}`}
          onClick={handleAddToCart}
          disabled={!selectedSize || !selectedColor}
        >
          <ShoppingBagIcon className="w-5 h-5 mr-2" />
          {addedToCart ? 'Added to Cart!' : 'Add to Cart'}
        </Button>
        
        <Button variant="outline" size="icon" className="rounded-full">
          <HeartIcon className="h-5 w-5" />
          <span className="sr-only">Add to Wishlist</span>
        </Button>
      </div>
      <Tabs defaultValue="features" className="w-full mt-8">
        <TabsList className="grid grid-cols-3">
          <TabsTrigger value="features">Features</TabsTrigger>
          <TabsTrigger value="specifications">Specifications</TabsTrigger>
          <TabsTrigger value="shipping">Shipping</TabsTrigger>
        </TabsList>
        <TabsContent value="features" className="mt-4">
          <div className="space-y-4">
            <ul className="space-y-2">
              {product.features.map((feature, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </TabsContent>
        <TabsContent value="specifications" className="mt-4">
          <div className="space-y-2">
            {Object.entries(product.specifications).map(([key, value]) => (
              <div key={key} className="flex py-2 border-b border-border">
                <span className="w-1/3 font-medium">{key}</span>
                <span className="w-2/3 text-muted-foreground">{value}</span>
              </div>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="shipping" className="mt-4">
          <div className="space-y-4">
            <h4 className="font-medium">Shipping Information</h4>
            <p>Free shipping on all orders over $100. Standard delivery takes 3-5 business days.</p>
            <p>Express shipping (1-2 business days) available for an additional $15.</p>
            <p>International shipping available to select countries.</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}