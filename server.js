const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;

// 이미지를 렌더링할 때 이미지 파일의 경로를 지정
const images = [
    '/img/ryan.jpg',
    '/img/youkyung.jpg',
    '/img/hong.jpg',
  ];
  

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('img')); // public/img 경로 설정


// rest API 명세
app.get('/api/hello', (req, res) => {
    res.send({message: 'Hello Express!'});
});

app.get('/api/customers', (req, res) => {
    res.send([
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
        
    ]);
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
