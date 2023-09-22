import React, { useState, MouseEvent, useEffect } from 'react';
import bridge, { UserInfo } from '@vkontakte/vk-bridge';
import { View, AdaptivityProvider, AppRoot, ConfigProvider, SplitLayout, SplitCol, Tabbar, TabbarItem } from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';

import Home from './panels/Home/Home';
import ListPage from './panels/List/List';
import MapPage from './panels/Map/Map';

import { Icon28GlobeOutline } from '@vkontakte/icons';
import { Icon28UserCircleOutline } from '@vkontakte/icons';
import { Icon28CompassOutline } from '@vkontakte/icons';

const App = () => {

	const [activeTab, setActiveTab] = useState('home');
	const [activePanel, setActivePanel] = useState('home');
	const [fetchedUser, setUser] = useState<UserInfo | undefined>(undefined);

	const go = (e: MouseEvent<HTMLElement>) => {
		const to = e.currentTarget.dataset.to ?? 'home';
		setActiveTab(to);
		setActivePanel(to);
	};

	useEffect(() => {
		async function fetchData() {
			const user = await bridge.send('VKWebAppGetUserInfo');
			setUser(user);
		}
		fetchData();
	}, []);

	return (
		<ConfigProvider>
			<AdaptivityProvider>
				<AppRoot>
					<SplitLayout>
						<SplitCol>
							<View activePanel={activePanel} id='viewMain' className='viewMain'>
								<Home id='home' go={go} fetchedUser={fetchedUser} />
								<ListPage id='list' go={go} />
								<MapPage id='map' go={go} />
							</View>
							<Tabbar>
								<TabbarItem selected={activeTab === 'home'} onClick={(e) => go(e)} text="Главная">
									<Icon28GlobeOutline />
								</TabbarItem>
								<TabbarItem selected={activeTab === 'map'} onClick={(e) => go(e)} text="Карта" data-to="map">
									<Icon28CompassOutline />
								</TabbarItem>
								<TabbarItem selected={activeTab === 'three'} onClick={(e) => go(e)} text="Профиль">
									<Icon28UserCircleOutline />
								</TabbarItem>
							</Tabbar>
						</SplitCol>
					</SplitLayout>
				</AppRoot>
			</AdaptivityProvider>
		</ConfigProvider>
	);
}

export default App;
