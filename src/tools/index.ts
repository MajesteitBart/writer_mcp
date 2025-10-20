import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js"
import { ContentReader } from '../utils/contentReader';

export function registerTools(server: McpServer, contentReader: ContentReader) {
  const tools = [
    {
      name: 'apply_writing_guide',
      title: 'Apply Writing Guide',
      description: 'Applies the writing guide to the text.',
      promptFile: 'guide-llm.md',
    },
    {
      name: 'apply_editing_codes',
      title: 'Apply Editing Codes',
      description: 'Applies editing codes to the text.',
      promptFile: 'codes-llm.md',
    },
    {
      name: 'generate_meta_info',
      title: 'Generate Meta Info',
      description: 'Generates meta information for the text.',
      promptFile: 'meta-llm.md',
    },
    {
      name: 'on_page_seo_guide',
      title: 'On-Page SEO Guide',
      description: 'Applies the on-page SEO guide to the text.',
      promptFile: 'on-page-seo-guide.md',
    },
    {
      name: 'product_value_map',
      title: 'Product Value Map',
      description: 'Applies the product value map to the text.',
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