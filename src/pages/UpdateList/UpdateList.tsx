import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { RootState } from '../../store';
import { IList } from '../Home/Home';
import AppHeading from '../../components/AppHeading';
import BreadCrumbNavigation from '../../components/BreadcrumbNavigation';
import { deleteList, updateNameList } from '../../features/listSlice';
import { ButtonImage, DeleteButton, SuccesButton } from '../../styles/styled';
import Snackbar from 'awesome-snackbar';

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
      new Snackbar('Název změněn!', { position: 'top-center', timeout: 1000 });
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
        alignItems: 'center',
        padding: '20px'
      }}>
      <div style={{ display: 'flex', gap: '20px', flexDirection: 'column' }}>
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
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '20px'
          }}
          onSubmit={handleSubmit}>
          <div style={{ display: 'flex', gap: '20px', alignItems: 'center', width: '100%' }}>
            <label htmlFor="listName" style={{ width: '30%' }}>
              Název seznamu
            </label>
            <input
              type="text"
              name="newName"
              onChange={(e) => handleChange(e)}
              style={{ height: '30px', textIndent: '10px', width: '65%', fontSize: '18px' }}
              placeholder={selectedList?.name}
              autoFocus
            />
          </div>
          {showWarning && <p style={{ color: 'red' }}>Zadaný název nelze použít</p>}

          <SuccesButton type="submit">
            <ButtonImage src="/update.png" alt="Update icon" />
            Upravit
          </SuccesButton>
          <DeleteButton onClick={() => handleDelete(selectedList!.id)}>
            <ButtonImage src="/delete.png" alt="Delete icon" />
            Smazat
          </DeleteButton>
        </form>
      </div>
    </div>
  );
};

export default UpdateList;
