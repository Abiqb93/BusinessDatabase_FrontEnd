import React, { useEffect, useState } from "react";
import { Container, Card, CardBody, CardTitle, Table, Row, Col } from "reactstrap";
import Header from "components/Headers/Header.js";

const Results = () => {
  const [races, setRaces] = useState([]);

  useEffect(() => {
    // This data simulates the parsed RTF content manually for now
    const parsedRaces = [
      {
        time: "17:00 (GMT)",
        location: "NEWCASTLE",
        title: "FREE BETS WITH BETUK BET CLUB HANDICAP (6), 6F Standard",
        results: [
          {
            position: 1,
            horse: "ASADJUMEIRAH, 7g",
            breeding: "ADAAY (IRE)- PLACE IN MY HEART (COMPTON PLACE)",
            ownerTrainer: "Made Profiles Ltd & Partner, T: Antony Brittain",
            prize: "£3,140.00"
          },
          {
            position: 2,
            horse: "CONQUEST OF POWER, 5g",
            breeding: "CITYSCAPE- BIRCH COVE (FR) (SHAMARDAL (USA))",
            ownerTrainer: "Miss Jacintha Hynes, T: Mark Usher",
            prize: "£1,474.00"
          },
          {
            position: 3,
            horse: "SPARTAN FIGHTER, 8g",
            breeding: "DUTCH ART- SURVIVED (KYLLACHY)",
            ownerTrainer: "John and Tony Jarvis and Partner, T: Antony Brittain",
            prize: "£736.00"
          }
        ],
        additionalInfo: "Time: 74.18. Distances: 6.0.",
        alsoRan: "SYDNEY BAY (GBR), TIME PATROL (GBR), MADAME FENELLA (GBR), KORROOR (IRE), SHATIN VENTURE (IRE), SO GRATEFUL (GBR)"
      },
      {
        time: "14:40 (GMT)",
        location: "MARKET RASEN",
        title: "trustatrader.com HANDICAP HURDLE (5), 2M 125Y Good to Soft (Soft in places)",
        results: [
          {
            position: 1,
            horse: "LADY BABS, 11f",
            breeding: "MALINAS (GER)- JONTYS'LASS (TAMURE (IRE))",
            ownerTrainer: "Ashgill Stud, T: Andrew Crook",
            prize: "£4,489.00"
          },
          {
            position: 2,
            horse: "MORANDI SECOND (FR), 6g",
            breeding: "MORANDI (FR)- HOLD THE THOUGHT (GALILEO (IRE))",
            ownerTrainer: "Hold My Beer, B Hague & Partners, T: Patrick Neville",
            prize: "£2,066.00"
          },
          {
            position: 3,
            horse: "TIGERS MOON, 5g",
            breeding: "PETHER'S MOON (IRE)- DUCHESS THEATRE (IRE) (KING'S THEATRE (IRE))",
            ownerTrainer: "G & T Racing Club, T: Tom Ellis",
            prize: "£1,033.00"
          }
        ],
        additionalInfo: "Time: 252.5. Distances: 16.57.",
        alsoRan: "ADAAY FOREVER (GBR), TREASURED COMPANY (IRE), ROCK ON TOMMY (GBR), CAWTHORNE BANKER (IRE), LOOKFORARAINBOW (GBR), JE VIENS DU LARGE (FR), VOIX DE BOCELLI (GBR)"
      }
      // You can keep adding more races parsed manually or later via backend
    ];

    setRaces(parsedRaces);
  }, []);

  return (
    <>
      {/* <Header /> */}
      <Container className="mt-5">
        <Card className="shadow p-4">
          <CardBody>
            <CardTitle tag="h2" className="text-center mb-4">
              Race Results
            </CardTitle>

            {races.map((race, index) => (
              <div key={index} className="mb-5">
                <h4>{race.time} {race.location}</h4>
                <p className="mb-1"><strong>Race:</strong> {race.title}</p>
                <Table bordered responsive className="mt-3">
                  <thead>
                    <tr>
                      <th>Pos</th>
                      <th>Horse</th>
                      <th>Breeding</th>
                      <th>Owner/Trainer</th>
                      <th>Prize</th>
                    </tr>
                  </thead>
                  <tbody>
                    {race.results.map((entry, i) => (
                      <tr key={i}>
                        <td>{entry.position}</td>
                        <td>{entry.horse}</td>
                        <td>{entry.breeding}</td>
                        <td>{entry.ownerTrainer}</td>
                        <td>{entry.prize}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
                <p><strong>{race.additionalInfo}</strong></p>
                <p><strong>Also ran:</strong> {race.alsoRan}</p>
              </div>
            ))}
          </CardBody>
        </Card>
      </Container>
    </>
  );
};

export default Results;
