
import { GoogleGenAI, Type, GenerateContentResponse } from "@google/genai";

// Always initialize a new GoogleGenAI instance using process.env.API_KEY directly
const getAIClient = () => {
  return new GoogleGenAI({ apiKey: process.env.API_KEY });
};

export const generateAgentPlan = async (userPrompt: string): Promise<{ steps: string[], summary: string }> => {
  const ai = getAIClient();
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Based on the following request, create a step-by-step execution plan for an AI Agent. Return as JSON.
    Request: "${userPrompt}"`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          steps: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
            description: "Detailed steps the agent will take"
          },
          summary: {
            type: Type.STRING,
            description: "A brief summary of the mission"
          }
        },
        required: ["steps", "summary"]
      }
    }
  });

  try {
    return JSON.parse(response.text || '{}');
  } catch (e) {
    return { steps: ["Analyze requirements", "Search data", "Draft response"], summary: "Generic execution plan" };
  }
};

export const executeStep = async (stepDescription: string, context: string): Promise<{ result: string, sources?: any[] }> => {
  const ai = getAIClient();
  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-preview',
    contents: `Execute this step of an AI mission. Context so far: ${context}\nCurrent Step: ${stepDescription}`,
    config: {
      tools: [{ googleSearch: {} }]
    }
  });

  const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
  
  return { 
    result: response.text || "Step completed successfully.",
    sources: groundingChunks 
  };
};

export const summarizeFinalResult = async (allStepsOutput: string): Promise<string> => {
  const ai = getAIClient();
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Summarize the following agent task outputs into a final structured report: ${allStepsOutput}`
  });
  return response.text || "Task summary failed.";
};
