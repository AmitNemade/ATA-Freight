import React from 'react'
import { NavLink } from 'reactstrap'

export function NoMatch() {
    return (
        <div>
            <h1>Incorrect URL</h1>
            <h5>Please check URL is correct</h5>
            <p>1. <NavLink href="/">Home</NavLink></p>
            <p>2. <NavLink href="/dashboard">Dashboard</NavLink> Please login before </p>
            <p>2. <NavLink href="/login">Login</NavLink></p>
            <p>2. <NavLink href="/signup">Signup</NavLink></p>

        </div>
    )
}
