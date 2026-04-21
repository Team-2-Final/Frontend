import styled from 'styled-components';
import {
  Container,
  Section,
  SectionTitle,
  SectionDesc,
  AnimatedBox,
  SectionLabel,
} from '../styles/landingStyled';
import { useScrollFadeIn } from '../../hooks/useScrollFadeIn';

/* -------------------------------------------------------------------------- */
/* DATA DEFINITIONS                                                           */
/* -------------------------------------------------------------------------- */

const sensorData = [
  {
    label: 'Temperature',
    value: '24.2',
    unit: '°C',
    trend: '+0.5',
    status: 'stable',
  },
  { label: 'Humidity', value: '65', unit: '%', trend: '-2', status: 'down' },
  { label: 'CO2 Level', value: '410', unit: 'ppm', trend: '+15', status: 'up' },
  {
    label: 'Radiation',
    value: '350',
    unit: 'W/m²',
    trend: 'Sunny',
    status: 'stable',
  },
  {
    label: 'Soil EC',
    value: '1.2',
    unit: 'dS/m',
    trend: 'Stable',
    status: 'stable',
  },
  {
    label: 'Soil pH',
    value: '5.8',
    unit: '',
    trend: 'Stable',
    status: 'stable',
  },
];

const deviceLogs = [
  {
    id: 1,
    time: '14:10',
    sector: 'Sector 01',
    zone: 'Section A',
    device: '💧 관수 펌프',
    action: '가동 중',
    desc: 'Water 2.5L / EC 1.2 투입 완료',
    status: 'active',
  },
  {
    id: 2,
    time: '13:30',
    sector: 'Sector 02',
    zone: 'Section C',
    device: '💨 배기팬 2번',
    action: 'Level 2 전개',
    desc: '목표 온도 도달을 위한 강제 배기',
    status: 'active',
  },
  {
    id: 3,
    time: '11:00',
    sector: 'All Sectors',
    zone: 'Roof',
    device: '🌤️ 차광 스크린',
    action: '50% 닫힘',
    desc: '외부 일사량 초과 연동 제어',
    status: 'done',
  },
];

const aiLogs = [
  {
    time: '14:25',
    status: 'action',
    title: '관수량 10% 증가 권장',
    desc: '오후 일사량 급증 예상 (신뢰도: 95%)',
  },
  {
    time: '13:55',
    status: 'warning',
    title: '환기 타이밍 경고',
    desc: '향후 1시간 내 내부 온도 28°C 돌파 예상',
  },
];

const growthData = [
  { label: '초장 (Height)', value: '124.5 cm' },
  { label: '엽수 (Leaves)', value: '18 개' },
  { label: '엽장 (Length)', value: '15.2 cm' },
  { label: '엽폭 (Width)', value: '12.0 cm' },
];

const showcaseCards = [
  {
    title: '실시간 센서 모니터링',
    desc: '온도, 습도, CO₂, EC 등 핵심 데이터를 실시간 확인합니다.',
    className: 'leftTop',
  },
  {
    title: '비전 기반 생육 분석',
    desc: '카메라를 통해 잎 상태와 생육 편차를 파악합니다.',
    className: 'leftBottom',
  },
  {
    title: '이상 알림 및 경고',
    desc: '환경 변화와 생육 패턴을 바탕으로 위험 신호를 알려줍니다.',
    className: 'rightTop',
  },
  {
    title: '자동 제어 로그',
    desc: '관수, 환기 등 자동화 설비의 동작 이력을 보여줍니다.',
    className: 'rightMiddle',
  },
  {
    title: 'AI 운영 인사이트',
    desc: '환경과 생육 상태를 종합해 대응 방향을 제안합니다.',
    className: 'rightBottom',
  },
];

/* -------------------------------------------------------------------------- */
/* MAIN COMPONENT                                                            */
/* -------------------------------------------------------------------------- */

