
import { Link } from 'react-router-dom';
import { Package, ChevronRight, Truck, Check, ShoppingBag } from 'lucide-react';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';

const Orders = () => {
  // Mock orders data
  const orders = [
    {
      id: 'OD123456789',
      date: '15 May 2024',
      total: 1299,
      status: 'Delivered',
      deliveredDate: '18 May 2024',
      items: [
        {
          id: 1,
          name: 'iPhone 13',
          price: 799,
          image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=200&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
          quantity: 1
        },
        {
          id: 3,
          name: 'MacBook Air',
          price: 500,
          image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=200&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
          quantity: 1
        }
      ],
      shippingAddress: {
        name: 'John Doe',
        address: '123 Main St, Apartment 4B',
        city: 'Mumbai',
        state: 'Maharashtra',
        pincode: '400001',
        phone: '9876543210',
      },
      paymentMethod: 'Credit Card',
    },
    {
      id: 'OD987654321',
      date: '28 April 2024',
      total: 349,
      status: 'Processing',
      deliveredDate: null,
      items: [
        {
          id: 6,
          name: 'Sony WH-1000XM4',
          price: 349,
          image: 'https://images.unsplash.com/photo-1578319439584-104c94d37305?w=200&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
          quantity: 1
        }
      ],
      shippingAddress: {
        name: 'John Doe',
        address: '456 Park Avenue',
        city: 'Bangalore',
        state: 'Karnataka',
        pincode: '560001',
        phone: '9876543211',
      },
      paymentMethod: 'UPI',
    }
  ];

  if (orders.length === 0) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-2xl font-bold mb-6">My Orders</h1>
          <div className="bg-white p-8 rounded-md shadow-sm text-center">
            <ShoppingBag className="h-16 w-16 mx-auto text-flipkart-gray mb-4" />
            <h2 className="text-xl font-medium mb-2">No orders yet</h2>
            <p className="text-flipkart-gray mb-6">Looks like you haven't placed any orders yet.</p>
            <Button asChild>
              <Link to="/products">Start Shopping</Link>
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">My Orders</h1>
        
        <div className="space-y-6">
          {orders.map((order) => (
            <div key={order.id} className="bg-white rounded-md shadow-sm overflow-hidden">
              {/* Order Header */}
              <div className="p-4 border-b bg-flipkart-light flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                <div>
                  <div className="flex items-center">
                    <span className="font-medium">Order #{order.id}</span>
                    <span className={`ml-3 px-2 py-0.5 rounded-full text-xs font-medium ${
                      order.status === 'Delivered' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {order.status}
                    </span>
                  </div>
                  <div className="text-sm text-flipkart-gray">Placed on {order.date}</div>
                </div>
                
                <div className="flex items-center">
                  <Button asChild size="sm" variant="outline">
                    <Link to={`/order/${order.id}`}>
                      View Details
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </Link>
                  </Button>
                </div>
              </div>
              
              {/* Order Items */}
              <div className="p-4">
                {/* Order Status Bar - For Processing Orders */}
                {order.status === 'Processing' && (
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="text-sm font-medium">Order Placed</div>
                      <div className="text-sm font-medium">Processing</div>
                      <div className="text-sm font-medium text-flipkart-gray">Shipped</div>
                      <div className="text-sm font-medium text-flipkart-gray">Delivered</div>
                    </div>
                    <div className="relative">
                      <div className="h-1 bg-gray-200 rounded-full"></div>
                      <div className="absolute top-0 left-0 h-1 bg-flipkart-blue rounded-full" style={{ width: '40%' }}></div>
                      <div className="absolute top-0 left-0 h-3 w-3 bg-flipkart-blue rounded-full -mt-1"></div>
                      <div className="absolute top-0 left-1/3 h-3 w-3 bg-flipkart-blue rounded-full -mt-1"></div>
                      <div className="absolute top-0 left-2/3 h-3 w-3 bg-gray-200 rounded-full -mt-1"></div>
                      <div className="absolute top-0 right-0 h-3 w-3 bg-gray-200 rounded-full -mt-1"></div>
                    </div>
                  </div>
                )}
                
                {/* Order Status - For Delivered Orders */}
                {order.status === 'Delivered' && (
                  <div className="mb-4 bg-green-50 p-3 rounded-md flex items-center">
                    <div className="h-8 w-8 bg-green-500 rounded-full flex items-center justify-center mr-3">
                      <Check className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <div className="font-medium text-green-700">Delivered on {order.deliveredDate}</div>
                      <div className="text-xs text-green-600">Your item has been delivered</div>
                    </div>
                  </div>
                )}
                
                {/* Order Items */}
                <div className="space-y-4">
                  {order.items.map((item) => (
                    <div key={item.id} className="flex border-b last:border-b-0 pb-4 last:pb-0">
                      <img 
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-contain border rounded mr-3"
                      />
                      <div>
                        <Link to={`/product/${item.id}`} className="font-medium hover:text-flipkart-blue">
                          {item.name}
                        </Link>
                        <div className="text-sm text-flipkart-gray mt-1">Quantity: {item.quantity}</div>
                        <div className="font-medium mt-1">₹{item.price}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Order Footer */}
              <div className="p-4 bg-flipkart-light/50 border-t flex flex-col md:flex-row justify-between">
                <div className="flex items-center mb-3 md:mb-0">
                  <Package className="h-5 w-5 text-flipkart-blue mr-2" />
                  <span className="text-sm font-medium">Total: ₹{order.total}</span>
                </div>
                
                <div className="flex space-x-3">
                  {order.status === 'Delivered' ? (
                    <Button size="sm" className="bg-flipkart-blue hover:bg-flipkart-blue/90">
                      Buy Again
                    </Button>
                  ) : (
                    <Button size="sm" variant="outline" className="flex items-center">
                      <Truck className="h-4 w-4 mr-2" /> 
                      Track Order
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Orders;
