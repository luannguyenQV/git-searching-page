import React from 'react'
import { Link } from 'react-router-dom'
import '../styles/header.css'

export default () => (
  <header>
    <h1>
      <Link to='/'>{`<GIT/>`}</Link>
    </h1>
  </header>
)