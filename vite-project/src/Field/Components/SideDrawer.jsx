import styled from 'styled-components';
import { Link, useLocation } from 'react-router-dom';

export default function SideDrawer({ open, onClose }) {
  const location = useLocation();

  const menus = [
    { label: 'Home', path: '/field' },
    { label: 'Alerts', path: '/field/alerts' },
    { label: 'Camera', path: '/field/camera' },
    { label: 'Control', path: '/field/control' },
  ];

  return (
    <>
      <Overlay $open={open} onClick={onClose} />
      <Drawer $open={open}>
        <TopBox>
          <Logo>Seed Farm</Logo>
          <SubText>Field Interface</SubText>
        </TopBox>

        <MenuList>
          {menus.map((menu) => (
            <MenuItem
              key={menu.path}
              as={Link}
              to={menu.path}
              onClick={onClose}
              $active={location.pathname === menu.path}
            >
              {menu.label}
            </MenuItem>
          ))}
        </MenuList>
      </Drawer>
    </>
  );
}

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(15, 23, 42, 0.4);
  opacity: ${({ $open }) => ($open ? 1 : 0)};
  visibility: ${({ $open }) => ($open ? 'visible' : 'hidden')};
  transition: 0.25s ease;
  z-index: 99;
`;

const Drawer = styled.aside`
  position: fixed;
  top: 0;
  left: 0;
  width: 260px;
  max-width: 82%;
  height: 100vh;
  background: ${({ theme }) => theme.colors.white};
  box-shadow: 10px 0 30px rgba(0, 0, 0, 0.14);
  transform: ${({ $open }) => ($open ? 'translateX(0)' : 'translateX(-100%)')};
  transition: 0.25s ease;
  z-index: 100;
  padding: 20px 16px;
`;

const TopBox = styled.div`
  padding: 6px 4px 18px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

const Logo = styled.h2`
  font-size: 20px;
  font-weight: 800;
  color: ${({ theme }) => theme.colors.text};
`;

const SubText = styled.p`
  margin-top: 6px;
  font-size: 13px;
  color: ${({ theme }) => theme.colors.subText};
`;

const MenuList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding-top: 18px;
`;

const MenuItem = styled(Link)`
  display: flex;
  align-items: center;
  height: 46px;
  padding: 0 14px;
  border-radius: 12px;
  font-size: 15px;
  font-weight: 700;
  color: ${({ $active, theme }) =>
    $active ? theme.colors.primary : theme.colors.text};
  background: ${({ $active, theme }) =>
    $active ? theme.colors.successBg : 'transparent'};

  &:hover {
    background: ${({ theme }) => theme.colors.soft};
  }
`;
