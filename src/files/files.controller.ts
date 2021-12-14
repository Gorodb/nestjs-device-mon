import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { Roles } from '../guards/roles.guard';
import { UsersRoles } from '../users/enums/users-roles.enum';
import { FilesService } from './files.service';
import { FileElementResponseDto } from './dto/file-element-response.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { MFile } from './mFile.class';

@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Post('/upload')
  @Roles(UsersRoles.USER)
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
  ): Promise<FileElementResponseDto> {
    let mFile: MFile;
    try {
      if (file.mimetype.includes('image')) {
        const buffer = await this.filesService.convertToJpg(file.buffer);
        mFile = new MFile({
          originalname: `${file.originalname.split('.')[0]}.jpg`,
          buffer,
        });
      }
    } catch (e) {
      mFile = new MFile(file);
    }
    return this.filesService.saveFiles(mFile);
  }
}
