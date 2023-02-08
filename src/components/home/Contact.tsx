import React from "react";
import { ContactInterface } from "../../interface";
import profilePic from "../../assets/profile.svg";

function Contact({ contact }: ContactInterface) {
  return (
    <div className="d-flex border-BFBCCB rounded w-50 mb-3 justify-content-center cursor-pointer">
      <figure className="w-25 py-3">
        <img src={profilePic} className="w-100" alt="" />
      </figure>
      <div className="py-3 w-50 d-flex flex-column align-items-center justify-content-center">
        <h2 className="color-784F41">
          {contact.nickname
            ? contact.nickname
            : `${contact.firstName} ${contact.lastName}`}
        </h2>
        <ul className="list-group list-group-flush">
          {contact.phoneNumbers.map((phone) => (
            <li
              className="list-group-item bg-color-BBE5ED color-784F41 fw-bold"
              key={phone}
            >
              {phone}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Contact;
