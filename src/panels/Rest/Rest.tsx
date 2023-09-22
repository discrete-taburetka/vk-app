import { FC } from "react";
import { cityData } from "../../utils/types";
import "./Rest.css";
import { Link } from "@vkontakte/vkui/dist/components/Link/Link";
import { List } from "@vkontakte/vkui";

interface IRest {
  index: number;
  item: cityData;
}

export const Rest: FC<IRest> = ({ item }) => {
  return (
    <Link className='link'>
      <List key={item.id} >
        <p className='name'>{item.name}</p>
        <p>{item.street}</p>
        <p>{item.type}</p>
      </List>
    </Link>
  )
}
