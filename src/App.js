import './App.css';
import Customer from './components/customer';

const images = [
  require("./img/ryan.jpg"),
  require("./img/youkyung.jpg"),
  require("./img/hong.jpg"),
  // Add more image paths as needed
];

const customers = [
 { 'id': 1,
  'image': images[0],
  'name': '서현석',
  'birthday': '19941013',
  'gender': '남자',
  'job': '개발자'
},
{ 'id': 2,
'image': images[1],
'name': '이유경',
'birthday': '19991105',
'gender': '여자',
'job': '가수'
},
{ 'id': 3,
'image': images[2],
'name': '홍길동',
'birthday': '14430101',
'gender': '남자',
'job': '의적'
},

]

function App() {
  return (
    <div>
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
    </div>
 
      
  );
}

export default App;
