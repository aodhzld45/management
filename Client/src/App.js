import './App.css';
import Customer from './components/customer';

// material-ui를 통한 테이블
import Table from '@mui/material/Table';
import { TableHead } from '@mui/material';
import { TableBody } from '@mui/material';
import { TableRow } from '@mui/material';
import { TableCell } from '@mui/material';
import { styled } from '@mui/system'; // styled 함수를 import합니다

import { Paper } from '@mui/material';

const RootContainer = styled(Paper)({
  width: '100%',
  marginTop: 'theme.spacing.unit * 3',
  overflowX: 'auto',
});

const TableContainer = styled(Table)({
  minWidth: 1080,
});

const images = [
  require("./img/ryan.jpg"),
  require("./img/youkyung.jpg"),
  require("./img/hong.jpg"),
  // Add more image paths as needed
];

const customers = [
  {
    'id': 1,
    'image': images[0],
    'name': '서현석',
    'birthday': '19941013',
    'gender': '남자',
    'job': '개발자',
  },
  {
    'id': 2,
    'image': images[1],
    'name': '이유경',
    'birthday': '19991105',
    'gender': '여자',
    'job': '가수',
  },
  {
    'id': 3,
    'image': images[2],
    'name': '홍길동',
    'birthday': '14430101',
    'gender': '남자',
    'job': '의적',
  },
];

function App() {
  return (
    <RootContainer>
      <TableContainer>
        <TableHead>
          <TableRow>
            <TableCell>번호</TableCell>
            <TableCell>이름</TableCell>
            <TableCell>생년월일</TableCell>
            <TableCell>성별</TableCell>
            <TableCell>직업</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {customers.map(c => (
            <Customer
              key={c.id}
              id={c.id}
              image={c.image}
              name={c.name}
              birthday={c.birthday}
              gender={c.gender}
              job={c.job}
            />
          ))}
        </TableBody>
      </TableContainer>
    </RootContainer>
  );
}

export default App;