import React from "react";
import { ErrorsInterface, InitalValuesInterface } from "../interface";

export default class Validations {
  static isEmpty(string: string): string {
    if (!string) return "Field required";
    return "";
  }

  static isOnlyLetters(string: string): string {
    const regex = /^[a-zA-Z]+$/;
    if (!regex.test(string))
      return "This field must only contain upper case and lower case letters";
    return "";
  }

  static isPhoneNumber(string: string): string {
    const regex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,7}$/;
    if (!regex.test(string)) return "Inconrrect phone number";
    return "";
  }

  static isAddress(string: string) {
    const regex = /^[a-zA-Z\s]+(\,)? [a-zA-Z]+(\,)? [0-9]{1,4}$/;
    if (!regex.test(string)) return "Invalid address";
    return "";
  }

  static validateFirstName(
    e: React.ChangeEvent<HTMLInputElement>,
    displayedError: string,
    setErrors: Function,
    errors: ErrorsInterface,
    setValues: Function,
    initialValues: InitalValuesInterface
  ) {
    let p = document.getElementById(displayedError);
    let firstNameError;
    const isEmpty = this.isEmpty(e.target.value);
    const isOnlyLetters = this.isOnlyLetters(e.target.value);
    if (isEmpty) {
      firstNameError = isEmpty;
      p!.textContent = firstNameError;
      setErrors({ ...errors, firstNameError });
    } else if (isOnlyLetters) {
      firstNameError = isOnlyLetters;
      p!.textContent = firstNameError;
      setErrors({ ...errors, firstNameError });
    } else {
      p!.textContent = "";
      setErrors({ ...errors, firstNameError: "" });
      setValues({ ...initialValues, firstName: e.target.value });
    }
  }

  static validateLastName(
    e: React.ChangeEvent<HTMLInputElement>,
    displayedError: string,
    setErrors: Function,
    errors: ErrorsInterface,
    setValues: Function,
    initialValues: InitalValuesInterface
  ) {
    let p = document.getElementById(displayedError);
    let lastNameError;
    const isEmpty = this.isEmpty(e.target.value);
    const isOnlyLetters = this.isOnlyLetters(e.target.value);
    if (isEmpty) {
      lastNameError = isEmpty;
      p!.textContent = lastNameError;
      setErrors({ ...errors, lastNameError });
    } else if (isOnlyLetters) {
      lastNameError = isOnlyLetters;
      p!.textContent = lastNameError;
      setErrors({ ...errors, lastNameError });
    } else {
      p!.textContent = "";
      setErrors({ ...errors, lastNameError: "" });
      setValues({ ...initialValues, lastName: e.target.value });
    }
  }

  static validateAddress(
    e: React.ChangeEvent<HTMLInputElement>,
    displayedError: string,
    setErrors: Function,
    errors: ErrorsInterface,
    setValues: Function,
    initialValues: InitalValuesInterface
  ) {
    let p = document.getElementById(displayedError);
    let addressError;
    const isEmpty = this.isEmpty(e.target.value);
    const isAddress = this.isAddress(e.target.value);
    if (isEmpty) {
      addressError = isEmpty;
      p!.textContent = addressError;
    } else if (isAddress) {
      addressError = isAddress;
      p!.textContent = addressError;
    } else {
      p!.textContent = "";
      setErrors({ ...errors, addressError: "" });
      setValues({ ...initialValues, address: e.target.value });
    }
  }

  static validatePhoneNumber(
    e: React.ChangeEvent<HTMLInputElement>,
    displayedError: string,
    setErrors: Function,
    errors: ErrorsInterface,
    setValues: Function,
    initialValues: InitalValuesInterface
  ) {
    let p = document.getElementById(displayedError);
    let phoneNumberError;
    const isEmpty = this.isEmpty(e.target.value);
    const isPhoneNumber = this.isPhoneNumber(e.target.value);
    if (isEmpty) {
      phoneNumberError = isEmpty;
      p!.textContent = phoneNumberError;
    } else if (isPhoneNumber) {
      phoneNumberError = isPhoneNumber;
      p!.textContent = phoneNumberError;
    } else {
      const phoneNumbers = new Set([
        ...initialValues.phoneNumbers,
        Number(e.target.value),
      ]);
      p!.textContent = "";
      setErrors({ ...errors, phoneNumberError: "" });
      setValues({
        ...initialValues,
        phoneNumbers: [...phoneNumbers],
      });
    }
  }
}
