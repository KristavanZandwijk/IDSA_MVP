import React from 'react';
import { NavLink } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import SettingsIcon from '@mui/icons-material/Settings';
import DescriptionIcon from '@mui/icons-material/Description';
import PolicyIcon from '@mui/icons-material/Policy';
import CallReceivedIcon from '@mui/icons-material/CallReceived';
import ContentPasteSearchIcon from '@mui/icons-material/ContentPasteSearch';
import GTranslateIcon from '@mui/icons-material/GTranslate';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';

import './Sidebar.css';

const Sidebar = () => {
  const menuSections = [
    {
      header: 'General',
      items: [
        { name: 'Homepage', path: '/', icon: <HomeIcon /> },
      ],
    },
    {
      header: 'Your Data Space',
      items: [
        { name: 'Your Connector', path: '/yourconnector', icon: <SettingsIcon /> },
        { name: 'Usage Policies', path: '/usagepolicies', icon: <PolicyIcon /> },
        { name: 'Contracts', path: '/contracts', icon: <DescriptionIcon /> },
        { name: 'Received Data', path: '/receiveddata', icon: <CallReceivedIcon /> },
      ],
    },
    {
      header: 'Data Space Environment',
      items: [
        { name: 'Broker', path: '/broker', icon: <ContentPasteSearchIcon /> },
        { name: 'Vocabulary Hub', path: '/vocabularyhub', icon: <GTranslateIcon /> },
        { name: 'Observer', path: '/observer', icon: <ManageSearchIcon /> },
        { name: 'ConnectorB', path: '/connectorb', icon: <SettingsIcon /> },
      ],
    },
    {
      header: 'Your Profile',
      items: [
        { name: 'Identity Provider', path: '/identityProvider', icon: <PermIdentityIcon  /> },
      ],
    },
  ];

  return (
    <div className="sidebar">
      <h2 className="sidebar-title">Construction Data Space</h2>
      <ul className="sidebar-menu">
        {menuSections.map((section) => (
          <React.Fragment key={section.header}>
            <li className="sidebar-header">{section.header}</li>
            {section.items.map((item) => (
              <li key={item.name} className="sidebar-item">
                <NavLink
                  to={item.path}
                  className={({ isActive }) => (isActive ? 'active' : '')}
                >
                  <span className="icon">{item.icon}</span>
                  <span className="menu-text">{item.name}</span>
                </NavLink>
              </li>
            ))}
          </React.Fragment>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
