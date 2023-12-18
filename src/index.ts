import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
// import path from 'path';
import os from 'os';
import {
    postGetUploadURL,
    notFound,
} from './controllers';
import makeCallback from './express-callback';


dotenv.config();

const apiRoot = process.env.API_ROOT;
const app = express();
app.use(cors({
    origin: `${process.env.FRONT_END_URL}`,
    credentials: true
}));
app.use(bodyParser.json());
// TODO: figure out DNT compliance.
app.use((_, res, next) => {
    res.set({ Tk: '!' });
    next();
});
app.post(`${apiRoot}/files/getuploadurl`, makeCallback(postGetUploadURL));
app.get(`${apiRoot}`, (req, res) => {
    res.json({ message: "Ok it works...", hostname: os.hostname(), version: "0.0.1" })
})
app.use(makeCallback(notFound));

// listen for requests
app.listen(`${process.env.PORT}`, () => {
    console.log(`============ ${process.env.STATUS} ============`);
    console.log(`Server is listening on port ${process.env.PORT}${apiRoot}`);
    console.log(`Visit: ${process.env.BASE_URL}${apiRoot}`);
});

export default app;
