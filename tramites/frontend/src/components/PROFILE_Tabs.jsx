import React, { useState } from "react";
import PROFILE_PersonalInfo from "./PROFILE_PersonalInfo";
import PROFILE_PhoneNumber from "./PROFILE_PhoneNumber";
import PROFILE_Email from "./PROFILE_Email";
import PROFILE_Password from "./PROFILE_Password";
import PROFILE_Image from "./PROFILE_Image";
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

const PROFILE_Tabs = () => {
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
                        <MDBTabsItem>
                            <MDBTabsLink
                                style={{ color: "black" }}
                                onClick={() => handleVerticalClick('tab1')}
                                active={verticalActive === 'tab1'}
                                className={verticalActive == "tab1" ? "activeTab baseTab" : "baseTab"}
                            >
                                <MDBIcon fas icon="id-card" className="me-2" />
                                Datos personales
                            </MDBTabsLink>
                        </MDBTabsItem>
                        <MDBTabsItem>
                            <MDBTabsLink style={{ color: "black" }}
                                onClick={() => handleVerticalClick('tab2')}
                                active={verticalActive === 'tab2'}
                                className={verticalActive == "tab2" ? "activeTab baseTab" : "baseTab"}
                            >
                                <MDBIcon fas icon="camera" className="me-2" />
                                Foto de perfil
                            </MDBTabsLink>
                        </MDBTabsItem>
                        <MDBTabsItem>
                            <MDBTabsLink style={{ color: "black", borderBottomRightRadius: "15px" }}
                                onClick={() => handleVerticalClick('tab3')}
                                active={verticalActive === 'tab3'}
                                className={verticalActive == "tab3" ? "activeTab baseTab" : "baseTab"}
                            >
                                <MDBIcon fas icon="cog" className="me-2" />
                                Configuración
                            </MDBTabsLink>
                        </MDBTabsItem>
                    </MDBTabs>
                </MDBCol>
                <MDBCol lg={9}>
                    <MDBTabsContent>
                        <MDBTabsPane open={verticalActive === 'tab1'}>
                            <PROFILE_PersonalInfo user={userData} />
                            <PROFILE_PhoneNumber user={userData} />
                            <PROFILE_Email user={userData} />
                        </MDBTabsPane>
                        <MDBTabsPane open={verticalActive === 'tab2'}><PROFILE_Image user={userData} /></MDBTabsPane>
                        <MDBTabsPane open={verticalActive === 'tab3'}><PROFILE_Password user={userData} /></MDBTabsPane>
                    </MDBTabsContent>
                </MDBCol>
            </MDBRow>
        </MDBContainer>
    );
}

export default PROFILE_Tabs