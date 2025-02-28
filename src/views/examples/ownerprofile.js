import React, { useState, useEffect } from "react";
import {
  Card,
  CardBody,
  Container,
  Row,
  Col,
  Input,
  Button,
  Table,
} from "reactstrap";
import _ from "lodash";
import Header from "components/Headers/Header.js";

const countryFlagURL = (countryCode) => {
  const correctedCode = countryCode === "UK" ? "GB" : countryCode;
  return `https://flagcdn.com/w40/${correctedCode.toLowerCase()}.png`;
};

const HorseProfile = ({ setSearchQuery, setCurrentPage }) => {
  const debouncedSearch = _.debounce((query) => {
    setSearchQuery(query);
    setCurrentPage(1); // Reset to page 1 on search
  }, 300);

  return (
    <Input
      type="text"
      placeholder="Search Owner..."
      className="form-control"
      onChange={(e) => debouncedSearch(e.target.value)}
    />
  );
};

const ROWS_PER_PAGE = 10;

const ReportTable = ({ tableData, currentPage, setCurrentPage, totalPages }) => {
  const startPage = Math.max(1, currentPage - 4);
  const endPage = Math.min(startPage + 9, totalPages);
  
  return (
    <Card className="shadow border-0">
      <CardBody>
        <Table responsive className="align-items-center">
          <thead>
            <tr>
              {["Owner", "Country", "Runners", "Runs", "Winners", "Wins", "WinPercent_", "Stakes_Winners", "Stakes_Wins", "Group_Winners", "Group_Wins", "Group_1_Winners", "Group_1_Wins", "WTR", "SWTR", "GWTR", "G1WTR", "WIV", "WOE", "WAX", "Percent_RB2"].map(
                (el) => (
                  <th key={el} className="text-center">{el}</th>
                )
              )}
            </tr>
          </thead>
          <tbody>
            {tableData.map((item, index) => (
              <tr key={index}>
                <td>{item.Sire}</td>
                <td className="text-center">
                  <img src={countryFlagURL(item.Country)} alt={item.Country} style={{ width: "15px", height: "10px", marginRight: "5px" }} />
                  {item.Country}
                </td>
                <td>{item.Runners}</td>
                <td>{item.Runs}</td>
                <td>{item.Winners}</td>
                <td>{item.Wins}</td>
                <td>{item["WinPercent_"]}%</td>
                <td>{item["Stakes_Winners"]}</td>
                <td>{item["Stakes_Wins"]}</td>
                <td>{item["Group_Winners"]}</td>
                <td>{item["Group_Wins"]}</td>
                <td>{item["Group_1_Winners"]}</td>
                <td>{item["Group_1_Wins"]}</td>
                <td>{item["WTR"]}</td>
                <td>{item["SWTR"]}</td>
                <td>{item["GWTR"]}</td>
                <td>{item["G1WTR"]}</td>
                <td>{item["WIV"]}</td>
                <td>{item["WOE"]}</td>
                <td>{item["WAX"]}</td>
                <td>{item["Percent_RB2"]}</td>
              </tr>
            ))}
          </tbody>
        </Table>
        <div className="d-flex justify-content-center mt-3">
          <Button className="btn-sm" onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>
            Previous
          </Button>
          {Array.from({ length: endPage - startPage + 1 }, (_, index) => (
            <Button
              key={index}
              onClick={() => setCurrentPage(startPage + index)}
              className={`btn-sm mx-1 ${currentPage === startPage + index ? "btn-primary" : "btn-secondary"}`}
            >
              {startPage + index}
            </Button>
          ))}
          <Button className="btn-sm" onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages}>
            Next
          </Button>
        </div>
      </CardBody>
    </Card>
  );
};


