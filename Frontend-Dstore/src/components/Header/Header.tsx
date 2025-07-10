import { Link } from "react-router-dom";
import routes from "@/routes/routes";
import UserButton from "@/components/common/UserButton";
import { PhoneCall, ShoppingCart } from "lucide-react";

const Header = () => {
  return (
    <header className="bg-blue-600 text-white">
      <div className="max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-3 items-center gap-4 px-4 py-3">
        {/* Logo */}
        <div className="text-xl font-bold text-center md:text-left">DStore</div>

        <div className="flex justify-center">
          <input
            type="text"
            placeholder="Bạn cần tìm gì?"
            className="w-full max-w-md px-4 py-2 rounded-md outline-none text-black"
          />
        </div>

        <div className="flex justify-center md:justify-end items-center space-x-4 text-sm">
          {/* Hotline */}
          <div className="flex items-center gap-2">
            <PhoneCall className="w-5 h-5" />
            <div className="grid text-xs">
              <span>Hotline</span>
              <span className="font-semibold">094.1144.666</span>
            </div>
          </div>

          {/* Giỏ hàng */}
          <Link
            to={routes.cart}
            className="flex items-center gap-2 cursor-pointer"
          >
            <ShoppingCart className="w-5 h-5" />
            <p className="text-sm hidden sm:inline">Giỏ hàng</p>
          </Link>

          {/* User */}
          <UserButton />
        </div>
      </div>
    </header>
  );
};

export default Header;
