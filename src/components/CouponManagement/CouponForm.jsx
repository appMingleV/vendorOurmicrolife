const CouponForm = () => {
    return (
      <div className="bg-gray-50 p-8 rounded-lg shadow-lg max-w-lg mx-auto">
        <h3 className="text-2xl font-bold text-gray-800 mb-6">Create New Coupon</h3>
        <form className="space-y-6">
          <div>
            <label className="block font-semibold text-gray-700">Coupon Code</label>
            <input type="text" className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-200 focus:border-blue-500" placeholder="Enter coupon code" />
          </div>
          <div>
            <label className="block font-semibold text-gray-700">Coupon Name</label>
            <input type="text" className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-200 focus:border-blue-500" placeholder="Enter coupon name" />
          </div>
          <div>
            <label className="block font-semibold text-gray-700">Discount Type</label>
            <select className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-200 focus:border-blue-500">
              <option>Percentage</option>
              <option>Fixed Amount</option>
            </select>
          </div>
          <div>
            <label className="block font-semibold text-gray-700">Discount Value</label>
            <input type="number" className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-200 focus:border-blue-500" placeholder="Enter discount value" />
          </div>
          <div>
            <label className="block font-semibold text-gray-700">Start Date</label>
            <input type="date" className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-200 focus:border-blue-500" />
          </div>
          <div>
            <label className="block font-semibold text-gray-700">End Date</label>
            <input type="date" className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-200 focus:border-blue-500" />
          </div>
          <div className="flex justify-end space-x-4">
            <button type="button" className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition duration-200 ease-in-out shadow-md">Save</button>
            <button type="button" className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition duration-200 ease-in-out shadow-md">Cancel</button>
          </div>
        </form>
      </div>
    );
  };
  
  export default CouponForm;
  