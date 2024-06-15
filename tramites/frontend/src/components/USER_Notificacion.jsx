import React, { useState, useEffect } from "react";
import NOTIFICATION_General from "../components/NOTIFICATION_General";
import TASKS_User from "../components/TASKS_User";
import { useLocation, useNavigate } from "react-router-dom";
import TASKS_Finalizados from "./TASKS_Finalizados";
import axios from "axios";
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


const USER_Notificacion = () => {
  const userData = JSON.parse(localStorage.getItem("user_data"));
  const [verticalActive, setVerticalActive] = useState("1");
  const [tramitesSolicitado, setTramitesSolicitados] = useState([]);
  const [tramitesEncurso, setTramitesEncurso] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();
  const [tramitesFinalizados, setTramitesFinalizados] = useState([]);


  const fetchSolicitados = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/api/list-cases/solicitado/"
      );
      const res = response.data;
      if (response.status === 200) {
        setTramitesSolicitados(res);
      }

    } catch (err) {
      console.log(err);
    }
  };

  const fetchEnCurso = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/api/list-cases/en-curso/"
      );
      const res = response.data;
      if (response.status === 200) {
        setTramitesEncurso(res);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const fetchFinalizados = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/api/list-cases/resuelto/"
      );
      const res = response.data;
      if (response.status === 200) {
        setTramitesFinalizados(res);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchSolicitados();
    fetchEnCurso();
    fetchFinalizados();
  }, []);

  const handleAddTramites = async (casoId) => {
    try {
      const user = JSON.parse(localStorage.getItem("user_data"));
      const userId = user.id;

      const response = await axios.patch(
        `http://localhost:8000/api/claim-case/${casoId}/`, {
        "user_id": userId,
        "status": "en curso",
      }
      );

      if (response.status === 200) {
        fetchSolicitados();
        window.location.reload();
      }
    } catch (error) {
      console.error("Error al realizar la solicitud POST:", error);
    }
  };

  const handleTramites = async (casoId) => {
    try {
      const response = await axios.patch(
        `http://localhost:8000/api/claim-case/${casoId}/`, {
        user_id: "null",
        status: "solicitado"
      }
      );

      if (response.status === 200) {
        fetchEnCurso();
        window.location.reload();
      }
    } catch (error) {
      console.error("Error al realizar la solicitud PATCH", error);
    }
  };

  const handleVerticalClick = (value) => {
    if (verticalActive !== value) {
      setVerticalActive(value);
      navigate(`?tab=${value}`);
    }
  };

  const handleTramitesFinalizado = async (casoId) => {
    try {
      const user = JSON.parse(localStorage.getItem("user_data"));
      const userId = user.id;

      const response = await axios.patch(
        `http://localhost:8000/api/claim-case/${casoId}/`, {
        "user_id": userId,
        "status": "resuelto",
      }
      );

      if (response.status === 200) {
        fetchFinalizados();
        window.location.reload();
      }
    } catch (error) {
      console.error("Error al realizar la solicitud POST:", error);
    }
  };

  // Establece la pestaña activa basándose en la información de la URL
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const tabFromURL = searchParams.get("tab");

    // Si hay un tab en la URL, o si no hay uno almacenado en el estado local, usa el tab de la URL
    if (tabFromURL) {
      setVerticalActive(tabFromURL);
    } else if (!setVerticalActive) {
      // Si no hay un tab en la URL y no hay uno almacenado, establece el tab por defecto (en este caso, 1)
      setVerticalActive("1");
      navigate(`?tab=1`);
    }
  }, [location.search, setVerticalActive, navigate]);

  return (
    <MDBContainer fluid id="task-details">
      <MDBRow>
        <MDBCol lg={3}>
          <MDBTabs
            className="flex-column text-start"
            style={{ background: "#e8edf7", borderBottomRightRadius: "10px" }}
          >
            <MDBTabsItem style={{ color: "black" }}>
              <div className="my-3  text-center">
                <MDBIcon fas icon="user" size="3x" />
                <h3>{userData.firstname + ' ' + userData.lastname}</h3>
              </div>
            </MDBTabsItem>

            <MDBTabsItem>
              <MDBTabsLink
                style={{ color: "black" }}
                onClick={() => handleVerticalClick("1")}
                active={verticalActive === "1"}
                className={`baseTab d-flex align-items-center ${verticalActive === "1" ? "activeTab" : ""}`}
              >
                <MDBIcon fas icon="envelope-square" className="me-2" size="2x" />
                <span className="mb-0">Bandeja de entrada</span>
              </MDBTabsLink>
            </MDBTabsItem>

            <MDBTabsItem>
              <MDBTabsLink
                style={{ color: "black" }}
                onClick={() => handleVerticalClick("tab2")}
                active={verticalActive === "tab2"}
                className={`baseTab d-flex align-items-center ${verticalActive === "tab2" ? "activeTab" : ""}`}
              >
                <MDBIcon fas icon="tasks" className="me-2" size="2x" />
                <span>Mis casos</span>
              </MDBTabsLink>
            </MDBTabsItem>

            <MDBTabsItem>
              <MDBTabsLink
                style={{ color: "black" }}
                onClick={() => handleVerticalClick("tab3")}
                active={verticalActive === "tab3"}
                className={`baseTab d-flex align-items-center ${verticalActive === "tab3" ? "activeTab" : ""}`}
              >
                <MDBIcon fas icon="file-archive" className="me-2" size="2x" />
                <span>Casos Finalizados</span>
              </MDBTabsLink>
            </MDBTabsItem>

          </MDBTabs>
        </MDBCol>
        <MDBCol lg={9}>
          <MDBTabsContent>
            <MDBTabsPane open={verticalActive === "1"}>
              <NOTIFICATION_General tramites={tramitesSolicitado} onAddTramite={handleAddTramites} />
            </MDBTabsPane>
            <MDBTabsPane open={verticalActive === "tab2"}>
              <TASKS_User tramites={tramitesEncurso} onVolver={handleTramites} onFinalizado={handleTramitesFinalizado} />
            </MDBTabsPane>
            <MDBTabsPane open={verticalActive === "tab3"}>
              <TASKS_Finalizados tramites={tramitesFinalizados} />
            </MDBTabsPane>
          </MDBTabsContent>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};

export default USER_Notificacion;
