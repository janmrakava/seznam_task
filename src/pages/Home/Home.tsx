import { useNavigate } from 'react-router-dom';
import AppHeading from '../../components/AppHeading';
import BreadCrumbNavigation from '../../components/BreadcrumbNavigation';

const Home: React.FC = () => {
  const navigate = useNavigate();
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
      <BreadCrumbNavigation items={[{ to: '/', label: 'Nákupní seznamy', active: true }]} />
      <button
        style={{
          width: 'auto',
          padding: '10px 20px',
          borderRadius: '10px',
          border: '1px solid black',
          background: 'none'
        }}
        onClick={() => navigate('/createnew')}>
        Vytvořit nový seznam
      </button>
    </div>
  );
};

export default Home;
