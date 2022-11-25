import React, { useEffect, useState } from "react"
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
 
const VerReservas = () => {

    /* 
    {
        "_id": {
            "$oid": "63800b9a31458c777b6de27d"
        },
        "id_client": "01",
        "estado_reserva": "pendiente",
        "sillas": [
            {
            "id_cliente": "01",
            "id_vuelo": "BM01",
            "sillas": 5,
            "categoria": "economicas",
            "valor_silla": 100000
            }
        ]
        }
    */

    const [reserva, setReserva] = useState({})
    const [valorTotal, setValorTotal] = useState(0)

    useEffect(
        ()=>{
            const id_client = localStorage.getItem("id_client")
            fetch("http://localhost:8084/reservas?id_client="+id_client)
            .then(
                (response)=>(response.json())
            )
            .then(
                (response)=>{
                        setReserva(response)
                        let suma = 0;
                        for(let i = 0 ; i<response.sillas.length; i++){
                            let silla_sele = response.sillas[i]
                            let suma_parcial = silla_sele.valor_silla * silla_sele.sillas
                            suma += suma_parcial
                        }
                        setValorTotal(suma)
                }
            )
            .catch(
                (error)=>{
                    alert("Error en el llamado del API RESERVA")
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
          <th>Id Cliente</th>
          <th>Nombre Silla</th>
          <th>Numero Silla</th>
          <th>Valor Unitario</th>
          <th>Valor Total Silla</th>
        </tr>
      </thead>
      <tbody>
        
        {
            reserva.sillas?.map(
                (silla_reservada,index)=>{
                    
                    return( 
                    <tr>
                        <td>{silla_reservada.id_vuelo}</td>
                        <td>{silla_reservada.id_cliente}</td>
                        <td>{silla_reservada.categoria}</td>
                        <td>{silla_reservada.sillas}</td>
                        <td>{silla_reservada.valor_silla}</td>
                        <td>{silla_reservada.valor_silla * silla_reservada.sillas}</td>
                    </tr>
                    )
                }
            )
        }
       
       <tr>

       <td>Valor Total {valorTotal}</td>

       </tr>
       
      </tbody>
    </Table>
    )


}

export default VerReservas