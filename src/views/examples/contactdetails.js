import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Container, Card, CardBody, CardTitle, Row, Col, Button, Input, Label, Alert
} from "reactstrap";
import Header from "components/Headers/Header.js";
import axios from "axios";

const ContactDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const company = location.state?.company;

  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const [saved, setSaved] = useState(false);

  if (!company) {
    return (
      <Container className="mt-5 text-center">
        <h2>No Company Selected</h2>
        <p>Please go back to the search results and select a company to contact.</p>
      </Container>
    );
  }

  const handleSendMessage = async () => {
    try {
      const response = await axios.post("http://localhost:8080/api/messages", {
        recipient_id: company.id,
        sender_name: "Guest User",
        sender_email: "guest@example.com",
        message,
      });
      if (response.status === 200) {
        setSent(true);
        setMessage("");
      }
    } catch (err) {
      console.error(err);
      setError("Message could not be sent. Please try again.");
    }
  };

  const handleSaveContact = () => {
    const existing = JSON.parse(localStorage.getItem("savedContacts")) || [];
    const alreadySaved = existing.some((c) => c.id === company.id);

    if (!alreadySaved) {
      const updated = [...existing, company];
      localStorage.setItem("savedContacts", JSON.stringify(updated));
      setSaved(true);
    } else {
      setSaved(true);
    }
  };

  const handleCopy = () => {
    const info = `
${company.first_name} ${company.last_name}
${company.company_name}
${company.category}
${company.city}, ${company.country}
Email: ${company.email}
Phone: ${company.phone}
    `;
    navigator.clipboard.writeText(info.trim());
    alert("Contact details copied to clipboard!");
  };

  const handleWhatsappShare = () => {
    const text = encodeURIComponent(
      `Contact Info:\n${company.first_name} ${company.last_name}\n${company.company_name}\n${company.email}\n${company.phone}`
    );
    window.open(`https://wa.me/?text=${text}`, "_blank");
  };

  const handleEmailShare = () => {
    const subject = encodeURIComponent("Sharing Contact: " + company.company_name);
    const body = encodeURIComponent(`
Contact Name: ${company.first_name} ${company.last_name}
Company: ${company.company_name}
Email: ${company.email}
Phone: ${company.phone}
    `);
    window.open(`mailto:?subject=${subject}&body=${body}`);
  };

  return (
    <>
      {/* <Header /> */}
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
                <p><strong>Listing:</strong> {company.listing_category}</p>
                <p><strong>Region:</strong> {company.region}</p>
                <p><strong>City:</strong> {company.city}, {company.country}</p>
                <p><strong>Services:</strong> {company.services}</p>

                {company.listing_category !== "Premium" ? (
                  <>
                    <p>
                      <strong>Email:</strong>{" "}
                      <a
                        href={`mailto:${company.email}`}
                        style={{ color: "blue", textDecoration: "underline" }}
                      >
                        {company.email}
                      </a>
                    </p>
                    <p><strong>Phone:</strong> {company.phone}</p>

                    {/* 💾 Save & View */}
                    <div className="mb-3 d-flex gap-3 flex-wrap">
                      <Button color="success" size="sm" onClick={handleSaveContact}>
                        💾 Save Contact
                      </Button>
                      <Button
                        color="secondary"
                        size="sm"
                        onClick={() => navigate("/contactsdirectory")}
                      >
                        📁 View Saved Contacts
                      </Button>
                    </div>

                    {/* 📤 Sharing Options */}
                    <div className="mb-3 d-flex gap-3 flex-wrap">
                      <Button color="info" size="sm" onClick={handleCopy}>
                        📋 Copy
                      </Button>
                      <Button color="success" size="sm" onClick={handleWhatsappShare}>
                        🟢 WhatsApp
                      </Button>
                      <Button color="primary" size="sm" onClick={handleEmailShare}>
                        ✉️ Email
                      </Button>
                    </div>

                    {saved && <Alert color="success" className="p-2">Contact saved!</Alert>}
                  </>
                ) : (
                  <Alert color="info">
                    This contact is listed under a <strong>Premium Listing</strong>. Use the secure form below to get in touch.
                  </Alert>
                )}

                {/* Secure Message Form */}
                <Label for="message" className="mt-4 fw-bold">Send a Secure Message</Label>
                <Input
                  type="textarea"
                  id="message"
                  rows="4"
                  placeholder="Describe your reason for contact..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="mb-3"
                />

                {sent && <Alert color="success">Your message has been sent!</Alert>}
                {error && <Alert color="danger">{error}</Alert>}

                <div className="d-flex justify-content-between">
                  <Button color="primary" onClick={handleSendMessage} disabled={!message.trim()}>
                    Send Message
                  </Button>
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
