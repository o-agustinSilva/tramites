import Container from "react-bootstrap/esm/Container";
import React, { useState, useEffect } from "react";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import { MDBTable, MDBTableHead, MDBTableBody } from "mdb-react-ui-kit";
import { MDBBtn, MDBIcon, MDBInput } from "mdb-react-ui-kit";
import FILTER_Tramites from "./FILTER_Tramites";   //BUSCADOR DE TRAMITES

function NOTIFICATION_General({ tramites, onAddTramite }) {
 const [filter, setFilter] = useState('');
 const [filterTramite, setFilterTramite]= useState(tramites);
 
  useEffect(()=>{
    setFilterTramite(tramites)
  }, [tramites]);
 
  useEffect(()=>{
    if(filter){
     console.log(filter);
     const lowercasedFilter= filter.toLowerCase(); 
     const filterData= tramites.filter(item =>
      item.tramite.name.toLowerCase().includes(lowercasedFilter) ||
      item.solicitante.firstname.toLowerCase().includes(lowercasedFilter)
    );
    setFilterTramite(filterData || []);
  }else{
    setFilterTramite(tramites || []);
  }
  }, [filter,tramites]);

  const handleSearch = (searchValue) => {
    setFilter(searchValue);
  };

  return (
    <Container fluid className="my-5 ml-5">
    
      <FILTER_Tramites onSearch={handleSearch}/>  {/* LLAMA AL COMPONENTE PARA BUSCAR TRAMITES */ }
    
      <MDBTable hover responsive>
        <MDBTableHead>
          <tr>
            <th scope="col">Numero</th>
            <th scope="col">Tipo</th>
            <th scope="col">Solicitante</th>
            <th scope="col">Fecha de ingreso</th>
            <th scope="col"></th>
          </tr>
        </MDBTableHead>
        <MDBTableBody>
          {filterTramite.map((tramite) => (
            <React.Fragment key={tramite.id}>
              <tr>
                <th scope="row">{tramite.id}</th>
                <td>{tramite.tramite.name}</td>
                <td>{tramite.solicitante.firstname}</td>
                <td>{tramite.request_date}</td>
                <td>
                  <MDBBtn
                    className="me-1"
                    color="success"
                    onClick={() => onAddTramite(tramite.id)}
                  >
                    <MDBIcon
                      fas
                      icon="plus-circle"
                      size="1.5x"
                      className="mx-2"
                    />
                    Reclamar caso
                  </MDBBtn>
                </td>
              </tr>
            </React.Fragment>
          ))}
        </MDBTableBody>
      </MDBTable>
    </Container>
  );
}

export default NOTIFICATION_General;
