import crypto, { randomBytes } from 'crypto'
import {
    S3Client,
    PutObjectCommand
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";


import { Bucket } from '../use-cases/types';
import makeBucket from './bucket';

const bucket: Bucket = makeBucket({ S3Client, PutObjectCommand, getSignedUrl, randomStringGenerator });


export async function randomStringGenerator(): Promise<string> {
    const rawBytes = await randomBytes(16);
    return rawBytes.toString('hex');
}


export default bucket;