import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Card,
  CardBody,
  CardTitle,
  Table,
  Button,
  Row,
  Col,
} from "reactstrap";
import Header from "components/Headers/Header.js";

const SavedContacts = () => {
  const [savedContacts, setSavedContacts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const contacts = JSON.parse(localStorage.getItem("savedContacts")) || [];
    setSavedContacts(contacts);
  }, []);

  const handleRemove = (id) => {
    const updated = savedContacts.filter((contact) => contact.id !== id);
    setSavedContacts(updated);
    localStorage.setItem("savedContacts", JSON.stringify(updated));
  };

  const handleView = (contact) => {
    navigate("/contactdetails", { state: { company: contact } });
  };

  return (
    <>
      <Header />
      <Container className="mt-5" fluid>
        <Row className="justify-content-center">
          <Col md="10">
            <Card className="shadow p-4">
              <CardBody>
                <CardTitle tag="h2" className="mb-4 text-center">
                  📁 Saved Contacts
                </CardTitle>
                {savedContacts.length === 0 ? (
                  <p className="text-center">No contacts saved yet.</p>
                ) : (
                  <Table responsive>
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Company</th>
                        <th>Category</th>
                        <th>Country</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {savedContacts.map((contact) => (
                        <tr key={contact.id}>
                          <td>{contact.first_name} {contact.last_name}</td>
                          <td>{contact.company_name}</td>
                          <td>{contact.category}</td>
                          <td>{contact.country}</td>
                          <td>
                            <Button
                              color="info"
                              size="sm"
                              className="me-2"
                              onClick={() => handleView(contact)}
                            >
                              View
                            </Button>
                            <Button
                              color="danger"
                              size="sm"
                              onClick={() => handleRemove(contact.id)}
                            >
                              Remove
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                )}
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default SavedContacts;
