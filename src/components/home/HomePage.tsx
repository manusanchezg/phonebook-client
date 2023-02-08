import React from "react";
import CreateContact from "../contact/CreateContact";
import ContactList from "./ContactList";
import NavigationBar from "./NavigationBar";

function HomePage() {
  const [modalShow, setModalShow] = React.useState(false);

  return (
    <div>
      <NavigationBar onShow={() => setModalShow(true)} />
      <ContactList />
      <CreateContact show={modalShow} onHide={() => setModalShow(false)} />
    </div>
  );
}

export default HomePage;
