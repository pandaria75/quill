export interface ChatMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

export interface ChatClient {
  complete(options: { model: string; messages: ChatMessage[] }): Promise<string>;
}
