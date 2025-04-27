'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useProductContext } from '@/context/ProductContext';
import { cn } from '@/lib/utils';
import { MagnifyingGlassPlusIcon, MagnifyingGlassMinusIcon } from '@/components/icons/Icons';

export default function ProductGallery() {
  const { product } = useProductContext();
  const [selectedImage, setSelectedImage] = useState(product.images[0]);
  const [isZoomed, setIsZoomed] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleThumbnailClick = (image: typeof product.images[0]) => {
    setSelectedImage(image);
    setIsZoomed(false);
  };

  const handleZoomToggle = () => {
    setIsZoomed(!isZoomed);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isZoomed) return;
    
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    
    setMousePosition({ x, y });
  };

  return (
    <div className="flex flex-col space-y-4">
      <div 
        className={cn(
          "relative overflow-hidden rounded-lg bg-muted h-[400px] md:h-[500px] lg:h-[600px]",
          isZoomed ? "cursor-zoom-out" : "cursor-zoom-in"
        )}
        onClick={handleZoomToggle}
        onMouseMove={handleMouseMove}
      >
        <div 
          className={cn(
            "transition-transform duration-200 h-full w-full",
            isZoomed ? "scale-150" : "scale-100"
          )}
          style={
            isZoomed 
              ? { 
                  transformOrigin: `${mousePosition.x}% ${mousePosition.y}%` 
                }
              : {}
          }
        >
          <Image
            src={selectedImage.src}
            alt={selectedImage.alt}
            className="object-cover"
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority
          />
        </div>
        <button 
          className="absolute bottom-4 right-4 bg-background/80 text-foreground p-2 rounded-full backdrop-blur-sm"
          onClick={(e) => {
            e.stopPropagation();
            handleZoomToggle();
          }}
        >
          {isZoomed ? <MagnifyingGlassMinusIcon className="h-5 w-5" /> : <MagnifyingGlassPlusIcon className="h-5 w-5" />}
        </button>
      </div>
      <div className="flex space-x-2 overflow-x-auto py-2">
        {product.images.map((image) => (
          <button
            key={image.id}
            className={cn(
              "relative h-20 w-20 rounded-md overflow-hidden flex-shrink-0 transition-all",
              selectedImage.id === image.id ? "ring-2 ring-primary" : "opacity-70 hover:opacity-100"
            )}
            onClick={() => handleThumbnailClick(image)}
          >
            <Image
              src={image.src}
              alt={`Thumbnail ${image.alt}`}
              className="object-cover"
              fill
              sizes="80px"
            />
          </button>
        ))}
      </div>
    </div>
  );
}