import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { ChatService } from 'src/app/core/services/chat.service';

@Component({
  selector: 'app-chat-hub',
  templateUrl: './chat-hub.component.html',
  styleUrls: ['./chat-hub.component.scss'],
})
export class ChatHubComponent implements OnInit {
  token: string | null = null;
  showIndividualChat: boolean = false;

  constructor(
    private router: Router,
    private authService: AuthService,
    private chatService: ChatService
  ) {}

  ngOnInit(): void {
    let token = localStorage.getItem('token');
    if (token) {
      this.token = JSON.parse(token);
      this.authService.isTokenAuthenticated_decode();
    } else {
      this.router.navigateByUrl('/auth/login');
    }

    this.openIndividualChat();
  }

  /**
   * subscribe to behavior subject and open individual chat
   * based on the data and
   */
  openIndividualChat() {
    this.chatService.activeChat.subscribe((res) => {
      this.showIndividualChat = Boolean(res);
    });
  }
}
