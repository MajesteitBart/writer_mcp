import guideLlm from './guideLlm';
import codesLlm from './codesLlm';
import metaLlm from './metaLlm';
import onPageSeoGuide from './onPageSeoGuide';
import productValueMapLlm from './productValueMapLlm';

export class ContentReader {
  private prompts: Record<string, string> = {
    'guide-llm.md': guideLlm,
    'meta-llm.md': metaLlm,
    'codes-llm.md': codesLlm,
    'on-page-seo-guide.md': onPageSeoGuide,
    'product-value-map-llm.md': productValueMapLlm,
  };

  public readPrompt(fileName: string): string {
    const content = this.prompts[fileName];
    if (content) {
      return content;
    }
    throw new Error(`Prompt file not found: ${fileName}`);
  }
}