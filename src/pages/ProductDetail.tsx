
import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronLeft, Star, Truck, ShieldCheck, RotateCcw, ShoppingCart, Heart } from 'lucide-react';
import Layout from '@/components/Layout';
import { useShop } from '@/context/ShopContext';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProductCard from '@/components/ProductCard';

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { products, addToCart, addToWishlist } = useShop();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  // Find the product by ID
  const product = products.find(p => p.id === Number(id));

  // Similar products (same category)
  const similarProducts = products
    .filter(p => p.category === product?.category && p.id !== product?.id)
    .slice(0, 4);

  if (!product) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <div className="bg-white p-8 rounded-md shadow-sm text-center">
            <h2 className="text-2xl font-bold mb-4">Product Not Found</h2>
            <p className="mb-4 text-flipkart-gray">The product you're looking for doesn't exist or has been removed.</p>
            <Button asChild>
              <Link to="/products">Continue Shopping</Link>
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  // Calculate discounted price
  const discountedPrice = product.discountPercentage 
    ? Math.round(product.price * (1 - product.discountPercentage / 100)) 
    : product.price;

  const incrementQuantity = () => {
    if (quantity < (product.stock || 10)) {
      setQuantity(quantity + 1);
    }
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-6">
        {/* Breadcrumbs */}
        <div className="mb-4 flex items-center text-sm text-flipkart-gray">
          <Link to="/" className="hover:text-flipkart-blue">Home</Link>
          <span className="mx-2">/</span>
          <Link to="/products" className="hover:text-flipkart-blue">Products</Link>
          <span className="mx-2">/</span>
          <Link to={`/products?category=${product.category}`} className="hover:text-flipkart-blue capitalize">{product.category}</Link>
          <span className="mx-2">/</span>
          <span className="text-flipkart-dark font-medium truncate">{product.title}</span>
        </div>

        {/* Product Detail */}
        <div className="bg-white rounded-md shadow-sm overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 p-4 md:p-6">
            {/* Image Gallery - 1 column on mobile, 2 columns on desktop */}
            <div className="lg:col-span-2 flex flex-col">
              {/* Main Image */}
              <div className="relative mb-4 border rounded-md overflow-hidden h-80">
                <img 
                  src={product.images[selectedImage] || product.thumbnail} 
                  alt={product.title}
                  className="w-full h-full object-contain"
                />
                {product.discountPercentage && (
                  <div className="absolute top-2 left-2 bg-flipkart-green text-white text-xs font-medium px-2 py-1 rounded">
                    {Math.round(product.discountPercentage)}% OFF
                  </div>
                )}
              </div>
              
              {/* Thumbnail Gallery */}
              <div className="flex space-x-2 overflow-x-auto pb-2">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`border rounded min-w-[60px] h-16 ${selectedImage === index ? 'border-flipkart-blue' : 'border-gray-200'}`}
                  >
                    <img 
                      src={image} 
                      alt={`${product.title} - view ${index + 1}`}
                      className="w-full h-full object-contain"
                    />
                  </button>
                ))}
              </div>
              
              {/* Action Buttons - Mobile Only */}
              <div className="flex gap-2 mt-4 lg:hidden">
                <Button 
                  onClick={() => addToCart(product)}
                  className="flex-1 bg-flipkart-orange hover:bg-flipkart-orange/90"
                >
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  Add to Cart
                </Button>
                <Button 
                  onClick={() => addToWishlist(product)}
                  variant="outline"
                  className="flex-1"
                >
                  <Heart className="mr-2 h-4 w-4" />
                  Wishlist
                </Button>
              </div>
            </div>
            
            {/* Product Info - 3 columns on desktop */}
            <div className="lg:col-span-3">
              <h1 className="text-xl md:text-2xl font-medium mb-2">{product.title}</h1>
              
              {/* Ratings */}
              {product.rating && (
                <div className="flex items-center mb-3">
                  <div className="flex items-center bg-flipkart-green text-white text-xs px-1.5 py-0.5 rounded">
                    <span>{product.rating}</span>
                    <Star className="h-3 w-3 ml-0.5 fill-white" />
                  </div>
                  <span className="text-xs text-flipkart-gray ml-2">
                    {Math.round(product.rating * 100)} Ratings
                  </span>
                </div>
              )}
              
              {/* Price */}
              <div className="mb-4">
                <div className="flex items-center">
                  <span className="text-2xl font-bold">₹{discountedPrice}</span>
                  {product.discountPercentage && (
                    <>
                      <span className="text-flipkart-gray line-through ml-2">₹{product.price}</span>
                      <span className="text-flipkart-green ml-2 text-sm">
                        {Math.round(product.discountPercentage)}% off
                      </span>
                    </>
                  )}
                </div>
                <p className="text-xs text-flipkart-green mt-1">
                  inclusive of all taxes
                </p>
              </div>
              
              {/* Description */}
              <p className="text-sm text-flipkart-dark mb-4">
                {product.description}
              </p>
              
              {/* Brand & Availability */}
              <div className="space-y-2 mb-4">
                {product.brand && (
                  <div className="flex">
                    <span className="text-sm text-flipkart-gray w-20">Brand:</span>
                    <span className="text-sm">{product.brand}</span>
                  </div>
                )}
                <div className="flex">
                  <span className="text-sm text-flipkart-gray w-20">Category:</span>
                  <span className="text-sm capitalize">{product.category}</span>
                </div>
                <div className="flex">
                  <span className="text-sm text-flipkart-gray w-20">Availability:</span>
                  <span className={`text-sm ${product.stock && product.stock > 0 ? 'text-flipkart-green' : 'text-red-500'}`}>
                    {product.stock && product.stock > 0 ? `In Stock (${product.stock} items left)` : 'Out of Stock'}
                  </span>
                </div>
              </div>
              
              {/* Quantity Selector */}
              <div className="mb-6">
                <span className="text-sm text-flipkart-gray block mb-2">Quantity:</span>
                <div className="flex items-center">
                  <button 
                    onClick={decrementQuantity}
                    className="w-8 h-8 border border-gray-300 flex items-center justify-center rounded-l-md"
                    disabled={quantity <= 1}
                  >
                    -
                  </button>
                  <div className="w-10 h-8 border-t border-b border-gray-300 flex items-center justify-center">
                    {quantity}
                  </div>
                  <button 
                    onClick={incrementQuantity}
                    className="w-8 h-8 border border-gray-300 flex items-center justify-center rounded-r-md"
                    disabled={quantity >= (product.stock || 10)}
                  >
                    +
                  </button>
                </div>
              </div>
              
              {/* Services */}
              <div className="grid grid-cols-2 gap-3 mb-6">
                <div className="flex items-start text-sm">
                  <Truck className="h-4 w-4 text-flipkart-blue mr-2 mt-0.5" />
                  <div>
                    <p className="font-medium">Free Delivery</p>
                    <p className="text-xs text-flipkart-gray">Delivered in 2-3 days</p>
                  </div>
                </div>
                <div className="flex items-start text-sm">
                  <ShieldCheck className="h-4 w-4 text-flipkart-blue mr-2 mt-0.5" />
                  <div>
                    <p className="font-medium">1 Year Warranty</p>
                    <p className="text-xs text-flipkart-gray">Brand warranty</p>
                  </div>
                </div>
                <div className="flex items-start text-sm">
                  <RotateCcw className="h-4 w-4 text-flipkart-blue mr-2 mt-0.5" />
                  <div>
                    <p className="font-medium">7 Day Replacement</p>
                    <p className="text-xs text-flipkart-gray">Change of mind applicable</p>
                  </div>
                </div>
                <div className="flex items-start text-sm">
                  <ShoppingCart className="h-4 w-4 text-flipkart-blue mr-2 mt-0.5" />
                  <div>
                    <p className="font-medium">Cash on Delivery</p>
                    <p className="text-xs text-flipkart-gray">Available for this product</p>
                  </div>
                </div>
              </div>
              
              {/* Action Buttons - Desktop Only */}
              <div className="hidden lg:flex gap-4">
                <Button 
                  onClick={() => addToCart(product)}
                  className="flex-1 bg-flipkart-orange hover:bg-flipkart-orange/90 py-6"
                >
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  ADD TO CART
                </Button>
                <Button 
                  onClick={() => addToWishlist(product)}
                  variant="outline"
                  className="flex-1 py-6"
                >
                  <Heart className="mr-2 h-5 w-5" />
                  WISHLIST
                </Button>
              </div>
            </div>
          </div>
          
          {/* Product Details Tabs */}
          <div className="border-t">
            <div className="p-4 md:p-6">
              <Tabs defaultValue="description">
                <TabsList className="mb-4">
                  <TabsTrigger value="description">Description</TabsTrigger>
                  <TabsTrigger value="specification">Specification</TabsTrigger>
                  <TabsTrigger value="reviews">Reviews</TabsTrigger>
                </TabsList>
                <TabsContent value="description" className="text-sm text-flipkart-dark">
                  <div className="space-y-4">
                    <p>{product.description}</p>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quam velit, vulputate eu pharetra nec, mattis ac neque. Duis vulputate commodo lectus, ac blandit elit tincidunt id.</p>
                    <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p>
                  </div>
                </TabsContent>
                <TabsContent value="specification">
                  <div className="space-y-4">
                    <div className="bg-flipkart-light/50 p-3 rounded">
                      <h4 className="font-medium mb-2">General</h4>
                      <table className="w-full text-sm">
                        <tbody>
                          <tr className="border-b">
                            <td className="py-2 text-flipkart-gray w-1/3">Brand</td>
                            <td className="py-2">{product.brand}</td>
                          </tr>
                          <tr className="border-b">
                            <td className="py-2 text-flipkart-gray">Model</td>
                            <td className="py-2">{product.title}</td>
                          </tr>
                          <tr className="border-b">
                            <td className="py-2 text-flipkart-gray">Category</td>
                            <td className="py-2 capitalize">{product.category}</td>
                          </tr>
                          <tr>
                            <td className="py-2 text-flipkart-gray">Stock</td>
                            <td className="py-2">{product.stock} units</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    
                    <div className="bg-flipkart-light/50 p-3 rounded">
                      <h4 className="font-medium mb-2">Product Details</h4>
                      <table className="w-full text-sm">
                        <tbody>
                          <tr className="border-b">
                            <td className="py-2 text-flipkart-gray w-1/3">Color</td>
                            <td className="py-2">Black</td>
                          </tr>
                          <tr className="border-b">
                            <td className="py-2 text-flipkart-gray">Material</td>
                            <td className="py-2">Premium Quality</td>
                          </tr>
                          <tr>
                            <td className="py-2 text-flipkart-gray">Included in Box</td>
                            <td className="py-2">Product, User Manual, Warranty Card</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="reviews">
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <div className="mr-4">
                        <div className="text-3xl font-bold">{product.rating} <span className="text-lg">/ 5</span></div>
                        <div className="flex mt-1">
                          {[...Array(5)].map((_, index) => (
                            <Star 
                              key={index}
                              className={`h-4 w-4 ${index < Math.floor(product.rating || 0) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                            />
                          ))}
                        </div>
                        <div className="text-sm text-flipkart-gray mt-1">Based on {Math.round(product.rating! * 100)} reviews</div>
                      </div>
                      
                      <div className="flex-1 space-y-1">
                        {[5, 4, 3, 2, 1].map((star) => (
                          <div key={star} className="flex items-center text-xs">
                            <span className="w-6">{star} ★</span>
                            <div className="h-2 bg-gray-200 rounded-full flex-1 mx-2 overflow-hidden">
                              <div 
                                className={`h-full ${star >= 4 ? 'bg-flipkart-green' : (star >= 3 ? 'bg-yellow-400' : 'bg-red-400')}`}
                                style={{ width: `${
                                  star === 5 ? 65 : 
                                  star === 4 ? 20 : 
                                  star === 3 ? 10 : 
                                  star === 2 ? 4 : 1}%` 
                                }}
                              ></div>
                            </div>
                            <span className="w-8 text-right text-flipkart-gray">
                              {star === 5 ? 65 : 
                               star === 4 ? 20 : 
                               star === 3 ? 10 : 
                               star === 2 ? 4 : 1}%
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    {/* Sample Reviews */}
                    <div className="divide-y">
                      <div className="py-4">
                        <div className="flex items-center mb-2">
                          <span className="bg-flipkart-green text-white text-xs px-1.5 py-0.5 rounded flex items-center">
                            5 <Star className="h-3 w-3 ml-0.5 fill-white" />
                          </span>
                          <h5 className="font-medium ml-2">Great Product</h5>
                        </div>
                        <p className="text-sm text-flipkart-gray mb-1">
                          This is an amazing product! The quality is excellent and it works as expected.
                        </p>
                        <div className="flex items-center text-xs text-flipkart-gray mt-2">
                          <span>John D.</span>
                          <span className="mx-1">|</span>
                          <span>Verified Purchase</span>
                        </div>
                      </div>
                      <div className="py-4">
                        <div className="flex items-center mb-2">
                          <span className="bg-yellow-500 text-white text-xs px-1.5 py-0.5 rounded flex items-center">
                            4 <Star className="h-3 w-3 ml-0.5 fill-white" />
                          </span>
                          <h5 className="font-medium ml-2">Very Good</h5>
                        </div>
                        <p className="text-sm text-flipkart-gray mb-1">
                          The product is good but the delivery was a bit delayed. Otherwise satisfied with the purchase.
                        </p>
                        <div className="flex items-center text-xs text-flipkart-gray mt-2">
                          <span>Sarah M.</span>
                          <span className="mx-1">|</span>
                          <span>Verified Purchase</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
        
        {/* Similar Products */}
        {similarProducts.length > 0 && (
          <div className="mt-8">
            <h2 className="text-xl font-medium mb-4">You may also like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {similarProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default ProductDetail;
