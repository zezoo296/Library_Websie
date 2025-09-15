"use client";
import React from "react";
import classes from "./Header.module.css";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import Logout from "./Logout";

const Header = () => {
    const currentPath = usePathname();
    const { isAuthenticated } = useContext(AuthContext);

    return (
        <nav className={classes.navbar}>
            <div className={classes.logo}>Phoenix Library</div>
            <ul className={classes.links}>
                <li>
                    <Link
                        href="/"
                        className={currentPath === "/" ? classes.active : ""}
                    >
                        Home
                    </Link>
                </li>
                <li>
                    <Link
                        href="/books"
                        className={
                            currentPath === "/books" ? classes.active : ""
                        }
                    >
                        Books
                    </Link>
                </li>
                {isAuthenticated && (
                    <>
                        <li>
                            <Link
                                href="/myLibrary"
                                className={
                                    currentPath === "/myLibrary"
                                        ? classes.active
                                        : ""
                                }
                            >
                                MyLibrary
                            </Link>
                        </li>
                        <li>
                            <Link href={"/"}><Logout /></Link>
                        </li>
                    </>
                )}
            </ul>
        </nav>
    );
};

export default Header;
