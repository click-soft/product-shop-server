import { Module } from '@nestjs/common';
import { SocketIoGateway } from './socket.io.gateway';
import { OrdersGateway } from './orders.gateway';

@Module({
  providers: [SocketIoGateway, OrdersGateway],
  exports: [OrdersGateway]
})
export class SocketIoModule { }
