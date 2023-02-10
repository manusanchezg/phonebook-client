import React, { useState } from "react";
import { ContactInterface } from "../../interface";
import CreateContact from "../contact/CreateContact";
import ContactList from "./ContactList";
import NavigationBar from "./NavigationBar";

function HomePage() {
  const [createContactModalShow, setCreateModalShow] = React.useState(false);
  const [search, setSearch] = React.useState("");
  const [contacts, setContacts] = useState<ContactInterface[]>([]);

  return (
    <div>
      <NavigationBar
        onShow={() => setCreateModalShow(true)}
        setSearch={setSearch}
      />
      <ContactList
        search={search}
        contacts={contacts}
        setContacts={setContacts}
      />
      <CreateContact
        show={createContactModalShow}
        onHide={() => setCreateModalShow(false)}
      />
    </div>
  );
}

export default HomePage;
