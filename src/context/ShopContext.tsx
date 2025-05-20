
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { toast } from "sonner";

// Define Types
export type Product = {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage?: number;
  rating?: number;
  stock?: number;
  brand?: string;
  category: string;
  thumbnail: string;
  images: string[];
};

type CartItem = {
  product: Product;
  quantity: number;
};

type WishlistItem = Product;

type User = {
  id: string;
  name: string;
  email: string;
};

type ShopContextType = {
  products: Product[];
  filteredProducts: Product[];
  cart: CartItem[];
  wishlist: WishlistItem[];
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  filterProducts: (category: string) => void;
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  updateCartItemQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (productId: number) => void;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  cartTotal: number;
  cartItemsCount: number;
};

// Create Context
const ShopContext = createContext<ShopContextType | null>(null);

// Sample Products Data
const sampleProducts: Product[] = [
  {
    id: 1,
    title: "iPhone 13",
    description: "Apple iPhone 13 with A15 Bionic chip, Super Retina XDR display, and advanced dual-camera system",
    price: 799,
    discountPercentage: 10,
    rating: 4.7,
    stock: 94,
    brand: "Apple",
    category: "smartphones",
    thumbnail: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    images: [
      "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    ]
  },
  {
    id: 2,
    title: "Samsung Galaxy S21",
    description: "Samsung Galaxy S21 with Exynos 2100 processor, Dynamic AMOLED display, and versatile camera",
    price: 699,
    discountPercentage: 15,
    rating: 4.5,
    stock: 80,
    brand: "Samsung",
    category: "smartphones",
    thumbnail: "https://images.unsplash.com/photo-1610792516307-ea5acd9c3b00?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    images: [
      "https://images.unsplash.com/photo-1610792516307-ea5acd9c3b00?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1565849904461-04a58ad377e0?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    ]
  },
  {
    id: 3,
    title: "MacBook Air",
    description: "Apple MacBook Air with M2 chip, 13.6-inch Liquid Retina display, and all-day battery life",
    price: 1199,
    discountPercentage: 5,
    rating: 4.8,
    stock: 50,
    brand: "Apple",
    category: "laptops",
    thumbnail: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    images: [
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1530893609608-32a9af3aa95c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    ]
  },
  {
    id: 4,
    title: "Dell XPS 13",
    description: "Dell XPS 13 with Intel Core i7 processor, 13.4-inch InfinityEdge display, and long battery life",
    price: 999,
    discountPercentage: 8,
    rating: 4.6,
    stock: 62,
    brand: "Dell",
    category: "laptops",
    thumbnail: "https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    images: [
      "https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    ]
  },
  {
    id: 5,
    title: "Apple Watch Series 7",
    description: "Apple Watch Series 7 with Always-On Retina display, ECG app, and health & fitness tracking",
    price: 399,
    discountPercentage: 12,
    rating: 4.7,
    stock: 75,
    brand: "Apple",
    category: "smartwatches",
    thumbnail: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    images: [
      "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    ]
  },
  {
    id: 6,
    title: "Sony WH-1000XM4",
    description: "Sony WH-1000XM4 wireless noise-canceling headphones with exceptional sound quality",
    price: 349,
    discountPercentage: 18,
    rating: 4.9,
    stock: 45,
    brand: "Sony",
    category: "audio",
    thumbnail: "https://images.unsplash.com/photo-1578319439584-104c94d37305?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    images: [
      "https://images.unsplash.com/photo-1578319439584-104c94d37305?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    ]
  },
  {
    id: 7,
    title: "iPad Pro",
    description: "Apple iPad Pro with M2 chip, Liquid Retina XDR display, and Apple Pencil compatibility",
    price: 799,
    discountPercentage: 7,
    rating: 4.7,
    stock: 58,
    brand: "Apple",
    category: "tablets",
    thumbnail: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    images: [
      "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1585790050227-1e3590cf62b0?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    ]
  },
  {
    id: 8,
    title: "Canon EOS R6",
    description: "Canon EOS R6 full-frame mirrorless camera with 4K video and in-body image stabilization",
    price: 2499,
    discountPercentage: 5,
    rating: 4.8,
    stock: 32,
    brand: "Canon",
    category: "cameras",
    thumbnail: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    images: [
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    ]
  }
];

// Provider Component
export const ShopProvider: React.FC<{children: ReactNode}> = ({ children }) => {
  const [products] = useState<Product[]>(sampleProducts);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(sampleProducts);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Calculate cart total
  const cartTotal = cart.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  const cartItemsCount = cart.reduce((count, item) => count + item.quantity, 0);

  // Load from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    const savedWishlist = localStorage.getItem('wishlist');
    const savedUser = localStorage.getItem('user');
    
    if (savedCart) setCart(JSON.parse(savedCart));
    if (savedWishlist) setWishlist(JSON.parse(savedWishlist));
    if (savedUser) setUser(JSON.parse(savedUser));
  }, []);

  // Save to localStorage on state change
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
    if (user) localStorage.setItem('user', JSON.stringify(user));
  }, [cart, wishlist, user]);

  // Filter products by category
  const filterProducts = (category: string) => {
    if (category === "all") {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(products.filter(product => product.category === category));
    }
  };

  // Search products
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredProducts(products);
    } else {
      const query = searchQuery.toLowerCase();
      setFilteredProducts(
        products.filter(
          product => 
            product.title.toLowerCase().includes(query) || 
            product.description.toLowerCase().includes(query) ||
            product.category.toLowerCase().includes(query) ||
            product.brand?.toLowerCase().includes(query)
        )
      );
    }
  }, [searchQuery, products]);

  // Cart Methods
  const addToCart = (product: Product) => {
    const existingItem = cart.find(item => item.product.id === product.id);
    
    if (existingItem) {
      setCart(
        cart.map(item => 
          item.product.id === product.id 
            ? { ...item, quantity: item.quantity + 1 } 
            : item
        )
      );
    } else {
      setCart([...cart, { product, quantity: 1 }]);
    }
    
    toast.success(`${product.title} added to cart`);
  };

  const removeFromCart = (productId: number) => {
    setCart(cart.filter(item => item.product.id !== productId));
    toast.info(`Item removed from cart`);
  };

  const updateCartItemQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    
    setCart(
      cart.map(item => 
        item.product.id === productId 
          ? { ...item, quantity } 
          : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
    toast.info('Cart cleared');
  };

  // Wishlist Methods
  const addToWishlist = (product: Product) => {
    const existingItem = wishlist.find(item => item.id === product.id);
    
    if (!existingItem) {
      setWishlist([...wishlist, product]);
      toast.success(`${product.title} added to wishlist`);
    }
  };

  const removeFromWishlist = (productId: number) => {
    setWishlist(wishlist.filter(item => item.id !== productId));
    toast.info(`Item removed from wishlist`);
  };

  // Auth Methods
  const login = async (email: string, password: string) => {
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock successful login
      setUser({
        id: '1',
        name: 'John Doe',
        email: email,
      });
      
      toast.success('Logged in successfully');
    } catch (error) {
      toast.error('Login failed');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (name: string, email: string, password: string) => {
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock successful signup
      setUser({
        id: '1',
        name: name,
        email: email,
      });
      
      toast.success('Account created successfully');
    } catch (error) {
      toast.error('Signup failed');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    toast.info('Logged out successfully');
  };

  return (
    <ShopContext.Provider value={{
      products,
      filteredProducts,
      cart,
      wishlist,
      user,
      isAuthenticated: !!user,
      isLoading,
      searchQuery,
      setSearchQuery,
      filterProducts,
      addToCart,
      removeFromCart,
      updateCartItemQuantity,
      clearCart,
      addToWishlist,
      removeFromWishlist,
      login,
      signup,
      logout,
      cartTotal,
      cartItemsCount
    }}>
      {children}
    </ShopContext.Provider>
  );
};

// Custom hook to use the shop context
export const useShop = () => {
  const context = useContext(ShopContext);
  
  if (!context) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  
  return context;
};
