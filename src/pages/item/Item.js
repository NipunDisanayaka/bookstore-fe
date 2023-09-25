import { useEffect, useState } from "react";
import { getRequest, postRequest } from "../../service/ApiService";
import { Alert, Button, Card, Col, Container, Image, Row } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Item =() =>{

const[image,setImage] = useState("");
const[bookname,setBookname] = useState('');
const[auther,setAuther] = useState('');
const[qty,setqty] = useState(1);
const[availableQty,setavailableQty] = useState(0);
const[itemId,setItemId] = useState(0);
const[price,setPrice] = useState(0);
const [showAdded, setShowAdded] = useState(false);
const [show, setShow] = useState(false);
const [errorShow,setErrorShow] =useState(false);
const navigate = useNavigate();


    useEffect(() => {

        const id = sessionStorage.getItem("book_id");

        const getAllItems = async () => {
            const response = await getRequest(`/items/${id}`);
            setImage(response.data.image);
            setBookname(response.data.title);
            setAuther(response.data.author);
            setavailableQty(response.data.availableQty);
            setItemId(id);
            setPrice(response.data.price)
           console.log(response);
        }

        getAllItems();

    }, []);

    const handleAddToCart = async () =>{

        console.log(itemId);
        console.log(sessionStorage.getItem("user_id"))
        const data = {
             
            "itemId": itemId,
            "itemName": bookname,
            "qty": qty,
            "amount": price,
            "availableQty": availableQty,
            "user": {
                "id": sessionStorage.getItem("user_id"),
                "username": sessionStorage.getItem("username"),
                "password": sessionStorage.getItem("user_password"),
                "email": sessionStorage.getItem("user_email")
            }
            
        
     };

     console.log(data);

   
    //  try {
    //     const response = await getRequest(`/addToCart/delete/${itemId}`)
    //      window.location.reload();
    //  } catch (error) {
    //      console.log(error);
    //  }
    try {
         const response = await axios.post("http://localhost:8081/addToCart", data);
        setShow(true);

       } catch (error) {
        setErrorShow(true);
        console.error("Something bad happened");
       }

    }

    return(
        <>
         <Container>
         <div>
        <p class=" h3 fw-bold mb-5 mx-1 mx-md-4 mt-4">{bookname}</p>
        </div>
       
      <Row>
        <Col xs={6} md={4}>
          <Image src={`http://localhost:8081/uploads/${image}`} thumbnail className="br-4" />
        </Col>
        <Col xs={6} md={4}>
        <Card style={{ width: '36rem' }}>
      <Card.Header as="h5">Written By {auther}</Card.Header>
      <Card.Body>
        <Card.Title className="mt-3">Littel About Book..</Card.Title>
        <Card.Text className="mt-2">
            <p> Describe the main plot, theme, or idea only. Avoid details that may overwhelm or confuse a reader who's only taking a second or two to decide whether to find out more about your book. Also, keep your language short and simple. Aim for a 150-word paragraph with sentences that are easy to scan.
        </p>

        <>
         <Alert show={show} variant="success">
           <Alert.Heading>successfully Book added to the Cart</Alert.Heading>
           <p>
             You can view your total payable and purchase book from cart
           </p>
           <hr />
           <div className="d-flex justify-content-end">
             <Button className="ms-3" onClick={() => setShow(false)} variant="outline-success">
               Close me
             </Button>
             <Button className="ms-3" onClick={() => navigate("/cart")} variant="outline-success">
              Go to Cart
             </Button>
           </div>
         </Alert>

         <>
         <Alert show={errorShow} variant="warning">
           <Alert.Heading>This Book is already added.</Alert.Heading>
           <p>
             If you want to update quantity Please go to the Shoppingcart and update.
           </p>
           <hr />
           <div className="d-flex justify-content-end">
             <Button className="ms-3" onClick={() => setErrorShow(false)} variant="outline-success">
               Close me
             </Button>
             <Button className="ms-3" onClick={() => navigate("/cart")} variant="outline-success">
              Go to Cart
             </Button>
           </div>
         </Alert>
       </>
       </>



        <Button variant="outline-success" onClick={()=>{setqty(qty-1);
            if( availableQty <qty < 2){setqty(1);}
        }}>-</Button> {qty} <Button variant="outline-success" onClick={()=>{setqty(qty+1)}}>+</Button>

<Button className="ms-3" variant="outline-success" onClick={handleAddToCart}>add To Cart 🛒</Button>
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