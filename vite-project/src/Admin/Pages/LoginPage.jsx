import React, { useState } from 'react';
import styled from 'styled-components';

const LoginPage = () => {
    const [id, setId] = useState('');
    const [pw, setPw] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();
        console.log("Login Attempt:", id, pw);
        // 나중에 여기에 라우팅 기능(navigate('/admin')) 추가할 예정
    };

    return (
        <LoginWrapper>
            <LoginBox>
                {/* 상단 포인트 띠 */}
                <HeaderAccent />

                <ContentArea>
                    <LogoArea>
                        <IconWrapper>🌱</IconWrapper>
                        <div className="title">Seed Farm</div>
                        <p>Admin Portal Access</p>
                    </LogoArea>

                    <form onSubmit={handleLogin}>
                        <InputGroup>
                            <label>Administrator ID</label>
                            <input
                                type="text"
                                placeholder="Enter your ID"
                                value={id}
                                onChange={(e) => setId(e.target.value)}
                            />
                        </InputGroup>

                        <InputGroup>
                            <label>Password</label>
                            <input
                                type="password"
                                placeholder="Enter your password"
                                value={pw}
                                onChange={(e) => setPw(e.target.value)}
                            />
                        </InputGroup>

                        <LoginButton type="submit">System Login</LoginButton>
                    </form>
                </ContentArea>
            </LoginBox>
        </LoginWrapper>
    );
};

export default LoginPage;

// --- Styled Components ---

const LoginWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  /* 밋밋한 단색 대신 은은한 방사형 그라데이션 적용 */
  background: radial-gradient(circle at 50% 0%, #ffffff 0%, var(--bg-color) 70%);
`;

const LoginBox = styled.div`
  width: 480px; /* 기존 400px에서 480px로 시원하게 확대! */
  background: var(--white);
  border-radius: 20px; /* 모서리를 더 둥글게 해서 세련미 추가 */
  box-shadow: 0 20px 40px rgba(15, 23, 42, 0.08); /* 그림자를 더 깊고 부드럽게 */
  overflow: hidden; /* 상단 띠가 둥근 모서리를 안 벗어나게 함 */
`;

const HeaderAccent = styled.div`
  height: 8px;
  width: 100%;
  /* 우리가 정한 다크그린 -> 틸 색상으로 이어지는 그라데이션 띠 */
  background: linear-gradient(90deg, var(--point-green) 0%, var(--teal) 100%);
`;

const ContentArea = styled.div`
  padding: 50px 40px; /* 박스가 커진 만큼 안쪽 여백도 시원하게 */
`;

const LogoArea = styled.div`
  text-align: center;
  margin-bottom: 40px;

  .title {
    font-size: 2.2rem;
    font-weight: 800;
    color: var(--primary-dark);
    margin-bottom: 8px;
    letter-spacing: -0.5px;
  }
  p {
    color: #64748B; /* 네이비보다 살짝 연한 슬레이트 색상 */
    font-size: 0.95rem;
    margin: 0;
    font-weight: 500;
  }
`;

const IconWrapper = styled.div`
  font-size: 2.5rem;
  margin-bottom: 10px;
  display: inline-block;
  padding: 15px;
  background-color: rgba(46, 125, 50, 0.05); /* 아이콘 배경에 아주 연한 초록색 깔기 */
  border-radius: 50%;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 24px;

  label {
    font-size: 0.85rem;
    font-weight: 600;
    margin-bottom: 8px;
    color: var(--primary-dark);
  }

  input {
    width: 100%;
    padding: 14px 16px; /* 입력칸 크기도 살짝 키움 */
    border: 1px solid #E2E8F0;
    border-radius: 10px;
    background-color: #F8FAFC; /* 입력칸 배경을 살짝 어둡게 해서 입체감 부여 */
    font-size: 1rem;
    transition: all 0.2s ease;

    &:focus {
      outline: none;
      border-color: var(--teal);
      background-color: var(--white);
      box-shadow: 0 0 0 3px rgba(0, 194, 168, 0.15); /* 포커스 시 예쁜 테두리 빛망울 */
    }
  }
`;

const LoginButton = styled.button`
  width: 100%;
  padding: 16px;
  margin-top: 10px;
  background-color: var(--primary-dark);
  color: var(--white);
  border: none;
  border-radius: 10px;
  font-size: 1.05rem;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 4px 6px rgba(15, 23, 42, 0.2);
  transition: all 0.3s ease;

  &:hover {
    background-color: var(--point-green);
    transform: translateY(-2px); /* 마우스 올렸을 때 살짝 위로 뜨는 애니메이션 */
    box-shadow: 0 6px 12px rgba(46, 125, 50, 0.3);
  }
`;