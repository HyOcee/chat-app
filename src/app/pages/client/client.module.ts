import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatComponent } from './chat/chat.component';
import { clientRoutingModule } from './client-routing.module';



@NgModule({
  declarations: [
    ChatComponent
  ],
  imports: [
    CommonModule,
    clientRoutingModule
  ]
})
export class ClientModule { }
