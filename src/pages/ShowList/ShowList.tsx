import AppHeading from '../../components/AppHeading';
import BreadCrumbNavigation from '../../components/BreadcrumbNavigation';
interface IShowListProps {
  listName: string;
}

const ShowList: React.FC<IShowListProps> = ({ listName }) => {
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
          { to: '/createnew', label: `Položky seznamu ${listName}`, active: true }
        ]}
      />
    </div>
  );
};

export default ShowList;
