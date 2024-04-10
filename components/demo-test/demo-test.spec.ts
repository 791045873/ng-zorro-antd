import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { QqslDemoTestComponent } from './demo-test.component';

describe('NzDemoTestComponent', () => {
  let component: QqslDemoTestComponent;
  let fixture: ComponentFixture<QqslDemoTestComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [QqslDemoTestComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QqslDemoTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
