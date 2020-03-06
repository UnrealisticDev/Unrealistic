import React from 'react'
import {Helmet} from 'react-helmet'

import Header from './header'
import Footer from './footer'

import {Container} from 'react-bootstrap'

import "bootstrap/dist/css/bootstrap.css"
import styles from './overlord.module.css'

export default ({children}) => (
    <div className={styles.Body} style={{minHeight: '100vh'}}>
        <Container fluid className={styles.Content + ' m-0 p-0'}>
            <Header/>
            <Container fluid className='mx-0 py-2 px-5'>
                {children}
            </Container>
        </Container>
        <Footer className={styles.Footer}/>
    </div>

)