import { useEffect, useState } from "react";
import { Button, Card, Container, Table } from "react-bootstrap";
import { getRequest } from "../service/ApiService";
import axios from "axios";
import { useNavigate } from "react-router-dom";



const Cart = () =>{

    const[items,setItems] = useState(null);
    const[qty,setqty] = useState(1);
    let totalPay = 0;
    const navigate = useNavigate();
    
    

    const userId = sessionStorage.getItem("user_id");

    useEffect(() =>{
        const getAllCartItems = async () =>{
            const response = await getRequest(`/addToCart/user/${userId}`);
            console.log(response.data);
            setItems(response.data);
        }

        getAllCartItems();
    },[]);

    const handleDelete = async (itemId) =>{
        
        try {
           const response = await getRequest(`/addToCart/delete/${itemId}`)
            window.location.reload();
        } catch (error) {
            console.log(error);
        }
       
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
            <Button variant="success" size="lg" onClick={() =>{navigate("/cart/checkout")}}>
             Proceed to Checkout
            </Button>
            </div>
            </Card.Body>
            <Card.Footer className="text-muted"> Please Check again your Shoppingcart Book list</Card.Footer>
          </Card>
        );
      }

    //   const handleProceed = () =>{
    //      navigate('/cart/checkout');
    //   }

    

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
                    <th>Available Qty</th>
                    <th> </th>
                    
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
                            <td><Button variant="outline-success" onClick={()=>{setqty(qty-1)}}>-</Button> {item.qty} <Button variant="outline-success" onClick={()=>{setqty(qty+1)}}>+</Button></td>
                           <td><p>Rs : {item.amount * item.qty}</p></td>
                            <td>{item.availableQty}
                            {/* {totalpay=totalpay+(item.amount * item.qty)} */}
                            </td>
                            
                            {/* <td>
                                <Button variant="secondary" size="sm">Edit</Button>&nbsp;
                                <Button variant="danger" size="sm">Delete</Button>
                            </td> */}
                            <td><Button variant="outline-danger" onClick={() => handleDelete(item.id)}>Delete 🗑️</Button></td>

                        </tr>
                    )
                })}
              
            </tbody>
            
        </Table>
                <div>
                    {TotalPay()}
                </div>
                
        <div className="text-end">
            {/* <Button variant="primary" onClick={handleShow}>Add Item</Button> */}
        </div>
    </Container>
</>
   )
}

export default Cart;