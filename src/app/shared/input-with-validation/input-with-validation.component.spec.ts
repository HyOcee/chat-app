import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputWithValidationComponent } from './input-with-validation.component';

describe('InputWithValidationComponent', () => {
  let component: InputWithValidationComponent;
  let fixture: ComponentFixture<InputWithValidationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InputWithValidationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InputWithValidationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
