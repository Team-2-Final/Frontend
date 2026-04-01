import styled from 'styled-components';
import {
  Container,
  Section,
  SectionLabel,
  SectionTitle,
  SectionDesc,
  BaseCard,
  theme,
} from '../styles/landingStyled';

const Flow = styled.div`
  display: grid;
  grid-template-columns: 1fr 60px 1fr 60px 1fr 60px 1fr;
  align-items: center;
  gap: 16px;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

const Step = styled(BaseCard)`
  min-height: 220px;
  padding: 24px;
  text-align: center;

  h3 {
    font-size: 22px;
    margin-bottom: 10px;
  }

  p {
    font-size: 16px;
    line-height: 1.7;
    color: #475569;
  }
`;

const Icon = styled.div`
  font-size: 40px;
  margin-bottom: 18px;
`;

const Arrow = styled.div`
  font-size: 32px;
  font-weight: 800;
  color: ${theme.colors.primary};
  text-align: center;

  @media (max-width: 1024px) {
    transform: rotate(90deg);
  }
`;

const System = () => {
  return (
    <Section id="system" bg="#F8FBF8">
      <Container>
        <SectionLabel>SYSTEM SECTION</SectionLabel>
        <SectionTitle>스마트팜 시스템 구성</SectionTitle>
        <SectionDesc>
          현장의 데이터를 수집하고, AI가 분석한 결과를 대시보드와 제어
          시스템으로 연결합니다.
        </SectionDesc>

        <Flow>
          <Step>
            <Icon>📷</Icon>
            <h3>카메라</h3>
            <p>작물 이미지 수집</p>
          </Step>

          <Arrow>→</Arrow>

          <Step>
            <Icon>🌡</Icon>
            <h3>센서</h3>
            <p>환경 데이터 수집</p>
          </Step>

          <Arrow>→</Arrow>

          <Step>
            <Icon>🧠</Icon>
            <h3>AI 분석</h3>
            <p>생육/이상 상태 판단</p>
          </Step>

          <Arrow>→</Arrow>

          <Step>
            <Icon>📱</Icon>
            <h3>모니터링</h3>
            <p>실시간 확인 및 제어</p>
          </Step>
        </Flow>
      </Container>
    </Section>
  );
};

export default System;
