import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { ChatService } from 'src/app/core/services/chat.service';

@Component({
  selector: 'app-chat-nav',
  templateUrl: './chat-nav.component.html',
  styleUrls: ['./chat-nav.component.scss']
})
export class ChatNavComponent implements OnInit {
  showUserProfile = false;
  chats: any[] = []
  userInfo!: any;

  constructor(private chatService: ChatService, private authService: AuthService) { }

  ngOnInit(): void {
    this.chatService.showProfile.subscribe(res => this.showUserProfile = res)
    this.chatService.chats.subscribe(res => {
      this.chats = res
    })
    this.authService.userInfo.subscribe(res => {
      this.userInfo = res
    })
  }

  showProfile(){
    this.chatService.showProfile.next(true)
  }

}
