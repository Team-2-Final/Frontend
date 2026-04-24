import React, { useState, useEffect, useMemo } from 'react';
import styled from 'styled-components';
import { useOutletContext } from 'react-router-dom';
import { BaseCard, CardTitle, Flex } from './Styles/AdminShared';
import client from '../../api/client';

const DataAnalysisPage = () => {
  const { selectedBranch } = useOutletContext();
  const [selectedBatch, setSelectedBatch] = useState('');
  const [timeRange, setTimeRange] = useState('week');
  const [batchList, setBatchList] = useState([]);
  const [rawData, setRawData] = useState(null);
  const [statsData, setStatsData] = useState([]);

  // 1. 작기 목록 불러오기
  useEffect(() => {
    const fetchBatches = async () => {
      try {
        const res = await client.get('/analysis/growth-batch');
        const formattedList = res.data.map((b, idx) => ({
          id: b.id,
          name: `${b.description} (${b.crop_type})`,
          // 초기 데이터 로드 시 첫 번째 작기만 진행중으로 설정
          status: idx === 0 ? '진행중' : '종료됨',
        }));
        setBatchList(formattedList);
        if (formattedList.length > 0) setSelectedBatch(formattedList[0].id);
      } catch (error) {
        console.error('작기 목록 로드 실패:', error);
      }
    };
    fetchBatches();
  }, []);

  // 2. 대시보드 데이터 불러오기
  useEffect(() => {
    if (!selectedBatch) return;

    const fetchStats = async () => {
      try {
        const res = await client.get(
          `/analysis/stats/${selectedBatch}?range_type=${timeRange}`,
        );

        // 👉 프론트 그래프에 맞게 변환
        const formatted = res.data.map((d) => ({
          temp: d.temperature,
          extTemp: d.temperature - 2, // 임시 (외부온도 없으니까)
          height: 50, // 임시 (나중에 plant_growth 연결)
          stdHeight: 60,
        }));

        setStatsData(formatted);
      } catch (error) {
        console.error('❌ 에러', error);
      }
    };

    fetchStats();
  }, [selectedBatch, timeRange]);
  useEffect(() => {
    if (!selectedBatch) return;

    const fetchDashboard = async () => {
      try {
        const res = await client.get(`/analysis/dashboard/${selectedBatch}`);
        setRawData(res.data);
      } catch (error) {
        console.error('❌ dashboard 에러', error);
      }
    };

    fetchDashboard();
  }, [selectedBatch]);

  // 동별 가중치 (기존 유지)
  const branchModifiers = {
    'A동 (표준 생육실)': { height: 1.0, temp: 0, leaf: 1.0 },
    'B동 (성장 지연실)': { height: 0.8, temp: -2.5, leaf: 0.85 },
    'C동 (성장 촉진실)': { height: 1.15, temp: +1.5, leaf: 1.1 },
  };

  const currentData = useMemo(() => {
    if (!rawData) return null;
    const modifier = branchModifiers[selectedBranch] || {
      height: 1.0,
      temp: 0,
      leaf: 1.0,
    };

    const safeData = {
      avgTemp: rawData.sensors?.temperature?.value || 0,
      avgHumid: rawData.sensors?.humidity?.value || 0,
      currentHeight: rawData.crop_status?.plant_height || 0,
      targetHeight: 90.0,
      charts: rawData.charts || { day: [], week: [], month: [] },
      issues: rawData.issues || rawData.ai_reports || [],
      growthDelta: rawData.growthDelta || { day: 0, week: 0, month: 0 },
    };

    safeData.currentHeight = (safeData.currentHeight * modifier.height).toFixed(
      1,
    );
    safeData.avgTemp = (parseFloat(safeData.avgTemp) + modifier.temp).toFixed(
      1,
    );

    return safeData;
  }, [rawData, selectedBranch]);

  // 🚨 현재 선택된 작기의 상태를 실시간으로 확인
  const currentBatchStatus = useMemo(() => {
    return batchList.find((b) => b.id === selectedBatch)?.status || '종료됨';
  }, [batchList, selectedBatch]);

  // 🚨 작기 시작 로직 (UI 상태 업데이트 포함)
  const handleStartBatch = () => {
    const hasActive = batchList.some((b) => b.status === '진행중');
    if (hasActive) {
      alert(
        '⚠️ 이미 진행 중인 작기가 있습니다. 기존 작기를 종료 후 생성해주세요.',
      );
      return;
    }

    setBatchList((prev) =>
      prev.map((b) =>
        b.id === selectedBatch ? { ...b, status: '진행중' } : b,
      ),
    );
    alert('새로운 작기가 시작되었습니다.');
  };

  // 🚨 작기 종료 로직 (UI 상태 업데이트 포함)
  const handleEndBatch = () => {
    if (window.confirm('현재 진행 중인 작기를 정말 종료하시겠습니까?')) {
      setBatchList((prev) =>
        prev.map((b) =>
          b.id === selectedBatch ? { ...b, status: '종료됨' } : b,
        ),
      );
      alert('작기가 성공적으로 종료되었습니다.');
    }
  };

  const activeChartData = statsData || [];
  const heightDiff = currentData
    ? (currentData.currentHeight - currentData.targetHeight).toFixed(1)
    : 0;
  const isNormal = heightDiff >= -1.0;

  const maxTemp = 40,
    minTemp = 0,
    maxHeight = 100,
    minHeight = 0;
  const getX = (index, total) => (total > 1 ? (index / (total - 1)) * 100 : 0);
  const getY = (val, max, min = 0) => 90 - ((val - min) / (max - min)) * 80;

  const tempPoints = activeChartData
    .map(
      (d, i) =>
        `${getX(i, activeChartData.length)},${getY(d.temp, maxTemp, minTemp)}`,
    )
    .join(' ');
  const extTempPoints = activeChartData
    .map(
      (d, i) =>
        `${getX(i, activeChartData.length)},${getY(d.extTemp, maxTemp, minTemp)}`,
    )
    .join(' ');
  const heightPoints = activeChartData
    .map(
      (d, i) =>
        `${getX(i, activeChartData.length)},${getY(d.height, maxHeight, minHeight)}`,
    )
    .join(' ');
  const stdHeightPoints = activeChartData
    .map(
      (d, i) =>
        `${getX(i, activeChartData.length)},${getY(d.stdHeight, maxHeight, minHeight)}`,
    )
    .join(' ');

  if (!rawData) {
    return (
      <Flex
        $justify="center"
        $align="center"
        $flex="1"
        style={{ height: '100%' }}
      >
        <LoadingText>데이터를 불러오는 중...</LoadingText>
      </Flex>
    );
  }

  return (
    <Flex $gap="1.5em" $flex="1" style={{ height: '100%', minHeight: 0 }}>
      {/* 왼쪽 영역 */}
      <Flex
        $dir="column"
        $gap="1.5em"
        $flex="1"
        style={{ minHeight: 0, minWidth: 0 }}
      >
        <FilterCard>
          <Flex
            $dir="row"
            $align="center"
            $justify="space-between"
            $width="100%"
            style={{ height: '100%' }}
          >
            <div className="batch-selector">
              <span className="label">대상 작기</span>
              <div className="select-wrapper">
                <select
                  value={selectedBatch}
                  onChange={(e) => setSelectedBatch(Number(e.target.value))}
                >
                  {batchList.map((b) => (
                    <option key={b.id} value={b.id}>
                      {b.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="action-buttons">
              {currentBatchStatus === '종료됨' ? (
                <button className="btn primary" onClick={handleStartBatch}>
                  작기 생성
                </button>
              ) : (
                <button className="btn danger" onClick={handleEndBatch}>
                  작기 종료
                </button>
              )}
            </div>
          </Flex>
        </FilterCard>

        <TimelineCard>
          <Flex
            $justify="space-between"
            $align="center"
            style={{ marginBottom: '1.2em', flexShrink: 0 }}
          >
            <CardTitle style={{ margin: 0 }}>
              씨드팜 일지 (Seed Farm Log)
            </CardTitle>
          </Flex>

          <TimelineWrapper>
            {(currentData?.issues || []).map((ev) => (
              <TimelineItem key={ev.id}>
                <div className="time-col">
                  {ev.time?.split(' ')[0]}
                  <br />
                  {ev.time?.split(' ')[1]}
                </div>
                <div className="line-col">
                  <div className="icon-circle">{ev.icon}</div>
                  <div className="line-tail"></div>
                </div>
                <div className="content-col">
                  <div className="c-title">{ev.title}</div>
                  <div className="c-desc">{ev.desc}</div>
                </div>
              </TimelineItem>
            ))}
          </TimelineWrapper>
        </TimelineCard>
      </Flex>

      {/* 오른쪽 영역 */}
      <Flex
        $dir="column"
        $gap="1.5em"
        $flex="1"
        style={{ minHeight: 0, minWidth: 0 }}
      >
        <KpiRow>
          <MiniKpiCard>
            <span className="label">평균 온도</span>
            <div className="value">
              {currentData?.avgTemp}
              <span className="unit">°C</span>
            </div>
          </MiniKpiCard>

          <MiniKpiCard className="highlight">
            <Flex $justify="space-between" $align="center" $width="100%">
              <span className="label">현재 측정 초장</span>
              <StatusBadge className={isNormal ? 'normal' : 'warning'}>
                {isNormal ? '정상 🟢' : '편차 발생 🔻'}
              </StatusBadge>
            </Flex>
            <div className="value">
              {currentData?.currentHeight}
              <span className="unit">cm</span>
            </div>
          </MiniKpiCard>

          <MiniKpiCard>
            <span className="label">평균 습도</span>
            <div className="value">
              {currentData?.avgHumid}
              <span className="unit">%</span>
            </div>
          </MiniKpiCard>
        </KpiRow>

        <AnalyticsCard>
          <div className="analytics-header">
            <CardTitle>AI 생육 종합 분석</CardTitle>
            <div className="toggle-bg">
              {['day', 'week', 'month'].map((r) => (
                <button
                  key={r}
                  className={timeRange === r ? 'active' : ''}
                  onClick={() => setTimeRange(r)}
                >
                  {r === 'day' ? '1일' : r === 'week' ? '1주' : '1개월'}
                </button>
              ))}
            </div>
          </div>

          <div className="charts-wrapper">
            <div className="chart-section">
              <div className="chart-mini-title">내/외부 환경</div>
              <ChartContainer>
                <YAxis>
                  <span>{maxTemp}°C</span>
                  <span>{minTemp}°C</span>
                </YAxis>
                <GraphArea>
                  <svg viewBox="0 0 100 100" preserveAspectRatio="none">
                    <polyline
                      points={extTempPoints}
                      fill="none"
                      stroke="#cbd5e1"
                      strokeWidth="1.5"
                      strokeDasharray="4"
                    />
                    <polyline
                      points={tempPoints}
                      fill="none"
                      stroke="#10b981"
                      strokeWidth="2.5"
                    />
                  </svg>
                </GraphArea>
              </ChartContainer>
            </div>

            <div className="chart-section">
              <div className="chart-mini-title">수직 생장 분석</div>
              <ChartContainer>
                <YAxis>
                  <span>{maxHeight}cm</span>
                  <span>{minHeight}cm</span>
                </YAxis>
                <GraphArea>
                  <svg viewBox="0 0 100 100" preserveAspectRatio="none">
                    <polyline
                      points={stdHeightPoints}
                      fill="none"
                      stroke="#94a3b8"
                      strokeWidth="1.5"
                      strokeDasharray="4"
                    />
                    <polyline
                      points={heightPoints}
                      fill="none"
                      stroke="#3b82f6"
                      strokeWidth="2.5"
                    />
                  </svg>
                </GraphArea>
              </ChartContainer>
            </div>

            <div className="chart-section">
              <div className="chart-mini-title">기간별 생장 속도 비교</div>
              <GrowthBarsContainer>
                <div className="bar-row">
                  <span className="time-label">어제 대비</span>
                  <div className="bar-track">
                    <div
                      className="bar-fill day"
                      style={{
                        width: `${Math.min((currentData?.growthDelta?.day / 5) * 100, 100)}%`,
                      }}
                    />
                  </div>
                  <span className="value-label">
                    +{currentData?.growthDelta?.day}cm
                  </span>
                </div>

                <div className="bar-row">
                  <span className="time-label">1주 전 대비</span>
                  <div className="bar-track">
                    <div
                      className="bar-fill week"
                      style={{
                        width: `${Math.min((currentData?.growthDelta?.week / 15) * 100, 100)}%`,
                      }}
                    />
                  </div>
                  <span className="value-label">
                    +{currentData?.growthDelta?.week}cm
                  </span>
                </div>

                <div className="bar-row">
                  <span className="time-label">1개월 전 대비</span>
                  <div className="bar-track">
                    <div
                      className="bar-fill month"
                      style={{
                        width: `${Math.min((currentData?.growthDelta?.month / 30) * 100, 100)}%`,
                      }}
                    />
                  </div>
                  <span className="value-label">
                    +{currentData?.growthDelta?.month}cm
                  </span>
                </div>
              </GrowthBarsContainer>
            </div>
          </div>
        </AnalyticsCard>
      </Flex>
    </Flex>
  );
};

const LoadingText = styled.h3`
  color: #64748b;
  font-weight: 800;
`;

const FilterCard = styled(BaseCard)`
  flex: none;
  height: 100px;
  padding: 0 24px;
  .batch-selector {
    display: flex;
    align-items: center;
    gap: 15px;
    .label {
      font-size: 0.9em;
      font-weight: 800;
      color: #64748b;
    }
    .select-wrapper {
      position: relative;
      width: 280px;
      select {
        width: 100%;
        height: 35px;
        appearance: none;
        background: #fff;
        border: 1px solid #cbd5e1;
        border-radius: 8px;
        padding: 0 15px;
        font-size: 1.1em;
        font-weight: 700;
        cursor: pointer;
        color: #1e293b;
      }
      &::after {
        content: '▾';
        position: absolute;
        right: 15px;
        top: 50%;
        transform: translateY(-50%);
        color: #94a3b8;
        pointer-events: none;
      }
    }
  }
  .action-buttons {
    display: flex;
    gap: 10px;
    .btn {
      width: 84px;
      height: 35px;
      padding: 12px 24px;
      border: none;
      border-radius: 8px;
      font-weight: 800;
      cursor: pointer;
      transition: 0.2s;
      font-size: 0.9em;
      &.primary {
        background: #1e293b;
        color: white;
      }
      &.danger {
        background: #e63946;
        color: white;
      }
    }
  }
`;

const TimelineCard = styled(BaseCard)`
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: 0;
`;
const TimelineWrapper = styled.div`
  flex: 1;
  overflow-y: auto;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;
const TimelineItem = styled.div`
  display: flex;
  gap: 15px;
  margin-bottom: 20px;
  .time-col {
    width: 60px;
    font-size: 0.7em;
    font-weight: 800;
    color: #94a3b8;
    text-align: right;
  }
  .line-col {
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    .icon-circle {
      width: 30px;
      height: 30px;
      border-radius: 50%;
      background: #fff;
      border: 2px solid #e2e8f0;
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 2;
    }
    .line-tail {
      position: absolute;
      top: 30px;
      bottom: -20px;
      width: 2px;
      background: #f1f5f9;
      z-index: 1;
    }
  }
  .content-col {
    flex: 1;
    padding: 12px;
    background: #f8fafc;
    border-radius: 10px;
    border: 1px solid #e2e8f0;
    .c-title {
      font-size: 0.85em;
      font-weight: 800;
      color: #0f172a;
    }
    .c-desc {
      font-size: 0.75em;
      color: #64748b;
      margin-top: 4px;
    }
  }
`;
const KpiRow = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5em;
`;
const MiniKpiCard = styled(BaseCard)`
  height: 100px;
  padding: 1.2em;
  display: flex;
  flex-direction: column;
  justify-content: center;
  .label {
    font-size: 0.75em;
    font-weight: 800;
    color: #94a3b8;
  }
  .value {
    font-size: 1.6em;
    font-weight: 800;
    color: #1e293b;
    .unit {
      font-size: 0.6em;
      margin-left: 2px;
    }
  }
  &.highlight {
    background: #eff6ff;
    border-color: #bfdbfe;
  }
`;
const StatusBadge = styled.div`
  padding: 4px 10px;
  border-radius: 6px;
  font-size: 0.7em;
  font-weight: 800;
  &.normal {
    background: #f0fdf4;
    color: #15803d;
  }
  &.warning {
    background: #fef2f2;
    color: #dc2626;
  }
`;
const AnalyticsCard = styled(BaseCard)`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 1.5em;
  min-height: 0;
  .analytics-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    .toggle-bg {
      display: flex;
      background: #f1f5f9;
      padding: 4px;
      border-radius: 8px;
      button {
        padding: 6px 14px;
        border: none;
        background: transparent;
        font-size: 0.75em;
        font-weight: 800;
        color: #64748b;
        cursor: pointer;
        &.active {
          background: #fff;
          color: #0f172a;
          border-radius: 6px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
        }
      }
    }
  }
  .charts-wrapper {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 20px;
    min-height: 0;
    .chart-section {
      flex: 1;
      display: flex;
      flex-direction: column;
      min-height: 0;
      .chart-mini-title {
        font-size: 0.75em;
        font-weight: 800;
        color: #64748b;
        margin-bottom: 10px;
      }
    }
  }
`;
const ChartContainer = styled.div`
  flex: 1;
  display: flex;
  position: relative;
`;
const YAxis = styled.div`
  width: 40px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-right: 1px solid #f1f5f9;
  span {
    font-size: 0.6em;
    font-weight: 800;
    color: #94a3b8;
  }
`;
const GraphArea = styled.div`
  flex: 1;
  position: relative;
  margin-left: 10px;
  svg {
    position: absolute;
    width: 100%;
    height: 100%;
    overflow: visible;
  }
`;
const XLabel = styled.span`
  position: absolute;
  bottom: -15px;
  transform: translateX(-50%);
  font-size: 0.6em;
  font-weight: 800;
  color: #94a3b8;
`;
const GrowthBarsContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 15px;
  .bar-row {
    display: flex;
    align-items: center;
    gap: 12px;
    .time-label {
      width: 80px;
      font-size: 0.8em;
      font-weight: 800;
      color: #64748b;
      text-align: right;
    }
    .bar-track {
      flex: 1;
      height: 14px;
      background: #f1f5f9;
      border-radius: 7px;
      overflow: hidden;
      position: relative;
      .bar-fill {
        height: 100%;
        border-radius: 7px;
        transition: width 0.5s ease-out;
        &.day {
          background: #38bdf8;
        }
        &.week {
          background: #3b82f6;
        }
        &.month {
          background: #6366f1; /* 1개월 전 남색 */
        }
      }
    }
    .value-label {
      width: 60px;
      font-size: 0.85em;
      font-weight: 800;
      color: #0f172a;
    }
  }
`;

export default DataAnalysisPage;
