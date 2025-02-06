'use client';
import { useState, useEffect } from 'react';
import { client } from '@/sanity/lib/client';
import { urlFor } from '@/sanity/lib/image';
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
import Image from 'next/image';

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
  ProductName: string;
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

  // Sanity Queries
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
    ProductName,
    price,
    description,
    image,
    sizes,
    inventory
  }`;

  useEffect(() => {
    const fetchData = async () => {
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
    };

    fetchData();
  }, []);

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

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Mobile Hamburger Button */}
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="md:hidden fixed top-17 right-3 z-50 p-2 rounded-lg bg-white shadow-lg"
      >
        {isSidebarOpen ? (
          <XMarkIcon className="w-6 h-6 text-gray-600" />
        ) : (
          <Bars3Icon className="w-6 h-6 text-gray-600" />
        )}
      </button>

      <div className="flex">
        {/* Mobile Overlay */}
        {isSidebarOpen && (
          <div
            className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={closeSidebar}
          />
        )}

        {/* Sidebar */}
        <div
          className={`fixed md:static w-64 bg-white h-screen p-4 shadow-lg z-50 transition-transform duration-300 ease-in-out ${
            isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
          }`}
        >
          <h1 className="text-2xl font-bold mb-8 text-gray-800">Admin Dashboard</h1>
          <nav className="space-y-2">
            <button
              onClick={() => handleTabChange('dashboard')}
              className={`w-full flex items-center gap-2 p-3 rounded-lg ${
                activeTab === 'dashboard' ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <ChartBarIcon className="w-5 h-5" />
              Dashboard
            </button>
            <button
              onClick={() => handleTabChange('customers')}
              className={`w-full flex items-center gap-2 p-3 rounded-lg ${
                activeTab === 'customers' ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <UsersIcon className="w-5 h-5" />
              Customers
            </button>
            <button
              onClick={() => handleTabChange('orders')}
              className={`w-full flex items-center gap-2 p-3 rounded-lg ${
                activeTab === 'orders' ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <ShoppingCartIcon className="w-5 h-5" />
              Orders
            </button>
            <button
              onClick={() => handleTabChange('products')}
              className={`w-full flex items-center gap-2 p-3 rounded-lg ${
                activeTab === 'products' ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <CubeIcon className="w-5 h-5" />
              Products
            </button>
            <button
              onClick={() => handleTabChange('studio')}
              className={`w-full flex items-center gap-2 p-3 rounded-lg ${
                activeTab === 'studio' ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <PencilIcon className="w-5 h-5" />
              Sanity Studio
            </button>
          </nav>
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
              <h2 className="text-3xl font-bold mb-6 text-gray-800">Dashboard Overview</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white p-6 rounded-xl shadow-sm">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-500">Total Customers</p>
                      <p className="text-3xl font-bold mt-2">{customers.length}</p>
                    </div>
                    <UsersIcon className="w-8 h-8 text-blue-600" />
                  </div>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-500">Total Orders</p>
                      <p className="text-3xl font-bold mt-2">{orders.length}</p>
                    </div>
                    <ShoppingCartIcon className="w-8 h-8 text-green-600" />
                  </div>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-500">Total Revenue</p>
                      <p className="text-3xl font-bold mt-2">
                        Rs. {totalRevenue.toLocaleString()}
                      </p>
                    </div>
                    <CurrencyDollarIcon className="w-8 h-8 text-purple-600" />
                  </div>
                </div>
              </div>
            </div>
          ) : activeTab === 'customers' ? (
            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6 text-gray-800">Customer Management</h2>
              <div className="bg-white rounded-xl shadow-sm">
                {/* Desktop View (lg+) */}
                <div className="hidden lg:block overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="text-left p-4">Name</th>
                        <th className="text-left p-4">Contact</th>
                        <th className="text-left p-4">Address</th>
                        <th className="text-left p-4">Joined Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {customers.map((customer) => (
                        <tr key={customer._id} className="border-b hover:bg-gray-50">
                          <td className="p-4 font-medium">{customer.firstName} {customer.lastName}</td>
                          <td className="p-4">
                            <div>{customer.email}</div>
                            <div>{customer.number}</div>
                          </td>
                          <td className="p-4">
                            <div>{customer.address}</div>
                            <div>{customer.state}, {customer.country}</div>
                          </td>
                          <td className="p-4">
                            {new Date(customer._createdAt).toLocaleDateString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
          
                {/* Tablet View (md-lg) */}
                <div className="hidden md:block lg:hidden">
                  <div className="grid grid-cols-2 gap-4 p-4">
                    {customers.map((customer) => (
                      <div key={customer._id} className="border rounded-lg p-4 hover:bg-gray-50">
                        <div className="flex justify-between items-start mb-3">
                          <div className="font-medium text-sm">
                            {customer.firstName} {customer.lastName}
                          </div>
                          <div className="text-xs text-gray-500">
                            {new Date(customer._createdAt).toLocaleDateString()}
                          </div>
                        </div>
          
                        <div className="mb-3 space-y-1">
                          <div className="text-xs font-medium text-gray-600">Contact</div>
                          <div className="text-xs truncate">{customer.email}</div>
                          <div className="text-xs">{customer.number}</div>
                        </div>
          
                        <div className="space-y-1">
                          <div className="text-xs font-medium text-gray-600">Address</div>
                          <div className="text-xs line-clamp-2">{customer.address}</div>
                          <div className="text-xs">
                            {customer.state}, {customer.country}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
          
                {/* Mobile View */}
                <div className="md:hidden">
                  {customers.map((customer) => (
                    <div key={customer._id} className="border-b p-4 hover:bg-gray-50">
                      <div className="flex justify-between items-start mb-3">
                        <div className="font-medium text-lg">
                          {customer.firstName} {customer.lastName}
                        </div>
                        <div className="text-sm text-gray-500">
                          {new Date(customer._createdAt).toLocaleDateString()}
                        </div>
                      </div>
          
                      <div className="mb-3">
                        <div className="text-sm font-medium text-gray-600">Contact</div>
                        <div className="text-sm">{customer.email}</div>
                        <div className="text-sm">{customer.number}</div>
                      </div>
          
                      <div className="mb-3">
                        <div className="text-sm font-medium text-gray-600">Address</div>
                        <div className="text-sm">{customer.address}</div>
                        <div className="text-sm">
                          {customer.state}, {customer.country}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )  : activeTab === 'orders' ? (
            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6 text-gray-800">Order Management</h2>
              <div className="bg-white rounded-xl shadow-sm">
                {/* Desktop View (lg+) */}
                <div className="hidden lg:block overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="text-left p-4">Items</th>
                        <th className="text-left p-4">Details</th>
                        <th className="text-left p-4">Customer</th>
                        <th className="text-left p-4">Total</th>
                        <th className="text-left p-4">Payment Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.map((order) => (
                        <tr key={order._id} className="border-b hover:bg-gray-50">
                          <td className="p-4">
                            <div className="flex flex-col gap-2">
                              {order.item.map((item, index) => (
                                <div key={index} className="flex items-center gap-4">
                                  {item.product_image && (
                                    <Image
                                      src={urlFor(item.product_image).url()}
                                      alt={item.product_description}
                                      width={64}
                                      height={64}
                                      className="object-cover rounded"
                                    />
                                  )}
                                  <div>
                                    <div className="font-medium">{item.product_name}</div>
                                    <div className="font-medium text-sm">{item.product_description}</div>
                                    <div className="text-sm text-gray-500">
                                      Qty: {item.quantity} | Size: {item.size || 'N/A'}
                                    </div>
                                    <div className="text-sm">
                                      Rs. {(item.product_price * item.quantity).toLocaleString()}
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </td>
                          <td className="p-4">
                            <div className="text-sm text-gray-500">
                              {new Date(order.order_date).toLocaleDateString()}
                            </div>
                            <div className="text-sm">Order ID: #{order._id.slice(0, 8)}</div>
                          </td>
                          <td className="p-4">
                            <div className="font-medium">
                              {order.customer?.firstName} {order.customer?.lastName}
                            </div>
                            <div className="text-sm text-gray-500">{order.customer?.email}</div>
                            <div className="text-sm text-gray-500">{order.customer?.number}</div>
                          </td>
                          <td className="p-4">
                            Rs. {order.item.reduce((sum, item) => sum + (item.product_price * item.quantity), 0).toLocaleString()}
                          </td>
                          <td className="p-4">
                            <span className={`px-3 py-1 rounded-full text-sm font-medium
                              ${order.paymentStatus === 'paid' ? 'bg-green-100 text-green-800' : 
                                order.paymentStatus === 'failed' ? 'bg-red-100 text-red-800' : 
                                'bg-yellow-100 text-yellow-800'}`}>
                              {order.paymentStatus || 'Pending'}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
          
                {/* Tablet View (md-lg) */}
                <div className="hidden md:block lg:hidden">
                  <div className="grid grid-cols-2 gap-4 p-4">
                    {orders.map((order) => (
                      <div key={order._id} className="border rounded-lg p-4 hover:bg-gray-50">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <div className="text-sm text-gray-500">
                              {new Date(order.order_date).toLocaleDateString()}
                            </div>
                            <div className="font-medium text-sm">ID: #{order._id.slice(0, 8)}</div>
                          </div>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium
                            ${order.paymentStatus === 'paid' ? 'bg-green-100 text-green-800' : 
                              order.paymentStatus === 'failed' ? 'bg-red-100 text-red-800' : 
                              'bg-yellow-100 text-yellow-800'}`}>
                            {order.paymentStatus || 'Pending'}
                          </span>
                        </div>
          
                        <div className="mb-3">
                          <div className="font-medium text-sm">
                            {order.customer?.firstName} {order.customer?.lastName}
                          </div>
                          <div className="text-xs text-gray-500 truncate">{order.customer?.email}</div>
                        </div>
          
                        <div className="space-y-2 mb-3">
                          <div className="text-xs font-medium text-gray-600">Items ({order.item.length}):</div>
                          {order.item.map((item, index) => (
                            <div key={index} className="flex items-center gap-2 text-xs">
                              {item.product_image && (
                                <Image
                                  src={urlFor(item.product_image).url()}
                                  alt={item.product_description}
                                  width={32}
                                  height={32}
                                  className="object-cover rounded"
                                />
                              )}
                              <div className="truncate">{item.product_name}</div>
                              <div className="text-gray-500">x{item.quantity}</div>
                            </div>
                          ))}
                        </div>
          
                        <div className="pt-3 border-t">
                          <div className="flex justify-between items-center text-sm font-medium">
                            <span>Total:</span>
                            <span>
                              Rs. {order.item.reduce((sum, item) => sum + (item.product_price * item.quantity), 0).toLocaleString()}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
          
                {/* Mobile View */}
                <div className="md:hidden">
                  {orders.map((order) => (
                    <div key={order._id} className="border-b p-4">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <div className="text-sm text-gray-500">
                            {new Date(order.order_date).toLocaleDateString()}
                          </div>
                          <div className="text-sm font-medium">ID: #{order._id.slice(0, 8)}</div>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium
                          ${order.paymentStatus === 'paid' ? 'bg-green-100 text-green-800' : 
                            order.paymentStatus === 'failed' ? 'bg-red-100 text-red-800' : 
                            'bg-yellow-100 text-yellow-800'}`}>
                          {order.paymentStatus || 'Pending'}
                        </span>
                      </div>
          
                      <div className="mb-4">
                        <div className="font-medium">
                          {order.customer?.firstName} {order.customer?.lastName}
                        </div>
                        <div className="text-sm text-gray-500">{order.customer?.email}</div>
                        <div className="text-sm text-gray-500">{order.customer?.number}</div>
                      </div>
          
                      <div className="space-y-4">
                        {order.item.map((item, index) => (
                          <div key={index} className="flex gap-3">
                            {item.product_image && (
                              <Image
                                src={urlFor(item.product_image).url()}
                                alt={item.product_description}
                                width={80}
                                height={80}
                                className="object-cover rounded"
                              />
                            )}
                            <div className="flex-1">
                              <div className="font-medium">{item.product_name}</div>
                              <div className="text-sm text-gray-600">{item.product_description}</div>
                              <div className="text-sm text-gray-500">
                                Qty: {item.quantity} | Size: {item.size || 'N/A'}
                              </div>
                              <div className="text-sm font-medium">
                                Rs. {(item.product_price * item.quantity).toLocaleString()}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
          
                      <div className="mt-4 pt-4 border-t flex justify-between items-center">
                        <span className="font-medium">Total:</span>
                        <span className="font-bold">
                          Rs. {order.item.reduce((sum, item) => sum + (item.product_price * item.quantity), 0).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )  : activeTab === 'products' ? (
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
                        alt={product.ProductName}
                        width={100}
                        height={100}
                        className="w-full md:w-32 md:h-32 object-cover rounded-xl mb-4 lg:w-[300px] lg:h-auto"
                      />
                    )}
                    <div className="text-center md:text-left w-full">
                      <h3 className="font-bold text-xl text-gray-800">{product.ProductName}</h3>
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
          )  : null}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;