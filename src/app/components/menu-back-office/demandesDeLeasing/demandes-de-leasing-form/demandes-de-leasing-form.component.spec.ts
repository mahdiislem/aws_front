import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemandesDeLeasingFormComponent } from './demandes-de-leasing-form.component';

describe('DemandesDeLeasingFormComponent', () => {
  let component: DemandesDeLeasingFormComponent;
  let fixture: ComponentFixture<DemandesDeLeasingFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DemandesDeLeasingFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DemandesDeLeasingFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
