export interface ErrorsInterface {
  firstNameError?: string;
  lastNameError?: string;
  phoneNumberError?: string;
  nicknameError?: string;
  photoError?: string;
}

export interface InitalValuesInterface {
  firstName: string;
  lastName: string;
  phoneNumber: number[];
  nickname: string;
  photo: string;
}

export interface ContactInterface {
  contact: {
    id: string
    firstName: string;
    lastName: string;
    phoneNumbers: number[];
    nickname: string;
    photo: string;
  };
}

export interface ContactInfo {
    id: string
    firstName: string;
    lastName: string;
    phoneNumbers: number[];
    nickname: string;
    photo: string;
}
