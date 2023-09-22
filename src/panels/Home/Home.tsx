import React, { MouseEventHandler, useEffect, useState } from 'react';
import { Panel, PanelHeader, Header, Button, Group, Cell, Div, Avatar } from '@vkontakte/vkui';
import { UserInfo } from '@vkontakte/vk-bridge';

import { citiesData } from '../../utils/data';
import { cityData } from '../../utils/types';
import ReactSelect from 'react-select';
import customStyles from './react-select-styles';
import './Home.css';
import { useDispatch } from 'react-redux';
import { setData } from '../../services/slices/restaurantsSlice';

interface Props {
	id: string;
	go: MouseEventHandler<HTMLElement>;
	fetchedUser?: UserInfo;
	onData?: any;
}

type OptionType = {
	value: string;
	label: string;
};

const Home: React.FC<Props> = ({ id, go, fetchedUser }) => {
	const dispatch = useDispatch();

	const [cityData, setCityData] = useState<cityData[]>([]);
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

	useEffect(() => {
		const result = getDataForSelectedCity();
		setCityData(result);
		dispatch(setData(result));
	}, [selectedValue]);

	const renderButton = () => {
		if (selectedValue !== 'init') {
			return <Button stretched size="l" mode="secondary" onClick={go} data-to="list">Продолжить</Button>;
		}
		return null;
	};

	return (
		<Panel id={id}>
			{fetchedUser &&
				<Group header={<Header mode="secondary">User Data Fetched with VK Bridge</Header>}>
					<Cell
						before={fetchedUser.photo_200 ? <Avatar src={fetchedUser.photo_200} /> : null}
						subtitle={fetchedUser.city && fetchedUser.city.title ? fetchedUser.city.title : ''}
					>
						{`${fetchedUser.first_name} ${fetchedUser.last_name}`}
					</Cell>
				</Group>}

			<PanelHeader>Главная</PanelHeader>
			<Group header={<Header mode="secondary">Выберите ваш город</Header>} className='group'>
				<Div className='selectContainer'>
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
