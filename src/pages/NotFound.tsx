import { useNavigate } from 'react-router-dom';

const NotFound: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div
      style={{
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '50px'
      }}>
      <h1>List s požadovaným ID nebyl nazelen.</h1>
      <button style={{ padding: '10px 20px' }} onClick={() => navigate('/')}>
        Zpět na hlavní stránku
      </button>
    </div>
  );
};

export default NotFound;
