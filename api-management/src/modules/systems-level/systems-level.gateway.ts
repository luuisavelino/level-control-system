import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { AuthGuard } from '../auth/auth.guard';
import { ADMIN, ENGINEER, Roles } from 'src/shared/decorators/roles.decorator';
import { UseGuards } from '@nestjs/common';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class SystemsLevelGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;

  @UseGuards(AuthGuard)
  @Roles(ADMIN, ENGINEER)
  handleConnection(client: any) {
    const interval = setInterval(() => {
      const randomData = Math.random();
      console.log('Sending data to client:', randomData);
      client.emit('events', randomData);
    }, 1000);

    client.intervalId = interval;
    return;
  }

  handleDisconnect(client: any) {
    console.log('Client disconnected:', client.id);
    clearInterval(client.intervalId);
  }
}
