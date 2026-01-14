
import { GoogleGenAI, Type } from "@google/genai";
import { CustomItineraryResponse } from "../types";

/**
 * Hàm hỗ trợ dọn dẹp chuỗi JSON trả về từ AI
 * Loại bỏ các khối markdown ```json ... ``` nếu có
 */
const cleanJsonString = (str: string): string => {
  return str.replace(/```json/g, "").replace(/```/g, "").trim();
};

export const generateCustomItinerary = async (params: {
  days: number;
  budget: string;
  style: string;
  interests: string;
}): Promise<CustomItineraryResponse | null> => {
  try {
    // Kiểm tra API Key (chỉ log trạng thái, không log giá trị key vì bảo mật)
    if (!process.env.API_KEY) {
      console.error("LỖI: API_KEY chưa được thiết lập trong biến môi trường.");
      return null;
    }

    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    console.log("Đang gửi yêu cầu thiết kế lịch trình đến Gemini 3 Flash...");

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Hãy thiết kế một hành trình du lịch Nhật Bản chi tiết. 
        Số ngày: ${params.days} ngày. 
        Ngân sách: ${params.budget === 'high' ? 'Cao cấp (Luxury)' : params.budget === 'mid' ? 'Tiêu chuẩn (Comfort)' : 'Tiết kiệm (Signature)'}. 
        Đối tượng: ${params.style === 'family' ? 'Gia đình có trẻ nhỏ/người già' : params.style === 'couple' ? 'Cặp đôi/Trăng mật' : 'Khách đi một mình (Solo)'}. 
        Yêu cầu đặc biệt: ${params.interests || "Khám phá các điểm đến tinh tế, ẩm thực bản địa và tối ưu thời gian di chuyển"}.`,
      config: {
        systemInstruction: "Bạn là chuyên gia thiết kế tour Nhật Bản cấp cao. Luôn trả về dữ liệu thuần JSON theo đúng Schema được cung cấp. Không thêm văn bản giải thích ngoài JSON.",
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            itinerary: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  day: { type: Type.INTEGER, description: "Số thứ tự ngày" },
                  title: { type: Type.STRING, description: "Tiêu đề chính của ngày hôm đó" },
                  activities: { 
                    type: Type.ARRAY, 
                    items: { type: Type.STRING },
                    description: "Danh sách 3-4 hoạt động chính"
                  },
                  tips: { type: Type.STRING, description: "Lưu ý quan trọng cho ngày này" }
                },
                required: ["day", "title", "activities", "tips"]
              }
            },
            totalEstimatedCost: { type: Type.STRING, description: "Ước tính tổng chi phí theo VNĐ hoặc USD" },
            recommendations: { 
              type: Type.ARRAY, 
              items: { type: Type.STRING },
              description: "3 lời khuyên từ chuyên gia cho toàn bộ chuyến đi"
            }
          },
          required: ["itinerary", "totalEstimatedCost", "recommendations"]
        }
      }
    });

    const rawText = response.text;
    if (!rawText) {
      console.error("LỖI: Gemini trả về phản hồi rỗng.");
      return null;
    }

    const cleanedJson = cleanJsonString(rawText);
    console.log("Dữ liệu AI trả về thành công, đang tiến hành xử lý...");
    
    return JSON.parse(cleanedJson) as CustomItineraryResponse;
  } catch (error: any) {
    // Log chi tiết lỗi để bạn có thể kiểm tra trong F12 Console của trình duyệt
    console.error("--- LỖI KẾT NỐI GEMINI AI ---");
    console.error("Thông điệp lỗi:", error?.message || error);
    if (error?.message?.includes("API key not valid")) {
      console.error("Gợi ý: API Key của bạn có vẻ không hợp lệ hoặc đã hết hạn.");
    }
    return null;
  }
};
