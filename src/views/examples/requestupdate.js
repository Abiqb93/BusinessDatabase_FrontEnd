import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Container, Card, CardBody, CardTitle, Row, Col, Button, Input, Label, FormGroup
} from "reactstrap";
import Header from "components/Headers/Header.js";

const RequestUpdate = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const company = location.state?.company;

  const [updatedData, setUpdatedData] = useState({});

  if (!company) {
    return (
      <Container className="mt-5 text-center">
        <h2>No Company Selected</h2>
        <p>Please go back to the search results and select a company to request an update.</p>
      </Container>
    );
  }

  const handleChange = (field, value) => {
    setUpdatedData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    alert("Update request sent. An admin will review your request.");
    navigate("/searchresults"); // Redirect back to search results
  };

  return (
    <>
      <Header />
      <Container className="mt-5" fluid>
        <Row className="justify-content-center">
          <Col md="8">
            <Card className="shadow p-4">
              <CardBody>
                <CardTitle tag="h2" className="mb-3 text-center">
                  Request an Update
                </CardTitle>
                <p>Please update any incorrect information below and submit your request.</p>

                <FormGroup>
                  <Label for="companyName">Business Name</Label>
                  <Input
                    type="text"
                    id="companyName"
                    defaultValue={company.company_name}
                    onChange={(e) => handleChange("company_name", e.target.value)}
                  />
                </FormGroup>

                <FormGroup>
                  <Label for="category">Category</Label>
                  <Input
                    type="text"
                    id="category"
                    defaultValue={company.category}
                    onChange={(e) => handleChange("category", e.target.value)}
                  />
                </FormGroup>

                <FormGroup>
                  <Label for="city">City</Label>
                  <Input
                    type="text"
                    id="city"
                    defaultValue={company.city}
                    onChange={(e) => handleChange("city", e.target.value)}
                  />
                </FormGroup>

                <FormGroup>
                  <Label for="email">Email</Label>
                  <Input
                    type="email"
                    id="email"
                    defaultValue={company.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                  />
                </FormGroup>

                <FormGroup>
                  <Label for="phone">Phone</Label>
                  <Input
                    type="text"
                    id="phone"
                    defaultValue={company.phone}
                    onChange={(e) => handleChange("phone", e.target.value)}
                  />
                </FormGroup>

                <FormGroup>
                  <Label for="updateReason">Details of Update</Label>
                  <Input
                    type="textarea"
                    id="updateReason"
                    placeholder="Describe what needs to be updated..."
                    onChange={(e) => handleChange("update_reason", e.target.value)}
                  />
                </FormGroup>

                <Button color="primary" block onClick={handleSubmit}>
                  Submit Update Request
                </Button>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default RequestUpdate;
