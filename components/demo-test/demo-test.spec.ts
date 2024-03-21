import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { NzDemoTestComponent } from './demo-test.component';

describe('NzDemoTestComponent', () => {
  let component: NzDemoTestComponent;
  let fixture: ComponentFixture<NzDemoTestComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [NzDemoTestComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NzDemoTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
