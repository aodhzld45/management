const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;
const fs = require('fs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// 데이터베이스 설정
const data = fs.readFileSync('./database.json');
const conf = JSON.parse(data);

const oracledb = require('oracledb'); //oracleDB 
const connectionConfig = {
  user: conf.user,
  password: conf.password,
  connectString: `${conf.host}:${conf.port}/${conf.database}`
};


// rest API 명세
// OracleDB에 연결
oracledb.getConnection(connectionConfig, (err, connection) => {
  if (err) {
    console.error('Error connecting to OracleDB:', err.message);
    return;
  }

  console.log('Connected to OracleDB');

  // 연결이 성공적으로 생성되었을 때 실행할 코드

// 고객 정보를 반환하는 GET 요청을 처리하는 엔드포인트
  app.get('/api/customers', (req, res) => {
    connection.execute(
      'SELECT * FROM CUSTOMER',
      (err, result) => {
        if (err) {
          console.error(err.message);
          return;
        }
        const customers = result.rows.map((row) => ({
          id: row[0],
          image: row[1],
          name: row[2],
          birthday: row[3],
          gender: row[4],
          job: row[5],
        }));
        // 고객 목록을 JSON 형식으로 클라이언트에 반환
        res.json(customers);
      }
    );
  });

// 고객 추가를 위한 POST 요청을 처리하는 엔드포인트
// app.post('/api/customers', (req, res) => {
//   connection.execute(
   
//   )



//  }

  





  // 연결 해제
  // connection.close((err) => {
  //   if (err) {
  //     console.error(err.message);
  //   }else {
  //     console.log('Disconnected from OracleDB');
  //   }
  // });
});

// 서버 시작
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});