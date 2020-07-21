import React from 'react'

import styles from './sidebar.module.scss';

export default ({children}) => (
    <aside className={'menu ' + styles.Container}>
        {children}
    </aside>
)