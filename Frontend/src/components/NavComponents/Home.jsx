
import React, { useState } from "react";

export default function Home({ addToCart, province, recs, defaultFoodItems, searchTerm }) {
  const filteredItems = searchTerm
    ? defaultFoodItems.filter(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()))
    : defaultFoodItems;

  const itemsPerPage = 8;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

  const currentItems = filteredItems.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePrev = () => setCurrentPage(prev => (prev > 1 ? prev - 1 : prev));
  const handleNext = () => setCurrentPage(prev => (prev < totalPages ? prev + 1 : prev));

  return (
    <div className="relative min-h-screen mt-[85px] px-4 bg-gradient-to-br from-gray-50 via-white to-gray-100">
      {recs && recs.length > 0 && (
        <section className="mt-8">
          <h2 className="text-3xl font-extrabold mb-6 text-center text-green-700 tracking-wide">
            Recommended For You
          </h2>
          <p className="text-center text-gray-600 mb-6 text-lg">
            Based on your orders in{" "}
            <span className="font-semibold text-green-800">{province || "your province"}</span>
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
            {recs.map(item => (
              <div
                key={item._id || item.id}
                className="border rounded-xl p-3 flex flex-col items-center relative shadow-sm hover:shadow-xl transition-all duration-300 bg-white transform hover:-translate-y-1"
              >
                <div className="w-full h-36 overflow-hidden rounded-lg">
                  <img
                    src={item.image || item.img || "https://via.placeholder.com/150"}
                    alt={item.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <span className="font-medium mt-3 text-gray-800 text-lg">{item.name}</span>
                <span className="text-gray-600 mt-1">Rs. {item.price}</span>
                <button
                  onClick={() =>
                    addToCart({ id: item._id || item.id, name: item.name, price: item.price })
                  }
                  className="mt-4 bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-700 transition-colors duration-200 font-semibold w-full"
                >
                  Add to Cart
                </button>
                <span className="absolute top-2 left-2 bg-yellow-400 text-xs px-2 py-0.5 rounded font-bold shadow">
                  Recommended
                </span>
              </div>
            ))}
          </div>
        </section>
      )}

      {recs && recs.length === 0 && (
        <p className="text-gray-600 mt-6 text-center italic">
          No recommendations yet. Add some orders to get personalized suggestions!
        </p>
      )}

      <section className="mt-16">
        <h2 className="text-3xl font-extrabold mb-8 text-center text-green-700 tracking-wide">
          All Food Items
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {currentItems.length > 0 ? (
            currentItems.map(item => <FoodItem key={item.id || item._id} item={item} addToCart={addToCart} />)
          ) : (
            <p className="text-gray-600 text-center col-span-full italic">No items found.</p>
          )}
        </div>

        {filteredItems.length > itemsPerPage && (
          <div className="flex justify-center mt-8 gap-4">
            <button
              onClick={handlePrev}
              disabled={currentPage === 1}
              className={`px-4 py-2 rounded-lg font-semibold transition ${
                currentPage === 1 ? "bg-gray-300 cursor-not-allowed" : "bg-green-600 hover:bg-green-700 text-white"
              }`}
            >
              Previous
            </button>
            <span className="px-4 py-2 font-semibold text-gray-700">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={handleNext}
              disabled={currentPage === totalPages}
              className={`px-4 py-2 rounded-lg font-semibold transition ${
                currentPage === totalPages ? "bg-gray-300 cursor-not-allowed" : "bg-green-600 hover:bg-green-700 text-white"
              }`}
            >
              Next
            </button>
          </div>
        )}
      </section>
    </div>
  );
}

const FoodItem = ({ item, addToCart }) => (
  <div className="bg-white shadow-md rounded-xl overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
    <div className="w-full h-48 overflow-hidden">
      <img
        src={item.img || item.image || "https://via.placeholder.com/150"}
        alt={item.name}
        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
      />
    </div>
    <div className="p-4">
      <h3 className="font-semibold text-lg mb-2 text-gray-800">{item.name}</h3>
      <p className="text-green-700 font-bold mb-3">Rs. {item.price}</p>
      <button
        onClick={() =>
          addToCart({ id: item._id || item.id, name: item.name, price: item.price })
        }
        className="bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-700 transition-colors duration-200 font-semibold w-full"
      >
        Add to Cart
      </button>
    </div>
  </div>
);
