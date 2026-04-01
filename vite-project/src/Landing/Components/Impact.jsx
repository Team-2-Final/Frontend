import styled from 'styled-components';
import {
  Container,
  Section,
  SectionLabel,
  SectionTitle,
  SectionDesc,
  CardGrid,
  BaseCard,
  theme,
} from '../styles/landingStyled';

const ImpactCard = styled(BaseCard)`
  padding: 36px 20px;
  text-align: center;

  h3 {
    font-size: 52px;
    color: ${theme.colors.primary};
    margin-bottom: 10px;
  }

  p {
    font-size: 20px;
    color: #334155;
    font-weight: 600;
  }
`;

const data = [
  { value: '+30%', label: '수확량 증가' },
  { value: '-50%', label: '노동 시간 감소' },
  { value: '-70%', label: '병해 피해 감소' },
];

const Impact = () => {
  return (
    <Section id="impact" bg="#FFFFFF">
      <Container>
        <SectionLabel>IMPACT SECTION</SectionLabel>
        <SectionTitle>설치 농장의 성과</SectionTitle>
        <SectionDesc>
          스마트팜 AI 도입 후 기대할 수 있는 대표적인 운영 개선 지표입니다.
        </SectionDesc>

        <CardGrid columns={3}>
          {data.map((item) => (
            <ImpactCard key={item.label}>
              <h3>{item.value}</h3>
              <p>{item.label}</p>
            </ImpactCard>
          ))}
        </CardGrid>
      </Container>
    </Section>
  );
};

export default Impact;
