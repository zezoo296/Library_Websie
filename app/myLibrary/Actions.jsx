// Actions.jsx
import DeleteButton from "./DeleteButton";
import MoveButton from "./MoveButton";


export default function Actions({ bookId, currentShelfId }) {

    return (
        <div className="flex gap-5 relative">
            <DeleteButton
                bookId={bookId}
                currentShelfId={currentShelfId}
            />
            <MoveButton
                bookId={bookId}
                currentShelfId={currentShelfId}
            />
        </div>
    );
}
