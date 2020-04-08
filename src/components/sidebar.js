import React from 'react'

// import styles from './sidebar.module.scss';

export default ({children}) => (
    <div style={{maxHeight: '50vh', overflow: 'scroll', scrollbarWidth: 'none'}}>
        {children}
    </div>
)