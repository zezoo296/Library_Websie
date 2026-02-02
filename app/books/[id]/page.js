import { getBookDetails } from "../../../lib/api/books";
import BookDetailsView from "./BookDetailsView";

export default async function Page({ params }){
    const data = await getBookDetails(params.id);
    
    return <BookDetailsView data={data} id={params.id}/>
}