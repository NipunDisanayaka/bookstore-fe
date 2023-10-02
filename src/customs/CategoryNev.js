import { Card, Col, Container, Row } from "react-bootstrap"

const CategoryNev = () =>{

    return(
        <Container>

    <Row >
      <Col xs={4} md={2} style={{backgroundColor:'#EEC0C0'}}>
        <a href="/items/novels" style={{ textDecoration: 'none',color:'black' }}>
         <center><img src="http://localhost:8081/uploads/nawakatha.webp" className="pt-3 pb-2"></img></center> 
          <p><center><b>Novels</b></center></p>
        </a>
      </Col>
      <Col xs={4} md={2} style={{backgroundColor:'#B4D997'}}>
        <a href="/items/fiction" style={{ textDecoration: 'none',color:'black' }}>
         <center><img src="http://localhost:8081/uploads/fiction.webp" className="pt-3 pb-2"></img></center> 
          <p><center><b>Fiction</b></center></p>
        </a>
      </Col>
      <Col xs={4} md={2} style={{backgroundColor:'#F2C5A1'}}>
        <a href="/items/children" style={{ textDecoration: 'none',color:'black' }}>
         <center><img src="http://localhost:8081/uploads/children.webp" className="pt-3 pb-2"></img></center> 
          <p><center><b>Children</b></center></p>
        </a>
      </Col>
      <Col xs={4} md={2} style={{backgroundColor:'#A0CADC'}}>
        <a href="/items/al" style={{ textDecoration: 'none',color:'black' }}>
         <center><img src="http://localhost:8081/uploads/translate.webp" className="pt-3 pb-2"></img></center> 
          <p><center><b>A/L</b></center></p>
        </a>
      </Col>
      <Col xs={4} md={2} style={{backgroundColor:'#EEC0C0'}}>
        <a href="/items/university" style={{ textDecoration: 'none',color:'black' }}>
         <center><img src="http://localhost:8081/uploads/nawakatha.webp" className="pt-3 pb-2"></img></center> 
          <p><center><b>University</b></center></p>
        </a>
      </Col>
      <Col xs={4} md={2} style={{backgroundColor:'#F2C5A1'}}>
        <a href="/items/otherEducational" style={{ textDecoration: 'none',color:'black' }}>
         <center><img src="http://localhost:8081/uploads/translate.webp" className="pt-3 pb-2"></img></center> 
          <p><center><b>Educational</b></center></p>
        </a>
      </Col>
    </Row>
        </Container>
    )
}

export default CategoryNev;