
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Trash2, ShoppingBag } from 'lucide-react';
import Layout from '@/components/Layout';
import { useShop } from '@/context/ShopContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const Cart = () => {
  const { cart, removeFromCart, updateCartItemQuantity, clearCart, cartTotal } = useShop();
  const [couponCode, setCouponCode] = useState('');
  const [couponApplied, setCouponApplied] = useState(false);
  
  // Calculate order summary
  const discount = couponApplied ? Math.round(cartTotal * 0.1) : 0;
  const shipping = cartTotal > 500 ? 0 : 40;
  const totalAmount = cartTotal - discount + shipping;

  const handleApplyCoupon = () => {
    if (couponCode.toUpperCase() === 'SAVE10') {
      setCouponApplied(true);
    }
  };

  if (cart.length === 0) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-2xl font-bold mb-6">My Cart</h1>
          <div className="bg-white p-8 rounded-md shadow-sm text-center">
            <ShoppingBag className="h-16 w-16 mx-auto text-flipkart-gray mb-4" />
            <h2 className="text-xl font-medium mb-2">Your cart is empty</h2>
            <p className="text-flipkart-gray mb-6">Looks like you haven't added anything to your cart yet.</p>
            <Button asChild>
              <Link to="/products">Continue Shopping</Link>
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">My Cart ({cart.length})</h1>
        
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Cart Items */}
          <div className="lg:w-2/3">
            <div className="bg-white rounded-md shadow-sm overflow-hidden">
              {/* Cart Header */}
              <div className="p-4 border-b bg-flipkart-light">
                <div className="flex justify-between">
                  <span className="font-medium">Cart Items</span>
                  <button 
                    onClick={clearCart}
                    className="text-sm text-red-500 hover:text-red-600 flex items-center"
                  >
                    <Trash2 className="h-4 w-4 mr-1" />
                    Clear Cart
                  </button>
                </div>
              </div>
              
              {/* Cart Items List */}
              <div className="divide-y">
                {cart.map((item) => {
                  const discountedPrice = item.product.discountPercentage 
                    ? Math.round(item.product.price * (1 - item.product.discountPercentage / 100)) 
                    : item.product.price;
                  
                  const itemTotal = discountedPrice * item.quantity;
                  
                  return (
                    <div key={item.product.id} className="p-4 flex">
                      {/* Product Image */}
                      <div className="w-24 h-24 flex-shrink-0">
                        <img 
                          src={item.product.thumbnail}
                          alt={item.product.title}
                          className="w-full h-full object-contain"
                        />
                      </div>
                      
                      {/* Product Info */}
                      <div className="ml-4 flex-grow">
                        <Link to={`/product/${item.product.id}`} className="font-medium hover:text-flipkart-blue">
                          {item.product.title}
                        </Link>
                        
                        {item.product.brand && (
                          <p className="text-sm text-flipkart-gray">Brand: {item.product.brand}</p>
                        )}
                        
                        {/* Price */}
                        <div className="flex items-center mt-1">
                          <span className="font-bold">₹{discountedPrice}</span>
                          {item.product.discountPercentage && (
                            <>
                              <span className="text-flipkart-gray line-through ml-2 text-sm">
                                ₹{item.product.price}
                              </span>
                              <span className="text-flipkart-green ml-2 text-xs">
                                {Math.round(item.product.discountPercentage)}% off
                              </span>
                            </>
                          )}
                        </div>
                        
                        {/* Quantity and Remove */}
                        <div className="flex items-center justify-between mt-3">
                          <div className="flex items-center">
                            <button 
                              onClick={() => updateCartItemQuantity(item.product.id, item.quantity - 1)}
                              className="w-8 h-8 border border-gray-300 flex items-center justify-center rounded-l-md"
                              disabled={item.quantity <= 1}
                            >
                              -
                            </button>
                            <div className="w-10 h-8 border-t border-b border-gray-300 flex items-center justify-center">
                              {item.quantity}
                            </div>
                            <button 
                              onClick={() => updateCartItemQuantity(item.product.id, item.quantity + 1)}
                              className="w-8 h-8 border border-gray-300 flex items-center justify-center rounded-r-md"
                              disabled={item.quantity >= (item.product.stock || 10)}
                            >
                              +
                            </button>
                          </div>
                          
                          <button 
                            onClick={() => removeFromCart(item.product.id)}
                            className="text-flipkart-gray hover:text-red-500 text-sm"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                      
                      {/* Item Total - Desktop Only */}
                      <div className="hidden md:flex flex-col items-end justify-start ml-4 min-w-[80px]">
                        <span className="font-bold">₹{itemTotal}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
              
              {/* Order Buttons - Mobile Only */}
              <div className="p-4 border-t md:hidden">
                <Button asChild className="w-full bg-flipkart-orange hover:bg-flipkart-orange/90">
                  <Link to="/checkout">PLACE ORDER</Link>
                </Button>
              </div>
            </div>
          </div>
          
          {/* Order Summary */}
          <div className="lg:w-1/3">
            <div className="bg-white rounded-md shadow-sm overflow-hidden">
              <div className="p-4 border-b bg-flipkart-light">
                <span className="font-medium">Price Details</span>
              </div>
              
              <div className="p-4">
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span>Price ({cart.length} items)</span>
                    <span>₹{cartTotal}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span>Discount</span>
                    <span className="text-flipkart-green">- ₹{discount}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span>Delivery Charges</span>
                    {shipping === 0 ? (
                      <span className="text-flipkart-green">FREE</span>
                    ) : (
                      <span>₹{shipping}</span>
                    )}
                  </div>
                  
                  <div className="border-t border-dashed pt-3 flex justify-between font-medium">
                    <span>Total Amount</span>
                    <span>₹{totalAmount}</span>
                  </div>
                  
                  {discount > 0 && (
                    <div className="text-flipkart-green text-xs">
                      You will save ₹{discount} on this order
                    </div>
                  )}
                </div>
                
                {/* Coupon */}
                <div className="mt-6 border-t pt-4">
                  <span className="font-medium text-sm block mb-3">Apply Coupon</span>
                  <div className="flex">
                    <Input 
                      type="text" 
                      placeholder="Enter coupon code" 
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      className="rounded-r-none"
                    />
                    <Button 
                      onClick={handleApplyCoupon}
                      disabled={couponApplied}
                      className="rounded-l-none min-w-[80px]"
                    >
                      Apply
                    </Button>
                  </div>
                  {couponApplied && (
                    <p className="text-flipkart-green text-xs mt-1">
                      Coupon SAVE10 applied successfully!
                    </p>
                  )}
                  {!couponApplied && (
                    <p className="text-xs text-flipkart-gray mt-1">
                      Try SAVE10 for 10% discount
                    </p>
                  )}
                </div>
                
                {/* Checkout Button - Desktop Only */}
                <div className="mt-6 hidden md:block">
                  <Button asChild className="w-full bg-flipkart-orange hover:bg-flipkart-orange/90 py-6">
                    <Link to="/checkout">PLACE ORDER</Link>
                  </Button>
                </div>
              </div>
            </div>
            
            {/* Secure Info */}
            <div className="mt-4 bg-white rounded-md shadow-sm p-4">
              <div className="flex items-center text-sm text-flipkart-gray">
                <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                </svg>
                Safe and Secure Payments. 100% Authentic products.
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Cart;
