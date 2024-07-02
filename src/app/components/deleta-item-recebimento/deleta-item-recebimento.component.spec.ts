import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletaItemRecebimentoComponent } from './deleta-item-recebimento.component';

describe('DeletaItemRecebimentoComponent', () => {
  let component: DeletaItemRecebimentoComponent;
  let fixture: ComponentFixture<DeletaItemRecebimentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeletaItemRecebimentoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DeletaItemRecebimentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
