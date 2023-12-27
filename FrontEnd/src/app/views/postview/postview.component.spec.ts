import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostviewComponent } from './postview.component';

describe('PostviewComponent', () => {
  let component: PostviewComponent;
  let fixture: ComponentFixture<PostviewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PostviewComponent]
    });
    fixture = TestBed.createComponent(PostviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
