import {GoogleLogin} from "@react-oauth/google";
// import style from "./login.module.scss";
// import {jwtDecode} from "jwt-decode";


function Login(){

    return (
        <GoogleLogin
            onSuccess={credentialResponse => {
                console.log('login ok', credentialResponse);
            }}
            onError={() => {
                console.log('Login Failed');
            }}
            useOneTap
        />
        )

}

export default Login
