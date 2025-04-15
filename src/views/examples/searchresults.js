import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Container, Table, Row, Col, Card, CardBody, CardTitle, Input, Label
} from "reactstrap";

// Flag mapping for countries
const countryToCode = {
  "United Kingdom": "GB", "UK": "GB", "United States": "US", "USA": "US", "France": "FR", "Germany": "DE",
  "Australia": "AU", "Canada": "CA", "Netherlands": "NL", "Ireland": "IE",
  "New Zealand": "NZ", "Italy": "IT", "Spain": "ES", "Japan": "JP",
  "Sweden": "SE", "Norway": "NO", "Denmark": "DK", "Switzerland": "CH", "Belgium": "BE"
};

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
  const [selectedListings, setSelectedListings] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);

  useEffect(() => {
    if (location.state?.searchResults) {
      localStorage.setItem("searchResults", JSON.stringify(location.state.searchResults));
    }
  }, [location.state]);

  const uniqueCountries = [...new Set(searchResults.map(item => item.country))];
  const uniqueListings = [...new Set(searchResults.map(item => item.listing_category))];
  const uniqueCategories = [...new Set(searchResults.map(item => item.category))];

  const toggleSelection = (value, selected, setSelected) => {
    setSelected(prev =>
      prev.includes(value) ? prev.filter(v => v !== value) : [...prev, value]
    );
  };

  const handleCountryChange = (e) => {
    toggleSelection(e.target.value, selectedCountries, setSelectedCountries);
  };

  const handleListingChange = (e) => {
    toggleSelection(e.target.value, selectedListings, setSelectedListings);
  };

  const handleCategoryChange = (e) => {
    toggleSelection(e.target.value, selectedCategories, setSelectedCategories);
  };

  const filteredResults = searchResults.filter(item =>
    (selectedCountries.length === 0 || selectedCountries.includes(item.country)) &&
    (selectedListings.length === 0 || selectedListings.includes(item.listing_category)) &&
    (selectedCategories.length === 0 || selectedCategories.includes(item.category))
  );

  return (
    <Container className="mt-5" fluid>
      <Row>
        {/* Sidebar Filters */}
        <Col md="3">
          <Card className="shadow p-3">
            <CardBody>
              <CardTitle tag="h4" className="mb-3">Filters</CardTitle>

              {/* Country Filter */}
              <h5 style={{ fontSize: "1rem" }}>Country</h5>
              {uniqueCountries.map((country) => (
                <Label key={country} className="d-flex align-items-center mb-1" style={{ fontSize: "0.85rem" }}>
                  <Input
                    type="checkbox"
                    value={country}
                    onChange={handleCountryChange}
                    checked={selectedCountries.includes(country)}
                    style={{ width: "14px", height: "14px", marginRight: "6px" }}
                  />
                  <img
                    src={getFlagUrl(country)}
                    alt={country}
                    style={{ width: "18px", height: "12px", marginRight: "5px" }}
                  />
                  {country}
                </Label>
              ))}

              {/* Listing Category Filter */}
              <h5 className="mt-4" style={{ fontSize: "1rem" }}>Listing Category</h5>
              {uniqueListings.map((listing) => (
                <Label key={listing} className="d-flex align-items-center mb-1" style={{ fontSize: "0.85rem" }}>
                  <Input
                    type="checkbox"
                    value={listing}
                    onChange={handleListingChange}
                    checked={selectedListings.includes(listing)}
                    style={{ width: "14px", height: "14px", marginRight: "6px" }}
                  />
                  {listing || "N/A"}
                </Label>
              ))}

              {/* Category Filter */}
              <h5 className="mt-4" style={{ fontSize: "1rem" }}>Category</h5>
              {uniqueCategories.map((category) => (
                <Label key={category} className="d-flex align-items-center mb-1" style={{ fontSize: "0.85rem" }}>
                  <Input
                    type="checkbox"
                    value={category}
                    onChange={handleCategoryChange}
                    checked={selectedCategories.includes(category)}
                    style={{ width: "14px", height: "14px", marginRight: "6px" }}
                  />
                  {category || "N/A"}
                </Label>
              ))}
            </CardBody>
          </Card>
        </Col>

        {/* Main Table Section */}
        <Col md="9">
          <Card className="shadow p-4">
            <CardBody>
              <CardTitle tag="h2" className="mb-3 text-center">Search Results</CardTitle>
              {filteredResults.length > 0 ? (
                <Table responsive>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Company</th>
                      <th>Category</th>
                      <th>Listing</th>
                      <th>Region</th>
                      <th>Country</th>
                      <th>City</th>
                      <th>Services</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredResults.map((company) => (
                      <tr key={company.id}>
                        <td>{company.first_name} {company.last_name}</td>
                        <td>
                          <span
                            onClick={() => navigate("/contactdetails", { state: { company } })}
                            style={{ color: "blue", textDecoration: "underline", cursor: "pointer" }}
                          >
                            {company.company_name}
                          </span>
                        </td>
                        <td>{company.category}</td>
                        <td>{company.listing_category || "-"}</td>
                        <td>{company.region || "-"}</td>
                        <td>
                          <img
                            src={getFlagUrl(company.country)}
                            alt={company.country}
                            style={{ width: "20px", height: "15px", marginRight: "5px" }}
                          />
                          {company.country}
                        </td>
                        <td>{company.city}</td>
                        <td style={{ maxWidth: "180px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                          {company.services_offered}
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
  );
};

export default SearchResults;
