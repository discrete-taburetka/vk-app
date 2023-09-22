import React, { useState, MouseEventHandler, useEffect } from 'react';
import bridge, { UserInfo } from '@vkontakte/vk-bridge';
import { View, AdaptivityProvider, AppRoot, ConfigProvider, SplitLayout, SplitCol, Tabbar, TabbarItem } from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';

import Home from './panels/Home/Home';
import { ListPage } from './panels/List/List';

import { Icon28GlobeOutline } from '@vkontakte/icons';
import { Icon28UserCircleOutline } from '@vkontakte/icons';
import { Icon28CompassOutline } from '@vkontakte/icons';

const App = () => {
	const [activePanel, setActivePanel] = useState('home');
	const [text, setText] = useState('one');
	const [fetchedUser, setUser] = useState<UserInfo | undefined>(undefined);

	const go: MouseEventHandler<HTMLElement> = e => {
		setActivePanel(e.currentTarget.dataset.to ?? 'home');
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
							</View>
							<Tabbar>
								<TabbarItem selected={text === 'one'} onClick={() => setText('one')} text="Главная">
									<Icon28GlobeOutline />
								</TabbarItem>
								<TabbarItem selected={text === 'two'} onClick={() => setText('two')} text="Профиль">
									<Icon28UserCircleOutline />
								</TabbarItem>
								<TabbarItem selected={text === 'three'} onClick={() => setText('three')} text="Карта">
									<Icon28CompassOutline />
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
