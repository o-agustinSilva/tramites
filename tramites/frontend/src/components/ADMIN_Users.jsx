import React, { useState, useEffect } from 'react'
import { Row, Col } from 'react-bootstrap';
import { Link } from "react-router-dom";
import axios from 'axios';
import {
    MDBBtn,
    MDBTable,
    MDBTableHead,
    MDBTableBody,
    MDBIcon,
} from "mdb-react-ui-kit";

const ADMIN_Users = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        
        const fetchUsers = async () => {
            try {
                const response = await axios.get("http://localhost:8000/api/get-superusers/");
                const res = response.data;      
                console.log(res);
                if (response.status === 200) setUsers(res)
                console.log(res);

            } catch (err) {
                console.log(err);
            }
        }

        fetchUsers();
    }, []);

    const capitalize = (str) => {
        if (!str) return ''; // Verifica si la cadena es nula o indefinida
        return str.charAt(0).toUpperCase() + str.slice(1);
    };


    const handleDelete = (userId) => {
             if (window.confirm('¿Estás seguro de que deseas eliminar este usuario?')) {
                 axios.delete(`http://localhost:8000/api/deleteUserPolicia/${userId}/`)
                     .then(response => {
                         if (response.status === 204) { // Status code for successful deletion without response body
                             // Remove the deleted user from the state
                             setUsers(users.filter(user => user.id !== userId));
                         } else {
                             console.error("Error al eliminar el usuario:", response.data);
                         }
                     })
                     .catch(err => {
                         console.error("Error al eliminar el usuario:", err);
                     });
             }
         }
    


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
                    {users.map((user) => (
                        <tr key={user.id}>
                        <td>
                            <div className="d-flex align-items-center">
                            {user.profile_imagen ? (
                                <img
                                    src={`http://localhost:8000${user.profile_imagen}`}
                                    alt="Imagen de perfil"
                                    style={{ width: "50px", height: "50px" }}
                                    className="rounded-circle"
                                    id="profileImg"
                                />
                                ): (<MDBIcon fas icon="user" size="2x" />
                                )}
                                <div className="ms-3">
                                    <p className="fw-bold mb-1">{user.firstname} {user.lastname}</p>
                                    <p className="text-muted mb-0">{user.email}</p>
                                </div>
                            </div>
                        </td>
                        <td>
                            <p className="fw-normal mb-1">{capitalize(user.hierarchy)}</p>
                        </td>
                        <td>{user.dependence}</td>
                        <td>
                            <Link to={`/edit-user/${user.id}`}>
                                <MDBBtn color="info" rounded size="sm" className="tableButton">
                                    <MDBIcon fas icon="edit" size="1x" />
                                    <span className="mx-3">Editar</span>
                                </MDBBtn>
                            </Link>
                            </td>
                        <td>
                        
                            <MDBBtn color="danger" rounded size="sm" className="tableButton" onClick={()=>handleDelete(user.id)} >
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