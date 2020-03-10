import React from 'react'

import lStyles from './toc.module.scss'

export default ({src}) => {
    
    return (
        <div className={lStyles.Card}>
            <div>Roadmap</div>
            <div>
                <div dangerouslySetInnerHTML={{__html: src}}/>
            </div>
        </div>
    )
}