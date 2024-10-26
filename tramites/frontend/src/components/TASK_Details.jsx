import React, { useState, useEffect, useRef } from "react";
import ComprobantePago from "../pdf/ComprobantePago";
import TRAMITE_BuenaConducta from "../pdf/TRAMITE_BuenaConducta";
import TRAMITE_Extravio from "../pdf/TRAMITE_Extravio";
import TRAMITE_Domicilio from "../pdf/TRAMITE_Domicilio";
import TRAMITE_Residencia from "../pdf/TRAMITE_Residencia";
import { pdf } from "@react-pdf/renderer";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import axios from "axios";
import { toast } from "react-toastify";
import {
  MDBModal,
  MDBModalBody,
  MDBModalContent,
  MDBModalFooter,
  MDBModalDialog,
  MDBModalHeader,
  MDBModalTitle,
  MDBBtn,
  MDBIcon,
  MDBInput,
  MDBAccordion,
  MDBAccordionItem,
  MDBRadio,
} from "mdb-react-ui-kit";

const TASK_Details = ({ id, onBack }) => {
  const userData = JSON.parse(localStorage.getItem("user_data"));
  const tramitesInfoFam = [2, 1];
  const [open, setOpen] = useState(false);
  const [openRechazo, setOpenRechazo] = useState(false);
  const inputRef = useRef(null);
  const [tramiteObservacion, setTramiteObservacion] = useState('');
  const [motivoRechazo, setMotivoRechazo] = useState("");
  const [legajo, setLegajo] = useState("");
  const [tramite, setTramite] = useState({});
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
  const [data, setData] = useState({
    id: "",
    detalle: "",
    name: "",
    solicitante: "",
    year: "",
    dni: "",
    today: "",
    entity: "",
    userDate: "",
    birthdate: "",
    ocupacion: "",
    estado_civi: "",
    direccion: "",
    telefono: "",
    ciudad: "",
    observacion: "",
    legajo: "",
    firma: "",
    direccion_actual: "",
  });

  const toggleOpen = () => setOpenRechazo(!openRechazo);


  const handleModalSubmit = () => {
    generatePdf();
  };

  useEffect(() => {
    if (open) {
      inputRef.current?.focus();
    }
  }, [open]);

  const handleConfirmacionRechazo = () => {
    axios
      .patch(`http://localhost:8000/api/case-rechazo/${id}/`, {
        motivo_rechazo: motivoRechazo,
        status: "rechazado",
      })
      .then((response) => {
        toast.success("el tramite se rechazo con exito");
        window.location.reload();
        setCasoRechazado(false);
        setTramite((prevTramite) => ({
          ...prevTramite,
          status: "rechazado",
          motivo_rechazo: motivoRechazo,
        }));
        toast.danger("El trámite se rechazó con éxito");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const generatePdf = async () => {
    const formData = new FormData();
    const normalizedDataName = data.name.toLowerCase();

    // Agregar las observaciones a data
    data.observacion = tramiteObservacion;
    data.legajo = legajo;
    data.firma = userData.firstname;
    console.log(data);

    if (normalizedDataName.includes("certificado de buena conducta")) {
      const blob = await pdf(<TRAMITE_BuenaConducta data={data} />).toBlob();
      formData.append("certificado", blob, `${data.name}.pdf`);
    } else if (normalizedDataName.includes("certificado de extravío")) {
      const blob = await pdf(<TRAMITE_Extravio data={data} />).toBlob();
      formData.append("certificado", blob, `${data.name}.pdf`);
    } else if (normalizedDataName.includes("certificado de domicilio")) {
      const blob = await pdf(<TRAMITE_Domicilio data={data} />).toBlob();
      formData.append("certificado", blob, `${data.name}.pdf`);
    } else if (normalizedDataName.includes("certificado de residencia")) {
      const blob = await pdf(<TRAMITE_Residencia data={data} />).toBlob();
      formData.append("certificado", blob, `${data.name}.pdf`);
    }

    formData.append("status", "resuelto");
    axios
      .patch(`http://127.0.0.1:8000/api/claim-case/${id}/`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        toast.success("Trámite aprobado exitosamente", { autoClose: 5000, });
        setTimeout(() => {
          window.location.reload();
        }, 5000)
      })
      .catch((error) => {
        toast.danger("Error al aprobar el certificado");
        setTimeout(() => {
          window.location.reload();
        }, 5000)
      });
  };

  useEffect(() => {
    const fetchTransactionData = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/get-payment/${id}/`);
        const data = response.data;
        setComprobanteData(data);
      } catch (error) {
        console.error('Error al obtener el número de transacción:', error);
      }
    };

    const fetchCase = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/get-case/${id}/`);
        setTramite(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    if (id) {
      fetchCase();
      fetchTransactionData();
    }
  }, [id]);

  useEffect(() => {
    if (tramite && tramite.solicitante) {
      const today = new Date();
      const year = today.getFullYear();
      const formattedToday = today.toISOString().split("T")[0];

      setData({
        id: tramite.id,
        name: tramite.tramite.name,
        solicitante: `${tramite.solicitante.firstname} ${tramite.solicitante.lastname}`,
        year: year,
        dni: tramite.solicitante.number,
        today: formattedToday,
        entity: tramite.entidad_solicitante,
        userData: userData,
        detalle: tramite.detalle_extravio,
        birthdate: tramite.solicitante.birthdate,
        ocupacion: tramite.ocupacion,
        estado_civil: tramite.estado_civil,
        direccion: `${tramite.solicitante.address} ${tramite.solicitante.address_number}`,
        telefono: `${tramite.solicitante.phone_area_code} ${tramite.solicitante.phone}`,
        ciudad: tramite.residencia,
        observacion: tramite.observacion,
        legajo: tramite.legajo,
        firma: tramite.firma,
      });
    }
  }, [tramite]);

  return (
    <Container fluid>
      <div
        className="my-3 p-3"
        style={{ background: "#e8edf7", borderRadius: "10px" }}
      >
        <Row className="align-items-center">
          <Col xs={6} className="d-flex justify-content-start">
            <MDBBtn
              floating
              size="lg"
              style={{ background: "#114b72" }}
              onClick={onBack}
            >
              <MDBIcon fas icon="arrow-circle-left" size="2x" />
            </MDBBtn>
          </Col>
          <Col xs={6} className="d-flex justify-content-end">
            <h5 className="mb-0">#{tramite.id}</h5>
          </Col>
        </Row>

        <Row className="mt-3 align-items-center">
          <Col md={12}>
            <h6>Datos de la solicitud</h6>
            <hr style={{ color: "black" }} />
          </Col>
          <Col md={4}>
            <MDBInput
              type="text"
              label="Trámite"
              className="custom-input"
              value={tramite?.tramite?.name || ""}
              name="name"
              readOnly
            />
          </Col>
          <Col md={4}>
            <MDBInput
              type="date"
              label="Fecha de solicitud"
              className="custom-input"
              value={tramite?.request_date || ""}
              name="request_date"
              readOnly
            />
          </Col>
          <Col md={4}>
            <MDBInput
              type="text"
              label="Estado"
              className="custom-input"
              value={
                tramite?.status
                  ? tramite.status.charAt(0).toUpperCase() +
                  tramite.status.slice(1)
                  : ""
              }
              name="status"
              readOnly
            />
          </Col>
        </Row>

        <Row className="mt-3 align-items-center">
          <Col md={12}>
            <h6>Datos del solicitante</h6>
            <hr style={{ color: "black" }} />
          </Col>
          <Col md={4}>
            <MDBInput
              type="text"
              label="Solicitante"
              className="custom-input"
              value={
                tramite?.solicitante?.firstname +
                " " +
                tramite?.solicitante?.lastname || ""
              }
              name="name"
              readOnly
            />
          </Col>
          <Col md={4}>
            <MDBInput
              type="text"
              label="Tipo de documento"
              className="custom-input"
              value={tramite?.solicitante?.document_type || ""}
              name="request_date"
              readOnly
            />
          </Col>
          <Col md={4}>
            <MDBInput
              type="text"
              label="Número"
              className="custom-input"
              value={tramite?.solicitante?.number || ""}
              name="status"
              readOnly
            />
          </Col>
        </Row>

        <Row className="mt-3 align-items-center">
          <Col md={4}>
            <MDBInput
              type="text"
              label="Género"
              className="custom-input"
              value={
                tramite?.solicitante?.genre === "male"
                  ? "Masculino"
                  : tramite?.solicitante?.genre === "female"
                    ? "Femenino"
                    : ""
              }
              name="status"
              readOnly
            />
          </Col>
          <Col md={4}>
            <MDBInput
              type="date"
              label="Fecha de nacimiento"
              className="custom-input"
              value={tramite?.solicitante?.birthdate || ""}
              name="status"
              readOnly
            />
          </Col>
          <Col md={4}>
            <MDBInput
              type="text"
              label="Correo electrónico"
              className="custom-input"
              value={tramite?.solicitante?.email || ""}
              name="status"
              readOnly
            />
          </Col>
        </Row>

        <Row className="mt-3 align-items-center">
          <Col md={4}>
            <MDBInput
              type="text"
              label="Dirección"
              className="custom-input"
              value={
                tramite?.solicitante?.address +
                " " +
                tramite?.solicitante?.address_number || ""
              }
              name="status"
              readOnly
            />
          </Col>
          <Col md={4}>
            <MDBInput
              type="text"
              label="Departamento"
              className="custom-input"
              value={tramite?.solicitante?.apartment || ""}
              name="status"
              readOnly
            />
          </Col>
          <Col md={4}>
            <MDBInput
              type="text"
              label="Piso"
              className="custom-input"
              value={tramite?.solicitante?.floor || ""}
              name="status"
              readOnly
            />
          </Col>
        </Row>

        {tramitesInfoFam.includes(id) && (
          <>
            <Row className="mt-3 align-items-center">
              <Col md={12}>
                <h6>Datos familiares</h6>
                <hr style={{ color: "black" }} />
              </Col>
              <Col md={4} className="d-flex justify-content-start">
                <p className="mx-3">¿Madre vive?</p>
                <MDBRadio
                  name="madre_vive"
                  value="true"
                  label="Si"
                  inline
                  required
                />
                <MDBRadio name="madre_vive" value="false" label="No" inline />
              </Col>
              <Col md={4}>
                <MDBInput
                  type="text"
                  label="Nombre y apellido"
                  className="custom-input"
                  value={tramite?.nombre_madre || ""}
                  name="nombre_madre"
                  readOnly
                />
              </Col>
            </Row>

            <Row className="mt-3 align-items-center">
              <Col md={4} className="d-flex justify-content-start">
                <p className="mx-3">¿Padre vive?</p>
                <MDBRadio
                  name="padre_vive"
                  value="true"
                  label="Si"
                  inline
                  required
                />
                <MDBRadio name="padre_vive" value="false" label="No" inline />
              </Col>
              <Col md={4}>
                <MDBInput
                  type="text"
                  label="Nombre y apellido"
                  className="custom-input"
                  value={tramite?.nombre_padre || ""}
                  name="nombre_madre"
                  readOnly
                />
              </Col>
            </Row>

            <Row className="mt-3 align-items-center">
              <Col md={4} className="d-flex justify-content-center">
                <MDBInput
                  type="text"
                  label="Número de hijos"
                  className="custom-input"
                  value={tramite?.numero_hijos || ""}
                  name="nombre_madre"
                  readOnly
                />
              </Col>
              <Col md={4}>
                <MDBInput
                  type="text"
                  label="Entidad solicitante"
                  className="custom-input"
                  value={tramite?.entidad_solicitante || ""}
                  name="nombre_madre"
                  readOnly
                />
              </Col>
            </Row>
          </>
        )}

        <Row className='mt-4'>
          {tramite?.detalle_extravio && (
            <>
              <Col md={12}>
                <h6>Detalle del elemento extraviado</h6>
                <hr style={{ color: 'black' }} />
              </Col>

              <Col md={12}>
                <MDBInput
                  type="text"
                  label="Detalle Extravio"
                  className="custom-input"
                  value={
                    tramite?.detalle_extravio
                  }

                />
              </Col>
            </>
          )}
        </Row>
        
        <Row className="mt-4">
          <Col md={12}>
            <h6>Fotos del documento</h6>
            <hr style={{ color: "black" }} />
          </Col>
          <Col md={12} xl={6} className="d-flex justify-content-md-center mb-3">
            <img
              src={tramite?.dni_frente}
              alt="DNI Frente"
              width="95%"
              height="300px"
              style={{ borderRadius: "10px" }}
            />
          </Col>
          <Col
            md={12}
            xl={6}
            className="d-flex justify-content-xl-end justify-content-md-center"
          >
            <img
              src={tramite?.dni_dorso}
              alt="DNI Frente"
              width="95%"
              height="300px"
              style={{ borderRadius: "10px" }}
            />
          </Col>
        </Row>
      </div>

      <div
        className="mb-3"
        style={{ background: "#e8edf7", borderRadius: "10px" }}
      >
        {/* MUESTRA EL COMPROBANTE DE PAGO */}
        <Row>
          <MDBAccordion borderless initialActive={0}>
            <MDBAccordionItem collapseId={1} headerTitle="Comprobante de pago">
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "100%",
                }}
              >
                <ComprobantePago comprobanteData={comprobanteData} />
              </div>
            </MDBAccordionItem>
          </MDBAccordion>
        </Row>
      </div>

      <div
        className="my-3 p-3"
        style={{ background: "#e8edf7", borderRadius: "10px" }}
      >
        <Row>
          {tramite.archivo_pdf_url ? (
            <Col md={6}>
              <a
                href={tramite.archivo_pdf_url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span style={{ color: "black" }}>
                  Ver Documentacion Adicional
                </span>
              </a>
            </Col>
          ) : (
            <div>No hay documentación adicional</div>
          )}
        </Row>
      </div>

      {tramite && tramite.status === "resuelto" ? (
        <PDFViewer
          style={{ width: "100%", height: "90vh", borderRadius: "10px" }}
        >
          <TRAMITE_Pdf />
        </PDFViewer>
      ) : (
        <>
          <Row>
            <Col md={6} className="mb-3">
              <div className="d-grid gap-2">
                <MDBBtn color="danger" onClick={toggleOpen}>
                  RECHAZAR SOLICITUD
                </MDBBtn>

                <MDBModal open={openRechazo} onClose={() => setOpenRechazo(false)} tabIndex='-1'>
                  <MDBModalDialog>
                    <MDBModalContent>
                      <MDBModalHeader>
                        <MDBModalTitle>Motivo de Rechazo</MDBModalTitle>
                        <MDBBtn
                          className="btn-close"
                          color="none"
                          onClick={toggleOpen}
                        ></MDBBtn>
                      </MDBModalHeader>
                      <MDBModalBody>
                        <MDBInput
                          ref={inputRef}
                          value={motivoRechazo}
                          onChange={(e) => setMotivoRechazo(e.target.value)}
                          label="Motivo de rechazo"
                          id="controlledValue"
                          type="text"
                        />
                      </MDBModalBody>

                      <MDBModalFooter>
                        <MDBBtn
                          type="button"
                          color="info"
                          onClick={toggleOpen}
                        >
                          Volver
                        </MDBBtn>

                        <MDBBtn
                          type="button"
                          color="danger"
                          onClick={handleConfirmacionRechazo}
                        >
                          Confirmar rechazo
                        </MDBBtn>
                      </MDBModalFooter>
                    </MDBModalContent>
                  </MDBModalDialog>
                </MDBModal>
              </div>
            </Col>
            <Col md={6} className="mb-3">

              <div className="d-grid gap-2">
                <MDBBtn color="success" onClick={() => setOpen(!open)}>
                  Generar certificado
                </MDBBtn>
                {/* //modal para agregar observaciones */}

                <MDBModal open={open} setOpen={setOpen} tabIndex={-1}>
                  <MDBModalDialog>
                    <MDBModalContent>
                      <MDBModalHeader>
                        <MDBModalTitle>Ingresar Observaciones</MDBModalTitle>
                        <MDBBtn
                          className="btn-close"
                          color="none"
                          onClick={() => setOpen(!open)}
                        ></MDBBtn>
                      </MDBModalHeader>
                      <MDBModalBody>
                        <div className="mb-3">
                          <MDBInput
                            ref={inputRef}
                            value={tramiteObservacion}
                            onChange={(e) => setTramiteObservacion(e.target.value)}
                            label="Observaciones"
                            id="controlledValue"
                            type="text"
                          />
                        </div>
                        <div>
                          <MDBInput
                            ref={inputRef}
                            value={legajo}
                            onChange={(e) => setLegajo(e.target.value)}
                            label="legajo"
                            id="controlledValue"
                            type="text"
                          />
                        </div>
                      </MDBModalBody>

                      <MDBModalFooter>
                        <MDBBtn
                          type="button"
                          color="info"
                          onClick={() => setOpen(!open)}
                        >
                          Volver
                        </MDBBtn>

                        <MDBBtn
                          type="button"
                          color="success"
                          onClick={handleModalSubmit}
                        >
                          Generar Certificado
                        </MDBBtn>
                      </MDBModalFooter>
                    </MDBModalContent>
                  </MDBModalDialog>
                </MDBModal>
              </div>
            </Col>
          </Row>
        </>
      )}
    </Container>
  );
};

export default TASK_Details;
