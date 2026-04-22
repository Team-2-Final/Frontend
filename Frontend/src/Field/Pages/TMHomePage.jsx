import styled from 'styled-components';
import FieldPageShell from '../Components/FieldPageShell';

export default function TMHomePage() {
  return (
    <FieldPageShell title="Home" rightText="Alert 2">
      <TopArea>
        <HeroCard>
          <div className="status">AI Monitoring Active</div>
          <h2>Sector 01 상태 정상</h2>
          <p>현재 주요 환경 수치와 AI 비전 분석 결과가 안정 범위에 있습니다.</p>
        </HeroCard>

        <CameraCard>
          <div className="camera">Live Camera</div>
          <div className="badge">AI Good</div>
        </CameraCard>
      </TopArea>

      <SectionTitle>핵심 환경 상태</SectionTitle>
      <StatusGrid>
        <StatusCard>
          <span>온도</span>
          <strong>24.2°C</strong>
        </StatusCard>
        <StatusCard>
          <span>습도</span>
          <strong>65%</strong>
        </StatusCard>
        <StatusCard>
          <span>CO2</span>
          <strong>410 ppm</strong>
        </StatusCard>
        <StatusCard>
          <span>토양수분</span>
          <strong>45%</strong>
        </StatusCard>
      </StatusGrid>

      <SectionTitle>빠른 조치</SectionTitle>
      <ActionGrid>
        <ActionBtn>급수 ON</ActionBtn>
        <ActionBtn>환기 ON</ActionBtn>
        <ActionBtn $light>자동모드</ActionBtn>
        <ActionBtn $danger>긴급정지</ActionBtn>
      </ActionGrid>

      <SectionTitle>최근 알림</SectionTitle>
      <AlertList>
        <AlertItem>
          <div>
            <h4>온도 상승 감지</h4>
            <p>현재 온도가 목표치 상단에 근접했습니다.</p>
          </div>
          <time>2분 전</time>
        </AlertItem>
        <AlertItem>
          <div>
            <h4>AI 관수 증가 권장</h4>
            <p>일사량 증가를 반영해 급수량 증가가 권장됩니다.</p>
          </div>
          <time>7분 전</time>
        </AlertItem>
      </AlertList>
    </FieldPageShell>
  );
}

const TopArea = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 12px;
  margin-bottom: 14px;

  @media (min-width: 768px) {
    grid-template-columns: 1fr 1.1fr;
    gap: 16px;
    margin-bottom: 18px;
  }
`;

const HeroCard = styled.section`
  background: linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%);
  border-radius: 20px;
  padding: 18px;

  .status {
    display: inline-flex;
    padding: 7px 10px;
    border-radius: 999px;
    background: ${({ theme }) => theme.colors.white};
    color: ${({ theme }) => theme.colors.primary};
    font-size: 12px;
    font-weight: 800;
    margin-bottom: 12px;
  }

  h2 {
    font-size: 22px;
    margin-bottom: 8px;
  }

  p {
    font-size: 14px;
    color: ${({ theme }) => theme.colors.subText};
    line-height: 1.45;
  }

  @media (min-width: 768px) {
    h2 {
      font-size: 26px;
    }
  }
`;

const CameraCard = styled.div`
  position: relative;
  height: 190px;
  border-radius: 20px;
  overflow: hidden;
  background: ${({ theme }) => theme.colors.white};

  .camera {
    height: 100%;
    background: #d1d5db;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #374151;
    font-weight: 800;
    font-size: 18px;
  }

  .badge {
    position: absolute;
    top: 12px;
    right: 12px;
    padding: 8px 11px;
    border-radius: 999px;
    background: rgba(15, 23, 42, 0.82);
    color: #fff;
    font-size: 12px;
    font-weight: 800;
  }

  @media (min-width: 768px) {
    height: 240px;
  }
`;

const SectionTitle = styled.h3`
  font-size: 16px;
  font-weight: 800;
  margin: 10px 0 12px;

  @media (min-width: 768px) {
    font-size: 18px;
    margin: 14px 0 12px;
  }
`;

const StatusGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;

  @media (min-width: 768px) {
    grid-template-columns: repeat(4, 1fr);
    gap: 12px;
  }
`;

const StatusCard = styled.div`
  background: ${({ theme }) => theme.colors.card};
  border-radius: 16px;
  padding: 14px;

  span {
    display: block;
    font-size: 12px;
    color: ${({ theme }) => theme.colors.subText};
    margin-bottom: 6px;
    font-weight: 700;
  }

  strong {
    font-size: 22px;
    font-weight: 800;
  }
`;

const ActionGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
`;

const ActionBtn = styled.button`
  height: 50px;
  border-radius: 14px;
  font-weight: 800;
  background: ${({ $danger, $light, theme }) =>
    $danger
      ? theme.colors.dangerBg
      : $light
        ? theme.colors.border
        : theme.colors.primary};
  color: ${({ $danger, $light, theme }) =>
    $danger ? theme.colors.danger : $light ? theme.colors.text : '#fff'};
`;

const AlertList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const AlertItem = styled.div`
  background: ${({ theme }) => theme.colors.card};
  border-radius: 16px;
  padding: 14px;
  display: flex;
  justify-content: space-between;
  gap: 10px;

  h4 {
    font-size: 15px;
    margin-bottom: 6px;
  }

  p {
    font-size: 13px;
    color: ${({ theme }) => theme.colors.subText};
    line-height: 1.4;
  }

  time {
    font-size: 12px;
    color: #9ca3af;
    font-weight: 700;
    white-space: nowrap;
  }
`;
