import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Container, Card, CardBody, CardTitle, Row, Col, Button, Input, Label
} from "reactstrap";
import Header from "components/Headers/Header.js";

const ContactDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const company = location.state?.company;

  if (!company) {
    return (
      <Container className="mt-5 text-center">
        <h2>No Company Selected</h2>
        <p>Please go back to the search results and select a company to contact.</p>
      </Container>
    );
  }

  return (
    <>
      <Header />
      <Container className="mt-5" fluid>
        <Row className="justify-content-center">
          <Col md="8">
            <Card className="shadow p-4">
              <CardBody>
                <CardTitle tag="h2" className="mb-3 text-center">
                  Contact Details
                </CardTitle>
                <h4>{company.company_name}</h4>
                <p><strong>Category:</strong> {company.category}</p>
                <p><strong>City:</strong> {company.city}, {company.country}</p>

                {/* Contact Info */}
                <p>
                  <strong>Email:</strong> 
                  <a href={`mailto:${company.email}`} style={{ color: "blue", textDecoration: "underline", marginLeft: "5px" }}>
                    {company.email}
                  </a>
                </p>
                <p><strong>Phone:</strong> {company.phone}</p>

                {/* Message Box */}
                <Label for="message">Message</Label>
                <Input type="textarea" id="message" rows="4" placeholder="Describe your reason for contact..." className="mb-3" />

                {/* Buttons */}
                <div className="d-flex justify-content-between">
                  <Button color="primary">Send Message</Button>
                  <span
                    onClick={() => navigate("/request-update", { state: { company } })}
                    style={{ color: "blue", textDecoration: "underline", cursor: "pointer" }}
                  >
                    Request an Update
                  </span>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default ContactDetails;
