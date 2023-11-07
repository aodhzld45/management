import React, { useState } from 'react';
import Modal from 'react-modal'; // react-modal 라이브러리를 import
import axios from 'axios';

Modal.setAppElement('#root'); // 모달을 사용할 앱의 루트 엘리먼트 설정

// 스타일드 컴포넌트를 사용하여 버튼 스타일링
// const AddCustomerButton = styled.button`
//   background-color: #007bff; // 배경색
//   color: #fff; // 글자색
//   padding: 10px 20px; // 패딩
//   border: none;
//   border-radius: 5px;
//   cursor: pointer;
//   margin-right: 20px; // 오른쪽 여백 추가
// `;

function CustomerFormModal({ onSubmit, isOpen, toggleModal  }) {
  const [formData, setFormData] = useState({
    id: '',
    image: '',
    name: '',
    birthday: '',
    gender: '',
    job: '',
  });
  const handleAddCustomer = async () => {
    try {
      // POST 요청을 보낼 데이터 객체
      const newCustomer = {
        id: formData.id,
        image: formData.image,
        name: formData.name,
        birthday: formData.birthday,
        gender: formData.gender,
        job: formData.job,
      };

      // Axios를 사용하여 서버에 POST 요청 보내기
      await axios.post('/api/customers', newCustomer);
    // 폼 데이터 초기화
      setFormData({
        id: '',
        image: '',
        name: '',
        birthday: '',
        gender: '',
        job: '',
      });

      
      // 폼 모달 닫기
      toggleModal();

      // 고객 추가가 완료되면 부모 컴포넌트에서 처리할 함수 호출
      onSubmit(newCustomer);
      } catch (error) {
        console.error('고객 추가 중 오류 발생:', error);
      }
    };


  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   onSubmit(formData);
  //   // 여기에서 서버로 데이터를 전송하거나 상태(state)를 업데이트
  //   console.log('고객 정보를 제출', formData);
  //   // 모달을 종료
  //   toggleModal();
  // };

  return (
    <Modal
    isOpen={isOpen} // 모달 열기/닫기 상태
    onRequestClose={toggleModal} // 모달을 닫을 때 호출되는 함수
    contentLabel="Customer Form Modal" // 모달의 레이블
  >
    <h2>고객 정보 입력</h2>
            <form>
              <label>
                ID:
                <input
                  type="text"
                  value={formData.id}
                  onChange={(e) => setFormData({ ...formData, id: e.target.value })}
                />
              </label>
              <label>
                IMAGE:
                <input
                  type="text"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                />
              </label>
              <label>
                NAME:
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </label>
              <label>
                BIRTHDAY:
                <input
                  type="text"
                  value={formData.birthday}
                  onChange={(e) => setFormData({ ...formData, birthday: e.target.value })}
                />
              </label>
              <label>
                GENDER:
                <input
                  type="text"
                  value={formData.gender}
                  onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                />
              </label>
              <label>
                JOB:
                <input
                  type="text"
                  value={formData.job}
                  onChange={(e) => setFormData({ ...formData, job: e.target.value })}
                />
              </label>
              <button type="button" onClick={handleAddCustomer}>
                  저장
                </button>
                <button type="button" onClick={toggleModal}>
                  취소
                </button>
            </form>
      
      
    </Modal>
  );
}

export default CustomerFormModal;
