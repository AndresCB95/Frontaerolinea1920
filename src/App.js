import logo from './logo.svg';
import {Fragment} from 'react'
import {Routes, Route, BrowserRouter} from "react-router-dom"
import './App.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import VerVuelos from './componentes/VerVuelos'
import VerReservas from './componentes/VerReservas';
import 'bootstrap/dist/css/bootstrap.min.css';

//< >
function App() {
  if(localStorage.getItem("id_client")==null){
    localStorage.setItem("id_client","1")
  }


  return (
    <>
    <BrowserRouter>
    <Navbar bg="primary" variant="dark">
        <Container>
          <Navbar.Brand href="/vervuelos">Vuelos</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/verreservas">Ver Reservas</Nav.Link>
            <Nav.Link href="#features">Ver Pagos</Nav.Link>
          </Nav>
        </Container>
    </Navbar>

    <Routes>
      <Route path='/vervuelos' element={<VerVuelos/>}/>
      <Route path='/verreservas' element={<VerReservas/>}/>
      
    </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
