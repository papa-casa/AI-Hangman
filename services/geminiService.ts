import { GoogleGenAI, Type } from "@google/genai";
import { WordData, Language } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateWordFromTopic = async (topic: string, language: Language): Promise<WordData> => {
  try {
    const langMap: Record<Language, string> = {
      IT: 'Italian',
      EN: 'English',
      FR: 'French',
      ES: 'Spanish',
      DE: 'German'
    };
    
    const langName = langMap[language];
    
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Generate a single secret word related to the topic "${topic}" in ${langName}. 
      The word should be a common ${langName} noun, no spaces, no hyphens, no special characters, between 5 and 12 letters long.
      Provide a helpful but cryptic hint in ${langName}.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            word: { type: Type.STRING, description: "The secret word, uppercase." },
            hint: { type: Type.STRING, description: "A hint for the player." }
          },
          required: ["word", "hint"]
        }
      }
    });

    if (response.text) {
      const data = JSON.parse(response.text);
      return {
        word: data.word.toUpperCase(),
        hint: data.hint
      };
    }
    throw new Error("No response text from Gemini");
  } catch (error) {
    console.error("Gemini API Error:", error);
    // Fallback based on language
    const fallback: Record<Language, WordData> = {
      IT: { word: "ERRORE", hint: "Riprova più tardi." },
      EN: { word: "ERROR", hint: "Try again later." },
      FR: { word: "ERREUR", hint: "Réessayez plus tard." },
      ES: { word: "ERROR", hint: "Inténtalo más tarde." },
      DE: { word: "FEHLER", hint: "Später versuchen." }
    };
    return fallback[language];
  }
};