const Dashboard = () => {
  const { ref: sectionRef, className: animateClass } = useScrollFadeIn();

  return (
    <DashboardWrap id="dashboard">
      <Container ref={sectionRef}>
        <AnimatedBox className={animateClass} $delay="0s">
          <SectionLabel>Dashboard Showcase</SectionLabel>
          <SectionTitle>AI 대시보드 미리보기</SectionTitle>
          <SectionDesc>
            Seed Farm의 스마트팜 통합 관제 시스템이 어떻게 구성되는지 한눈에
            보여주는 예시입니다.
          </SectionDesc>
        </AnimatedBox>

        <DashboardShowcase>
          {/* 1. 설명창(Floating Cards) 위치 지정 및 애니메이션 */}
          {showcaseCards.map((card, index) => (
            <FloatingWrapper key={card.title} className={card.className}>
              <AnimatedBox
                className={animateClass}
                $delay={`${0.2 + index * 0.1}s`}
              >
                <FloatingCard>
                  <h4>{card.title}</h4>
                  <p>{card.desc}</p>
                </FloatingCard>
              </AnimatedBox>
            </FloatingWrapper>
          ))}

          {/* 2. 메인 대시보드 배경 및 내부 카드 순차 등장 */}
          <AnimatedBox className={animateClass} $delay="0.1s">
            <DashboardMock>
              <ContentGrid>
                <LeftColumn>
                  <AnimatedBox className={animateClass} $delay="0.4s">
                    <FarmSummaryCard>
                      <div className="header-row">
                        <div>
                          <CardTitle>Farm Overview</CardTitle>
                          <div className="branch-name">
                            천안 본점 (Cheonan Hub)
                          </div>
                        </div>
                        <span className="optimal-badge">Phase: 개화기 🌸</span>
                      </div>
                      <div className="summary-body">
                        <div className="score-area">
                          <span className="score">96</span>
                          <span className="label">/ 100 pt</span>
                        </div>
                        <p className="status-text">
                          작물 활력도 최상 (전주 대비 2% ↗)
                        </p>
                        <div className="metrics-row">
                          <div className="metric-box">
                            <span className="m-label">진행중인 이슈</span>
                            <span className="m-value warning">
                              ⚠️ 1 건 확인 요망
                            </span>
                          </div>
                          <div className="divider" />
                          <div className="metric-box">
                            <span className="m-label">다음 예정 작업</span>
                            <span className="m-value normal">
                              자동 방제 (14:00)
                            </span>
                          </div>
                        </div>
                      </div>
                    </FarmSummaryCard>
                  </AnimatedBox>

                  <AnimatedBox className={animateClass} $delay="0.5s">
                    <SensorsGroupCard>
                      <CardTitle>Real-time Sensors</CardTitle>
                      <SensorGrid>
                        {sensorData.map((sensor, idx) => (
                          <SensorItem key={idx}>
                            <div className="label">{sensor.label}</div>
                            <div className="value-row">
                              <span className="value">{sensor.value}</span>
                              <span className="unit">{sensor.unit}</span>
                            </div>
                            <div className={`trend ${sensor.status}`}>
                              {sensor.trend}
                            </div>
                          </SensorItem>
                        ))}
                      </SensorGrid>
                    </SensorsGroupCard>
                  </AnimatedBox>
                </LeftColumn>

                <MiddleColumn>
                  <AnimatedBox className={animateClass} $delay="0.6s">
                    <LogGroupCard>
                      <div className="log-header">
                        <CardTitle>Device Activity Logs</CardTitle>
                        <span className="sub-badge system">System Auto</span>
                      </div>
                      <LogList>
                        {deviceLogs.map((log) => (
                          <DeviceLogItem key={log.id}>
                            <div className="log-top">
                              <div className="badges">
                                <span className="sector-badge">
                                  {log.sector}
                                </span>
                              </div>
                              <span className="time">{log.time}</span>
                            </div>
                            <div className="log-mid">
                              <span className="device">{log.device}</span>
                              <span className={`action ${log.status}`}>
                                {log.action}
                              </span>
                            </div>
                            <span className="desc">{log.desc}</span>
                          </DeviceLogItem>
                        ))}
                      </LogList>
                    </LogGroupCard>
                  </AnimatedBox>
                </MiddleColumn>

                <RightColumn>
                  <AnimatedBox className={animateClass} $delay="0.7s">
                    <CameraCard>
                      <div className="header-row">
                        <CardTitle>Live Feed</CardTitle>
                        <span className="cam-label">Cam 01</span>
                      </div>
                      <div className="placeholder-content">
                        <div className="pulse-ring" />
                        <span className="icon">📹</span>
                        <span className="text">Streaming...</span>
                      </div>
                    </CameraCard>
                  </AnimatedBox>

                  <AnimatedBox className={animateClass} $delay="0.8s">
                    <GrowthCard>
                      <CardTitle>Crop Status</CardTitle>
                      <GrowthGrid>
                        {growthData.map((item, idx) => (
                          <div className="g-item" key={idx}>
                            <span className="l">{item.label}</span>
                            <span className="v">{item.value}</span>
                          </div>
                        ))}
                      </GrowthGrid>
                    </GrowthCard>
                  </AnimatedBox>

                  <AnimatedBox className={animateClass} $delay="0.9s">
                    <AILogGroupCard>
                      <div className="log-header">
                        <CardTitle>AI Insights</CardTitle>
                        <span className="sub-badge ai">AI Active</span>
                      </div>
                      <AILogList>
                        {aiLogs.map((log, idx) => (
                          <AILogItem key={idx} className={log.status}>
                            <div className="top-row">
                              <span className="badge">
                                {log.status === 'action' ? '추천' : '경고'}
                              </span>
                              <span className="time">{log.time}</span>
                            </div>
                            <div className="title">{log.title}</div>
                            <div className="desc">{log.desc}</div>
                          </AILogItem>
                        ))}
                      </AILogList>
                    </AILogGroupCard>
                  </AnimatedBox>
                </RightColumn>
              </ContentGrid>
            </DashboardMock>
          </AnimatedBox>
        </DashboardShowcase>
      </Container>
    </DashboardWrap>
  );
};

