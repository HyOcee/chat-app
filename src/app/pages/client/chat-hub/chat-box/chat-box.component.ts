import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';
import { ChatService } from 'src/app/core/services/chat.service';

@Component({
  selector: 'app-chat-box',
  templateUrl: './chat-box.component.html',
  styleUrls: ['./chat-box.component.scss']
})
export class ChatBoxComponent implements OnInit {
  sendMessageForm!: FormGroup;
  receiverInfo!: any;
  senderUsername!: any;
  
  @ViewChild('scrollMe') private myScrollContainer!: ElementRef;

  displayedMessages: any[] = [
    {
      content: 'Lorem ipsum lsdfsd sdfsdfs sdfsdf sdf',
      sender: 'df',
      timeStamp: 1662650058872
    },
  ];

  displayedNewMessages: any[] = [];

  freshMessages: any[] = [];

  constructor(
    public chatService: ChatService,
    private fb: FormBuilder,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.authService.userInfo.subscribe(res => {
      this.senderUsername = res.username
    })
    this.sendMessageForm = this.fb.group({
      messageComposed: ['', Validators.minLength(1)],
    });
    this.chatService.activeChat.subscribe(res => {
      if(res) {
        this.receiverInfo = res
        this.getChat()
      }
    })
    this.handleNewMessage()
  }

  importFile(e: any){

  }

  sendMessage() {
    this.freshMessages.push(
      {
        content: this.sendMessageForm.value['messageComposed'],
        timeStamp: Date.now(),
        receiver: this.receiverInfo.username,
        sender: this.senderUsername
      },
    )

    this.chatService.socket.emit('sendMessage', this.sendMessageForm.value['messageComposed'], this.receiverInfo.username)

    this.sendMessageForm.reset()

    setTimeout(() => {
      this.myScrollContainer.nativeElement.scrollTop =
        this.myScrollContainer.nativeElement.scrollHeight;
    }, 10);
  }

  closeChat() {
    this.chatService.activeChat.next(false)
  }

  handleNewMessage() {
    this.chatService.newChatHubMessageEvent.subscribe(res => {
      if(res) {
        console.log(res)
          this.freshMessages.push(res)
          setTimeout(() => {
            this.myScrollContainer.nativeElement.scrollTop =
              this.myScrollContainer.nativeElement.scrollHeight;
          }, 10);
      }
    })
  }

  getChat() {
    this.chatService.getChat(this.receiverInfo.username).then(data => {
      this.displayedMessages.length = 0;
      this.displayedNewMessages.length = 0;
      this.freshMessages.length = 0;

      /**
       * for now, messages are initially empty because 
       * theyare not stored in the database
       */
      if(!data.messages) return

      for(let i = 0 ; i < data.messages.length - data.newMessageCount; i++) {
        this.displayedMessages.push(data.messages[i])
       }
       for(let i = data.messages.length - data.newMessageCount; i < data.messages.length; i++) {
        this.displayedNewMessages.push(data.messages[i])
      }
      setTimeout(() => {
        this.myScrollContainer.nativeElement.scrollTop =
        this.myScrollContainer.nativeElement.scrollHeight;

        this.chatService.resetNewMessageCount(this.receiverInfo.username)
        }, 10);
    })
  }

}
