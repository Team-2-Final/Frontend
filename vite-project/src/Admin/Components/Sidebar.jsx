import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  SidebarWrapper,
  LogoBox,
  MenuNav,
  MenuBox,
} from '../Pages/Styles/AdminShared';

const Sidebar = ({ activeMenu }) => {
  const navigate = useNavigate();

  return (
    <SidebarWrapper>
      <LogoBox>🌱 Seed Farm</LogoBox>
      <MenuNav>
        <MenuBox
          className={activeMenu === 'Dashboard' ? 'active' : ''}
          onClick={() =>
            navigate('/DashBoard')
          } /* 파트너님 App.jsx 경로와 일치 */
        >
          Dashboard
        </MenuBox>

        <MenuBox
          className={activeMenu === 'CCTV' ? 'active' : ''}
          onClick={() => navigate('/cctv')} /* 파트너님 App.jsx 경로와 일치 */
        >
          CCTV & Sectors
        </MenuBox>

        {/* 아래 두 페이지는 아직 App.jsx에 없지만 임시로 맞춰두었습니다 */}
        <MenuBox
          className={activeMenu === 'Device' ? 'active' : ''}
          onClick={() => navigate('/Device')}
        >
          Device Control
        </MenuBox>

        <MenuBox
          className={activeMenu === 'Analysis' ? 'active' : ''}
          onClick={() => navigate('/Analysis')}
        >
          Data Analysis
        </MenuBox>

        <div style={{ flex: 1 }}></div>

        <MenuBox onClick={() => navigate('/Login')}>Logout</MenuBox>
      </MenuNav>
    </SidebarWrapper>
  );
};

export default Sidebar;
