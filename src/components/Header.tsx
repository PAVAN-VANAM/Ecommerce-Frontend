import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, ShoppingCart, Heart, User, LogOut, Menu, X, Package, Brain } from 'lucide-react';
import { useShop } from '@/context/ShopContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Header = () => {
  const {
    searchQuery,
    setSearchQuery,
    cartItemsCount,
    isAuthenticated,
    user,
    logout
  } = useShop();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-turquoise shadow-md py-2' : 'bg-lavender  py-4'
        }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-bold text-white italic">PavanShop - AI</span>
            <span className="text-xs text-flipkart-yellow italic ml-1 mt-1">Explore Plus</span>
          </Link>

          {/* Search Bar - Hide on mobile */}
          <div className="hidden md:flex flex-1 max-w-xl mx-4">
            <div className="relative w-full">
              <Input
                type="text"
                placeholder="Search for products, brands and more"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-l-md rounded-r-none py-2 pl-4 pr-10 bg-white"
              />
              <button
                className="absolute inset-y-0 right-0 flex items-center px-4 bg-white rounded-r-md"
                aria-label="Search"
              >
                <Search className="h-5 w-5 text-flipkart-blue" />
              </button>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-4">
            {!isAuthenticated ? (
              <Link to="/login">
                <Button variant="secondary" className="bg-white text-flipkart-blue hover:bg-gray-100">
                  Login
                </Button>
              </Link>
            ) : (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative text-white hover:bg-flipkart-blue/90">
                    <Avatar className="h-8 w-8 mr-2">
                      <AvatarFallback className="bg-flipkart-yellow text-flipkart-blue">
                        {user?.name?.charAt(0) || 'U'}
                      </AvatarFallback>
                    </Avatar>
                    <span className="hidden sm:inline">{user?.name}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem asChild>
                    <Link to="/account" className="cursor-pointer">
                      <User className="mr-2 h-4 w-4" />
                      My Account
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/orders" className="cursor-pointer">
                      <Package className="mr-2 h-4 w-4" />
                      Orders
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={logout} className="cursor-pointer text-red-500">
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}

            <a href="https://eccomerce-rag-gzi7.vercel.app/" className="relative text-white hover:text-gray-200">
              <Brain className="h-6 w-6" />
            </a>

            <Link to="/wishlist" className="relative text-white hover:text-gray-200">
              <Heart className="h-6 w-6" />
            </Link>

            <Link to="/cart" className="relative text-white hover:text-gray-200">
              <ShoppingCart className="h-6 w-6" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-flipkart-yellow text-flipkart-blue text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItemsCount}
                </span>
              )}
            </Link>
          </nav>

          {/* Mobile menu button */}
          <button onClick={toggleMobileMenu} className="md:hidden text-white">
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Search - Only on mobile */}
        <div className="mt-3 md:hidden">
          <div className="relative">
            <Input
              type="text"
              placeholder="Search products"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-md py-2 pl-4 pr-10 bg-white"
            />
            <button
              className="absolute inset-y-0 right-0 flex items-center px-3"
              aria-label="Search"
            >
              <Search className="h-5 w-5 text-flipkart-blue" />
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute left-0 right-0 top-full bg-white border-t shadow-lg animate-slide-in">
            <div className="flex flex-col divide-y">
              <Link
                to="/"
                className="px-5 py-3 text-flipkart-dark hover:bg-gray-100"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </Link>

              {!isAuthenticated ? (
                <Link
                  to="/login"
                  className="px-5 py-3 text-flipkart-dark hover:bg-gray-100"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Login
                </Link>
              ) : (
                <>
                  <Link
                    to="/account"
                    className="px-5 py-3 text-flipkart-dark hover:bg-gray-100"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    My Account
                  </Link>
                  <Link
                    to="/orders"
                    className="px-5 py-3 text-flipkart-dark hover:bg-gray-100"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    My Orders
                  </Link>
                  <button
                    onClick={() => {
                      logout();
                      setIsMobileMenuOpen(false);
                    }}
                    className="px-5 py-3 text-left text-red-500 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </>
              )}

              <Link
                to="/wishlist"
                className="px-5 py-3 text-flipkart-dark hover:bg-gray-100 flex items-center"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Heart className="h-5 w-5 mr-2" />
                Wishlist
              </Link>

              <a
                href='https://eccomerce-rag-gzi7.vercel.app/'
                className="px-5 py-3 text-flipkart-dark hover:bg-gray-100 flex items-center"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Brain className="h-5 w-5 mr-2" />
                AI Chat
              </a>

              <Link
                to="/cart"
                className="px-5 py-3 text-flipkart-dark hover:bg-gray-100 flex items-center"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <ShoppingCart className="h-5 w-5 mr-2" />
                Cart {cartItemsCount > 0 && `(${cartItemsCount})`}
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
