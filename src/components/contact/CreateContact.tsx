import { useMutation } from "@apollo/client";
import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import defaultProfilePic from "../../assets/profile.svg";
import { CREATE_CONTACT } from "../../GraphQL/mutations";
import "../../style/CreateContact.css";
import CreateContactForm from "./CreateContactForm";

function CreateContact({
  show,
  onHide,
}: {
  show: boolean;
  onHide: () => void;
}) {
  const [initialValues, setValues] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: [],
    nickname: "",
    photo: "",
  });

  const [CreateContact, { error }] = useMutation(CREATE_CONTACT);

  const addUser = () => {
    CreateContact({
      variables: { createContactInput: initialValues },
    });
  };

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
              className="img-thumbnail w-50"
              src={image ? image : defaultProfilePic}
              alt=""
            />
            <figcaption className="mt-2">Profile picture</figcaption>
          </figure>
        </div>
        <CreateContactForm
          onHide={onHide}
          initialValues={initialValues}
          setValues={setValues}
          addUser={addUser}
        />
      </Modal.Body>
    </Modal>
  );
}

export default CreateContact;
