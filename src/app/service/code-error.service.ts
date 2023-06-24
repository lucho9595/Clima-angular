import { Injectable } from '@angular/core';
import { enumType } from '../utils/fire-base-code';

@Injectable({
  providedIn: 'root'
})
export class CodeErrorService {

  constructor() { }

  codeError(code: string) {
    switch (code) {
      //email no encontrado
      case enumType.UserNotFound:
        return "Email not found, insert the correct email"
      //contraseña invalida
      case enumType.WrongPassword:
        return "This password is invalid, insert the correct password"
      //email registrado
      case enumType.EmailAlreadyInUse:
        return "Email exists, created other email"
      //largo de la contraseña
      case enumType.WeakPassword:
        return "Password should be at least 6 characters"
      //tipiar contraseña
      case enumType.MissingPassword:
        return "You must enter the password"
      //formato de email invalido
      case enumType.InvalidEmail:
        return "Put the email correctly"
      //tipia email
      case enumType.MissingEmail:
        return "You must enter the password"
      default:
        return
    }
  }

}
