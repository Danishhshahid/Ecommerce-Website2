"use client";
import React, { useEffect, useState } from "react";
import BestsellingCard from "../components/ProductCard";
import { client } from "../../sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { ProductType } from "../../type/product";
import PaginationComponent from "../components/pagination";
import { Flip, ToastContainer } from "react-toastify";

const CategoryPage = ({ params }: { params: { category: string } }) => {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1); // Track the current page
    const [productsPerPage] = useState(6); // Number of products per page

  // Normalize both URL param and Sanity categories
  const normalizeCategory = (category: string) => {
    return category
      
      
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const query = `*[_type == "product" && lower(category) match $category] {
          _id,
          productName,
          category,
          price,
          image,
          slug
        }`;

        const normalizedCategory = normalizeCategory(params.category) + "*";
        
        const data = await client.fetch(query, {
          category: normalizedCategory
        });
        console.log(normalizedCategory)
        console.log(data)
        setProducts(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, [params.category]);
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800 mx-5 mb-6 capitalize">
        {params.category.replace(/-/g, " ")}
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {products.length > 0 ? (
          currentProducts.map((product) => (
            <div
              key={product._id}
              className="transition-transform transform hover:scale-105 w-auto md:max-w-[300px]"
            >
              <BestsellingCard
                src={urlFor(product.image).url()}
                alt={product.productName}
                title={product.productName}
                price={product.price}
                category={product.category}
                slug={product.slug.current}
              />
            </div>
            
          ))
          
        ) : (
          <div className="col-span-full text-center py-12">
            <p className="text-gray-500 text-lg">No products found in this category</p>
          </div>
        )}
      </div>
      <ToastContainer
    position="bottom-right"
    autoClose={1000}
    hideProgressBar={false}
    closeOnClick
    draggable={false}
    pauseOnHover={false}
    theme="light"
    transition={Flip}
  />
        <PaginationComponent
              currentPage={currentPage}
              totalPages={Math.ceil(products.length / productsPerPage)}
              onPageChange={paginate}
            />
    </div>
  );
};

export default CategoryPage;