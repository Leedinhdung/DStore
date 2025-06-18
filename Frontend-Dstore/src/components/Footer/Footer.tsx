import { FaMailBulk, FaPhone } from "react-icons/fa";

const Footer = () => {
    return (
        <div className="bg-gray-50 border-t">
            {/* Main Footer Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Thông tin */}
                    <div>
                        <h3 className="text-blue-600 font-bold text-lg mb-4 uppercase">Thông tin</h3>
                        <ul className="space-y-3">
                            <li>
                                <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors">
                                    Giới thiệu
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors">
                                    Thông tin liên hệ
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors">
                                    Tin tức
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors">
                                    Tuyển dụng
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors">
                                    Tài khoản
                                </a>
                            </li>
                        </ul>

                        {/* Verification Badge */}
                        <div className="mt-6">
                            <div className="flex items-center space-x-2 bg-blue-600 text-white px-3 py-2 rounded-lg text-sm">
                                <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                                    <span className="text-blue-600 font-bold text-xs">✓</span>
                                </div>
                                <div>
                                    <div className="font-semibold">ĐÃ THÔNG BÁO</div>
                                    <div className="text-xs">BỘ CÔNG THƯƠNG</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Chính sách chung */}
                    <div>
                        <h3 className="text-blue-600 font-bold text-lg mb-4 uppercase">Chính sách chung</h3>
                        <ul className="space-y-3">
                            <li>
                                <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors">
                                    Chính sách bảo mật
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors">
                                    Chính sách bảo hành
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors">
                                    Chính sách đổi trả
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors">
                                    Chính sách giao hàng
                                </a>
                            </li>
                        </ul>

                        {/* DMCA Badge */}
                        <div className="mt-6">
                            <div className="bg-blue-600 text-white px-4 py-2 rounded-lg inline-flex items-center space-x-2">
                                <div className="w-6 h-6 bg-white rounded flex items-center justify-center">
                                    <span className="text-blue-600 font-bold text-xs">🔒</span>
                                </div>
                                <div className="text-sm font-semibold">
                                    <div>DMCA</div>
                                    <div>PROTECTED</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Hỗ trợ khách hàng */}
                    <div>
                        <h3 className="text-blue-600 font-bold text-lg mb-4 uppercase">Hỗ trợ khách hàng</h3>
                        <ul className="space-y-3">
                            <li>
                                <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors">
                                    Hướng dẫn mua hàng
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors">
                                    Hướng dẫn trả góp
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors">
                                    Hướng dẫn thanh toán
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors">
                                    Dịch vụ sửa tai nghe
                                </a>
                            </li>
                        </ul>

                        {/* Contact Info */}
                        <div className="mt-6 space-y-2">
                            <div className="flex items-center space-x-2 text-gray-700">
                                <FaPhone className="h-4 w-4 text-blue-600" />
                                <span className="font-semibold">Hotline: 094.1144.666</span>
                            </div>
                            <div className="flex items-center space-x-2 text-gray-700">
                                <FaMailBulk className="h-4 w-4 text-blue-600" />
                                <span>Email: songlongmedia@gmail.com</span>
                            </div>
                        </div>
                    </div>
                    {/* Phương thức thanh toán */}
                    <div>
                        <h3 className="text-blue-600 font-bold text-lg mb-4 uppercase">Phương thức thanh toán</h3>

                        {/* Payment Methods Grid */}
                        <div className="grid grid-cols-3 gap-3 mb-6">
                            {/* Row 1 */}
                            <div className="bg-white border rounded-lg p-2 flex items-center justify-center h-12">
                                <span className="text-orange-500 font-bold text-sm">AirPay</span>
                            </div>
                            <div className="bg-white border rounded-lg p-2 flex items-center justify-center h-12">
                                <span className="text-blue-600 font-bold text-sm">ZaloPay</span>
                            </div>
                            <div className="bg-white border rounded-lg p-2 flex items-center justify-center h-12">
                                <span className="text-purple-600 font-bold text-sm">Kredivo</span>
                            </div>

                            {/* Row 2 */}
                            <div className="bg-white border rounded-lg p-2 flex items-center justify-center h-12">
                                <span className="text-pink-500 font-bold text-sm">Momo</span>
                            </div>
                            <div className="bg-white border rounded-lg p-2 flex items-center justify-center h-12">
                                <span className="text-red-600 font-bold text-xs">HOME PayLater</span>
                            </div>
                            <div className="bg-white border rounded-lg p-2 flex items-center justify-center h-12">
                                <span className="text-blue-800 font-bold text-sm">VISA</span>
                            </div>

                            {/* Row 3 */}
                            <div className="bg-white border rounded-lg p-2 flex items-center justify-center h-12">
                                <span className="text-red-500 font-bold text-sm">●●</span>
                            </div>
                            <div className="bg-white border rounded-lg p-2 flex items-center justify-center h-12">
                                <span className="text-gray-600 font-bold text-xs">TIỀN MẶT</span>
                            </div>
                            <div className="bg-white border rounded-lg p-2 flex items-center justify-center h-12">
                                <span className="text-gray-600 font-bold text-xs">ATM</span>
                            </div>
                        </div>

                        {/* Social Media */}
                        <div>
                            <h4 className="text-blue-600 font-bold text-base mb-3 uppercase">Kết nối với chúng tôi</h4>
                            <div className="flex space-x-3">
                                <a
                                    href="#"
                                    className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center hover:bg-red-700 transition-colors"
                                >
                                    <span className="text-white font-bold">▶</span>
                                </a>
                                <a
                                    href="#"
                                    className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors"
                                >
                                    <span className="text-white font-bold">f</span>
                                </a>
                                <a
                                    href="#"
                                    className="w-10 h-10 bg-black rounded-full flex items-center justify-center hover:bg-gray-800 transition-colors"
                                >
                                    <span className="text-white font-bold">♪</span>
                                </a>
                                <a
                                    href="#"
                                    className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center hover:from-purple-600 hover:to-pink-600 transition-colors"
                                >
                                    <span className="text-white font-bold">📷</span>
                                </a>
                                <a
                                    href="#"
                                    className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors"
                                >
                                    <span className="text-white font-bold">Z</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Bottom Copyright */}
            <div className="border-t bg-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <p className="text-center text-gray-600 text-sm">
                        HKD: SONG LONG MEDIA - SỐ GIẤY CHỨNG NHẬN ĐĂNG KÝ KINH DOANH: 01D8025726© SINCE 2010.
                    </p>
                </div>
            </div>
        </div>
    )
}
export default Footer