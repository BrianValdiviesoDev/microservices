import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();
const port = process.env.PORT || 4000;
const app_name = process.env.APP_NAME || 'express-api';
app.use(cors());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(express.json());
app.use('/whoareyou', (req, res)=>{
    res.status(200);
    res.send(`I am ${app_name}`);
});

app.listen(port, () => console.log(`${app_name} listening on port ${port}`));
