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
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        fontWeight: 'bold',
        fontSize: '18px',
        width: '200px',
        justifyContent: 'space-between'
      }}>
      <button
        style={{ background: 'none', border: 'none', cursor: 'pointer' }}
        onClick={() => handleDeleteItem(id, item)}>
        <img src="/close.png" alt="Delete icon" style={{ width: '20px' }} />
      </button>
      {item}
      <img src="/drag.png" alt="Drag and drop icon" style={{ width: '20px' }} />
    </div>
  );
};

export default ListItem;
