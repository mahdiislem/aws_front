import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthentificationDialogComponent } from './authentification-dialog.component';

describe('AuthentificationDialogComponent', () => {
  let component: AuthentificationDialogComponent;
  let fixture: ComponentFixture<AuthentificationDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuthentificationDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthentificationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
