"use client";
import { useGoogleLogin } from "@react-oauth/google";
import PrimaryButton from "../UI/PrimaryButton";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Login = () => {
    const { setIsAuthenticated, setUser } = useContext(AuthContext);
    const login = useGoogleLogin({
        flow: "implicit",
        scope: "https://www.googleapis.com/auth/books",
        onSuccess: handleSuccess,
        onError: handleError,
    });

    async function handleSuccess(tokenResponse) {
        //send token to next server to store it in http only cookie
        await fetch('/api/auth',{
            method: "POST",
            body: JSON.stringify({ access_token: tokenResponse.access_token }),
            headers: {
                'Content-Type': "application/json"
            }
        });
        
        //get user info using token
        const res = await fetch('/api/auth');
        const profile = await res.json();

        //update context
        setUser({
            userName: profile.name,
            picture: profile.picture
        });
        
        setIsAuthenticated(true);
    }

    function handleError() {
        window.alert("Couldn't login. Please try again!");
    }

    return (
        <div>
            <PrimaryButton onClick={() => login()} extraClasses="!w-[250px]">
                Login With Google
            </PrimaryButton>
            <p className="!mt-3 !mb-3 !text-[16px]">Try this account demo</p>
            <p className="!my-3 !text-[14px]">Email: <strong>demolibraryzezoo@gmail.com</strong></p>
            <p className="!mb-0 !text-[14px]">Password: <strong>a1234567#</strong></p>
        </div>
    );
};

export default Login;
