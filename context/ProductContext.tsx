"use client";

import React, { createContext, useContext, useState, useReducer } from "react";
import { toast } from "sonner";
import { Product, ProductColor, ProductSize } from "@/types/product";

interface CartItem {
  productId: string;
  quantity: number;
  color: ProductColor;
  size: ProductSize;
}

interface ProductContextProps {
  product: Product;
  selectedColor: ProductColor | null;
  selectedSize: ProductSize | null;
  quantity: number;
  cart: CartItem[];
  setSelectedColor: (color: ProductColor) => void;
  setSelectedSize: (size: ProductSize) => void;
  setQuantity: (quantity: number) => void;
  addToCart: () => void;
  removeFromCart: (index: number) => void;
}

type CartAction =
  | { type: "ADD_TO_CART"; payload: CartItem }
  | { type: "REMOVE_FROM_CART"; payload: number }
  | { type: "UPDATE_CART_ITEM"; payload: { index: number; quantity: number } }
  | { type: "CLEAR_CART" };

const ProductContext = createContext<ProductContextProps | undefined>(
  undefined
);

function cartReducer(state: CartItem[], action: CartAction): CartItem[] {
  switch (action.type) {
    case "ADD_TO_CART":
      const existingItemIndex = state.findIndex(
        (item) =>
          item.productId === action.payload.productId &&
          item.color.id === action.payload.color.id &&
          item.size.id === action.payload.size.id
      );

      if (existingItemIndex !== -1) {
        return state.map((item, index) =>
          index === existingItemIndex
            ? { ...item, quantity: item.quantity + action.payload.quantity }
            : item
        );
      }

      return [...state, action.payload];

    case "REMOVE_FROM_CART":
      return state.filter((_, index) => index !== action.payload);

    case "UPDATE_CART_ITEM":
      return state.map((item, index) =>
        index === action.payload.index
          ? { ...item, quantity: action.payload.quantity }
          : item
      );

    case "CLEAR_CART":
      return [];

    default:
      return state;
  }
}

export function ProductProvider({
  children,
  product,
}: {
  children: React.ReactNode;
  product: Product;
}) {
  const [selectedColor, setSelectedColor] = useState<ProductColor | null>(null);
  const [selectedSize, setSelectedSize] = useState<ProductSize | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [cart, dispatch] = useReducer(cartReducer, []);

  const addToCart = () => {
    if (!selectedColor || !selectedSize) {
      toast.error("Please select both color and size");
      return;
    }

    dispatch({
      type: "ADD_TO_CART",
      payload: {
        productId: product.id,
        quantity,
        color: selectedColor,
        size: selectedSize,
      },
    });

    toast.success("Added to cart", {
      description: `${quantity} × ${product.name} (${selectedColor.name}, ${selectedSize.name})`,
    });
  };

  const removeFromCart = (index: number) => {
    dispatch({
      type: "REMOVE_FROM_CART",
      payload: index,
    });

    toast.info("Item removed from cart");
  };

  return (
    <ProductContext.Provider
      value={{
        product,
        selectedColor,
        selectedSize,
        quantity,
        cart,
        setSelectedColor,
        setSelectedSize,
        setQuantity,
        addToCart,
        removeFromCart,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}

export function useProductContext() {
  const context = useContext(ProductContext);
  if (context === undefined) {
    throw new Error("useProductContext must be used within a ProductProvider");
  }
  return context;
}
