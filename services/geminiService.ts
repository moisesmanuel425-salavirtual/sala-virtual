
import { GoogleGenAI, GenerateContentResponse, Chat } from "@google/genai";
import { TUTOR_PROMPT } from "../constants";

export class GeminiService {
  private ai: GoogleGenAI;
  private chatInstance: Chat | null = null;

  constructor() {
    this.ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  }

  private ensureChat() {
    if (!this.chatInstance) {
      this.chatInstance = this.ai.chats.create({
        model: 'gemini-3-flash-preview',
        config: {
          systemInstruction: TUTOR_PROMPT,
        },
      });
    }
    return this.chatInstance;
  }

  async sendMessage(message: string): Promise<string> {
    try {
      const chat = this.ensureChat();
      const result = await chat.sendMessage({ message });
      return result.text || "Desculpe, tive um problema na conexão orbital.";
    } catch (error) {
      console.error("Gemini API Error:", error);
      return "Erro ao contactar o satélite tutor. Verifique sua conexão.";
    }
  }

  async *streamMessage(message: string) {
    try {
      const chat = this.ensureChat();
      const stream = await chat.sendMessageStream({ message });
      for await (const chunk of stream) {
        const c = chunk as GenerateContentResponse;
        yield c.text || "";
      }
    } catch (error) {
      console.error("Streaming error:", error);
      yield "Erro na transmissão de dados.";
    }
  }
}

export const geminiService = new GeminiService();
