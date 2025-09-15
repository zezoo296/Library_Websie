'use client'
import { useGoogleLogin } from "@react-oauth/google";
import PrimaryButton from "../UI/PrimaryButton";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Login = () => {
    const { setIsAuthenticated, setToken } = useContext(AuthContext);
    const login = useGoogleLogin({
        flow: 'implicit',
        scope: 'https://www.googleapis.com/auth/books',
        onSuccess: handleSuccess,
        onError: handleError,

    });

    function handleSuccess(credientialResponse){
        setIsAuthenticated(true);
        setToken(credientialResponse.access_token);
    }

    function handleError(){
        window.alert("Couldn't login. Please try again!");
    }

    return (
        <PrimaryButton onClick={() => login()} extraClasses="!w-[250px]">
            Login With Google
        </PrimaryButton>
    );
};

export default Login;
