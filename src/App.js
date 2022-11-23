import logo from './logo.svg';
import {Fragment} from 'react'
import {Routes, Route, BrowserRouter} from "react-router-dom"
import './App.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import VerVuelos from './componentes/VerVuelos'
import 'bootstrap/dist/css/bootstrap.min.css';

//< >
function App() {
  return (
    <>
    <BrowserRouter>
    <Navbar bg="primary" variant="dark">
        <Container>
          <Navbar.Brand href="/vervuelos">Vuelos</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#home">Ver Reservas</Nav.Link>
            <Nav.Link href="#features">Ver Pagos</Nav.Link>
          </Nav>
        </Container>
    </Navbar>

    <Routes>
      <Route path='/vervuelos' element={<VerVuelos/>}/>
    </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
