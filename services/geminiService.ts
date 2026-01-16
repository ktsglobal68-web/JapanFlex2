
import { GoogleGenAI, Type } from "@google/genai";
import { CustomItineraryResponse } from "../types";

/**
 * SigFlex Japan - AI Service Implementation
 * Provides functions for generating custom itineraries and chatbot consultations using Gemini API.
 */

// Fix: Implement generateCustomItinerary for AI Planner to design personalized Japan tours
export const generateCustomItinerary = async (formData: {
  days: number;
  budget: string;
  style: string;
  interests: string;
}): Promise<CustomItineraryResponse | null> => {
  // Always initialize right before making an API call to use the latest API key from environment
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const prompt = `Thiết kế lịch trình du lịch Nhật Bản chi tiết dựa trên các yêu cầu sau:
    - Thời gian: ${formData.days} ngày
    - Ngân sách: ${formData.budget}
    - Phong cách du lịch: ${formData.style}
    - Sở thích/Yêu cầu đặc biệt: ${formData.interests}
    
    Phản hồi bằng tiếng Việt và tuân thủ định dạng JSON được cung cấp.`;

  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-preview',
    contents: prompt,
    config: {
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

  try {
    const text = response.text;
    if (!text) return null;
    return JSON.parse(text.trim()) as CustomItineraryResponse;
  } catch (err) {
    console.error("Error parsing itinerary JSON from Gemini:", err);
    return null;
  }
};

// Fix: Implement createConsultantChat for the AI Chatbot Assistant session
export const createConsultantChat = () => {
  // Always initialize right before starting a chat session to use the latest API key
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  return ai.chats.create({
    model: 'gemini-3-flash-preview',
    config: {
      systemInstruction: `Bạn là SigFlex AI Expert, trợ lý tư vấn du lịch cao cấp của SigFlex Japan. 
      SigFlex Japan chuyên về tour Private (xe riêng) hoàn toàn linh hoạt (Flexibility) và độc bản (Signature).
      Dịch vụ chính bao gồm: Tour Cung Đường Vàng, Tour Golf, Tour Ẩm Thực Kobe, và Du lịch tầm soát sức khỏe.
      Thông tin liên hệ: 0967.652.331 hoặc Zalo https://zalo.me/0967652331.
      Vui lòng trả lời bằng tiếng Việt, phong cách chuyên nghiệp, sang trọng và tận tâm.`,
    },
  });
};
