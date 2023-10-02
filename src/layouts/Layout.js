import { Link, Outlet } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Col, NavDropdown, Row } from "react-bootstrap";

const Layout = () =>{
    return(
        <>
        <div style={{backgroundColor:'#563D7C', height: '35px'}} className="d-none d-md-block d-lg">
            <Container style={{backgroundColor:'#563D7C'}} className="mb-3">
            <Row>
        <Col xs={6} md={4}>
        <p class="text-white  pr-4 pt-1">E-mail:<a href="https://mail.google.com" style={{ textDecoration: 'none',color:'white' }}>bookstore32@gmail.com</a> </p>
        </Col>
        <Col xs={6} md={4}>
        <p class="text-white pt-1">Call us for Orders: +94714022868</p>
        </Col>
       
      </Row>
            </Container>
        </div>
       
         <div>
            <Navbar expand="lg" className="bg-body-tertiary">
                <Container> <Navbar.Brand href="#home">
            <img
              src="http://localhost:8081/uploads/logob.png"
              width="30"
              height="30"
              className="d-inline-block align-top"
              alt="React Bootstrap logo"
            />
          </Navbar.Brand>

                    <Navbar.Brand href="/"> <p class="text-center h5 fw-bold" style={{color:'#EF6B2B'}} >Books_Store</p></Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="/">Home</Nav.Link>

                            <NavDropdown title="Books" id="basic-nav-dropdown">
              <NavDropdown.Item href="/items">All Books</NavDropdown.Item>
              <NavDropdown.Divider />
                        
                    <NavDropdown title="Education">
                        <NavDropdown.Item href="/items/al">A/L</NavDropdown.Item>
                        <NavDropdown.Item href="/items/university">University</NavDropdown.Item>
                        <NavDropdown.Item href="/items/otherEducational">Other Educational</NavDropdown.Item>
                    </NavDropdown>

                    <NavDropdown title="Lesure">
                        <NavDropdown.Item href="/items/novels">Novels</NavDropdown.Item>
                        <NavDropdown.Item href="/items/fiction">Fictions</NavDropdown.Item>
                        <NavDropdown.Item href="/items/children">Cheldren</NavDropdown.Item>
                    </NavDropdown>

            </NavDropdown>
                            <Nav.Link href="/Cart">Cart 🛒</Nav.Link>
                            <Nav.Link href="/aboutus">About Us</Nav.Link>
                        </Nav>

                        
                    </Navbar.Collapse>
                    <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            Signed in : {sessionStorage.getItem("username")}
          </Navbar.Text>
          <NavDropdown title="">
                        <NavDropdown.Item href="/signOut">Sign Out</NavDropdown.Item>
            </NavDropdown>
        </Navbar.Collapse>
                </Container>
            </Navbar>

            <Container className="py-4">
                <Outlet />
            </Container>



            <footer className="bg-body-tertiary py-3"  style={{backgroundColor:'#282A35'}}>
               
                    <div style={{backgroundColor:'#282A35'}} className="pb-3">
                        <p className="footerContentTitle" style={{color:'whitesmoke'}}><center>Books_Store</center></p>
                        <p style={{color:'whitesmoke'}} className="footerContent">A book description is a short summary of a book's story or content that is designed to “hook” a reader and lead to a sale. Typically, the book's description conveys important information about its topic or focus (in nonfiction) or the plot and tone (for a novel or any other piece of fiction).</p>

                        <p style={{color:'whitesmoke'}} className="footerContent">Call Us : +94452275775</p>
                        <p style={{color:'whitesmoke'}} className="footerContent">E-mail : bookstore32@gmail.com</p>
                        <p style={{color:'whitesmoke'}} className="footerContent">Main Branch : No 56, Flower Road , Colombo</p>

                        <p style={{color:'whitesmoke'}} className="footerContent">Created By NipunDisanayaka _ _ nipundisanayaka56@gmail.com</p>

                    </div>
               
            </footer>
        </div>
        </>
    )
}

export default Layout;