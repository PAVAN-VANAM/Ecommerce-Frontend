
import { Link } from 'react-router-dom';
import { Heart, ShoppingCart } from 'lucide-react';
import { useShop, type Product } from '@/context/ShopContext';
import { Button } from '@/components/ui/button';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { addToCart, addToWishlist } = useShop();
  
  // Calculate discounted price
  const discountedPrice = product.discountPercentage 
    ? Math.round(product.price * (1 - product.discountPercentage / 100)) 
    : product.price;

  return (
    <div className="bg-white rounded-md shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="relative">
        {/* Product image with link */}
        <Link to={`/product/${product.id}`}>
          <img 
            src={product.thumbnail} 
            alt={product.title} 
            className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
          />
        </Link>
        
        {/* Discount badge */}
        {product.discountPercentage && (
          <div className="absolute top-0 left-0 bg-flipkart-green text-white text-xs font-medium px-2 py-1 rounded-br">
            {Math.round(product.discountPercentage)}% OFF
          </div>
        )}
        
        {/* Rating badge */}
        {product.rating && (
          <div className="absolute bottom-0 left-0 bg-flipkart-dark/80 text-white text-xs font-medium px-2 py-1 rounded-tr flex items-center">
            {product.rating}
            <svg className="w-3 h-3 text-yellow-400 ml-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
            </svg>
          </div>
        )}
        
        {/* Wishlist button */}
        <button 
          onClick={() => addToWishlist(product)}
          className="absolute top-2 right-2 bg-white rounded-full p-1.5 shadow-md hover:bg-gray-100 transition-colors"
          aria-label="Add to wishlist"
        >
          <Heart className="h-4 w-4 text-flipkart-gray" />
        </button>
      </div>
      
      {/* Product info */}
      <div className="p-4">
        <Link to={`/product/${product.id}`}>
          <h3 className="font-medium text-flipkart-dark text-sm mb-1 line-clamp-2 h-10">
            {product.title}
          </h3>
        </Link>
        
        {/* Brand */}
        {product.brand && (
          <p className="text-flipkart-gray text-xs mb-2">{product.brand}</p>
        )}
        
        {/* Price */}
        <div className="flex items-center mb-3">
          <span className="font-bold text-base mr-2">₹{discountedPrice}</span>
          {product.discountPercentage && (
            <span className="text-flipkart-gray line-through text-sm">₹{product.price}</span>
          )}
        </div>
        
        {/* Add to cart button */}
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
};

export default ProductCard;
