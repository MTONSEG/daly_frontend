import React from 'react';

const TabContent = ({tabs, id, active }) => {
	return (
		{tabs.map((tab, index) => (
			<div
				role='tabpanel'
				id={tab.id}
				key={tab.id}
				className={`tab-content ${activeTabIndex === index ? 'active' : ''}`}
			>
				{tab.content}
			</div>
		))}
	);
};

export default TabContent;