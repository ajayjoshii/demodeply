export default function Contact() {
  return (
    <div className="mt-[100px] px-4">
      <h2 className="text-3xl font-bold mb-4 text-red-600">Contact Us</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 gap-x-20 mb-12">
        <section className="p-6 bg-white rounded-md shadow-md w-full max-w-[760px] mx-auto">
          <h3 className="text-3xl font-semibold mb-4">Contact Information</h3>
          <p className="text-lg mb-3">
            <strong>Email:</strong>{" "}
            <a
              href="mailto:info@foodmandu.com"
              className="text-blue-600 hover:underline"
            >
              info@FoodOrderNP.com
            </a>
          </p>
          <p className="text-lg mb-3">
            <strong>Phone:</strong> 5970477, 9803301192
          </p>
          <p className="text-lg">
            <strong>Social Media:</strong>
            <a
              href="https://www.facebook.com/profile.php?id=61578910108826&mibextid=ZbWKwL"
              target="_blank"
              rel="noreferrer"
              className="ml-3 text-blue-600 hover:underline"
            >
              Facebook
            </a>
            <a
              href="https://www.instagram.com/foodordernp?igsh=ZGUzMzM3NWJiOQ%3D%3D"
              target="_blank"
              rel="noreferrer"
              className="ml-3 text-pink-600 hover:underline"
            >
              Instagram
            </a>
            <a
              href="https://twitter.com/foodmandu"
              target="_blank"
              rel="noreferrer"
              className="ml-3 text-blue-400 hover:underline"
            >
              Twitter
            </a>
            <a
              href="https://tiktok.com/@foodmandu"
              target="_blank"
              rel="noreferrer"
              className="ml-3 text-black hover:underline"
            >
              Tiktok
            </a>
          </p>
        </section>

        <section className="p-6 bg-white rounded-md shadow-md w-full max-w-[760px] mx-auto">
          <h3 className="text-3xl font-semibold mb-4">Complaint Handling</h3>
          <p className="text-lg mb-3">
            <strong>Contact Person/Unit:</strong> Customer Care Department
          </p>
          <p className="text-lg mb-3">
            <strong>Email:</strong>{" "}
            <a
              href="mailto:support@foodmandu.com"
              className="text-blue-600 hover:underline"
            >
              support@FoodOrderNP.com
            </a>
          </p>
          <p className="text-lg">
            <strong>Telephone:</strong> 9815898401, 9803301192
          </p>
        </section>
      </div>
    </div>
  );
}
