import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatComponent } from './chat/chat.component';
import { clientRoutingModule } from './client-routing.module';
import { ChatHubComponent } from './chat-hub/chat-hub.component';
import { ChatNavComponent } from './chat-hub/chat-nav/chat-nav.component';
import { ChatBoxComponent } from './chat-hub/chat-box/chat-box.component';
import { ProfileComponent } from './chat-hub/profile/profile.component';
import { OthersProfileComponent } from './others-profile/others-profile.component';
import { ChatHeadComponent } from './chat-hub/chat-head/chat-head.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ChatComponent,
    ChatHubComponent,
    ChatNavComponent,
    ChatBoxComponent,
    ProfileComponent,
    OthersProfileComponent,
    ChatHeadComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    clientRoutingModule
  ]
})
export class ClientModule { }
