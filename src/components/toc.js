import React from 'react';

import styles from './toc.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronUp, faChevronDown } from '@fortawesome/free-solid-svg-icons';

class TOC extends React.Component {
	constructor() {
		super();
		this.state = {
			expanded: true,
		};
		this.toggleExpansion = this.toggleExpansion.bind(this);
	}

	toggleExpansion(event) {
		this.setState({ expanded: !this.state.expanded });
	}

	render() {
		return this.props.src ? (
			<>
				<div class='level' onClick={this.toggleExpansion}>
					<div class='level-left'>
						<p className='menu-label'>Contents</p>
					</div>
					<div className='level-right'>
						<FontAwesomeIcon
							icon={this.state.expanded ? faChevronUp : faChevronDown}
						/>
					</div>
				</div>
				{this.state.expanded && (
					<ul className={'menu-list ' + styles.List}>
						<div dangerouslySetInnerHTML={{ __html: this.props.src }} />
					</ul>
				)}
			</>
		) : null;
	}
}

export default TOC;
