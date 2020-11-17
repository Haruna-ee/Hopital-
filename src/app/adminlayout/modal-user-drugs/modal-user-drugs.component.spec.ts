import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalUserDrugsComponent } from './modal-user-drugs.component';

describe('ModalUserDrugsComponent', () => {
  let component: ModalUserDrugsComponent;
  let fixture: ComponentFixture<ModalUserDrugsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalUserDrugsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalUserDrugsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
