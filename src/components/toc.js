import React from 'react';

import styles from './toc.module.scss';

class TOC extends React.Component {
	render() {
		return this.props.src ? (
			<>
				<p className='menu-label'>Contents</p>
				<ul className={'menu-list ' + styles.List}>
					<div dangerouslySetInnerHTML={{__html: this.props.src}}/>
				</ul>
			</>
		) : null;
	}
}

export default TOC;
