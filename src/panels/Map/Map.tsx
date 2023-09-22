import { FC, MouseEventHandler, useEffect, useRef, useState } from "react";
import { YMaps, Map, Placemark, SearchControl, GeolocationControl, ZoomControl } from '@pbe/react-yandex-maps';
import { Div, List, Panel, PanelHeader } from "@vkontakte/vkui";

import './Map.css';

interface IMap {
  id: string;
  go: MouseEventHandler<HTMLElement>;
}

const MapPage: FC<IMap> = ({ id, go }) => {
  const searchControlRef = useRef<any>(null);
  const [searchResults, setSearchResults] = useState<Array<any>>([]);
  const [location, setLocation] = useState<[number, number] | null>(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation([position.coords.latitude, position.coords.longitude]);
      },
      (error) => {
        console.error(error);
      }
    );
  }, []);
  console.log(location);
  return (
    <Panel id={id} className='panel'>
      <PanelHeader>Карта</PanelHeader>
      <Div>
        <YMaps>
          {location ? (
            <Map
              style={{ width: '100%', height: '363px' }}
              defaultState={{ center: location, zoom: 14 }}
            >
              <SearchControl
                options={{ provider: 'yandex#search', placeholderContent: 'Поиск' }}
              />
              <GeolocationControl options={{ float: 'right' }} />
              <ZoomControl options={{ position: { right: 10, top: 100 }, size: 'auto' }} />
              <Placemark geometry={location} />
            </Map>
          ) : (
            <Div className='yandexLoader'>Получение данных о местоположении</Div>
          )}
        </YMaps>
        <List className='ul'>
          <li className='listItem'><span className='span'>Исследуйте город</span> в поисках интересующего вас заведения</li>
          <li className='listItem'><span className='span'>Забронируйте столик</span> или закажите доставку прямо в приложении</li>
          <li className='listItem'><span className='span'>Оставляйте отзывы</span> и зарабатывайте баллы</li>
        </List>
      </Div>
    </Panel>
  )
};

export default MapPage;