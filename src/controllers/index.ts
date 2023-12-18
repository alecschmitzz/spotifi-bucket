import {
    getUploadURL,
} from '../use-cases';
import makePostGetUploadURL from './post-get-upload-url';
import notFound from './not-found';

const postGetUploadURL = makePostGetUploadURL({ getUploadURL });

const uploadURLController = Object.freeze({
    postGetUploadURL,
    notFound,
});

export default uploadURLController;
export { postGetUploadURL, notFound };
