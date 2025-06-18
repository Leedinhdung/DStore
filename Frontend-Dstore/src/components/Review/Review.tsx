const Review = () => {
    return (
        <div className="bg-white rounded-2xl border border-gray-200 shadow p-5 flex gap-5">
            <div>
                <img
                    src="https://songlongmedia.com/media/lib/02-04-2024/dinh-manh-ninh-songlongmedia-tang-ao-beats-31-12-2012.jpg"
                    className="rounded-full h-48 w-48 object-cover"
                    alt=""
                />
            </div>
            <div className="flex-1">
                <div className="flex items-center mb-4">
                    {[...Array(5)].map((_, index) => (
                        <svg
                            key={index}
                            className="w-4 h-4 fill-yellow-400 text-yellow-400"
                            viewBox="0 0 24 24"
                        >
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                        </svg>
                    ))}
                </div>
                <p className="text-sm leading-relaxed">
                    NINH nhớ hồi năm 2012 sắm tai BEATS về trải nghiệm và dùng nó làm món đồ Outfit quay chụp ảnh luôn,
                    ngày ấy mua tai nghe không đơn giản như bây giờ. Mua hàng xong còn được tặng mấy chiếc áo Beats nữa.
                </p>
                <p className="font-medium italic mt-5">-Đinh Mạnh Ninh-</p>
            </div>
        </div>

    )
}

export default Review