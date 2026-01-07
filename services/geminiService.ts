
import { GoogleGenAI, Type } from "@google/genai";
import { CustomItineraryResponse } from "../types";

export const generateCustomItinerary = async (params: {
  days: number;
  budget: string;
  style: string;
  interests: string;
}): Promise<CustomItineraryResponse | null> => {
  try {
    // Khởi tạo instance với API Key từ môi trường
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    const prompt = `Lập lịch trình du lịch Nhật Bản chi tiết cho chuyến đi ${params.days} ngày. 
    Phong cách: ${params.style}. 
    Mức ngân sách: ${params.budget}. 
    Yêu cầu riêng: ${params.interests || "Không có yêu cầu đặc biệt"}. 
    Hãy đưa ra các địa điểm cụ thể và hoạt động hàng ngày hấp dẫn bằng tiếng Việt.`;

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: [{ parts: [{ text: prompt }] }],
      config: {
        systemInstruction: "Bạn là chuyên gia tư vấn lữ hành cao cấp tại JapanFlex. Nhiệm vụ của bạn là thiết kế lịch trình du lịch Nhật Bản độc bản, sang trọng và cá nhân hóa. Luôn trả về dữ liệu dưới dạng JSON thuần túy, không bao gồm ký tự markdown.",
        responseMimeType: "application/json",
        thinkingConfig: { thinkingBudget: 0 },
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
                required: ["day", "title", "activities", "tips"],
                propertyOrdering: ["day", "title", "activities", "tips"]
              }
            },
            totalEstimatedCost: { type: Type.STRING },
            recommendations: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            }
          },
          required: ["itinerary", "totalEstimatedCost", "recommendations"],
          propertyOrdering: ["itinerary", "totalEstimatedCost", "recommendations"]
        }
      }
    });

    const text = response.text;
    if (!text) {
      console.error("Gemini returned empty response");
      return null;
    }
    
    // Làm sạch chuỗi JSON nếu cần thiết
    const cleanJson = text.replace(/```json/g, '').replace(/```/g, '').trim();
    return JSON.parse(cleanJson) as CustomItineraryResponse;
  } catch (error) {
    console.error("Gemini Service Error:", error);
    return null;
  }
};
