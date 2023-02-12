import { useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { LOAD_CONTACTS } from "../../GraphQL/queries";
import { ContactInterface } from "../../interface";
import Contact from "./Contact";

function ContactList({
  search,
  contacts,
  setContacts,
}: {
  search: String;
  contacts: ContactInterface[];
  setContacts: Function;
}) {
  let offset = 0;
  const LIMIT = 5;
  const { data, loading, error, refetch } = useQuery(LOAD_CONTACTS, {
    variables: { offset, limit: LIMIT, search },
  });

  const onScroll = async (e: any) => {
    if (
      window.innerHeight + e.target.documentElement.scrollTop + 1 >=
      e.target.documentElement.scrollHeight
    ) {
      offset += 5;
      refetch({ offset });
    }
  };

  useEffect(() => {
    if (!search) {
      if (!loading) setContacts([...contacts, ...data.contacts]);
    } else {
      if (!loading) setContacts([...data.contacts]);
    }
  }, [data]);

  useEffect(() => document.addEventListener("scroll", onScroll), []);
  return (
    <main className="d-flex flex-column justify-content-center align-items-center bg-color-BBE5ED pt-3">
      {!loading ? (
        contacts.map((contact: ContactInterface) => (
          <Contact
            key={contact.id}
            contact={contact}
            contacts={contacts}
            setContacts={setContacts}
          />
        ))
      ) : (
        <div>loading...</div>
      )}
    </main>
  );
}

export default ContactList;
