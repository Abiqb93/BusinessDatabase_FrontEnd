import React, { useState, useEffect } from "react";
import { Card, CardBody, Container, Row, Col, Input, Button, Table } from "reactstrap";
import { FormGroup, Label } from "reactstrap";
import Header from "components/Headers/Header.js";


import { ResponsiveRadar } from "@nivo/radar";

import _ from "lodash";

const JockeyProfile = ({ setSearchQuery, setCurrentPage }) => {
  // Debounced function for search input
  const debouncedSearch = _.debounce((query) => {
    setSearchQuery(query);
    setCurrentPage(1); // Reset to page 1 on search
  }, 300);

  return (
    <div className="mb-3">
      <Input
        type="text"
        placeholder="Search Jockey..."
        className="form-control"
        onChange={(e) => debouncedSearch(e.target.value)}
      />
    </div>
  );
};


const ROWS_PER_PAGE = 3;

const fieldLimits = {
  WTR: { min: 0, max: 100 },
  SWTR: { min: 0, max: 100 },
  GWTR: { min: 0, max: 100 },
  G1WTR: { min: 0, max: 100 },
  WIV: { min: 0, max: 110.77 },
  WOE: { min: -186.57, max: 1203.3 },
  WAX: { min: -173.19, max: 784.34 },
  RB2: { min: 0, max: 240000 },
};

/**
 * Converts string values containing '%' to numeric values.
 * Ensures valid numeric conversion for any input.
 */
const sanitizeData = (key, value) => {
  if (typeof value === "string" && value.includes("%")) {
    return parseFloat(value.replace("%", "")); // Convert percentage string to float
  }
  return !isNaN(value) && value !== null && value !== undefined ? parseFloat(value) : 0;
};

/**
 * Normalizes values between 0 and 1 using a logarithmic transformation
 * Handles cases where min and max are equal to avoid division by zero.
 */
const normalize = (value, field) => {
  const fieldLimit = fieldLimits[field];

  if (!fieldLimit) {
    if (process.env.NODE_ENV !== "production") {
      console.warn(`Field "${field}" does not have defined limits.`);
    }
    return 0.5; // Default to mid-range normalization
  }

  let { min, max } = fieldLimit;
  const epsilon = 1e-5; // Small value to prevent log(0)

  // Adjust WOE and WAX values to prevent negative transformations
  if (field === "WOE" || field === "WAX") {
    const adjustment = Math.abs(min);
    value += adjustment;
    min += adjustment;
    max += adjustment;
  }

  value = value === 0 ? epsilon : value; // Avoid log(0)

  const transformedValue = Math.log1p(Math.abs(value)) * Math.sign(value);
  const transformedMin = Math.log1p(Math.abs(min)) * Math.sign(min);
  const transformedMax = Math.log1p(Math.abs(max)) * Math.sign(max);

  if (transformedMax === transformedMin) {
    if (process.env.NODE_ENV !== "production") {
      console.error(`Invalid range for field "${field}".`);
    }
    return 0.5;
  }

  return (transformedValue - transformedMin) / (transformedMax - transformedMin);
};



