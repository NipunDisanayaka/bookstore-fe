const SignOut = () =>{
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("username");
    sessionStorage.removeItem("user_id");
    window.location.href = "/login";
return(
    <>
    </>
)
    
}

export default SignOut;