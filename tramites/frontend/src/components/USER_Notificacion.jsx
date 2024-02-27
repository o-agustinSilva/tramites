import React, { useState } from "react";
import NOTIFICATION_General from "../components/NOTIFICATION_General";
import TASKS_User from "../components/TASKS_User";

import {
    MDBIcon,
    MDBTabs,
    MDBTabsItem,
    MDBTabsLink,
    MDBTabsContent,
    MDBTabsPane,
    MDBContainer,
    MDBRow,
    MDBCol,
} from 'mdb-react-ui-kit';

const USER_Notificacion = () => {
    const userData = JSON.parse(localStorage.getItem("user_data"));
    const [verticalActive, setVerticalActive] = useState('tab1');
    const handleVerticalClick = (value) => {
        if (value === verticalActive) {
            return;
        }

        setVerticalActive(value);
    };

    return (
        <MDBContainer fluid>
            <MDBRow>
                <MDBCol lg={3}>
                    <MDBTabs className='flex-column text-start' style={{ background: "#e8edf7", borderBottomRightRadius: "10px" }}>
                        <MDBTabsItem style={{ color: "black" }}>
                            <div className="my-3  text-center">
                            <MDBIcon fas icon="user-injured" size="3x" />
                             <h3>Usuario Policia</h3>
                            </div>
                        </MDBTabsItem>
                        
                        <MDBTabsItem>
                            <MDBTabsLink 
                                style={{ color: "black" }}
                                onClick={() => handleVerticalClick('tab1')}
                                active={verticalActive === 'tab1'}
                                className={verticalActive == "tab1" ? "activeTab baseTab" : "baseTab"}
                            >
                                <MDBIcon fas icon="envelope-square" className="me-2" size="2x" /> 
                                 <span className="mb-0">Nuevas Tareas </span>
                            </MDBTabsLink>
                        </MDBTabsItem>
                        <MDBTabsItem >
                            <MDBTabsLink style={{ color: "black" }}
                                onClick={() => handleVerticalClick('tab2')}
                                active={verticalActive === 'tab2'}
                                className={verticalActive == "tab2" ? "activeTab baseTab" : "baseTab"}
                            >
                                <MDBIcon fas icon="tasks" className="me-2" size="2x" />
                                    Mis Tareas
                            </MDBTabsLink>
                        </MDBTabsItem>
                   
                    </MDBTabs>
                </MDBCol>
                <MDBCol lg={9}>
                    <MDBTabsContent>
                        <MDBTabsPane open={verticalActive === 'tab1'}>
                            <NOTIFICATION_General user={userData} />
                        </MDBTabsPane>
                        <MDBTabsPane open={verticalActive === 'tab2'}><TASKS_User user={userData} /></MDBTabsPane>
                    </MDBTabsContent>
                </MDBCol>
            </MDBRow>
        </MDBContainer>
    );
}

export default USER_Notificacion;