const D3RadarChart = ({ entry1Data, entry2Data }) => {
  if (!entry1Data) return null; // Ensure there's data before rendering

  const fields = Object.keys(fieldLimits);
  const chartData = fields.map((field) => ({
    field,
    [entry1Data?.Sire || "Entry 1"]: normalize(
      sanitizeData(field, field === "RB2" ? entry1Data?.Percent_RB2 : entry1Data?.[field] || 0),
      field
    ),
    ...(entry2Data
      ? {
          [entry2Data?.Sire || "Entry 2"]: normalize(
            sanitizeData(field, field === "RB2" ? entry2Data?.Percent_RB2 : entry2Data?.[field] || 0),
            field
          ),
        }
      : {}),
  }));

  return (
    <Card className="shadow border-0">
      <CardBody>
        <h4 className="text-center mb-3">Jockey Performance Comparison</h4>
        <div className="d-flex justify-content-center">
          <div style={{ width: "100%", height: "400px" }}>
            <ResponsiveRadar
              data={chartData}
              keys={[entry1Data?.Sire || "Entry 1", ...(entry2Data ? [entry2Data?.Sire || "Entry 2"] : [])]}
              indexBy="field"
              maxValue={1}
              margin={{ top: 60, right: 80, bottom: 40, left: 80 }}
              colors={{ scheme: "category10" }}
              borderWidth={2}
              dotSize={8}
              legends={
                entry2Data
                  ? [
                      {
                        anchor: "top-left",
                        direction: "column",
                        translateX: -40,
                        itemWidth: 100,
                        itemHeight: 20,
                        itemTextColor: "#333",
                        symbolSize: 12,
                        symbolShape: "circle",
                      },
                    ]
                  : []
              }
            />
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

const ReportTable = ({ tableData, title, currentPage, setCurrentPage, totalPages, onSelectRow }) => {
  const startPage = Math.max(1, currentPage - 4);
  const endPage = Math.min(startPage + 5, totalPages);

  return (
    <Card className="shadow border-0">
      <CardBody>
        <h4 className="text-center mb-3">{title || "Jockey Report Table"}</h4>
        <Table responsive className="align-items-center">
          <thead>
            <tr>
              {[
                "Jockey", "Runners", "Runs", "Winners", "Wins", "WinPercent_", 
                "Stakes_Winners", "Stakes_Wins", "Group_Winners", "Group_Wins", "Percent_RB2"
              ].map((el) => (
                <th key={el} className="text-center">{el}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tableData.map((item, index) => (
              <tr key={index} onClick={() => onSelectRow(item)} className="cursor-pointer bg-white hover:bg-gray-100">
                {[
                  "Sire", "Runners", "Runs", "Winners", "Wins", "WinPercent_", 
                  "Stakes_Winners", "Stakes_Wins", "Group_Winners", "Group_Wins", "Percent_RB2"
                ].map((key, i) => (
                  <td key={i} className="text-center">{item[key] ?? "-"}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </Table>

        {/* Pagination Controls */}
        <div className="d-flex justify-content-center mt-3">
          <Button 
            className="btn-sm mx-1" 
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))} 
            disabled={currentPage === 1}
          >
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
          <Button 
            className="btn-sm mx-1" 
            onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))} 
            disabled={currentPage === totalPages}
          >
            Next
          </Button>
        </div>
      </CardBody>
    </Card>
  );
};

const ComparisonTable = ({ entry1, entry2 }) => {
  if (!entry1) return null; // Prevent rendering if no Jockey is selected

  return (
    <Card className="shadow border-0">
      <CardBody>
        <h4 className="text-center mb-3">Comparison Table</h4>
        <Table bordered responsive>
          <thead>
            <tr>
              <th className="text-center">Field</th>
              <th className="text-center">{entry1?.Sire || "Entry 1"}</th>
              <th className="text-center">{entry2 ? entry2.Sire : "Entry 2 (Select a Jockey)"}</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(fieldLimits).map((field, index) => (
              <tr key={field} className={index % 2 === 0 ? "table-light" : ""}>
                <td className="text-center">{field}</td>
                <td className="text-center">
                  {sanitizeData(field, field === "RB2" ? entry1?.Percent_RB2 : entry1?.[field])}
                </td>
                <td className="text-center">
                  {entry2 ? sanitizeData(field, field === "RB2" ? entry2?.Percent_RB2 : entry2?.[field]) : "-"}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </CardBody>
    </Card>
  );
};


const JockeyRadar = () => {
  const [tableData, setTableData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedEntry1, setSelectedEntry1] = useState(null);
  const [selectedEntry2, setSelectedEntry2] = useState(null);
  const [currentSelection, setCurrentSelection] = useState("entry1");

  const fetchFilteredData = async () => {
    try {
      const params = new URLSearchParams({
        page: currentPage,
        limit: ROWS_PER_PAGE,
        sire: searchQuery || "",
      });
      const response = await fetch(`http://localhost:8080/api/jockey_name_profile?${params.toString()}`);
      const data = await response.json();
      setTableData(data.data);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error("Error fetching filtered data:", error);
    }
  };

  const handleSelectRow = (row) => {
    if (currentSelection === "entry1") {
      setSelectedEntry1(row);
    } else {
      setSelectedEntry2(row);
    }
  };

  useEffect(() => {
    fetchFilteredData();
  }, [currentPage, searchQuery]);

  return (
    <>
      <Header />
      <Container className="mt-7" fluid>
        <Row>
          <Col>
            <Card className="shadow border-0 p-4">
              <CardBody>
                <h3 className="text-center mb-4">Jockey Profile Search</h3>

                {/* Select Dropdown */}
                <FormGroup>
                  <Label for="sire-selector">Select Entry:</Label>
                  <Input
                    type="select"
                    id="sire-selector"
                    value={currentSelection}
                    onChange={(e) => setCurrentSelection(e.target.value)}
                  >
                    <option value="entry1">Jockey 1</option>
                    <option value="entry2">Jockey 2</option>
                  </Input>
                </FormGroup>

                {/* Search Box */}
                <JockeyProfile setSearchQuery={setSearchQuery} setCurrentPage={setCurrentPage} />

                {/* Report Table */}
                <ReportTable
                  tableData={tableData}
                  title="Search and Click"
                  currentPage={currentPage}
                  setCurrentPage={setCurrentPage}
                  totalPages={totalPages}
                  onSelectRow={handleSelectRow}
                />

                {/* Display Radar Chart & Comparison Table when a Jockey is selected */}
                {selectedEntry1 && (
                  <Row className="mt-4">
                    <Col md={6}>
                      <D3RadarChart entry1Data={selectedEntry1} entry2Data={selectedEntry2} />
                    </Col>
                    <Col md={6}>
                      <ComparisonTable entry1={selectedEntry1} entry2={selectedEntry2} />
                    </Col>
                  </Row>
                )}
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default JockeyRadar;
