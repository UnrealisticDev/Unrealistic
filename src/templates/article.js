import React from 'react';
import { Link, graphql } from 'gatsby';
import HyvorTalk from 'hyvor-talk-react';

import Layout from '../components/layout';
import SEO from '../components/seo';
import Sidebar from '../components/sidebar';
import SeriesNav from '../components/seriesnav';
import Toc from '../components/toc';
import ProjectFiles from '../components/projectfiles';
import ScrollUpButton from 'react-scroll-up-button';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faChevronLeft,
	faChevronRight,
	faAngleUp as faChevronCircleUp,
} from '@fortawesome/free-solid-svg-icons';

import '../styles/code.scss';
import styles from './article.module.scss';

export default ({ data, pageContext }) => {
	const {
		title,
		image,
		body,
		projectfiles,
		series,
		seriesNum,
	} = data.contentfulBlogPost;

	const { seriesNeighbors } = data;

	var toc = body.childMarkdownRemark.tableOfContents;

	var beforePost = null;
	var afterPost = null;
	if (series) {
		for (var i = 0; i < seriesNeighbors.nodes.length; ++i) {
			if (seriesNum - 1 === i) {
				beforePost = seriesNeighbors.nodes[i];
			}
			if (seriesNum + 1 === i) {
				afterPost = seriesNeighbors.nodes[i];
			}
		}
	}

	return (
		<Layout>
			<SEO title={title} />
			<div className='columns is-centered'>
				<div className='column is-8'>
					<div className='box has-background-light is-paddingless'>
						<div className='card'>
							<div style={{ position: 'relative' }}>
								<div className='card-image'>
									<figure className='image is-5by3'>
										<img
											src={image ? image.file.url : ''}
											alt='alt'
											style={{ objectFit: 'cover' }}
										/>
									</figure>
								</div>
								<div
									className={'title ' + styles.Title}
									style={{
										position: 'absolute',
										bottom: '.5em',
										right: '.5em',
										color: '#EAAA03',
										backgroundColor: 'rgb(64, 64, 64, .4)',
										padding: '.5em',
										justifyContent: 'end',
										maxWidth: '85%',
										borderBottom: '5px solid #EAAA03',
									}}
								>
									{title}
								</div>
							</div>
							<div className='card-content'>
								<div className='content'>
									<div
										className={styles.Markdown}
										dangerouslySetInnerHTML={{
											__html: body.childMarkdownRemark.html,
										}}
									/>
									<div className='level'>
										<div className='level-right'>
											<div className='level-item'>
												{beforePost && (
													<Link
														to={beforePost.slug}
														className={styles.SeriesNavInline}
													>
														<div className='level is-mobile'>
															<div className='level-item'>
																<FontAwesomeIcon icon={faChevronLeft} />
															</div>
															<div className='level-item'>
																{beforePost.title}
															</div>
														</div>
													</Link>
												)}{' '}
											</div>
										</div>
										<div className='level-left'>
											<div className='level-item'>
												{afterPost && (
													<Link
														to={afterPost.slug}
														className={styles.SeriesNavInline}
													>
														<div className='level is-mobile'>
															<div className='level-item'>
																{afterPost.title}
															</div>
															<div className='level-item'>
																<FontAwesomeIcon icon={faChevronRight} />
															</div>
														</div>
													</Link>
												)}
											</div>
										</div>
									</div>
									<hr style={{ marginTop: '8vmin', marginBottom: '8vmin' }} />
									<HyvorTalk.Embed websiteId={292} />
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className='column is-3'>
					<Sidebar>
						<SeriesNav
							series={series}
							seriesNeighbors={seriesNeighbors.nodes}
							beforePost={beforePost}
							afterPost={afterPost}
							startNum={seriesNeighbors.nodes[0].seriesNum}
						/>
						<Toc src={toc} />
						<ProjectFiles src={projectfiles} />
					</Sidebar>
				</div>
				<div />
			</div>
			<ScrollUpButton
				ShowAtPosition={600}
				style={{
					color: '#EAAA03',
					justifyContent: 'right',
					position: 'fixed',
					right: '5vmin',
					bottom: '2vmin',
					// height: "10vmin",

					// backgroundColor: "rgb(87, 86, 86)",
					// height: 30,
					// position: "fixed",
					// bottom: 20,
					// width: 30,
					WebkitTransition: 'all 0.5s ease-in-out',
					transition: 'all 0.5s ease-in-out',
					transitionProperty: 'opacity, right',
					cursor: 'pointer',

					opacity: 0,
					// right: -75,
					zIndex: 1000,
					fill: '#292929',
					paddingBottom: 1,
					paddingLeft: 1,
					paddingRight: 1,
				}}
				ToggledStyle={{
					color: '#EAAA03',
					justifyContent: 'right',
					position: 'fixed',
					right: '5vmin',
					bottom: '2vmin',
					// height: "10vmin",

					// backgroundColor: "rgb(87, 86, 86)",
					// height: 30,
					// position: "fixed",
					// bottom: 20,
					// width: 30,
					WebkitTransition: 'all 0.5s ease-in-out',
					transition: 'all 0.5s ease-in-out',
					transitionProperty: 'opacity, right',
					cursor: 'pointer',

					opacity: 100,
					// right: -75,
					zIndex: 1000,
					fill: '#292929',
					paddingBottom: 1,
					paddingLeft: 1,
					paddingRight: 1,
				}}
			>
				<FontAwesomeIcon icon={faChevronCircleUp} size='2x' />
			</ScrollUpButton>
		</Layout>
	);
};

export const postQuery = graphql`
	query($pagePath: String!, $pageSeries: String) {
		contentfulBlogPost(slug: { eq: $pagePath }) {
			slug
			title
			image {
				file {
					url
				}
			}
			body {
				childMarkdownRemark {
					html
					tableOfContents(absolute: false)
				}
			}
			projectfiles
			series
			seriesNum
		}
		seriesNeighbors: allContentfulBlogPost(
			filter: { series: { eq: $pageSeries } }
			sort: { fields: seriesNum, order: ASC }
		) {
			nodes {
				title
				slug
				seriesNum
			}
		}
	}
`;
