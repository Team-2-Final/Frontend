import React, { useState, useEffect, useMemo } from 'react';
import styled from 'styled-components';
import { useOutletContext } from 'react-router-dom';
import { CardTitle, BaseCard, Flex } from './Styles/AdminShared';

const DashboardPage = () => {
  const { selectedBranch } = useOutletContext();

  const dashboardData = useMemo(
    () => ({
      '천안 본점 (종합관제센터)': {
        score: 96,
        phase: '개화기 🌸',
        status: '작물 활력도 최상 (전주 대비 2% 상승)',
        sensors: [
          {
            label: '내부 온도',
            value: 24.2,
            unit: '°C',
            trend: '+0.5',
            status: 'stable',
          },
          {
            label: '내부 습도',
            value: 65,
            unit: '%',
            trend: '-2',
            status: 'down',
          },
          {
            label: 'CO2 농도',
            value: 410,
            unit: 'ppm',
            trend: '+15',
            status: 'up',
          },
          {
            label: '광합성 광량',
            value: 350,
            unit: 'PPFD',
            trend: '최적',
            status: 'stable',
          },
          {
            label: '토양 양액 농도(EC)',
            value: 1.2,
            unit: 'dS/m',
            trend: '유지',
            status: 'stable',
          },
          {
            label: '토양 산도(pH)',
            value: 5.8,
            unit: 'pH',
            trend: '유지',
            status: 'stable',
          },
        ],
        // 🚨 누락됐던 생장 데이터 복구
        growth: {
          height: '124.5 cm',
          leafCount: '18 개',
          leafLength: '15.2 cm',
          leafWidth: '12.0 cm',
        },
        logs: [
          {
            id: 1,
            time: '14:10',
            device: '💧 메인 펌프',
            action: '가동',
            desc: 'EC 1.2 공급',
            status: 'active',
          },
          {
            id: 2,
            time: '13:30',
            device: '💨 배기팬 2번',
            action: '2단계',
            desc: '온도 초과 배기',
            status: 'active',
          },
          {
            id: 3,
            time: '11:00',
            device: '🌤️ 차광 스크린',
            action: '50% 전개',
            desc: '일사량 차단',
            status: 'done',
          },
          {
            id: 4,
            time: '10:00',
            device: '💡 LED 보광등',
            action: '소등',
            desc: '주간 모드 전환',
            status: 'done',
          },
        ],
      },
      '천안 제2센터 (육묘 전용)': {
        score: 88,
        phase: '정식기 🌱',
        status: '초기 활착 안정적 진행 중',
        sensors: [
          {
            label: '내부 온도',
            value: 22.5,
            unit: '°C',
            trend: '+0.2',
            status: 'stable',
          },
          {
            label: '내부 습도',
            value: 70,
            unit: '%',
            trend: '+5',
            status: 'up',
          },
          {
            label: 'CO2 농도',
            value: 450,
            unit: 'ppm',
            trend: '-10',
            status: 'down',
          },
          {
            label: '광량(일사량)',
            value: 280,
            unit: 'W/m²',
            trend: '흐림',
            status: 'stable',
          },
          {
            label: '토양 양액 농도(EC)',
            value: 1.0,
            unit: 'dS/m',
            trend: '유지',
            status: 'stable',
          },
          {
            label: '토양 산도(pH)',
            value: 6.0,
            unit: 'pH',
            trend: '유지',
            status: 'stable',
          },
        ],
        // 🚨 누락됐던 생장 데이터 복구
        growth: {
          height: '45.0 cm',
          leafCount: '8 개',
          leafLength: '8.5 cm',
          leafWidth: '6.0 cm',
        },
        logs: [
          {
            id: 1,
            time: '14:15',
            device: '🌡️ 온풍기',
            action: '대기 모드',
            desc: '야간 설정 온도 18°C 대기 중',
            status: 'done',
          },
          {
            id: 2,
            time: '12:00',
            device: '💡 LED 보광등',
            action: '점등 가동',
            desc: '일조량 부족 감지 -> 광량 보충 실행',
            status: 'active',
          },
        ],
      },
    }),
    [],
  );

  const currentData =
    dashboardData[selectedBranch] || dashboardData['천안 본점 (종합관제센터)'];
  const [liveSensors, setLiveSensors] = useState(currentData?.sensors || []);

  // 🚨 API 대체용 외부 기상 데이터 (UI 표시 전용, AI 로직 관여 X)
  const weatherData = {
    temp: 15.2,
    desc: '맑음',
    humidity: 42,
    aqi: '보통',
    icon: '🌤️',
  };

  // 🚨 도메인 지식 어필용 수조/정화 시스템 데이터
  const waterSystemData = {
    tankLevel: 78,
    purifying: true,
    filterStatus: '정상',
    inputRate: '2.5 L/min',
  };

  const aiLogs = [
    {
      time: '14:25',
      status: 'action',
      title: '관수량 10% 증량 권장',
      desc: '오후 외부 일사량 급증 예상 대비',
    },
    {
      time: '13:55',
      status: 'warning',
      title: '고온 피해 주의보',
      desc: '내부 온도 28°C 돌파 예상 - 사전 환기 필요',
    },
  ];

  return (
    <ContentGrid>
      {/* 🚨 1. LeftColumn ➔ Flex로 교체 완료 */}
      <Flex dir="column" gap="1.5em" flex="1" style={{ minWidth: 0 }}>
        <TopSummaryCard>
          <div className="summary-widget weather-widget">
            <div className="widget-header">
              <span className="w-title">외부 기상 관측</span>
              <span className="w-sub">참고 지표</span>
            </div>
            <div className="widget-body">
              <div className="icon-wrapper">{weatherData.icon}</div>
              <div className="info-wrapper">
                <div className="temp-text">
                  {weatherData.temp}
                  <span>°C</span>
                </div>
                <div className="desc-text">
                  {weatherData.desc} • 습도 {weatherData.humidity}%
                </div>
              </div>
            </div>
            <div className="widget-footer">
              <span className="aqi-badge">대기질: {weatherData.aqi}</span>
              <span className="aqi-desc">공조/환기 연동 대기</span>
            </div>
          </div>

          <div className="summary-widget score-widget">
            <div className="widget-header">
              <span className="w-title">종합 생육 점수</span>
            </div>
            <div className="widget-body score-body">
              <div className="score-value">
                {currentData.score}
                <span>점</span>
              </div>
              <div className="score-details">
                <span className="phase-badge">{currentData.phase}</span>
                <span className="status-text">{currentData.status}</span>
              </div>
            </div>
          </div>
        </TopSummaryCard>

        <SensorsGroupCard>
          <CardTitle>환경 측정 데이터</CardTitle>
          <SensorGrid>
            {liveSensors.map((sensor, index) => (
              <SensorItem key={index}>
                <div className="label">{sensor.label}</div>
                <div className="value-row">
                  <span className="value">{sensor.value}</span>
                  <span className="unit">{sensor.unit}</span>
                </div>
                <div className={`trend ${sensor.status}`}>
                  {sensor.status === 'up'
                    ? '▲ '
                    : sensor.status === 'down'
                      ? '▼ '
                      : ''}
                  {sensor.trend}
                </div>
              </SensorItem>
            ))}
          </SensorGrid>
        </SensorsGroupCard>
      </Flex>

      {/* 🚨 2. MiddleColumn ➔ Flex로 교체 완료 */}
      <Flex dir="column" gap="1.5em" flex="1" style={{ minWidth: 0 }}>
        <WaterSystemCard>
          <div className="header-row">
            <CardTitle>수자원 및 여과 시스템</CardTitle>
            <span
              className={`status-badge ${waterSystemData.purifying ? 'active' : ''}`}
            >
              {waterSystemData.purifying ? '🟢 정화 가동 중' : '⚪ 대기 중'}
            </span>
          </div>

          <div className="system-body">
            <div className="tank-visual">
              <div className="tank-bg">
                <div
                  className="tank-fill"
                  style={{ height: `${waterSystemData.tankLevel}%` }}
                >
                  <div className="wave"></div>
                </div>
              </div>
              <span className="tank-label">메인 수조</span>
            </div>

            <div className="system-info">
              <div className="info-row">
                <span className="i-label">수조 잔량</span>
                <span className="i-value highlight">
                  {waterSystemData.tankLevel}%
                </span>
              </div>
              <div className="info-row">
                <span className="i-label">원수 유입량</span>
                <span className="i-value">{waterSystemData.inputRate}</span>
              </div>
              <div className="info-row">
                <span className="i-label">여과기 상태</span>
                <span className="i-value normal">
                  {waterSystemData.filterStatus} (교체 불필요)
                </span>
              </div>
              <p className="system-desc">
                * 유입된 원수는 물리/화학적 여과 시스템을 거쳐 메인 수조에
                안전하게 보관됩니다.
              </p>
            </div>
          </div>
        </WaterSystemCard>

        <LogGroupCard>
          <div className="log-header">
            <CardTitle>장치 작동 이력</CardTitle>
          </div>
          <LogList>
            {currentData.logs.map((log) => (
              <DeviceLogItem key={log.id} className={log.status}>
                <span className="time">{log.time}</span>
                <div className="log-main">
                  <span className="device">{log.device}</span>
                  <span className="desc">{log.desc}</span>
                </div>
                <span className={`action ${log.status}`}>{log.action}</span>
              </DeviceLogItem>
            ))}
          </LogList>
        </LogGroupCard>
      </Flex>

      {/* 🚨 3. RightColumn ➔ Flex로 교체 완료 */}
      <Flex dir="column" gap="1.5em" flex="1" style={{ minWidth: 0 }}>
        <CameraCard>
          <div className="header-row">
            <CardTitle>현장 모니터링 (CCTV)</CardTitle>
            <span className="cam-label">1번 카메라</span>
          </div>
          <div className="placeholder-content">
            <span className="icon">📹</span>
            <span className="text">스트리밍 연결 중...</span>
          </div>
        </CameraCard>

        <GrowthCard>
          <CardTitle>작물 생육 지표</CardTitle>
          <GrowthGrid>
            <div className="g-item">
              <span className="l">초장 (식물 높이)</span>
              <span className="v">{currentData.growth.height}</span>
            </div>
            <div className="g-item">
              <span className="l">엽수 (잎 개수)</span>
              <span className="v">{currentData.growth.leafCount}</span>
            </div>
            <div className="g-item">
              <span className="l">엽장 (잎 길이)</span>
              <span className="v">{currentData.growth.leafLength}</span>
            </div>
            <div className="g-item">
              <span className="l">엽폭 (잎 너비)</span>
              <span className="v">{currentData.growth.leafWidth}</span>
            </div>
          </GrowthGrid>
        </GrowthCard>

        <AILogGroupCard>
          <div className="log-header">
            <CardTitle>AI 분석 보고서</CardTitle>
            <span className="sub-badge ai">AI 모니터링 중</span>
          </div>
          <AILogList>
            {aiLogs.map((log, index) => (
              <AILogItem key={index} className={log.status}>
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
      </Flex>
    </ContentGrid>
  );
};
export default DashboardPage;

// --- 🎨 하이엔드 투명도(rgba) 기반 스타일링 ---

const ContentGrid = styled.div`
  flex: 1;
  display: grid;
  grid-template-columns: 2fr 1.5fr 1.2fr;
  gap: 1.5em;
  width: 100%;
  min-height: 0;
  @media (max-width: 1024px) {
    grid-template-columns: 1fr 1fr;
    & > div:nth-child(3) {
      grid-column: 1 / 3;
      flex-direction: row;
    }
  }
  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    & > div:nth-child(3) {
      flex-direction: column;
    }
  }
`;

const TopSummaryCard = styled(BaseCard)`
  flex: none;
  min-height: 200px;
  display: grid;
  grid-template-columns: 1fr 1fr; /* 🚨 완벽한 반반 그리드 분할 */
  gap: 1.2em; /* 두 위젯 사이의 간격 */
  padding: 1.2em;
  background: #ffffff;

  /* 위젯 공통 베이스 디자인 */
  .summary-widget {
    background: #f8fafc;
    border-radius: 16px;
    padding: 1.2em 1.5em;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    border: 1px solid #f1f5f9;
    transition: all 0.2s ease;
    min-height: 140px;

    &:hover {
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.03);
      border-color: #e2e8f0;
    }
  }

  .widget-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 12px;
    .w-title {
      font-size: 0.8em;
      font-weight: 800;
      color: #475569;
    }
    .w-sub {
      font-size: 0.7em;
      font-weight: 600;
      color: #94a3b8;
    }
  }

  /* 🌤️ 날씨 위젯 특화 디자인 */
  .weather-widget {
    .widget-body {
      display: flex;
      align-items: center;
      gap: 16px;
      margin-bottom: 16px;
      .icon-wrapper {
        font-size: 2.8em;
        line-height: 1;
        filter: drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1));
      }
      .info-wrapper {
        display: flex;
        flex-direction: column;
        .temp-text {
          font-size: 2.2em;
          font-weight: 900;
          color: #0f172a;
          line-height: 1;
          letter-spacing: -0.05em;
          span {
            font-size: 0.5em;
            font-weight: 700;
            color: #64748b;
            margin-left: 2px;
          }
        }
        .desc-text {
          font-size: 0.85em;
          font-weight: 700;
          color: #64748b;
          margin-top: 6px;
        }
      }
    }
    .widget-footer {
      display: flex;
      align-items: center;
      gap: 8px;
      .aqi-badge {
        background: #fff;
        border: 1px solid #e2e8f0;
        font-size: 0.7em;
        font-weight: 800;
        color: #475569;
        padding: 4px 8px;
        border-radius: 6px;
      }
      .aqi-desc {
        font-size: 0.7em;
        font-weight: 600;
        color: #94a3b8;
        white-space: nowrap;
      }
    }
  }

  /* 🎯 점수 위젯 특화 디자인 (초록색 그라데이션 포인트) */
  .score-widget {
    background: linear-gradient(145deg, #f0fdf4 0%, #ecfdf5 100%);
    border-color: #d1fae5;
    .w-title {
      color: #059669;
    }

    .score-body {
      display: flex;
      flex-direction: row;
      align-items: flex-end;
      gap: 20px;
      flex: 1;
      padding-bottom: 4px;

      .score-value {
        font-size: 3.8em;
        font-weight: 900;
        color: #059669;
        line-height: 0.85;
        letter-spacing: -0.05em;
        span {
          font-size: 0.3em;
          font-weight: 800;
          color: #10b981;
          margin-left: 4px;
        }
      }
      .score-details {
        display: flex;
        flex-direction: column;
        gap: 8px;
        margin-bottom: 2px;
        .phase-badge {
          align-self: flex-start;
          background: #059669;
          color: #fff;
          font-size: 0.75em;
          font-weight: 800;
          padding: 4px 10px;
          border-radius: 20px;
          box-shadow: 0 2px 6px rgba(5, 150, 105, 0.2);
        }
        .status-text {
          font-size: 0.85em;
          font-weight: 800;
          color: #065f46;
          word-break: keep-all;
        }
      }
    }
  }
`;

const WaterSystemCard = styled(BaseCard)`
  flex: none;
  min-height: 200px;
  padding: 1.2em 1.5em;
  .header-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1em;
    h2 {
      margin: 0;
    }
  }
  .status-badge {
    font-size: 0.75em;
    font-weight: 800;
    padding: 4px 10px;
    border-radius: 20px;
    background: #f1f5f9;
    color: #64748b;
    &.active {
      background: #ecfdf5;
      color: #10b981;
    }
  }

  .system-body {
    display: flex;
    gap: 1.5em;
    align-items: center;
  }

  .tank-visual {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    .tank-bg {
      width: 60px;
      height: 90px;
      border: 3px solid #cbd5e1;
      border-radius: 8px 8px 12px 12px;
      border-top: none;
      position: relative;
      overflow: hidden;
      background: #f8fafc;
    }
    .tank-fill {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      background: linear-gradient(180deg, #38bdf8 0%, #0284c7 100%);
      transition: height 1s ease-in-out;
    }
    .tank-label {
      font-size: 0.75em;
      font-weight: 800;
      color: #64748b;
      white-space: nowrap;
    }
  }

  .system-info {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 6px;
    .info-row {
      display: flex;
      justify-content: space-between;
      font-size: 0.85em;
      border-bottom: 1px dashed #e2e8f0;
      padding-bottom: 4px;
      .i-label {
        color: #64748b;
        font-weight: 700;
      }
      .i-value {
        font-weight: 900;
        color: #0f172a;
        &.highlight {
          color: #0284c7;
        }
        &.normal {
          color: #10b981;
        }
      }
    }
    .system-desc {
      font-size: 0.7em;
      color: #94a3b8;
      font-weight: 600;
      margin-top: 6px;
      line-height: 1.4;
    }
  }
`;

const DeviceLogItem = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 12px;
  background: #f8fafc;
  border-radius: 10px;
  border-left: 3px solid transparent;
  transition: all 0.2s;

  &:hover {
    background: #fff;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  }
  &.active {
    border-left-color: #10b981;
  }
  &.done {
    border-left-color: #cbd5e1;
  }

  .time {
    font-size: 0.75em;
    font-weight: 800;
    color: #94a3b8;
    width: 40px;
    flex-shrink: 0;
  }
  .log-main {
    flex: 1;
    display: flex;
    flex-direction: column;
    min-width: 0;
    .device {
      font-size: 0.9em;
      font-weight: 800;
      color: #0f172a;
    }
    .desc {
      font-size: 0.75em;
      font-weight: 600;
      color: #64748b;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
  .action {
    font-size: 0.8em;
    font-weight: 800;
    flex-shrink: 0;
    &.active {
      color: #10b981;
    }
    &.done {
      color: #94a3b8;
    }
  }
`;

const SensorsGroupCard = styled(BaseCard)`
  flex: 1.2;
  min-height: 0;
`;
const SensorGrid = styled.div`
  flex: 1;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1em;
`;
const SensorItem = styled.div`
  background-color: rgba(241, 245, 249, 0.6);
  border-radius: 16px;
  padding: 1.2em;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  min-width: 0;
  transition: background 0.3s ease;
  &:hover {
    background-color: #f8fafc;
  }
  .label {
    font-size: 0.75em;
    font-weight: 800;
    color: #64748b;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 100%;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }
  .value-row {
    display: flex;
    align-items: baseline;
    gap: 4px;
    margin-top: 0.2em;
    .value {
      font-size: 1.6em;
      font-weight: 800;
      color: #0f172a;
      letter-spacing: -0.02em;
      transition: color 0.3s;
    }
    .unit {
      font-size: 0.8em;
      font-weight: 700;
      color: #94a3b8;
    }
  }
  .trend {
    font-size: 0.75em;
    font-weight: 800;
    margin-top: 1em;
    padding: 4px 10px;
    border-radius: 20px;
    white-space: nowrap;
    &.up {
      color: #ef4444;
      background: rgba(239, 68, 68, 0.1);
    }
    &.down {
      color: #3b82f6;
      background: rgba(59, 130, 246, 0.1);
    }
    &.stable {
      color: #10b981;
      background: rgba(16, 185, 129, 0.1);
    }
  }
`;

const LogGroupCard = styled(BaseCard)`
  flex: 1;
  min-height: 0;
  .log-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1em;
    h2 {
      margin-bottom: 0;
    }
  }
  .sub-badge {
    font-size: 0.7em;
    font-weight: 800;
    padding: 4px 10px;
    border-radius: 20px;
    &.system {
      background: #f1f5f9;
      color: #475569;
    }
  }
`;
const LogList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1em;
  flex: 1;
  min-height: 0;
  overflow-y: auto;
  padding-right: 0.5em;
  &::-webkit-scrollbar {
    width: 4px;
  }
  &::-webkit-scrollbar-thumb {
    background: #e2e8f0;
    border-radius: 4px;
  }
`;

const CameraCard = styled(BaseCard)`
  flex: 1.2;
  min-height: 220px;
  padding: 1.2em;
  .header-row {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 1em;
    h2 {
      margin-bottom: 0;
    }
  }
  .cam-label {
    font-size: 0.75em;
    font-weight: 800;
    color: #475569;
    background: #f1f5f9;
    padding: 4px 10px;
    border-radius: 8px;
    flex-shrink: 0;
  }
  .placeholder-content {
    flex: 1;
    background: #0f172a;
    border-radius: 16px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: #ffffff;
    position: relative;
    overflow: hidden;
    .icon {
      font-size: 2.5em;
      margin-bottom: 8px;
      z-index: 2;
      opacity: 0.8;
    }
    .text {
      font-size: 0.8em;
      font-weight: 700;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      z-index: 2;
      opacity: 0.8;
    }
    .pulse-ring {
      position: absolute;
      width: 60px;
      height: 60px;
      border-radius: 50%;
      border: 2px solid #10b981;
      animation: radar 2s infinite ease-out;
    }
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

const GrowthCard = styled(BaseCard)`
  padding: 1.2em;
`;
const GrowthGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1em;
  .g-item {
    display: flex;
    flex-direction: column;
    gap: 0.2em;
    background: #f8fafc;
    padding: 10px;
    border-radius: 12px;
    .l {
      font-size: 0.7em;
      font-weight: 800;
      color: #94a3b8;
      text-transform: uppercase;
    }
    .v {
      font-size: 1.1em;
      font-weight: 800;
      color: #0f172a;
    }
  }
`;

const AILogGroupCard = styled(BaseCard)`
  flex: 1.2;
  min-height: 0;
  padding: 1.2em;
  .log-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1em;
    h2 {
      margin-bottom: 0;
    }
  }
  .sub-badge {
    font-size: 0.7em;
    font-weight: 800;
    padding: 4px 10px;
    border-radius: 20px;
    &.ai {
      background: rgba(16, 185, 129, 0.1);
      color: #10b981;
    }
  }
`;
const AILogList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5em;
  flex: 1;
  min-height: 0;
  overflow-y: auto;
  padding-right: 0.5em;
  &::-webkit-scrollbar {
    width: 4px;
  }
  &::-webkit-scrollbar-thumb {
    background: #e2e8f0;
    border-radius: 4px;
  }
`;
const AILogItem = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1em;
  border-radius: 12px;
  margin-bottom: 0.5em;
  min-width: 0;
  border-left: 3px solid transparent;
  &.action {
    background: rgba(16, 185, 129, 0.05);
    border-left-color: #10b981;
    .badge {
      color: #10b981;
    }
  }
  &.warning {
    background: rgba(239, 68, 68, 0.05);
    border-left-color: #ef4444;
    .badge {
      color: #ef4444;
    }
  }
  .top-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.5em;
    .badge {
      font-size: 0.7em;
      font-weight: 900;
      background: #fff;
      padding: 2px 6px;
      border-radius: 4px;
    }
    .time {
      font-size: 0.75em;
      color: #94a3b8;
      font-weight: 800;
    }
  }
  .title {
    font-size: 0.9em;
    font-weight: 800;
    color: #0f172a;
    margin-bottom: 0.3em;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .desc {
    font-size: 0.8em;
    color: #475569;
    line-height: 1.4;
    font-weight: 600;
  }
`;
