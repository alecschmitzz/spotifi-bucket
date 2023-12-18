
export default function makeGetUploadURL({ bucket }: { bucket: any }) {
    return async function getUploadURL(): Promise<{ uploadURL: string, uploadFilename: string }> {
        return bucket.generateUploadURL();
    };
}
