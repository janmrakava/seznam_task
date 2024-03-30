import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { RootState } from '../../store';
import { IList } from '../Home/Home';
import AppHeading from '../../components/AppHeading';
import BreadCrumbNavigation from '../../components/BreadcrumbNavigation';
import { deleteList, updateNameList } from '../../features/listSlice';
import { DeleteButton, SuccesButton } from '../../styles/styled';

const UpdateList: React.FC = () => {
  const { id } = useParams();
  const lists = useSelector((state: RootState) => state.list);
  const [selectedList, setSelectedList] = useState<IList>();
  const [showWarning, setShowWarning] = useState<boolean>(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [newName, setNewName] = useState<string>('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setShowWarning(false);
    const { value } = event.target;
    setNewName(value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const listExist = lists.find((list) => list.name === newName);
    if (listExist || newName.length === 0) {
      setShowWarning(true);
    } else {
      dispatch(updateNameList({ id: selectedList!.id, name: newName }));
    }
  };
  const handleDelete = (id: string): void => {
    dispatch(deleteList(id));
    navigate('/');
  };

  useEffect(() => {
    const showList = lists.find((item) => item.id === id);
    if (showList) {
      setSelectedList(showList);
    } else {
      navigate('/notfound');
    }
  }, [id, lists]);
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
            to: `/updatelist/${id}`,
            label: selectedList ? `Úprava seznamu "${selectedList.name}"` : 'Načítání...',
            active: true
          }
        ]}
      />
      <h2>Úprava seznamu</h2>
      <form
        style={{ display: 'flex', flexDirection: 'column', gap: '20px', alignItems: 'center' }}
        onSubmit={handleSubmit}>
        <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
          <label htmlFor="listName">Název seznamu</label>
          <input
            type="text"
            name="newName"
            onChange={(e) => handleChange(e)}
            style={{ height: '30px', textIndent: '10px' }}
            placeholder={selectedList?.name}
            autoFocus
          />
        </div>
        {showWarning && <p style={{ color: 'red' }}>Zadaný název nelze použít</p>}

        <SuccesButton type="submit">
          <img src="/update.png" alt="Update icon" style={{ width: '20px' }} />
          Upravit
        </SuccesButton>
        <DeleteButton onClick={() => handleDelete(selectedList!.id)}>
          <img src="/delete.png" alt="Delete icon" style={{ width: '20px' }} />
          Smazat
        </DeleteButton>
      </form>
    </div>
  );
};

export default UpdateList;
