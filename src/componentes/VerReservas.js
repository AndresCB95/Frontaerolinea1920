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

        /*

            {
                "valorTotal":0,
                "id_reserva":"",
                "estado_pago":"",
                "medio_pago":{}
            }
        */

    const [reserva, setReserva] = useState({})
    const [valorTotal, setValorTotal] = useState(0)
    const [medioPagoSelect, setMedioPagoSelect] = useState("")
    const [mediopagos, setMedioPagos] = useState(
        [
            {
                "banco":"Banco Udea",
                "medio":"TC",
                "franquicia":"VIUDEA"
            },
            {
                "banco":"Banco AntUdea",
                "medio":"TC",
                "franquicia":"VIUDEA"
            },
            {
                "banco":"Banco Udea",
                "medio":"TD",
                "franquicia":"VIUDEA"
            },
            {
                "banco":"Banco Udea",
                "medio":"CA",
                "franquicia":"VIUDEA"
            }
        ]
        )


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
    
    const request_pago= (id_reserva)=>{
        const pago = {
            "valorTotal":valorTotal,
            "id_reserva":id_reserva,
            "estado_pago":"Aprobado",
            "medio_pago":JSON.parse(medioPagoSelect)
        }

        fetch("http://localhost:8083/pagos",
        {
            method:"POST",
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(pago)
        })
        .then(
            (respuesta)=>{
                alert("PAGO REGISTRADO")
            }
        )
        .catch(
            (error)=>{
                alert("ERROR EN EL PAGO")
            }
        )
    }

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
       <td></td>
       <td></td>
       <td>Valor Total </td>
       <td>{valorTotal}</td>
       <td>
       <Form.Select aria-label="Default select example"
       onChange={
        (evento)=>{setMedioPagoSelect(evento.target.value)}
       }
       >
                <option>Seleciona Medio Pago</option>
                {
                    mediopagos.map(
                        (medioPago,index)=>{
                            return(
                                <option value={JSON.stringify(medioPago)}>{medioPago.banco} - {medioPago.medio}</option>
                            )
                        }
                    )
                }
        </Form.Select>
        </td>

        <td>
            <Button variant="primary"
                onClick={
                    (evento)=>{
                        request_pago(reserva._id)
                    }
                }
            >Pagar Reserva</Button>
        </td>

       </tr>
       
      </tbody>
    </Table>
    )


}

export default VerReservas