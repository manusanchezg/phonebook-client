import { useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { LOAD_CONTACTS } from "../../GraphQL/queries";
import { ContactInfo, InitalValuesInterface } from "../../interface";
import Contact from "./Contact";

function ContactList({ search }: { search: String }) {
  const LIMIT = 5;
  const { data, loading, error, fetchMore } = useQuery(LOAD_CONTACTS, {
    variables: { offset: 0, limit: LIMIT, search },
  });

  const onScroll = async (e: any) => {
    if (
      window.innerHeight + e.target.documentElement.scrollTop + 1 >=
      e.target.documentElement.scrollHeight
    ) {
      await fetchMore({
        variables: { offset: data.contacts.length },
        //   updateQuery: (previousResult, { fetchMoreResult }) => {
        //     console.log(previousResult.contacts, fetchMoreResult.contacts)
        //     const newEntries = fetchMoreResult.contacts;
        //     return {
        //       contacts: {
        //         nextCursor: fetchMoreResult.contacts.nextCursor,
        //         entries: [...previousResult.contacts, ...newEntries],
        //       },
        //     };
        //   },
      });
    }
  };

  useEffect(() => {
    document.addEventListener("scroll", onScroll);
  }, [data]);
  return (
    <main className="d-flex flex-column justify-content-center align-items-center bg-color-BBE5ED pt-3">
      {!loading ? (
        data.contacts.map((contact: ContactInfo) => (
          <Contact key={contact.id} contact={contact} />
        ))
      ) : (
        <div>loading...</div>
      )}
    </main>
  );
}

export default ContactList;
