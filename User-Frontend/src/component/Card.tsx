import React from "react";
import { IoMdHeartEmpty } from "react-icons/io";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { IoIosStar } from "react-icons/io";
import { IoIosStarHalf } from "react-icons/io";
import { AppDispatch } from "../store/store";
import { useDispatch} from "react-redux";
import { addItemToCart } from "../store/cartSlice";
import { toast } from "react-toastify";

interface CardProps {
  _id:string
  id: number;
  image: string;
  title: string;
  originalPrice: number;
  discount?: number;
  rating?: number;
  reviewCount?: number;
  isNew?: boolean;
  isFeatured?: boolean;
  isWishlisted?: boolean;
  // onAddToCart?: () => void;
  // onAddToWishlist?: () => void;
  // onQuickView?: () => void;
  imageAlt?: string;
}

const Card: React.FC<CardProps> = ({
  _id,
  id,
  image,
  title,
  originalPrice,
  discount = 0,
  rating = 0,
  reviewCount = 0,
  isNew = false,
  isFeatured = false,
  isWishlisted = false,
  // onAddToCart,
  // onAddToWishlist,
  // onQuickView,
  imageAlt = title,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const token = JSON.parse(localStorage.getItem("token")!);

  const calculateDiscountedPrice = () => {
    if (discount > 0) {
      const price = originalPrice;
      return Math.floor(price - (price * discount) / 100);
    }
    return null;
  };

  const discountedPrice = calculateDiscountedPrice();

  // Render star rating
  const renderRating = () => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(<IoIosStar key={i} className="text-yellow-400" />);
      } else if (i === fullStars && hasHalfStar) {
        stars.push(<IoIosStarHalf key={i} className="text-yellow-400 " />);
      } else {
        stars.push(<IoIosStar key={i} className="text-gray-300" />);
      }
    }
    return stars;
  };

  const handleAddToCart = () => {
    if (!token) {
      toast.error("You are not loggedIn");
      return;
    }

    dispatch(
      addItemToCart({
        token,
        productId : _id,
        quantity: 1,
      })
    );
  };

  return (
    <div className="flex flex-col space-y-2">
      <div className="bg-gray-100 relative group pt-6">
        <div className="flex justify-center items-center h-40">
          <img
            src={image}
            alt={imageAlt}
            className="w-40 object-contain h-full"
            loading="lazy"
          />
        </div>

        {discount > 0 && (
          <span className="absolute left-2 top-2 bg-red-500 text-white text-xs px-2 py-1 rounded-md">
            {discount}%
          </span>
        )}
        {isNew && (
          <span className="absolute left-2 top-2 bg-green-500 text-white text-xs px-2 py-1 rounded-md">
            New
          </span>
        )}
        {isFeatured && (
          <span className="absolute left-2 top-2 bg-blue-500 text-white text-xs px-2 py-1 rounded-md">
            Featured
          </span>
        )}
        <button
          // onClick={onAddToWishlist}
          className="absolute top-2 right-2 p-1 bg-white rounded-full shadow-sm transition-colors"
          aria-label="Add to wishlist"
        >
          <IoMdHeartEmpty
            size={20}
            className={isWishlisted ? "text-red-500" : "text-gray-600"}
          />
        </button>

        <button
          // onClick={onQuickView}
          className="absolute top-10 right-2 p-1 bg-white rounded-full shadow-sm transition-colors"
          aria-label="Quick view"
        >
          <MdOutlineRemoveRedEye size={20} className="text-gray-600" />
        </button>
        <button
          onClick={handleAddToCart}
          className="mt-0 w-full text-center bg-black bg-opacity-80 hover:bg-opacity-100 text-white py-3 opacity-0 group-hover:opacity-100 group-hover:mt-4 tranistion-all duration-500"
        >
          Add to Cart
        </button>
      </div>
      <div className="flex flex-col space-y-1">
        <p className="text-sm font-normal">{title}</p>
        <div className="space-x-3">
          {discountedPrice && (
            <span className="text-sm font-semibold text-red-500">
              ${discountedPrice}
            </span>
          )}
          <span
            className={`text-sm font-medium ${
              discountedPrice ? "text-gray-400 line-through" : "text-gray-800"
            }`}
          >
            $
            {typeof originalPrice === "number"
              ? originalPrice.toFixed(2)
              : originalPrice}
          </span>
        </div>
        <div className="flex items-center space-x-3">
          <div className="flex space-x-0.5">{renderRating()}</div>
          <span className="text-xs text-gray-500">({reviewCount})</span>
        </div>
      </div>
    </div>
  );
};

export default Card;
