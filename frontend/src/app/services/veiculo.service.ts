import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Veiculo } from '../models/veiculo';

@Injectable({
  providedIn: 'root',
})
export class VeiculoService {
  /* JSON Server para Testes
  url = 'http://localhost:3000/veiculos';*/

  /* Node JS*/
  url = '/veiculos';

  constructor(private httpClient: HttpClient) {}
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  // Lista todos os Veículos
  getVeiculos(): Observable<Veiculo[]> {
    return this.httpClient
      .get<Veiculo[]>(this.url)
      .pipe(retry(2), catchError(this.handleError));
  }

  // Obtem um Veículo pelo ID
  getVeiculoById(id: number): Observable<Veiculo> {
    return this.httpClient
      .get<Veiculo>(this.url + '/' + id)
      .pipe(retry(2), catchError(this.handleError));
  }

  // Adiciona um novo Veículo
  saveVeiculo(Veiculo: Veiculo): Observable<Veiculo> {
    return this.httpClient
      .post<Veiculo>(
        this.url + '/new',
        JSON.stringify(Veiculo),
        this.httpOptions
      )
      .pipe(retry(2), catchError(this.handleError));
  }

  // Atualiza um Veículo existente
  updateVeiculo(Veiculo: Veiculo): Observable<Veiculo> {
    return this.httpClient
      .put<Veiculo>(
        this.url + '/edit/' + Veiculo._id,
        JSON.stringify(Veiculo),
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.handleError));
  }

  // Deleta um Veículo
  deleteVeiculo(Veiculo: Veiculo) {
    return this.httpClient
      .delete<Veiculo>(this.url + '/delete/' + Veiculo._id, this.httpOptions)
      .pipe(retry(1), catchError(this.handleError));
  }

  // Verificação de Erros
  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Erro no cliente
      errorMessage = error.error.message;
    } else {
      // Erro no servidor
      errorMessage =
        `Erro: ${error.status}. ` +
        `Mensagem: ${error.message}. ` +
        'Contate o Administrador do sistema.';
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}
