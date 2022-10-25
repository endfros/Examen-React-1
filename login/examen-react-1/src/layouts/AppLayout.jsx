import React from "react";
import {LoginCard} from "../components/LoginCard.jsx"

export const AppLayout = () => {
    return (
        <section className="grid h-screen place-content-center bg-black">
            <LoginCard/>
        </section>
    )
}