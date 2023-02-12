import React from "react";
import { ContactInterface } from "../../interface";
import profilePic from "../../assets/profile.svg";
import ContactInfo from "../contact/ContactInfo";
import UpdateContact from "../contact/UpdateContact";
import { Button } from "react-bootstrap";
import trashcan from "../../assets/trash-can.svg";
import { useMutation } from "@apollo/client";
import { DELETE_CONTACT } from "../../GraphQL/mutations";
import Swal from "sweetalert2";

function Contact({
  contact,
  contacts,
  setContacts,
}: {
  contact: ContactInterface;
  contacts: ContactInterface[];
  setContacts: Function;
}) {
  const [contactInfoModalShow, setInfoModalShow] = React.useState(false);
  const [updateContactModalShow, setUpdateModalShow] = React.useState(false);
  const [deleteContact, { error, data, loading }] = useMutation(
    DELETE_CONTACT,
    {
      variables: { deleteContactId: contact.id },
    }
  );

  const handleDeleteContact = () => {
    Swal.fire({
      icon: "warning",
      title: "Are you sure?",
      showCancelButton: true,
      text: "You are about to delete a contact",
      confirmButtonText: "Yes, delete",
      cancelButtonText: "No, cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteContact()
          .then(() => {
            if (!loading)
              Swal.fire({
                icon: "success",
                title: `${
                  contact.nickname
                    ? contact.nickname
                    : `${contact.first_name} ${contact.last_name}`
                } deleted`,
              });
          })
          .then(() => setTimeout(() => window.location.reload(), 3000));
      }
    });
  };
  return (
    <>
      <div className="border-BFBCCB rounded w-50 mb-3 cursor-pointer position-relative">
        <Button
          id={contact.id}
          className="btn-danger position-absolute top-0 end-0 m-2 delete-button-size"
          onClick={handleDeleteContact}
        >
          <img src={trashcan} alt="" className="w-100" />
        </Button>
        <div
          onClick={() => setInfoModalShow(true)}
          className="d-flex justify-content-center"
        >
          <figure className="w-25 py-3">
            <img src={profilePic} className="w-100" alt="" />
          </figure>
          <div className="py-3 w-50 d-flex flex-column align-items-center justify-content-center">
            <h2 className="color-784F41">
              {contact.nickname
                ? contact.nickname
                : `${contact.first_name} ${contact.last_name}`}
            </h2>
            <p className="fw-bolder mb-0 pt-3 fs-5">
              {contact.phone_numbers[0]}
            </p>
            <p className="mt-0">Click to see details</p>
          </div>
        </div>
      </div>
      {contactInfoModalShow ? (
        <ContactInfo
          show={contactInfoModalShow}
          onHide={() => setInfoModalShow(false)}
          contactId={contact.id}
          onShow={() => setUpdateModalShow(true)}
        />
      ) : null}
      {updateContactModalShow ? (
        <UpdateContact
          show={updateContactModalShow}
          contactId={contact.id}
          onHide={() => setUpdateModalShow(false)}
          contacts={contacts}
          setContacts={setContacts}
        />
      ) : null}
    </>
  );
}

export default Contact;
