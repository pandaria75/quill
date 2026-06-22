import type { ChatClient, ChatMessage } from "./ChatClient.js";

interface ClientOptions {
  baseUrl: string;
  apiKey: string;
}

export class OpenAICompatibleClient implements ChatClient {
  private readonly baseUrl: string;
  private readonly apiKey: string;

  constructor(options: ClientOptions) {
    this.baseUrl = options.baseUrl.replace(/\/$/, "");
    this.apiKey = options.apiKey;
  }

  async complete(options: { model: string; messages: ChatMessage[] }): Promise<string> {
    const response = await fetch(`${this.baseUrl}/chat/completions`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${this.apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: options.model,
        messages: options.messages
      })
    });

    if (!response.ok) {
      const body = await response.text();
      throw new Error(`Model request failed: ${response.status} ${response.statusText}\n${body}`);
    }

    const data = (await response.json()) as { choices?: Array<{ message?: { content?: string } }> };
    const content = data.choices?.[0]?.message?.content;
    if (!content?.trim()) throw new Error("Model returned empty content.");
    return content;
  }
}
