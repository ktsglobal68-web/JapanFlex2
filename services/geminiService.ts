
import { GoogleGenAI, Type } from "@google/genai";
import { CustomItineraryResponse } from "../types";

export const generateCustomItinerary = async (params: {
  days: number;
  budget: string;
  style: string;
  interests: string;
}): Promise<CustomItineraryResponse | null> => {
  try {
    // Luôn khởi tạo instance mới để đảm bảo lấy đúng API Key mới nhất
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    const response = await ai.models.generateContent({
      model: "gemini-3-pro-preview",
      contents: `Lập lịch trình du lịch Nhật Bản chi tiết cho chuyến đi ${params.days} ngày. 
      Phong cách: ${params.style}. 
      Mức ngân sách: ${params.budget}. 
      Yêu cầu riêng: ${params.interests || "Không có yêu cầu đặc biệt"}. 
      Hãy đưa ra các địa điểm cụ thể và hoạt động hàng ngày hấp dẫn bằng tiếng Việt.`,
      config: {
        systemInstruction: "Bạn là chuyên gia tư vấn lữ hành cao cấp tại JapanFlex. Nhiệm vụ của bạn là thiết kế lịch trình du lịch Nhật Bản độc bản, sang trọng và cá nhân hóa. Phản hồi phải luôn ở định dạng JSON chuẩn theo schema được cung cấp.",
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            itinerary: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  day: { type: Type.INTEGER },
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

    const text = response.text;
    if (!text) return null;
    return JSON.parse(text) as CustomItineraryResponse;
  } catch (error) {
    console.error("Gemini Error:", error);
    return null;
  }
};
