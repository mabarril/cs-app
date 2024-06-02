import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrestacaoContasPdfComponent } from './prestacao-contas-pdf.component';

describe('PrestacaoContasPdfComponent', () => {
  let component: PrestacaoContasPdfComponent;
  let fixture: ComponentFixture<PrestacaoContasPdfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrestacaoContasPdfComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PrestacaoContasPdfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
