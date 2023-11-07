import React, { useState } from 'react';
import Modal from 'react-modal'; // react-modal 라이브러리를 import
import post from 'axios';

Modal.setAppElement('#root'); // 모달을 사용할 앱의 루트 엘리먼트 설정

function CustomerFormModal({ isOpen, toggleModal  }) {
  const [formData, setFormData] = useState({
    file: null,
    name: '',
    birthday: '',
    gender: '',
    job: '',
    fileName: ''
  });

  const handleFormSubmit = async (e) => {

    e.preventDefault();
    addCustomer()
    .then((res) => {
      console.log(res.data);
    });

    // try {
    //   // Axios를 사용하여 서버에 POST 요청 보내기
    //   await axios.post('/api/customers', formData , {
    //     headers: {
    //       'Content-Type': 'multipart/form-data', // 멀티파트(form-data) 형식으로 전송
    //     },
    //   });

    // // 폼 데이터 초기화
    //   setFormData({
    //     id: '',
    //     image: '',
    //     name: '',
    //     birthday: '',
    //     gender: '',
    //     job: '',
    //     fileName: ''
    //   });

      
    //   // 폼 모달 닫기
    //   toggleModal();

    //   // 고객 추가가 완료되면 부모 컴포넌트에서 처리할 함수 호출
    //   onSubmit(newCustomer);
    //   } catch (error) {
    //     console.error('고객 추가 중 오류 발생:', error);
    //   }
    };

    // 파일이 변경되었을 때 실행되는 함수
    const handleFileChange = (e) => {
      setFormData({
        file: e.target.files[0],
        fileName : e.target.value
      });
    }

    const handleValueChange = (e) => {
      let nextState ={};
      nextState[e.target.name] = e.target.value;
      setFormData(nextState); //현재 state 값을 갱신

    };



    
    const addCustomer = () => {
      const url = '/api/customers'; // 요청할 서버 url
      const formData = new FormData(); // POST 요청을 보낼 데이터 객체 formData
      formData.append('image', formData.file); // 'file'은 파일 입력 필드에서 선택한 파일
      formData.append('name', formData.name);
      formData.append('birthday', formData.birthday);
      formData.append('gender', formData.gender);
      formData.append('job', formData.job);

      const config = {
        headers: {
          'content-type':'multipart/form-data',
        }
      }

      return post(url, formData, config);
    }




  return (
    <Modal
    isOpen={isOpen} // 모달 열기/닫기 상태
    onRequestClose={toggleModal} // 모달을 닫을 때 호출되는 함수
    contentLabel="Customer Form Modal" // 모달의 레이블
  >
    <h2>고객 정보 입력</h2>
            <form onSubmit={handleFormSubmit}>
              <label>
                프로필 이미지:
                <input
                  type="file"
                  value={formData.image}
                  file={formData.fileName}
                  name='file'
                  onChange={handleFileChange}
                />
              </label>
              <label>
                이름:
                <input
                  type="text"
                  value={formData.name}
                  onChange={handleValueChange}
                />
              </label>
              <label>
                생년월일:
                <input
                  type="text"
                  value={formData.birthday}
                  onChange={handleValueChange}
                />
              </label>
              <label>
                성별:
                <input
                  type="text"
                  value={formData.gender}
                  onChange={handleValueChange}
                />
              </label>
              <label>
                직업:
                <input
                  type="text"
                  value={formData.job}
                  onChange={handleValueChange}
                />
              </label>
              <button type="submit">
                  추가하기
                </button>
                <button type="button" onClick={toggleModal}>
                  취소
                </button>
            </form>
      
      
    </Modal>
  );
}

export default CustomerFormModal;
