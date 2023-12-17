import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormRenderComponent } from './form-render.component';

describe('FormRenderComponent', () => {
  let component: FormRenderComponent;
  let fixture: ComponentFixture<FormRenderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormRenderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormRenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
