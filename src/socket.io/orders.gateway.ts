import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server, Socket } from 'socket.io';
import Payment from "src/entities/cpm/payment.entity";
import OrdersArgs from "./dto/orders.args";

@WebSocketGateway()
export class OrdersGateway {
  private clients: Map<string, Socket> = new Map();

  @WebSocketServer()
  server: Server;

  handleConnection(client: Socket) {
    this.clients.set(client.id, client); // 클라이언트를 목록에 추가
  }

  handleDisconnect(client: Socket) {
    this.clients.delete(client.id); // 클라이언트를 목록에서 제거
  }

  // @SubscribeMessage('orders')
  // handleMessage(@MessageBody() body: any) {

  // }

  sendToClients(args: OrdersArgs) {
    for (const [clientId, client] of this.clients) {
      client.emit('onOrders', args);
    }
  }
}
