import React from 'react'

import {Card} from 'react-bootstrap'

import "bootstrap/dist/css/bootstrap.css"
import lStyles from './projfiles.module.scss'

export default () => {
    
    return (
        <Card className={lStyles.Card}>
            <Card.Link href='https://github.com/nokternelgames' target='_blank'>Project Files</Card.Link>
        </Card>
    )
}