'use client';

import { useProductContext } from '@/context/ProductContext';
import { cn } from '@/lib/utils';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { CheckIcon } from '@/components/icons/Icons';

export default function ProductColorSelector() {
  const { product, selectedColor, setSelectedColor } = useProductContext();

  return (
    <RadioGroup 
      defaultValue={selectedColor?.id} 
      value={selectedColor?.id}
      onValueChange={(value) => {
        const color = product.colors.find(c => c.id === value);
        if (color) setSelectedColor(color);
      }}
    >
      <div className="flex items-center space-x-3">
        {product.colors.map((color) => (
          <div key={color.id} className="flex flex-col items-center space-y-1">
            <RadioGroupItem 
              value={color.id} 
              id={`color-${color.id}`} 
              className="peer sr-only" 
            />
            <Label
              htmlFor={`color-${color.id}`}
              className={cn(
                "flex items-center justify-center w-10 h-10 rounded-full border-2 cursor-pointer transition-all",
                selectedColor?.id === color.id 
                  ? "border-primary" 
                  : "border-transparent hover:border-muted"
              )}
            >
              <span 
                className="w-8 h-8 rounded-full flex items-center justify-center"
                style={{ backgroundColor: color.value }}
              >
                {selectedColor?.id === color.id && (
                  <CheckIcon className={`h-4 w-4 ${
                    ['#000000', '#0A2472', '#800020'].includes(color.value) 
                      ? 'text-white' 
                      : 'text-black'
                  }`} />
                )}
              </span>
            </Label>
            <span className="text-xs font-medium">{color.name}</span>
          </div>
        ))}
      </div>
    </RadioGroup>
  );
}