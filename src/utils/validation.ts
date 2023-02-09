import React from "react";
import { ErrorsInterface, InitalValuesInterface } from "../interface";

// /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,7}$/

export default class Validations {
  static isEmpty(string: string): string {
    if(!string) return "Field required";
    return "";
  }

  static isOnlyLetters(string: string): string {
    const regex = /^[a-zA-Z]+$/;
    if(!regex.test(string)) return "This field must only contain upper case and lower case letters";
    return "";
  }

  static isPhoneNumber(string: string): string {
    const regex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,7}$/
    if(!regex.test(string)) return "Inconrrect phone number"
    return ""
  }
}
