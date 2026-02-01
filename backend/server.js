
import express from 'express';
import http from 'http';
import { WebSocketServer } from 'ws';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

const server = http.createServer(app);
const wss = new WebSocketServer({ server });

let packets = [];
let events = [];

wss.on('connection', ws => {
  ws.on('message', msg => {
    const data = JSON.parse(msg.toString());
    packets.push(data);
    if (packets.length > 1000) packets.shift();
  });
});

app.get('/api/packets', (_, res) => res.json(packets));
app.post('/api/events', (req, res) => { events.push(req.body); res.json({ ok: true }); });
app.get('/api/events', (_, res) => res.json(events));

server.listen(8080, () => console.log("MA-IDS Backend running on :8080"));
