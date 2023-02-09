import { useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { LOAD_CONTACTS } from "../../GraphQL/queries";
import { ContactInterface, InitalValuesInterface } from "../../interface";
import Contact from "./Contact";

function ContactList({ search }: { search: String }) {
  const [contacts, setContacts] = useState<ContactInterface[]>([]);
  let offset = 0;
  const LIMIT = 5;
  const { data, loading, error, fetchMore, refetch } = useQuery(LOAD_CONTACTS, {
    variables: { offset, limit: LIMIT, search },
  });

  const onScroll = async (e: any) => {
    if (
      window.innerHeight + e.target.documentElement.scrollTop + 1 >=
      e.target.documentElement.scrollHeight
    ) {
      offset += 5;
      refetch({ offset });
      console.log(offset);
    }
  };

  useEffect(() => {
    if (!loading) setContacts([...contacts, ...data.contacts]);
  }, [data]);

  useEffect(() => document.addEventListener("scroll", onScroll), []);
  // console.log(contacts)
  return (
    <main className="d-flex flex-column justify-content-center align-items-center bg-color-BBE5ED pt-3">
      {!loading ? (
        contacts.map((contact: ContactInterface) => (
          <Contact key={contact.id} contact={contact} />
        ))
      ) : (
        <div>loading...</div>
      )}
    </main>
  );
}

export default ContactList;
