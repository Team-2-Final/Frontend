import React from 'react';
import styled from 'styled-components';
import Sidebar from '../Components/Sidebar';
import {
  PageContainer,
  MainWrapper,
  TopHeader,
  HeaderBtn,
  BaseCard,
  CardTitle,
} from './Styles/AdminShared';

const DashboardPage = () => {
  // 예시 데이터: 실시간 센서 수치
  const sensorData = [
    { label: 'Plant Health', value: '98%', trend: '+0.5%' },
    { label: 'Air Temp (°C)', value: '24.2°C', trend: '-0.3°C' },
    { label: 'RH (%)', value: '65%', trend: '+2%' },
    { label: 'Soil Moisture (%)', value: '42%', trend: '-1%' },
    { label: 'Air Quality (VOC)', value: 'Good', trend: '' },
    { label: 'Wind Speed', value: '1.2m/s', trend: '' },
  ];

  // 예시 데이터: 상세 디바이스 활동 로그 (이슈 포함)
  const deviceLogs = [
    {
      time: '14:25',
      device: 'Mist Nozzle #1',
      status: 'normal',
      action: '습도 조절 (Mist ON: from 60% to 70%, +10%)',
      sector: 'Sector 1-Zone A',
    },
    {
      time: '14:10',
      device: 'Cooling Unit #2',
      status: 'normal',
      action: '온도 조절 (Cooling ON: from 26°C to 24.2°C, -1.8°C)',
      sector: 'Sector 1-Zone B',
    },
    {
      time: '13:55',
      device: 'CO2 Gen #3',
      status: 'warning',
      action: 'Issue: Low gas level (Please check tank)',
      sector: 'Sector 1-All',
    },
    {
      time: '13:30',
      device: 'Shade Roof #1',
      status: 'normal',
      action: '일사량 과다 (Shade Deployed)',
      sector: 'Sector 1-A, B',
    },
    {
      time: '12:45',
      device: 'Nutrient Pump #2',
      status: 'normal',
      action: '양액 공급 완료 (10L, Mixture A)',
      sector: 'Sector 1-Zone A',
    },
  ];

  return (
    <PageContainer>
      {/* 1. 사이드바 컴포넌트 (Dashboard 메뉴에 불이 들어오게 세팅, 한 줄로 끝!) */}
      <Sidebar activeMenu="Dashboard" />

      {/* 2. 우측 메인 콘텐츠 영역 (연회색 배경) */}
      <MainWrapper>
        {/* 상단 헤더 */}
        <TopHeader>
          <div className="header-title">Sector 01 - Live Dashboard</div>
          <div className="header-actions">
            <HeaderBtn className="alert">🔔 Alert</HeaderBtn>
            <HeaderBtn>Sector 01 ▾</HeaderBtn>
          </div>
        </TopHeader>

        {/* 대시보드 콘텐츠 영역 (3단 분할) */}
        <ContentGrid>
          {/* [1열] 좌측 영역 */}
          <LeftColumn>
            <LiveEnvironmentCard>
              <CardTitle>Live Environment</CardTitle>
              <div className="placeholder-content">
                3D Model or Live Data View
              </div>
            </LiveEnvironmentCard>

            {/* 센서 그룹 카드 */}
            <SensorsGroupCard>
              <CardTitle>Environment Sensors</CardTitle>
              <SensorGrid>
                {sensorData.map((sensor, index) => (
                  <SensorItem key={index}>
                    <div className="label">{sensor.label}</div>
                    <div className="value">{sensor.value}</div>
                    <div
                      className={`trend ${sensor.trend.startsWith('+') ? 'up' : sensor.trend.startsWith('-') ? 'down' : ''}`}
                    >
                      {sensor.trend}
                    </div>
                  </SensorItem>
                ))}
              </SensorGrid>
            </SensorsGroupCard>
          </LeftColumn>

          {/* [2열] 중간 영역 (상세 디바이스 활동 로그 패널) */}
          <MiddleColumn>
            <DeviceLogGroupCard>
              <div className="log-header">
                <CardTitle style={{ marginBottom: 0 }}>
                  Device System Logs
                </CardTitle>
                <div className="status-badge">System: Active</div>
              </div>

              <LogList>
                {deviceLogs.map((log, index) => (
                  <LogItem key={index} className={log.status}>
                    <span className="time">{log.time}</span>
                    <div className="info">
                      <div className="device-info">
                        <span className="name">{log.device}</span>
                        <span className="sector">{log.sector}</span>
                      </div>
                      <div className="detailed-text">{log.action}</div>
                    </div>
                  </LogItem>
                ))}
              </LogList>
            </DeviceLogGroupCard>
          </MiddleColumn>

          {/* [3열] 우측 영역 */}
          <RightColumn>
            <CameraCard>
              <CardTitle>Live Camera</CardTitle>
              <div className="placeholder-content">CCTV Feed - Camera 1</div>
            </CameraCard>
            <IssueCard>
              <CardTitle>System Issues</CardTitle>
              <div className="issue-summary normal">System: Active</div>

              <LogList style={{ marginTop: '10px' }}>
                {deviceLogs
                  .filter((log) => log.status === 'warning')
                  .map((log, index) => (
                    <LogItem key={index} className={log.status}>
                      <span className="time">{log.time}</span>
                      <div className="info">
                        <div className="device-info">
                          <span className="name">{log.device}</span>
                        </div>
                        <div className="detailed-text">{log.action}</div>
                      </div>
                    </LogItem>
                  ))}
              </LogList>
            </IssueCard>
          </RightColumn>
        </ContentGrid>
      </MainWrapper>
    </PageContainer>
  );
};

