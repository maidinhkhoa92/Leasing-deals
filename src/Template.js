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
  { value: "Automatic", label: "Automatic" }
];
const monthly_rental = [
  { value: null, label: "No max" },
  { value: 100, label: "£100" },
  { value: 150, label: "£150" },
  { value: 200, label: "£200" },
  { value: 250, label: "£250" },
  { value: 300, label: "£300" },
  { value: 350, label: "£350" },
  { value: 400, label: "£400" },
  { value: 450, label: "£450" },
  { value: 500, label: "£500" },
  { value: 550, label: "£550" },
  { value: 600, label: "£600" },
  { value: 650, label: "£650" },
  { value: 700, label: "£700" },
  { value: 750, label: "£750" },
  { value: 800, label: "£800" },
  { value: 850, label: "£850" },
  { value: 900, label: "£900" },
  { value: 950, label: "£950" },
  { value: 1000, label: "£1000" }
];

const getValue = (opts, val) => {
  return _.filter(opts, o => _.includes(val, o.value));
}

export default ({ list, filter, setFilter, setFilterMonthly }) => {
  return (
    <Container>
      <Row className="mb-4">
        <Col>
          <h3>Fuel</h3>
          <Select 
            isMulti 
            options={engine_type} 
            value={getValue(engine_type, filter.engine_type)} 
            onChange={e => setFilter('engine_type', e)}
          />
        </Col>
        <Col>
          <h3>Drive</h3>
          <Select 
            isMulti 
            options={transmission} 
            value={getValue(transmission, filter.transmission)} 
            onChange={e => setFilter('transmission', e)}
          />
        </Col>
        <Col>
          <h3>
            Budget <small>Monthly</small>
          </h3>
          <Row>
            <Col>
              <Select
                options={monthly_rental} 
                value={filter.monthly_rental.from} 
                onChange={e => setFilterMonthly('from', e)}
              />
            </Col>
            <Col>
              <Select 
                options={monthly_rental} 
                value={filter.monthly_rental.to} 
                onChange={e => setFilterMonthly('to', e)}
              />
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
