
import { GoogleGenAI, Type, Chat } from "@google/genai";
import { CustomItineraryResponse } from "../types";

/**
 * Hàm hỗ trợ dọn dẹp và trích xuất JSON từ phản hồi của AI
 */
const extractJson = (text: string): any => {
  try {
    // Tìm vị trí của dấu ngoặc nhọn đầu tiên và cuối cùng
    const start = text.indexOf('{');
    const end = text.lastIndexOf('}');
    if (start === -1 || end === -1) return null;
    
    const jsonStr = text.substring(start, end + 1);
    return JSON.parse(jsonStr);
  } catch (e) {
    console.error("Lỗi parse JSON từ AI:", e);
    return null;
  }
};

export const getAIClient = () => {
  if (!process.env.API_KEY) {
    console.warn("CẢNH BÁO: API_KEY không tìm thấy trong môi trường.");
    throw new Error("API_KEY_MISSING");
  }
  return new GoogleGenAI({ apiKey: process.env.API_KEY });
};

// 1. Tác vụ Lên lịch trình (Sử dụng model Pro cho độ chính xác cao)
export const generateCustomItinerary = async (params: {
  days: number;
  budget: string;
  style: string;
  interests: string;
}): Promise<CustomItineraryResponse | null> => {
  try {
    const ai = getAIClient();
    console.log("Đang khởi tạo lịch trình với Gemini 3 Pro...");
    
    const response = await ai.models.generateContent({
      model: "gemini-3-pro-preview",
      contents: `Hãy thiết kế một hành trình du lịch Nhật Bản chi tiết theo yêu cầu sau:
        - Số ngày: ${params.days} ngày.
        - Ngân sách: ${params.budget}.
        - Đối tượng: ${params.style}.
        - Mong muốn đặc biệt: ${params.interests || "Trải nghiệm văn hóa và ẩm thực địa phương"}.`,
      config: {
        systemInstruction: "Bạn là chuyên gia tư vấn tour Nhật Bản. Trả về dữ liệu thuần JSON, không bao gồm văn bản dẫn nhập. Ngôn ngữ: Tiếng Việt.",
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

    const result = extractJson(response.text);
    if (!result) {
      console.error("AI không trả về đúng định dạng JSON mong muốn.");
      return null;
    }
    return result as CustomItineraryResponse;
  } catch (error: any) {
    console.error("Lỗi Planner AI:", error);
    throw error;
  }
};

// 2. Tác vụ Tư vấn khách hàng (Chatbot)
export const createConsultantChat = (): Chat => {
  const ai = getAIClient();
  return ai.chats.create({
    model: "gemini-3-flash-preview",
    config: {
      systemInstruction: `Bạn là 'Trợ lý SigFlex AI' - chuyên gia du lịch Nhật Bản. 
      Ngôn ngữ: Tiếng Việt chuyên nghiệp, tinh tế.
      Nhiệm vụ:
      1. Lắng nghe nhu cầu du lịch (mục đích, sở thích, ngân sách).
      2. Đề xuất các giải pháp tour (Golf, Visa, Xe riêng, Tầm soát sức khỏe).
      3. Khuyến khích khách liên hệ Zalo ${CONTACT_INFO_PLACEHOLDER} để nhận báo giá chi tiết.
      Lưu ý: Không tự ý bịa đặt thông tin nếu không chắc chắn.`,
      temperature: 0.7,
      topK: 40
    }
  });
};

// Hỗ trợ truyền thông tin liên hệ vào systemInstruction
const CONTACT_INFO_PLACEHOLDER = '0967.652.331';
