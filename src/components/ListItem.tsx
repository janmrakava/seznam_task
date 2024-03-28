import { useDispatch } from 'react-redux';
import { deleteItemFromList } from '../features/listSlice';

interface IListItem {
  id: string;
  item: string;
}
const ListItem: React.FC<IListItem> = ({ id, item }) => {
  const dispatch = useDispatch();

  const handleDeleteItem = (id: string, item: string): void => {
    dispatch(deleteItemFromList({ id, item }));
  };
  return (
    <li style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
      {item}
      <button
        style={{ background: 'none', border: 'none' }}
        onClick={() => handleDeleteItem(id, item)}>
        <img src="/close.png" alt="Delete icon" style={{ width: '20px' }} />
      </button>
    </li>
  );
};

export default ListItem;
