import Image from 'next/image';
import { urlFor } from '@/sanity/lib/image';

interface SanityProduct {
  _id: string;
  productName: string;
  price: number;
  description: string;
  image: string;
  sizes?: string[];
  inventory: number;
}

export const Products = ({ products }: { products: SanityProduct[] }) => {
  return (
    <div className="p-6">
      <h2 className="text-4xl font-extrabold mb-8 text-gray-900 text-center">Product Management</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div
            key={product._id}
            className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow flex flex-col items-center md:items-start"
          >
            {product.image && (
              <Image
                src={urlFor(product.image).url()}
                alt={product.productName}
                width={100}
                height={100}
                className="w-full md:w-32 md:h-32 object-cover rounded-xl mb-4 lg:w-[300px] lg:h-auto"
              />
            )}
            <div className="text-center md:text-left w-full">
              <h3 className="font-bold text-xl text-gray-800">{product.productName}</h3>
              <div className="text-gray-700 text-lg font-semibold mt-1">Rs. {product.price.toLocaleString()}</div>
              <p className="text-gray-500 text-sm mt-3 leading-relaxed">{product.description}</p>
              <div className="mt-4">
                <span className="text-gray-700 font-medium">Sizes:</span> <span className="text-gray-600">{product.sizes?.join(', ') || 'N/A'}</span>
              </div>
              <div className="mt-1">
                <span className="text-gray-700 font-medium">Stock:</span> <span className="text-gray-600">{product.inventory}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};