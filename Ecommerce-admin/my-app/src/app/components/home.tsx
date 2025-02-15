'use client';
import { useState, useEffect, useCallback } from 'react';
import { client } from '@/sanity/lib/client';
import {
  UsersIcon,
  ShoppingCartIcon,
  CurrencyDollarIcon,
  CubeIcon,
  PencilIcon,
  ChartBarIcon,
  Bars3Icon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import { CustomersTable } from './customers';
import { OrdersTable } from './orders';
import { Products } from './allProducts';

interface SanityOrder {
  paymentStatus: string;
  _id: string;
  _createdAt: string;
  customer: {
    _ref: string;
    firstName: string;
    lastName: string;
    email?: string;
    number?: number;
  };
  item: {
    quantity: number;
    product_price: number;
    product_description: string;
    size?: string;
    product_image?: string;
    product_name: string;
  }[];
  order_date: string;
}

interface SanityCustomer {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  number: string;
  address: string;
  state: string;
  country: string;
  _createdAt: string;
}

interface SanityProduct {
  _id: string;
  productName: string;
  price: number;
  description: string;
  image: string;
  sizes?: string[];
  inventory: number;
}

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [customers, setCustomers] = useState<SanityCustomer[]>([]);
  const [orders, setOrders] = useState<SanityOrder[]>([]);
  const [products, setProducts] = useState<SanityProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Move queries into useMemo or declare them outside the component
  const fetchOrders = `*[_type == "order"] | order(order_date desc) {
    _id,
    _createdAt,
    customer->{
      _id,
      firstName,
      lastName,
      email,
      number
    },
    item[] {
      quantity,
      product_price,
      product_description,
      size,
      product_image,
      product_name
    },
    order_date
  }`;

  const fetchCustomers = `*[_type == "customer"] | order(_createdAt desc) {
    _id,
    firstName,
    lastName,
    email,
    number,
    address,
    state,
    country,
    _createdAt
  }`;

  const fetchProducts = `*[_type == "product"] | order(_createdAt desc) {
    _id,
    productName,
    price,
    description,
    image,
    sizes,
    inventory
  }`;

  // Create a memoized fetchData function
  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const [ordersData, customersData, productsData] = await Promise.all([
        client.fetch<SanityOrder[]>(fetchOrders),
        client.fetch<SanityCustomer[]>(fetchCustomers),
        client.fetch<SanityProduct[]>(fetchProducts)
      ]);
      
      setOrders(ordersData);
      setCustomers(customersData);
      setProducts(productsData);
      setError(null);
    } catch (err) {
      setError('Failed to fetch data from Sanity');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [fetchOrders, fetchCustomers, fetchProducts]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const totalRevenue = orders.reduce((sum, order) => {
    return sum + order.item.reduce((orderSum, item) => {
      return orderSum + (item.product_price * item.quantity);
    }, 0);
  }, 0);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-red-500 text-xl">{error}</div>
      </div>
    );
  }

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    closeSidebar();
  };

  const dashboardMetrics = [
    {
      icon: UsersIcon,
      title: 'Total Customers',
      value: customers.length,
      bgColor: 'bg-blue-100',
      textColor: 'text-blue-600'
    },
    {
      icon: ShoppingCartIcon,
      title: 'Total Orders',
      value: orders.length,
      bgColor: 'bg-green-100',
      textColor: 'text-green-600'
    },
    {
      icon: CurrencyDollarIcon,
      title: 'Total Revenue',
      value: `$${totalRevenue.toFixed(2)}`,
      bgColor: 'bg-purple-100',
      textColor: 'text-purple-600'
    },
    {
      icon: CubeIcon,
      title: 'Total Products',
      value: products.length,
      bgColor: 'bg-yellow-100',
      textColor: 'text-yellow-600'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Rest of your JSX remains the same */}
      {/* Mobile Hamburger Button */}
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="md:hidden fixed top-20 right-5 z-50 p-2 rounded-lg bg-white shadow-lg"
      >
        {isSidebarOpen ? (
          <XMarkIcon className="w-6 h-6 text-black" />
        ) : (
          <Bars3Icon className="w-6 h-6 text-black" />
        )}
      </button>

      <div className="flex text-black">
        {/* Sidebar */}
        <div className={`
          ${isSidebarOpen ? 'block' : 'hidden'} 
          md:block md:w-64 bg-white border-r shadow-lg fixed md:static top-0 left-0 h-full z-40
        `}>
          <div className="p-4">
            <div className="flex items-center justify-between mb-8">
              <h1 className="text-2xl font-bold text-black">Admin Panel</h1>
              <button onClick={closeSidebar} className="md:hidden">
                <XMarkIcon className="w-6 h-6 text-black" />
              </button>
            </div>
            
            <nav>
              <ul className='text-black font-semibold h-screen'>
                {[
                  { tab: 'dashboard', icon: ChartBarIcon, label: 'Dashboard' },
                  { tab: 'customers', icon: UsersIcon, label: 'Customers' },
                  { tab: 'orders', icon: ShoppingCartIcon, label: 'Orders' },
                  { tab: 'products', icon: CubeIcon, label: 'Products' },
                  { tab: 'studio', icon: PencilIcon, label: 'Sanity Studio' }
                ].map((item) => (
                  <li 
                    key={item.tab}
                    className={`mb-2 ${activeTab === item.tab ? 'bg-blue-100' : 'hover:bg-gray-100'}`}
                  >
                    <button 
                      onClick={() => handleTabChange(item.tab)}
                      className="flex items-center w-full p-3 rounded-lg"
                    >
                      <item.icon className="w-6 h-6 mr-3 text-black" />
                      <span>{item.label}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-4 md:p-8 mt-14 md:mt-0 w-full overflow-x-auto">
          {activeTab === 'studio' ? (
            <div className="w-full h-[calc(100vh-2rem)]">
              <iframe
                src="/studio"
                className="w-full h-full border-none rounded-lg shadow-lg"
                title="Sanity Studio"
              />
            </div>
          ) : activeTab === 'dashboard' ? (
            <div>
              <h2 className="text-3xl font-bold mb-6 text-black">Dashboard Overview</h2>
              <div className="grid text-black grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {dashboardMetrics.map((metric) => (
                  <div 
                    key={metric.title} 
                    className={`${metric.bgColor} p-6 rounded-lg shadow-md flex items-center`}
                  >
                    <div className={`p-3 rounded-full ${metric.bgColor} mr-4`}>
                      <metric.icon className={`w-8 h-40 ${metric.textColor}`} />
                    </div>
                    <div>
                      <p className="text-sm text-black font-bold mb-1">{metric.title}</p>
                      <p className={`text-2xl font-bold ${metric.textColor}`}>{metric.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : activeTab === 'customers' ? (
            <CustomersTable customers={customers} />
          ) : activeTab === 'orders' ? (
            <OrdersTable orders={orders} />
          ) : activeTab === 'products' ? (
            <Products products={products} />
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;