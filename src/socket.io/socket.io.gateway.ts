import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server , Socket} from 'socket.io';

@WebSocketGateway()
export class SocketIoGateway {
  @WebSocketServer()
  server: Server;

  handleConnection(client: Socket) {
    console.log(`SocketIoGateway Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    console.log(`SocketIoGateway Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('message')
  handleMessage(@MessageBody() body: any) {
    // return 'Hello world!';

    this.server.emit('onMessage', {
      msg: "test123132",
      body: body,
    })
  }
}
