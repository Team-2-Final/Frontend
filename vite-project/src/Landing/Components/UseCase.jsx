import styled from 'styled-components';
import {
  Container,
  Section,
  SectionLabel, // 사용하지 않는다면 제거해도 무방합니다.
  SectionTitle,
  SectionDesc,
  CardGrid,
  BaseCard,
  AnimatedBox, // 💡 애니메이션 래퍼 추가
} from '../styles/landingStyled';
import { useScrollFadeIn } from '../../hooks/useScrollFadeIn'; // 💡 커스텀 훅 추가

const UseCaseCard = styled(BaseCard)`
  overflow: hidden;

  /* 💡 카드 크기 통일을 위한 CSS 추가 */
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const UseCaseImage = styled.div`
  height: 220px;
  background: linear-gradient(135deg, #cfe7d2, #9bcfa3);
  flex-shrink: 0; /* 💡 이미지가 찌그러지지 않도록 고정 */
`;

const UseCaseBody = styled.div`
  padding: 24px;

  /* 💡 남은 공간을 채우도록 설정 */
  display: flex;
  flex-direction: column;
  flex-grow: 1;

  h3 {
    font-size: 22px;
    margin-bottom: 10px;
  }

  p {
    font-size: 16px;
    line-height: 1.7;
    color: #475569;
    margin: 0;
    flex-grow: 1; /* 💡 텍스트가 짧아도 공간을 꽉 채우게 만듦 */
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
  // 💡 스크롤 감지 훅 호출
  const { ref: sectionRef, className: animateClass } = useScrollFadeIn();

  return (
    <Section id="usecase" bg="#FFFFFF">
      {/* 💡 Container에 ref를 달아 스크롤 트리거 영역으로 설정 */}
      <Container ref={sectionRef}>
        {/* 💡 텍스트 영역이 제일 먼저 나타납니다 (delay 0s) */}
        <AnimatedBox className={animateClass} delay="0s">
          <SectionTitle>이런 곳에 적용됩니다</SectionTitle>
          <SectionDesc>
            다양한 재배 환경에 맞춰 유연하게 적용할 수 있는 스마트팜
            솔루션입니다.
          </SectionDesc>
        </AnimatedBox>

        <CardGrid columns={3}>
          {data.map((item, index) => (
            // 💡 index를 활용해 카드가 0.1s, 0.2s, 0.3s 순으로 등장하게 설정
            <AnimatedBox
              key={item.title}
              className={animateClass}
              delay={`${0.1 + index * 0.1}s`}
              style={{
                height: '100%',
              }} /* 💡 애니메이션 래퍼도 그리드 셀의 높이를 가득 채우도록 설정 */
            >
              <UseCaseCard>
                <UseCaseImage />
                <UseCaseBody>
                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>
                </UseCaseBody>
              </UseCaseCard>
            </AnimatedBox>
          ))}
        </CardGrid>
      </Container>
    </Section>
  );
};

export default UseCase;
