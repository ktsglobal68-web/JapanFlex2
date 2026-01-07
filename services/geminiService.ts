
import { GoogleGenAI, Type } from "@google/genai";
import { CustomItineraryResponse } from "../types";

export const generateCustomItinerary = async (params: {
  days: number;
  budget: string;
  style: string;
  interests: string;
}): Promise<CustomItineraryResponse | null> => {
  try {
    const apiKey = process.env.API_KEY;
    if (!apiKey) {
      console.error("API_KEY is missing. Please check your environment variables.");
      return null;
    }

    const ai = new GoogleGenAI({ apiKey });
    
    const prompt = `Hãy lập lịch trình du lịch Nhật Bản chi tiết bằng tiếng Việt.
    Thông tin chuyến đi:
    - Thời gian: ${params.days} ngày
    - Phong cách: ${params.style}
    - Ngân sách: ${params.budget}
    - Yêu cầu đặc biệt: ${params.interests || "Không có"}
    
    Yêu cầu: Trả về một đối tượng JSON có cấu trúc chính xác như sau:
    {
      "itinerary": [
        {"day": 1, "title": "...", "activities": ["...", "..."], "tips": "..."},
        ...
      ],
      "totalEstimatedCost": "...",
      "recommendations": ["...", "..."]
    }`;

    // Sử dụng cấu trúc contents đầy đủ để đảm bảo tính tương thích cao nhất trên môi trường production
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: [{ parts: [{ text: prompt }] }],
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
    if (!text) throw new Error("AI returned empty text");

    // Xử lý chuỗi JSON an toàn: loại bỏ bất kỳ ký tự rác nào nếu AI vô tình trả về markdown
    const startIdx = text.indexOf('{');
    const endIdx = text.lastIndexOf('}');
    if (startIdx === -1 || endIdx === -1) {
      throw new Error("Invalid JSON structure returned from AI");
    }
    const cleanJson = text.substring(startIdx, endIdx + 1);
    
    return JSON.parse(cleanJson) as CustomItineraryResponse;
  } catch (error) {
    console.error("Gemini Production Error, attempting fallback:", error);
    // Nếu lỗi do schema hoặc MIME type không hỗ trợ ở một số region, thử gọi lại bản dự phòng tối giản
    try {
      return await generateFallbackItinerary(params);
    } catch (fallbackError) {
      console.error("Fallback also failed:", fallbackError);
      return null;
    }
  }
};

/**
 * Hàm dự phòng nếu cấu hình JSON nghiêm ngặt hoặc Schema gặp sự cố tại một số khu vực
 */
async function generateFallbackItinerary(params: any): Promise<CustomItineraryResponse | null> {
  const apiKey = process.env.API_KEY || "";
  if (!apiKey) return null;
  
  const ai = new GoogleGenAI({ apiKey });
  const prompt = `Lập lịch trình du lịch Nhật Bản ${params.days} ngày cho phong cách ${params.style}. 
  Trả về duy nhất dữ liệu JSON (không markdown) gồm itinerary (mảng object day, title, activities, tips), totalEstimatedCost (string), recommendations (mảng string).`;
  
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: [{ parts: [{ text: prompt }] }]
  });

  const text = response.text || "";
  const start = text.indexOf('{');
  const end = text.lastIndexOf('}');
  if (start !== -1 && end !== -1) {
    return JSON.parse(text.substring(start, end + 1));
  }
  return null;
}
