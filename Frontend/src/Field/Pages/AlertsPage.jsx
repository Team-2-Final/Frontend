import styled from 'styled-components';
import FieldPageShell from '../Components/FieldPageShell';

const alertData = [
  {
    id: 1,
    level: 'danger',
    title: '온도 상승 감지',
    desc: 'Sector 01 내부 온도 31.8°C 초과',
    time: '방금 전',
    action: '환기팬 가동 권장',
  },
  {
    id: 2,
    level: 'warning',
    title: '급수 부족 예측',
    desc: '일사량 증가로 수분 부족 가능성',
    time: '3분 전',
    action: '급수량 소폭 증가',
  },
  {
    id: 3,
    level: 'normal',
    title: '자동 급수 실행',
    desc: 'AI 제어에 의해 급수 2.5L 진행',
    time: '12분 전',
    action: '정상 처리 완료',
  },
  {
    id: 4,
    level: 'warning',
    title: '습도 저하 감지',
    desc: '현재 습도 49%로 목표 하한 근접',
    time: '20분 전',
    action: '미스트 시스템 확인',
  },
];

export default function AlertsPage() {
  return (
    <FieldPageShell title="Alerts" rightText="4 Alerts">
      <TopSummary>
        <SummaryCard>
          <span>Critical</span>
          <strong>1</strong>
        </SummaryCard>
        <SummaryCard>
          <span>Warning</span>
          <strong>2</strong>
        </SummaryCard>
        <SummaryCard>
          <span>Resolved</span>
          <strong>1</strong>
        </SummaryCard>
      </TopSummary>

      <PrimaryAlert>
        <div className="badge">DANGER</div>
        <h2>현재 가장 중요한 알림</h2>
        <p>Sector 01 온도 과열 상태입니다. 즉시 환기 장치를 확인하세요.</p>
        <ActionRow>
          <MainAction>환기 ON</MainAction>
          <SubAction>상세 보기</SubAction>
        </ActionRow>
      </PrimaryAlert>

      <SectionTitle>실시간 알림 로그</SectionTitle>

      <AlertList>
        {alertData.map((item) => (
          <AlertCard key={item.id} $level={item.level}>
            <div className="top">
              <div className="left">
                <div className="title">{item.title}</div>
                <div className="desc">{item.desc}</div>
              </div>
              <div className="time">{item.time}</div>
            </div>

            <div className="bottom">
              <div className="action">{item.action}</div>
              <button>확인</button>
            </div>
          </AlertCard>
        ))}
      </AlertList>
    </FieldPageShell>
  );
}

const TopSummary = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  margin-bottom: 12px;

  @media (min-width: 768px) {
    gap: 14px;
    margin-bottom: 16px;
  }
`;

const SummaryCard = styled.div`
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
    font-size: 24px;
    color: #111827;
    font-weight: 800;
  }
`;

const PrimaryAlert = styled.section`
  background: linear-gradient(135deg, #fff1f2 0%, #ffe4e6 100%);
  border: 1px solid #fecdd3;
  border-radius: 20px;
  padding: 16px;
  margin-bottom: 14px;

  .badge {
    display: inline-flex;
    padding: 6px 10px;
    border-radius: 999px;
    background: #dc2626;
    color: #fff;
    font-size: 11px;
    font-weight: 800;
    margin-bottom: 10px;
  }

  h2 {
    font-size: 18px;
    margin-bottom: 8px;
    color: #7f1d1d;
  }

  p {
    font-size: 14px;
    color: #991b1b;
    line-height: 1.45;
  }
`;

const ActionRow = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 14px;
`;

const MainAction = styled.button`
  flex: 1;
  height: 46px;
  border-radius: 14px;
  background: #dc2626;
  color: #fff;
  font-weight: 800;
`;

const SubAction = styled.button`
  flex: 1;
  height: 46px;
  border-radius: 14px;
  background: #ffffff;
  color: #7f1d1d;
  font-weight: 800;
`;

const SectionTitle = styled.h3`
  font-size: 16px;
  font-weight: 800;
  color: #111827;
  margin: 8px 0 10px;
`;

const AlertList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const AlertCard = styled.div`
  background: #ffffff;
  border-radius: 18px;
  padding: 14px;
  border-left: 5px solid
    ${({ $level }) =>
      $level === 'danger'
        ? '#dc2626'
        : $level === 'warning'
          ? '#f59e0b'
          : '#22c55e'};

  .top {
    display: flex;
    justify-content: space-between;
    gap: 12px;
    margin-bottom: 10px;
  }

  .left {
    min-width: 0;
  }

  .title {
    font-size: 15px;
    font-weight: 800;
    color: #111827;
    margin-bottom: 6px;
  }

  .desc {
    font-size: 13px;
    color: #6b7280;
    line-height: 1.4;
  }

  .time {
    font-size: 12px;
    color: #9ca3af;
    font-weight: 700;
    white-space: nowrap;
  }

  .bottom {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 10px;
  }

  .action {
    font-size: 13px;
    font-weight: 700;
    color: #374151;
  }

  button {
    background: #eef2f7;
    color: #111827;
    font-size: 12px;
    font-weight: 800;
    padding: 8px 12px;
    border-radius: 10px;
  }
`;
