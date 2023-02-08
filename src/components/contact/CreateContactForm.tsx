import React, { useCallback, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import plusCircle from "../../assets/plus-circle.svg";
import Validations from "../../utils/validation";

function CreateContactForm({ onHide }: { onHide: () => void }) {
  const [errors, setErrors] = useState({
    firstNameError: "",
    lastNameError: "",
    phoneNumberError: "",
  });
  const [initialValues, setValues] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: [],
    nickname: "",
    photo: "",
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

  const addInputField = useCallback(
    (e: React.MouseEvent<HTMLImageElement>) => {
      setValues({
        ...initialValues,
        phoneNumber: [...initialValues.phoneNumber],
      });
    },
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
            <input type="text" name="phoneNumber" className="form-control" />
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
        <Button type="submit" variant="success">
          Submit
        </Button>
      </Modal.Footer>
    </form>
  );
}

export default CreateContactForm;
