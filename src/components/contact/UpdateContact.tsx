import { useMutation, useQuery } from "@apollo/client";
import { useState } from "react";
import { Button } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import Swal from "sweetalert2";
import defaultProfilePic from "../../assets/profile.svg";
import { UPDATE_CONTACT } from "../../GraphQL/mutations";
import { GET_CONTACT_INFO } from "../../GraphQL/queries";
import { ContactInterface, ErrorsInterface } from "../../interface";
import Utils from "../../utils";
import Validations from "../../utils/validation";

function UpdateContact({
  show,
  onHide,
  contactId,
  contacts,
  setContacts,
}: {
  show: boolean;
  onHide: () => void;
  contactId: string;
  contacts: ContactInterface[];
  setContacts: Function;
}) {
  const { data, loading, error } = useQuery(GET_CONTACT_INFO, {
    variables: { contactId },
  });
  const [file, setFile] = useState<File>()
  const [contactInfo, setInfo] = useState({
    ...data.Contact,
  });

  const [updateError, setError] = useState<ErrorsInterface>({});

  const [UpdateContact, {}] = useMutation(UPDATE_CONTACT);

  const handleInputFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFile(e.target.files![0]);
  };

  const updateUser = () => {
    UpdateContact({
      variables: { ...contactInfo, updateContactId: contactId },
    })
      .then((result) => {
        Swal.fire({
          title: "User updated succesfully",
          icon: "success",
        }).then(() => onHide())
        .then(() => window.location.reload());
      })
      .catch((err) => console.log(err));
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Modify contact</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {!loading ? (
          <>
            <div className="d-flex justify-content-around">
              <figure className="d-flex flex-column justify-content-center ms-3  w-25">
                <img
                  className="img-thumbnail"
                  src={
                    /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/.test(
                      data.Contact.photo
                    )
                      ? data.Contact.photo
                      : defaultProfilePic
                  }
                  alt=""
                />
                <label
                  className="mt-2 text-center border py-2 rounded upload-button"
                  htmlFor="files"
                >
                  Select picture
                </label>
                <input
                  type="file"
                  id="files"
                  style={{ visibility: "hidden" }}
                  onChange={handleInputFile}
                />
              </figure>
              <div className="d-flex flex-column justify-content-center w-50 input-group mb-3">
                <div className="mb-3 input-group">
                  <label
                    htmlFor="first_name"
                    className="fw-bolder fs-5 input-group-text"
                  >
                    First name:{" "}
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    defaultValue={data.Contact.first_mame}
                    onChange={(e) =>
                      Validations.validateFirstName(
                        e,
                        "firstNameError",
                        setError,
                        updateError,
                        setInfo,
                        contactInfo
                      )
                    }
                    onBlur={(e) =>
                      Validations.validateFirstName(
                        e,
                        "firstNameError",
                        setError,
                        updateError,
                        setInfo,
                        contactInfo
                      )
                    }
                  />
                </div>
                <p className="mb-3 text-danger" id="firstNameError"></p>
                <div className="mb-3 input-group">
                  <label
                    htmlFor="lastName"
                    className="fw-bolder fs-5 input-group-text"
                  >
                    Last name:{" "}
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    defaultValue={data.Contact.last_name}
                    onChange={(e) =>
                      Validations.validateLastName(
                        e,
                        "lastNameError",
                        setError,
                        updateError,
                        setInfo,
                        contactInfo
                      )
                    }
                    onBlur={(e) =>
                      Validations.validateLastName(
                        e,
                        "lastNameError",
                        setError,
                        updateError,
                        setInfo,
                        contactInfo
                      )
                    }
                  />
                </div>
                <p className="mb-3 text-danger" id="lastNameError"></p>
                <div className="mb-3 input-group">
                  <label
                    htmlFor="nickname"
                    className="fw-bolder fs-5 input-group-text"
                  >
                    Nickname:{" "}
                  </label>{" "}
                  <input
                    defaultValue={data.Contact.nickname}
                    className="form-control"
                    onChange={(e) => {
                      setInfo({ ...contactInfo, nickname: e.target.value });
                    }}
                    onBlur={(e) => {
                      setInfo({ ...contactInfo, nickname: e.target.value });
                    }}
                  />
                </div>
                <div className="mb-3 input-group">
                  <label
                    htmlFor="address"
                    className="fw-bolder fs-5 input-group-text"
                  >
                    Address:{" "}
                  </label>{" "}
                  <input
                    defaultValue={data.Contact.address}
                    className="form-control"
                    onChange={(e) => Validations.validateAddress(
                      e,
                      "addressError",
                      setError,
                      updateError,
                      setInfo,
                      contactInfo
                    )}
                  />
                </div>
                <p className="mb-3 text-danger" id="addressError"></p>
                <div className="mb-3 input-group">
                  <label htmlFor="phoneNumbers" className="fw-bolder fs-5">
                    Phone number/s:{" "}
                  </label>{" "}
                  <ul className="list-group list-group-flush w-50">
                    {data.Contact.phone_numbers.map((phone: string) => (
                      <li className="list-group-item text-center">{phone}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div>Loading...</div>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="outline-success"
          onClick={() => Utils.handleSubmitUser(updateError, updateUser, file!)}
        >
          Update
        </Button>
        <Button variant="outline-danger" onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default UpdateContact;
