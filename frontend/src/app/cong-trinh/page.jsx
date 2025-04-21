import React from "react";
import ProjectCard from "@/components/ProjectCard";
import { constructionProjects } from "./projects";

export default function ThiCongLapRemPage() {
    return (
        <main className="container mx-auto py-10 px-4">
            <div className="text-center mb-12">
                <h1 className="text-4xl font-bold mb-4 text-blue-900">Công Trình Đã Thi Công</h1>
                <p className="text-lg text-gray-700 max-w-3xl mx-auto">
                    Chúng tôi tự hào giới thiệu những công trình rèm cửa đã thi công thực tế. 
                    Dưới đây là bộ sưu tập các dự án tiêu biểu mà chúng tôi đã hoàn thành, 
                    giúp quý khách hàng có cái nhìn trực quan về chất lượng và phong cách làm việc của Curtain Shop.
                </p>
            </div>

            {/* Filter options - có thể bổ sung sau */}
            <div className="mb-8 flex flex-wrap gap-2 justify-center">
                <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition">
                    Tất cả
                </button>
                <button className="bg-white text-blue-600 border border-blue-600 px-4 py-2 rounded-md hover:bg-blue-50 transition">
                    Biệt thự
                </button>
                <button className="bg-white text-blue-600 border border-blue-600 px-4 py-2 rounded-md hover:bg-blue-50 transition">
                    Chung cư
                </button>
                <button className="bg-white text-blue-600 border border-blue-600 px-4 py-2 rounded-md hover:bg-blue-50 transition">
                    Văn phòng
                </button>
                <button className="bg-white text-blue-600 border border-blue-600 px-4 py-2 rounded-md hover:bg-blue-50 transition">
                    Khách sạn
                </button>
            </div>

            {/* Projects grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
                {constructionProjects.map((project) => (
                    <ProjectCard key={project.id} project={project} />
                ))}
            </div>

            {/* Installation process */}
            <section className="mb-12 bg-gray-50 p-8 rounded-lg shadow-sm">
                <h2 className="text-2xl font-semibold mb-6 text-blue-800 text-center">Quy trình thi công lắp đặt rèm</h2>
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                    <div className="bg-white p-5 rounded-lg shadow-sm text-center">
                        <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-3">1</div>
                        <h3 className="font-semibold mb-2">Khảo sát và tư vấn</h3>
                        <p className="text-gray-600 text-sm">Đội ngũ đến tận nơi đo đạc, tư vấn mẫu mã phù hợp.</p>
                    </div>

                    <div className="bg-white p-5 rounded-lg shadow-sm text-center">
                        <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-3">2</div>
                        <h3 className="font-semibold mb-2">Báo giá & ký hợp đồng</h3>
                        <p className="text-gray-600 text-sm">Gửi báo giá chi tiết, ký hợp đồng nếu khách hàng đồng ý.</p>
                    </div>

                    <div className="bg-white p-5 rounded-lg shadow-sm text-center">
                        <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-3">3</div>
                        <h3 className="font-semibold mb-2">Thi công lắp đặt</h3>
                        <p className="text-gray-600 text-sm">Lắp đặt rèm đúng kỹ thuật, vệ sinh sạch sẽ sau khi hoàn thành.</p>
                    </div>

                    <div className="bg-white p-5 rounded-lg shadow-sm text-center">
                        <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-3">4</div>
                        <h3 className="font-semibold mb-2">Nghiệm thu & bàn giao</h3>
                        <p className="text-gray-600 text-sm">Khách hàng kiểm tra, nghiệm thu và được hướng dẫn sử dụng.</p>
                    </div>

                    <div className="bg-white p-5 rounded-lg shadow-sm text-center">
                        <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-3">5</div>
                        <h3 className="font-semibold mb-2">Hỗ trợ sau lắp đặt</h3>
                        <p className="text-gray-600 text-sm">Bảo hành, hỗ trợ kỹ thuật tận tình.</p>
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section className="mb-12">
                <h2 className="text-2xl font-semibold mb-6 text-blue-800 text-center">Cảm nhận khách hàng</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                        <p className="italic text-gray-700 mb-4">"Rèm cửa được lắp rất nhanh, đẹp và đúng ý tôi. Đội ngũ thi công chuyên nghiệp, tư vấn tận tình. Tôi rất hài lòng!"</p>
                        <div className="font-semibold text-blue-700">- Chị Lan, Quận 7</div>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                        <p className="italic text-gray-700 mb-4">"Chất lượng rèm rất tốt, màu sắc đúng như mẫu. Đặc biệt ấn tượng với đội ngũ lắp đặt chuyên nghiệp và gọn gàng."</p>
                        <div className="font-semibold text-blue-700">- Anh Tuấn, Quận 2</div>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                        <p className="italic text-gray-700 mb-4">"Tôi đã tìm hiểu nhiều nơi và quyết định chọn Curtain Shop. Kết quả hoàn toàn xứng đáng, rèm đẹp và chất lượng vượt mong đợi."</p>
                        <div className="font-semibold text-blue-700">- Chị Hương, Quận 10</div>
                    </div>
                </div>
            </section>

            <div className="text-center bg-blue-50 p-8 rounded-lg">
                <h3 className="text-xl font-semibold mb-3 text-blue-800">Bạn muốn thi công rèm cho công trình của mình?</h3>
                <p className="text-gray-700 mb-5">Hãy liên hệ với chúng tôi để được tư vấn và báo giá miễn phí!</p>
                <button className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition font-medium">
                    Liên hệ ngay
                </button>
            </div>
        </main>
    );
}
