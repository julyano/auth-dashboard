import { Injectable } from '@angular/core';
import { ResourceService } from 'src/app/api/resource.service';
import { Api } from 'src/app/api/api.service';
import { LocalStorage } from '@ngx-pwa/local-storage';
import { HttpHeaderService } from 'src/app/api/httpHeader.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService extends ResourceService<any> {
  protected endpoint = 'auth/login';

  constructor(
    protected api: Api,
    protected localStorage: LocalStorage,
    protected httpHeaderService: HttpHeaderService
  ) {
    super(api, localStorage, httpHeaderService);
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
