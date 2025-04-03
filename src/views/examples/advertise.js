import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  FormGroup,
  Label,
  Input,
  Button,
  CardText,
} from "reactstrap";

const Advertise = () => {
  const [formData, setFormData] = useState({
    companyName: "",
    contactPerson: "",
    email: "",
    phone: "",
    website: "",
    campaignType: "",
    preferredStart: "",
    duration: "",
    message: "",
    selectedPackage: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    alert("Your inquiry has been submitted!");
    console.log("Form Data:", formData);
  };

  return (
    <Container className="mt-5 mb-5">
      <Card className="shadow-sm p-4">
        <CardBody>
          <CardTitle tag="h2" className="mb-4 text-center text-primary">
            Advertise With Us
          </CardTitle>

          <CardText className="mb-4 text-muted text-center">
            Reach thousands of users in the thoroughbred racing & breeding industry through targeted ad placements on our platform. Select your package and share your details — we'll get in touch with tailored offers.
          </CardText>

          <Row>
            {/* Advertiser Info */}
            <Col md="6">
              <FormGroup>
                <Label>Company Name</Label>
                <Input
                  type="text"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleChange}
                />
              </FormGroup>
              <FormGroup>
                <Label>Contact Person</Label>
                <Input
                  type="text"
                  name="contactPerson"
                  value={formData.contactPerson}
                  onChange={handleChange}
                />
              </FormGroup>
              <FormGroup>
                <Label>Email</Label>
                <Input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </FormGroup>
              <FormGroup>
                <Label>Phone</Label>
                <Input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </FormGroup>
              <FormGroup>
                <Label>Website (optional)</Label>
                <Input
                  type="text"
                  name="website"
                  value={formData.website}
                  onChange={handleChange}
                />
              </FormGroup>
            </Col>

            {/* Campaign Details */}
            <Col md="6">
              <FormGroup>
                <Label>Type of Campaign</Label>
                <Input
                  type="select"
                  name="campaignType"
                  value={formData.campaignType}
                  onChange={handleChange}
                >
                  <option value="">Select...</option>
                  <option value="banner">Banner (Home Page)</option>
                  <option value="sidebar">Sidebar (All Pages)</option>
                  <option value="sponsored">Sponsored Content</option>
                  <option value="newsletter">Email Newsletter</option>
                </Input>
              </FormGroup>
              <FormGroup>
                <Label>Preferred Start Date</Label>
                <Input
                  type="date"
                  name="preferredStart"
                  value={formData.preferredStart}
                  onChange={handleChange}
                />
              </FormGroup>
              <FormGroup>
                <Label>Ad Duration (weeks)</Label>
                <Input
                  type="number"
                  name="duration"
                  value={formData.duration}
                  onChange={handleChange}
                />
              </FormGroup>
              <FormGroup>
                <Label>Special Instructions / Message</Label>
                <Input
                  type="textarea"
                  rows="3"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                />
              </FormGroup>
              <FormGroup>
                <Label>Choose a Package</Label>
                <Input
                  type="select"
                  name="selectedPackage"
                  value={formData.selectedPackage}
                  onChange={handleChange}
                >
                  <option value="">Select a Package</option>
                  <option value="starter">Starter – $50/week</option>
                  <option value="pro">Pro – $120/week</option>
                  <option value="premium">Premium – $250/week</option>
                </Input>
              </FormGroup>
            </Col>
          </Row>

          {/* Submit Button */}
          <div className="text-center mt-4">
            <Button color="success" onClick={handleSubmit}>
              Submit Inquiry
            </Button>
          </div>
        </CardBody>
      </Card>
    </Container>
  );
};

export default Advertise;
