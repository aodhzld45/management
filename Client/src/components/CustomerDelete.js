import React from 'react'

const CustomerDelete = ({id}) => {

// 고객의 id를 인수로 접근하여 삭제
const deleteCustomer = async (e) => {
  e.preventDefault(); 
  try {
  // /api/customers/7 과 같이 REST API DELETE ID값을 기준으로 삭제
  const url  ='/api/customers/' + id;
  const response = await fetch(url, {
    method: 'DELETE'
  });
  if (response.ok) {
    // 성공적으로 처리됐을 때의 작업
    console.log('고객 삭제 성공.');
    window.location.reload();
  } else {
    console.error('고객 삭제 중 오류가 발생했습니다');
  }
} catch (error) {
  console.error('고객 삭제 중 오류가 발생했습니다:', error);
}
}

  return (
   <button onClick={deleteCustomer}>삭제</button>
  )
}


export default CustomerDelete;

