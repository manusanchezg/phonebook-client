import { useMutation } from "@apollo/client";
import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Swal from "sweetalert2";
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
    first_name: "",
    last_name: "",
    phone_numbers: [],
    nickname: "",
    photo: "",
    address: "",
  });

  const [CreateContact, { error }] = useMutation(CREATE_CONTACT);

  const addUser = (imageUrl: string) => {
    console.log({...initialValues, photo: imageUrl})
    CreateContact({
      variables: { ...initialValues, photo: imageUrl },
    })
      .then((result) => {
        Swal.fire({
          title: "User Added succesfully",
          icon: "success",
        })
        .then(() => closePopUp());
      })
      .catch((err) => console.log(err));
  };

  const closePopUp = () => {
    onHide();
  };
  return (
    <Modal
      show={show}
      onHide={closePopUp}
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
