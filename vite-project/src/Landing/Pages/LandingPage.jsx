import { useState } from 'react';
import styled from 'styled-components';

const Base = styled.div`
  width: 1920px;
  height: 1080px;
  border: 1px, solid, black;
`;

const contener = styled.div``;

function LandingPage() {
  return (
    <Base>
      <p>랜딩 페이지</p>
    </Base>
  );
}

export default LandingPage;
