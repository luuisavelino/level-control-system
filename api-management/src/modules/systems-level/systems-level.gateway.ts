import {
  SubscribeMessage,
  MessageBody,
  WebSocketGateway,
} from '@nestjs/websockets';

@WebSocketGateway()
export class SystemsLevelGateway {
  @SubscribeMessage('msgToServer')
  onNewMessage(@MessageBody() data: any) {
    console.log(data);
  }
}
