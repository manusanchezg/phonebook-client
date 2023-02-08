import React from "react";
import { Nav, Form, Button } from "react-bootstrap";

function NavigationBar({onShow}: {onShow: React.MouseEventHandler}) {
  return (
    <Nav className="justify-content-end m-4" activeKey="/home">
      <Nav.Item>
        <Nav.Link onClick={onShow}>Add Contact</Nav.Link>
      </Nav.Item>
      <Form className="d-flex mx-2">
        <Form.Control
          type="search"
          placeholder="Search"
          className="me-2"
          aria-label="Search"
        />
        <Button variant="outline-success">Search</Button>
      </Form>
    </Nav>
  );
}

export default NavigationBar;
