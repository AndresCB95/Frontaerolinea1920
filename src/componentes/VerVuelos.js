import React, { useEffect, useState } from "react"
import Table from 'react-bootstrap/Table';
 
const VerVuelos = () => {

    const [vuelos, setVuelos] = useState([])

    useEffect(
        ()=>{
            fetch("http://localhost:8081/vuelos")
            .then(
                (response)=>(response.json())
            )
            .then(
                (response)=>{
                        setVuelos(response)
                }
            )
            .catch(
                (error)=>{
                    alert("Error en el llamado del API VUELO")
                    console.log(error)
                }
            )
        },
        []
        )
    


    return(
        <Table striped bordered hover>
      <thead>
        <tr>
          <th>Id Vuelo</th>
          <th>Origen</th>
          <th>Destino</th>
          <th>Fecha</th>
        </tr>
      </thead>
      <tbody>
        
        {
            vuelos?.map(
                (vuelo,index)=>{
                    return( 
                    <tr>
                        <td>{vuelo._id}</td>
                        <td>{vuelo.origen}</td>
                        <td>{vuelo.destino}</td>
                        <td>{vuelo.fecha}</td>
                    </tr>
                    )
                }
            )
        }
       
       
      </tbody>
    </Table>
    )


}

export default VerVuelos