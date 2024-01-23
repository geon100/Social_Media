// cloudinary.service.ts
import { Injectable } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';



@Injectable()
export class CloudinaryService {
  constructor(){
    cloudinary.config({
      cloud_name: process.env.cloud_name,
      api_key: process.env.api_key,
      api_secret: process.env.api_secret,
      secure: true,
  });
  }
  async upload(file:any){
    try {
      const url=(await cloudinary.uploader.upload(file?.path, {
        folder: process.env.folder,
        resource_type: 'auto'})).url
        // console.log(url)
        return url
    } catch (error) {
      console.error(error)
    }
  }
}
