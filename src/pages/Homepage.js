import { Alert, Button, Card, Carousel, Col, Container, Row } from "react-bootstrap";
import { getRequest } from "../service/ApiService";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import CategoryNev from "../customs/CategoryNev";

const Homepage = () =>{

    const [educational,setEducational] = useState();
    const [leisure,setLeisure] = useState();
    const [items,setItems] = useState(null);
    const [cartError,setCartError] = useState(null);
    const [show, setShow] = useState(false);
    const [showAdded, setShowAdded] = useState(false);
    const navigate = useNavigate();
    const [bookTitle,setBookTitle] = useState();

    useEffect(() => {

        const getAllEducational = async () => {
            const response = await getRequest("/items/category/1");
           setEducational(response.data);
           console.log(response);
        }

       getAllEducational();

       const getAllLesure = async () => {
        const response = await getRequest("/items/category/2");
       setLeisure(response.data);
       console.log(response);
    }

   getAllLesure();

    }, []);


    const handleAddToCart = async (itemID,itemTitle,itemPrice,itemAvailableQty) =>{

        setBookTitle(itemTitle);

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
               <Alert.Heading>{bookTitle} is already added.</Alert.Heading>
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
                <Alert.Heading>Hey, You added {bookTitle} successfully.</Alert.Heading>
                <p>
                You can view your total payable and purchase book from cart
                </p>
              </Alert>
            );
          }
        }

       
        

return(
 <>
  <div>

 <Carousel data-bs-theme="light" className="mb-3">
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="http://localhost:8081/uploads/fair-1.jpg"
          alt="First slide"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="http://localhost:8081/uploads/home2.jpg"
          alt="Second slide"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="http://localhost:8081/uploads/home-1.jpg"
          alt="Third slide"
        />
      </Carousel.Item>
    </Carousel>

   {CategoryNev()}


   </div>

 <Container>

 <Card className="mt-3" style={{backgroundColor:'#F2F2F2'}}>
      <Card.Body>
      <p class="text-center m3-5 mx-1 mx-md-4 mt-3 text-secondary" >Best Educational Books</p>
        <p class="text-center h2 fw-bold m3-5 mb-5 mx-1 mx-md-4 mt-3" style={{color:'#1A2031'}}>Educational Books</p>

        {cartError &&      
                            <div>
                              {errorAlert()}
                            </div>
                        }

                     <div>
                              {successfullyAddedAlert()}
                            </div>

        <Row xs={1} md={5} className="g-4">
      {educational && educational.map(item => (
        <Col key={item.id}>
          <Card border="info" className="shadow-lg">
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

 <Container >
    
    <Card className="mt-5 " style={{backgroundColor:'#F4F5F9'}}>
         <Card.Body>
         <p class="text-center m3-5 mx-1 mx-md-4 mt-3 text-secondary">Books for your leisure time</p>
           <p class="text-center h2 fw-bold m3-5 mb-5 mx-1 mx-md-4 mt-3" style={{color:'#1A2031'}}>For Leisure Time</p>

           {cartError &&      
                            <div>
                              {errorAlert()}
                            </div>
                        }

                     <div>
                              {successfullyAddedAlert()}
                            </div>
   
           <Row xs={1} md={5} className="g-4">
         {leisure && leisure.map(item => (
           <Col key={item.id} >
             <Card border="info" className="shadow-lg">
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

export default Homepage;