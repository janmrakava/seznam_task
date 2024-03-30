import { useDispatch } from 'react-redux';
import { deleteItemFromList, updateItemInList } from '../features/listSlice';
import { useState } from 'react';

interface IListItem {
  id: string;
  item: string;
}
const ListItem: React.FC<IListItem> = ({ id, item }) => {
  const dispatch = useDispatch();

  const [newValue, setNewValue] = useState<string>('');

  const handleChangeItem = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setNewValue(value);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      dispatch(updateItemInList({ id, oldItem: item, newItem: newValue }));
      console.log('update item?');
    }
  };
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
        width: '250px',
        justifyContent: 'space-between'
      }}>
      <button
        style={{ background: 'none', border: 'none', cursor: 'pointer' }}
        onClick={() => handleDeleteItem(id, item)}>
        <img src="/close.png" alt="Delete icon" style={{ width: '20px' }} />
      </button>
      <input
        onChange={(e) => handleChangeItem(e)}
        onKeyDown={handleKeyPress}
        value={newValue}
        name="item"
        placeholder={item}
        style={{ background: 'none', border: 'none' }}
      />
      <img src="/drag.png" alt="Drag and drop icon" style={{ width: '20px' }} />
    </div>
  );
};

export default ListItem;
