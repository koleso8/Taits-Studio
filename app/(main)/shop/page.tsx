"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Checkbox } from "@/components/ui/checkbox";
import { getProducts, type Product } from "../../actions/product-actions";
import { Card } from "@/components/Card";

export default function ShopPage() {
  // State for products
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);

  // Filter states
  const [filters, setFilters] = useState({
    allDesigns: true,
    templates: false,
    originalDesigns: false,
    free: false,
    paid: false,
  });

  // Fetch products on component mount
  useEffect(() => {
    async function loadProducts() {
      try {
        // Получаем дефолтные продукты с сервера
        const defaultProducts = await getProducts();

        // Получаем пользовательские продукты из localStorage
        const storedProducts = localStorage.getItem("user-products");
        let userProducts: Product[] = [];

        if (storedProducts) {
          try {
            userProducts = JSON.parse(storedProducts);
          } catch (error) {
            console.error("Failed to parse stored products:", error);
          }
        }

        // Объединяем дефолтные и пользовательские продукты
        setProducts([...defaultProducts, ...userProducts]);
      } catch (error) {
        console.error("Failed to load products:", error);
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, []);

  // Handle filter changes
  const handleFilterChange = (filterName: string) => {
    if (filterName === "allDesigns") {
      // When "All Designs" is checked, uncheck other design type filters
      setFilters({
        ...filters,
        allDesigns: !filters.allDesigns,
        templates: false,
        originalDesigns: false,
      });
    } else if (filterName === "templates" || filterName === "originalDesigns") {
      // When a specific design type is checked, uncheck "All Designs"
      setFilters({
        ...filters,
        [filterName]: !filters[filterName as keyof typeof filters],
        allDesigns: false,
      });
    } else {
      // For price filters, just toggle the specific filter
      setFilters({
        ...filters,
        [filterName]: !filters[filterName as keyof typeof filters],
      });
    }
  };

  // Filter products based on selected filters
  const filteredProducts = products.filter((product) => {
    // Filter by design type
    const designTypeMatch =
      filters.allDesigns ||
      (filters.templates && product.isTemplate) ||
      (filters.originalDesigns && !product.isTemplate);

    // Filter by price
    const priceMatch =
      (!filters.free && !filters.paid) || // If no price filter is selected, show all
      (filters.free && product.isFree) ||
      (filters.paid && !product.isFree);

    return designTypeMatch && priceMatch;
  });

  return (
    <div className="">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl">Магазин</h1>

      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Filter Sidebar */}
        <div className="w-full md:w-64 shrink-0">
          <Card className="p-6 sticky top-4">
            <h2 className="text-xl font-bold mb-6">ФІЛЬТРУВАТИ</h2>
            <div className="border-[1px] border-white w-full h-[1px] opacity-50 mb-6" />
            <div className="space-y-4">
              <div className="flex items-center">
                <Checkbox
                  id="all-designs"
                  className="border-white data-[state=checked]:bg-white data-[state=checked]:text-pink-500"
                  checked={filters.allDesigns}
                  onCheckedChange={() => handleFilterChange("allDesigns")}
                />
                <label htmlFor="all-designs" className="ml-2 text-sm font-medium">
                  ВСІ ДИЗАЙНИ
                </label>
              </div>

              <div className="border-[1px] border-white w-full h-[1px] opacity-50 mb-6" />

              {/* <div className="flex items-center">
                <Checkbox
                  id="templates"
                  className="border-white data-[state=checked]:bg-white data-[state=checked]:text-pink-500"
                  checked={filters.templates}
                  onCheckedChange={() => handleFilterChange("templates")}
                />
                <label htmlFor="templates" className="ml-2 text-sm font-medium">
                  ШАБЛОНИ
                </label>
              </div> */}

              <div className="flex items-center">
                <Checkbox
                  id="original-designs"
                  className="border-white data-[state=checked]:bg-white data-[state=checked]:text-pink-500"
                  checked={filters.originalDesigns}
                  onCheckedChange={() => handleFilterChange("originalDesigns")}
                />
                <label htmlFor="original-designs" className="ml-2 text-sm font-medium">
                  ОРИГІНАЛЬНІ ДИЗАЙНИ
                </label>
              </div>

              <div className="border-[1px] border-white w-full h-[1px] opacity-50 mb-6" />

              <div className="flex items-center">
                <Checkbox
                  id="free"
                  className="border-white data-[state=checked]:bg-white data-[state=checked]:text-pink-500"
                  checked={filters.free}
                  onCheckedChange={() => handleFilterChange("free")}
                />
                <label htmlFor="free" className="ml-2 text-sm font-medium">
                  БЕЗКОШТОВНІ
                </label>
              </div>

              <div className="flex items-center">
                <Checkbox
                  id="paid"
                  className="border-white data-[state=checked]:bg-white data-[state=checked]:text-pink-500"
                  checked={filters.paid}
                  onCheckedChange={() => handleFilterChange("paid")}
                />
                <label htmlFor="paid" className="ml-2 text-sm font-medium">
                  ПЛАТНІ
                </label>
              </div>
            </div>
          </Card>
        </div>

        {/* Products Grid */}
        <div className="flex-1">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="animate-pulse bg-gray-200 h-48 rounded-md"></div>
              ))}
            </div>
          ) : filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 transition-all ease-linear duration-200 mb-11">
              {filteredProducts.map((product) => (
                <Link key={product.id} href={`/shop/${product.id}`} className="block">
                  <div className="relative group">
                    <Image
                      src={product.image || "/placeholder.svg"}
                      alt={product.title}
                      width={300}
                      height={196}
                      className="shadow-xl hover:shadow-2xl hover:scale-105 transition-all ease-linear duration-200 w-full h-auto object-cover rounded-md max-h-[206px] max-w-[318px]"
                      unoptimized={product.image.startsWith("http")} // Для внешних изображений
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-200 flex items-end justify-start p-4 opacity-0 group-hover:opacity-100">
                      <div className="bg-white bg-opacity-90 p-2 rounded-md">
                        <h3 className="font-medium text-sm truncate max-w-[250px]">{product.title}</h3>
                        <p className="text-xs text-gray-600">
                          {product.isFree ? "Безкоштовно" : `${product.price} грн`}
                        </p>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="flex justify-center items-center h-64">
              <p className="text-xl text-gray-500">Немає товарів, що відповідають вибраним фільтрам</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}