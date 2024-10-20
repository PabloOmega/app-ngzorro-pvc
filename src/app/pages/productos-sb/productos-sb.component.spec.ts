import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductosSBComponent } from './productos-sb.component';

describe('ProductosSBComponent', () => {
  let component: ProductosSBComponent;
  let fixture: ComponentFixture<ProductosSBComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductosSBComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductosSBComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
