import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Container, Table, Row, Col, Card, CardBody, CardTitle, Input, Label
} from "reactstrap";
import Header from "components/Headers/Header.js";

// Mapping country names to ISO codes for flags
const countryToCode = {
  "United Kingdom": "GB", "UK": "GB", "United States": "US", "USA": "US", "France": "FR", "Germany": "DE",
  "Australia": "AU", "Canada": "CA", "Netherlands": "NL", "Ireland": "IE",
  "New Zealand": "NZ", "Italy": "IT", "Spain": "ES", "Japan": "JP",
  "Sweden": "SE", "Norway": "NO", "Denmark": "DK", "Switzerland": "CH", "Belgium": "BE"
};

// Get flag URL based on country name
const getFlagUrl = (country) => {
  const code = countryToCode[country] || country;
  return `https://flagcdn.com/w40/${code.toLowerCase()}.png`;
};

const SearchResults = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchResults, setSearchResults] = useState(
    location.state?.searchResults || JSON.parse(localStorage.getItem("searchResults")) || []
  );

  const [selectedCountries, setSelectedCountries] = useState([]);

  useEffect(() => {
    if (location.state?.searchResults) {
      localStorage.setItem("searchResults", JSON.stringify(location.state.searchResults));
    }
  }, [location.state]);

  console.log("Final Search Results:", searchResults);

  const uniqueCountries = [...new Set(searchResults.map(item => item.country))];

  const handleCountryChange = (e) => {
    const country = e.target.value;
    setSelectedCountries(prev =>
      prev.includes(country) ? prev.filter(c => c !== country) : [...prev, country]
    );
  };

  const filteredResults = selectedCountries.length > 0
    ? searchResults.filter(item => selectedCountries.includes(item.country))
    : searchResults;

  return (
    <>
      <Header />
      <Container className="mt-5" fluid>
        <Row>
          {/* Left Sidebar - Filters */}
          <Col md="3">
            <Card className="shadow p-3">
              <CardBody>
                <CardTitle tag="h4" className="mb-3">Filters</CardTitle>
                <h5>Country</h5>
                {uniqueCountries.map((country) => (
                  <Label key={country} className="d-flex align-items-center">
                    <Input
                      type="checkbox"
                      value={country}
                      onChange={handleCountryChange}
                      checked={selectedCountries.includes(country)}
                    />
                    <img
                      src={getFlagUrl(country)}
                      alt={country}
                      style={{ width: "20px", height: "15px", marginRight: "5px" }}
                    />
                    {country}
                  </Label>
                ))}
              </CardBody>
            </Card>
          </Col>

          {/* Right Section - Table Display */}
          <Col md="9">
            <Card className="shadow p-4">
              <CardBody>
                <CardTitle tag="h2" className="mb-3 text-center">
                  Search Results
                </CardTitle>
                {filteredResults.length > 0 ? (
                  <Table responsive>
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Company</th>
                        <th>Category</th>
                        <th>Country</th>
                        <th>City</th>
                        <th>Contact</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredResults.map((company) => (
                        <tr key={company.id}>
                          <td>{company.first_name} {company.last_name}</td>
                          <td>{company.company_name}</td>
                          <td>{company.category}</td>
                          <td>
                            <img
                              src={getFlagUrl(company.country)}
                              alt={company.country}
                              style={{ width: "20px", height: "15px", marginRight: "5px" }}
                            />
                            {company.country}
                          </td>
                          <td>{company.city}</td>
                          <td>
                            <span
                              onClick={() => navigate("/contactdetails", { state: { company } })}
                              style={{ color: "blue", textDecoration: "underline", cursor: "pointer" }}
                            >
                              Contact
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                ) : (
                  <p className="text-center">No results found.</p>
                )}
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default SearchResults;
