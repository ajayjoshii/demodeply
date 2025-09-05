import { Link } from "react-router-dom"

export default function HowToOrder() {
  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-[90px]">
      <h2 className="text-3xl font-bold text-green-700 mb-6 text-center">How to Order</h2>

      <p className="text-gray-700 mb-6 text-lg">
        Ordering food using our service is very easy. Follow the steps mentioned below to place your order with us.
      </p>

      <ol className="list-decimal list-inside space-y-4 text-gray-800 text-base">
        <li>
          <span className="font-semibold text-green-700">Find our website:</span> 
          <a href="http://localhost:3000/" className="text-blue-600 hover:text-blue-800 font-bold mx-2">FoodOrderNP</a>.
        </li>
        <li>
          <span className="font-semibold text-green-700">Select your food:</span> Browse the menu from the website and pick your favorite dishes. The prices are shown along with food items.
        </li>
        <li>
          <span className="font-semibold text-green-700">Enter delivery details:</span> Fill in your address, preferred delivery date and time, then confirm your order. We'll deliver it to your location and you can pay in cash on delivery.
        </li>
      </ol>

      <div className="mt-6 border-t pt-4 text-gray-800 text-base">
        <p>
          <span className="font-semibold text-green-700">Alternatively:</span> You can also place your order over the phone at:
        </p>
        <ul className="list-disc list-inside mt-2 text-gray-700">
          <li>4444177</li>
          <li>9802034008</li>
        </ul>
        <p className="mt-2">Available during our delivery hours.</p>
      </div>
    </div>
  );
}
