import React, { useCallback, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import plusCircle from "../../assets/plus-circle.svg";
import { InitalValuesInterface } from "../../interface";
import Utils from "../../utils";
import Validations from "../../utils/validation";
import defaultProfilePic from "../../assets/profile.svg";

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
  const [file, setFile] = useState<File>();
  const [errors, setErrors] = useState({
    firstNameError: "",
    lastNameError: "",
    phoneNumberError: "",
    nicknameError: "",
    addressError: "",
  });

  const addInputField = useCallback(
    (e: React.MouseEvent<HTMLImageElement>) => {},
    [initialValues.phone_numbers]
  );

  const handleInputFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFile(e.target.files![0]);
  };

  return (
    <>
      <div>
        <figure className="d-flex flex-column justify-content-center ms-3  w-25">
          <img
            className="img-thumbnail w-50"
            src={file ? URL.createObjectURL(file) : defaultProfilePic}
            alt=""
          />
          <figcaption className="mt-2">Profile picture</figcaption>
        </figure>
      </div>
      <form>
        <div className="input-group mb-3">
          <label htmlFor="first_name" className="input-group-text">
            First name: <span className="text-danger">*</span>{" "}
          </label>
          <input
            type="text"
            name="first_name"
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
          <input
            type="text"
            name="nickname"
            className="form-control"
            onChange={(e) =>
              setValues({ ...initialValues, nickname: e.target.value })
            }
          />
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
          <label
            htmlFor="profilePic"
            className="me-2 text-center border p-2 rounded upload-button"
          >
            Upload image <span className="text-danger">*</span>
          </label>
          <input
            type="file"
            style={{ visibility: "hidden" }}
            onChange={handleInputFile}
            id="profilePic"
          />
        </div>
        <Modal.Footer>
          <span className="me-5">
            Fields with <span className="text-danger">*</span> are required
          </span>
          <Button
            onClick={() => {
              onHide();
              setValues({
                first_name: "",
                last_name: "",
                phone_number: [],
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
            onClick={() => Utils.handleSubmitUser(errors, addUser, file!)}
            variant="success"
            id="submit-button"
          >
            Submit
          </Button>
        </Modal.Footer>
      </form>
    </>
  );
}

export default CreateContactForm;
