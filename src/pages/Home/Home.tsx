import { useNavigate } from 'react-router-dom';
import AppHeading from '../../components/AppHeading';
import BreadCrumbNavigation from '../../components/BreadcrumbNavigation';
import List from '../../components/List';
import { RootState } from '../../store';
import { useSelector } from 'react-redux';
import { ButtonImage } from '../../styles/styled';

export interface IList {
  id: string;
  name: string;
  items: string[];
}

const Home: React.FC = () => {
  const navigate = useNavigate();
  const lists = useSelector((state: RootState) => state.list);
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
        <BreadCrumbNavigation items={[{ to: '/', label: 'Nákupní seznamy', active: false }]} />
        <button
          style={{
            width: 'auto',
            padding: '10px 20px',
            borderRadius: '10px',
            border: '1px solid black',
            background: 'none',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '10px'
          }}
          onClick={() => navigate('/createnew')}>
          <ButtonImage src="/create.png" alt="Create icon" />
          Vytvořit nový seznam
        </button>
        <h2>Moje seznamy</h2>
        {lists.length !== 0 ? (
          lists.map((list, index) => {
            return <List name={list.name} key={index} id={list.id} />;
          })
        ) : (
          <p>Žádný dostupný seznam</p>
        )}
      </div>
    </div>
  );
};

export default Home;
