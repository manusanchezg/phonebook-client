import React from "react";
import { Nav, Form, Button } from "react-bootstrap";

function NavigationBar({
  onShow,
  setSearch,
}: {
  onShow: React.MouseEventHandler;
  setSearch: Function;
}) {
  const handleSearch = (e: any) => {
    setTimeout(() => setSearch(e.target.value), 400);
  };
  return (
    <Nav className="justify-content-end my-3 mx-4" activeKey="/home">
      <Nav.Item>
        <Nav.Link onClick={onShow}>Add Contact</Nav.Link>
      </Nav.Item>
      <Form className="d-flex mx-2">
        <Form.Control
          type="search"
          placeholder="Search"
          className="me-2"
          aria-label="Search"
          id="searchField"
          onChange={handleSearch}
        />
        <Button variant="outline-success">Search</Button>
      </Form>
    </Nav>
  );
}

export default NavigationBar;
