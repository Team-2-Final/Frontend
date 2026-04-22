import styled from 'styled-components';
import FieldPageShell from '../Components/FieldPageShell';

const sectors = [
  { id: 1, name: 'Sector 01', status: 'Good' },
  { id: 2, name: 'Sector 02', status: 'Warning' },
  { id: 3, name: 'Sector 03', status: 'Good' },
  { id: 4, name: 'Sector 04', status: 'Good' },
];

export default function CameraPage() {
  return (
    <FieldPageShell title="Camera" rightText="LIVE">
      <PageGrid>
        <CameraSection>
          <CameraBox>
            <div className="live">🔴 LIVE</div>
            <div className="screen">Live Camera Feed</div>

            <Hud>
              <h4>AI Summary</h4>
              <div className="row">
                <span>Plant Health</span>
                <strong className="good">94%</strong>
              </div>
              <div className="row">
                <span>Pest Detection</span>
                <strong className="normal">None</strong>
              </div>
              <div className="row">
                <span>Growth Stage</span>
                <strong>Vegetative</strong>
              </div>
              <div className="row">
                <span>Suggestion</span>
                <strong className="blue">Increase water slightly</strong>
              </div>
            </Hud>
          </CameraBox>

          <ControlRow>
            <CamButton>좌측 이동</CamButton>
            <CamButton>우측 이동</CamButton>
            <CamButton>줌 인</CamButton>
            <CamButton>줌 아웃</CamButton>
          </ControlRow>
        </CameraSection>

        <BottomArea>
          <SectorPanel>
            <PanelTitle>Sections</PanelTitle>
            <SectorList>
              {sectors.map((sector) => (
                <SectorItem key={sector.id}>
                  <span>{sector.name}</span>
                  <StatusDot $status={sector.status} />
                </SectorItem>
              ))}
            </SectorList>
          </SectorPanel>

          <InfoPanel>
            <PanelTitle>Current Vision Status</PanelTitle>
            <InfoCard>
              <span>Leaf Color</span>
              <strong>Normal</strong>
            </InfoCard>
            <InfoCard>
              <span>Leaf Shape</span>
              <strong>Stable</strong>
            </InfoCard>
            <InfoCard>
              <span>Disease Risk</span>
              <strong>Low</strong>
            </InfoCard>
            <InfoCard>
              <span>Last Analysis</span>
              <strong>2 sec ago</strong>
            </InfoCard>
          </InfoPanel>
        </BottomArea>
      </PageGrid>
    </FieldPageShell>
  );
}

const PageGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;

  @media (min-width: 768px) {
    gap: 16px;
  }
`;

const CameraSection = styled.section``;

const CameraBox = styled.div`
  position: relative;
  height: 220px;
  border-radius: 20px;
  overflow: hidden;
  background: #ffffff;

  .screen {
    width: 100%;
    height: 100%;
    background: #d1d5db;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #374151;
    font-weight: 800;
    font-size: 18px;
  }

  .live {
    position: absolute;
    top: 12px;
    left: 12px;
    padding: 7px 10px;
    border-radius: 999px;
    background: rgba(17, 24, 39, 0.82);
    color: #fff;
    font-size: 12px;
    font-weight: 800;
    z-index: 2;
  }

  @media (min-width: 768px) {
    height: 360px;
  }
`;

const Hud = styled.div`
  position: absolute;
  right: 12px;
  top: 12px;
  width: 170px;
  padding: 12px;
  border-radius: 16px;
  background: rgba(15, 23, 42, 0.78);
  color: #fff;
  backdrop-filter: blur(8px);

  h4 {
    margin: 0 0 10px;
    font-size: 14px;
    font-weight: 800;
  }

  .row {
    display: flex;
    justify-content: space-between;
    gap: 8px;
    margin-bottom: 8px;
    font-size: 12px;
  }

  span {
    color: #cbd5e1;
  }

  strong {
    text-align: right;
    font-size: 12px;
  }

  .good {
    color: #4ade80;
  }

  .normal {
    color: #f8fafc;
  }

  .blue {
    color: #38bdf8;
  }

  @media (min-width: 768px) {
    width: 240px;
  }
`;

const ControlRow = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
  margin-top: 12px;

  @media (min-width: 768px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

const CamButton = styled.button`
  height: 46px;
  border-radius: 14px;
  background: #ffffff;
  color: #111827;
  font-weight: 800;
`;

const BottomArea = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 12px;

  @media (min-width: 768px) {
    grid-template-columns: 320px 1fr;
    gap: 16px;
  }
`;

const SectorPanel = styled.div`
  background: #ffffff;
  border-radius: 18px;
  padding: 14px;
`;

const InfoPanel = styled.div`
  background: #ffffff;
  border-radius: 18px;
  padding: 14px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
  align-content: start;
`;

const PanelTitle = styled.h3`
  font-size: 16px;
  font-weight: 800;
  color: #111827;
  margin-bottom: 12px;
  grid-column: 1 / -1;
`;

const SectorList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const SectorItem = styled.div`
  height: 50px;
  border-radius: 14px;
  background: #f9fafb;
  border: 1px solid #e5e7eb;
  padding: 0 14px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-weight: 700;
  color: #111827;
`;

const StatusDot = styled.div`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: ${({ $status }) =>
    $status === 'Warning' ? '#f59e0b' : '#22c55e'};
`;

const InfoCard = styled.div`
  background: #f9fafb;
  border-radius: 14px;
  padding: 14px;

  span {
    display: block;
    font-size: 12px;
    color: #6b7280;
    margin-bottom: 6px;
    font-weight: 700;
  }

  strong {
    font-size: 18px;
    color: #111827;
    font-weight: 800;
  }
`;
