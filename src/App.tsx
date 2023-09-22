import React, { useState, MouseEventHandler } from 'react';
import bridge, { UserInfo } from '@vkontakte/vk-bridge';
import { View, AdaptivityProvider, AppRoot, ConfigProvider, SplitLayout, SplitCol, Tabbar, TabbarItem } from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';

import Home from './panels/Home/Home';
import Persik from './panels/Persik';
import { ListPage } from './panels/List/List';
import './App.css';
import { Icon28GlobeOutline } from '@vkontakte/icons';
import { Icon28UserCircleOutline } from '@vkontakte/icons';
import { Icon28CompassOutline } from '@vkontakte/icons';

const App = () => {
	const [activePanel, setActivePanel] = useState('home');
	const [text, setText] = useState('one');

	const go: MouseEventHandler<HTMLElement> = e => {
		setActivePanel(e.currentTarget.dataset.to ?? 'home');
	};

	return (
		<ConfigProvider>
			<AdaptivityProvider>
				<AppRoot>
					<SplitLayout>
						<SplitCol>
							<View activePanel={activePanel} id='viewMain' className='viewMain'>
								<Home id='home' go={go} />
								<ListPage id='list' go={go} />
								<Persik id='persik' go={go} />
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
