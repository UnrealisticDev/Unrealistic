/* eslint-disable */
import React, { useState } from 'react';
import { Link } from 'gatsby';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faChevronLeft,
	faChevronRight,
	faChevronDown,
	faChevronUp,
} from '@fortawesome/free-solid-svg-icons';

import styles from './seriesnav.module.scss';

class SeriesNav extends React.Component {
	constructor() {
		super();
		this.state = { showMenu: false };

		this.toggleMenu = this.toggleMenu.bind(this);
	}

	toggleMenu(event) {
		event.preventDefault();

		this.setState({
			showMenu: !this.state.showMenu,
		});
	}

	render() {
		var { series, seriesNeighbors, beforePost, afterPost } = this.props;

		return (
			<>
				{series && (
					<>
						<div class="card">
							<div class="card-content">
								<div class='level' onClick={this.toggleMenu}>
									<div class='level-left'>
										<p
											className='menu-label'
											style={{ margin: 0, marginRight: '.5em' }}
										>
											{series}
										</p>
										{beforePost && (
											<Link to={'../' + beforePost.slug}>
												<FontAwesomeIcon className='has-text-warning' icon={faChevronLeft} />
											</Link>
										)}
										{afterPost && (
											<Link to={'../' + afterPost.slug}>
												<FontAwesomeIcon className='has-text-warning' icon={faChevronRight} />
											</Link>
										)}
									</div>
									<div className='level-right'>
										<FontAwesomeIcon
											icon={this.state.showMenu ? faChevronUp : faChevronDown}
										/>
									</div>
								</div>
								{this.state.showMenu ? (
									<ul className='menu-list'>
										{seriesNeighbors.map((neighbor) => (
											<li>
												<Link href={'../' + neighbor.slug}>{neighbor.title}</Link>
											</li>
										))}
									</ul>
								) : null}
							</div>
						</div>
					</>
				)}
			</>
		);
	}
}

export default SeriesNav;
