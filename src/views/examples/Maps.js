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
      placeholder="Search Sire..."
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
              {["Sire", "Country", "Runners", "Runs", "Winners", "Wins", "WinPercent_", "Stakes_Winners", "Stakes_Wins", "Group_Winners", "Group_Wins", "Group_1_Winners", "Group_1_Wins", "WTR", "SWTR", "GWTR", "G1WTR", "WIV", "WOE", "WAX", "Percent_RB2"].map(
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

const Maps = () => {
  const [tableData, setTableData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchFilteredData = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/sire_profile?page=${currentPage}&limit=${ROWS_PER_PAGE}&sire=${searchQuery}`
      );
      const data = await response.json();
      setTableData(data.data);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error("Error fetching data:", error);
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
              <h3>Sire Profile Search</h3>
              <HorseProfile setSearchQuery={setSearchQuery} setCurrentPage={setCurrentPage} />
              <ReportTable
                tableData={tableData}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                totalPages={totalPages}
              />
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Maps;