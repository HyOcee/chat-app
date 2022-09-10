import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';
import { io, Socket } from 'socket.io-client';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  showProfile = new BehaviorSubject<boolean>(false);
  url = environment.apiBaseUrl;
  chats = new BehaviorSubject<any[]>([]);
  activeChat = new BehaviorSubject<any>(null);
  userInfo: any;

  // socket
  socket!: Socket;

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private notify: ToastrService
  ) {
    let token = JSON.parse(localStorage.getItem('token')!);
    /**
     * wait for userInfo to be set by the auth service (it's an observable)
     * then connect to the hub and register the event listeners
     */
    this.authService.userInfo.subscribe((res) => {
      if (res) {
        this.userInfo = res;
        this.socket = io(`${this.url}`, {
          auth: {
            token,
            username: this.userInfo.username,
          },
        });

        this.registerEvents();
      }
    });
    this.http
      .post(`${this.url}/users`, { accessToken: token })
      .subscribe((res: any) => {
        for (let user of res) {
          if(user.username != this.userInfo.username)
          this.chatsArray.push({
            username: user.username,
            messages: null,
            newMessageCount: 0,
            firstName: user.firstName,
            lastName: user.lastName,
          });
        }
        this.chats.next(this.chatsArray);
      });
  }

  chatsArray: any[] = [
    // {
    //   username: '4ec63656-9a4a-47e1-7f21-08da6a6d64a3',
    //   messages: null,
    //   newMessageCount: 0,
    // },
  ];

  getChat(username: string): Promise<any> {
    return new Promise((resolve, reject) => {
      for (let i = 0; i < this.chatsArray.length; i++) {
        if (this.chatsArray[i].username == username) {
          console.log(this.chatsArray[i]);
          resolve(this.chatsArray[i]);
          break;
        }
      }
    });
  }

  /**
   * get the id of the active chat
   * when a new message comes in
   * do not increase it's new message count
   */

  resetNewMessageCount(username: string) {
    for (let i = 0; i < this.chatsArray.length; i++) {
      if (this.chatsArray[i].username == username) {
        this.chatsArray[i].newMessageCount = 0;
        this.chats.next(this.chatsArray);
      }
    }
  }

  newChatHubMessageEvent = new BehaviorSubject<any>(null);
  updateNewMessage(chat: any) {
    const { content, sender, receiver, timeStamp } = chat;

    for (let i = 0; i < this.chatsArray.length; i++) {
      /**
       * if the message is from another user, loop through the array
       * find the user and push the chat into the array
       */
      if (
        this.chatsArray[i].username == sender ||
        this.chatsArray[i].username == receiver
      ) {
        this.chatsArray[i].lastMessage = content;

        if (this.chatsArray[i].messages != null) {
          this.chatsArray[i].messages.push({
            content,
            sender,
            receiver,
            timeStamp,
          });
        } else if (this.chatsArray[i].messages === null) {
          // handle cases where new messages exist but the chat has not
          // been opened at all
          this.chatsArray[i].messages = [
            { content, sender, timeStamp, receiver },
          ];
        }

        console.log(this.chatsArray)

        /**
         * check if incoming message is from an activechat
         */
        this.activeChat
          .subscribe((id) => {
            if (id != sender) {
              this.chatsArray[i].newMessageCount++;
            }
          })
          .unsubscribe();

        // move chat to the top
        if (i !== 0) {
          let chat = this.chatsArray.splice(i, 1);
          this.chatsArray.unshift(chat[0]);
        }
        this.chats.next(this.chatsArray);
        break;
      }
    }
  }

  /**
   * events
   */
  audio = new Audio('assets/audios/notification.mp3');
  registerEvents() {
    this.socket.on('welcome', (res) => {
      this.notify.info(`${res}`, '', {
        closeButton: true,
        progressBar: true,
      });
    });

    this.socket.on('incomingMessage', (message, sender, receiver) => {
      let newMessage = {
        content: message,
        sender,
        receiver,
        timeStamp: Date.now(),
      };

      this.updateNewMessage(newMessage);

      if (sender == this.userInfo.username) return;

      this.newChatHubMessageEvent.next(newMessage);
      this.newChatHubMessageEvent.next(null);

      /**
       * display notification and play sound if chat is not
       * active
       */
      this.activeChat
        .subscribe((res) => {
          if (!res || res.username != sender) {
            this.notify.info(`${message}, from ${sender}`, '', {
              closeButton: true,
              progressBar: true,
            });

            this.audio.play();
          }
        })
        .unsubscribe();
    });
  }
}
