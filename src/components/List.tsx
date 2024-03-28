import { useDispatch } from 'react-redux';
import { deleteList } from '../features/listSlice';
import { Link, useNavigate } from 'react-router-dom';

interface IList {
  id: string;
  name: string;
}

const List: React.FC<IList> = ({ id, name }) => {
  const dispatch = useDispatch();
  const handleDelete = (id: string): void => {
    dispatch(deleteList(id));
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
        width: '500px',
        justifyContent: 'space-between'
      }}>
      <Link to={`/showlist/${id}`}>
        <p style={{ fontSize: '20px' }}>{name}</p>
      </Link>
      <div style={{ display: 'flex', gap: '10px' }}>
        <button
          onClick={handleNavigateToUpdate}
          style={{
            padding: '10px 20px',
            textAlign: 'center',
            borderRadius: '10px',
            background: 'none',
            border: '1px solid black',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            gap: '10px'
          }}>
          <img src="/update.png" alt="" style={{ width: '20px' }} />
          Upravit
        </button>
        <button
          onClick={() => handleDelete(id)}
          style={{
            padding: '10px 20px',
            textAlign: 'center',
            borderRadius: '10px',
            background: 'none',
            border: '1px solid black',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            gap: '10px',
            backgroundColor: 'rgba(255,0,0,0.6)'
          }}>
          <img src="/delete.png" alt="" style={{ width: '20px' }} />
          Smazat
        </button>
      </div>
    </div>
  );
};

export default List;