export default DashboardPage;

// --- 대시보드 전용 Styled Components ---
// 💡 사이드바, 헤더 등 공통 뼈대는 상단에서 import 했으므로 대시보드 내부 영역만 남깁니다.

const ContentGrid = styled.div`
  flex: 1;
  display: grid;
  grid-template-columns: 2fr 1.2fr 1fr;
  gap: 1.25em; /* 20px -> 1.25em */
  min-height: 0;
`;

// --- [1열] 좌측 영역 ---
const LeftColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.25em; /* 20px -> 1.25em */
  flex: 1;
`;

const LiveEnvironmentCard = styled(BaseCard)`
  flex: 1.3;
  .placeholder-content {
    flex: 1;
    background-color: #f8fafc;
    border-radius: 0.75em; /* 12px -> 0.75em */
    display: flex;
    align-items: center;
    justify-content: center;
    color: #94a3b8;
  }
`;

const SensorsGroupCard = styled(BaseCard)`
  flex: 1;
`;

const SensorGrid = styled.div`
  flex: 1;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.6em; /* 10px -> 0.6em */
`;

const SensorItem = styled.div`
  background-color: #f8fafc;
  border-radius: 0.75em; /* 12px -> 0.75em */
  padding: 0.9em; /* 15px -> 0.9em */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .label {
    font-size: 0.85em; /* rem -> em */
    color: #64748b;
    margin-bottom: 0.3em; /* 5px -> 0.3em */
  }
  .value {
    font-size: 1.3em; /* rem -> em */
    font-weight: 800;
    color: var(--point-green);
  }
  .trend {
    font-size: 0.75em; /* rem -> em */
    font-weight: 600;
    margin-top: 0.1em; /* 2px -> 0.1em */

    &.up {
      color: #e63946;
    }
    &.down {
      color: #3182ce;
    }
  }
`;

// --- [2열] 중간 영역 ---
const MiddleColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.25em; /* 20px -> 1.25em */
  flex: 1.2;
`;

const DeviceLogGroupCard = styled(BaseCard)`
  flex: 1;

  .log-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.25em; /* 20px -> 1.25em */
  }

  .status-badge {
    font-size: 0.85em; /* rem -> em */
    font-weight: 700;
    padding: 0.4em 0.75em; /* 6px 12px -> 0.4em 0.75em */
    background: rgba(102, 187, 106, 0.15);
    color: var(--point-green);
    border-radius: 1.25em; /* 20px -> 1.25em */
  }
`;

const LogList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0;
  flex: 1;
  min-height: 0;
  overflow-y: auto;
`;

const LogItem = styled.div`
  display: flex;
  align-items: center;
  padding: 0.9em 0.6em; /* 15px 10px -> 0.9em 0.6em */
  border-bottom: 1px solid #f1f5f9; /* 보더라인 1px은 유지해도 좋습니다 */

  &:last-child {
    border-bottom: none;
    padding-bottom: 0;
  }

  .time {
    font-size: 0.85em; /* rem -> em */
    font-weight: 700;
    color: #94a3b8;
    width: 3.4em; /* 55px -> 3.4em */
    margin-right: 0.9em; /* 15px -> 0.9em */
  }

  .info {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 0.2em; /* 3px -> 0.2em */
  }

  .device-info {
    display: flex;
    align-items: center;
    gap: 0.6em; /* 10px -> 0.6em */
    .name {
      font-size: 0.95em; /* rem -> em */
      font-weight: 700;
      color: var(--primary-dark);
    }
    .sector {
      font-size: 0.8em; /* rem -> em */
      font-weight: 500;
      color: #64748b;
      padding: 0.1em 0.4em; /* 2px 6px -> 0.1em 0.4em */
      background-color: #f1f5f9;
      border-radius: 0.25em; /* 4px -> 0.25em */
    }
  }

  .detailed-text {
    font-size: 0.95em; /* rem -> em */
    font-weight: 600;
    color: var(--primary-dark);
  }

  &.normal {
    border-left: 0.25em solid var(--light-green); /* 4px -> 0.25em */
  }

  &.warning {
    border-left: 0.25em solid var(--teal); /* 4px -> 0.25em */
    background-color: rgba(0, 194, 168, 0.05);

    .name,
    .detailed-text {
      color: var(--primary-dark);
    }
  }
`;

// --- [3열] 우측 영역 ---
const RightColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.25em; /* 20px -> 1.25em */
  flex: 1;
`;

const CameraCard = styled(BaseCard)`
  flex: 1;
  .placeholder-content {
    flex: 1;
    background-color: #1e293b;
    border-radius: 0.75em; /* 12px -> 0.75em */
    display: flex;
    align-items: center;
    justify-content: center;
    color: #94a3b8;
  }
`;

const IssueCard = styled(BaseCard)`
  flex: 1.5;

  .issue-summary {
    font-size: 0.85em; /* rem -> em */
    font-weight: 700;
    padding: 0.6em 0.9em; /* 10px 15px -> 0.6em 0.9em */
    border-radius: 0.6em; /* 10px -> 0.6em */

    &.normal {
      background-color: rgba(102, 187, 106, 0.1);
      color: var(--point-green);
      border: 1px solid rgba(102, 187, 106, 0.3);
    }

    &.alert {
      background-color: rgba(230, 57, 70, 0.1);
      color: #e63946;
      border: 1px solid rgba(230, 57, 70, 0.3);
    }
  }
`;
