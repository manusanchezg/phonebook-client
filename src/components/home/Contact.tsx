import React from "react";
import { ContactInterface } from "../../interface";
import profilePic from "../../assets/profile.svg";
import ContactInfo from "../contact/ContactInfo";
import UpdateContact from "../contact/UpdateContact";

function Contact({ contact }: { contact: ContactInterface }) {
  const [contactInfoModalShow, setInfoModalShow] = React.useState(false);
  const [updateContactModalShow, setUpdateModalShow] = React.useState(false);
  return (
    <>
      <div
        onClick={() => setInfoModalShow(true)}
        className="d-flex border-BFBCCB rounded w-50 mb-3 justify-content-center cursor-pointer"
      >
        <figure className="w-25 py-3">
          <img src={profilePic} className="w-100" alt="" />
        </figure>
        <div className="py-3 w-50 d-flex flex-column align-items-center justify-content-center">
          <h2 className="color-784F41">
            {contact.nickname
              ? contact.nickname
              : `${contact.firstName} ${contact.lastName}`}
          </h2>
          <p className="fw-bolder mb-0 pt-3 fs-5">{contact.phoneNumbers[0]}</p>
          <p className="mt-0">Click to see details</p>
        </div>
      </div>
      {contactInfoModalShow ? (
        <ContactInfo
          show={contactInfoModalShow}
          onHide={() => setInfoModalShow(false)}
          contactId={contact.id}
          onShow={()=>setUpdateModalShow(true)}
        />
      ) : null}
      {updateContactModalShow ? (
        <UpdateContact
          show={updateContactModalShow}
          contactId={contact.id}
          onHide={() => setUpdateModalShow(false)}
        />
      ) : null}
    </>
  );
}

export default Contact;
