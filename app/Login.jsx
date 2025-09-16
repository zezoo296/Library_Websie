"use client";
import { useGoogleLogin } from "@react-oauth/google";
import PrimaryButton from "../UI/PrimaryButton";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Login = () => {
    const { setIsAuthenticated, setToken, setUser } = useContext(AuthContext);
    const login = useGoogleLogin({
        flow: "implicit",
        scope: "https://www.googleapis.com/auth/books",
        onSuccess: handleSuccess,
        onError: handleError,
    });

    async function handleSuccess(tokenResponse) {
        const res = await fetch("https://www.googleapis.com/oauth2/v3/userinfo",{
            headers: {
                "Authorization": `Bearer ${tokenResponse.access_token}`
            }
        });

        const profile = await res.json();
        setUser({
            userName: profile.name,
            picture: profile.picture
        });
        
        setIsAuthenticated(true);
        setToken(tokenResponse.access_token);
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
