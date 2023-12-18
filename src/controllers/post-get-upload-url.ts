interface PostGetUploadURLDependencies {
    getUploadURL: () => Promise<{ uploadURL: string, uploadFilename: string }>;
}

export default function makePostGetUploadURL({ getUploadURL }: PostGetUploadURLDependencies) {
    return async function postGetUploadURL(httpRequest: { body: any }) {
        const headers = {
            'Content-Type': 'application/json',
        };
        try {
            // const { ...songInfo } = httpRequest.body;
            const { uploadURL, uploadFilename } = await getUploadURL();
            return {
                headers,
                statusCode: 200,
                body: { uploadURL, uploadFilename },
            };
        } catch (e: unknown) {
            // TODO: Error logging
            // console.error(e);
            return {
                headers,
                statusCode: 400,
                body: {
                    error: (e as Error).message,
                },
            };
        }
    };
}
