import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js"
import { ContentReader } from '../utils/contentReader';

export function registerTools(server: McpServer, contentReader: ContentReader) {
  const tools = [
    {
      name: 'apply_writing_guide',
      title: 'Apply Writing Guide',
      description: 'Uses the writing guide and usage protocol for creating high-quality technical content. This guide provides systematic principles for narrative structure, flow, style, and technical accuracy.',
      promptFile: 'guide-llm.md',
    },
    {
      name: 'apply_editing_codes',
      title: 'Apply Editing Codes',
      description: 'Uses editing codes documentation and usage protocol for editing texts. These semantic editing marks provide a standardized framework for content review with a teaching/learning focus.',
      promptFile: 'codes-llm.md',
    },
    {
      name: 'generate_meta_info',
      title: 'Generate Meta Info',
      description: 'Uses the Web Content Meta Information Generation System for creating optimized article titles, meta titles, meta descriptions, and slugs for web content with proper keyword placement and search intent analysis.',
      promptFile: 'meta-llm.md',
    },
    {
      name: 'on_page_seo_guide',
      title: 'On-Page SEO Guide',
      description: 'Uses the On-Page SEO Optimization Guide for comprehensive web content optimization, covering meta content, keyword research, content depth, search intent alignment, internal linking, and structured data.',
      promptFile: 'on-page-seo-guide.md',
    },
    {
      name: 'product_value_map',
      title: 'Product Value Map',
      description: 'Uses the Product Communications Value Map Generation System for Product Positioning, including taglines, position statements, personas, value cases, and feature categorization in a structured hierarchy.',
      promptFile: 'product-value-map-llm.md',
    },
  ];

  for (const tool of tools) {
    server.registerTool(
      tool.name,
      {
        title: tool.title,
        description: tool.description,
      },
      async () => {
        try {
          const content = contentReader.readPrompt(tool.promptFile);
          return {
            content: [
              {
                type: 'text',
                text: JSON.stringify({ success: true, data: { content } }),
              },
            ],
          };
        } catch (error: any) {
          return {
            content: [
              {
                type: 'text',
                text: JSON.stringify({ success: false, error: error.message }),
              },
            ],
          };
        }
      }
    );
  }
}