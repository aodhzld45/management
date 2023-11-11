const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;
const fs = require('fs');

// 파일 처리를 위한 multer 라이브러리
const multer = require('multer');
const upload = multer({dest: './upload'});

app.use('/image', express.static('./upload'));

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
      'SELECT * FROM CUSTOMER WHERE ISDELETED = 0',
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
app.post('/api/customers', upload.single('image'), (req, res) => {
  let sql = 'INSERT INTO CUSTOMER (id, image, name, birthday, gender, job, isdeleted, createdate) VALUES (SEQ_CUSTOMER_ID.NEXTVAL, :1, :2, :3, :4, :5, 0, sysdate)';
  let image = '/image/' + req.file.filename;
  let name = req.body.name;
  let birthday = req.body.birthday;
  let gender = req.body.gender;
  let job = req.body.job;
  let params = [image, name, birthday, gender, job];

  connection.execute(sql, params, { autoCommit: true })
    .then((result) => {
      // 결과에서 새로 생성된 고객 ID를 가져옴
      // 새로 생성된 고객 ID(Sequence)를 응답으로 반환
      res.json(result);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('고객 추가 중 오류가 발생했습니다');
    });
});

// 고객 삭제를 위한 DELETE 요청을 처리하는 엔드포인트
app.delete('/api/customers/:id', (req, res) => {
  let sql = 'UPDATE CUSTOMER SET ISDELETED = 1 WHERE id = :id';
  let params = { id: req.params.id };
 
  connection.execute(sql, params, { autoCommit: true })
  .then((result) => {
    console.log('고객 삭제 성공:', result);
    res.json(result);
  })
  .catch((err) => {
    console.error('고객 삭제 중 오류가 발생했습니다:', err);
    res.status(500).send('고객 삭제 중 오류가 발생했습니다');
  });

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