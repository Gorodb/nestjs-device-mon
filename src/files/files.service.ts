import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ensureDir, writeFile } from 'fs-extra';
import * as sharp from 'sharp';
import { path } from 'app-root-path';
import { FileElementResponseDto } from './dto/file-element-response.dto';
import { MFile } from './mFile.class';

@Injectable()
export class FilesService {
  async convertToJpg(file: Buffer): Promise<Buffer> {
    return sharp(file).resize(640).jpeg({ mozjpeg: true }).toBuffer();
  }

  async saveFiles(file: MFile): Promise<FileElementResponseDto> {
    const uploadPath = `${path}/uploads/logos`;
    await ensureDir(uploadPath);
    try {
      const newFileName = `${Date.now()}${file.originalname}`;
      await writeFile(`${uploadPath}/${newFileName}`, file.buffer);
      return { url: `logos/${newFileName}`, name: newFileName };
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }
}
