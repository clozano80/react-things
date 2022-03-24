import ToggleTheme, { getTheme, setTheme } from '../toggletheme/ToggleTheme';
import { useEffect, useState } from 'react';
import { Menu, Modal, Button } from 'antd';
import { FullScreen, useFullScreenHandle } from 'react-full-screen';

export default function MenuLateral({ add, enabledApps, setVisible }) {

	const [isModalVisible, setIsModalVisible] = useState(false);

	const showModal = () => {
		setIsModalVisible(true);
	}; 

	const handleCancel = () => {
		setIsModalVisible(false);
	};
	return (
		<>
			<div>
				Dark/light Theme <ToggleTheme />
			</div>
			<Menu>
				<Menu.Item key="1">
					<a
						target="_blank"
						rel="noopener noreferrer"
						href="/"
						onClick={(e) => {
							e.preventDefault();
							setVisible(false);
							showModal();
						}}
					>
						+ Add Tab
					</a>
				</Menu.Item>
			</Menu>
			<Modal title="Seleccion" visible={isModalVisible} footer={null} onCancel={handleCancel}>
				<Menu>
					{enabledApps.map((app, i) => (
						<Menu.Item key={i}>					
							<a
								target="_blank"
								rel="noopener noreferrer"
								href="/"
								onClick={(e) => {
									e.preventDefault();
									add(app);
									setIsModalVisible(false);
								}}
							>
								+ {app.title}
							</a>
						</Menu.Item>
					))}
				</Menu>
			</Modal>
		</>
	);
}