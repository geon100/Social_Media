import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SharelistComponent } from './sharelist.component';

describe('SharelistComponent', () => {
  let component: SharelistComponent;
  let fixture: ComponentFixture<SharelistComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SharelistComponent]
    });
    fixture = TestBed.createComponent(SharelistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
