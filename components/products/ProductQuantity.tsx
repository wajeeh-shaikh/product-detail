'use client';

import { useProductContext } from '@/context/ProductContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MinusIcon, PlusIcon } from '@/components/icons/Icons';

export default function ProductQuantity() {
  const { quantity, setQuantity } = useProductContext();

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const increaseQuantity = () => {
    if (quantity < 10) {
      setQuantity(quantity + 1);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value >= 1 && value <= 10) {
      setQuantity(value);
    }
  };

  return (
    <div className="flex items-center border rounded-md">
      <Button
        variant="ghost"
        size="icon"
        onClick={decreaseQuantity}
        disabled={quantity <= 1}
        className="h-10 rounded-none rounded-l-md"
      >
        <MinusIcon className="h-4 w-4" />
        <span className="sr-only">Decrease quantity</span>
      </Button>
      
      <Input
        type="text"
        inputMode="numeric"
        pattern="[0-9]*"
        min="1"
        max="10"
        value={quantity}
        onChange={handleInputChange}
        className="h-10 w-12 text-center border-0 rounded-none focus-visible:ring-0 focus-visible:ring-offset-0"
      />
      
      <Button
        variant="ghost"
        size="icon"
        onClick={increaseQuantity}
        disabled={quantity >= 10}
        className="h-10 rounded-none rounded-r-md"
      >
        <PlusIcon className="h-4 w-4" />
        <span className="sr-only">Increase quantity</span>
      </Button>
    </div>
  );
}