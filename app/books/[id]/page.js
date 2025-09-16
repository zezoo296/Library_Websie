import { Suspense } from "react";
import Loader from "../../../UI/Loader";
import BookDetailsPage from "./BookDetailsPage";

export default function Page(props){
    return <Suspense fallback={<Loader />}>
        <BookDetailsPage {...props}/>
    </Suspense>
}