export default Dashboard;

/* -------------------------------------------------------------------------- */
/* STYLED COMPONENTS (Stripe Style)                                           */
/* -------------------------------------------------------------------------- */

const DashboardWrap = styled(Section)`
  color: #1a1f36;
`;

const DashboardShowcase = styled.div`
  position: relative;
  margin-top: 40px;
  /* 설명창이 화면 밖으로 나가지 않도록 여백 확보 */
  padding: 20px 40px;

  @media (max-width: 1280px) {
    padding: 0;
  }
`;

const DashboardMock = styled.div`
  background: #f6f9fc;
  border: 1px solid #e6ebf1;
  border-radius: 12px;
  padding: 32px;
  box-shadow:
    0 50px 100px -20px rgba(50, 50, 93, 0.08),
    0 30px 60px -30px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    padding: 16px;
  }
`;

const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: 2fr 1.5fr 1.2fr;
  gap: 1.5em;

  @media (max-width: 1180px) {
    grid-template-columns: 1fr 1fr;
    & > div:nth-child(3) {
      grid-column: 1 / 3;
      flex-direction: row;
    }
  }
  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
  }
`;

const BaseCard = styled.div`
  background: #ffffff;
  border-radius: 8px;
  padding: 1.5em;
  border: 1px solid #e6ebf1;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
`;

const CardTitle = styled.h3`
  font-size: 0.95em;
  font-weight: 600;
  color: #1a1f36;
  margin: 0 0 1em 0;
  text-transform: uppercase;
  letter-spacing: 0.025em;
`;

/* Columns */
const LeftColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5em;
`;
const MiddleColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5em;
`;
const RightColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5em;
`;

/* Individual Cards */
const FarmSummaryCard = styled(BaseCard)`
  .branch-name {
    font-size: 0.8em;
    color: #697386;
    margin-top: 4px;
  }
  .optimal-badge {
    background: #e3fbed;
    color: #0d7f52;
    padding: 4px 10px;
    border-radius: 12px;
    font-size: 0.75em;
    font-weight: 600;
  }
  .score {
    font-size: 2.8rem;
    font-weight: 700;
    color: #1a1f36;
  }
  .metrics-row {
    display: flex;
    background: #f6f9fc;
    padding: 12px;
    border-radius: 8px;
    margin-top: 16px;
    border: 1px solid #e6ebf1;
  }
  .divider {
    width: 1px;
    background: #e6ebf1;
    margin: 0 16px;
  }
  .m-label {
    font-size: 0.7em;
    color: #697386;
    font-weight: 600;
  }
  .m-value {
    font-size: 0.9em;
    font-weight: 600;
  }
  .m-value.warning {
    color: #d92d20;
  }
`;

const SensorsGroupCard = styled(BaseCard)``;
const SensorGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
`;
const SensorItem = styled.div`
  background: #f8fafc;
  padding: 12px;
  border-radius: 6px;
  border: 1px solid #e6ebf1;
  .label {
    font-size: 0.65em;
    color: #697386;
    font-weight: 600;
  }
  .value {
    font-size: 1.2em;
    font-weight: 700;
  }
  .trend {
    font-size: 0.7em;
    margin-top: 8px;
    font-weight: 600;
  }
  .trend.up {
    color: #d92d20;
  }
  .trend.down {
    color: #0055ff;
  }
  .trend.stable {
    color: #0d7f52;
  }
