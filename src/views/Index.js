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
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  CarouselCaption,
  Collapse,
  FormGroup,
  Label
} from "reactstrap";

// Import local banner images
import banner1 from "assets/images/banner1.jpg";
import banner2 from "assets/images/banner2.jpg";
import banner3 from "assets/images/banner3.jpg";

const items = [
  { src: banner1, altText: "Ad 1", caption: "" },
  { src: banner2, altText: "Ad 2", caption: "" },
  { src: banner3, altText: "Ad 3", caption: "" }
];

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [filters, setFilters] = useState({
    firstName: "",
    lastName: "",
    company: "",
    category: "",
    country: "",
    listingCategory: "",
    region: "",
    servicesOffered: ""
  });

  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);

  // ✅ Toggle between environments
  // const baseUrl = "http://localhost:8080/api/companies";
  const baseUrl = "https://horseracesbackend-production.up.railway.app/api/companies";

  const next = () => {
    if (animating) return;
    const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  };

  const previous = () => {
    if (animating) return;
    const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
    setActiveIndex(nextIndex);
  };

  const goToIndex = (newIndex) => {
    if (animating) return;
    setActiveIndex(newIndex);
  };

  const slides = items.map((item) => (
    <CarouselItem
      onExiting={() => setAnimating(true)}
      onExited={() => setAnimating(false)}
      key={item.src}
    >
      <img
        src={item.src}
        alt={item.altText}
        className="d-block w-100"
        style={{ maxHeight: "250px", objectFit: "cover" }}
      />
      <CarouselCaption captionText={item.caption} captionHeader="" />
    </CarouselItem>
  ));

  const handleSearch = async () => {
    const params = new URLSearchParams();

    if (searchQuery.trim()) params.append("query", searchQuery.trim());

    Object.entries(filters).forEach(([key, value]) => {
      if (value.trim()) params.append(key, value.trim());
    });

    try {
      const response = await axios.get(`${baseUrl}?${params.toString()}`);
      if (response.data.length === 0) {
        alert("No results found. Try another search term.");
      }

      localStorage.setItem("searchResults", JSON.stringify(response.data));
      navigate("/searchresults", { state: { searchResults: response.data } });
    } catch (error) {
      console.error("Error fetching data:", error);
      alert("An error occurred while searching. Please try again.");
    }
  };

  const handleInputChange = async (e) => {
    const value = e.target.value;
    setSearchQuery(value);

    if (value.trim().length > 1) {
      try {
        // ✅ Toggle between environments
        // const suggestionUrl = `http://localhost:8080/api/companies/suggestions?query=${value}`;
        const suggestionUrl = `https://horseracesbackend-production.up.railway.app/api/companies/suggestions?query=${value}`;

        const response = await axios.get(suggestionUrl);
        setSuggestions(response.data.slice(0, 5));
      } catch (err) {
        console.error("Suggestion fetch error:", err);
        setSuggestions([]);
      }
    } else {
      setSuggestions([]);
    }
  };

  return (
    <>
      {/* 🔁 Carousel for Advertisement */}
      <Carousel activeIndex={activeIndex} next={next} previous={previous} className="mb-2">
        <CarouselIndicators items={items} activeIndex={activeIndex} onClickHandler={goToIndex} />
        {slides}
        <CarouselControl direction="prev" directionText="Previous" onClickHandler={previous} />
        <CarouselControl direction="next" directionText="Next" onClickHandler={next} />
      </Carousel>

      <Container className="d-flex flex-column justify-content-center align-items-center mt-2">
        <Row className="w-100 justify-content-center">
          <Col md="10" lg="8">
            <Card className="shadow p-4 text-center">
              <CardBody>
                <CardTitle tag="h2" className="mb-4">
                  Find contacts for the Thoroughbred Racing & Breeding Industry
                </CardTitle>

                {/* 🔍 Basic Search with Suggestions */}
                <div style={{ position: "relative", width: "100%" }}>
                  <Input
                    type="text"
                    placeholder="Search Directory..."
                    value={searchQuery}
                    onChange={handleInputChange}
                    className="form-control me-2"
                    style={{ fontSize: "1rem", padding: "10px" }}
                  />
                  {suggestions.length > 0 && (
                    <ul
                      className="list-group position-absolute w-100"
                      style={{ zIndex: 1000 }}
                    >
                      {suggestions.map((sug, idx) => (
                        <li
                          key={idx}
                          className="list-group-item list-group-item-action"
                          style={{ cursor: "pointer" }}
                          onClick={() => {
                            setSearchQuery(sug);
                            setSuggestions([]);
                          }}
                        >
                          {sug}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                <Button
                  color="primary"
                  onClick={handleSearch}
                  className="mt-3"
                  style={{ fontSize: "1rem", padding: "10px 16px" }}
                >
                  Search
                </Button>

                {/* 🔽 Toggle Advanced Search */}
                <Button
                  color="link"
                  className="mt-3"
                  onClick={() => setShowAdvanced(!showAdvanced)}
                >
                  {showAdvanced ? "Hide Advanced Search ▲" : "Show Advanced Search ▼"}
                </Button>

                {/* 🔍 Advanced Search Form */}
                <Collapse isOpen={showAdvanced} className="text-start mt-3">
                  <Row className="g-2">
                    {[
                      { label: "First Name", key: "firstName" },
                      { label: "Last Name", key: "lastName" },
                      { label: "Company", key: "company" },
                      { label: "Category", key: "category" },
                      { label: "Country", key: "country" },
                      { label: "Listing Category", key: "listingCategory" },
                      { label: "Region", key: "region" },
                      { label: "Services Offered", key: "servicesOffered" }
                    ].map((field) => (
                      <Col md="6" key={field.key}>
                        <FormGroup className="mb-2">
                          <Label className="form-label fw-bold small">{field.label}</Label>
                          <Input
                            bsSize="sm"
                            type="text"
                            value={filters[field.key]}
                            onChange={(e) =>
                              setFilters({ ...filters, [field.key]: e.target.value })
                            }
                          />
                        </FormGroup>
                      </Col>
                    ))}
                    <Col xs="12" className="text-end">
                      <Button size="sm" color="success" onClick={handleSearch} className="mt-2">
                        Search with Filters
                      </Button>
                    </Col>
                  </Row>
                </Collapse>

                {/* 📢 Advertise With Us */}
                <div className="text-center mt-4">
                  <Button color="warning" outline size="sm" onClick={() => navigate("/advertise")}>
                    📢 Advertise With Us
                  </Button>
                </div>

                {/* 🏇 View Race Results */}
                <div className="text-center mt-3">
                  <Button color="info" outline size="sm" onClick={() => navigate("/results")}>
                    🏇 View Race Results
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
