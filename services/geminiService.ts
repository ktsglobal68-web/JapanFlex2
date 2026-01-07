
import { GoogleGenAI, Type } from "@google/genai";
import { CustomItineraryResponse } from "../types";

export const generateCustomItinerary = async (params: {
  days: number;
  budget: string;
  style: string;
  interests: string;
}): Promise<CustomItineraryResponse | null> => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    // Yêu cầu AI trả về JSON cực kỳ nghiêm ngặt
    const prompt = `Hành động như một chuyên gia du lịch Nhật Bản cao cấp. Lập lịch trình ${params.days} ngày cho phong cách ${params.style}, ngân sách ${params.budget}. 
Yêu cầu riêng: ${params.interests || "Không có"}.

TRẢ VỀ DUY NHẤT JSON THEO CẤU TRÚC:
{
  "itinerary": [
    {"day": 1, "title": "Tiêu đề", "activities": ["HĐ1", "HĐ2"], "tips": "Mẹo nhỏ"}
  ],
  "totalEstimatedCost": "Giá dự kiến",
  "recommendations": ["Gợi ý"]
}`;

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        temperature: 0.7, // Tăng độ sáng tạo nhưng vẫn giữ trong khuôn khổ JSON
      }
    });

    const text = response.text?.trim();
    if (!text) return null;

    // Xử lý JSON linh hoạt hơn (loại bỏ markdown nếu AI lỡ tay thêm vào)
    try {
      const cleanText = text.replace(/```json/g, "").replace(/```/g, "").trim();
      return JSON.parse(cleanText) as CustomItineraryResponse;
    } catch (parseError) {
      // Fallback: Tìm cặp dấu ngoặc nhọn đầu tiên và cuối cùng
      const firstBrace = text.indexOf('{');
      const lastBrace = text.lastIndexOf('}');
      if (firstBrace !== -1 && lastBrace !== -1) {
        const potentialJson = text.substring(firstBrace, lastBrace + 1);
        return JSON.parse(potentialJson) as CustomItineraryResponse;
      }
      throw parseError;
    }
  } catch (error) {
    console.error("Gemini Critical Error:", error);
    return null;
  }
};
