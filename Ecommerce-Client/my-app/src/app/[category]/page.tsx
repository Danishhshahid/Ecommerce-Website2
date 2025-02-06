"use client";
import React from "react";
import CategoryPage from "./categoryPage";

const Category = ({ params }: { params: Promise<{ category: string }> }) => {
  // Unwrap the params promise
  const resolvedParams = React.use(params);

  return (
    <div className="w-full h-auto flex flex-col gap-8 px-4 sm:px-6 md:px-8 lg:px-12">
      <CategoryPage params={resolvedParams} />
    </div>
  );
};

export default Category;