const OwnerProfile = () => {
  const [tableData, setTableData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedTable, setSelectedTable] = useState("owner_profile");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  const countryCodes = ["US", "UK", "AU", "NZ", "FR", "DE", "JP", "CA"];

  const filters = [
    { label: "Runners", id: "runners", min: 1, max: 1949 },
    { label: "Runs", id: "runs", min: 1, max: 29976 },
    { label: "Winners", id: "winners", min: 0, max: 1223 },
    { label: "Wins", id: "wins", min: 0, max: 3513 },
    { label: "Stakes Winners", id: "stakesWinners", min: 0, max: 239 },
    { label: "Group Winners", id: "groupWinners", min: 0, max: 166 },
    { label: "Group 1 Winners", id: "group1Winners", min: 0, max: 61 },
    { label: "WTR", id: "wtr", min: 0, max: 94.74 },
    { label: "SWTR", id: "swtr", min: 0, max: 9.84 },
    { label: "GWTR", id: "gwtr", min: 0, max: 9.80 },
    { label: "G1WTR", id: "g1wtr", min: 0, max: 9.38 },
    { label: "WIV", id: "wiv", min: 0, max: 110 },
    { label: "WOE", id: "woe", min: -186.57, max: 1203.3 },
    { label: "WAX", id: "wax", min: -173.19, max: 784.34 },
  ];

  const [filterValues, setFilterValues] = useState(filters.map((f) => f.max));

  const resetFilters = () => {
    setFilterValues(filters.map((f) => f.max));
    setSearchQuery("");
    setSelectedCountry("");
    fetchFilteredData();
  };

  const buildQueryParams = () => {
    const params = new URLSearchParams();
    params.append("page", currentPage);
    params.append("limit", ROWS_PER_PAGE);

    filters.forEach((filter, index) => {
      params.append(filter.id, filterValues[index]);
    });

    if (searchQuery) params.append("sire", searchQuery);
    if (selectedCountry) params.append("country", selectedCountry);

    return params.toString();
  };

  const fetchFilteredData = async () => {
    try {
      const queryParams = buildQueryParams();
      const response = await fetch(`http://localhost:8080/api/${selectedTable}?${queryParams}`);
      const data = await response.json();
      setTableData(data.data);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error("Error fetching filtered data:", error);
    }
  };

  useEffect(() => {
    fetchFilteredData();
  }, [currentPage, selectedTable, searchQuery, selectedCountry, JSON.stringify(filterValues)]);

  return (
    <>
      <Header />
      <Container className="mt-7" fluid>
        <Row>
          <Col>
            <Card className="shadow border-0 p-4">
              <div className="mt-12 mb-8 flex flex-col gap-8">
                {/* Time Period Selector */}
                <div className="flex items-center mb-3">
                  <label htmlFor="table-select" className="mr-2 font-bold">Time Period:</label>
                  <select
                    id="table-select"
                    value={selectedTable}
                    onChange={(e) => setSelectedTable(e.target.value)}
                    className="p-2 rounded-md border border-gray-300"
                  >
                    <option value="owner_profile">Overall</option>
                    <option value="owner_profile_three">Last 3 Years</option>
                    <option value="owner_profile_one">Last 1 Year</option>
                  </select>
                </div>

                {/* Filter Toggle */}
                <div className="cursor-pointer text-center border-t border-gray-300 py-2" onClick={() => setShowFilters(!showFilters)}>
                  <span>{showFilters ? "▲ Hide Filters" : "▼ Show Filters"}</span>
                </div>

                {/* Filters Section */}
                {showFilters && (
                  <Card className="p-4 border rounded-lg shadow bg-white w-full">
                    <h5 className="mb-4 font-bold text-lg text-gray-800">Filters</h5>

                    {/* Grid layout for two filters per row */}
                    <div className="grid grid-cols-2 gap-x-8 gap-y-4">
                      {filters.map((filter, index) => (
                        <div key={filter.id} className="flex flex-col">
                          {/* Label */}
                          <label htmlFor={filter.id} className="text-xs font-semibold text-gray-700 mb-1">
                            {filter.label}
                          </label>

                          {/* Slider and Value Display */}
                          <div className="flex items-center gap-2">
                            <input
                              type="range"
                              id={filter.id}
                              min={filter.min}
                              max={filter.max}
                              value={filterValues[index]}
                              onChange={(e) => {
                                const value = Number(e.target.value);
                                setFilterValues((prev) => {
                                  const updated = [...prev];
                                  updated[index] = value;
                                  return updated;
                                });
                              }}
                              className="w-full h-[1px] bg-gray-300 rounded-lg appearance-none"
                            />
                            <span className="text-xs font-medium text-gray-800 w-12 text-right">
                              {filterValues[index]}
                            </span>
                          </div>
                        </div>
                      ))}

                      {/* Country Filter - Compact Dropdown */}
                      <div className="flex flex-col">
                        <label htmlFor="country-select" className="text-xs font-semibold text-gray-700 mb-1">
                          Country
                        </label>
                        <select
                          id="country-select"
                          value={selectedCountry}
                          onChange={(e) => setSelectedCountry(e.target.value)}
                          className="p-1 text-xs rounded-md border border-gray-300 bg-white shadow-sm w-full"
                        >
                          <option value="">All</option>
                          {countryCodes.map((code) => (
                            <option key={code} value={code}>{code}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="mt-4 text-center">
                      <Button color="secondary" onClick={resetFilters} className="text-xs px-3 py-1">
                        Reset Filters
                      </Button>
                    </div>
                  </Card>
                )}


                {/* Search Box */}
                <HorseProfile setSearchQuery={setSearchQuery} />

                {/* Table */}
                <ReportTable
                  tableData={tableData}
                  title="Owner Report Table"
                  currentPage={currentPage}
                  setCurrentPage={setCurrentPage}
                  totalPages={totalPages}
                />
              </div>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};


export default OwnerProfile;