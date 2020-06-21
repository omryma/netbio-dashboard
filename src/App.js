import React, { useState, useEffect, useMemo } from 'react';
import { Loader, Menu, Segment } from 'semantic-ui-react'
import UsersMap from './components/map';
import Charts from './components/charts';


const App = (props) => {
  const tabs = ['UsersMap', 'Charts']
  const [activeTab, setActiveTab] = useState('UsersMap')
  const [usersData, setUsers] = useState({})

  useEffect(() => {
    fetch('http://netbio.bgu.ac.il/dashboard-api/')
      .then((response) => response.json())
      .then((data) => { setUsers(data) })
      .catch((error) => console.error(error));
  }, [])

  return (
    <div style={{ padding: '2em' }}>
      <Menu attached="top" tabular>
        {tabs.map((tab) => (
          <Menu.Item
            key={tab}
            name={tab}
            active={activeTab === tab}
            onClick={() => setActiveTab(tab)}
          />
        ))}
      </Menu>
      <Segment attached="bottom" style={{ width: '100%', height: '100vh' }}>
        { activeTab === 'UsersMap'
          ? <UsersMap style={{ width: '100%', height: '90vh' }} usersData={usersData} />
          : <Charts usersData={usersData} />}
      </Segment>
    </div>
  );
};

export default App;
