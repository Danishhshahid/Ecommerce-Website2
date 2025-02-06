// import { client } from './sanityClient'
import { client } from '@/sanity/lib/client';
import { Product } from './type';

// Fetch product data from Sanity
export const fetchProducts = async (): Promise<Product[]> => {
    const query = `*[_type == "product"]{
      _id,
      productName,
      inventory,
      price,
      description,
      category,
      slug,
      colors,
      "imageUrl": image.asset->url
    }`;
  
    try {
      // console.log('Fetching products...');
      const products = await client.fetch(query);
      // console.log('Fetched products:', products);
      return products;
    } catch (error) {
      console.error('Error fetching products:', error);
      return [];
    }
  };
