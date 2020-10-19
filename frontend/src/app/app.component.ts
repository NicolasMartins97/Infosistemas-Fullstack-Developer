import { Component, OnInit } from '@angular/core';
import { VeiculoService } from './services/veiculo.service';
import { Veiculo } from './models/veiculo';
import { NgForm } from '@angular/forms';
let c = 0;
let t = '';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  veiculo = {} as Veiculo;
  veiculos: Veiculo[];

  constructor(private veiculoService: VeiculoService) {}

  ngOnInit() {
    this.getVeiculos();
  }

  // Define se um Veículo será adicionando ou atualizado
  saveVeiculo(form: NgForm) {
    if (this.veiculo._id !== undefined) {
      this.veiculoService.updateVeiculo(this.veiculo).subscribe(() => {
        this.cleanForm(form);
        c = 0;
      });
    } else {
      this.veiculoService.saveVeiculo(this.veiculo).subscribe(() => {
        this.cleanForm(form);
        c = 0;
      });
    }
  }

  // Mostra ou Oculta menus
  alertC() {
    if (c === 1) {
      return 1;
    } else if (c === 2) {
      return 2;
    } else {
      return 0;
    }
  }

  // Lista todos os Veículos
  getVeiculos() {
    this.veiculoService.getVeiculos().subscribe((veiculos: Veiculo[]) => {
      this.veiculos = veiculos;
    });
  }

  // Deleta um Veículo
  deleteVeiculo(veiculo: Veiculo) {
    this.veiculoService.deleteVeiculo(veiculo).subscribe(() => {
      this.getVeiculos();
      c = 0;
    });
  }

  removeVeiculo(veiculo: Veiculo) {
    this.veiculo = { ...veiculo };
    c = 2;
  }

  // Menu para novo Veículo
  newVeiculo(form: NgForm) {
    this.getVeiculos();
    form.resetForm();
    c = 1;
    t = 'Adicionar';
  }

  titleText() {
    return t;
  }

  // Copia o Veículo para ser atualizado
  editVeiculo(veiculo: Veiculo) {
    this.veiculo = { ...veiculo };
    c = 1;
    t = 'Atualizar';
  }

  // Limpa o Formulário
  cleanForm(form: NgForm) {
    this.getVeiculos();
    form.resetForm();
    c = 0;
  }
}
