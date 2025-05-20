
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import Layout from '@/components/Layout';
import ProductCard from '@/components/ProductCard';
import { useShop } from '@/context/ShopContext';
import { Button } from '@/components/ui/button';

const Index = () => {
  const { products, filterProducts } = useShop();
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    // Extract unique categories from products
    const uniqueCategories = Array.from(
      new Set(products.map(product => product.category))
    );
    setCategories(uniqueCategories);
  }, [products]);

const categoryImages: Record<string, string> = {
  smartphones: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
  laptops: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8',
  cameras: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
  audio: 'https://images.unsplash.com/photo-1578319439584-104c94d37305?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
  smartwatches: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
  tablets: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8',
  clothing: 'https://images.unsplash.com/photo-1495020689067-958852a7765e',
  furniture: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7',
  kitchen: 'https://images.unsplash.com/photo-1600891964599-f61ba0e24092',
  toys: 'https://images.unsplash.com/photo-1601758123927-1965b8d3f4f4',
  books: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f',
  fitness: 'https://images.unsplash.com/photo-1583454110558-4a9c35084f50',
};

const defaultImage = 'https://images.unsplash.com/photo-1593642634367-d91a135587b5'; // fallback

  // Featured and recent products
  const featuredProducts = products.slice(0, 4);
  const recentProducts = products.slice(4, 8).reverse();

  return (
    <Layout>
      {/* Hero Slider */}
      <section className="relative h-72 md:h-96 overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="./S25_Titanium_PDP_1600x864.jpg" 
            alt="Featured Deals" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent flex items-center">
            <div className="container mx-auto px-4">
              <div className="max-w-md">
                <h1 className="text-white text-2xl md:text-4xl font-bold mb-2">Shop the Latest Tech</h1>
                <p className="text-white/80 mb-4 text-sm md:text-base">Get amazing deals on top electronics and gadgets</p>
                <Button asChild className="bg-flipkart-orange hover:bg-flipkart-orange/90">
                  <Link to="/products">Shop Now</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-8 bg-flipkart-light">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-medium">Shop By Category</h2>
            <Link to="/products" className="text-flipkart-blue flex items-center text-sm hover:underline">
              View All <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {categories.map((category) => (
              <Link 
                to={`/products?category=${category}`} 
                key={category}
                onClick={() => filterProducts(category)}
                className="bg-white rounded-md shadow p-4 flex flex-col items-center text-center hover:shadow-md transition-shadow"
              >
                <div className="w-16 h-16 rounded-full bg-flipkart-light flex items-center justify-center mb-3">
                <img 
  src={categoryImages[category]}
  alt={category}
  className="w-10 h-10 object-contain"
/>
                </div>
                <span className="font-medium capitalize">{category}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-medium">Top Deals</h2>
            <Link to="/products" className="text-flipkart-blue flex items-center text-sm hover:underline">
              View All <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Middle Banner */}
      <section className="py-6 bg-flipkart-blue text-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-6 md:mb-0 md:mr-6">
              <h3 className="text-2xl font-bold mb-2">Summer Sale Is On!</h3>
              <p className="mb-4 opacity-80">Get up to 50% off on premium products</p>
              <Button asChild variant="secondary" className="bg-white text-flipkart-blue hover:bg-gray-100">
                <Link to="/products">Explore Offers</Link>
              </Button>
            </div>
            <img 
              src="./S25_Titanium_PDP_1600x864.jpg" 
              alt="Summer Sale" 
              className="w-full md:w-1/2 lg:w-1/3 rounded-md h-40 md:h-48 object-cover"
            />
          </div>
        </div>
      </section>

      {/* New Arrivals */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-medium">New Arrivals</h2>
            <Link to="/products" className="text-flipkart-blue flex items-center text-sm hover:underline">
              View All <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {recentProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-10 bg-flipkart-light">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-md shadow-sm text-center">
              <div className="w-12 h-12 mx-auto bg-flipkart-blue/10 rounded-full flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-flipkart-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <h3 className="font-medium mb-2">Fast Delivery</h3>
              <p className="text-flipkart-gray text-sm">Guaranteed delivery within 24-48 hours</p>
            </div>
            <div className="bg-white p-6 rounded-md shadow-sm text-center">
              <div className="w-12 h-12 mx-auto bg-flipkart-blue/10 rounded-full flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-flipkart-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"></path>
                </svg>
              </div>
              <h3 className="font-medium mb-2">Secure Payment</h3>
              <p className="text-flipkart-gray text-sm">Multiple payment options available</p>
            </div>
            <div className="bg-white p-6 rounded-md shadow-sm text-center">
              <div className="w-12 h-12 mx-auto bg-flipkart-blue/10 rounded-full flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-flipkart-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path>
                </svg>
              </div>
              <h3 className="font-medium mb-2">Quality Products</h3>
              <p className="text-flipkart-gray text-sm">100% genuine products guaranteed</p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
