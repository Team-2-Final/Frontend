import styled from 'styled-components';
import FieldPageShell from '../Components/FieldPageShell';

const devices = [
  { id: 1, name: 'Water Pump', mode: 'AUTO', target: '수분 40%' },
  { id: 2, name: 'Exhaust Fan', mode: 'MANUAL', target: '환기 2단계' },
  { id: 3, name: 'Grow Lights', mode: 'AUTO', target: '밝기 80%' },
  { id: 4, name: 'Mist System', mode: 'MANUAL', target: '습도 65%' },
];

export default function ControlPage() {
  return (
    <FieldPageShell title="Control" rightText="Auto Mode">
      <StatusStrip>
        <StatusCard>
          <span>자동 제어</span>
          <strong>활성</strong>
        </StatusCard>
        <StatusCard>
          <span>수동 장치</span>
          <strong>2</strong>
        </StatusCard>
        <StatusCard>
          <span>긴급 상태</span>
          <strong>없음</strong>
        </StatusCard>
      </StatusStrip>

      <QuickPanel>
        <SectionTitle>빠른 제어</SectionTitle>
        <QuickGrid>
          <QuickBtn>급수 ON</QuickBtn>
          <QuickBtn>환기 ON</QuickBtn>
          <QuickBtn $light>자동/수동</QuickBtn>
          <QuickBtn $danger>긴급 정지</QuickBtn>
        </QuickGrid>
      </QuickPanel>

      <DevicePanel>
        <SectionTitle>장치 상태</SectionTitle>
        <DeviceGrid>
          {devices.map((device) => (
            <DeviceCard key={device.id}>
              <div className="top">
                <div>
                  <div className="name">{device.name}</div>
                  <div className="target">설정값: {device.target}</div>
                </div>
                <ModeBadge $mode={device.mode}>{device.mode}</ModeBadge>
              </div>

              <div className="bottom">
                <button className="primary">제어</button>
                <button className="secondary">상세</button>
              </div>
            </DeviceCard>
          ))}
        </DeviceGrid>
      </DevicePanel>

      <ManualAdjustPanel>
        <SectionTitle>수동 조정</SectionTitle>

        <AdjustCard>
          <label>환기 강도</label>
          <input type="range" min="0" max="100" defaultValue="50" />
          <div className="value">50%</div>
        </AdjustCard>

        <AdjustCard>
          <label>급수량</label>
          <input type="range" min="0" max="100" defaultValue="35" />
          <div className="value">35%</div>
        </AdjustCard>

        <ApplyRow>
          <ApplyBtn>적용하기</ApplyBtn>
          <StopBtn>긴급 정지</StopBtn>
        </ApplyRow>
      </ManualAdjustPanel>
    </FieldPageShell>
  );
}

const StatusStrip = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  margin-bottom: 12px;
`;

const StatusCard = styled.div`
  background: #ffffff;
  border-radius: 16px;
  padding: 14px 12px;

  span {
    display: block;
    font-size: 12px;
    color: #6b7280;
    margin-bottom: 6px;
    font-weight: 700;
  }

  strong {
    font-size: 20px;
    color: #111827;
    font-weight: 800;
  }
`;

const QuickPanel = styled.section`
  background: #ffffff;
  border-radius: 18px;
  padding: 14px;
  margin-bottom: 12px;
`;

const SectionTitle = styled.h3`
  font-size: 16px;
  font-weight: 800;
  color: #111827;
  margin-bottom: 12px;
`;

const QuickGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
`;

const QuickBtn = styled.button`
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
    $danger ? theme.colors.danger : $light ? theme.colors.text : '#ffffff'};
`;

const DevicePanel = styled.section`
  background: #ffffff;
  border-radius: 18px;
  padding: 14px;
  margin-bottom: 12px;
`;

const DeviceGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 10px;

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
  }
`;

const DeviceCard = styled.div`
  background: #f9fafb;
  border-radius: 16px;
  padding: 14px;
  border: 1px solid #e5e7eb;

  .top {
    display: flex;
    justify-content: space-between;
    gap: 12px;
    margin-bottom: 14px;
  }

  .name {
    font-size: 15px;
    font-weight: 800;
    color: #111827;
    margin-bottom: 6px;
  }

  .target {
    font-size: 13px;
    color: #6b7280;
    font-weight: 600;
  }

  .bottom {
    display: flex;
    gap: 10px;
  }

  .primary,
  .secondary {
    flex: 1;
    height: 42px;
    border-radius: 12px;
    font-weight: 800;
  }

  .primary {
    background: #2f6f4f;
    color: #fff;
  }

  .secondary {
    background: #e5e7eb;
    color: #374151;
  }
`;

const ModeBadge = styled.div`
  height: fit-content;
  padding: 6px 10px;
  border-radius: 999px;
  font-size: 11px;
  font-weight: 800;
  background: ${({ $mode }) => ($mode === 'AUTO' ? '#dcfce7' : '#e5e7eb')};
  color: ${({ $mode }) => ($mode === 'AUTO' ? '#166534' : '#374151')};
`;

const ManualAdjustPanel = styled.section`
  background: #ffffff;
  border-radius: 18px;
  padding: 14px;
`;

const AdjustCard = styled.div`
  background: #f9fafb;
  border-radius: 16px;
  padding: 14px;
  margin-bottom: 12px;

  label {
    display: block;
    font-size: 14px;
    font-weight: 800;
    color: #111827;
    margin-bottom: 12px;
  }

  input[type='range'] {
    width: 100%;
    accent-color: #2f6f4f;
  }

  .value {
    text-align: center;
    margin-top: 10px;
    font-size: 26px;
    font-weight: 800;
    color: #2f6f4f;
  }
`;

const ApplyRow = styled.div`
  display: flex;
  gap: 10px;
`;

const ApplyBtn = styled.button`
  flex: 1;
  height: 50px;
  border-radius: 14px;
  background: #2f6f4f;
  color: #fff;
  font-weight: 800;
`;

const StopBtn = styled.button`
  flex: 1;
  height: 50px;
  border-radius: 14px;
  background: #fee2e2;
  color: #dc2626;
  font-weight: 800;
`;
