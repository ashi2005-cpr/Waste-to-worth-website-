import { GoogleGenAI, Chat, Type, Modality } from "@google/genai";
import { GroundingSource } from '../types';

if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable is not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

/**
 * Analyzes an image of waste to determine its type and description.
 */
export const analyzeWasteImage = async (base64Image: string, mimeType: string): Promise<string> => {
  const textPart = {
    text: `Analyze this image of bio-waste. Identify it and provide a suitable title, waste type (e.g., Food Waste, Agricultural Waste, Wood Waste), and a brief, compelling description for a marketplace listing. Return the response as a single, clean JSON object with keys: "title", "type", and "description". Example: {"title": "Spent Coffee Grounds", "type": "Food Waste", "description": "High-quality arabica coffee grounds, perfect for compost or mushroom cultivation."}`
  };
  const imagePart = {
    inlineData: {
      data: base64Image,
      mimeType: mimeType,
    },
  };

  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: { parts: [textPart, imagePart] },
     config: {
      responseMimeType: "application/json",
    },
  });
  return response.text;
};


/**
 * Searches for waste using Google Maps grounding.
 */
export const searchWasteWithMaps = async (query: string, location: GeolocationCoordinates | null): Promise<string> => {
  const config: any = { tools: [{ googleMaps: {} }] };
  if (location) {
      config.toolConfig = {
          retrievalConfig: {
              latLng: {
                  latitude: location.latitude,
                  longitude: location.longitude,
              },
          },
      };
  }
  
  const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Find the following bio-waste for me: ${query}. Provide a list of potential locations or types.`,
      config,
  });

  return response.text;
};

/**
 * Gets educational content using Google Search grounding.
 */
export const getEducationalContent = async (query: string): Promise<{ text: string, sources: GroundingSource[] }> => {
    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: query,
        config: {
            tools: [{ googleSearch: {} }],
        },
    });

    const sources = response.candidates?.[0]?.groundingMetadata?.groundingChunks ?? [];
    return { text: response.text, sources };
};

/**
 * Handles a conversation with the chatbot.
 */
export const askChatBot = async (
  chatInstance: Chat | null,
  message: string,
  systemInstruction: string
): Promise<{ chat: Chat; response: string }> => {
  let chat = chatInstance;
  if (!chat) {
    chat = ai.chats.create({
      model: 'gemini-2.5-flash',
      config: {
        systemInstruction: systemInstruction,
      },
    });
  }

  const response = await chat.sendMessage({ message: message });
  return { chat, response: response.text };
};

/**
 * Converts text to speech.
 */
export const getTextToSpeech = async (text: string): Promise<string> => {
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-preview-tts',
        contents: [{ parts: [{ text: text }] }],
        config: {
            responseModalities: [Modality.AUDIO],
            speechConfig: {
                voiceConfig: {
                    prebuiltVoiceConfig: { voiceName: 'Kore' },
                },
            },
        },
    });
    
    const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
    if (!base64Audio) {
        throw new Error("No audio data received from API.");
    }
    return base64Audio;
}
