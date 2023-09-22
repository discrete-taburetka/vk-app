import { useState, useEffect, FC, MouseEventHandler } from 'react';
import { cityData } from '../../utils/types';
import { Button, Div, List, Panel, PanelHeader } from '@vkontakte/vkui';
import './List.css';
import { useSelector } from 'react-redux';
import { Rest } from '../Rest/Rest';

interface IListPage {
  id: string;
  go: MouseEventHandler<HTMLElement>;
}
const ListPage: FC<IListPage> = ({ id, go }) => {
  const listData = useSelector(((state: any) => state.restaurants));

  return (
    <Panel id={id} className='panel'>
      <PanelHeader>Список</PanelHeader>
      <Div>
        <List className='list'>
          {listData.map((item: cityData, index: number) => (
            <Rest index={index} item={item} key={index} />
          ))}
        </List>
        <Div className='buttons'>
          <Button onClick={go} data-to="home">Назад</Button>
          <Button onClick={go} data-to="map">Карта</Button>
        </Div>
      </Div>
    </Panel>
  );
};

export default ListPage;