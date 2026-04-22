import { useState } from 'react';
import styled from 'styled-components';
import MobileHeader from './MobileHeader';
import SideDrawer from './SideDrawer';

export default function FieldPageShell({ title, rightText, children }) {
  const [open, setOpen] = useState(false);

  return (
    <Page>
      <MobileHeader
        onMenuClick={() => setOpen(true)}
        title={title}
        rightText={rightText}
      />
      <SideDrawer open={open} onClose={() => setOpen(false)} />
      <Body>{children}</Body>
    </Page>
  );
}

const Page = styled.div`
  width: 100%;
  height: 100vh;
  background: ${({ theme }) => theme.colors.bg};
  overflow: hidden;
`;

const Body = styled.main`
  height: calc(100vh - 56px);
  overflow-y: auto;
  padding: 12px;

  @media (min-width: 768px) {
    padding: 16px;
  }
`;
