import React, { useCallback, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import Swal from "sweetalert2";
import plusCircle from "../../assets/plus-circle.svg";
import { InitalValuesInterface } from "../../interface";
import Utils from "../../utils";
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
  const requiredValues: any = {
    firstName: initialValues.firstName,
    lastName: initialValues.lastName,
    phoneNumbers: initialValues.phoneNumbers,
  };

  const addInputField = useCallback(
    (e: React.MouseEvent<HTMLImageElement>) => {},
    [initialValues.phoneNumbers]
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
          onBlur={(e) =>
            Validations.validateFirstName(
              e,
              "firstNameError",
              setErrors,
              errors,
              setValues,
              initialValues
            )
          }
          onChange={(e) =>
            Validations.validateFirstName(
              e,
              "firstNameError",
              setErrors,
              errors,
              setValues,
              initialValues
            )
          }
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
          onChange={(e) =>
            Validations.validateLastName(
              e,
              "lastNameError",
              setErrors,
              errors,
              setValues,
              initialValues
            )
          }
          onBlur={(e) =>
            Validations.validateLastName(
              e,
              "lastNameError",
              setErrors,
              errors,
              setValues,
              initialValues
            )
          }
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
          placeholder="Eg: Menachem Begin 145"
          onChange={(e) =>
            Validations.validateAddress(
              e,
              "addressError",
              setErrors,
              errors,
              setValues,
              initialValues
            )
          }
          onBlur={(e) =>
            Validations.validateAddress(
              e,
              "addressError",
              setErrors,
              errors,
              setValues,
              initialValues
            )
          }
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
              onChange={(e) =>
                Validations.validatePhoneNumber(
                  e,
                  "phoneNumberError",
                  setErrors,
                  errors,
                  setValues,
                  initialValues
                )
              }
              onBlur={(e) =>
                Validations.validatePhoneNumber(
                  e,
                  "phoneNumberError",
                  setErrors,
                  errors,
                  setValues,
                  initialValues
                )
              }
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
          onClick={() => Utils.handleSubmitUser(requiredValues, addUser)}
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
