import React, { useEffect, useState } from 'react';
import { View, Image } from 'react-native';
import CategoryCard from '../CategoryCard/CategoryCard';
import { TodoProps } from '../../utils/Interfaces/todo';
import TodoItem from '../../components/TodoItem/TodoItem';
import SwipeList from '../../components/SwipeList/SwipeList';
import backgroungImage from '../../../assets/collapse-bkg.jpeg';

type list = {
  key: string;
  title: string;
  uiType: string;
  selected: boolean;
  data: Array<TodoProps>;
  onClick: (key: TodoProps['key']) => any;
};
export interface CategoryCollapseProps {
  items: Array<list>;
}

export default function CategoryCollapse(props: CategoryCollapseProps) {
  const [selectedId, setSelected] = useState<Number>(0);

  // useEffect(() => {}, [selectedId]);

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
            <SwipeList list={category.data} onPressEdit={category.onClick} />
            {/* {category.data.length ? (
              category.data.map((item: TodoProps, index: number) => (
                <TodoItem
                  key={index.toString()}
                  item={item}
                  pressHandler={category.onClick}
                />
              ))
            ) : (
              <Image source={backgroungImage} />
            )} */}
          </CategoryCard>
        );
      })}
    </View>
  );
}
