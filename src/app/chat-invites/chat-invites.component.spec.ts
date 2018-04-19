import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatInvitesComponent } from './chat-invites.component';

describe('ChatInvitesComponent', () => {
  let component: ChatInvitesComponent;
  let fixture: ComponentFixture<ChatInvitesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatInvitesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatInvitesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
