import React from 'react';
import { Link } from 'react-router-dom';

interface INavigationProps {
  items: Array<{ to: string; label: string; active: boolean }>;
}

const BreadCrumbNavigation: React.FC<INavigationProps> = ({ items }) => {
  const navItems = items.map((item, index) => {
    const separator = index < items.length - 1 ? ' > ' : null;
    return (
      <React.Fragment key={index}>
        <Link to={item.to} style={{ textDecoration: item.active ? 'none' : 'underline' }}>
          <p style={{ fontSize: '20px' }}>{item.label}</p>
        </Link>
        {separator}
      </React.Fragment>
    );
  });

  return <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>{navItems}</div>;
};

export default BreadCrumbNavigation;
