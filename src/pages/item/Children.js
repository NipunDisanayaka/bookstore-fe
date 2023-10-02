import { useEffect, useState } from "react"
import { Alert, Button, Card, Col, Container, Navbar, Row, Table } from "react-bootstrap"
import { getRequest, postRequest } from "../../service/ApiService";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const Children = () =>{
    const [items,setItems] = useState(null);
    const [cartError,setCartError] = useState(null);
    const [show, setShow] = useState(false);
    const [showAdded, setShowAdded] = useState(false);
    const navigate = useNavigate();


    useEffect(() => {

        const getAllItems = async () => {
            const response = await getRequest("/items/subCategory/6");
            setItems(response.data);
        }

        getAllItems();

    }, []);


    const handleAddToCart = async (itemID,itemTitle,itemPrice,itemAvailableQty) =>{

        const data = {
             
          "itemId": itemID,
          "itemName": itemTitle,
          "qty": 1,
          "amount": itemPrice,
          "availableQty": itemAvailableQty,
          "user": {
              "id": sessionStorage.getItem("user_id"),
              "username": sessionStorage.getItem("username"),
              "password": sessionStorage.getItem("user_password"),
              "email": sessionStorage.getItem("user_email")
          }
      
  };
       
         try {
          const response = await axios.post("http://localhost:8081/addToCart", data);
          setCartError("");
          setShowAdded(true);
         } catch (error) {
          console.error("Something bad happened");
          setShow(true);
          setCartError("Item is already added.");
         }
 
        
     }


     function errorAlert() {
     ;
    
      if (show) {
        return (
          <Alert variant="warning" onClose={() => setShow(false)} dismissible>
            <Alert.Heading>This Book is already added.</Alert.Heading>
            <p>
            You can view your total payable and purchase book from cart
            </p>
          </Alert>
        );
      }
    }

    function successfullyAddedAlert() {
      ;
     
       if (showAdded) {
         return (
           <Alert variant="success" onClose={() => setShowAdded(false)} dismissible>
             <Alert.Heading>Hey, You added Book Item successfully.</Alert.Heading>
             <p>
             You can view your total payable and purchase book from cart
             </p>
           </Alert>
         );
       }
     }

    return(
        <>

        <Container>
        <Card className="mt-5 " style={{backgroundColor:'#F4F5F9'}}>
         <Card.Body>
         <p class="text-center m3-5 mx-1 mx-md-4 mt-3 text-info">Books for your leisure time</p>
           <p class="text-center h2 fw-bold m3-5 mb-5 mx-1 mx-md-4 mt-3" style={{color:'#083A79'}}>Books for Children</p>

        {cartError &&
                            // <div className='text-danger mb-3'>
                            //     {cartError}
                      
                            // </div>
                         
                            <div>
                              {errorAlert()}
                            </div>
                        }

                     <div>
                              {successfullyAddedAlert()}
                            </div>

    <Row xs={1} md={4} className="g-4">
      {items && items.map(item => (
        <Col key={item.id}>
          <Card border="info">
            <Card.Img className="cardImage" variant="top" src={`http://localhost:8081/uploads/${item.image}`} />
            <Card.Body>
              <Card.Title>{item.title}</Card.Title>
              

              <Card.Text>
              <p>Written By {item.author}</p>
              </Card.Text>

              <Card.Text>
                 <p className="h6" style={{color:'#EF6B2B'}}>Rs. {item.price}</p>
                 </Card.Text>
             
              <Button className="mb-3" variant="outline-success" onClick={() => handleAddToCart(item.id,item.title,item.price,item.availableQty)}>🛒</Button>
              <Button className="ms-3 mb-3" variant="outline-success" onClick={() =>{navigate("/items/id"); sessionStorage.setItem("book_id",item.id);}}>👁️‍🗨️</Button>
                        
              
            </Card.Body>
          </Card>
        </Col>
        
      ))}

                
    </Row>
   
      
    </Card.Body>
       </Card>
        </Container>
        
        
        </>
    )
}

export default Children;