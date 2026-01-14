
import { GoogleGenAI, Type, Chat } from "@google/genai";
import { CustomItineraryResponse } from "../types";

// Helper để dọn dẹp chuỗi JSON từ AI
const cleanJson = (str: string) => str.replace(/```json/g, "").replace(/```/g, "").trim();

export const getAIClient = () => {
  if (!process.env.API_KEY) {
    throw new Error("API_KEY_MISSING");
  }
  return new GoogleGenAI({ apiKey: process.env.API_KEY });
};

// 1. Tác vụ Lên lịch trình chi tiết (Planner)
export const generateCustomItinerary = async (params: {
  days: number;
  budget: string;
  style: string;
  interests: string;
}): Promise<CustomItineraryResponse | null> => {
  try {
    const ai = getAIClient();
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Hãy thiết kế một hành trình du lịch Nhật Bản chi tiết. 
        Số ngày: ${params.days} ngày. 
        Ngân sách: ${params.budget}. 
        Phong cách: ${params.style}. 
        Yêu cầu: ${params.interests || "Khám phá tinh hoa bản địa"}.`,
      config: {
        systemInstruction: "Bạn là chuyên gia thiết kế tour cao cấp của SigFlex Japan. Luôn trả về JSON theo Schema. Ngôn ngữ: Tiếng Việt.",
        responseMimeType: "application/json",
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
                  activities: { type: Type.ARRAY, items: { type: Type.STRING } },
                  tips: { type: Type.STRING }
                },
                required: ["day", "title", "activities", "tips"]
              }
            },
            totalEstimatedCost: { type: Type.STRING },
            recommendations: { type: Type.ARRAY, items: { type: Type.STRING } }
          },
          required: ["itinerary", "totalEstimatedCost", "recommendations"]
        }
      }
    });

    const text = response.text;
    if (!text) return null;
    return JSON.parse(cleanJson(text)) as CustomItineraryResponse;
  } catch (error: any) {
    console.error("Gemini Planner Error:", error);
    if (error.message === "API_KEY_MISSING") throw new Error("Chưa cấu hình API Key");
    return null;
  }
};

// 2. Tác vụ Tư vấn khách hàng (Chatbot)
export const createConsultantChat = (): Chat => {
  const ai = getAIClient();
  return ai.chats.create({
    model: "gemini-3-flash-preview",
    config: {
      systemInstruction: `Bạn là 'Trợ lý SigFlex AI' - chuyên gia tư vấn du lịch Nhật Bản cao cấp. 
      Nhiệm vụ: 
      1. Tư vấn lịch trình theo mục đích (Golf, chữa lành, shopping, visa).
      2. Trả lời lịch sự, tinh tế, đẳng cấp. 
      3. Luôn khuyến khích khách hàng liên hệ Zalo 0967.652.331 nếu cần hỗ trợ xe riêng/visa gấp.
      4. Ngôn ngữ: Tiếng Việt ấm áp, chuyên nghiệp.`
    }
  });
};
