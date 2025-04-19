import React from "react";
import Image from "next/image";
import { thiCongImages } from "./images";

export default function ThiCongLapRemPage() {
  return (
    <main className="container mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-900">Chia Sẻ Thi Công Lắp Đặt Rèm</h1>
      <section className="mb-10">
        <p className="text-lg text-gray-700 mb-4 text-center">
          Chúng tôi tự hào chia sẻ những công trình rèm cửa đã thi công thực tế. Dưới đây là một số hình ảnh hoàn thiện và trải nghiệm thực tế từ đội ngũ Curtain Shop.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6">
          {thiCongImages.map((img, idx) => (
            <div key={idx} className="rounded overflow-hidden shadow hover:shadow-lg transition">
              <Image src={img.src} alt={img.alt} width={400} height={300} className="object-cover w-full h-60" />
              <div className="p-2 text-gray-600 text-center text-sm">{img.alt}</div>
            </div>
          ))}
        </div>
      </section>
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-3 text-blue-800">Quy trình thi công lắp đặt rèm</h2>
        <ol className="list-decimal ml-6 text-gray-700 space-y-2">
          <li><b>Khảo sát và tư vấn:</b> Đội ngũ đến tận nơi đo đạc, tư vấn mẫu mã phù hợp.</li>
          <li><b>Báo giá & ký hợp đồng:</b> Gửi báo giá chi tiết, ký hợp đồng nếu khách hàng đồng ý.</li>
          <li><b>Thi công lắp đặt:</b> Lắp đặt rèm đúng kỹ thuật, vệ sinh sạch sẽ sau khi hoàn thành.</li>
          <li><b>Nghiệm thu & bàn giao:</b> Khách hàng kiểm tra, nghiệm thu và được hướng dẫn sử dụng.</li>
          <li><b>Hỗ trợ sau lắp đặt:</b> Bảo hành, hỗ trợ kỹ thuật tận tình.</li>
        </ol>
      </section>
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">2. Báo giá và ký hợp đồng</h2>
        <ul className="list-disc ml-6 text-gray-700">
          <li>Gửi báo giá chi tiết từng hạng mục cho khách hàng.</li>
          <li>Ký hợp đồng thi công lắp đặt rèm (nếu khách hàng đồng ý).</li>
        </ul>
      </section>
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">3. Thi công lắp đặt</h2>
        <ul className="list-disc ml-6 text-gray-700">
          <li>Đội ngũ kỹ thuật tiến hành lắp đặt rèm theo đúng thiết kế và yêu cầu.</li>
          <li>Vệ sinh khu vực thi công sạch sẽ sau khi hoàn thành.</li>
        </ul>
      </section>
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">4. Nghiệm thu và bàn giao</h2>
        <ul className="list-disc ml-6 text-gray-700">
          <li>Khách hàng kiểm tra và nghiệm thu sản phẩm đã lắp đặt.</li>
          <li>Hướng dẫn sử dụng và bảo quản rèm đúng cách.</li>
        </ul>
      </section>
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-3 text-blue-800">Cảm nhận khách hàng</h2>
        <div className="bg-gray-50 p-4 rounded shadow text-gray-700 max-w-xl mx-auto">
          <p className="italic">"Rèm cửa được lắp rất nhanh, đẹp và đúng ý tôi. Đội ngũ thi công chuyên nghiệp, tư vấn tận tình. Tôi rất hài lòng!"</p>
          <div className="text-right mt-2 font-semibold text-indigo-700">- Chị Lan, Quận 7</div>
        </div>
      </section>
      <div className="mt-10 text-center text-gray-500 text-sm">
        <p>Mọi thắc mắc về quy trình hoặc muốn xem mẫu thực tế, vui lòng liên hệ hotline hoặc điền vào form liên hệ của chúng tôi!</p>
      </div>
    </main>
  );
}
