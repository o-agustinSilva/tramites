import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import TRAMITE_Pdf from '../pdf/TRAMITE_Pdf';
import { PDFDownloadLink } from '@react-pdf/renderer';
import axios from 'axios';
import {
    MDBBadge,
    MDBBtn,
    MDBTable,
    MDBTableHead,
    MDBTableBody,
    MDBIcon,
} from "mdb-react-ui-kit";

const TRAMITES_ListTramites = ({ status }) => {
    const user = JSON.parse(localStorage.getItem("user_data"));
    const [tramites, setTramites] = useState([]);

    useEffect(() => {
        const getTramites = () => {

            if (status == 1) {
                axios.get(`http://127.0.0.1:8000/api/get-pending-cases/${user.id}/`)
                    .then(response => {
                        if (response.status === 200) {
                            setTramites(response.data);
                        }
                    })
            } else if (status == 2) {
                axios.get(`http://127.0.0.1:8000/api/get-completed-cases/${user.id}/`)
                    .then(response => {
                        if (response.status === 200) {
                            setTramites(response.data);
                        }
                    })
            }
        }

        getTramites();
    }, []);

    return (
        <MDBTable responsive align="middle">
            <MDBTableHead>
                <tr>
                    <th>Documento</th>
                    <th>Codigo</th>
                    <th>Estado</th>
                    <th>Fecha de solicitud</th>
                    <th></th>
                </tr>
            </MDBTableHead>
            <MDBTableBody>
                {tramites.map((tramite) => (
                    <tr key={tramite.id}>
                        <td>
                            <div className="d-flex align-items-center">
                                <img
                                    src="https://mdbootstrap.com/img/new/avatars/8.jpg"
                                    alt=""
                                    style={{ width: "45px", height: "45px" }}
                                    className="rounded-circle"
                                />
                                <div className="ms-3">
                                    <p className="fw-bold mb-1">{tramite.tramite.name}</p>
                                </div>
                            </div>
                        </td>
                        <td>
                            <p className="fw-normal mb-1">{tramite.id}</p>
                        </td>
                        <td>
                            {tramite.status.charAt(0).toUpperCase() + tramite.status.slice(1) == 'Solicitado' &&
                                <>
                                    <MDBBadge color='secondary' pill>
                                        {tramite.status.charAt(0).toUpperCase() + tramite.status.slice(1)}
                                    </MDBBadge>
                                </>
                            }

                            {tramite.status.charAt(0).toUpperCase() + tramite.status.slice(1) == 'En curso' &&
                                <>
                                    <MDBBadge color='warning' pill>
                                        {tramite.status.charAt(0).toUpperCase() + tramite.status.slice(1)}
                                    </MDBBadge>
                                </>
                            }

                            {tramite.status.charAt(0).toUpperCase() + tramite.status.slice(1) == 'Resuelto' &&
                                <>
                                    <MDBBadge color='success' pill>
                                        {tramite.status.charAt(0).toUpperCase() + tramite.status.slice(1)}
                                    </MDBBadge>
                                </>
                            }

                            {tramite.status.charAt(0).toUpperCase() + tramite.status.slice(1) == 'Rechazado' &&
                                <>
                                    <MDBBadge color='danger' pill>
                                        {tramite.status.charAt(0).toUpperCase() + tramite.status.slice(1)}
                                    </MDBBadge>
                                </>
                            }

                        </td>
                        <td>{tramite.request_date}</td>

                        <td>
                            <Link to={`/tramite/${tramite.id}/`}>
                                <MDBBtn color="info" rounded size="sm" className='tableButton'>
                                    <MDBIcon fas icon="edit" size="1x" />
                                    <span className="mx-3">Ver detalle</span>
                                </MDBBtn>
                            </Link>
                        </td>
                    </tr>
                ))}
            </MDBTableBody>
        </MDBTable>
    )
}

export default TRAMITES_ListTramites