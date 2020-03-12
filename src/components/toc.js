import React from 'react'

// import lStyles from './toc.module.scss'

import {LoremIpsum} from 'lorem-ipsum';
var lorem = new LoremIpsum();

export default ({src}) => {
    
    return (
        <div>
            <div>
                <div className='heading'>Roadmap</div>
                <div>
                    {/* <div dangerouslySetInnerHTML={{__html: src}}/> */}
                    {lorem.generateParagraphs(1)}
                </div>
            </div>
        </div>
    )
}