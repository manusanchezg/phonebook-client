import React from "react";
import ContactInfo from "../contact/ContactInfo";
import CreateContact from "../contact/CreateContact";
import ContactList from "./ContactList";
import NavigationBar from "./NavigationBar";

function HomePage() {
  const [createContactModalShow, setCreateModalShow] = React.useState(false);
  const [search, setSearch] = React.useState('');

  return (
    <div>
      <NavigationBar onShow={() => setCreateModalShow(true)} setSearch={setSearch} />
      <ContactList search={search} />
      <CreateContact show={createContactModalShow} onHide={() => setCreateModalShow(false)} />
    </div>
  );
}

export default HomePage;
