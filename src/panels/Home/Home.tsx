import React, { MouseEventHandler, useEffect, useState } from 'react';
import { Panel, PanelHeader, Header, Button, Group, Cell, Div } from '@vkontakte/vkui';
import { UserInfo } from '@vkontakte/vk-bridge';

import { citiesData } from '../../utils/data';
import { cityData } from '../../utils/types';
import ReactSelect from 'react-select';
import customStyles from './react-select-styles';
import './Home.css';

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

	const [selectedValue, setSelectedValue] = useState('init');

	const options: OptionType[] = [
		{ value: 'init', label: 'Выбрать' },
		{ value: 'Mtsensk', label: 'Мценск' },
		{ value: 'Belgorod', label: 'Белгород' },
		{ value: 'Orel', label: 'Орёл' },
	];

	const handleDropdownChange = (selectedOption: any) => {
		console.log(selectedOption);
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
			return <Button stretched size="l" mode="secondary" onClick={go} data-to="list">Продолжить</Button>;
		}
		return null;
	};

	return (
		<Panel id={id}>
			<PanelHeader>Главная</PanelHeader>
			<Group header={<Header mode="secondary">Выберите ваш город</Header>}>
				<Cell>Попа</Cell>
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
