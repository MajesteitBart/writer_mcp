import * as fs from 'fs';
import * as path from 'path';

export class ContentReader {
  private promptsDir: string;

  constructor() {
    this.promptsDir = path.join(__dirname, '..', '..', '..', 'prompts');
  }

  public readPrompt(fileName: string): string {
    const filePath = path.join(this.promptsDir, fileName);
    if (fs.existsSync(filePath)) {
      return fs.readFileSync(filePath, 'utf-8');
    }
    throw new Error(`Prompt file not found: ${fileName}`);
  }
}