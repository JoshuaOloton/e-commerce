import React from 'react'

type Props = {}

export default function Navbar({}: Props) {
  return (
    <nav>
      <div>
        <div className="logo">
          E-COMMERCE
        </div>
        <ul>
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/login">Login</a>
          </li>
          <li>
            <a href="/register">Register</a>
          </li>
        </ul>
        <div>
          
        </div>
      </div>
    </nav>
  )
}