export const Loading = () => {
    const dots = Array.from({ length: 8 });

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white opacity-95">
            <div className="relative w-24 h-24 animate-spin-slow">
                {dots.map((_, index) => {
                    const angle = (index * 360) / dots.length;
                    const radius = 40; // px
                    const x = radius * Math.cos((angle * Math.PI) / 180);
                    const y = radius * Math.sin((angle * Math.PI) / 180);

                    return (
                        <div
                            key={index}
                            className="absolute w-4 h-4 bg-blue-500 rounded-full"
                            style={{
                                top: `calc(50% + ${y}px - 0.5rem)`,
                                left: `calc(50% + ${x}px - 0.5rem)`,
                            }}
                        />
                    );
                })}
            </div>
        </div>
    );
};
