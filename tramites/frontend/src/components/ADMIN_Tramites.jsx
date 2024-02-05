import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { Row, Col } from 'react-bootstrap';
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import {
    MDBBadge,
    MDBBtn,
    MDBTable,
    MDBTableHead,
    MDBTableBody,
    MDBIcon,
} from "mdb-react-ui-kit";

const ADMIN_Tramites = () => {
    const [tramites, setTramites] = useState([]);

    useEffect(() => {
        const fetchTramites = async () => {
            try {
                const response = await axios.get("http://localhost:8000/api/get-tramites/");
                const tramites = response.data;
                if (response.status === 200) setTramites(tramites);
            } catch (err) {
                console.log(err);
            }
        }

        fetchTramites();
    }, []);

    const handleDelete = async (e, id) => {
        e.preventDefault();
        try {
            const response = await axios.delete(`http://localhost:8000/api/delete-tramite/${id}/`);
            const res = response.data;

            if (response.status === 204) {
                setTimeout(() => {
                    window.location.reload();
                }, 1000);
            }
            else toast.error("Ocurrió un error al intentar dar de baja el trámite");
        }
        catch (err) { console.log(err) }
    }

    return (
        <div>
            <MDBTable responsive align="middle">
                <MDBTableHead light>
                    <tr>
                        <th scope="col">Nombre</th>
                        <th scope="col">Precio</th>
                        <th scope="col">Vigencia</th>
                        <th scope="col"></th>
                        <th scope="col"></th>
                    </tr>
                </MDBTableHead>
                <MDBTableBody>
                    {tramites.map((tramite) => (
                        <tr key={tramite.id}>
                            <th scope="row">{tramite.name}</th>
                            <td>$ARS {tramite.price}</td>
                            <td>{tramite.time_limit} Días</td>
                            <td>
                                <Link to={`/edit-tramite/${tramite.id}`}>
                                <MDBBtn color="info" rounded size="sm" className="tableButton">
                                    <MDBIcon fas icon="edit" size="1x" />
                                    <span className="mx-3">Editar</span>
                                </MDBBtn>
                                </Link>
                            </td>
                            <td>
                                <MDBBtn 
                                color="danger" 
                                rounded size="sm" 
                                className="tableButton"
                                onClick={(e) => handleDelete(e, tramite.id)}
                                >
                                    <MDBIcon fas icon="trash-alt" size="1x" />
                                    <span className="mx-3">Dar de baja</span>
                                </MDBBtn>
                            </td>
                        </tr>
                    ))}

                </MDBTableBody>
            </MDBTable>

            <Row className='mt-3'>
                <Col className='d-flex justify-content-start'>
                    <Link to="/new-tramite">
                        <MDBBtn className="d-flex align-items-center mb-3" color="success" size="sm">
                            <MDBIcon fas icon="plus-circle" size="2x" style={{ marginRight: '10px' }} />
                            <span className='mb-0'>Nuevo trámite</span>
                        </MDBBtn>
                    </Link>
                </Col>
            </Row>
        </div>
    )
}

export default ADMIN_Tramites