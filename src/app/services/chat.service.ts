import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs/Observable';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { environment } from '../../environments/environment';
import { Http } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { ApiService } from './api.service';

interface MessageTemplate {
    user: String; room: any; message: String; sender: any; receiver: any;
}

@Injectable()

export class ChatService {
    socket = io('http://localhost:5000');
    constructor(public http: Http,
        public apiService: ApiService) { }
    public joinRoom(value: any) {
        console.log(' data: ', value);
        return this.http.post(`${environment.api_url}/join`, value)
            .toPromise()
            .then((res) => {
                console.log(res);
                const res1 = res.json();
                console.log(res1);
                const temp = res1.data;
                console.log(temp);
                if (temp !== 0) {
                    this.socket.emit('join', value);
                    return true;
                } else {
                    return false;
                }

            }).catch(err => {
                console.log('err is: ', err);
            });
    }

    checkInvites(senderInfo) {
        console.log('Inside Check Invites', senderInfo);
        return this.http.post(`${environment.api_url}/enter/invites`, {senderInfo})
            .toPromise()
            .then((res) => {
                const res1 = res.json();
                console.log(res1.data);
                return res1.data;
            }).catch(err => {
                console.log('err is: ', err);
            });
    }
    toggel(id) {
        console.log(id);
        return this.http.put(`${environment.api_url}/enter/accept/invites`, {id})
            .toPromise()
            .then((res) => {
                const res1 = res.json();
                return res1;
            }).catch(err => {
                console.log('err is: ', err);
            });
    }
    leaveRoom(data) {
        this.socket.emit('leave', data);
    }

    sendInvite(value) {
        console.log('Inside send Invite of chat Service ', value);
        this.socket.emit('sendInvite',
            value);
    }

    userLeftRoom() {
        const observable = new Observable<{ user: String, room: any, message: String, sender: any, receiver: any }>(observer => {
            this.socket.on('left room', (data) => {
                observer.next(data);
            });
            return () => { this.socket.disconnect(); };
        });
        return observable;
    }
    sendMessage(data) {
        this.socket.emit('message', data);
    }

    newMessageRecieved() {
        const observable = new Observable<{ user: String, room: any, message: String, sender: any, receiver: any }>(observer => {
            this.socket.on('new message', (data) => {
                observer.next(data);
            });
            return () => { this.socket.disconnect(); };
        });
        return observable;

    }
    oldMessage() {
        const observable = new Observable<MessageTemplate[]>(observer => {
            this.socket.on('load old msgs', (data) => {
                console.log(data);
                observer.next(data);
            });
            return () => { this.socket.disconnect(); };
        });
        return observable;
    }
    sendInvitation() {
        const observable = new Observable<{ user: String, room: any, message: String, sender: any, receiver: any }>(observer => {
            this.socket.on('send-invitation', (data) => {
                observer.next(data);
            });
            return () => { this.socket.disconnect(); };
        });
        return observable;
    }
}
