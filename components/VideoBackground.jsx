"use client";

import { useState } from "react";
import classes from "./VideoBackground.module.css";
import Overlay from "../UI/Overlay";

export default function VideoBackground() {
    const [videoLoaded, setVideoLoaded] = useState(false);

    return (
        <>
            {/* Image placeholder */}
            <img
                src="/images/HomeBackground.webp"
                alt="Background"
                className={`fixed top-0 left-0 w-screen h-screen object-cover z-[-2] transition-opacity duration-1000 ${
                    videoLoaded ? "opacity-0" : "opacity-100"
                }`}
            />

            {/* Video */}
            <video
                autoPlay
                muted
                loop
                playsInline
                className={classes["bg-video"]}
                onCanPlayThrough={() => setVideoLoaded(true)}
                style={{
                    opacity: videoLoaded ? 1 : 0,
                    transition: "opacity 1s ease-in-out",
                }}
            >
                <source src="/videos/HomeBackground.mp4" type="video/mp4" />
                <source src="/videos/HomeBackground.webm" type="video/webm" />
            </video>

            {/* Overlay */}
            <Overlay />
        </>
    );
}
