import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/esm/Button";
import defaultProfilePic from "../../assets/profile.svg";
import { ChangeEvent, useCallback, useState } from "react";
import plusCircle from "../../assets/plus-circle.svg";
import "../../style/CreateContact.css";

function CreateContact({
  show,
  onHide,
}: {
  show: boolean;
  onHide: () => void;
}) {
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

  const validateFirstName = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const regex = /^[a-zA-Z]+$/;
      let p = document.getElementById("firstNameError");
      let firstNameError;
      setValues({ ...initialValues, firstName: e.target.value });
      if (!initialValues.firstName) {
        firstNameError = "Required field";
        p!.textContent = firstNameError;
        setErrors({ ...errors, firstNameError });
      } else if (!regex.test(initialValues.firstName)) {
        firstNameError =
          "First name must only contain upper case and lower case letters";
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
      setValues({...initialValues, phoneNumber: [...initialValues.phoneNumber]})
    },
    [initialValues.phoneNumber]
  );

  const validateLastName = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const regex = /^[a-zA-Z]+$/;
      let p = document.getElementById("lastNameError");
      let lastNameError;
      setValues({ ...initialValues, lastName: e.target.value });
      if (!initialValues.lastName) {
        lastNameError = "Required field";
        p!.textContent = lastNameError;
        setErrors({ ...errors, lastNameError });
      } else if (!regex.test(initialValues.lastName)) {
        lastNameError =
          "First name must only contain upper case and lower case letters";
        p!.textContent = lastNameError;
        setErrors({ ...errors, lastNameError });
      } else {
        p!.textContent = "";
        setErrors({ ...errors, lastNameError: "" });
      }
    },
    [errors]
  );

  const image = "";
  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Add new contact
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div>
          <figure className="d-flex flex-column justify-content-center ms-3  w-25">
            <img
              className="img-thumbnail"
              src={image ? image : defaultProfilePic}
              alt=""
            />
            <figcaption className="mt-2 text-center">
              Profile picture
            </figcaption>
          </figure>
        </div>
        <form>
          <div className="input-group mb-3">
            <label htmlFor="firstName" className="input-group-text">
              First name: <span className="text-danger">*</span>{" "}
            </label>
            <input
              type="text"
              name="firstName"
              className="form-control"
              onBlur={validateFirstName}
              onChange={validateFirstName}
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
              onChange={validateLastName}
              onBlur={validateLastName}
            />
          </div>
          <p className="mb-3 text-danger" id="lastNameError">
            {" "}
          </p>
          <div className="input-group mb-3">
            <label htmlFor="nickname" className="input-group-text">
              Nickname:{" "}
            </label>
            <input type="text" name="Nickname" className="form-control" />
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
                  name="phoneNumber"
                  className="form-control"
                />
              </div>
            </div>
            <img
              src={plusCircle}
              alt=""
              onClick={addInputField}
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
      </Modal.Body>
    </Modal>
  );
}

export default CreateContact;
