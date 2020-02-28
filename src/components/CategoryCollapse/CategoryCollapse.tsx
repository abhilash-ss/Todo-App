import * as React from 'react';
import { View, Text, FlatList } from 'react-native';
import CategoryCard from '../CategoryCard/CategoryCard';
import { TodoProps } from '../../utils/Interfaces/todo';
import TodoItem from '../../components/TodoItem/TodoItem';

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
  const { items } = props;
  return (
    <View>
      {items.map((category, index) => {
        return (
          <CategoryCard
            key={index.toString()}
            title={category.title}
            verticalBarColor={category.uiType}
            selected={category.selected}
          >
            <View>
              <FlatList
                data={category.data}
                renderItem={({ item }) => (
                  <TodoItem item={item} pressHandler={category.onClick} />
                )}
                keyExtractor={item => item.key.toString()}
              />
              {}
            </View>
          </CategoryCard>
        );
      })}
    </View>
  );
}
