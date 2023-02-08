import React from "react";
import { data } from "../../utils/contacts.js";
import Contact from "./Contact";

function ContactList() {
  return (
    <main className="d-flex flex-column justify-content-center align-items-center bg-color-BBE5ED pt-3">
      {data.contacts.map((contact) => (
        <Contact key={contact.id} contact={contact} />
      ))}
    </main>
  );
}

export default ContactList;
