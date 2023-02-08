import React from 'react';
import { data } from "../../utils/contacts.js";
import profilePic from "../../assets/profile.svg"

function ContactList() {
  return (
    <main>
      {data.contacts.map(contact => (
        <div key={contact.id} className="d-flex border border-secondary rounded mb-4 mx-4">
          <figure className='w-25 p-3'>
            <img src={profilePic} className="w-50" alt="" />
          </figure>
          <div className='py-3'>
          <h2>
            {contact.nickname ? contact.nickname : `${contact.firstName} ${contact.lastName}`}
          </h2>
          </div>
        </div>
      ))}
    </main>
  )
}

export default ContactList