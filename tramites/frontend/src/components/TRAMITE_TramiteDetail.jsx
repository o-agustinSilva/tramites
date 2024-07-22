import React, { useState, useEffect } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Link } from "react-router-dom";
import axios from "axios";
import { MDBBtn, MDBIcon, MDBInput, MDBFile } from "mdb-react-ui-kit";
import { toast } from "react-toastify";

// Configurar worker para react-pdf
// pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const TRAMITES_TramiteDetail = ({ id }) => {
  const [tramite, setTramite] = useState({});
  const [archivoPDF, setArchivoPDF] = useState("");

  const handlePdfClick = (e) => {
    const file = e.target.files[0];
    setArchivoPDF(file);
  };

  const handleAddPdfChange = () => {
    const formData = new FormData();
    formData.append("archivo_pdf", archivoPDF);
    formData.append("status", "solicitado");

    axios
      .patch(`http://localhost:8000/api/addpdf-case/${id}/`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        toast.success("La documentación se envió correctamente");
        window.location.reload();
      })
      .catch((error) => {
        console.log("Error al enviar la documentación", error);
      });
  };

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/get-case/${id}/`)
      .then((response) => {
        if (response.status === 200) {
          setTramite(response.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  const handleDownloadClick = async (url) => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const downloadUrl = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = downloadUrl;
      a.download = decodeURIComponent(url.split("/").pop()); // Decodifica el nombre del archivo
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(downloadUrl);
    } catch (error) {
      console.error("Error downloading file:", error);
    }
  };

  return (
    <Container>
      <Row className="mt-3 align-items-center">
        <Col xs={6} className="d-flex justify-content-start">
          <Link to="/misTramites">
            <MDBBtn floating size="lg" style={{ background: "#114b72" }}>
              <MDBIcon fas icon="arrow-circle-left" size="2x" />
            </MDBBtn>
          </Link>
        </Col>
        <Col xs={6} className="d-flex justify-content-end">
          <h5 className="mb-0">#{tramite.id}</h5>
        </Col>
      </Row>

      <div
        className="my-3 p-3"
        style={{ background: "#e8edf7", borderRadius: "10px" }}
      >
        <Row className="mt-3 align-items-center">
          <Col md={12}>
            <h6>Datos de la solicitud</h6>
            <hr style={{ color: "black" }} />
          </Col>
          <Col md={4} className="mb-3">
            <MDBInput
              type="text"
              label="Trámite"
              className="custom-input"
              value={tramite?.tramite?.name || ""}
              name="name"
              readOnly
            />
          </Col>
          <Col md={4} className="mb-3">
            <MDBInput
              type="date"
              label="Fecha de solicitud"
              className="custom-input"
              value={tramite?.request_date || ""}
              name="request_date"
              readOnly
            />
          </Col>
          <Col md={4} className="mb-3">
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

        <Row className="mt-4">
          <Col md={12}>
            <h6>Fotos del documento</h6>
            <hr style={{ color: "black" }} />
          </Col>
          <Col md={6} className="mb-3">
            <img
              src={tramite?.dni_frente}
              alt="DNI Frente"
              width="100%"
              height="300px"
              style={{ borderRadius: "10px" }}
            />
          </Col>
          <Col md={6} className="mb-3">
            <img
              src={tramite?.dni_dorso}
              alt="DNI Dorso"
              width="100%"
              height="300px"
              style={{ borderRadius: "10px" }}
            />
          </Col>
        </Row>

        {tramite && tramite.status === "rechazado" ? (
          <Row className="mt-4">
            <Col>
              <h5>Motivo de Rechazo</h5>
              <hr style={{ color: "black" }} />
            </Col>

            <h5 style={{ color: "red" }}>{tramite.motivo_rechazo}</h5>

            <div className="my-2">Adjuntar la documentación solicitada:</div>
            <Col className="mb-3" md={8}>
              <div>
                <MDBFile
                  label=""
                  id="formFileMultiple"
                  multiple
                  onChange={handlePdfClick}
                />
              </div>
            </Col>
            <div className="gap-2">
              <MDBBtn
                color="info"
                className="tableButton"
                onClick={handleAddPdfChange}
              >
                <MDBIcon fas icon="arrow-circle-up" size="2x" />
                <span className="mx-3">Enviar Documentación</span>
              </MDBBtn>
            </div>
          </Row>
        ) : tramite.status === "solicitado" || tramite.status === "en curso" ? (
          <Row className="mt-4">
            <Col md={12}>
              <h5>Documentación Adicional</h5>
              <hr style={{ color: "black" }} />
            </Col>

            {tramite.archivo_pdf_url ? (
              <Col md={6} className="mb-3">
                <div>
                  <a
                    href={tramite.archivo_pdf_url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span style={{color:'black'}}>Ver Documentacion Adicional</span>
                  </a>
                </div>
              </Col>
            ) : (
              <Col md={12}>
                <p>No hay archivos PDF adicionales disponibles.</p>
              </Col>
            )}
          </Row>
        ) : (
          <Row className="mt-4">
            <Col md={12}>
              <h6>Certificado y comprobante de pago</h6>
              <hr style={{ color: "black" }} />
            </Col>
            <Col md={6} className="mb-3">
              {tramite.certificado && (
                <div className="d-grid gap-2">
                  <MDBBtn
                    color="success"
                    className="tableButton"
                    onClick={() => handleDownloadClick(tramite.certificado)}
                  >
                    <MDBIcon fas icon="arrow-circle-down" size="2x" />
                    <span className="mx-3">Descargar certificado</span>
                  </MDBBtn>
                </div>
              )}
            </Col>

            <Col md={6} className="mb-3">
              {tramite.comprobante_pago && (
                <div className="d-grid gap-2">
                  <MDBBtn
                    color="success"
                    className="tableButton"
                    onClick={() =>
                      handleDownloadClick(tramite.comprobante_pago)
                    }
                  >
                    <MDBIcon fas icon="arrow-circle-down" size="2x" />
                    <span className="mx-3">Descargar comprobante</span>
                  </MDBBtn>
                </div>
              )}
            </Col>
          </Row>
        )}
      </div>
    </Container>
  );
};

export default TRAMITES_TramiteDetail;
