import { useNavigate } from 'react-router-dom';
import AppHeading from '../../components/AppHeading';
import BreadCrumbNavigation from '../../components/BreadcrumbNavigation';
import List from '../../components/List';
import { RootState } from '../../store';
import { useSelector } from 'react-redux';

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
        alignItems: 'flex-start',
        gap: '30px',
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
      {lists.length !== 0 ? (
        lists.map((list, index) => {
          return <List name={list.name} key={index} id={list.id} />;
        })
      ) : (
        <p>Žádný dostupný seznam</p>
      )}
    </div>
  );
};

export default Home;
