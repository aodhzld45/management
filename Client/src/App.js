import './App.css';
//외부 Components import
import Customer from './components/Customer';
import CustomerFormModal from "./components/CustomerFormModal";
import SearchAppBar from './components/appbar/SearchAppBar';

import React, { useState, useEffect } from 'react'; // React, useState, useEffect를 import

// material-ui를 통한 테이블
import Table from '@mui/material/Table';
import { TableHead, TableBody, TableRow, TableCell } from '@mui/material';
import { Paper } from '@mui/material';
// Progress Loading bar
import CircularProgress from '@mui/material/CircularProgress';

// React Material-Ui App Bar Import
import { styled } from '@mui/material/styles';

// const RootContainer = styled(Paper)({
//   width: '100%',
//   marginTop: 'theme.spacing.unit * 3',
//   overflowX: 'auto',
// });
import { useTheme } from '@mui/system';

const RootContainer = styled(Paper)(({ theme }) => ({
  width: '100%',
  minWidth: 1080
}));


const TableContainer = styled(Table)(({ theme }) => ({
  marginLeft: 18,
  marginRight: 18
}));


const TableHeadCell = styled(TableCell)(({ theme }) => ({
  // 스타일을 여기에 정의
  fontWeight: 'bold',
  fontSize : '1.0rem',
    // 추가적인 스타일 정의
}));

// ClassName을 통한 커스터마이징 디자인 : 
/*
'&.ClassName명칭' : {
    // 스타일을 여기에 정의
}

*/
const CustomerAddButton = styled('div')(({ theme, className }) => ({
    '&.customerAddBtn': {
      marginTop : 15,
      marginBottom : 15,
      display : 'flex',
      justifyContent : 'center',
    },

    '&.custom-class': {
      fontWeight : 'bold',
      fontSize : 16,
      backgroundColor : 'blue',
      color : 'white',
    }

}));


function App() {
  // useState 훅을 사용하여 'customers' 상태와 그 상태를 업데이트할 'setCustomers' 함수를 생성
  // 'customers'는 서버에서 불러온 고객 정보를 저장할 배열, 초기값은 빈 배열
  const [customers, setCustomers] = useState([]);
  const [completed, setCompleted] = useState(0);


  // Styled - theme 정의
  const theme = useTheme();

  // SPA를 이용한 state Refresh -> 함수 자체를 Props 형태로 전달
  const stateRefresh = () => {
    setCustomers([]);
    // setCompleted(0);
    callApi()
    .then((res) => setCustomers(res))
    .catch((err) => console.log(err));
  };
  

  // useEffect 훅을 사용하여 부수 효과(사이드 이펙트)를 처리
  // 이 부분은 컴포넌트가 마운트될 때(fetch 요청 등) 실행하도록 설정
  // 마운트 시 한 번 실행. 두 번째 매개변수인 빈 배열([])은 의존성 배열로, 여기서는 의존성이 없으므로 한 번만 실행
  useEffect(() => {
    const progress = () => {
      setCompleted((prevCompleted) => (prevCompleted >= 100 ? 0 : prevCompleted + 1));
    };
    const timer = setInterval(progress, 100);

    callApi() // callApi 함수를 호출하여 고객 데이터를 불러옴
    .then((res) => {
      setCustomers(res);
      // setCompleted(100); // 데이터를 성공적으로 불러왔을 때 completed를 100으로 설정
    })
    .catch((err) => console.log(err))
    .finally(() => {
      clearInterval(timer); // 컴포넌트가 언마운트될 때 타이머를 정리
      setCompleted(100); // 데이터를 성공적으로 불러왔을 때 completed를 100으로 설정
      // console.log(completed);
    })

      // return () => {
      //   clearInterval(timer); // 컴포넌트가 언마운트될 때 타이머를 정리
      // };
      
  }, []);

  
  // callApi 함수는 비동기 함수로, 서버에서 고객 정보를 가져오기 위해 API 요청
  const callApi = async () => {
    // fetch 함수를 사용하여 '/api/customers' 엔드포인트에 GET 요청
    const response = await fetch('/api/customers');
    // 서버에서 반환된 응답(response)을 JSON 형식으로 파싱하여 데이터를 추출
    const body = await response.json();
    // 파싱된 데이터(body)를 반환
    return body;
  };

  const cellList = ["번호", "이미지", "이름", "생년월일", "성별", "직업", "설정"];

  return (
    <RootContainer theme={theme}>
      <SearchAppBar />
      
      <CustomerAddButton className='customerAddBtn'>
        <CustomerFormModal stateRefresh={stateRefresh} />
      </CustomerAddButton>

      <TableContainer>
        <TableHead>
          <TableRow>
            {cellList.map(c => {
              return <TableHeadCell>{c}</TableHeadCell>
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          {completed === 100 ? (
            customers.map((c) => (
              <Customer
                id={c.id}
                image={c.image}
                name={c.name}
                birthday={c.birthday}
                gender={c.gender}
                job={c.job}
              />
            ))
          ) : (
            <TableRow>
              <TableCell colSpan="6" align="center">
                <CircularProgress variant="determinate" value={completed} />
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </TableContainer>

   

      <CustomerAddButton className='custom-class'>
          <p>test입니다.</p>
      </CustomerAddButton>

      
  </RootContainer>
  );
}


export default App;
