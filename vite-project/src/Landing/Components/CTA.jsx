import styled from 'styled-components';
import {
  Container,
  Section,
  SectionLabel,
  SectionTitle,
  PrimaryButton,
} from '../styles/landingStyled';

const CTAWrap = styled(Section)`
  padding: 0;
  background: linear-gradient(135deg, #2e7d32, #66bb6a);
`;

const CTAInner = styled.div`
  min-height: 300px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 32px;

  @media (max-width: 1024px) {
    min-height: 260px;
    flex-direction: column;
    justify-content: center;
    text-align: center;
  }
`;

const CTAText = styled.div`
  h2 {
    color: white;
    margin-bottom: 12px;
  }

  p {
    font-size: 20px;
    color: rgba(255, 255, 255, 0.9);
  }

  @media (max-width: 640px) {
    p {
      font-size: 16px;
    }
  }
`;

const CTAButton = styled(PrimaryButton)`
  background: white;
  color: #2e7d32;
  min-width: 220px;
`;

const CTA = () => {
  return (
    <CTAWrap id="contact">
      <Container>
        <CTAInner>
          <CTAText>
            <SectionLabel light>CTA SECTION</SectionLabel>
            <SectionTitle>지금 바로 스마트팜을 자동화하세요</SectionTitle>
            <p>AI 기반 농장 관리로 수익은 높이고 비용은 줄이세요.</p>
          </CTAText>

          <div>
            <CTAButton>무료 상담 신청</CTAButton>
          </div>
        </CTAInner>
      </Container>
    </CTAWrap>
  );
};

export default CTA;
