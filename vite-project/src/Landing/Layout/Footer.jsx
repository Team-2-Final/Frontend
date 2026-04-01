import styled from 'styled-components';
import { Container, FooterLink } from '../styles/landingStyled';

const FooterWrap = styled.footer`
  background: #0f172a;
  color: white;
  min-height: 260px;
  padding-top: 48px;

  @media (max-width: 640px) {
    min-height: auto;
  }
`;

const FooterTop = styled.div`
  display: grid;
  grid-template-columns: 1.2fr 1fr 1fr;
  gap: 80px;
  padding-bottom: 28px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.12);

  @media (max-width: 1024px) {
    grid-template-columns: 1fr 1fr;
    gap: 40px;
  }

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

const FooterCol = styled.div`
  h4 {
    font-size: 22px;
    margin-bottom: 18px;
  }

  p {
    font-size: 16px;
    line-height: 1.7;
    color: rgba(255, 255, 255, 0.78);
    margin-bottom: 10px;
  }
`;

const FooterLogo = styled.h3`
  font-size: 36px;
  color: #66bb6a;
  margin-bottom: 14px;
`;

const FooterBottom = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 72px;

  p {
    color: rgba(255, 255, 255, 0.7);
    font-size: 14px;
  }
`;

const Footer = () => {
  return (
    <FooterWrap>
      <Container>
        <FooterTop>
          <FooterCol>
            <FooterLogo>Seed Farm</FooterLogo>
            <p>AI 기반 스마트팜 관리 솔루션</p>
          </FooterCol>

          <FooterCol>
            <h4>Quick Links</h4>
            <FooterLink href="#features">Features</FooterLink>
            <FooterLink href="#dashboard">Dashboard</FooterLink>
            <FooterLink href="#usecase">UseCase</FooterLink>
            <FooterLink href="#contact">Contact</FooterLink>
          </FooterCol>

          <FooterCol>
            <h4>Contact</h4>
            <p>010-1234-5678</p>
            <p>seedfarm@gmail.com</p>
            <p>GitHub</p>
          </FooterCol>
        </FooterTop>

        <FooterBottom>
          <p>© 2026 Seed Farm. All rights reserved.</p>
        </FooterBottom>
      </Container>
    </FooterWrap>
  );
};

export default Footer;
