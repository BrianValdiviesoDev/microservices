import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import amqp from 'amqplib';
import { Server } from 'socket.io';
import http from 'http';



const port = process.env.PORT || 4000;
const app_name = process.env.APP_NAME || 'express-api';
let channel:amqp.Channel | null = null;
const queue = 'test_queue';


const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: '*',
    }
});

app.use(cors());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(express.json());


const connectRabbit = async () => {
    const rabbitConnection = await amqp.connect(process.env.RABBITMQ_URI || 'amqp://brian:123456@localhost:5672');
    channel = await rabbitConnection.createChannel();
    await channel.assertQueue(queue, { durable: false });
    if(channel === null){
        console.log('No channel created');
        return;
    }
    channel.consume(queue, (msg) => {
        if(msg === null){
            console.log('No message in queue');
            return;
        }
        console.log(`Received message: ${msg.content.toString()}`);
    });
}

io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });

    socket.on('message', (msg) => {
        console.log(`Received message: ${msg}`);
        if(msg.includes("Hello")){
            socket.emit('notification', `Hello back, I am ${app_name}`);
        }
    });
});


app.use('/whoareyou', (req, res)=>{
    res.status(200);
    res.send(`I am ${app_name}`);
});

app.post('/send', (req, res) => {
    const message = req.body.message;
    if(!message){
        res.status(400);
        res.send('No message provided');
        return;
    }
    if(!channel){
        res.status(500);
        res.send('No channel available');
        return;
    }
    console.log(`Sending message: ${message}`);
    channel.sendToQueue(queue, Buffer.from(message));
    res.status(200);
    res.send('Message sent');
});

app.post('/notification', (req, res) => {
    const message = req.body.message;
    if(!message){
        res.status(400);
        res.send('No message provided');
        return;
    }
    console.log(`Sending notification: ${message}`);
    io.emit('notification', message);
    res.status(200);
    res.send('Message sent');
});

connectRabbit();

server.listen(port, () => console.log(`${app_name} listening on port ${port}`));
