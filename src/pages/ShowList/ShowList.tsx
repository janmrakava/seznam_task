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
  const [previousItems, setPreviousItems] = useState<string[]>([]);
  const [showAutoSuggest, setShowAutoSuggest] = useState<boolean>(false);
  const [suggestedItems, setSuggestedItems] = useState<string[]>([]);
  const lists = useSelector((state: RootState) => state.list);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  /**
   * * Show list with id from URL
   */
  const { id } = useParams();
  useEffect(() => {
    const showList = lists.find((item) => item.id === id);
    if (showList) {
      setSelectedList(showList);
    } else {
      navigate('/notfound');
    }
  }, [id, lists]);
  /**
   * * Add new item to list func
   */
  const [newItem, setNewItem] = useState<string>('');
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { value } = event.target;
    setShowWarning(false);
    matchAutoSuggest(value);
    setShowAutoSuggest(true);
    setNewItem(value);
  };
  const handleAddItem = (e: React.FormEvent): void => {
    e.preventDefault();
    const isItemInList = selectedList?.items.some((item) => item === newItem);
    if (!isItemInList && newItem.length > 0) {
      setPreviousItems((prevItems) => [...prevItems, newItem]);
      dispatch(addItemToList({ id: selectedList!.id, item: newItem }));
      setNewItem('');
    } else {
      setShowWarning(true);
    }
  };

  /**
   * * Drag & drop func
   */
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
  /**
   * * AutoSuggest func
   */

  const previousItemsRef = useRef(false);
  useEffect(() => {
    const storedItems = localStorage.getItem('previousItems');
    if (storedItems !== null) {
      const items = JSON.parse(storedItems);
      setPreviousItems(items);
    }
  }, []);

  const matchAutoSuggest = (value: string) => {
    const filteredArray = previousItems.filter((item) => item.startsWith(value));
    setSuggestedItems(filteredArray);
  };

  const handleClickAutoSuggest = (item: string) => {
    setShowAutoSuggest(false);
    const isItemInList = selectedList?.items.some((item) => item === item);
    if (!isItemInList && item.length > 0) {
      dispatch(addItemToList({ id: selectedList!.id, item: item }));
      setNewItem('');
    }
  };

  useEffect(() => {
    if (previousItemsRef.current) {
      localStorage.setItem('previousItems', JSON.stringify(previousItems));
    } else {
      previousItemsRef.current = true;
    }
  }, [previousItems]);

  /**
   * * Page Structure
   */
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
      {showWarning && <p style={{ color: 'red' }}>Položka se již v seznamu nachází</p>}
      <form onSubmit={handleAddItem}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '30px', height: '30px' }}>
          <div style={{ display: 'inline-block', position: 'relative', height: '30px' }}>
            <input
              type="text"
              style={{ height: '80%', textIndent: '10px' }}
              value={newItem}
              name="newItem"
              onChange={handleChange}
              autoFocus
            />
            <div
              style={{
                border: '1px solid black',
                position: 'absolute',
                top: '100%',
                left: '0',
                width: '100%',
                zIndex: '1',
                background: '#fff'
              }}>
              {showAutoSuggest
                ? suggestedItems.map((item, index) => {
                    return (
                      <p
                        key={index}
                        style={{ padding: '10px' }}
                        onClick={() => handleClickAutoSuggest(item)}>
                        {item}
                      </p>
                    );
                  })
                : null}
            </div>
          </div>

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
                <ListItem id={selectedList.id} item={item} key={index} />
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
