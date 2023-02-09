import React, { useCallback, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { ObjectType } from "typescript";
import plusCircle from "../../assets/plus-circle.svg";
import { ErrorsInterface, InitalValuesInterface } from "../../interface";
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
  });

  const validateRequiredStrings = useCallback(
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
    setValues({ ...initialValues, phoneNumber: e.target.value });
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
    }
  };

  const handleAddUser = (e: React.MouseEvent<HTMLButtonElement>) => {
    const requiredValues = {
      firstName: initialValues.firstName,
      lastName: initialValues.lastName,
      phoneNumbers: initialValues.phoneNumber,
    };
    let submit = true
    for (const error in errors) {
      for (const value in requiredValues) {
        // console.log(e.target)
        //@ts-ignore
        if (errors[error] && !requiredValues[value]) {
          alert("Fill all the fields")
          submit = false
        }
      }
    }
    submit && addUser({...initialValues, photo: "Some photo"})
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
          onBlur={(e) => validateRequiredStrings(e, "firstNameError")}
          onChange={(e) => validateRequiredStrings(e, "firstNameError")}
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
          onChange={(e) => validateRequiredStrings(e, "lastNameError")}
          onBlur={(e) => validateRequiredStrings(e, "lastNameError")}
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
          Address:{" "}
        </label>
        <input type="text" name="address" className="form-control" />
      </div>
      <p className="mb-3 text-danger"> </p>
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
        <Button onClick={onHide} className="me-3">
          Close
        </Button>
        <Button type="button" onClick={handleAddUser} variant="success" id="submit-button">
          Submit
        </Button>
      </Modal.Footer>
    </form>
  );
}

export default CreateContactForm;
