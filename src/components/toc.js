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
				<div class='card'>
					<div class='card-content'>
						<div
							class='level is-mobile'
							onClick={this.toggleExpansion}
							onKeyPress={(e) => {
								if (e.key === 'Return') 
								this.toggleExpansion();
							}}
							role='button'
							tabIndex='0'
						>
							<div class='level-left'>
								<p className='menu-label'>Table of Contents</p>
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
					</div>
				</div>
			</>
		) : null;
	}
}

export default TOC;
