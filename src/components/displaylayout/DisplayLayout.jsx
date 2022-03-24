import React, { useEffect, useState, useCallback } from 'react';
import { FullScreen, useFullScreenHandle } from 'react-full-screen';
import ToggleTheme, { getTheme, setTheme } from '../toggletheme/ToggleTheme';
import { RiFullscreenFill } from 'react-icons/ri';
import './displaylayout.css';
import MenuLateral from '../menulateral/MenuLateral';
//Apps
import Main from '../../apps/main/Main';
import AppExample from '../../apps/appexample/AppExample';
//Layout
import DropdownMenuTab from '../dropdownmenutab/DropdownMenuTab';
import { Tabs, Menu, Layout, Drawer } from 'antd';
import { BsMenuButtonWide } from 'react-icons/bs';
import { DatabaseOutlined } from '@ant-design/icons';
const { TabPane } = Tabs;
const { Header, Content, Footer } = Layout;

let panes = require('../../panes.json');

const Components = {
	Main: <Main />,
	AppExample: <AppExample />,
	DatabaseOutlined: <DatabaseOutlined />,
	DropdownMenuTab: <DropdownMenuTab />,
};

export default function DisplayLayout() {
	const [state, setState] = useState({
		activeKey: panes[0].key,
		panes,
	});

	const handle = Array.from({ length: panes.length }, (v) => useFullScreenHandle());
	const attachFullScreenHandle = () => {
		try {
			handle.push(useFullScreenHandle());
		} catch (err) {
			console.log(err);
		}
	};
	const [visible, setVisible] = useState(false);
	useEffect(() => setTheme(getTheme()), []);

	const onChange = (activeKey) => {
		const { panes } = state;
		setState({ activeKey: activeKey, panes });
	};

	const pushToPanes = ({ title, content, options, key, closable }) => {
		panes.push({
			title: title,
			content: content,
			options: options,
			key: `key_${Date.now()}`,
			closable: closable,
		});
	};

	const add = (pane) => {
		try {
			const { panes } = state;
			const addKey = `key_${Date.now()}`;
			attachFullScreenHandle();
			pushToPanes(pane);
			/*
			panes.push({
			  title: `Name ${Date.now()}`,
			  content: "New Tab Pane",
			  options: <DropdownMenuTab />,
			  key: addKey,
			  closable: true,
			});
			*/
			setState({ activeKey: addKey, panes });
		} catch (err) {
			console.log(err);
		}
	};

	const onEdit = (targetKey, action) => {
		if (action === 'remove') {
			remove(targetKey);
		} else if (action === 'add') {
			add();
		}
	};

	const remove = (targetKey) => {
		let { activeKey } = state;
		const { panes } = state;
		let lastIndex;
		panes.forEach((pane, i) => {
			if (pane.key === targetKey) {
				lastIndex = i - 1;
			}
		});
		const newPanes = panes.filter((pane) => pane.key !== targetKey);
		if (panes.length && activeKey === targetKey) {
			if (lastIndex >= 0) {
				activeKey = newPanes[lastIndex].key;
			} else {
				activeKey = newPanes[0].key;
			}
		}
		setState({ activeKey: activeKey, panes: newPanes });
	};

	const operations = (
		<div>
			<a
				target="_blank"
				rel="noopener noreferrer"
				href="/"
				onClick={(e) => {
					e.preventDefault();
					setVisible(!visible);
				}}
			>
				<BsMenuButtonWide />
			</a>
		</div>
	);

	const onClose = () => {
		setVisible(false);
	};

	return (
		<Layout>
			<Layout>
				<Header
					style={{
						position: 'fixed',
						zIndex: 1,
						width: '100%',
						height: '30px',
					}}
				></Header>
				<Content
					className="site-layout"
					style={{
						padding: '0',
						marginTop: 0,
						height: 'calc(100vh - 60px)',
					}}
				>
					<Tabs
						tabBarExtraContent={operations}
						hideAdd
						onChange={onChange}
						activeKey={state.activeKey}
						type="editable-card"
						onEdit={onEdit}
					>
						{state.panes.map((pane, i) => {
							return (
								<TabPane
									tab={
										<span>
											{Components[pane.icon]}
											{pane.title}
											{Components[pane.options] || pane.options}
										</span>
									}
									key={pane.key}
									closable={pane.closable}
								>
									<div>
										<a
											href="/"
											target="_blank"
											rel="noopener noreferrer"
											className="fixedbutton"
											onClick={handle[i].enter}
										>
											<RiFullscreenFill />
										</a>
										<FullScreen handle={handle[i]}>
											{Components[pane.content] || pane.content}
										</FullScreen>
									</div>
								</TabPane>
							);
						})}
					</Tabs>
				</Content>
				<Footer>
					<span>Footer</span>
				</Footer>
			</Layout>
			<Drawer
				title="Options"
				placement="right"
				width="30vw"
				onClose={onClose}
				visible={visible}
			>
				<MenuLateral add={add} panes={panes} setVisible={setVisible} />
			</Drawer>
		</Layout>
	);
}