import React from 'react';

import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import styles from './projectfiles.module.scss';

class ProjectFiles extends React.Component {
	render() {
		return this.props.src ? (
			<div className={'card has-background-grey-lighter ' + styles.Card}>
				<a href={this.props.src} target='_blank' rel='noopener noreferrer'>
					<div className='card-content'>
						<div className='content'>
							<div className='level is-mobile'>
								<div className='level-left'>
									<div className='level-item'>
										<div className={'subtitle'} style={{ margin: 0 }}>
											Project Files
										</div>
									</div>
								</div>
								<div className='level-right'>
									<div className='level-item'>
										<FontAwesomeIcon icon={faExternalLinkAlt} />
									</div>
								</div>
							</div>
						</div>
					</div>
				</a>
			</div>
		) : null;
	}
}

export default ProjectFiles;