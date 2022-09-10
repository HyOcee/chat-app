import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { ChatService } from 'src/app/core/services/chat.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  userInfo: any;

  constructor(private authService: AuthService, private chatService: ChatService) { }

  ngOnInit(): void {
    this.authService.userInfo.subscribe(res => {
      this.userInfo = res
    })
  }

  closeProfileView() {
    this.chatService.showProfile.next(false)
  }

}
