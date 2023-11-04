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
  app.get('/api/customers', (req, res) => {
    connection.execute(
      'SELECT * FROM CUSTOMER',
      (err, result) => {
        if (err) {
          console.error(err.message);
          return;
        }
        res.json(result.rows);
      }
    );
  });

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