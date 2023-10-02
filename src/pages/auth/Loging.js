
import axios from "axios";
import { useState } from "react"
import { Button, Container, FloatingLabel, Form, Navbar } from "react-bootstrap"
import { useNavigate } from "react-router-dom";


const Login = () =>{

    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");
    const [error,setError] = useState("");
    const navigate = useNavigate();

    const handleUsername = (event) =>{
        setUsername(event.target.value);
    }

    const handlePassword = (event) =>{
        setPassword(event.target.value);
    }

    const handleSubmit = async (event) =>{
        event.preventDefault();

        const data = {
            "username":username,
            "password":password
        }

        try {
            const response = await axios.post("http://localhost:8081/auth/login", data);
            setError("");
            setUsername("");
            setPassword("");

            sessionStorage.setItem('token',response.data.token);
            sessionStorage.setItem('username', response.data.username);
            sessionStorage.setItem('user_id',response.data.id);
            sessionStorage.setItem('user_email',response.data.email);
            sessionStorage.setItem('user_password',response.data.password);
            axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;

            navigate("/");

        } catch (error) {
            setError("Username or Password is wrong");
        }
    }

    return(
        <>
          
        <Container>
            <div className="login-box">
                <div className="text-center">
                <Container>
          <Navbar.Brand href="#home">
            <img
              alt=""
              src="http://localhost:8081/uploads/logob.png"
              width="30"
              height="30"
              className="d-inline-block align-top"
            />{' '}
           <p class="text-center h5 fw-bold" style={{color:'#EF6B2B'}} >Books_Store</p>
          </Navbar.Brand>
        </Container>
                <p class="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign Up</p>
                </div>

                <Form onSubmit={handleSubmit}>
                    <FloatingLabel controlId='username' label="Select a Username" className='mb-3'>
                     <Form.Control placeholder='Select a Username' value={username} onChange={handleUsername} />
                    </FloatingLabel>

                    <FloatingLabel controlId="password" label="Select a Password" className='mb-3'>
                            <Form.Control type="password" placeholder='Enter Password' value={password} onChange={handlePassword}  />
                        </FloatingLabel>

                        {error &&
                            <div className='text-danger mb-3'>
                                {error}
                            </div>
                        }

                        <div className='text-end'>
                            <Button type="submit" variant="primary">Sign Up</Button>
                           
                        </div>

                        <div>
                            <p><a href="/register" style={{textDecoration:'none'}}>Don't have an account ?</a></p>
                        </div>

                </Form>
            </div>
       </Container>
        
     
       </>
    )
}


export default Login