import './App.css';
import Customer from './components/customer';

const customers = [
 { 'id': 1,
  'image': 'https://placeimg.com/64/64/1',
  'name': '서현석',
  'birthday': '19941013',
  'gender': '남자',
  'job': '개발자'
},
{ 'id': 2,
'image': 'https://placeimg.com/64/64/2',
'name': '이유경',
'birthday': '19991105',
'gender': '여자',
'job': '가수'
},
{ 'id': 3,
'image': 'https://placeimg.com/64/64/3',
'name': '홍길동',
'birthday': '14430101',
'gender': '남자',
'job': '의적'
},

]

function App() {
  return (
    <div>
    <Customer
    id = {customers[0].id}
    image = {customers[0].image}
    name = {customers[0].name}
    birthday = {customers[0].birthday}
    gender = {customers[0].gender}
    job = {customers[0].job}
    />
    <Customer
    id = {customers[1].id}
    image = {customers[1].image}
    name = {customers[1].name}
    birthday = {customers[1].birthday}
    gender = {customers[1].gender}
    job = {customers[1].job}
    />
    <Customer
    id = {customers[2].id}
    image = {customers[2].image}
    name = {customers[2].name}
    birthday = {customers[2].birthday}
    gender = {customers[2].gender}
    job = {customers[2].job}
    />
    </div>
  );
}

export default App;
