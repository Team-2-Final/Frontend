import styled from 'styled-components';
// ---------------------------------------------------------
// 1. 최상위 래퍼 & CSS 변수 (Fluid Layout의 핵심)
// ---------------------------------------------------------
export const PageContainer = styled.div`
  /* CSS 변수 선언 (대시보드에서 사용된 색상) */
  --point-green: #4caf50;
  --primary-dark: #1e293b;
  --light-green: #a5d6a7;
  --teal: #00c2a8;

  /* 핵심 화면 스케일링 로직 */
  width: 100vw;
  height: 100vh;
  font-size: calc(100vw * (16 / 1920));

  @media (min-width: 1920px) {
    font-size: 16px;
  }

  display: flex;
  background-color: #f8fafc; /* 대시보드 컨텐츠 배경색과 톤 매너 통일 */
  overflow: hidden;
`;

// ---------------------------------------------------------
// 2. 좌측 사이드바 컴포넌트
// ---------------------------------------------------------
export const SidebarWrapper = styled.nav`
  width: 16em; /* 1920px 기준 256px */
  height: 100%;
  background-color: var(--primary-dark);
  color: white;
  display: flex;
  flex-direction: column;
  padding: 2em 1.5em;
  box-sizing: border-box;
`;

export const LogoBox = styled.div`
  font-size: 1.5em;
  font-weight: 800;
  color: white;
  margin-bottom: 2.5em;
  padding-left: 0.5em;
  letter-spacing: 0.05em;
`;

export const MenuNav = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5em;
  flex: 1;
`;

export const MenuBox = styled.div`
  padding: 1em 1.2em;
  border-radius: 0.8em;
  font-size: 1.05em;
  font-weight: 500;
  color: #94a3b8;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover {
    color: white;
    background-color: rgba(255, 255, 255, 0.05);
  }

  &.active {
    color: white;
    background-color: rgba(255, 255, 255, 0.1);
    font-weight: 700;
  }
`;

// ---------------------------------------------------------
// 3. 우측 메인 영역 컴포넌트
// ---------------------------------------------------------
export const MainWrapper = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 2em; /* 전체 여백 */
  gap: 1.5em; /* 헤더와 대시보드 콘텐츠 사이 간격 */
  overflow-y: auto; /* 내용이 길어질 경우 스크롤 허용 */
`;

export const TopHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;

  .header-title {
    font-size: 1.8em;
    font-weight: 800;
    color: var(--primary-dark);
  }

  .header-actions {
    display: flex;
    gap: 1em;
  }
`;

export const HeaderBtn = styled.button`
  padding: 0.6em 1.2em;
  font-size: 1em;
  font-weight: 600;
  color: var(--primary-dark);
  background-color: white;
  border: 1px solid #cbd5e1;
  border-radius: 0.6em;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #f1f5f9;
  }

  &.alert {
    border-color: rgba(230, 57, 70, 0.3);
    color: #e63946;
    background-color: rgba(230, 57, 70, 0.05);

    &:hover {
      background-color: rgba(230, 57, 70, 0.1);
    }
  }
`;

// ---------------------------------------------------------
// 4. 공통 카드 컴포넌트
// ---------------------------------------------------------
export const BaseCard = styled.div`
  background: white;
  border-radius: 1.2em;
  padding: 1.5em;
  box-shadow: 0 0.2em 0.8em rgba(0, 0, 0, 0.04);
  display: flex;
  flex-direction: column;
`;

export const CardTitle = styled.h3`
  font-size: 1.2em;
  font-weight: 700;
  color: var(--primary-dark);
  margin-bottom: 1em;
`;
