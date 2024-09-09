import React from 'react'
import ComprobantePago from '../pdf/ComprobantePago'

const TRAMITE_Comprobante = ({tramiteId}) => {
  return (
      <ComprobantePago tramiteId={tramiteId}/>
  )
}

export default TRAMITE_Comprobante