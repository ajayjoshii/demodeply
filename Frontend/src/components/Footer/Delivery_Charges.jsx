import { useState } from "react";

export default function Delivery_Charges() {
  const [distance, setDistance] = useState("");
  const [billTotal, setBillTotal] = useState("");
  const [calculatedCharge, setCalculatedCharge] = useState(null);

  const calculateDeliveryCharge = () => {
    const dist = parseFloat(distance);
    const bill = parseFloat(billTotal);

    if (isNaN(dist) || isNaN(bill)) {
      setCalculatedCharge("Please enter valid numbers.");
      return;
    }

    let charge = 0;

    if (dist <= 1) {
      charge = 20;
    } else {
      charge = 20 + Math.ceil(dist - 1) * 20;
    }

    setCalculatedCharge(`Estimated Delivery Charge: Rs. ${charge}`);
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-xl shadow-md mt-[90px]">
      <h2 className="text-2xl font-bold mb-4 text-center text-green-700">Delivery Charges</h2>

      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-800">FoodOrderNP Fresh Orders:</h3>
        <p className="text-gray-700">Rs. 100 per order</p>
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-800">Restaurants and Other Stores:</h3>
        <p className="text-gray-700">
          The delivery charge is calculated based on the restaurant bill total and the approximate road distance between the selected restaurant and the delivery location.
        </p>
        <ul className="list-disc pl-6 text-gray-700 mt-2">
          <li>Up to 1 Km: Rs. 20</li>
          <li>After 1 Km: Additional Rs. 20/km</li>
        </ul>
      </div>

      <div className="border-t pt-4">
        <h3 className="text-lg font-semibold mb-2 text-gray-800">Calculate Your Delivery Charge</h3>
        <div className="mb-3">
          <label className="block text-sm font-medium text-gray-700">Distance (in Km)</label>
          <input
            type="number"
            step="0.1"
            value={distance}
            onChange={(e) => setDistance(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Bill Total (Rs.)</label>
          <input
            type="number"
            value={billTotal}
            onChange={(e) => setBillTotal(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
          />
        </div>

        <button
          onClick={calculateDeliveryCharge}
          className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition"
        >
          Calculate Charge
        </button>

        {calculatedCharge && (
          <div className="mt-4 text-center text-lg font-medium text-blue-700">
            {calculatedCharge}
          </div>
        )}
      </div>
    </div>
  );
}
