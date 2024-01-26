import React from 'react'
import { Link } from 'react-router-dom';
import TRAMITE_Pdf from '../pdf/TRAMITE_Pdf';
import { PDFDownloadLink } from '@react-pdf/renderer';
import {
    MDBBadge,
    MDBBtn,
    MDBTable,
    MDBTableHead,
    MDBTableBody,
    MDBIcon,
} from "mdb-react-ui-kit";
const TRAMITES_ListTramites = ({ status }) => {
    return (
        <MDBTable responsive align="middle">
            <MDBTableHead>
                <tr>
                    <th>Documento</th>
                    <th>Codigo</th>
                    <th>Dependencia</th>
                    <th>Fecha de emisión</th>
                    <th></th>
                    <th></th>
                </tr>
            </MDBTableHead>
            <MDBTableBody>
                <tr>
                    <td>
                        <div className="d-flex align-items-center">
                            <img
                                src="https://mdbootstrap.com/img/new/avatars/8.jpg"
                                alt=""
                                style={{ width: "45px", height: "45px" }}
                                className="rounded-circle"
                            />
                            <div className="ms-3">
                                <p className="fw-bold mb-1">Certificado de Residencia</p>
                            </div>
                        </div>
                    </td>
                    <td>
                        <p className="fw-normal mb-1">002</p>
                    </td>
                    <td>
                        Comisaría cuarta
                    </td>
                    <td>22/01/2024</td>
                    <td>
                        <PDFDownloadLink document={<TRAMITE_Pdf />}
                            fileName='Nombre del certificado'>
                            <MDBBtn color="success" rounded size="sm" className='tableButton'>


                                <MDBIcon fas icon="arrow-circle-down" size="2x" />
                                <span className="mx-2">Descargar</span>
                            </MDBBtn>
                        </PDFDownloadLink>
                    </td>
                    <td>
                        <Link to="/tramite">
                            <MDBBtn color="info" rounded size="sm" className='tableButton'>
                                <MDBIcon fas icon="edit" size="2x" />
                                <span className="mx-2">Ver detalle</span>
                            </MDBBtn>
                        </Link>
                    </td>
                </tr>
            </MDBTableBody>
        </MDBTable>
    )
}

export default TRAMITES_ListTramites