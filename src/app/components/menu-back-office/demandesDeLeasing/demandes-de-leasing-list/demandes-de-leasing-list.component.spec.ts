import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemandesDeLeasingListComponent } from './demandes-de-leasing-list.component';

describe('DemandesDeLeasingListComponent', () => {
  let component: DemandesDeLeasingListComponent;
  let fixture: ComponentFixture<DemandesDeLeasingListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DemandesDeLeasingListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DemandesDeLeasingListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
