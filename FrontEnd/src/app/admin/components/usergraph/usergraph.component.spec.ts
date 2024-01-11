import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsergraphComponent } from './usergraph.component';

describe('UsergraphComponent', () => {
  let component: UsergraphComponent;
  let fixture: ComponentFixture<UsergraphComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UsergraphComponent]
    });
    fixture = TestBed.createComponent(UsergraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
