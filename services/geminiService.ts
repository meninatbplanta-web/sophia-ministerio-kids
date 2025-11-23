import { GoogleGenAI, Type } from "@google/genai";
import { QuizData, StoryResponse } from "../types";

// Initialize Gemini Client
// CRITICAL: Uses process.env.API_KEY as per instructions.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const MODEL_NAME_TEXT = 'gemini-2.5-flash';

/**
 * Generates a child-friendly Bible story based on a topic or character.
 */
export const generateBibleStory = async (topic: string): Promise<StoryResponse> => {
  const prompt = `Conte uma história bíblica infantil sobre: "${topic}". 
  A história deve ser envolvente, fácil de entender para crianças de 5 a 10 anos, e fiel aos ensinamentos bíblicos.
  Use uma linguagem alegre e respeitosa.
  
  Retorne um JSON com os campos:
  - title: Um título criativo para a história.
  - content: O texto da história (máximo 300 palavras), pode usar emojis.
  - moral: Uma frase curta explicando o que aprendemos com essa história (A Lição de Hoje).`;

  try {
    const response = await ai.models.generateContent({
      model: MODEL_NAME_TEXT,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            content: { type: Type.STRING },
            moral: { type: Type.STRING },
          },
          required: ["title", "content", "moral"],
        },
      },
    });

    const text = response.text;
    if (!text) throw new Error("No response from AI");
    return JSON.parse(text) as StoryResponse;
  } catch (error) {
    console.error("Error generating story:", error);
    throw new Error("Não foi possível criar a história agora. Tente novamente!");
  }
};

/**
 * Generates a quiz with 3 multiple choice questions about a Bible topic.
 */
export const generateBibleQuiz = async (topic: string): Promise<QuizData> => {
  const prompt = `Crie um quiz bíblico infantil com 3 perguntas sobre: "${topic}".
  As perguntas devem ser adequadas para crianças.
  
  Retorne um JSON estrito no seguinte formato:
  {
    "questions": [
      {
        "question": "Texto da pergunta",
        "options": ["Opção 1", "Opção 2", "Opção 3", "Opção 4"],
        "correctAnswer": 0, // Índice da resposta correta (0-3)
        "explanation": "Breve explicação amigável do porquê está correto."
      }
    ]
  }`;

  try {
    const response = await ai.models.generateContent({
      model: MODEL_NAME_TEXT,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            questions: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  question: { type: Type.STRING },
                  options: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING },
                  },
                  correctAnswer: { type: Type.INTEGER },
                  explanation: { type: Type.STRING },
                },
                required: ["question", "options", "correctAnswer", "explanation"],
              },
            },
          },
        },
      },
    });

    const text = response.text;
    if (!text) throw new Error("No response from AI");
    return JSON.parse(text) as QuizData;
  } catch (error) {
    console.error("Error generating quiz:", error);
    throw new Error("Não foi possível criar o quiz agora. Tente outro tema!");
  }
};
