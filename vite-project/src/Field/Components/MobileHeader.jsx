import styled from 'styled-components';

export default function MobileHeader({
  onMenuClick,
  title = 'Sector 01',
  rightText = 'Alert 0',
}) {
  return (
    <Header>
      <Left>
        <MenuButton onClick={onMenuClick}>☰</MenuButton>
        <Title>{title}</Title>
      </Left>
      <Badge>{rightText}</Badge>
    </Header>
  );
}

const Header = styled.header`
  height: 56px;
  min-height: 56px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 14px;
  background: ${({ theme }) => theme.colors.white};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

const Left = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const MenuButton = styled.button`
  width: 38px;
  height: 38px;
  border-radius: 10px;
  background: ${({ theme }) => theme.colors.soft};
  font-size: 20px;
`;

const Title = styled.div`
  font-size: 16px;
  font-weight: 800;
  color: ${({ theme }) => theme.colors.text};
`;

const Badge = styled.div`
  padding: 7px 12px;
  border-radius: 999px;
  background: ${({ theme }) => theme.colors.dangerBg};
  color: ${({ theme }) => theme.colors.danger};
  font-size: 12px;
  font-weight: 800;
`;
