import { useDispatch, useSelector } from 'react-redux';
import AppHeading from '../../components/AppHeading';
import BreadCrumbNavigation from '../../components/BreadcrumbNavigation';
import { RootState } from '../../store';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { IList } from '../Home/Home';
import { addItemToList } from '../../features/listSlice';
import ListItem from '../../components/ListItem';

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
  const handleAddItem = (): void => {
    const isItemInList = selectedList?.items.some((item) => item === newItem);
    if (!isItemInList) {
      dispatch(addItemToList({ id: selectedList!.id, item: newItem }));
      setNewItem('');
    } else {
      setShowWarning(true);
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '30px',
        alignItems: 'flex-start',
        padding: '20px'
      }}>
      <AppHeading />
      <BreadCrumbNavigation
        items={[
          { to: '/', label: 'Nákupní seznamy', active: false },
          {
            to: '/createnew',
            label: selectedList ? `Položky seznamu ${selectedList.name}` : 'Načítání...',
            active: true
          }
        ]}
      />
      <h2>Položky seznamu</h2>
      <div style={{ display: 'flex', alignItems: 'center', gap: '30px', height: '30px' }}>
        <input
          type="text"
          style={{ height: '80%', textIndent: '10px' }}
          value={newItem}
          name="newItem"
          onChange={handleChange}
        />
        <button
          onClick={handleAddItem}
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
      <div>
        {selectedList?.items.length !== 0 ? (
          <ul>
            {selectedList?.items.map((item, index) => {
              return <ListItem id={selectedList.id} item={item} key={index} />;
            })}
          </ul>
        ) : (
          <p>Seznam je prázdný</p>
        )}
      </div>
    </div>
  );
};

export default ShowList;
