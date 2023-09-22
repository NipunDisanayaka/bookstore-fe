import { Container } from "react-bootstrap";

const Additems = () => {
    const [itemName, setItemName] = useState("");
    const [price, setPrice] = useState(0);
    const [qty, setQty] = useState(0);

    const addItem = async (event) => {
        event.preventDefault();

        const data = {
            "name": itemName,
            "qty": qty,
            "price": price,
        }

        const response = await postRequest("/items",data);

        if(response && response.status === 201) {
            setItems([...items,response.data]);
            setItemName("");
            setQty(0);
            setPrice(0);
            handleClose();
        } else {
            //show error
        }
    }
    return(
        <>
        <Container>
            <div>
            <Form onSubmit={handleRegister}>
                    <FloatingLabel controlId='itemname' label="Select a Item name" className='mb-3'>
                     <Form.Control placeholder='Add the Item name' value={itemName} onChange={(event) =>{
                        setItemName(event.target.value)
                     }} />
                    </FloatingLabel>

                    <FloatingLabel controlId="price" label="Item Price" className='mb-3'>
                            <Form.Control placeholder='Add the Item Price' value={price} onChange={(event) =>{
                                setPrice(event.target.value)
                            }}  />
                        </FloatingLabel>

                        <FloatingLabel controlId="qty" label="Enter the Quantity" className='mb-3'>
                            <Form.Control placeholder='Enter the Quentity' value={qty} onChange={(event)=>{
                                setQty(event.target.value)
                            }} />
                        </FloatingLabel>


                        <div className='text-end'>
                            <Button type="submit" variant="primary" disabled={!registerEnabled}>Sign Up</Button>
                           
                        </div>

                </Form>
            </div>
        </Container>
        </>
    )
}

export default Additems;