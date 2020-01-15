import React from "react";
import _ from "lodash";
import { Table, Image, Container, Row, Col } from "react-bootstrap";
import Select from "react-select";
const engine_type = [
  { value: "Diesel", label: "Diesel" },
  { value: "Electric", label: "Electric" },
  { value: "Hybrid", label: "Hybrid" },
  { value: "Hydrogen", label: "Hydrogen" },
  { value: "Petrol", label: "Petrol" }
];
const transmission = [
  { value: "Manual", label: "Manual" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" }
];
const monthly_rental = [
  { value: null, label: "No max" },
  { value: 100, label: "£100" },
  { value: 100, label: "£150" },
  { value: 100, label: "£200" },
  { value: 100, label: "£250" },
  { value: 100, label: "£300" },
  { value: 100, label: "£350" },
  { value: 100, label: "£400" },
  { value: 100, label: "£450" },
  { value: 100, label: "£500" },
  { value: 100, label: "£550" },
  { value: 100, label: "£600" },
  { value: 100, label: "£650" },
  { value: 100, label: "£700" },
  { value: 100, label: "£750" },
  { value: 100, label: "£800" },
  { value: 100, label: "£850" },
  { value: 100, label: "£900" },
  { value: 100, label: "£950" },
  { value: 100, label: "£1000" }
];

export default ({ list }) => {
  return (
    <Container>
      <Row className="mb-4">
        <Col>
          <h3>Fuel</h3>
          <Select isMulti options={engine_type} />
        </Col>
        <Col>
          <h3>Drive</h3>
          <Select isMulti options={transmission} />
        </Col>
        <Col>
          <h3>
            Budget <small>Monthly</small>
          </h3>
          <Row>
            <Col>
              <Select isMulti options={monthly_rental} />
            </Col>
            <Col>
              <Select isMulti options={monthly_rental} />
            </Col>
          </Row>
        </Col>
      </Row>
      <Row>
        <Col>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Contract type</th>
                <th>Monthly rental</th>
                <th>Engine type</th>
                <th>Engine size</th>
                <th>Transmission</th>
              </tr>
            </thead>
            <tbody>
              {_.map(list, (item, key) => (
                <tr key={key}>
                  <td>
                    <Image src={item.image_url} thumbnail />
                  </td>
                  <td>{item.contract_type}</td>
                  <td>{item.monthly_rental}</td>
                  <td>{item.engine_type}</td>
                  <td>{item.engine_size}</td>
                  <td>{item.transmission}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
};
