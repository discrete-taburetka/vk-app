import React, { useState, useEffect, ReactNode, MouseEventHandler } from 'react';
import bridge, { UserInfo } from '@vkontakte/vk-bridge';
import { View, ScreenSpinner, AdaptivityProvider, AppRoot, ConfigProvider, SplitLayout, SplitCol } from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';

import Home from './panels/Home/Home';
import Persik from './panels/Persik';
import { ListPage } from './panels/List/List';
import { cityData } from './utils/types';

const App = () => {
	const [dataFromChild, setDataFromChild] = useState([]);
	const [activePanel, setActivePanel] = useState('home');
	console.log(dataFromChild);
	const getDataFromChild = (onData: any) => {
		setDataFromChild(onData);
	}
	const go: MouseEventHandler<HTMLElement> = e => {
		setActivePanel(e.currentTarget.dataset.to ?? 'home');
	};

	return (
		<ConfigProvider>
			<AdaptivityProvider>
				<AppRoot>
					<SplitLayout
					// popout={popout}
					>
						<SplitCol>
							<View activePanel={activePanel}>
								<Home id='home' go={go} onData={getDataFromChild} />
								<ListPage id='list' go={go} data={dataFromChild}/>
								<Persik id='persik' go={go} />
							</View>
						</SplitCol>
					</SplitLayout>
				</AppRoot>
			</AdaptivityProvider>
		</ConfigProvider>
	);
}

export default App;
