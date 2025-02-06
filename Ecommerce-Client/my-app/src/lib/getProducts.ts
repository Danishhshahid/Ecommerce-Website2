// lib/productApi.ts

// import { client } from './sanityClient'; // Make sure to configure your sanity client
import { client } from '@/sanity/lib/client';
import { groq } from 'next-sanity';

export const getProducts = async (slug: string) => {
  const query = groq`*[_type == "product" && slug.current == $slug][0]{
    _id,
    productName,
    image,
    price,
    description,
    category,
    slug,
    inventory,
    colors,
    size
  }`;

  try {
    const product = await client.fetch(query, { slug });
    return product;
  } catch (error) {
    console.error('Error fetching product:', error);
    return null;
  }
};
