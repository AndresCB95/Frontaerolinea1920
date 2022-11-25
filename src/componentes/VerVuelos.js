import React, { useEffect, useState } from "react"
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
 
const VerVuelos = () => {

    /* 
    
    {
    "id_cliente":"1",
    "id_vuelo":"BM01",
    "sillas":2,
    "categoria":"ejecutiva",
    "valor_silla":100
    }
    
    
    */

    const [vuelos, setVuelos] = useState([])
    const [categoriaSilla, setCategoriaSilla] = useState([])
    const [num_sillas, setNum_sillas] = useState([])
    const [valor_silla, setValor_silla] = useState([])

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
    
    const request_reserva = (id_vuelo)=>{
        const id_client = localStorage.getItem("id_client")
        const reserva = {
            "id_cliente":id_client,
            "id_vuelo":id_vuelo,
            "sillas":num_sillas,
            "categoria":categoriaSilla,
            "valor_silla":valor_silla
        }
        console.log(reserva)

        fetch("http://localhost:8084/reservas",
        {
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(reserva)
        }

        )
            .then(
                (response)=>(response.json())
            )
            .then(
                (response)=>{
                        alert("RESERVA REALIZADA")
                }
            )
            .catch(
                (error)=>{
                    alert("Error en el llamado del API RESERVA")
                    console.log(error)
                }
            )
    }

    return(
        <Table striped bordered hover>
      <thead>
        <tr>
          <th>Id Vuelo</th>
          <th>Origen</th>
          <th>Destino</th>
          <th>Fecha</th>
          <th>Sillas a Reservar</th>
          <th>Acciones</th>
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
                        <td>
                            <div key={`inline-radio`} className="mb-3">
                            {
                                vuelo.sillas?.map(
                                    (sillas_elegir,index)=>{
                                        return(
                                            <Form.Check
                                                inline
                                                label={sillas_elegir.nombre}
                                                name="grupoRadioSilla"
                                                type="radio"
                                                id={`inline-radio-${index}`}
                                                onChange=
                                                {
                                                    (evento)=>{
                                                        setCategoriaSilla(sillas_elegir.nombre)
                                                        setValor_silla(sillas_elegir.preciounidad)
                                                    } 
                                                }
                                            />    
                                        )
                                    })
                            }
                            </div>

                            <InputGroup className="mb-3">
                                <Form.Control
                                    placeholder="# sillas a reservar"
                                    aria-describedby="basic-addon1"
                                    onChange={
                                        (evento)=>{
                                            setNum_sillas(Number(evento.target.value))
                                        }
                                    }
                                    />
                            </InputGroup>
                        </td>


                        <td>
                            <Button variant="primary"
                                onClick={
                                    (evento)=>{
                                        request_reserva(vuelo._id)
                                    }
                                }
                            >Reservar Vuelo</Button>
                        </td>
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