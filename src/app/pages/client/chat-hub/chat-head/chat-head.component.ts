import { Component, OnInit, Input } from '@angular/core';
import { ChatService } from 'src/app/core/services/chat.service';

@Component({
  selector: 'app-chat-head',
  templateUrl: './chat-head.component.html',
  styleUrls: ['./chat-head.component.scss']
})
export class ChatHeadComponent implements OnInit {
  @Input() chat !: any
  chatIsActive = false

  constructor(private chatService: ChatService) { }

  ngOnInit(): void {
    this.chatService.activeChat.subscribe(res => {
      if (res && res.username === this.chat.username) {
        this.chatIsActive = true
      } else {
        this.chatIsActive = false
      }
    })
  }

  /**
   * dont 'open' an already open chat
   */
  openChat() {
    if(!this.chatIsActive) this.chatService.activeChat.next(this.chat)
  }

}
