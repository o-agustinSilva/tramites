//COMPONENTE PARA BUSCAR TRAMITES
import React, { useState, useEffect } from "react";
import { MDBInput, MDBBtn, MDBIcon, MDBInputGroup } from "mdb-react-ui-kit";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";

function FILTER_Tramites({ onSearch }) {
  const [inputValue, setInputValue] = useState("");

  const handleInput = (e) => {
    setInputValue(e.target.value);
  };

  const handleSearch = (inputValue) => {
    onSearch(inputValue);
  };

  const handleClear = () => {
    window.location.reload();
  };

  return (
    <div>
      <Row>
        <Col>
          <MDBInputGroup
            noBorder
            textBefore={
              <MDBIcon
                fas
                icon="search"
                onClick={() => handleSearch(inputValue)}
                style={{ cursor: "pointer", fontSize: '1.5rem' }} 
              />
            }
          >
            <MDBInput
              className="form-control"
              value={inputValue}
              onChange={handleInput}
              label="Buscar por tipo o solicitante"
              id="controlledValue"
              type="text"
            />

            {inputValue && (
              <MDBIcon
                fas
                icon="times-circle" 
                onClick={handleClear} 
                style={{ cursor: 'pointer', fontSize: '1.5rem', position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)'}} 
              />
            )}
          </MDBInputGroup>
        </Col>
      </Row>
    </div>
  );
}

export default FILTER_Tramites;
