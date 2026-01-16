
import { GoogleGenAI, Type } from "@google/genai";
import { CustomItineraryResponse } from "../types";

// Fix: Initialize GoogleGenAI using the recommended pattern and environment variable
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

// Fix: Updated generateCustomItinerary to accept formData and return structured JSON using gemini-3-pro-preview
export const generateCustomItinerary = async (formData: {
  days: number;
  budget: string;
  style: string;
  interests: string;
}): Promise<CustomItineraryResponse | null> => {
  const prompt = `Hãy thiết kế một lịch trình du lịch Nhật Bản chi tiết trong ${formData.days} ngày. 
    Mức ngân sách: ${formData.budget}. 
    Phong cách du lịch: ${formData.style}. 
    Sở thích/Yêu cầu cụ thể: ${formData.interests}. 
    Câu trả lời phải bằng tiếng Việt.`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: prompt,
      config: {
        systemInstruction: "Bạn là chuyên gia tư vấn du lịch Nhật Bản cao cấp tại SigFlex Japan. Hãy tạo lịch trình mang tính cá nhân hóa cao (Signature) và linh hoạt (Flexibility).",
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
                  activities: { type: Type.ARRAY, items: { type: Type.STRING } },
                  tips: { type: Type.STRING },
                },
                required: ["day", "title", "activities", "tips"],
              },
            },
            totalEstimatedCost: { type: Type.STRING },
            recommendations: { type: Type.ARRAY, items: { type: Type.STRING } },
          },
          required: ["itinerary", "totalEstimatedCost", "recommendations"],
        },
      },
    });

    const text = response.text;
    if (!text) return null;
    return JSON.parse(text.trim());
  } catch (error) {
    console.error("Gemini Itinerary Generation Error:", error);
    throw error;
  }
};

// Fix: Implemented createConsultantChat to return a Gemini chat session for AI interaction
export const createConsultantChat = () => {
  return ai.chats.create({
    model: 'gemini-3-flash-preview',
    config: {
      systemInstruction: 'Bạn là chuyên gia tư vấn du lịch của SigFlex Japan. Hãy trả lời các câu hỏi của khách hàng về du lịch Nhật Bản, visa, xe riêng, và các dịch vụ của SigFlex Japan một cách chuyên nghiệp, tận tâm bằng tiếng Việt. Nếu không biết chắc chắn, hãy khuyên khách hàng liên hệ hotline/Zalo 0967.652.331.',
    },
  });
};
