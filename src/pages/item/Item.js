import { useEffect, useState } from "react";
import { getRequest } from "../../service/ApiService";
import { Button, Card, Col, Container, Image, Row } from "react-bootstrap";

const Item =() =>{

const[image,setImage] = useState("");
const[bookname,setBookname] = useState('');
const[auther,setAuther] = useState('');
const[qty,setqty] = useState(1);
const[availableQty,setavailableQty] = useState(0);

    useEffect(() => {

        const id = sessionStorage.getItem("book_id");

        const getAllItems = async () => {
            const response = await getRequest(`/items/${id}`);
            setImage(response.data.image);
            setBookname(response.data.title);
            setAuther(response.data.author);
            setavailableQty(response.data.availableQty);
           console.log(response);
        }

        getAllItems();

    }, []);

    return(
        <>
         <Container>
         <div>
        <p class=" h3 fw-bold mb-5 mx-1 mx-md-4 mt-4">{bookname}</p>
        </div>
       
      <Row>
        <Col xs={6} md={4}>
          <Image src={`http://localhost:8081/uploads/${image}`} thumbnail />
        </Col>
        <Col xs={6} md={4}>
        <Card style={{ width: '36rem' }}>
      <Card.Header as="h5">Written By {auther}</Card.Header>
      <Card.Body>
        <Card.Title className="mt-3">Littel About Book..</Card.Title>
        <Card.Text className="mt-2">
            <p> Describe the main plot, theme, or idea only. Avoid details that may overwhelm or confuse a reader who's only taking a second or two to decide whether to find out more about your book. Also, keep your language short and simple. Aim for a 150-word paragraph with sentences that are easy to scan.
        </p>

        <Button variant="outline-success" onClick={()=>{setqty(qty-1);
            if( availableQty <qty < 2){setqty(1);}
        }}>-</Button> {qty} <Button variant="outline-success" onClick={()=>{setqty(qty+1)}}>+</Button>

<Button className="ms-3" variant="outline-success" >add To Cart 🛒</Button>
        </Card.Text>
        {/* <Button variant="primary">Go somewhere</Button> */}
      </Card.Body>
    </Card>
            </Col>
            </Row>

      
      
    </Container>
        </>
    )
}

export default Item;