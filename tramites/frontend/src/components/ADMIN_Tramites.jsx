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

const ADMIN_Tramites = () => {
    return (
        <div>
            <MDBTable responsive className="table table-striped">
                <MDBTableHead light>
                    <tr>
                        <th scope="col">Nombre</th>
                        <th scope="col">Codigo</th>
                        <th scope="col">Dependencia</th>
                        <th scope="col"></th>
                        <th scope="col"></th>
                    </tr>
                </MDBTableHead>
                <MDBTableBody>
                    <tr>
                        <th scope="row">Certificado de Domicilio</th>
                        <td>0252</td>
                        <td>Comisaria</td>
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
                    <tr>
                        <th scope="row">Cerificado de Buena Conducta</th>
                        <td>0251</td>
                        <td>Investigaciones</td>
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
                    <tr>
                        <th scope="row">Certificado de Extravio</th>
                        <td>0235</td>
                        <td>Comisaria</td>
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