import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MensajeConfirmacionComponent } from './mensaje-confirmacion.component';

describe('MensajeConfirmacionComponent', () => {
  let component: MensajeConfirmacionComponent;
  let fixture: ComponentFixture<MensajeConfirmacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MensajeConfirmacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MensajeConfirmacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