`;

const LogGroupCard = styled(BaseCard)`
  .sub-badge {
    font-size: 0.7em;
    padding: 2px 8px;
    border-radius: 4px;
    background: #f3f6f8;
    color: #3c4257;
    border: 1px solid #e6ebf1;
  }
`;
const LogList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;
const DeviceLogItem = styled.div`
  padding-bottom: 12px;
  border-bottom: 1px solid #f6f9fc;
  .log-top {
    display: flex;
    justify-content: space-between;
    font-size: 0.75em;
    color: #697386;
  }
  .log-mid {
    display: flex;
    justify-content: space-between;
    margin: 4px 0;
    font-weight: 600;
  }
  .desc {
    font-size: 0.8em;
    color: #697386;
  }
  .action.active {
    color: #0d7f52;
  }
`;

const CameraCard = styled(BaseCard)`
  .cam-label {
    font-size: 0.7em;
    color: #697386;
  }
  .placeholder-content {
    height: 150px;
    background: #1a1f36;
    border-radius: 6px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: white;
    position: relative;
    overflow: hidden;
  }
  .pulse-ring {
    position: absolute;
    width: 40px;
    height: 40px;
    border: 2px solid #0d7f52;
    border-radius: 50%;
    animation: radar 2s infinite;
  }
  @keyframes radar {
    0% {
      transform: scale(0.5);
      opacity: 1;
    }
    100% {
      transform: scale(2.5);
      opacity: 0;
    }
  }
`;

const GrowthCard = styled(BaseCard)``;
const GrowthGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
  .g-item {
    background: #f8fafc;
    padding: 8px;
    border-radius: 4px;
    .l {
      font-size: 0.65em;
      color: #697386;
    }
    .v {
      font-size: 0.9em;
      font-weight: 600;
    }
  }
`;

const AILogGroupCard = styled(BaseCard)`
  .sub-badge.ai {
    background: #f4f6fd;
    color: #635bff;
    font-size: 0.7em;
    padding: 2px 8px;
    border-radius: 4px;
  }
`;
const AILogList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
const AILogItem = styled.div`
  padding: 10px;
  border-radius: 6px;
  border: 1px solid #e6ebf1;
  &.action {
    background: #f8fafc;
  }
  &.warning {
    background: #fff5f5;
    border-color: #ffe0e0;
    .badge {
      color: #d92d20;
    }
  }
  .badge {
    font-size: 0.65em;
    font-weight: 700;
    color: #0d7f52;
  }
  .time {
    font-size: 0.7em;
    color: #697386;
  }
  .title {
    font-size: 0.85em;
    font-weight: 600;
    margin: 4px 0;
  }
  .desc {
    font-size: 0.75em;
    color: #697386;
    line-height: 1.4;
  }
`;

const FloatingWrapper = styled.div`
  position: absolute;
  z-index: 10;

  &.leftTop {
    top: -20px;
    left: -10px;
  }
  &.leftBottom {
    top: 320px;
    left: -30px;
  }
  &.rightTop {
    top: -30px;
    right: -10px;
  }
  &.rightMiddle {
    top: 220px;
    right: -40px;
  }
  &.rightBottom {
    top: 440px;
    right: 0px;
  }

  /* 반응형 처리: 화면이 작아지면 위로 나열 */
  @media (max-width: 1280px) {
    position: relative;
    top: 0 !important;
    left: 0 !important;
    right: 0 !important;
    width: 100%;
    margin-bottom: 12px;
  }
`;

/* 카드의 순수 디자인만 담당하는 컴포넌트 */
const FloatingCard = styled.div`
  width: 260px;
  background: #ffffff;
  border: 1px solid #e6ebf1;
  border-radius: 8px;
  padding: 16px;
  box-shadow:
    0 15px 35px rgba(50, 50, 93, 0.1),
    0 5px 15px rgba(0, 0, 0, 0.07);

  h4 {
    font-size: 14px;
    font-weight: 600;
    color: #1a1f36;
    margin-bottom: 4px;
  }

  p {
    font-size: 12px;
    line-height: 1.6;
    color: #697386;
    margin: 0;
  }

  @media (max-width: 1280px) {
    width: 100%;
  }
`;
