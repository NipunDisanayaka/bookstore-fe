import { Link, Outlet } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavDropdown } from "react-bootstrap";

const Layout = () =>{
    return(
        <>
         <div>
            <Navbar expand="lg" className="bg-body-tertiary">
                <Container>
                    <Navbar.Brand href="#home">Book_Store</Navbar.Brand>
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
                        </Nav>
                    </Navbar.Collapse>
                    <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            Signed in : {sessionStorage.getItem("username")}
          </Navbar.Text>
        </Navbar.Collapse>
                </Container>
            </Navbar>

            <Container className="py-4">
                <Outlet />
            </Container>



            <footer className="bg-body-tertiary py-3">
                <Container>
                    This is the footer
                </Container>
            </footer>
        </div>
        </>
    )
}

export default Layout;