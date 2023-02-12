export interface ErrorsInterface {
  firstNameError?: string;
  lastNameError?: string;
  phoneNumberError?: string;
  nicknameError?: string;
  photoError?: string;
}

export interface InitalValuesInterface {
  first_name: string;
  last_name: string;
  phone_numbers: number[];
  nickname: string;
  photo: string;
  address: string;
}

export interface ContactInterface {
    id: string
    first_name: string;
    last_name: string;
    phone_numbers: number[];
    nickname: string;
    photo: string;
}
