
import { Link } from 'react-router-dom';
import { Heart, ShoppingCart } from 'lucide-react';
import Layout from '@/components/Layout';
import { useShop } from '@/context/ShopContext';
import { Button } from '@/components/ui/button';

const Wishlist = () => {
  const { wishlist, removeFromWishlist, addToCart } = useShop();

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">My Wishlist ({wishlist.length})</h1>
        
        {wishlist.length === 0 ? (
          <div className="bg-white p-8 rounded-md shadow-sm text-center">
            <Heart className="h-16 w-16 mx-auto text-flipkart-gray mb-4" />
            <h2 className="text-xl font-medium mb-2">Your wishlist is empty</h2>
            <p className="text-flipkart-gray mb-6">Save items that you like in your wishlist and review them anytime.</p>
            <Button asChild>
              <Link to="/products">Continue Shopping</Link>
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {wishlist.map((product) => {
              // Calculate discounted price
              const discountedPrice = product.discountPercentage 
                ? Math.round(product.price * (1 - product.discountPercentage / 100)) 
                : product.price;
              
              return (
                <div key={product.id} className="bg-white rounded-md shadow-sm overflow-hidden">
                  <div className="relative">
                    <Link to={`/product/${product.id}`}>
                      <img 
                        src={product.thumbnail} 
                        alt={product.title} 
                        className="w-full h-48 object-cover"
                      />
                    </Link>
                    
                    {product.discountPercentage && (
                      <div className="absolute top-0 left-0 bg-flipkart-green text-white text-xs font-medium px-2 py-1 rounded-br">
                        {Math.round(product.discountPercentage)}% OFF
                      </div>
                    )}
                    
                    <button 
                      onClick={() => removeFromWishlist(product.id)}
                      className="absolute top-2 right-2 bg-white rounded-full p-1.5 shadow-md hover:bg-gray-100 transition-colors text-red-500"
                      aria-label="Remove from wishlist"
                    >
                      <Heart className="h-4 w-4 fill-current" />
                    </button>
                  </div>
                  
                  <div className="p-4">
                    <Link to={`/product/${product.id}`}>
                      <h3 className="font-medium text-flipkart-dark text-sm mb-1 line-clamp-2 h-10">
                        {product.title}
                      </h3>
                    </Link>
                    
                    {product.brand && (
                      <p className="text-flipkart-gray text-xs mb-2">{product.brand}</p>
                    )}
                    
                    <div className="flex items-center mb-3">
                      <span className="font-bold text-base mr-2">₹{discountedPrice}</span>
                      {product.discountPercentage && (
                        <span className="text-flipkart-gray line-through text-sm">₹{product.price}</span>
                      )}
                    </div>
                    
                    <Button 
                      onClick={() => addToCart(product)}
                      className="w-full bg-flipkart-orange hover:bg-flipkart-orange/90 text-white flex items-center justify-center gap-2"
                      size="sm"
                    >
                      <ShoppingCart className="h-4 w-4" />
                      Add to Cart
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Wishlist;
