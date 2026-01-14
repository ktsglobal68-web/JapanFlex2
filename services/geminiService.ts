
import { GoogleGenAI, Type } from "@google/genai";
import { CustomItineraryResponse } from "../types";

export const generateCustomItinerary = async (params: {
  days: number;
  budget: string;
  style: string;
  interests: string;
}): Promise<CustomItineraryResponse | null> => {
  try {
    // Khởi tạo instance AI với API Key từ môi trường
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    // Sử dụng model gemini-3-flash-preview cho tốc độ phản hồi nhanh
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Lập lịch trình du lịch Nhật Bản chi tiết trong ${params.days} ngày. 
        Phong cách: ${params.style}. 
        Ngân sách: ${params.budget}. 
        Yêu cầu đặc biệt: ${params.interests || "Không có"}.`,
      config: {
        systemInstruction: "Bạn là một chuyên gia thiết kế tour du lịch Nhật Bản cao cấp cho khách hàng Việt Nam. Bạn luôn tư vấn những điểm đến tinh tế, tối ưu thời gian và đậm chất cá nhân hóa.",
        responseMimeType: "application/json",
        // Định nghĩa Schema rõ ràng để đảm bảo AI trả về đúng cấu trúc dữ liệu
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            itinerary: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  day: { type: Type.NUMBER },
                  title: { type: Type.STRING },
                  activities: { 
                    type: Type.ARRAY, 
                    items: { type: Type.STRING } 
                  },
                  tips: { type: Type.STRING }
                },
                required: ["day", "title", "activities", "tips"]
              }
            },
            totalEstimatedCost: { type: Type.STRING },
            recommendations: { 
              type: Type.ARRAY, 
              items: { type: Type.STRING } 
            }
          },
          required: ["itinerary", "totalEstimatedCost", "recommendations"]
        }
      }
    });

    // Lấy văn bản trực tiếp từ property .text (không gọi hàm text())
    const jsonStr = response.text;
    if (!jsonStr) return null;

    return JSON.parse(jsonStr) as CustomItineraryResponse;
  } catch (error) {
    console.error("Lỗi kết nối Gemini API:", error);
    return null;
  }
};
