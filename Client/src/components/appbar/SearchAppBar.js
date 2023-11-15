import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';

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

function SearchAppBar({ customers, setFilteredCustomers }) {

// 검색어를 관리하는 State
  const [searchKeyword, setsearchKeyword] = React.useState('');

// 검색어가 변경될 때 실행되는 함수
  const handleSearch = (event) => {
// 입력된 검색어를 소문자로 변환하여 변수에 저장
    const keword = event.target.value.toLowerCase();
// 상태를 업데이트하여 현재 검색어를 반영
    setsearchKeyword(keword);

    // 필터 함수를 사용하여 검색어를 포함한 고객을 찾음.
    const filteredCustomers = customers.filter((customer) =>
      customer.name.toLowerCase().includes(keword)
    );

    /*
      상태를 업데이트하여 필터된 고객 목록을 부모 컴포넌트에 전달
      filteredCustomers는 부모 컴포넌트(App.js)에서 전달받은
      setFilteredCustomers 함수를 이용 업데이트 됨
      -> 이 함수를 통해 검색어에 따라 필터링된 결과를 부모 컴포넌트에 전달
    */

    setFilteredCustomers(filteredCustomers);
  };

  return (
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
                SEO 고객관리시스템
              </Typography>
              <Search>
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder="검색하기"
                  inputProps={{ 'aria-label': 'search' }}
                  // 입력된 검색어를 상태에 바인딩하여 검색어를 반영
                  value={searchKeyword} 
                  // 입력란 값이 변경될 때 실행되는 함수(handleSearch)를 연결
                  onChange={handleSearch}
                />
              </Search>
            </Toolbar>
          </AppBar>
        </Box>
  );
}

export default SearchAppBar;

