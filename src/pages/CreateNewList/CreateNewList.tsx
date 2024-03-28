import { useDispatch, useSelector } from 'react-redux';
import AppHeading from '../../components/AppHeading';
import BreadCrumbNavigation from '../../components/BreadcrumbNavigation';
import { createList } from '../../features/listSlice';
import { useState } from 'react';
import { RootState } from '../../store';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

const CreateNewList: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [listName, setListName] = useState<string>('');
  const [showErrorMessage, setShowErrorMessage] = useState<boolean>(false);
  const lists = useSelector((state: RootState) => state.list);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setShowErrorMessage(false);
    setListName(value);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event?.preventDefault();
    const listExist = lists.find((list) => list.name === listName);
    if (listExist) {
      setShowErrorMessage(true);
    } else {
      const id = uuidv4();
      const newList = {
        id: id,
        name: listName,
        items: []
      };
      dispatch(createList(newList));
      navigate('/');
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
        width: '100%',
        height: '100%'
      }}>
      <AppHeading />
      <BreadCrumbNavigation
        items={[
          { to: '/', label: 'Nákupní seznamy', active: false },
          { to: '/createnew', label: 'Vytvoření nového seznamu', active: true }
        ]}
      />
      <h2>Vytvoření nového seznamu</h2>
      <form
        style={{ display: 'flex', flexDirection: 'column', gap: '20px', alignItems: 'center' }}
        onSubmit={handleSubmit}>
        <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
          <label htmlFor="listName">Název seznamu</label>
          <input
            type="text"
            name="listName"
            onChange={(e) => handleInputChange(e)}
            style={{ height: '30px', textIndent: '10px' }}
            autoFocus
          />
        </div>
        {showErrorMessage && <p style={{ color: 'red' }}>Seznam se zadaným jménem již existuje</p>}

        <button
          style={{
            padding: '10px 20px',
            borderRadius: '10px',
            border: '1px solid black',
            background: 'none'
          }}>
          Vytvořit seznam
        </button>
      </form>
    </div>
  );
};

export default CreateNewList;
