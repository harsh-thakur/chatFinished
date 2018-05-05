import { Component, OnInit } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs/Observable';

import { Message } from '@angular/compiler/src/i18n/i18n_ast';

import { ChatService } from '../services/chat.service';
import { ApiService } from '../services/api.service';

interface MessageTemplate {
  user: String; room: any; message: String; messages: String[]; sender: any; receiver: any;
}


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
  providers: [ChatService]
})
export class ChatComponent implements OnInit {
  socket: any;
  user: string;
  // room: string;
  sender: any;
  receiver: any;
  room: any;
  messageText: string;
  chatWindow: boolean;
  sendInviteButton: boolean;
  chatInvitesButton: boolean;
  messageArray: Array<MessageTemplate> = [];
  messageArray1: any;
  ngOnInit() {
    //  this.socket = io('http://localhost:5000');
 }
  constructor(public _chatService: ChatService) {
    this.chatInvitesButton = true;
    this.chatWindow = false;
    this.sendInviteButton  = false;
    this._chatService.userLeftRoom()
      .subscribe(data => this.messageArray.push(data));

    this._chatService.newMessageRecieved()
      .subscribe(data => this.messageArray.push(data));
      this._chatService.oldMessage()
      .subscribe((data) => {
        console.log('Data', data);
         this.messageArray = data;
        });
       this._chatService.sendInvitation()
       .subscribe(data => {
          this.messageArray.push(<MessageTemplate>data);
      });
  }


  // In case there is record of previous chat found join the same conversation

  join() {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < 5; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    this.room = text;
    this._chatService.joinRoom({ user: this.user, room: this.room,
      sender: this.sender, receiver: this.receiver, chatWindow: false}).
      then((res: any) => {
        console.log('Inside .............', res.flag);
        this.chatWindow = res.flag;
         this.sendInviteButton = !res;
         console.log(res.messages);
         this.messageArray1 = res.messages.sort(function(a, b): boolean {
          return new Date(a.created) > new Date(b.created) ? true : false;
        });
         console.log('message array is ', this.messageArray1);

        //  this.messageArray = res.messages;
        const len = res.messages.length;
        // for(let i=0 ; i<len; i++){
        //   this.messageArray.push(res.messages[i])
        // }
         console.log(this.sendInvite);
      });
  }

  // send a new invite to chat message to a new person
  sendInvite() {
    console.log('Inside Chat Component');
    this._chatService.sendInvite({user: this.user, room: this.room, sender: this.sender,
      receiver: this.receiver});
      this.sendInviteButton = false;
      this.chatWindow = true;
  }
  // User Leaving the conversation room
  leave() {
    this._chatService.leaveRoom({user: this.user, sender: this.sender, receiver: this.receiver});
  }

  // Send New Message
  sendMessage() {
    this._chatService.sendMessage({ user: this.user, message: this.messageText, sender: this.sender, receiver: this.receiver });
    this.messageText = '';
  }
   sortByDateAsc(lhs, rhs)  { return lhs > rhs ? 1 : lhs < rhs ? -1 : 0; }

   sortByDateDesc(lhs, rhs) { return lhs < rhs ? 1 : lhs > rhs ? -1 : 0; }

}
