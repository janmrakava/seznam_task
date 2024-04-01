import { useDispatch } from 'react-redux';
import { deleteItemFromList, updateItemInList } from '../features/listSlice';
import { useState } from 'react';
import { ButtonImage } from '../styles/styled';
import Snackbar from 'awesome-snackbar';

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
      new Snackbar('Item změněn!', { position: 'top-center', timeout: 1000 });
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
        width: '100%',
        justifyContent: 'space-between'
      }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
        <button
          style={{ background: 'none', border: 'none', cursor: 'pointer' }}
          onClick={() => handleDeleteItem(id, item)}>
          <ButtonImage src="/close.png" alt="Delete icon" style={{ width: '20px' }} />
        </button>
        <input
          onChange={(e) => handleChangeItem(e)}
          onKeyDown={handleKeyPress}
          value={newValue}
          name="item"
          placeholder={item}
          style={{ background: 'none', border: 'none', height: '25px', fontSize: '18px' }}
        />
      </div>
      <ButtonImage src="/drag.png" alt="Drag and drop icon" style={{ width: '20px' }} />
    </div>
  );
};

export default ListItem;
