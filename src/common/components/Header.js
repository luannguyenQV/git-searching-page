import React from 'react'
import { Link } from 'react-router-dom'
import styles from '../styles/header.css'

export default () => (
  <header className={styles.header}>
    <h1>
      <Link to='/'>{`<GIT/>`}</Link>
    </h1>
  </header>
)