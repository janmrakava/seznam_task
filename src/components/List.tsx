import { useDispatch } from 'react-redux';
import { deleteList } from '../features/listSlice';
import { Link, useNavigate } from 'react-router-dom';
import { ButtonImage, DeleteButton, SuccesButton } from '../styles/styled';
import Snackbar from 'awesome-snackbar';

interface IList {
  id: string;
  name: string;
}

const List: React.FC<IList> = ({ id, name }) => {
  const dispatch = useDispatch();
  const handleDelete = (id: string): void => {
    dispatch(deleteList(id));
    new Snackbar('Seznam smazán!', { position: 'top-center', timeout: 1000 });
  };
  const navigate = useNavigate();
  const handleNavigateToUpdate = (): void => {
    navigate(`/updatelist/${id}`);
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: '100px',
        maxWidth: '500px',
        justifyContent: 'space-between'
      }}>
      <Link to={`/showlist/${id}`}>
        <p style={{ fontSize: '20px' }}>{name}</p>
      </Link>
      <div style={{ display: 'flex', gap: '10px' }}>
        <SuccesButton onClick={handleNavigateToUpdate}>
          <ButtonImage src="/update.png" alt="Update icon" />
          Upravit
        </SuccesButton>
        <DeleteButton onClick={() => handleDelete(id)}>
          <ButtonImage src="/delete.png" alt="Delete icon" />
          Smazat
        </DeleteButton>
      </div>
    </div>
  );
};

export default List;
