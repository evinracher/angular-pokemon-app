import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonComparisonComponent } from './pokemon-comparison.component';

describe('PokemonComparisonComponent', () => {
  let component: PokemonComparisonComponent;
  let fixture: ComponentFixture<PokemonComparisonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PokemonComparisonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PokemonComparisonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
