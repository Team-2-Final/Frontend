import React, { useState, useMemo } from 'react';
import styled from 'styled-components';
import { useOutletContext } from 'react-router-dom';
import { BaseCard, CardTitle, Flex } from './Styles/AdminShared';

const DataAnalysisPage = () => {
  const { selectedBranch } = useOutletContext();
  const [selectedBatch, setSelectedBatch] = useState('batch_1');

  // 🚨 영문 지표를 B2B 실무 한글로 교체
  const dataByBatch = {
    batch_1: {
      avgTemp: 23.9,
      growth: 12,
      water: 16.5,
      chart: [
        { label: '04-01', temp: 20, water: 12 },
        { label: '04-02', temp: 22, water: 15 },
        { label: '04-03', temp: 23, water: 18 },
        { label: '04-04', temp: 25, water: 22 },
        { label: '04-05', temp: 26, water: 25 },
        { label: '04-06', temp: 24, water: 20 },
        { label: '04-07', temp: 25, water: 16 },
      ],
      logs: [
        { time: '14:00', t: 25.1, h: 60, ai: '적정 생육 범위 유지' },
        { time: '13:00', t: 25.5, h: 58, ai: '일일 관수 2.0L 추가 가동' },
        {
          time: '12:00',
          t: 26.0,
          h: 55,
          ai: '강제 환기팬 2단계 가동',
        },
      ],
    },
    batch_2: {
      avgTemp: 21.2,
      growth: 8,
      water: 12.8,
      chart: [
        { label: '04-01', temp: 19, water: 8 },
        { label: '04-02', temp: 20, water: 10 },
        { label: '04-03', temp: 21, water: 11 },
        { label: '04-04', temp: 22, water: 14 },
        { label: '04-05', temp: 21, water: 13 },
        { label: '04-06', temp: 23, water: 15 },
        { label: '04-07', temp: 22, water: 14 },
      ],
      logs: [
        { time: '14:00', t: 22.1, h: 55, ai: '야간 생육 모드 최적화' },
        { time: '13:00', t: 21.8, h: 52, ai: '보온 덮개 100% 전개' },
        { time: '12:00', t: 20.5, h: 50, ai: '내부 유동팬 가동 중지' },
      ],
    },
  };

  const currentData = useMemo(
    () => dataByBatch[selectedBatch],
    [selectedBatch],
  );

  const maxTemp = 30;
  const minTemp = 15;
  const maxWater = 30;

  const getX = (index, total) => (index / (total - 1)) * 100;
  const getY = (val, max, min = 0) => 90 - ((val - min) / (max - min)) * 80;

  const tempPoints = currentData.chart
    .map(
      (d, i) =>
        `${getX(i, currentData.chart.length)},${getY(d.temp, maxTemp, minTemp)}`,
    )
    .join(' ');
  const tempAreaPoints = `0,100 ${tempPoints} 100,100`;

  return (
    // 🚨 DashboardGrid 대신 Flex 적용
    <Flex gap="1.5em" flex="1" style={{ minHeight: 0 }}>
      {/* 🚨 LeftColumn 대신 Flex 적용 */}
      <Flex dir="column" gap="1.5em" flex="1" style={{ minWidth: 0 }}>
        <FilterCard>
          <FilterGroup>
            <FilterItem className="location-box">
              <span className="label">관제 지점 (Location)</span>
              <span className="value" title={selectedBranch}>
                {selectedBranch}
              </span>
            </FilterItem>
            <div className="divider"></div>
            <FilterItem className="batch-box">
              <span className="label">대상 작기 (Active Batch)</span>
              <select
                value={selectedBatch}
                onChange={(e) => setSelectedBatch(e.target.value)}
              >
                <option value="batch_1">
                  작기 #01 (토마토 - 26.02.10 정식)
                </option>
                <option value="batch_2">
                  작기 #02 (토마토 - 26.03.15 정식)
                </option>
              </select>
            </FilterItem>
          </FilterGroup>
        </FilterCard>

        <TableCard>
          <CardTitle>AI 제어 추론 일지 (Inference Log)</CardTitle>
          <TableWrapper>
            <StyledTable>
              <thead>
                <tr>
                  <th>발생 시간</th>
                  <th>환경 (온도/습도)</th>
                  <th>AI 판단 및 조치내역</th>
                </tr>
              </thead>
              <tbody>
                {currentData.logs.map((row, idx) => (
                  <tr key={idx}>
                    <td className="time-col">{row.time}</td>
                    <td>
                      <span className="bold">{row.t}°C</span> / {row.h}%
                    </td>
                    <td>
                      <span
                        className={`ai-badge ${row.ai.includes('유지') ? 'good' : 'action'}`}
                      >
                        {row.ai}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </StyledTable>
          </TableWrapper>
        </TableCard>
      </Flex>

      {/* 🚨 RightColumn 대신 Flex 적용 */}
      <Flex dir="column" gap="1.5em" flex="1" style={{ minWidth: 0 }}>
        <KpiRow>
          <MiniKpiCard>
            <div className="label">주간 평균 온도</div>
            <div className="value">
              {currentData.avgTemp}
              <span className="unit">°C</span>
            </div>
          </MiniKpiCard>
          <MiniKpiCard className="highlight">
            <div className="label">주간 누적 생장량</div>
            <div className="value">
              +{currentData.growth}
              <span className="unit">cm</span>
            </div>
          </MiniKpiCard>
          <MiniKpiCard>
            <div className="label">일일 누적 관수량</div>
            <div className="value">
              {currentData.water}
              <span className="unit">L</span>
            </div>
          </MiniKpiCard>
        </KpiRow>

        <GraphCard>
          <CardTitle style={{ marginBottom: '15px' }}>
            온도 변화 추이 (Temperature Trend)
          </CardTitle>
          <ChartContainer>
            <YAxis>
              <span>{maxTemp}°C</span>
              <span>{(maxTemp + minTemp) / 2}°C</span>
              <span>{minTemp}°C</span>
            </YAxis>
            <GraphArea>
              <GridLine style={{ top: '10%' }} />
              <GridLine style={{ top: '50%' }} />
              <GridLine style={{ top: '90%' }} />

              <svg viewBox="0 0 100 100" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="tempGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#10b981" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <polygon points={tempAreaPoints} fill="url(#tempGrad)" />
                <polyline
                  points={tempPoints}
                  fill="none"
                  stroke="#10b981"
                  strokeWidth="2"
                  vectorEffect="non-scaling-stroke"
                />
              </svg>

              {currentData.chart.map((d, i) => {
                const xPos = getX(i, currentData.chart.length);
                const yPos = getY(d.temp, maxTemp, minTemp);
                return (
                  <React.Fragment key={i}>
                    <DataPoint style={{ left: `${xPos}%`, top: `${yPos}%` }}>
                      <div className="dot" />
                      <div className="tooltip">{d.temp}°C</div>
                    </DataPoint>
                    <XLabel style={{ left: `${xPos}%` }}>{d.label}</XLabel>
                  </React.Fragment>
                );
              })}
            </GraphArea>
          </ChartContainer>
        </GraphCard>

        <GraphCard>
          <CardTitle style={{ marginBottom: '15px' }}>
            관수량 누적 통계 (Water Supply Stats)
          </CardTitle>
          <ChartContainer>
            <YAxis>
              <span>{maxWater}L</span>
              <span>{maxWater / 2}L</span>
              <span>0L</span>
            </YAxis>
            <GraphArea>
              <GridLine style={{ top: '10%' }} />
              <GridLine style={{ top: '50%' }} />
              <GridLine style={{ top: '90%' }} />

              {currentData.chart.map((d, i) => {
                const xPos = getX(i, currentData.chart.length);
                const heightPct = (d.water / maxWater) * 80;
                return (
                  <React.Fragment key={i}>
                    <BarColumn
                      style={{
                        left: `${xPos}%`,
                        bottom: '10%',
                        height: `${heightPct}%`,
                      }}
                    >
                      <div className="bar-fill">
                        <div className="tooltip">{d.water}L</div>
                      </div>
                    </BarColumn>
                    <XLabel style={{ left: `${xPos}%` }}>{d.label}</XLabel>
                  </React.Fragment>
                );
              })}
            </GraphArea>
          </ChartContainer>
        </GraphCard>
      </Flex>
    </Flex>
  );
};

export default DataAnalysisPage;

// --- 🎨 스타일링 ---

/* 🚨 필터 구조: 버튼 완전 삭제, 너비 완전 고정 */
const FilterCard = styled(BaseCard)`
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  padding: 1.2em 1.5em;
  .divider {
    width: 1px;
    height: 35px;
    background: #e2e8f0;
    margin: 0 1.5em;
  }
`;
const FilterGroup = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`;
const FilterItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;

  /* 🚨 너비 고정 클래스 추가 */
  &.location-box {
    width: 210px;
    flex-shrink: 0;
  }
  &.batch-box {
    width: 210px;
    flex-shrink: 0;
  }

  .label {
    font-size: 0.65em;
    font-weight: 800;
    color: #94a3b8;
    letter-spacing: 0.05em;
  }

  /* 🚨 텍스트 길어지면 ... 처리 */
  .value {
    font-size: 1.1em;
    font-weight: 800;
    color: #10b981;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  select {
    width: 100%;
    border: 1px solid #e2e8f0;
    background: #f8fafc;
    padding: 8px 12px;
    border-radius: 8px;
    font-size: 0.9em;
    font-weight: 800;
    color: #0f172a;
    cursor: pointer;
    outline: none;
    transition: 0.2s;
    &:focus {
      border-color: #10b981;
    }
  }
`;

const TableCard = styled(BaseCard)`
  flex: 1;
  min-height: 0;
  display: flex;
  flex-direction: column;
`;
const TableWrapper = styled.div`
  flex: 1;
  overflow-y: auto;
  &::-webkit-scrollbar {
    width: 4px;
  }
  &::-webkit-scrollbar-thumb {
    background: #e2e8f0;
    border-radius: 4px;
  }
`;
const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  text-align: left;
  th {
    padding: 12px 16px;
    font-size: 0.75em;
    font-weight: 800;
    color: #94a3b8;
    text-transform: uppercase;
    border-bottom: 2px solid #f1f5f9;
    position: sticky;
    top: 0;
    background: #fff;
    z-index: 1;
  }
  td {
    padding: 14px 16px;
    font-size: 0.9em;
    font-weight: 600;
    color: #64748b;
    border-bottom: 1px solid #f8fafc;
    .bold {
      color: #0f172a;
      font-weight: 800;
    }
  }
  .time-col {
    color: #0f172a;
    font-weight: 800;
    width: 60px;
  }
  .ai-badge {
    padding: 6px 10px;
    border-radius: 6px;
    font-size: 0.8em;
    font-weight: 800;
    white-space: nowrap;
    &.good {
      background: #f0fdf4;
      color: #15803d;
      border: 1px solid #bbf7d0;
    }
    &.action {
      background: #fef2f2;
      color: #b91c1c;
      border: 1px solid #fecaca;
    }
  }
`;

const KpiRow = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1em;
`;
const MiniKpiCard = styled(BaseCard)`
  padding: 1.2em;
  justify-content: center;
  &.highlight {
    background: #f0fdf4;
    border: 1px solid #bbf7d0;
    box-shadow: none;
    .label {
      color: #15803d;
    }
    .value {
      color: #166534;
    }
  }
  .label {
    font-size: 0.75em;
    font-weight: 800;
    color: #94a3b8;
    margin-bottom: 6px;
  }
  .value {
    font-size: 1.8em;
    font-weight: 800;
    color: #0f172a;
    .unit {
      font-size: 0.5em;
      margin-left: 4px;
      color: #94a3b8;
    }
  }
`;

const GraphCard = styled(BaseCard)`
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: 240px;
`;
const ChartContainer = styled.div`
  flex: 1;
  display: flex;
  position: relative;
  margin-top: 10px;
`;
const YAxis = styled.div`
  width: 35px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;
  padding-right: 10px;
  padding-bottom: 25px;
  border-right: 1px solid #f1f5f9;
  span {
    font-size: 0.65em;
    font-weight: 700;
    color: #94a3b8;
  }
`;
const GraphArea = styled.div`
  flex: 1;
  position: relative;
  margin-left: 15px;
  margin-right: 15px;
  margin-bottom: 25px;
  svg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: block;
  }
`;
const GridLine = styled.div`
  position: absolute;
  left: 0;
  width: 100%;
  border-top: 1px dashed #e2e8f0;
  pointer-events: none;
`;
const XLabel = styled.span`
  position: absolute;
  bottom: -25px;
  transform: translateX(-50%);
  font-size: 0.65em;
  font-weight: 800;
  color: #94a3b8;
  white-space: nowrap;
`;
const DataPoint = styled.div`
  position: absolute;
  width: 24px;
  height: 24px;
  transform: translate(-50%, -50%);
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  z-index: 10;
  &:hover .dot {
    width: 12px;
    height: 12px;
    background: #0f172a;
    border-color: #fff;
  }
  &:hover .tooltip {
    opacity: 1;
    transform: translate(-50%, -15px);
  }
  .dot {
    width: 8px;
    height: 8px;
    background: #fff;
    border: 2px solid #10b981;
    border-radius: 50%;
    transition: 0.2s;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  .tooltip {
    position: absolute;
    top: -20px;
    left: 50%;
    transform: translate(-50%, 0);
    background: #0f172a;
    color: #fff;
    padding: 4px 8px;
    border-radius: 6px;
    font-size: 0.75em;
    font-weight: 800;
    opacity: 0;
    pointer-events: none;
    transition: 0.2s;
    white-space: nowrap;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
`;
const BarColumn = styled.div`
  position: absolute;
  width: 20px;
  transform: translateX(-50%);
  display: flex;
  justify-content: center;
  cursor: pointer;
  z-index: 5;
  &:hover .bar-fill {
    filter: brightness(1.1);
  }
  &:hover .tooltip {
    opacity: 1;
    transform: translate(-50%, -15px);
  }
  .bar-fill {
    width: 100%;
    height: 100%;
    background: linear-gradient(180deg, #34d399 0%, #10b981 100%);
    border-radius: 6px 6px 0 0;
    transition: 0.2s;
  }
  .tooltip {
    position: absolute;
    top: -25px;
    left: 50%;
    transform: translate(-50%, 0);
    background: #0f172a;
    color: #fff;
    padding: 4px 8px;
    border-radius: 6px;
    font-size: 0.75em;
    font-weight: 800;
    opacity: 0;
    pointer-events: none;
    transition: 0.2s;
    white-space: nowrap;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
`;
