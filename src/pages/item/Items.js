import { useEffect, useState } from "react"
import { Card, Col, Container, Row, Table } from "react-bootstrap"
import { getRequest } from "../../service/ApiService";

const Items = () =>{
    const [items,setItems] = useState(null);

    useEffect(() => {

        const getAllItems = async () => {
            const response = await getRequest("/items");
            setItems(response.data);
        }

        getAllItems();

    }, []);

    return(
        <>
        <Container>
            {/* <div>
                <Table responsive>
                    <thead>
                    <tr>
                            <th>ID</th>
                            <th>Item Name</th>
                            <th>Price</th>
                            <th>Available Qty</th>
                            <th>Category</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items && items.map(item => {
                            return (
                                <tr>
                                    <td>{item.id}</td>
                                    <td>{item.title}</td>
                                    <td>{item.price}</td>
                                    <td>{item.availableQty}</td>
                                    <td>{item.subCategory.name}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </Table>
            </div> */}

    <Row xs={1} md={2} className="g-4">
      {items && items.map(item => (
        <Col key={item.id}>
          <Card border="info">
            <Card.Img variant="top" src="holder.js/100px160" />
            <Card.Body>
              <Card.Title>{item.title}</Card.Title>
              <Card.Text>
                    hgfhytfhjkiyjtytj
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
        </Container>
        
        </>
    )
}

export default Items