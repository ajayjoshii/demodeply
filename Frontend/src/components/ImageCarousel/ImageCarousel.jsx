import { useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const images = [
    {
        url: "https://media-cdn.tripadvisor.com/media/photo-m/1280/24/5c/77/1d/chicken-thali-set-signature.jpg",
        title: "Thakali Set",
    },
    {
        url: "https://honeyguideapps.com/sites/default/files/kothey_0.jpg",
        title: "Momo",
    },
    {
        url: "https://v.greattibettour.com/photos/2021/07/selroti-12-63179.jpg",
        title: "Sel Roti",
    },
];

export default function ImageCarousel() {
    const [currentIndex, setCurrentIndex] = useState(0);

    const prevSlide = () =>
        setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    const nextSlide = () =>
        setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));

    return (
        <div className="relative w-full max-w-6xl mx-auto overflow-hidden rounded-2xl shadow-xl group transition-all duration-500 mt-[70px] h-[500px]">
            <img
                src={images[currentIndex].url}
                alt={images[currentIndex].title}
                className="w-full h-[500px] object-cover transform transition-transform duration-700 scale-100 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-opacity-30 flex items-center justify-between px-4">
                <button
                    onClick={prevSlide}
                    className="bg-white bg-opacity-50 hover:bg-opacity-80 p-2 rounded-full text-xl transition"
                >
                    <FaArrowLeft />
                </button>
                <button
                    onClick={nextSlide}
                    className="bg-white bg-opacity-50 hover:bg-opacity-80 p-2 rounded-full text-xl transition"
                >
                    <FaArrowRight />
                </button>
            </div>
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white text-lg bg-black bg-opacity-50 px-4 py-1 rounded-full">
                {images[currentIndex].title}
            </div>
        </div>
    );
}
