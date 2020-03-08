import React from 'react'

import {Card} from 'react-bootstrap'

import styles from './sidebar.module.scss';

export default ({children}) => (
    <Card className={styles.Content}>
        {children}
    </Card>
)