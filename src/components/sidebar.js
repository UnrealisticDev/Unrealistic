import React from 'react'

import styles from './sidebar.module.scss';

export default ({children}) => (
    <div className={styles.Content}>
        {children}
    </div>
)