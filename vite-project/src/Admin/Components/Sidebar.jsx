import React from 'react';
import { useNavigate } from 'react-router-dom'; // 👈 페이지 이동을 위한 훅 가져오기
import {
  SidebarWrapper,
  LogoBox,
  MenuNav,
  MenuBox,
} from '../Pages/Styles/AdminShared';

const Sidebar = ({ activeMenu }) => {
  const navigate = useNavigate(); // 👈 navigate 함수 실행 준비

  return (
    <SidebarWrapper>
      <LogoBox>🌱 Seed Farm</LogoBox>
      <MenuNav>
        {/* 클릭 시(onClick) 해당 경로로 이동하는 기능 추가 */}
        <MenuBox
          className={activeMenu === 'Dashboard' ? 'active' : ''}
          onClick={() => navigate('/dashboard')}
        >
          Dashboard
        </MenuBox>

        <MenuBox
          className={activeMenu === 'CCTV' ? 'active' : ''}
          onClick={() => navigate('/cctv')}
        >
          CCTV & Sectors
        </MenuBox>

        <MenuBox
          className={activeMenu === 'Device' ? 'active' : ''}
          onClick={() => navigate('/device')}
        >
          Device Control
        </MenuBox>

        <MenuBox
          className={activeMenu === 'Analysis' ? 'active' : ''}
          onClick={() => navigate('/analysis')}
        >
          Data Analysis
        </MenuBox>

        {/* 하단 로그아웃 버튼을 밀어내기 위한 빈 공간 */}
        <div style={{ flex: 1 }}></div>

        {/* 로그아웃은 보통 로그인 페이지로 보내거나 세션을 삭제하는 로직이 들어갑니다 */}
        <MenuBox onClick={() => navigate('/login')}>Logout</MenuBox>
      </MenuNav>
    </SidebarWrapper>
  );
};

export default Sidebar;
