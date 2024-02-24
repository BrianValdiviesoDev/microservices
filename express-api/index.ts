import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import {auth} from 'express-oauth2-jwt-bearer';



const app = express();
const port = process.env.PORT || 4000;
const app_name = process.env.APP_NAME || 'express-api';
const auth0_identifier = process.env.AUTH0_AUDIENCE || 'http://localhost:3000'
const auth0_app_domain = process.env.AUTH0_DOMAIN || 'https://domain.com/'

app.use(cors());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(express.json());


// Authorization middleware. When used, the Access Token must
// exist and be verified against the Auth0 JSON Web Key Set.
const checkJwt = auth({
  audience: auth0_identifier,
  issuerBaseURL: auth0_app_domain,
});

// enforce on all endpoints
//app.use(checkJwt);

app.use('/whoareyou', (req, res)=>{
  console.log(req.headers)
    res.status(200);
    res.send(`I am ${app_name}`);
});

//protected endpoint
app.use('/whoami', checkJwt, (req, res)=>{
    res.status(200);
    res.send(`Welcome ${JSON.stringify(req.auth?.payload)}`);
});

app.listen(port, () => console.log(`${app_name} listening on port ${port}`));
