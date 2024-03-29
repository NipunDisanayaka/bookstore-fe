import { useState } from "react"
import { Button, Container, FloatingLabel, Form, Navbar } from "react-bootstrap"
import axios from "axios";
import { useNavigate } from 'react-router-dom'


const Register = () =>{
    
    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");
    const [email,setEmail] = useState("");
    const [registerEnabled, setRegisterEnabled] = useState(false);

    const [error, setError] = useState("");

     const navigate = useNavigate();


    const handleUsername = (event) => {
        setUsername(event.target.value);

        if (username.length <= 5) {
            setRegisterEnabled(false);
        } else {
            setRegisterEnabled(true);
        }
    } 

    const handlePassword = (event) => {
        setPassword(event.target.value);

        if (password.length < 6) {
            setRegisterEnabled(false);
        } else {
            setRegisterEnabled(true);
        }
    }

    const handleEmail = (event) => {
        setEmail(event.target.value);
        const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;

        if (email !== "" && regex.test(email)) {
            setRegisterEnabled(true);
        } else {
            setRegisterEnabled(false);
        }
    }

    const handleRegister = async (event) => {
        event.preventDefault();

        const data = {
            'username': username,
            'password': password,
            'email': email
        };

        try {
            const response = await axios.post('http://localhost:8081/auth/register', data);
            navigate("/login");
            setError("");
        } catch (error) {
            setError(error.response.data.message);
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
                <p class="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Register</p>
                </div>

                <Form onSubmit={handleRegister}>
                    <FloatingLabel controlId='username' label="Select a Username" className='mb-3'>
                     <Form.Control placeholder='Select a Username' value={username} onChange={handleUsername} />
                    </FloatingLabel>

                    <FloatingLabel controlId="password" label="Select a Password" className='mb-3'>
                            <Form.Control type="password" placeholder='Enter Password' value={password} onChange={handlePassword}  />
                        </FloatingLabel>

                        <FloatingLabel controlId="email" label="Enter your Email Address" className='mb-3'>
                            <Form.Control type="email" placeholder='Enter your Email Address' value={email} onChange={handleEmail} />
                        </FloatingLabel>

                        {error &&
                            <div className='text-danger mb-3'>
                                {error}
                            </div>
                        }

                        <div className='text-end'>
                            <Button type="submit" variant="primary" disabled={!registerEnabled}>Register</Button>
                           
                        </div>

                </Form>
                <div>
                            <p><a href="/login" style={{textDecoration:'none'}}>Do you have an account ?</a></p>
                        </div>
            </div>

       </Container>
       </>
    )
}


export default Register