import { FaPhoneAlt } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import { Link } from "react-router-dom";
const Header = () => (
    <header className="bg-blue-600 text-white">
        <div className="max-w-screen-xl mx-auto flex justify-between items-center px-4 py-3">
            <div className="text-xl font-bold">SONG LONG MEDIA</div>
            <input
                type="text"
                placeholder="Bạn cần tìm gì?"
                className="w-1/2 px-4 py-2 rounded-md text-black"
            />
            <div className="flex items-center space-x-4 text-sm">
                <div className="flex items-center gap-2">
                    <FaPhoneAlt className="text-2xl" />
                    <div className="grid col">
                        <span> Hotline</span>
                        <span className="font-bold"> 094.1144.666</span>
                    </div>
                </div>
                <Link to={'/cart'} className="flex items-center gap-2 cursor-pointer ">
                    <FaCartShopping className="text-2xl" />
                    <p className="text-base"> Giỏ hàng</p>
                </Link>
            </div>
        </div>
    </header>)

export default Header;
