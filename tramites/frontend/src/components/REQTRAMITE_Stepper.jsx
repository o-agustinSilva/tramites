import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import { Box, Stepper, Step, StepLabel } from '@mui/material';
import REQTRAMITE_FirstStep from "../components/REQTRAMITE_FirstStep";
import REQTRAMITE_SecondStep from "../components/REQTRAMITE_SecondStep";
import REQTRAMITE_ThirdStep from "../components/REQTRAMITE_ThirdStep";

const steps = [
  'Validación de datos',
  'Datos familiares',
  'Documentación adicional',
];

export function RequestTramite() {
  const [activeStep, setActiveStep] = useState(0);

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

      {activeStep === 0 ? (
        <REQTRAMITE_FirstStep onNextStep={() => setActiveStep(1)} />
      ) : activeStep === 1 ? (
        <REQTRAMITE_SecondStep
          onNextStep={() => setActiveStep(2)}
          onPreviousStep={() => setActiveStep(0)}
        />
      ) : activeStep === 2 ? (
        <REQTRAMITE_ThirdStep 
          onPreviousStep={() => setActiveStep(1)}
        />
      ) : null}
    </Container>
  );
}

export default RequestTramite;
