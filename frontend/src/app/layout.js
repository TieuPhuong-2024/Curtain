import {Inter} from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({subsets: ["latin"]});

export const metadata = {
    title: "Curtain Shop - Rèm Cửa Cao Cấp",
    description: "Cửa hàng rèm cửa với đa dạng mẫu mã, chất liệu và màu sắc",
};

export default function RootLayout({children}) {
    return (
        <html lang="vi">
        <body className={`${inter.className} flex flex-col min-h-screen`}>
        <Navbar/>
        <main className="flex-grow">
            {children}
        </main>
        <Footer/>
        </body>
        </html>
    );
}
