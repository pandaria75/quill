export type ModelRole = "planning" | "drafting" | "reviewing" | "polishing";

export interface QuillConfig {
  modelProvider: {
    type: "openai-compatible";
    baseUrl: string;
    apiKeyEnv: string;
    defaultModel: string;
  };
  models: Record<ModelRole, string>;
  paths: {
    articles: string;
    styles: string;
    workflows: string;
  };
}

export const defaultConfig: QuillConfig = {
  modelProvider: {
    type: "openai-compatible",
    baseUrl: "https://api.openai.com/v1",
    apiKeyEnv: "QUILL_API_KEY",
    defaultModel: "gpt-4.1-mini"
  },
  models: {
    planning: "gpt-4.1-mini",
    drafting: "gpt-4.1-mini",
    reviewing: "gpt-4.1-mini",
    polishing: "gpt-4.1-mini"
  },
  paths: {
    articles: "docs/articles",
    styles: ".quill/styles",
    workflows: ".quill/workflows"
  }
};

export function defaultConfigJson(): string {
  return `${JSON.stringify(defaultConfig, null, 2)}\n`;
}
