const About = () => {
  return (
    <div className="max-w-6xl mx-[2px] p-4 sm:p-6 text-gray-800 mt-[90px]">
      <section className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-extrabold mb-3">About Us</h1>
        <p className="mb-4 text-base sm:text-2xl">
          FoodOrderNP is recently opened ecommerce website in Nepal that delivers food from all seven provinces of Nepal. As a pioneer food delivery service provider, we are making life easier through online ordering.
        </p>
        <p className="mb-4 text-base sm:text-xl">
          We know that your time is valuable and sometimes every minute in the day counts. That’s why we deliver! So you can spend more time doing the things you love. You can get anything from Nepali food to high French cuisine by placing a simple order online through our website, mobile app or over the phone. Then just sit back, relax, and wait for your order to arrive.
        </p>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        <section className="p-6 bg-white rounded-md shadow-md w-full">
          <h3 className="text-2xl sm:text-3xl font-semibold mb-4">FoodOrderNP Pvt. Ltd.</h3>
          <ul className="list list-inside space-y-3 text-base sm:text-lg">
            <li><strong>Business:</strong> Delivery of food, grocery and daily essentials</li>
            <li><strong>Registered Authority:</strong> Office of Company Registrar</li>
            <li><strong>Registration Certificate Number:</strong> 71876/066/067</li>
            <li><strong>VAT/PAN Registration Number:</strong> 304326017</li>
          </ul>
        </section>

        <section className="p-6 bg-white rounded-md shadow-md w-full">
          <h3 className="text-2xl sm:text-3xl font-semibold mb-4">Office Locations</h3>
          <ul className="list list-inside space-y-3 text-base sm:text-lg">
            <li><strong>Registered Office:</strong> Lokanthali-01,Bhaktapur</li>
            <li><strong>Head Office:</strong> New Road, Kathmandu, Nepal</li>
            <li><strong>Branches/Outlets:</strong> Pokhara, Sindhuli, Butwal</li>
          </ul>
        </section>

        <section className="p-6 bg-white rounded-md shadow-md w-full">
          <h3 className="text-2xl sm:text-3xl font-semibold mb-4">Contact Information</h3>
          <p className="text-base sm:text-lg mb-3"><strong>Email:</strong> <a href="mailto:info@foodmandu.com" className="text-blue-600 hover:underline">info@FoodOrderNP.com</a></p>
          <p className="text-base sm:text-lg mb-3"><strong>Phone:</strong> 5970477,, 9803301192</p>
          <p className="text-base sm:text-lg">
            <strong>Social Media:</strong>
            <a href="https://facebook.com/foodmandu" target="_blank" rel="noreferrer" className="ml-3 text-blue-600 hover:underline">Facebook</a>
            <a href="https://instagram.com/foodmandu" target="_blank" rel="noreferrer" className="ml-3 text-pink-600 hover:underline">Instagram</a>
            <a href="https://twitter.com/foodmandu" target="_blank" rel="noreferrer" className="ml-3 text-blue-400 hover:underline">Twitter</a>
            <a href="https://tiktok.com/@foodmandu" target="_blank" rel="noreferrer" className="ml-3 text-black hover:underline">Tiktok</a>
          </p>
        </section>

        <section className="p-6 bg-white rounded-md shadow-md w-full">
          <h3 className="text-2xl sm:text-3xl font-semibold mb-4">Complaint Handling</h3>
          <p className="text-base sm:text-lg mb-3"><strong>Contact Person/Unit:</strong> Customer Care Department</p>
          <p className="text-base sm:text-lg mb-3"><strong>Email:</strong> <a href="mailto:support@foodmandu.com" className="text-blue-600 hover:underline">support@FoodOrderNP.com</a></p>
          <p className="text-base sm:text-lg"><strong>Telephone:</strong> 9815898401, 9803301192</p>
        </section>
      </div>
    </div>
  );
};

export default About;

