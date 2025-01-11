import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private token = 'myFakeToken';

  public getToken(): String {
    return this.token;
  }
}
