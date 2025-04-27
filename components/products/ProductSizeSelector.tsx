'use client';

import { useProductContext } from '@/context/ProductContext';
import { cn } from '@/lib/utils';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

export default function ProductSizeSelector() {
  const { product, selectedSize, setSelectedSize } = useProductContext();

  return (
    <RadioGroup 
      defaultValue={selectedSize?.id}
      value={selectedSize?.id}
      onValueChange={(value) => {
        const size = product.sizes.find(s => s.id === value);
        if (size && size.inStock) setSelectedSize(size);
      }}
    >
      <div className="flex items-center space-x-3">
        {product.sizes.map((size) => (
          <div key={size.id}>
            <RadioGroupItem 
              value={size.id} 
              id={`size-${size.id}`} 
              className="peer sr-only" 
              disabled={!size.inStock}
            />
            <Label
              htmlFor={`size-${size.id}`}
              className={cn(
                "flex h-10 w-24 items-center justify-center rounded-md border text-sm transition-all",
                size.inStock ? "cursor-pointer" : "cursor-not-allowed opacity-50",
                selectedSize?.id === size.id 
                  ? "border-primary bg-primary text-primary-foreground" 
                  : "border-input bg-background hover:bg-muted/50 peer-disabled:hover:bg-background"
              )}
            >
              {size.name}
            </Label>
          </div>
        ))}
      </div>
      {product.sizes.some(size => !size.inStock) && (
        <p className="text-sm text-muted-foreground mt-2">
          Some sizes are currently out of stock.
        </p>
      )}
    </RadioGroup>
  );
}