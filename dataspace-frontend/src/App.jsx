import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/sidebar/Sidebar';
import Homepage from './pages/Homepage';
import YourConnector from './pages/YourConnector';
import Broker from './pages/Broker';
import Contracts from './pages/Contracts';
import UsagePolicies from './pages/UsagePolicies';
import ReceivedData from './pages/ReceivedData';
import './App.css';
import VocabularyHub from './pages/VocabularyHub';
import Observer from './pages/Observer';
import IdentityProvider from './pages/IdentityProvider';
import ConnectorB from './pages/ConnectorB';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Sidebar />
        <div className="content">
          <Routes>
            <Route path="/" element={<Homepage />} />

            <Route path="/yourconnector" element={<YourConnector />} />
            <Route path="/usagepolicies" element={<UsagePolicies />} />
            <Route path="/contracts" element={<Contracts />} />
            <Route path="/receiveddata" element={<ReceivedData />} />
            
            <Route path="/broker" element={<Broker />} />
            <Route path="/vocabularyhub" element={<VocabularyHub />} />
            <Route path="/observer" element={<Observer />} />
            <Route path="/connectorb" element={<ConnectorB />} />

            <Route path="/identityprovider" element={<IdentityProvider/>} />
            
            
            
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
