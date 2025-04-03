import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Container,
  Card,
  CardBody,
  CardTitle,
  Row,
  Col,
  Button,
  Input,
  Label,
  FormGroup,
  Alert
} from "reactstrap";
import Header from "components/Headers/Header.js";
import axios from "axios";

const RequestUpdate = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const company = location.state?.company;

  const [formType, setFormType] = useState("Update"); // 'Update' or 'Remove'
  const [reason, setReason] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const [updatedData, setUpdatedData] = useState({});

  if (!company) {
    return (
      <Container className="mt-5 text-center">
        <h2>No Company Selected</h2>
        <p>Please go back to the search results and select a company to request an update or removal.</p>
      </Container>
    );
  }

  const handleChange = (field, value) => {
    setUpdatedData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    try {
      const payload = {
        company_id: company.id,
        email: updatedData.email || company.email,
        request_type: formType,
        reason,
      };

      const response = await axios.post("http://localhost:8080/api/gdpr-request", payload);
      if (response.status === 200) {
        setSubmitted(true);
        setTimeout(() => navigate("/searchresults"), 2000);
      }
    } catch (err) {
      console.error("Error submitting GDPR request:", err);
      setError("Something went wrong. Please try again.");
    }
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
                  Request an Update or Opt-Out
                </CardTitle>
                <p className="text-muted">
                  Please update any incorrect information below or request to have your listing removed.
                </p>

                <FormGroup>
                  <Label for="formType">Request Type</Label>
                  <Input
                    type="select"
                    id="formType"
                    value={formType}
                    onChange={(e) => setFormType(e.target.value)}
                  >
                    <option value="Update">Update My Listing</option>
                    <option value="Remove">Remove My Listing (Opt-Out)</option>
                  </Input>
                </FormGroup>

                {formType === "Update" && (
                  <>
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
                  </>
                )}

                <FormGroup>
                  <Label for="reason">Explain Your Request</Label>
                  <Input
                    type="textarea"
                    id="reason"
                    rows="4"
                    placeholder="Explain what should be updated or why you'd like to be removed..."
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                  />
                </FormGroup>

                {submitted && (
                  <Alert color="success">
                    ✅ Your request has been submitted. We'll get back to you shortly.
                  </Alert>
                )}
                {error && (
                  <Alert color="danger">
                    {error}
                  </Alert>
                )}

                <Button color="primary" block onClick={handleSubmit}>
                  Submit Request
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
