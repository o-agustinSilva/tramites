import React, { useEffect, useState } from "react";
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
} from "mdb-react-ui-kit";
import axios from "axios";

const PROFILE_Tabs = () => {
   const user = JSON.parse(localStorage.getItem("user_data"));
  const [verticalActive, setVerticalActive] = useState("tab1");
  const [userData, setUserData] = useState(user); //estado para almacenar los datos del usuario

  useEffect(() => { 
    const fetchUserData = async () => {
      try {
        const user = JSON.parse(localStorage.getItem('user_data'));
        
        const response = await axios.get(`http://localhost:8000/api/get-user/${user.id}/`);
        
        if (response.data) {
          setUserData(response.data);
          
        } else {
          console.log('No data found for the user');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        setError('Error fetching user data');
      }
    };

    fetchUserData();
  }, []);

  const handleVerticalClick = (value) => {
    if (value === verticalActive) {
      return;
    }

    setVerticalActive(value);
  };
 
  const handleReload= ()=>{
    window.location.reload();
  }
  

  return (
    <MDBContainer fluid>
      <MDBRow>
        <MDBCol lg={3}>
          <MDBTabs
            className="flex-column text-start mb-5"
            style={{ background: "#e8edf7", borderBottomRightRadius: "10px" }}
          >
            <MDBTabsItem style={{ color: "black" }}>
              <div className="my-3  text-center">
              {userData.profile_imagen ? (
                <img
                  style={{ width: "150px", height: "150px" }}
                  id="profileImg"
                  src={userData.profile_imagen}
                  alt="Imagen de perfil"
                />
                ) : (
                  <MDBIcon fas icon="user" size="4x" />
                )}
              <h3>{userData.firstname}</h3>
              </div>
            </MDBTabsItem>

            <MDBTabsItem>
              <MDBTabsLink
                style={{ color: "black" }}
                onClick={() => handleVerticalClick("tab1")}
                active={verticalActive === "tab1"}
                className={
                  verticalActive == "tab1" ? "activeTab baseTab" : "baseTab"
                }
              >
                <MDBIcon fas icon="id-card" className="me-2" />
                Datos personales
              </MDBTabsLink>
            </MDBTabsItem>
            <MDBTabsItem>
              <MDBTabsLink
                style={{ color: "black" }}
                onClick={() => handleVerticalClick("tab2")}
                active={verticalActive === "tab2"}
                className={
                  verticalActive == "tab2" ? "activeTab baseTab" : "baseTab"
                }
              >
                <MDBIcon fas icon="camera" className="me-2" />
                Foto de perfil
              </MDBTabsLink>
            </MDBTabsItem>
            <MDBTabsItem>
              <MDBTabsLink
                style={{ color: "black", borderBottomRightRadius: "15px" }}
                onClick={() => handleVerticalClick("tab3")}
                active={verticalActive === "tab3"}
                className={
                  verticalActive == "tab3" ? "activeTab baseTab" : "baseTab"
                }
              >
                <MDBIcon fas icon="cog" className="me-2" />
                Configuración
              </MDBTabsLink>
            </MDBTabsItem>
          </MDBTabs>
        </MDBCol>
        <MDBCol lg={9}>
          <MDBTabsContent>
            <MDBTabsPane open={verticalActive === "tab1"}>
              <PROFILE_PersonalInfo user={userData} />
              <PROFILE_PhoneNumber user={userData} onReload={handleReload} />
              <PROFILE_Email user={userData} />
            </MDBTabsPane>
            <MDBTabsPane open={verticalActive === "tab2"}>
              <PROFILE_Image user={userData} onReload={handleReload} />
            </MDBTabsPane>
            <MDBTabsPane open={verticalActive === "tab3"}>
              <PROFILE_Password user={userData} />
            </MDBTabsPane>
          </MDBTabsContent>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};

export default PROFILE_Tabs;