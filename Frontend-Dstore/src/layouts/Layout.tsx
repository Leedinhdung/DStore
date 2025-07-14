import Footer from "@/components/Footer";
import Header from "@/components/Header";
import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-1 py-4 pt-[130px] sm:pt-[100px]">
                {children}
            </main>
            <Footer />
        </div>
    );
};
export default Layout;
