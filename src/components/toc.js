import React from 'react'

import {Card} from 'react-bootstrap'

import "bootstrap/dist/css/bootstrap.css"
import lStyles from './toc.module.scss'

export default ({src}) => {
    
    return (
        <Card className={lStyles.Card}>
            <Card.Title>Roadmap</Card.Title>
            <Card.Body>
                <div dangerouslySetInnerHTML={{__html: src}}/>
            </Card.Body>
        </Card>
    )
}