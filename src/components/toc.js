import React from 'react';

import styles from './toc.module.scss';

class TOC extends React.Component {
	render() {
		return this.props.headings ? (
			<>
				<p className='menu-label'>Contents</p>
				<ul className={'menu-list ' + styles.List}>
					{this.props.headings.map(({ depth, value }) => (
						<li style={{paddingLeft: (depth - 1) * '.2em'}}><a href={'#' + value}>{value}</a></li>
					))}
				</ul>
			</>
		) : null;
	}
}

export default TOC;
