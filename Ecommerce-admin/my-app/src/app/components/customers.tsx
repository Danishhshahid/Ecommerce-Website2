

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

export const CustomersTable = ({ customers }: { customers: SanityCustomer[] }) => {
  return (
    <div>
      <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6 text-black">Customer Management</h2>
      <div className="bg-white rounded-xl shadow-sm">
        {/* Desktop View (lg+) */}
        <div className="hidden lg:block overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 text-black">
              <tr>
                <th className="text-left p-4">Name</th>
                <th className="text-left p-4">Contact</th>
                <th className="text-left p-4">Address</th>
                <th className="text-left p-4">Joined Date</th>
              </tr>
            </thead>
            <tbody className='text-black'>
              {customers.map((customer) => (
                <tr key={customer._id} className="border-b hover:bg-gray-50">
                  <td className="p-4 font-bold">{customer.firstName} {customer.lastName}</td>
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
                  <div className="font-bold text-sm">
                    {customer.firstName} {customer.lastName}
                  </div>
                  <div className="text-xs text-gray-500">
                    {new Date(customer._createdAt).toLocaleDateString()}
                  </div>
                </div>
      
                <div className="mb-3 space-y-1">
                  <div className="text-xs font-medium text-black">Contact</div>
                  <div className="text-xs truncate">{customer.email}</div>
                  <div className="text-xs">{customer.number}</div>
                </div>
      
                <div className="space-y-1">
                  <div className="text-xs font-medium text-black">Address</div>
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
                <div className="font-bold text-lg">
                  {customer.firstName} {customer.lastName}
                </div>
                <div className="text-sm text-gray-500">
                  {new Date(customer._createdAt).toLocaleDateString()}
                </div>
              </div>
      
              <div className="mb-3">
                <div className="text-sm font-medium text-black">Contact</div>
                <div className="text-sm">{customer.email}</div>
                <div className="text-sm">{customer.number}</div>
              </div>
      
              <div className="mb-3">
                <div className="text-sm font-medium text-black">Address</div>
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
  );
};