import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private token = 'myFakeToken';

  public getToken(): string {
    return this.token;
  }
}
