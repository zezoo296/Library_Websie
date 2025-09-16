"use client";
import { usePathname } from "next/navigation";
import classes from './Overlay.module.css'

export default function Overlay() {
    const pathname = usePathname();
    return (
        <div
            className={classes.overlay}
            style={{
                background: pathname.startsWith("/books/")
                    ? "rgba(0,0,0,0.6)"
                    : "rgba(0,0,0,0.4)",
            }}
        />
    );
}
