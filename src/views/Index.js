import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Container,
  Input,
  Button,
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
} from "reactstrap";
import Header from "components/Headers/Header.js"; // ✅ Header added back

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;

    try {
      const response = await axios.get(
        `https://horseracesbackend-production.up.railway.app/api/companies?query=${searchQuery}`
      );

      console.log("Fetched Data:", response.data); // ✅ Debugging log

      if (response.data.length === 0) {
        alert("No results found. Try another search term.");
      }

      // Store in localStorage to persist data
      localStorage.setItem("searchResults", JSON.stringify(response.data));

      navigate("/searchresults", { state: { searchResults: response.data } });
    } catch (error) {
      console.error("Error fetching data:", error);
      alert("An error occurred while searching. Please try again.");
    }
  };

  return (
    <>
      <Header /> {/* ✅ Header Restored */}
      <Container className="d-flex flex-column justify-content-center align-items-center vh-100">
        <Row className="w-100 justify-content-center">
          <Col md="10" lg="8"> {/* Increased width for better visibility */}
            <Card className="shadow p-5 text-center">
              <CardBody>
                <CardTitle tag="h2" className="mb-4">
                  Find contacts for the Thoroughbred Racing & Breeding Industry
                </CardTitle>
                <div className="d-flex w-100">
                  <Input
                    type="text"
                    placeholder="Search Directory..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="form-control me-2"
                    style={{ flex: 1, fontSize: "1.2rem", padding: "12px" }} // 🔹 Wider & more readable
                  />
                  <Button 
                    color="primary" 
                    onClick={handleSearch} 
                    style={{ fontSize: "1.2rem", padding: "12px 20px" }}>
                    Search
                  </Button>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Index;
