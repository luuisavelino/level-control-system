import {
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { AuthGuard } from '../auth/auth.guard';
import { ADMIN, ENGINEER, Roles } from 'src/shared/decorators/roles.decorator';
import { Param, ParseUUIDPipe, UseGuards } from '@nestjs/common';
import { SystemsLevelService } from './systems-level.service';
import { PopulateSystemsLevelDto } from './dto/populate-systems-level.dto';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class SystemsLevelGateway implements OnGatewayDisconnect {
  constructor(private readonly systemsLevelService: SystemsLevelService) {}

  @WebSocketServer()
  server: Server;

  handleDisconnect(client: any) {
    clearInterval(client.intervalId);
  }

  // @UseGuards(AuthGuard)
  // @Roles(ADMIN, ENGINEER)
  @SubscribeMessage('populate-chart')
  async handleEvent(client: any, options: PopulateSystemsLevelDto) {
    return this.systemsLevelService.populateChart(client, options);
  }
}
