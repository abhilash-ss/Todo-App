export interface TodoProps {
  title: string;
  key: string;
  date: Date;
  status: 'todo' | 'done';
}
