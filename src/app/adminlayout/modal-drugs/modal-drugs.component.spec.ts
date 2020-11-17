import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalDrugsComponent } from './modal-drugs.component';

describe('ModalDrugsComponent', () => {
  let component: ModalDrugsComponent;
  let fixture: ComponentFixture<ModalDrugsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalDrugsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalDrugsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
