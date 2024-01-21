// cloudinary.service.ts
import { Injectable } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: 'dt4zlqomk',
    api_key: '154456853779316',
    api_secret: 'iYVXhNtFtTM1rBtiWJr9s3n6lkc',
    secure: true,
});

@Injectable()
export class CloudinaryService {
  
  async upload(file:any){
    // console.log("Reached service",file);
    const url=(await cloudinary.uploader.upload(file?.path, {
    folder: 'Nexus',
    resource_type: 'auto'})).url
    // console.log(url)
    return url
  }
}
