import styled from 'styled-components';
import {
  Container,
  Section,
  SectionLabel,
  SectionTitle,
  SectionDesc,
  CardGrid,
  BaseCard,
} from '../styles/landingStyled';

const UseCaseCard = styled(BaseCard)`
  overflow: hidden;
`;

const UseCaseImage = styled.div`
  height: 220px;
  background: linear-gradient(135deg, #cfe7d2, #9bcfa3);
`;

const UseCaseBody = styled.div`
  padding: 24px;

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
    title: '온실 농장',
    desc: '온도, 습도, CO2를 정밀하게 관리하는 환경에 적합합니다.',
  },
  {
    title: '묘목 재배',
    desc: '초기 생육 상태를 세밀하게 분석하고 이상 징후를 빠르게 감지합니다.',
  },
  {
    title: '스마트 재배 시설',
    desc: '자동화 설비와 연동해 효율적인 운영 체계를 구축할 수 있습니다.',
  },
];

const UseCase = () => {
  return (
    <Section id="usecase" bg="#FFFFFF">
      <Container>
        <SectionLabel>USECASE SECTION</SectionLabel>
        <SectionTitle>이런 곳에 적용됩니다</SectionTitle>
        <SectionDesc>
          다양한 재배 환경에 맞춰 유연하게 적용할 수 있는 스마트팜 솔루션입니다.
        </SectionDesc>

        <CardGrid columns={3}>
          {data.map((item) => (
            <UseCaseCard key={item.title}>
              <UseCaseImage />
              <UseCaseBody>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </UseCaseBody>
            </UseCaseCard>
          ))}
        </CardGrid>
      </Container>
    </Section>
  );
};

export default UseCase;
