import Image from 'next/image';
import { urlFor } from '@/sanity/lib/image';

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

export const OrdersTable = ({ orders }: { orders: SanityOrder[] }) => {
  return (
    <div>
      <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6 text-black">Order Management</h2>
      <div className="bg-white rounded-xl shadow-sm">
        {/* Desktop View (lg+) */}
        <div className="hidden lg:block overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 text-black">
              <tr>
                <th className="text-left p-4">Items</th>
                <th className="text-left p-4">Details</th>
                <th className="text-left p-4">Customer</th>
                <th className="text-left p-4">Total</th>
                <th className="text-left p-4">Payment Status</th>
              </tr>
            </thead>
            <tbody className='text-black'>
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
  );
};