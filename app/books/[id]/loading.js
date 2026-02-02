import Loader from "../../../UI/Loader"

export default function Loading(){
    return (
        <div className="h-[60vh] flex flex-col items-center justify-center gap-4">
            <h1>Loading book details...</h1>
            <Loader />
        </div>
    )
}