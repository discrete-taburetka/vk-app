import React, { MouseEventHandler, useEffect, useState } from 'react';
import { Panel, PanelHeader, Header, Button, Group, Cell, Div, Avatar } from '@vkontakte/vkui';
import { UserInfo } from '@vkontakte/vk-bridge';
import { useMatch, useNavigate } from 'react-router-dom';

import { citiesData } from '../../utils/data';
import { cityData } from '../../utils/types';
import ReactSelect from 'react-select';
import customStyles from './react-select-styles';

interface Props {
	id: string;
	go: MouseEventHandler<HTMLElement>;
	fetchedUser?: UserInfo;
}

type OptionType = {
	value: string;
	label: string;
};

const Home: React.FC<Props> = ({ id, go, fetchedUser }) => {

	// const navigate = useNavigate();

	const [selectedValue, setSelectedValue] = useState('init');

	const options: OptionType[] = [
		{ value: 'init', label: 'Выбрать' },
		{ value: 'Mtsensk', label: 'Мценск' },
		{ value: 'Belgorod', label: 'Белгород' },
		{ value: 'Orel', label: 'Орёл' },
	];

	const handleDropdownChange = (selectedOption: any) => {
		setSelectedValue(selectedOption.value);
	};

	const getDataForSelectedCity = () => {
		switch (selectedValue) {
			case 'Mtsensk':
				return citiesData.mtsensk;
			case 'Belgorod':
				return citiesData.belgorod;
			case 'Orel':
				return citiesData.orel;
			default:
				return [];
		}
	};
	const [cityData, setCityData] = useState<cityData[]>([]);

	useEffect(() => {
		const result = getDataForSelectedCity();
		setCityData(result);
	}, [selectedValue]);

	const renderButton = () => {
		if (selectedValue !== 'init') {
			return <button className='button'>Продолжить</button>;
		}
		return null;
	};

	// const handleClick = () => {
	// 	navigate('/list');
	// };

	// const matchList = useMatch('/list');
	// const matchMain = useMatch('/');

	return (
		<Panel id={id}>
			<PanelHeader>Главная</PanelHeader>
			{fetchedUser &&
				<Group header={<Header mode="secondary">User Data Fetched with VK Bridge</Header>}>
					<Cell
						before={fetchedUser.photo_200 ? <Avatar src={fetchedUser.photo_200} /> : null}
						subtitle={fetchedUser.city && fetchedUser.city.title ? fetchedUser.city.title : ''}
					>
						{`${fetchedUser.first_name} ${fetchedUser.last_name}`}
					</Cell>
				</Group>}

			<Group header={<Header mode="secondary">Выберите ваш город</Header>}>
				<Div className='selectContainer'>
					{/* <label htmlFor="dropdown" className='h3'>Выберите ваш город</label> */}
					<ReactSelect
						className='select'
						options={options}
						value={options.find((option) => option.value === selectedValue)}
						onChange={handleDropdownChange}
						styles={customStyles}
						menuShouldBlockScroll={true}
						isSearchable={false}
					/>
				</Div>
				<Div className='buttonContainer'>
					{renderButton()}
				</Div>
			</Group>
		</Panel>
	)
};

export default Home;
