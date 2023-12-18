import { Bucket } from "../use-cases/types";



interface Credentials {
    accessKeyId: string,
    secretAccessKey: string
}

interface S3Config {
    region: string,
    endpoint: string,
    credentials: Credentials
}

interface MakeBucketOptions {
    S3Client: new (options: S3Config) => any,
    getSignedUrl: (s3: any, command: any, options: { expiresIn: number }) => Promise<string>,
    PutObjectCommand: new (options: { Bucket: string, Key: string }) => any,
    randomStringGenerator: () => Promise<string>
}

export default function makeBucket({ S3Client, getSignedUrl, PutObjectCommand, randomStringGenerator }: MakeBucketOptions): Bucket {
    const accountid = process.env.BUCKET_ACCOUNT_ID;
    const bucketName = process.env.BUCKET_NAME!;
    const access_key_id = process.env.BUCKET_ACCESS_KEY_ID!;
    const access_key_secret = process.env.BUCKET_ACCESS_KEY_SECRET!;

    const s3 = new S3Client({
        region: "auto",
        endpoint: `https://${accountid}.r2.cloudflarestorage.com`,
        credentials: {
            accessKeyId: access_key_id,
            secretAccessKey: access_key_secret,
        },
    });


    return Object.freeze({
        generateUploadURL,
    });

    async function generateUploadURL(): Promise<{ uploadURL: string, uploadFilename: string }> {
        const uploadFilename = await randomStringGenerator();

        const params = ({
            Bucket: bucketName,
            Key: uploadFilename,
            Expires: 60
        })

        const uploadURL = await getSignedUrl(s3, new PutObjectCommand({ Bucket: params.Bucket, Key: params.Key }), { expiresIn: params.Expires })

        return { uploadURL, uploadFilename }
    }
}