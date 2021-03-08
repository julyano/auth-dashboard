import { Injectable } from '@angular/core';
import { ResourceService } from 'src/app/api/resource.service';
import { Api } from 'src/app/api/api.service';
import { LocalStorage } from '@ngx-pwa/local-storage';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService extends ResourceService<any> {
  protected endpoint = 'users';
  protected headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')

  constructor(
    protected http: Api,
    protected localStorage: LocalStorage
  ) {
    super(http, localStorage);
  }


  // Manipulação de erros
  /*handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Erro ocorreu no lado do client
      errorMessage = error.error.message;
    } else {
      // Erro ocorreu no lado do servidor
      errorMessage = `Código do erro: ${error.status}, ` + `menssagem: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  };*/

}
