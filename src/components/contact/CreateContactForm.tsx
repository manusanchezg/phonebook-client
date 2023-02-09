import React, { useCallback, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import plusCircle from "../../assets/plus-circle.svg";
import { InitalValuesInterface } from "../../interface";
import Validations from "../../utils/validation";

function CreateContactForm({
  onHide,
  initialValues,
  setValues,
  addUser,
}: {
  onHide: () => void;
  initialValues: InitalValuesInterface;
  setValues: Function;
  addUser: Function;
}) {
  const [errors, setErrors] = useState({
    firstNameError: "",
    lastNameError: "",
    phoneNumberError: "",
    nicknameError: "",
    addressError: "",
  });

  const validateLastName = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>, displayedError: string) => {
      let p = document.getElementById(displayedError);
      let lastNameError;
      setValues({ ...initialValues, lastName: e.target.value });
      const isEmpty = Validations.isEmpty(e.target.value);
      const isOnlyLetters = Validations.isOnlyLetters(e.target.value);
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
      }
    },
    [errors]
  );

  const validateFirstName = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>, displayedError: string) => {
      let p = document.getElementById(displayedError);
      let firstNameError;
      setValues({ ...initialValues, firstName: e.target.value });
      const isEmpty = Validations.isEmpty(e.target.value);
      const isOnlyLetters = Validations.isOnlyLetters(e.target.value);
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
      }
    },
    [errors]
  );

  const validatePhoneNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
    let p = document.getElementById("phoneNumberError");
    let phoneNumberError;
    const isEmpty = Validations.isEmpty(e.target.value);
    const isPhoneNumber = Validations.isPhoneNumber(e.target.value);
    if (isEmpty) {
      phoneNumberError = isEmpty;
      p!.textContent = phoneNumberError;
    } else if (isPhoneNumber) {
      phoneNumberError = isPhoneNumber;
      p!.textContent = phoneNumberError;
    } else {
      p!.textContent = "";
      setErrors({ ...errors, phoneNumberError: "" });
      setValues({
        ...initialValues,
        phoneNumber: new Array(...new Set([...initialValues.phoneNumber, Number(e.target.value)])),
      });
    }
  };

  const validateAddress = (e: React.ChangeEvent<HTMLInputElement>) => {
    let p = document.getElementById("addressError");
    let addressError;
    setValues({ ...initialValues, address: e.target.value });
    const isEmpty = Validations.isEmpty(e.target.value);
    const isAddress = Validations.isAddress(e.target.value);
    if (!isEmpty) {
      addressError = isEmpty;
      p!.textContent = addressError;
    } else if (!isAddress) {
      addressError = isAddress;
      p!.textContent = addressError;
    } else {
      p!.textContent = "";
      setErrors({ ...errors, addressError: "" });
    }
  };

  const handleAddUser = (e: React.MouseEvent<HTMLButtonElement>) => {
    const requiredValues = {
      firstName: initialValues.firstName,
      lastName: initialValues.lastName,
      phoneNumbers: initialValues.phoneNumber,
    };
    let submit = true;
    for (const error in errors) {
      for (const value in requiredValues) {
        //@ts-ignore
        if (errors[error] && !requiredValues[value]) {
          alert("Fill all the fields");
          submit = false;
        }
      }
    }
    submit && addUser();
  };

  const addInputField = useCallback(
    (e: React.MouseEvent<HTMLImageElement>) => {},
    [initialValues.phoneNumber]
  );
  return (
    <form>
      <div className="input-group mb-3">
        <label htmlFor="firstName" className="input-group-text">
          First name: <span className="text-danger">*</span>{" "}
        </label>
        <input
          type="text"
          name="firstName"
          className="form-control"
          onBlur={(e) => validateFirstName(e, "firstNameError")}
          onChange={(e) => validateFirstName(e, "firstNameError")}
        />
      </div>
      <p className="mb-3 text-danger" id="firstNameError"></p>
      <div className="input-group mb-3">
        <label htmlFor="lastName" className="input-group-text">
          Last name: <span className="text-danger">*</span>{" "}
        </label>
        <input
          type="text"
          name="lastName"
          className="form-control"
          onChange={(e) => validateLastName(e, "lastNameError")}
          onBlur={(e) => validateLastName(e, "lastNameError")}
        />
      </div>
      <p className="mb-3 text-danger" id="lastNameError">
        {" "}
      </p>
      <div className="input-group mb-3">
        <label htmlFor="nickname" className="input-group-text">
          Nickname:{" "}
        </label>
        <input type="text" name="nickname" className="form-control" />
      </div>
      <p className="mb-3 text-danger"> </p>
      <div className="input-group mb-3">
        <label htmlFor="address" className="input-group-text">
          Address: <span className="text-danger">*</span>{" "}
        </label>
        <input
          type="text"
          name="address"
          placeholder="Eg: Menachem Begin 145, Tel Aviv"
          onChange={validateAddress}
          className="form-control"
        />
      </div>
      <p className="mb-3 text-danger" id="addressError"></p>
      <div className="d-flex align-items-center justify-content-center">
        <div className="w-100">
          <div className="input-group mb-3">
            <label htmlFor="phoneNumber" className="input-group-text">
              Phone number: <span className="text-danger">*</span>{" "}
            </label>
            <input
              type="text"
              onChange={validatePhoneNumber}
              onBlur={validatePhoneNumber}
              name="phoneNumber"
              className="form-control"
              placeholder="Eg: +972-052-42214722"
            />
          </div>
        </div>
        <img
          src={plusCircle}
          alt=""
          // onClick={addInputField}
          className="button-add-field"
        />
      </div>
      <p className="mb-3 text-danger" id="phoneNumberError">
        {" "}
      </p>
      <div className="input-group mb-3">
        <label htmlFor="profilePic" className="me-3">
          Upload an image <span className="text-danger">*</span>
        </label>
        <input type="file" name="profilePic" />
      </div>
      <Modal.Footer>
        <span className="me-5">
          Fields with <span className="text-danger">*</span> are required
        </span>
        <Button
          onClick={() => {
            onHide();
              setValues({
                firstName: "",
                lastName: "",
                phoneNumber: [],
                nickname: "",
                photo: "",
              });
          }}
          variant="danger"
          className="me-3"
        >
          Close
        </Button>
        <Button
          type="button"
          onClick={handleAddUser}
          variant="success"
          id="submit-button"
        >
          Submit
        </Button>
      </Modal.Footer>
    </form>
  );
}

export default CreateContactForm;
