import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/esm/Container";
import { MDBTable, MDBTableHead, MDBTableBody } from "mdb-react-ui-kit";
import { MDBBtn, MDBIcon } from "mdb-react-ui-kit";
import TASK_Details from "./TASK_Details";
import ComprobantePago from "../pdf/ComprobantePago";
import FILTER_Tramites from "./FILTER_Tramites";
import axios from "axios";

function TASKS_Finalizados({ tramites }) {
  const [showDetails, setShowDetails] = useState(true);
  const [showPdfViewer, setShowPdfViewer] = useState(false);
  const [caseId, setCaseId] = useState(null);
  const [comprobanteData, setComprobanteData] = useState({
    id: '',
    case_id: '',
    transaction_Id: '',
    transaction_Amount: '',
    currency_Id: '',
    status: '',
    status_Detail: '',
    date_Approved: '',
    paymentMethod_Id: '',
    cardholder_Name: '',
    last_Four_Digits: '',
    payer_Email: '',
    description: ''
  });

  //ESTADOS PARA EL COMPONENTE BUSCAR
  const [filter, setFilter] = useState("");
  const [filterTramite, setFilterTramite] = useState(tramites);

  // Permite mostrar comprobante
  const handleDetails = (id) => {
    setCaseId(id);
    setShowDetails(!showDetails);
  };

  const handleBack = () => {
    setShowDetails(true);
  };

  const handleComprobante = (id) => {
    const fetchTransactionData = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/get-payment/${id}/`);
        const data = response.data;
        setComprobanteData(data);
      } catch (error) {
        console.error('Error al obtener el número de transacción:', error);
      }
    };
    fetchTransactionData();
    setCaseId(id);
    setShowPdfViewer(true);
  };

  // COMPONENTES PARA BUSCAR Y MOSTRAR LOS TRAMITES
  useEffect(()=>{
    setFilterTramite(tramites)
  }, [tramites]);
 
  useEffect(()=>{
    if(filter){
     const lowercasedFilter= filter.toLowerCase(); 
     const filterData= tramites.filter(item =>
      item.tramite.name.toLowerCase().includes(lowercasedFilter) ||
      item.solicitante.firstname.toLowerCase().includes(lowercasedFilter)
    );
    setFilterTramite(filterData || []);
  }else{
    setFilterTramite(tramites || []);
  }
  }, [filter,tramites])

  const handleSearch = (searchValue) => {
    setFilter(searchValue);
  };


  return (
    <Container fluid className="p-3">
        {/* LLAMA AL COMPONENTE PARA BUSCAR TRAMITES */ }
      {showPdfViewer ? (
        <>
          {/** ESTE PARTE ES PARA MOSTRAR EL PDF DEL COMPROBANTE */}
          <ComprobantePago comprobanteData={comprobanteData} />
          <MDBBtn color="info" onClick={() => setShowPdfViewer(false)}>
            Cerrar PDF
          </MDBBtn>
        </>
      ) : showDetails ? (
        <MDBTable hover responsive>
          <MDBTableHead>
            <tr>
              <th scope="col">Numero</th>
              <th scope="col">Tipo</th>
              <th scope="col">Solicitante</th>
              <th scope="col">Fecha de ingreso</th>
              <th scope="col" colSpan="2">
                <FILTER_Tramites onSearch={handleSearch} />
              </th>
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
                  <td></td>
                  <th scope="col">
                    <MDBBtn color="info" onClick={() => handleComprobante(tramite.id)}>
                      <MDBIcon far icon="eye" size="1.5x" className="me-2" />
                      Ver Comprobante
                    </MDBBtn>
                  </th>
                </tr>
              </React.Fragment>
            ))}
          </MDBTableBody>
        </MDBTable>
      ) : (
        <TASK_Details id={caseId} onBack={handleBack} />
      )}
    </Container>
  );
}
export default TASKS_Finalizados;
