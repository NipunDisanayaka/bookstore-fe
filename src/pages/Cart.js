import { useEffect, useState } from "react";
import { Button, Container, Table } from "react-bootstrap";
import { getRequest } from "../service/ApiService";
import axios from "axios";



const Cart = () =>{

    const[items,setItems] = useState(null);
    const[itemNum,setItemNum] = useState(0);
    const[qty,setqty] = useState(1);
    
    

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

   return(
    <>
    <Container>
        <Table responsive>
            <thead>
                <tr>
                    <th>No</th>
                    <th>Item Name</th>
                    <th>Price</th>
                    <th> Qty  </th>
                    <th>Available Qty</th>
                    <th></th>
                    
                </tr>
            </thead>
            <tbody>
                {items && items.map(item => {

                    return (
                        <tr>
                            <td>{item.id}</td>
                            <td>{item.itemName}</td>
                            <td>{item.amount}</td>
                            <td><Button variant="outline-success" onClick={()=>{setqty(qty-1)}}>-</Button> {1} <Button variant="outline-success" onClick={()=>{setqty(qty+1)}}>+</Button></td>
                            <td>{item.availableQty}</td>
                            <td>
                                {/* <Button variant="secondary" size="sm">Edit</Button>&nbsp;
                                <Button variant="danger" size="sm">Delete</Button> */}
                            </td>
                            <td><Button variant="outline-danger" onClick={() => handleDelete(item.id)}>Delete 🗑️</Button></td>
                        </tr>
                    )
                })}
            </tbody>
        </Table>
        <div className="text-end">
            {/* <Button variant="primary" onClick={handleShow}>Add Item</Button> */}
        </div>
    </Container>
</>
   )
}

export default Cart;