
import { GoogleGenAI, Type } from "@google/genai";
import { CustomItineraryResponse } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || "" });

export const generateCustomItinerary = async (params: {
  days: number;
  budget: string;
  style: string;
  interests: string;
}): Promise<CustomItineraryResponse | null> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Design a custom Japan travel itinerary for a ${params.days}-day trip. 
      Style: ${params.style}. 
      Budget level: ${params.budget}. 
      Interests: ${params.interests}. 
      Provide specific locations and estimated daily activities in Vietnamese.`,
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

    const text = response.text;
    if (!text) return null;
    return JSON.parse(text) as CustomItineraryResponse;
  } catch (error) {
    console.error("Gemini Error:", error);
    return null;
  }
};
