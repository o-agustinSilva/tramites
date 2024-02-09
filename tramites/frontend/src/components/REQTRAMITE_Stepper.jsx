import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import Container from "react-bootstrap/Container";
import { Box, Stepper, Step, StepLabel } from '@mui/material';
import REQTRAMITE_FirstStep from "../components/REQTRAMITE_FirstStep";
import REQTRAMITE_SecondStep from "../components/REQTRAMITE_SecondStep";
import REQTRAMITE_ThirdStep from "../components/REQTRAMITE_ThirdStep";
import axios from "axios";

const steps = [
  'Validación de datos',
  'Datos familiares',
  'Documentación adicional',
];

export function RequestTramite() {
  let { id } = useParams();
  const [tramite, setTramite] =useState([]);
  const [activeStep, setActiveStep] = useState(0);
 
  //obtengo el tramite con el ID que pasa por la URL
  useEffect(()=>{
     const fetchTramite= async ()=>{
           try{
               const response = await axios.get(`http://localhost:8000/api/get-tramite/${id}/`);
               const res= response.data;
                
               if(response.status === 200) setTramite(res);
             
           }catch(err){
            console.log(err);
           }
     }
     fetchTramite();
    
    }, []);
  
  
      // Si el trámite se ha cargado desde el backend, determinar qué pasos mostrar
      if (tramite) {
        // Lógica para determinar qué pasos mostrar según el tipo de trámite
        if (tramite.name === 'Certificado de Domicilio'||"Certificado de Extravio" ) {
         // Si el tipo de trámite es 'certificado_de_domicilio', mostrar los pasos 1 y 3
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
              <REQTRAMITE_FirstStep onNextStep={() => setActiveStep(2)} />
            ) :  activeStep === 2 ? (
              <REQTRAMITE_ThirdStep 
                onPreviousStep={() => setActiveStep(0)}
              />
            ) : null}
          </Container>
        );

        } else {
          // Si es otro tipo de trámite, mostrar los pasos 1, 2 y 3
          if(tramite.name === 'Certificado de Residencia'||'Certificado de Buena Conducta'){
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
        }
      }

  
}

export default RequestTramite;
