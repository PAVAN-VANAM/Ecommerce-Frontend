import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, MapPin, ShoppingBag, Heart, LogOut } from 'lucide-react';
import Layout from '@/components/Layout';
import { useShop } from '@/context/ShopContext';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

const Account = () => {
  const navigate = useNavigate();
  const { user, logout, isAuthenticated } = useShop();
  
  // Redirect if not authenticated
  if (!isAuthenticated) {
    navigate('/login');
    return null;
  }
  
  // User profile form state
  const [profileForm, setProfileForm] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '',
  });
  
  // Address form state
  const [addressForm, setAddressForm] = useState({
    fullName: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    isDefault: false,
  });
  
  // Handle profile form change
  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfileForm({
      ...profileForm,
      [e.target.name]: e.target.value,
    });
  };
  
  // Handle profile form submit
  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Profile updated successfully');
  };
  
  // Handle address form change
  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    
    setAddressForm({
      ...addressForm,
      [e.target.name]: value,
    });
  };
  
  // Handle address form submit
  const handleAddressSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Address added successfully');
    
    // Reset form
    setAddressForm({
      fullName: '',
      phone: '',
      address: '',
      city: '',
      state: '',
      pincode: '',
      isDefault: false,
    });
  };
  
  // Mock addresses
  const addresses = [
    {
      id: 1,
      fullName: 'John Doe',
      address: '123 Main St, Apartment 4B',
      city: 'Mumbai',
      state: 'Maharashtra',
      pincode: '400001',
      phone: '9876543210',
      isDefault: true,
    },
    {
      id: 2,
      fullName: 'John Doe',
      address: '456 Park Avenue',
      city: 'Bangalore',
      state: 'Karnataka',
      pincode: '560001',
      phone: '9876543211',
      isDefault: false,
    },
  ];
  
  // Mock orders
  const orders = [
    {
      id: 'OD123456789',
      date: '15 May 2024',
      total: 1299,
      status: 'Delivered',
      items: [
        {
          id: 1,
          name: 'iPhone 13',
          price: 799,
          image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=200&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
        },
        {
          id: 3,
          name: 'MacBook Air',
          price: 500,
          image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=200&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
        }
      ],
    },
    {
      id: 'OD987654321',
      date: '28 April 2024',
      total: 349,
      status: 'Processing',
      items: [
        {
          id: 6,
          name: 'Sony WH-1000XM4',
          price: 349,
          image: 'https://images.unsplash.com/photo-1578319439584-104c94d37305?w=200&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
        }
      ],
    }
  ];
  
  // Handle logout
  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">My Account</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Sidebar - Desktop */}
          <div className="hidden md:block bg-white rounded-md shadow-sm overflow-hidden">
            <div className="bg-flipkart-blue p-4 text-white">
              <div className="flex items-center">
                <div className="h-10 w-10 bg-white text-flipkart-blue rounded-full flex items-center justify-center font-bold mr-3">
                  {user?.name?.charAt(0) || 'U'}
                </div>
                <div>
                  <div className="font-medium">{user?.name}</div>
                  <div className="text-xs opacity-80">{user?.email}</div>
                </div>
              </div>
            </div>
            
            <div className="divide-y">
              <a href="#profile" className="flex items-center px-4 py-3 hover:bg-gray-50">
                <User className="h-5 w-5 text-flipkart-gray mr-3" />
                <span>My Profile</span>
              </a>
              <a href="#addresses" className="flex items-center px-4 py-3 hover:bg-gray-50">
                <MapPin className="h-5 w-5 text-flipkart-gray mr-3" />
                <span>My Addresses</span>
              </a>
              <a href="#orders" className="flex items-center px-4 py-3 hover:bg-gray-50">
                <ShoppingBag className="h-5 w-5 text-flipkart-gray mr-3" />
                <span>My Orders</span>
              </a>
              <a href="/wishlist" className="flex items-center px-4 py-3 hover:bg-gray-50">
                <Heart className="h-5 w-5 text-flipkart-gray mr-3" />
                <span>My Wishlist</span>
              </a>
              <button 
                onClick={handleLogout}
                className="w-full flex items-center px-4 py-3 hover:bg-gray-50 text-red-500"
              >
                <LogOut className="h-5 w-5 mr-3" />
                <span>Logout</span>
              </button>
            </div>
          </div>
          
          {/* Content Area - Both Mobile & Desktop */}
          <div className="md:col-span-3">
            {/* Mobile Tabs */}
            <div className="md:hidden mb-6">
              <Tabs defaultValue="profile">
                <TabsList className="grid grid-cols-3 w-full">
                  <TabsTrigger value="profile">Profile</TabsTrigger>
                  <TabsTrigger value="addresses">Addresses</TabsTrigger>
                  <TabsTrigger value="orders">Orders</TabsTrigger>
                </TabsList>
                
                <TabsContent value="profile">
                  <div id="profile" className="bg-white rounded-md shadow-sm p-4 md:p-6">
                    <h2 className="text-lg font-medium mb-4">Personal Information</h2>
                    
                    <form onSubmit={handleProfileSubmit} className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="name" className="block text-sm font-medium mb-1">Full Name</label>
                          <Input
                            id="name"
                            name="name"
                            value={profileForm.name}
                            onChange={handleProfileChange}
                            placeholder="Your full name"
                          />
                        </div>
                        
                        <div>
                          <label htmlFor="email" className="block text-sm font-medium mb-1">Email Address</label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            value={profileForm.email}
                            onChange={handleProfileChange}
                            placeholder="Your email"
                            disabled
                          />
                          <p className="text-xs text-flipkart-gray mt-1">Email cannot be changed</p>
                        </div>
                        
                        <div>
                          <label htmlFor="phone" className="block text-sm font-medium mb-1">Phone Number</label>
                          <Input
                            id="phone"
                            name="phone"
                            value={profileForm.phone}
                            onChange={handleProfileChange}
                            placeholder="Your phone number"
                          />
                        </div>
                      </div>
                      
                      <div className="pt-4">
                        <Button type="submit">Save Changes</Button>
                      </div>
                    </form>
                  </div>
                </TabsContent>
                
                <TabsContent value="addresses">
                  <div id="addresses" className="bg-white rounded-md shadow-sm p-4 md:p-6">
                    <h2 className="text-lg font-medium mb-4">My Addresses</h2>
                    
                    {/* Existing Addresses */}
                    <div className="space-y-4 mb-6">
                      {addresses.map((address) => (
                        <div key={address.id} className={`border rounded-md p-4 ${address.isDefault ? 'border-flipkart-blue bg-blue-50' : ''}`}>
                          <div className="flex justify-between items-start">
                            <div>
                              <div className="font-medium">{address.fullName}</div>
                              <div className="text-sm mt-1">{address.address}, {address.city}, {address.state} - {address.pincode}</div>
                              <div className="text-sm mt-1">Phone: {address.phone}</div>
                              
                              {address.isDefault && (
                                <span className="inline-block bg-flipkart-blue/10 text-flipkart-blue text-xs px-2 py-0.5 rounded mt-2">
                                  Default
                                </span>
                              )}
                            </div>
                            
                            <div className="flex space-x-2">
                              <Button size="sm" variant="outline">Edit</Button>
                              <Button size="sm" variant="outline" className="text-red-500">Delete</Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    {/* Add New Address Form */}
                    <div className="border-t pt-6">
                      <h3 className="text-md font-medium mb-4">Add New Address</h3>
                      
                      <form onSubmit={handleAddressSubmit} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label htmlFor="fullName" className="block text-sm font-medium mb-1">Full Name</label>
                            <Input
                              id="fullName"
                              name="fullName"
                              value={addressForm.fullName}
                              onChange={handleAddressChange}
                              placeholder="Full name"
                            />
                          </div>
                          
                          <div>
                            <label htmlFor="phone" className="block text-sm font-medium mb-1">Phone Number</label>
                            <Input
                              id="phone"
                              name="phone"
                              value={addressForm.phone}
                              onChange={handleAddressChange}
                              placeholder="10-digit mobile number"
                            />
                          </div>
                          
                          <div className="md:col-span-2">
                            <label htmlFor="address" className="block text-sm font-medium mb-1">Address</label>
                            <Input
                              id="address"
                              name="address"
                              value={addressForm.address}
                              onChange={handleAddressChange}
                              placeholder="House no., Building name, Street, Area"
                            />
                          </div>
                          
                          <div>
                            <label htmlFor="city" className="block text-sm font-medium mb-1">City</label>
                            <Input
                              id="city"
                              name="city"
                              value={addressForm.city}
                              onChange={handleAddressChange}
                              placeholder="City"
                            />
                          </div>
                          
                          <div>
                            <label htmlFor="state" className="block text-sm font-medium mb-1">State</label>
                            <Input
                              id="state"
                              name="state"
                              value={addressForm.state}
                              onChange={handleAddressChange}
                              placeholder="State"
                            />
                          </div>
                          
                          <div>
                            <label htmlFor="pincode" className="block text-sm font-medium mb-1">Pincode</label>
                            <Input
                              id="pincode"
                              name="pincode"
                              value={addressForm.pincode}
                              onChange={handleAddressChange}
                              placeholder="6 digits [0-9] PIN code"
                            />
                          </div>
                        </div>
                        
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            id="isDefault"
                            name="isDefault"
                            checked={addressForm.isDefault}
                            onChange={handleAddressChange}
                            className="h-4 w-4 text-flipkart-blue focus:ring-flipkart-blue rounded"
                          />
                          <label htmlFor="isDefault" className="ml-2 text-sm">Make this my default address</label>
                        </div>
                        
                        <div className="pt-2">
                          <Button type="submit">Save Address</Button>
                        </div>
                      </form>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="orders">
                  <div id="orders" className="bg-white rounded-md shadow-sm p-4 md:p-6">
                    <h2 className="text-lg font-medium mb-4">My Orders</h2>
                    
                    <div className="space-y-4">
                      {orders.map((order) => (
                        <div key={order.id} className="border rounded-md p-4">
                          <div className="flex justify-between items-center border-b pb-3">
                            <div>
                              <div className="font-medium">Order #{order.id}</div>
                              <div className="text-sm text-flipkart-gray">Placed on {order.date}</div>
                            </div>
                            
                            <div className={`px-2 py-1 rounded text-xs font-medium ${
                              order.status === 'Delivered' 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-yellow-100 text-yellow-800'
                            }`}>
                              {order.status}
                            </div>
                          </div>
                          
                          <div className="py-3">
                            {order.items.map((item) => (
                              <div key={item.id} className="flex items-center py-2">
                                <img 
                                  src={item.image}
                                  alt={item.name}
                                  className="w-16 h-16 object-contain border rounded mr-3"
                                />
                                <div>
                                  <div className="font-medium">{item.name}</div>
                                  <div className="text-sm">₹{item.price}</div>
                                </div>
                              </div>
                            ))}
                          </div>
                          
                          <div className="border-t pt-3 flex justify-between items-center">
                            <div className="font-medium">Total: ₹{order.total}</div>
                            <Button size="sm">View Details</Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
            
            {/* Desktop Content (No Tabs) */}
            <div className="hidden md:block space-y-6">
              <div id="profile" className="bg-white rounded-md shadow-sm p-6">
                <h2 className="text-lg font-medium mb-4">Personal Information</h2>
                
                <form onSubmit={handleProfileSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="desktop-name" className="block text-sm font-medium mb-1">Full Name</label>
                      <Input
                        id="desktop-name"
                        name="name"
                        value={profileForm.name}
                        onChange={handleProfileChange}
                        placeholder="Your full name"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="desktop-email" className="block text-sm font-medium mb-1">Email Address</label>
                      <Input
                        id="desktop-email"
                        name="email"
                        type="email"
                        value={profileForm.email}
                        onChange={handleProfileChange}
                        placeholder="Your email"
                        disabled
                      />
                      <p className="text-xs text-flipkart-gray mt-1">Email cannot be changed</p>
                    </div>
                    
                    <div>
                      <label htmlFor="desktop-phone" className="block text-sm font-medium mb-1">Phone Number</label>
                      <Input
                        id="desktop-phone"
                        name="phone"
                        value={profileForm.phone}
                        onChange={handleProfileChange}
                        placeholder="Your phone number"
                      />
                    </div>
                  </div>
                  
                  <div className="pt-4">
                    <Button type="submit">Save Changes</Button>
                  </div>
                </form>
              </div>
              
              <div id="addresses" className="bg-white rounded-md shadow-sm p-6">
                <h2 className="text-lg font-medium mb-4">My Addresses</h2>
                
                {/* Existing Addresses */}
                <div className="space-y-4 mb-6">
                  {addresses.map((address) => (
                    <div key={address.id} className={`border rounded-md p-4 ${address.isDefault ? 'border-flipkart-blue bg-blue-50' : ''}`}>
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="font-medium">{address.fullName}</div>
                          <div className="text-sm mt-1">{address.address}, {address.city}, {address.state} - {address.pincode}</div>
                          <div className="text-sm mt-1">Phone: {address.phone}</div>
                          
                          {address.isDefault && (
                            <span className="inline-block bg-flipkart-blue/10 text-flipkart-blue text-xs px-2 py-0.5 rounded mt-2">
                              Default
                            </span>
                          )}
                        </div>
                        
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline">Edit</Button>
                          <Button size="sm" variant="outline" className="text-red-500">Delete</Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Add New Address Form */}
                <div className="border-t pt-6">
                  <h3 className="text-md font-medium mb-4">Add New Address</h3>
                  
                  <form onSubmit={handleAddressSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="desktop-fullName" className="block text-sm font-medium mb-1">Full Name</label>
                        <Input
                          id="desktop-fullName"
                          name="fullName"
                          value={addressForm.fullName}
                          onChange={handleAddressChange}
                          placeholder="Full name"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="desktop-phone-address" className="block text-sm font-medium mb-1">Phone Number</label>
                        <Input
                          id="desktop-phone-address"
                          name="phone"
                          value={addressForm.phone}
                          onChange={handleAddressChange}
                          placeholder="10-digit mobile number"
                        />
                      </div>
                      
                      <div className="md:col-span-2">
                        <label htmlFor="desktop-address" className="block text-sm font-medium mb-1">Address</label>
                        <Input
                          id="desktop-address"
                          name="address"
                          value={addressForm.address}
                          onChange={handleAddressChange}
                          placeholder="House no., Building name, Street, Area"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="desktop-city" className="block text-sm font-medium mb-1">City</label>
                        <Input
                          id="desktop-city"
                          name="city"
                          value={addressForm.city}
                          onChange={handleAddressChange}
                          placeholder="City"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="desktop-state" className="block text-sm font-medium mb-1">State</label>
                        <Input
                          id="desktop-state"
                          name="state"
                          value={addressForm.state}
                          onChange={handleAddressChange}
                          placeholder="State"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="desktop-pincode" className="block text-sm font-medium mb-1">Pincode</label>
                        <Input
                          id="desktop-pincode"
                          name="pincode"
                          value={addressForm.pincode}
                          onChange={handleAddressChange}
                          placeholder="6 digits [0-9] PIN code"
                        />
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="desktop-isDefault"
                        name="isDefault"
                        checked={addressForm.isDefault}
                        onChange={handleAddressChange}
                        className="h-4 w-4 text-flipkart-blue focus:ring-flipkart-blue rounded"
                      />
                      <label htmlFor="desktop-isDefault" className="ml-2 text-sm">Make this my default address</label>
                    </div>
                    
                    <div className="pt-2">
                      <Button type="submit">Save Address</Button>
                    </div>
                  </form>
                </div>
              </div>
              
              <div id="orders" className="bg-white rounded-md shadow-sm p-6">
                <h2 className="text-lg font-medium mb-4">My Orders</h2>
                
                <div className="space-y-4">
                  {orders.map((order) => (
                    <div key={order.id} className="border rounded-md p-4">
                      <div className="flex justify-between items-center border-b pb-3">
                        <div>
                          <div className="font-medium">Order #{order.id}</div>
                          <div className="text-sm text-flipkart-gray">Placed on {order.date}</div>
                        </div>
                        
                        <div className={`px-2 py-1 rounded text-xs font-medium ${
                          order.status === 'Delivered' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {order.status}
                        </div>
                      </div>
                      
                      <div className="py-3">
                        {order.items.map((item) => (
                          <div key={item.id} className="flex items-center py-2">
                            <img 
                              src={item.image}
                              alt={item.name}
                              className="w-16 h-16 object-contain border rounded mr-3"
                            />
                            <div>
                              <div className="font-medium">{item.name}</div>
                              <div className="text-sm">₹{item.price}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      <div className="border-t pt-3 flex justify-between items-center">
                        <div className="font-medium">Total: ₹{order.total}</div>
                        <Button size="sm">View Details</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Mobile Logout Button */}
            <div className="md:hidden mt-6">
              <Button 
                onClick={handleLogout}
                variant="outline"
                className="w-full text-red-500 border-red-200 hover:bg-red-50"
              >
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Account;
