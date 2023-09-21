import { useState, useEffect, FC, MouseEventHandler } from 'react';
import { cityData } from '../../utils/types';
import { Button, Div, Panel, PanelHeader } from '@vkontakte/vkui';
import './List.css';

interface IListPage {
  data?: cityData[];
  id: string;
  go: MouseEventHandler<HTMLElement>;
}

export const ListPage: FC<IListPage> = ({ data, id, go }) => {

  const [listData, setListData] = useState<cityData[]>([]);
  console.log(listData);

  useEffect(() => {
    if (data) {
      setListData(data);
    }
  }, [data]);

  return (
    <Panel id={id}>
      <PanelHeader>Список</PanelHeader>
      <>
        {/* <ul className='list'>
          {listData.map((item: cityData, index: number) => (
            <Rest index={index} item={item} key={index} />
          ))}
        </ul> */}
        <Div className='buttons'>
          <Button onClick={go} data-to="home">Назад</Button>
          <Button>Карта</Button>
        </Div>
      </>
    </Panel>
  );
};