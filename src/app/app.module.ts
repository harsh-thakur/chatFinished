import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component } from '@angular/core';
import { Routes, Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { ChatComponent } from './chat/chat.component';
import { ChatService } from './services/chat.service';
import { HttpModule } from '@angular/http';
import { ChatInvitesComponent } from './chat-invites/chat-invites.component';


const appRoutes: Routes = [
  {
    path: '',
    component: AppComponent,
  },
  {path: 'chat', component: ChatComponent},
  {path: 'chatInvites', component: ChatInvitesComponent}
  ];
@NgModule({
  declarations: [
    AppComponent,
    ChatComponent,
    ChatInvitesComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
   HttpModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [ChatService],
  bootstrap: [AppComponent]
})
export class AppModule { }
