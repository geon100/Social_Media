import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsertaglistComponent } from './usertaglist.component';

describe('UsertaglistComponent', () => {
  let component: UsertaglistComponent;
  let fixture: ComponentFixture<UsertaglistComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UsertaglistComponent]
    });
    fixture = TestBed.createComponent(UsertaglistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
