import AppHeading from '../../components/AppHeading';
import BreadCrumbNavigation from '../../components/BreadcrumbNavigation';

const CreateNewList: React.FC = () => {
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
          { to: '/createnew', label: 'Vytvoření nového seznamu', active: true }
        ]}
      />
    </div>
  );
};

export default CreateNewList;
