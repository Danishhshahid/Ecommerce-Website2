import { getProducts } from '@/lib/getProducts'; 
import SlugPage from './slugPage'; 
import { ProductType } from '../../../type/product';

interface ProductPageProps {
  params: Promise<{ slug: string; }>; 
}

export default async function Page({ params }: ProductPageProps) {
  const { slug } =await params; // Direct access to slug

  // Fetch the product data from Sanity (async operation)
  let product: ProductType | null = null;
  try {
    product = await getProducts(slug); // Fetch product using the slug
  } catch (error) {
    console.error('Error fetching product:', error);
  }

  if (!product) {
    return <div>Product not found.</div>; // Error handling if product is not found
  }

  return (
    <div>
      {/* Pass the fetched product data to SlugPage component */}
      <SlugPage product={product} />
    </div>
  );
}