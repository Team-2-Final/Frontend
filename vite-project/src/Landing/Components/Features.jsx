import styled from 'styled-components';
import {
  Container,
  Section,
  SectionLabel,
  SectionTitle,
  SectionDesc,
  CardGrid,
  BaseCard,
  IconCircle,
} from '../styles/landingStyled';

const FeatureCard = styled(BaseCard)`
  padding: 28px;

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

const data = [
  {
    title: 'AI 생육 분석',
    desc: '잎 색상, 형태, 상태를 분석해 이상 여부를 빠르게 파악합니다.',
  },
  {
    title: '자동 환경 제어',
    desc: '온도, 습도, 급수 등 주요 환경 요소를 자동으로 조절합니다.',
  },
  {
    title: '실시간 모니터링',
    desc: '언제 어디서든 농장 상태를 대시보드에서 한눈에 확인할 수 있습니다.',
  },
  {
    title: '데이터 기반 예측',
    desc: '생산성과 운영 효율을 데이터 중심으로 관리할 수 있습니다.',
  },
];

const Features = () => {
  return (
    <Section id="features" bg="#FFFFFF">
      <Container>
        <SectionLabel>FEATURES SECTION</SectionLabel>
        <SectionTitle>스마트팜 운영을 위한 핵심 기능</SectionTitle>
        <SectionDesc>
          Seed Farm은 작물 상태 분석부터 자동 제어, 모니터링까지 하나의 흐름으로
          연결합니다.
        </SectionDesc>

        <CardGrid columns={4}>
          {data.map((item) => (
            <FeatureCard key={item.title}>
              <IconCircle>●</IconCircle>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </FeatureCard>
          ))}
        </CardGrid>
      </Container>
    </Section>
  );
};

export default Features;
