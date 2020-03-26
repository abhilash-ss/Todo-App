import React, { useEffect, useState } from 'react';
import { View, Image } from 'react-native';
import CategoryCard from '../CategoryCard/CategoryCard';
import { TodoProps } from '../../utils/Interfaces/todo';
import SwipeList from '../../components/SwipeList/SwipeList';
import backgroungImage from '../../../assets/collapse-bkg.jpeg';

type list = {
  key: string;
  title: string;
  uiType: string;
  selected: boolean;
  data: Array<TodoProps>;
  onPressEdit: Function;
  onPressDone: Function;
};
export interface CategoryCollapseProps {
  items: Array<list>;
}

export default function CategoryCollapse(props: CategoryCollapseProps) {
  const [selectedId, setSelected] = useState<Number>(0);

  const { items } = props;
  return (
    <View>
      {items.map((category, index) => {
        return (
          <CategoryCard
            key={index.toString()}
            id={index}
            title={category.title}
            verticalBarColor={category.uiType}
            selected={selectedId === index}
            onPress={(id: Number) => setSelected(id)}
          >
            <SwipeList
              list={category.data}
              onPressEdit={category.onPressEdit}
              onPressDone={category.onPressDone}
            />
            {!category.data.length && <Image source={backgroungImage} />}
          </CategoryCard>
        );
      })}
    </View>
  );
}
