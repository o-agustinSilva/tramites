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
    MDBTabsPane
} from 'mdb-react-ui-kit';

const PROFILE_Tabs = () => {
    const [justifyActive, setJustifyActive] = useState('tab1');
    const handleJustifyClick = (value) => {
        if (value === justifyActive) {
            return;
        }

        setJustifyActive(value);
    };

    return (
        <>
            <MDBTabs justify className='mb-3' style={{background:"#e8edf7"}}>
                <MDBTabsItem>
                    <MDBTabsLink onClick={() => handleJustifyClick('tab1')} active={justifyActive === 'tab1'} 
                    className={justifyActive == "tab1" ? "activeTab baseTab" : "baseTab"}>
                        <MDBIcon fas icon="id-card" className="me-2"/>
                        Datos personales
                    </MDBTabsLink>
                </MDBTabsItem>
                <MDBTabsItem>
                    <MDBTabsLink onClick={() => handleJustifyClick('tab2')} active={justifyActive === 'tab2'}
                    className={justifyActive == "tab2" ? "activeTab baseTab" : "baseTab"}>
                        <MDBIcon fas icon="camera" className="me-2"/>
                        Foto de perfil
                    </MDBTabsLink>
                </MDBTabsItem>
                <MDBTabsItem>
                    <MDBTabsLink onClick={() => handleJustifyClick('tab3')} active={justifyActive === 'tab3'}
                    className={justifyActive == "tab3" ? "activeTab baseTab" : "baseTab"}>
                        Correo electrónico
                    </MDBTabsLink>
                </MDBTabsItem>
                <MDBTabsItem>
                    <MDBTabsLink onClick={() => handleJustifyClick('tab4')} active={justifyActive === 'tab4'}
                    className={justifyActive == "tab4" ? "activeTab baseTab" : "baseTab"}>
                        Cambiar contraseña
                    </MDBTabsLink>
                </MDBTabsItem>
            </MDBTabs>

            <MDBTabsContent>
                <MDBTabsPane open={justifyActive === 'tab1'}>
                    <PROFILE_PersonalInfo/>
                    <PROFILE_PhoneNumber/>
                    <PROFILE_Email/>
                    <PROFILE_Password/>
                </MDBTabsPane>

                <MDBTabsPane open={justifyActive === 'tab2'}>
                <PROFILE_Image/>
                </MDBTabsPane>
                <MDBTabsPane open={justifyActive === 'tab3'}>Tab 3</MDBTabsPane>
                <MDBTabsPane open={justifyActive === 'tab4'}>Tab 4</MDBTabsPane>
            </MDBTabsContent>
        </>
    );
}

export default PROFILE_Tabs