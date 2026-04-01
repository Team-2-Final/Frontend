import styled from 'styled-components';
import {
  Container,
  Section,
  SectionLabel,
  SectionTitle,
  SectionDesc,
  MockBox,
} from '../styles/landingStyled';

const SolutionInner = styled.div`
  display: grid;
  grid-template-columns: 0.9fr 1.1fr;
  gap: 48px;
  align-items: center;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

const MediumMock = styled(MockBox)`
  min-height: 320px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const PlantMock = styled.div`
  width: 200px;
  height: 200px;
  border-radius: 24px;
  background: linear-gradient(135deg, #66bb6a, #00c2a8);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 42px;
  font-weight: 800;
`;

const BulletList = styled.ul`
  margin-top: 24px;
  padding-left: 20px;
  color: #334155;

  li {
    margin-bottom: 14px;
    font-size: 17px;
  }
`;

const Solution = () => {
  return (
    <Section id="solution" bg="#F8FBF8">
      <Container>
        <SolutionInner>
          <MediumMock>
            <PlantMock>AI</PlantMock>
          </MediumMock>

          <div>
            <SectionLabel>SOLUTION SECTION</SectionLabel>
            <SectionTitle>AI 자동 관리 솔루션</SectionTitle>
            <SectionDesc>
              카메라, 센서, AI 분석을 결합해 작물 상태를 빠르게 파악하고 더
              정확하게 대응합니다.
            </SectionDesc>

            <BulletList>
              <li>실시간 생육 상태 분석</li>
              <li>환경 데이터 기반 자동 제어</li>
              <li>이상 징후 조기 감지</li>
              <li>데이터 기반 의사결정 지원</li>
            </BulletList>
          </div>
        </SolutionInner>
      </Container>
    </Section>
  );
};

export default Solution;
