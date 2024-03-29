import { useEffect, useState } from "react";
import { getRequest } from "../../service/ApiService";
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
const [show, setShow] = useState(false);
const [description,setDestription] = useState();
const [errorShow,setErrorShow] =useState(false);
const navigate = useNavigate();
const [category,setCategory] = useState();
const [subCategory,setSubCategory] = useState();


    useEffect(() => {

        const id = sessionStorage.getItem("book_id");

        const getAllItems = async () => {
            const response = await getRequest(`/items/${id}`);
            setImage(response.data.image);
            setBookname(response.data.title);
            setAuther(response.data.author);
            setavailableQty(response.data.availableQty);
            setItemId(id);
            setPrice(response.data.price);
            setDestription(response.data.description);
            setCategory(response.data.subCategory.category.name);
            setSubCategory(response.data.subCategory.name)
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

         <div>
        <p class=" h3 fw-bold mb-5 mx-1 mx-md-4 mt-4">{bookname}</p>
        </div>
       
      <Row>
        <Col xs={12} s={12} md={4}>
          <Image src={`http://localhost:8081/uploads/${image}`} thumbnail className="br-4" />
        </Col>
        <Col xs={12} s={12} md={8}>
        <Card style={{ width: '36rem' }}>
      <Card.Header as="h5">Written By {auther}</Card.Header>
      <Card.Body>



        <Card.Title className="mt-3">Littel About Book..</Card.Title>
        <Card.Text className="mt-2">
          <p>{category} --- {subCategory}</p>
            <p className="book_destription">{description}</p>

            <p className="h5" style={{color:'#EF6B2B'}}>Rs. {price}</p>

        <p style={{color:'darkgreen'}}>{availableQty} Books In Stock</p>


        
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

      
        </>
    )
}

export default Item;