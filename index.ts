import express from 'express';
import path from 'path';
import cors from 'cors';
import { createServer } from 'http';
import { Server, LobbyRoom } from 'colyseus';

const port = parseInt(process.env.PORT) || 8000;
const app = express();

app.use(cors());
app.use(express.json());

// Attach WebSocket Server on HTTP Server.
const gameServer = new Server({
    server: createServer(app),
    express: app,
    pingInterval: 0,
});

// Define 'lobby' room
gameServer.define('lobby', LobbyRoom);

app.use('/', express.static(path.join(__dirname, 'static')));

gameServer.onShutdown(function () {
    console.log('game server is going down.');
});

gameServer.listen(port);

console.log(`Listening on http://localhost:${port}`);