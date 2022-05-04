import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as io from 'socket.io-client';

@Injectable()
export class SocketService {

  private socket = io('https://chat-botapp-souvik.herokuapp.com/');
  constructor() { }

  sendMessage(data) {
    this.socket.emit('message', data);
  }

  receivedReply() {
    const observable = new Observable<any>(observer => {
      this.socket.on('reply', (data) => {
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      };
    });
    return observable;
  }

}