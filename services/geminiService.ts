
import { GoogleGenAI, Type } from "@google/genai";
import { CustomItineraryResponse } from "../types";

export const generateCustomItinerary = async (params: {
  days: number;
  budget: string;
  style: string;
  interests: string;
}): Promise<CustomItineraryResponse | null> => {
  try {
    // Luôn khởi tạo instance mới để đảm bảo tính sẵn sàng của API Key
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    // Prompt tối ưu: Ngắn gọn, súc tích và tập trung vào dữ liệu
    const prompt = `Hãy lập lịch trình du lịch Nhật Bản chi tiết bằng tiếng Việt.
    Thông tin chuyến đi:
    - Thời gian: ${params.days} ngày
    - Phong cách: ${params.style}
    - Ngân sách: ${params.budget}
    - Yêu cầu đặc biệt: ${params.interests || "Không có"}
    Yêu cầu: Trả về JSON chính xác theo cấu trúc itinerary, totalEstimatedCost, recommendations.`;

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt, // Sử dụng chuỗi trực tiếp cho độ ổn định cao nhất
      config: {
        systemInstruction: "Bạn là chuyên gia tư vấn lữ hành JapanFlex. Luôn phản hồi bằng JSON chuẩn, không bao gồm các ký tự đánh dấu markdown như ```json.",
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
    if (!text) {
      console.warn("AI returned empty text");
      return null;
    }

    // Xử lý chuỗi JSON an toàn: loại bỏ bất kỳ ký tự rác nào nếu AI vô tình trả về
    const startIdx = text.indexOf('{');
    const endIdx = text.lastIndexOf('}');
    if (startIdx === -1 || endIdx === -1) {
      throw new Error("Invalid JSON structure returned from AI");
    }
    const cleanJson = text.substring(startIdx, endIdx + 1);
    
    return JSON.parse(cleanJson) as CustomItineraryResponse;
  } catch (error) {
    console.error("Gemini Production Error:", error);
    return null;
  }
};
