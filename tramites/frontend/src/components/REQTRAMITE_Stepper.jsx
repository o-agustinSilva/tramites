import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import Container from "react-bootstrap/Container";
import { Box, Stepper, Step, StepLabel } from '@mui/material';
import REQTRAMITE_FirstStep from "../components/REQTRAMITE_FirstStep";
import REQTRAMITE_SecondStep from "../components/REQTRAMITE_SecondStep";
import REQTRAMITE_ThirdStep from "../components/REQTRAMITE_ThirdStep";
import axios from "axios";

const steps = [
];

export function RequestTramite() {
  let { id } = useParams();
  const [tramite, setTramite] = useState([]);
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({});

  const updateFormData = (data) => {
    setFormData(prevData => ({
      ...prevData,
      ...data
    }));
  };

  //obtengo el tramite con el ID que pasa por la URL
  useEffect(() => {
    const fetchTramite = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/get-tramite/${id}/`);
        const res = response.data;

        if (response.status === 200) setTramite(res);

      } catch (err) {
        console.log(err);
      }
    }
    fetchTramite();
  }, []);

  const setSteps = (s) => {
    steps.splice(0, steps.length);

    s.forEach((step) => {
      steps.push(step);
    })
  }

  return (
    <Container className="mt-3 mb-5">
      <Box sx={{ width: '100%' }}>
        <Stepper activeStep={activeStep} alternativeLabel >
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel >{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </Box>

      {tramite?.requirement?.length > 1 && setSteps(['Datos personales', 'Información adicional', 'Documentación adicional'])}
      {tramite?.requirement?.length == 1 && setSteps(['Datos personales', 'Documentación adicional'])}

      {tramite?.requirement?.length > 1 ?
        <>
          {activeStep === 0 ? (
            <REQTRAMITE_FirstStep
              onNextStep={() => setActiveStep(1)}
              tramite={tramite}
            />
          ) : activeStep === 1 ? (
            <REQTRAMITE_SecondStep
              onNextStep={() => setActiveStep(2)}
              onPreviousStep={() => setActiveStep(0)}
              tramite={tramite}
            />
          ) : activeStep === 2 ? (
            <REQTRAMITE_ThirdStep
              tramite={tramite}
              onPreviousStep={() => setActiveStep(1)}
            />
          ) : null}
        </> :
        <>
          {activeStep === 0 ? (
            <REQTRAMITE_FirstStep
              onNextStep={() => setActiveStep(1)}
            />
          ) : activeStep === 1 ? (
            <REQTRAMITE_ThirdStep
              tramite={tramite}
              onPreviousStep={() => setActiveStep(0)}
            />
          ) : null}
        </>
      }


    </Container>
  );
}


export default RequestTramite;
