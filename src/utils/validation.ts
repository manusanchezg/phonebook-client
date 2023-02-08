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

  // validateFirstName(e: React.ChangeEvent<HTMLInputElement>) {
  //   const regex = /^[a-zA-Z]+$/;
  //   let p = document.getElementById("firstNameError");
  //   let firstNameError;
  //   this.setValues({ ...this.initialValues, firstName: e.target.value });
  //   if (!this.initialValues.firstName) {
  //     firstNameError = "Required field";
  //     p!.textContent = firstNameError;
  //     this.setErrors({ ...this.errors, firstNameError });
  //   } else if (!regex.test(this.initialValues.firstName)) {
  //     firstNameError =
  //       "First name must only contain upper case and lower case letters";
  //     p!.textContent = firstNameError;
  //     this.setErrors({ ...this.errors, firstNameError });
  //   } else {
  //     p!.textContent = "";
  //     this.setErrors({ ...this.errors, firstNameError: "" });
  //   }
  // }

  // validateLastName(e: React.ChangeEvent<HTMLInputElement>) {
  //   const regex = /^[a-zA-Z]+$/;
  //   let p = document.getElementById("lastNameError");
  //   let lastNameError;
  //   this.setValues({ ...this.initialValues, lastName: e.target.value });
  //   if (!this.initialValues.lastName) {
  //     lastNameError = "Required field";
  //     p!.textContent = lastNameError;
  //     this.setErrors({ ...this.errors, lastNameError });
  //   } else if (!regex.test(this.initialValues.lastName)) {
  //     lastNameError =
  //       "First name must only contain upper case and lower case letters";
  //     p!.textContent = lastNameError;
  //     this.setErrors({ ...this.errors, lastNameError });
  //   } else {
  //     p!.textContent = "";
  //     this.setErrors({ ...this.errors, lastNameError: "" });
  //   }
  // }
}
