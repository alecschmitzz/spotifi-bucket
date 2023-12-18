import bucket from '../helpers';
import makeGetUploadURL from './get-upload-url';


const getUploadURL = makeGetUploadURL({ bucket });

const fileService = Object.freeze({
    getUploadURL,
});

export default fileService;
export { getUploadURL };
