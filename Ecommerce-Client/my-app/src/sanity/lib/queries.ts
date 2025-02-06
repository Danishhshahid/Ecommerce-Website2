import { groq } from "next-sanity";



export const allproducts = groq`*[_type == "product"]`;

export const bestofall = groq`*[_type == "product"][0..5]`;
export const mens = groq`*[_type == "product" && category == "Men's Shoes"]`;
export const womens = groq`*[_type == "product" && category == "Women's Shoes"]`;