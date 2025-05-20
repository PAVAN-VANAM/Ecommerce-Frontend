
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Filter, SlidersHorizontal, ChevronDown, X, Check } from 'lucide-react';
import Layout from '@/components/Layout';
import ProductCard from '@/components/ProductCard';
import { useShop } from '@/context/ShopContext';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';

const ProductListing = () => {
  const { filteredProducts, products, filterProducts } = useShop();
  const [searchParams, setSearchParams] = useSearchParams();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [sortBy, setSortBy] = useState<string>("featured");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 5000]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  // Get all unique brands and categories
  const brands = Array.from(new Set(products.map(p => p.brand || ''))).filter(Boolean);
  const categories = Array.from(new Set(products.map(p => p.category)));

  // Apply category filter from URL params on component mount
  useEffect(() => {
    const categoryParam = searchParams.get('category');
    if (categoryParam) {
      filterProducts(categoryParam);
      setSelectedCategories([categoryParam]);
    }
  }, [searchParams, filterProducts]);

  // Apply filters and sorting to products
  const [displayedProducts, setDisplayedProducts] = useState(filteredProducts);

  useEffect(() => {
    let result = [...filteredProducts];
    
    // Filter by brand
    if (selectedBrands.length > 0) {
      result = result.filter(p => p.brand && selectedBrands.includes(p.brand));
    }
    
    // Filter by category
    if (selectedCategories.length > 0) {
      result = result.filter(p => selectedCategories.includes(p.category));
    }
    
    // Filter by price
    result = result.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);
    
    // Sort
    result = sortProducts(result, sortBy);
    
    setDisplayedProducts(result);
  }, [filteredProducts, selectedBrands, selectedCategories, priceRange, sortBy]);

  const sortProducts = (products: any[], sortType: string) => {
    switch (sortType) {
      case 'price-asc':
        return [...products].sort((a, b) => a.price - b.price);
      case 'price-desc':
        return [...products].sort((a, b) => b.price - a.price);
      case 'rating':
        return [...products].sort((a, b) => (b.rating || 0) - (a.rating || 0));
      case 'discount':
        return [...products].sort((a, b) => (b.discountPercentage || 0) - (a.discountPercentage || 0));
      case 'featured':
      default:
        return products;
    }
  };
  
  const toggleBrandFilter = (brand: string) => {
    setSelectedBrands(prev => 
      prev.includes(brand) 
        ? prev.filter(b => b !== brand) 
        : [...prev, brand]
    );
  };
  
  const toggleCategoryFilter = (category: string) => {
    setSelectedCategories(prev => {
      const newCategories = prev.includes(category) 
        ? prev.filter(c => c !== category) 
        : [...prev, category];
      
      // Update URL
      if (newCategories.length === 1) {
        setSearchParams({ category: newCategories[0] });
      } else if (newCategories.length === 0) {
        setSearchParams({});
      }
      
      return newCategories;
    });
    
    // Apply filter to context
    if (!selectedCategories.includes(category)) {
      filterProducts(category);
    } else {
      filterProducts('all');
    }
  };
  
  const clearFilters = () => {
    setSelectedBrands([]);
    setSelectedCategories([]);
    setPriceRange([0, 5000]);
    setSortBy('featured');
    filterProducts('all');
    setSearchParams({});
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold">Products</h1>
          <p className="text-flipkart-gray">{displayedProducts.length} results found</p>
        </div>
        
        {/* Mobile filter controls */}
        <div className="md:hidden flex items-center justify-between mb-4">
          <Button 
            variant="outline" 
            size="sm"
            className="flex items-center"
            onClick={() => setIsFilterOpen(!isFilterOpen)}
          >
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </Button>
          
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="featured">Featured</SelectItem>
              <SelectItem value="price-asc">Price: Low to High</SelectItem>
              <SelectItem value="price-desc">Price: High to Low</SelectItem>
              <SelectItem value="rating">Highest Rated</SelectItem>
              <SelectItem value="discount">Highest Discount</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar for filters - Desktop */}
          <aside className="hidden md:block w-64 bg-white p-4 rounded-md shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium flex items-center">
                <SlidersHorizontal className="h-4 w-4 mr-2" />
                Filters
              </h3>
              <button 
                onClick={clearFilters}
                className="text-flipkart-blue text-sm hover:underline"
              >
                Clear All
              </button>
            </div>
            
            {/* Price Range Filter */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-sm font-medium">Price Range</h4>
                <span className="text-xs text-flipkart-gray">
                  ₹{priceRange[0]} - ₹{priceRange[1]}
                </span>
              </div>
              <Slider
                defaultValue={[priceRange[0], priceRange[1]]}
                max={5000}
                step={100}
                value={[priceRange[0], priceRange[1]]}
                onValueChange={(value) => setPriceRange(value as [number, number])}
                className="my-4"
              />
            </div>
            
            {/* Category Filter */}
            <div className="mb-6">
              <h4 className="text-sm font-medium mb-2">Categories</h4>
              <div className="space-y-2 max-h-40 overflow-y-auto">
                {categories.map((category) => (
                  <div key={category} className="flex items-center">
                    <Checkbox 
                      id={`category-${category}`} 
                      checked={selectedCategories.includes(category)}
                      onCheckedChange={() => toggleCategoryFilter(category)}
                    />
                    <label 
                      htmlFor={`category-${category}`}
                      className="ml-2 text-sm capitalize cursor-pointer"
                    >
                      {category}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Brand Filter */}
            <div className="mb-4">
              <h4 className="text-sm font-medium mb-2">Brands</h4>
              <div className="space-y-2 max-h-40 overflow-y-auto">
                {brands.map((brand) => (
                  <div key={brand} className="flex items-center">
                    <Checkbox 
                      id={`brand-${brand}`} 
                      checked={selectedBrands.includes(brand)}
                      onCheckedChange={() => toggleBrandFilter(brand)}
                    />
                    <label 
                      htmlFor={`brand-${brand}`}
                      className="ml-2 text-sm cursor-pointer"
                    >
                      {brand}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </aside>
          
          {/* Mobile filter sidebar */}
          {isFilterOpen && (
            <div className="md:hidden fixed inset-0 bg-black/50 z-50 flex">
              <div className="w-4/5 max-w-xs bg-white h-full overflow-y-auto ml-auto animate-slide-in">
                <div className="p-4 border-b">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium">Filters</h3>
                    <button onClick={() => setIsFilterOpen(false)}>
                      <X className="h-5 w-5" />
                    </button>
                  </div>
                </div>
                
                <div className="p-4">
                  {/* Price Range Filter - Mobile */}
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-sm font-medium">Price Range</h4>
                      <span className="text-xs text-flipkart-gray">
                        ₹{priceRange[0]} - ₹{priceRange[1]}
                      </span>
                    </div>
                    <Slider
                      defaultValue={[priceRange[0], priceRange[1]]}
                      max={5000}
                      step={100}
                      value={[priceRange[0], priceRange[1]]}
                      onValueChange={(value) => setPriceRange(value as [number, number])}
                      className="my-4"
                    />
                  </div>
                  
                  {/* Category Filter - Mobile */}
                  <div className="mb-6">
                    <h4 className="text-sm font-medium mb-2">Categories</h4>
                    <div className="space-y-2 max-h-40 overflow-y-auto">
                      {categories.map((category) => (
                        <div key={category} className="flex items-center">
                          <Checkbox 
                            id={`mobile-category-${category}`} 
                            checked={selectedCategories.includes(category)}
                            onCheckedChange={() => toggleCategoryFilter(category)}
                          />
                          <label 
                            htmlFor={`mobile-category-${category}`}
                            className="ml-2 text-sm capitalize cursor-pointer"
                          >
                            {category}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Brand Filter - Mobile */}
                  <div className="mb-4">
                    <h4 className="text-sm font-medium mb-2">Brands</h4>
                    <div className="space-y-2 max-h-40 overflow-y-auto">
                      {brands.map((brand) => (
                        <div key={brand} className="flex items-center">
                          <Checkbox 
                            id={`mobile-brand-${brand}`} 
                            checked={selectedBrands.includes(brand)}
                            onCheckedChange={() => toggleBrandFilter(brand)}
                          />
                          <label 
                            htmlFor={`mobile-brand-${brand}`}
                            className="ml-2 text-sm cursor-pointer"
                          >
                            {brand}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="p-4 border-t flex justify-between">
                  <Button variant="outline" size="sm" onClick={clearFilters}>
                    Clear All
                  </Button>
                  <Button onClick={() => setIsFilterOpen(false)}>Apply Filters</Button>
                </div>
              </div>
            </div>
          )}
          
          {/* Product grid */}
          <div className="flex-1">
            {/* Desktop sort controls */}
            <div className="hidden md:flex items-center justify-between mb-4 bg-white p-3 rounded-md shadow-sm">
              <span className="text-sm text-flipkart-gray">
                {displayedProducts.length} results found
              </span>
              <div className="flex items-center">
                <span className="text-sm mr-2">Sort By:</span>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Featured" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="featured">Featured</SelectItem>
                    <SelectItem value="price-asc">Price: Low to High</SelectItem>
                    <SelectItem value="price-desc">Price: High to Low</SelectItem>
                    <SelectItem value="rating">Highest Rated</SelectItem>
                    <SelectItem value="discount">Highest Discount</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            {displayedProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {displayedProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="bg-white p-8 rounded-md shadow-sm text-center">
                <h3 className="text-xl font-medium mb-2">No Products Found</h3>
                <p className="text-flipkart-gray mb-4">
                  We couldn't find any products matching your filters.
                </p>
                <Button onClick={clearFilters}>Clear All Filters</Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductListing;
