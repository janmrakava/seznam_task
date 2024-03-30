import { useDispatch, useSelector } from 'react-redux';
import AppHeading from '../../components/AppHeading';
import BreadCrumbNavigation from '../../components/BreadcrumbNavigation';
import { RootState } from '../../store';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { IList } from '../Home/Home';
import { addItemToList, updateList } from '../../features/listSlice';
import ListItem from '../../components/ListItem';
import { DraggableItem } from '../../styles/styled';

const ShowList: React.FC = () => {
  const [selectedList, setSelectedList] = useState<IList>();
  const [showWarning, setShowWarning] = useState<boolean>(false);
  const lists = useSelector((state: RootState) => state.list);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { id } = useParams();
  const [newItem, setNewItem] = useState<string>('');
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setShowWarning(false);

    const { value } = event.target;
    setNewItem(value);
  };

  useEffect(() => {
    const showList = lists.find((item) => item.id === id);
    if (showList) {
      setSelectedList(showList);
    } else {
      navigate('/notfound');
    }
  }, [id, lists]);
  const handleAddItem = (e: React.FormEvent): void => {
    e.preventDefault();
    const isItemInList = selectedList?.items.some((item) => item === newItem);
    if (!isItemInList && newItem.length > 0) {
      dispatch(addItemToList({ id: selectedList!.id, item: newItem }));
      setNewItem('');
    } else {
      setShowWarning(true);
    }
  };

  const handleChangeItem = (e: React.ChangeEvent<HTMLInputElement>, id: number) => {
    const { value } = e.target;
    console.log(id, value);
  };

  const dragItem = useRef<number | null>(null);
  const dragOverItem = useRef<number | null>(null);

  const dragStart = (index: number) => {
    dragItem.current = index;
  };
  const dragEnter = (index: number) => {
    dragOverItem.current = index;
  };
  const drop = () => {
    if (dragItem.current !== null && dragOverItem.current !== null) {
      const copyListItems = [...selectedList!.items];
      const dragItemContent = copyListItems[dragItem.current];
      copyListItems.splice(dragItem.current, 1);
      copyListItems.splice(dragOverItem.current, 0, dragItemContent);
      dragItem.current = null;
      dragOverItem.current = null;
      dispatch(updateList({ id: selectedList!.id, items: copyListItems }));
    }
  };
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '30px',
        alignItems: 'flex-start',
        padding: '20px',
        maxWidth: '600px'
      }}>
      <AppHeading />
      <BreadCrumbNavigation
        items={[
          { to: '/', label: 'Nákupní seznamy', active: false },
          {
            to: `/showlist/${id}`,
            label: selectedList ? `Položky seznamu ${selectedList.name}` : 'Načítání...',
            active: true
          }
        ]}
      />
      <h2>Položky seznamu</h2>
      <form onSubmit={handleAddItem}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '30px', height: '30px' }}>
          <input
            type="text"
            style={{ height: '80%', textIndent: '10px' }}
            value={newItem}
            name="newItem"
            onChange={handleChange}
            autoFocus
          />
          <button
            type="submit"
            style={{
              height: '100%',
              paddingLeft: '20px',
              paddingRight: '20px',
              borderRadius: '10px',
              border: '1px solid black',
              background: 'none'
            }}>
            Přidat položku
          </button>
        </div>
        {showWarning && (
          <p style={{ color: 'red', marginTop: '-20px' }}>Položka se již v seznamu nachází</p>
        )}
      </form>
      {selectedList?.items.length !== 0 ? (
        <div>
          {selectedList?.items.map((item, index) => {
            return (
              <DraggableItem
                $isDragging={dragItem.current === index}
                $isDragOver={dragOverItem.current === index}
                draggable
                key={index}
                onDragStart={() => dragStart(index)}
                onDragEnter={() => dragEnter(index)}
                onDragEnd={drop}
                defaultValue={item}>
                <ListItem
                  id={selectedList.id}
                  item={item}
                  key={index}
                  handleChangeItem={handleChangeItem}
                />{' '}
              </DraggableItem>
            );
          })}
        </div>
      ) : (
        <p>Seznam je prázdný</p>
      )}
    </div>
  );
};

export default ShowList;
