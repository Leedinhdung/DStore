import { useState } from "react"

const ProductCard = () => {
  const [isFavorite, setIsFavorite] = useState(false)

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite)
  }

  return (
    <div className=" bg-white rounded-2xl overflow-hidden border border-gray-200 shadow relative hover:shadow-lg">
      {/* Discount Badge */}
      <div className="absolute top-3 left-3 z-10">
        <div className="bg-red-500 text-white px-3 py-1 rounded-lg text-sm font-semibold">Giảm 10%</div>
      </div>

      <div className="p-4">
        {/* Product Image */}
        <div className="relative mb-4 flex justify-center">
          <img
            src="https://songlongmedia.com/media/product/250_3629_skullcandy_crusher_evo_all_love_songlongmedia__1_.jpg"
            alt="Tai nghe Skullcandy"
            className=" h-48 object-contain transition-transform duration-300 hover:scale-110"
          />
        </div>

        {/* Product Title */}
        <h3 className="text-gray-800 font-medium text-base mb-3 line-clamp-2">
          Tai nghe Skullcandy CRUSHER EVO ALL LOVE...
        </h3>

        {/* Price Section */}
        <div className="mb-4">
          <div className="flex items-center gap-2">
            <span className="text-red-600 font-bold text-lg">4.990.000 đ</span>
            <span className="text-gray-400 line-through text-sm">5.550.000 đ</span>
          </div>
        </div>

        {/* Rating */}
        <div className="flex items-center mb-4">
          {[...Array(5)].map((_, index) => (
            <svg key={index} className="w-4 h-4 fill-yellow-400 text-yellow-400" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
          ))}
        </div>

        {/* Favorite Button */}
        <div className="flex justify-end">
          <button
            onClick={toggleFavorite}
            className="flex items-center text-gray-500 hover:text-red-500 transition-colors duration-200 p-1"
          >
            <svg
              className={`w-4 h-4 mr-1 ${isFavorite ? "fill-red-500 text-red-500" : "fill-none"}`}
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
            <span className="text-sm">Yêu thích</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductCard
