import React from 'react'

import {Card} from 'react-bootstrap'

import lStyles from './toc.module.scss'

export default (props, {children}) => {
    
    return (
        <Card className={lStyles.Card}>
            <Card.Title className={lStyles.mine}>Roadmap</Card.Title>
            <hr/>
            <Card.Body style={{padding: 0}}>
                <div dangerouslySetInnerHTML={{__html: props.src}}/>
            </Card.Body>
        </Card>
    )
}