import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmCreateUserDialogComponent } from './confirm-create-user-dialog.component';

describe('ConfirmCreateUserDialogComponent', () => {
  let component: ConfirmCreateUserDialogComponent;
  let fixture: ComponentFixture<ConfirmCreateUserDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfirmCreateUserDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConfirmCreateUserDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
