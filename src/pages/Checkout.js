import { useEffect, useState } from "react";
import { Alert, Button, Card, Col, Container, Form, Row, Table } from "react-bootstrap";
import { getRequest } from "../service/ApiService";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Checkout = () =>{

    const[items,setItems] = useState(null);
    const userId = sessionStorage.getItem("user_id");
    let totalPay = 0;

    const[name,setname] = useState("");
    const[address1,setAddress1] = useState("");
    const[address2,setAddress2] = useState("");
    const[mobile,setMobile] = useState("");
    const[province,setProvince] = useState("");
    const[city,setCity] = useState("");
    const [registerEnabled, setRegisterEnabled] = useState(false);
    const [poceedEnabled, setProceedEnabled] = useState(false);
    const [show, setShow] = useState(false);

    const navigate = useNavigate();

    useEffect(() =>{
        const getAllCartItems = async () =>{
            const response = await getRequest(`/addToCart/user/${userId}`);
            console.log(response.data);
            setItems(response.data);
        }

        getAllCartItems();
    },[]);

    const handleOrder = (event) =>{
      event.preventDefault();
      setProceedEnabled(true);
      
    }

    const handleName = (event) =>{
      setname(event.target.value);
      if (name.length <= 4) {
        setRegisterEnabled(false);
        setProceedEnabled(false);
    } else {
        setRegisterEnabled(true);
    }
    }

    const handleMobile = (event) =>{
      setMobile(event.target.value);
      if (mobile.length <= 9) {
        setRegisterEnabled(false);
        setProceedEnabled(false);
    } else {
        setRegisterEnabled(true);
    }
    }

    const handleAddress1 = (event) =>{
      setAddress1(event.target.value);
      if (address1.length <= 4) {
        setRegisterEnabled(false);
        setProceedEnabled(false);
    } else {
        setRegisterEnabled(true);
    }
    }

    const handleAddress2 = (event) =>{
      setAddress2(event.target.value);
      if (address2.length <= 4) {
        setRegisterEnabled(false);
        setProceedEnabled(false);
    } else {
        setRegisterEnabled(true);
    }
    }

    const handleCity = (event) =>{
      setCity(event.target.value);
      if (city.length <= 4) {
        setRegisterEnabled(false);
        setProceedEnabled(false);
    } else {
        setRegisterEnabled(true);
    }
    }

    const handleProvince = (event) =>{
      setProvince(event.target.value);
      if (province.length <= 4) {
        setRegisterEnabled(false);
        setProceedEnabled(false);
    } else {
        setRegisterEnabled(true);
    }
    }

    function proceedSuccess() {
      
    
      return (
        <>
          <Alert show={show} variant="success">
            <Alert.Heading>Order Comfiremed successfully</Alert.Heading>
            <p>
             We take 1-3 bussiness days to create this item.On average your order will be sent out withing 2-3 days.
            </p>
            <hr />
            <div className="d-flex justify-content-end">
              <Button className="ms-3 mb-3" onClick={() => setShow(false)} variant="outline-success">
                Close me
              </Button>
              <Button className="ms-3 mb-3" onClick={() => navigate("/")} variant="outline-success">
               Home
              </Button>
            </div>
          </Alert>
        </>
      );
    }

    const handleProceedPay =async () =>{
        const data = {
            "name": name,
            "addressone": address1,
            "addresstwo": address2,
            "city": city,
            "province":province,
            "tp":mobile,
            "totalAmount":totalPay
    
        };

        try {
          const response = await axios.post("http://localhost:8081/shipping", data);
          console.log(response);
         

         } catch (error) {
          console.error("Something bad happened");
         }

         try {
          // const response = await getRequest(`/addToCart/delete/user/${sessionStorage.getItem('user_id')}`);
          // const response = await axios.get(`http://localhost:8081/addToCart/delete/user/${sessionStorage.getItem('user_id')}`)
          const response = await getRequest('/addToCart/delete');
          setShow(true);
         
         } catch (error) {
          console.log(error);
          
         }

        //  window.location.reload();
        //  setShow(true);
        
         
    }

    function TotalPay() {
      return (
        <Card className="text-center">
          <Card.Header>Procesing..</Card.Header>
          <Card.Body>
            <Card.Title>Total Amount Due</Card.Title>
            <Card.Text>
            <p class="text-center h3 fw-bold mb-5 mx-1 mx-md-4 mt-4">Rs : {totalPay}.00</p>
            </Card.Text>
            <div className="d-grid gap-2">
          <Button variant="success" size="lg" disabled={!poceedEnabled} onClick={handleProceedPay}>
           Proceed to Pay
          </Button>
          </div>
          </Card.Body>
          <Card.Footer className="text-muted"> Please Check again your Shipping Details</Card.Footer>
        </Card>
      );
    }

    function shippingDetailForm() {
        return (
          <Form onSubmit={handleOrder}>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridName">
                <Form.Label>Name</Form.Label>
                <Form.Control placeholder="Enter Your Name" value={name} onChange={handleName}/>
              </Form.Group>
      
              <Form.Group as={Col} controlId="formGridMobile">
                <Form.Label>Your Mobile No</Form.Label>
                <Form.Control placeholder="+9471-23456789" value={mobile} onChange={handleMobile} />
              </Form.Group>
            </Row>
      
            <Form.Group className="mb-3" controlId="formGridAddress1">
              <Form.Label>Address</Form.Label>
              <Form.Control placeholder="1234 Main St" value={address1} onChange={handleAddress1}/>
            </Form.Group>
      
            <Form.Group className="mb-3" controlId="formGridAddress2">
              <Form.Label>Address 2</Form.Label>
              <Form.Control placeholder="Apartment, studio, or floor" value={address2} onChange={handleAddress2}/>
            </Form.Group>
      
            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridCity">
                <Form.Label>City</Form.Label>
                <Form.Control placeholder="Your Closest City" value={city} onChange={handleCity}/>
              </Form.Group>
      
              <Form.Group as={Col} controlId="formGridState">
                <Form.Label>Province</Form.Label>
                <Form.Select defaultValue="Western Province" value={province} onChange={handleProvince}>
                  <option>Central Province</option>
                  <option>Eastern Province</option>
                  <option>Nothern Province</option>
                  <option>Southern Province</option>
                  <option>Western Province</option>
                  <option>North Western Province</option>
                  <option>North Central Province</option>
                  <option>Uva Province</option>
                  <option>Sabaragamuwa Province</option>
                </Form.Select>
              </Form.Group>
            </Row>

            <Row>
              <Col>
              <Button className="ms-3 mb-1" variant="primary" type="submit" disabled={!registerEnabled}>
              Submit
            </Button>
              </Col>

              <Col>
              <p className="text-primary">Please Enter the Submit before Proceed to Pay</p>
              </Col>
            </Row>
      
            
            
          </Form>
        );
      }

return(
    <>
    <Container>
    <Table responsive striped hover size="sm">
            <thead>
                <tr>
                    <th>No</th>
                    <th>Item Name</th>
                    <th>Price</th>
                    <th> Qty  </th>
                    <th>Total price per Item</th>
                    
                </tr>
            </thead>
            <tbody>
                {items && items.map(item => {
                        const subtotal = item.amount * item.qty;
                        // Add the subtotal to the totalPay
                        totalPay += subtotal;
                       
                    return (
                        <tr>
                            <td>{item.id}</td>
                            <td>{item.itemName}</td>
                            <td><p>Rs : {item.amount}</p></td>
                            <td>{item.qty}</td>
                           <td><p>Rs : {item.amount * item.qty}</p></td>

                           

                        </tr>
                    )
                })}
              
            </tbody>
            
        </Table>
        <div>
        <p class=" h3 fw-bold mb-5 mx-1 mx-md-4 mt-4">Enter you Shipping Details</p>
        </div>

        {shippingDetailForm()}
        {proceedSuccess()}
        
                <div className="mt-5">
                {TotalPay()}
                </div>
       
    </Container>
    </>
)
}

export default Checkout;