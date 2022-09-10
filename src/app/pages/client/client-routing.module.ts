import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatHubComponent } from './chat-hub/chat-hub.component';

const routes: Routes = [
  { path: '', component: ChatHubComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class clientRoutingModule {}
