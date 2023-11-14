import './App.css';
import Customer from './components/Customer';
import CustomerFormModal from "./components/CustomerFormModal";
import React, { useState, useEffect } from 'react'; // React, useState, useEffect를 import

// material-ui를 통한 테이블
import Table from '@mui/material/Table';
import { TableHead, TableBody, TableRow, TableCell } from '@mui/material';
import { Paper } from '@mui/material';
// Progress Loading bar
import CircularProgress from '@mui/material/CircularProgress';

// React Material-Ui App Bar Import
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';

// const RootContainer = styled(Paper)({
//   width: '100%',
//   marginTop: 'theme.spacing.unit * 3',
//   overflowX: 'auto',
// });

const RootContainer = styled(Paper)(({ theme }) => ({
  width: '100%',
  marginTop: theme.spacing(3),  // 수정된 부분
  overflowX: 'auto',
}));


const TableContainer = styled(Table)(({ theme }) => ({
  minWidth: 1080,
}));

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));


function App() {
  // useState 훅을 사용하여 'customers' 상태와 그 상태를 업데이트할 'setCustomers' 함수를 생성
  // 'customers'는 서버에서 불러온 고객 정보를 저장할 배열, 초기값은 빈 배열
  const [customers, setCustomers] = useState([]);
  const [completed, setCompleted] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);

  // SPA를 이용한 state Refresh -> 함수 자체를 Props 형태로 전달
  const stateRefresh = () => {
    setCustomers([]);
    // setCompleted(0);
    callApi()
    .then((res) => setCustomers(res))
    .catch((err) => console.log(err));
  };

  const handleToggleModal = () => {
    setModalOpen(!modalOpen);
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

  return (
    


  <RootContainer>
     <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static">
            <Toolbar>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="open drawer"
                sx={{ mr: 2 }}
              >
                <MenuIcon />
              </IconButton>
              <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
              >
                MUI
              </Typography>
              <Search>
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder="Search…"
                  inputProps={{ 'aria-label': 'search' }}
                />
              </Search>
            </Toolbar>
          </AppBar>
      </Box>
      <TableContainer>
        <TableHead>
          <TableRow>
            <TableCell>번호</TableCell>
            <TableCell>이미지</TableCell>
            <TableCell>이름</TableCell>
            <TableCell>생년월일</TableCell>
            <TableCell>성별</TableCell>
            <TableCell>직업</TableCell>
            <TableCell>설정</TableCell>
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

      <div>
      <button onClick={handleToggleModal}>고객 추가</button>
      <CustomerFormModal isOpen={modalOpen} toggleModal={handleToggleModal} stateRefresh={stateRefresh} />
      </div>

      
  </RootContainer>
 
  );
}


export default App;
