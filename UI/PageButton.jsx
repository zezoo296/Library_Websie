import React from "react";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import PrimaryButton from "./PrimaryButton";

const PageButton = ({ pageNumber, type, onClick }) => {
    return (
        <PrimaryButton extraClasses="flex gap-2 justify-center items-center" onClick={onClick}>
            {type === "NEXT" ? (
                <>
                    <span>Page {pageNumber}</span>
                    <FaArrowRight />
                </>
            ) : (
                <>
                    <FaArrowLeft />
                    <span>Page {pageNumber}</span>
                </>
            )}
        </PrimaryButton>
    );
};

export default PageButton;
