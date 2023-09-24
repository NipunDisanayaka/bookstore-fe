import { useEffect, useState } from "react"
import { Alert, Button, Card, Col, Container, Row, Table } from "react-bootstrap"
import { getRequest, postRequest } from "../../service/ApiService";
import axios from "axios";


const AdvanceLevel = () =>{
    const [items,setItems] = useState(null);
    const [cartError,setCartError] = useState(null);
    const [show, setShow] = useState(false);
    const [showAdded, setShowAdded] = useState(false);


    useEffect(() => {

        const getAllItems = async () => {
            const response = await getRequest("/items/subCategory/1");
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
          <Alert variant="danger" onClose={() => setShow(false)} dismissible>
            <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
            <p>
              Change this and that and try again. Duis mollis, est non commodo
              luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit.
              Cras mattis consectetur purus sit amet fermentum.
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
               Change this and that and try again. Duis mollis, est non commodo
               luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit.
               Cras mattis consectetur purus sit amet fermentum.
             </p>
           </Alert>
         );
       }
     }

    return(
        <>
        <Container>

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
            <Card.Img variant="top" src={`http://localhost:8081/uploads/${item.image}`} />
            <Card.Body>
              <Card.Title>{item.title}</Card.Title>
              

              <Card.Text>
                    hgfhytfhjkiyjtytj
              </Card.Text>

             
             
              <Button variant="outline-success" onClick={() => handleAddToCart(item.id,item.title,item.price,item.availableQty)}>add To Cart 🛒</Button>
            
                        
              
            </Card.Body>
          </Card>
        </Col>
        
      ))}

                
    </Row>
   
        </Container>
        
        
        </>
    )
}

export default AdvanceLevel;