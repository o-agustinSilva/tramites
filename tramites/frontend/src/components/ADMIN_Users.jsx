import React from 'react'
import { Row, Col } from 'react-bootstrap';
import { Link } from "react-router-dom";
import {
    MDBBadge,
    MDBBtn,
    MDBTable,
    MDBTableHead,
    MDBTableBody,
    MDBIcon,
} from "mdb-react-ui-kit";

const ADMIN_Users = () => {
    return (
        <div>
            <MDBTable responsive align="middle">
                <MDBTableHead>
                    <tr>
                        <th scope="col">Nombre</th>
                        <th scope="col">Jerarquia</th>
                        <th scope="col">Dependencia</th>
                        <th scope="col"></th>
                        <th scope="col"></th>
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
                                    <p className="fw-bold mb-1">Daniel Herrera</p>
                                    <p className="text-muted mb-0">daniHerrera@gmail.com</p>
                                </div>
                            </div>
                        </td>
                        <td>
                            <p className="fw-normal mb-1">Oficial Ayudante</p>
                        </td>
                        <td>Comisaria Cuarta</td>
                        <td>
                            <MDBBtn color="info" rounded size="sm" className="tableButton">
                                <MDBIcon fas icon="edit" size="1x" />
                                <span className="mx-3">Editar</span>
                            </MDBBtn>
                            </td>
                        <td>
                            <MDBBtn color="danger" rounded size="sm" className="tableButton">
                                <MDBIcon fas icon="trash-alt" size="1x" />
                                <span className="mx-3">Dar de baja</span>
                            </MDBBtn>
                        </td>
                    </tr>
                </MDBTableBody>
            </MDBTable>

            <Row className='mt-3'>
                <Col className='d-flex justify-content-start'>
                    <Link to="/registrePolice">
                        <MDBBtn className="d-flex align-items-center mb-3" color="success" size="sm">
                            <MDBIcon fas icon="plus-circle" size="2x" style={{ marginRight: '10px' }} />
                            <span className='mb-0'>Nuevo usuario</span>
                        </MDBBtn>
                    </Link>
                </Col>
            </Row>
        </div>
    )
}

export default ADMIN_Users