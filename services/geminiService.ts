
import { GoogleGenAI, Type } from "@google/genai";
import { CustomItineraryResponse } from "../types";

export const generateCustomItinerary = async (params: {
  days: number;
  budget: string;
  style: string;
  interests: string;
}): Promise<CustomItineraryResponse | null> => {
  try {
    // Khởi tạo AI với API Key từ môi trường
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    // Prompt tối giản nhưng hiệu quả cao
    const prompt = `Lập lịch trình du lịch Nhật Bản ${params.days} ngày.
Phong cách: ${params.style}, Ngân sách: ${params.budget}.
Yêu cầu: ${params.interests || "Không có"}.

Bạn PHẢI trả về dữ liệu dưới dạng JSON thuần túy theo cấu trúc này:
{
  "itinerary": [
    {"day": 1, "title": "Tên ngày", "activities": ["Hoạt động 1", "Hoạt động 2"], "tips": "Lời khuyên"}
  ],
  "totalEstimatedCost": "Ước tính chi phí",
  "recommendations": ["Gợi ý 1", "Gợi ý 2"]
}
Chỉ trả về JSON, không kèm văn bản khác.`;

    // Gọi API với cấu hình an toàn nhất
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt, // Sử dụng chuỗi trực tiếp để tăng độ ổn định
      config: {
        responseMimeType: "application/json"
      }
    });

    const text = response.text;
    if (!text) {
      console.error("Gemini: Empty response");
      return null;
    }

    // Bộ lọc JSON mạnh mẽ để xử lý lỗi "Hệ thống bận" do parse thất bại
    try {
      const startIdx = text.indexOf('{');
      const endIdx = text.lastIndexOf('}');
      if (startIdx !== -1 && endIdx !== -1) {
        const cleanJson = text.substring(startIdx, endIdx + 1);
        return JSON.parse(cleanJson) as CustomItineraryResponse;
      }
      return JSON.parse(text) as CustomItineraryResponse;
    } catch (parseError) {
      console.error("Gemini: JSON Parse Error", text);
      return null;
    }
  } catch (error) {
    console.error("Gemini: Connection Error", error);
    // Trả về null để UI xử lý thông báo lỗi cho người dùng
    return null;
  }
};
