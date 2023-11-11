import React, { useState } from 'react';
import Modal from 'react-modal'; // react-modal 라이브러리를 import
import axios  from 'axios';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';

import DialogContent from '@mui/material/DialogContent';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { styled } from '@mui/system'; // styled 함수를 import


const StyledDialog = styled(Dialog)({
  // 다이얼로그 컨테이너에 대한 사용자 정의 스타일을 추가
  hidden: {
    display: 'none'
  }
});

Modal.setAppElement('#root'); // 모달을 사용할 앱의 루트 엘리먼트 설정

function CustomerFormModal({ isOpen, toggleModal, stateRefresh }) {
  const [modalOpen, setModalOpen] = useState(false);

  const handleToggleModal = () => {
    setModalOpen(!modalOpen);
  };
  const [formData, setFormData] = useState({
    file: null,
    name: '',
    birthday: '',
    gender: '',
    job: '',
    fileName: '',
    open: false
  });

  const handleFormSubmit = async (e) => {

    e.preventDefault();
    addCustomer()
    .then((res) => {
      console.log(res.data);
      stateRefresh();
      toggleModal();
    });
    // 값 초기화
    setFormData({
      file: null,
      name: '',
      birthday: '',
      gender: '',
      job: '',
      fileName: ''
    });
    // window.location.reload(); // 페이지 새로고침.

  };

    // 파일이 변경되었을 때 실행되는 함수
    const handleFileChange = (e) => {
      setFormData({
        ...formData,
        file: e.target.files[0],
        fileName : e.target.value
      });
    }

    const handleValueChange = (e) => {
      const name = e.target.name;
      const value = e.target.value;
      setFormData({
        ...formData,
        [name]: value // 해당 필드만 갱신
      });
    };

    const addCustomer = () => {
      const url = '/api/customers'; // 요청할 서버 url
      const customerFormData = new FormData(); // POST 요청을 보낼 데이터 객체 formData
      customerFormData.append('image', formData.file); // 'file'은 파일 입력 필드에서 선택한 파일
      customerFormData.append('name', formData.name);
      customerFormData.append('birthday', formData.birthday);
      customerFormData.append('gender', formData.gender);
      customerFormData.append('job', formData.job);

      console.log(customerFormData);

      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };

      return axios.post(url, customerFormData, config);
    }

    // 바인딩 처리
    const handleClickOpen = (e) => {
      setFormData({
        ...formData,
        open: true,
      });
    }

    const handleClose = (e) => {
      setFormData({
        file: null,
        name: '',
        birthday: '',
        gender: '',
        job: '',
        fileName: '',
        open: false,
      });
    }



{/*isOpen={modalOpen} toggleModal={handleToggleModal}*/}
  return (
    <div>
      <Button variant='contained' color='primary' onClick={handleClickOpen}>
          고객 추가하기
      </Button>
      <StyledDialog open={modalOpen} onClose={handleClose}>
          <DialogTitle>고객 추가</DialogTitle>

      </StyledDialog>
    </div>
  //   <Modal
  //   isOpen={isOpen} // 모달 열기/닫기 상태
  //   onRequestClose={toggleModal} // 모달을 닫을 때 호출되는 함수
  //   contentLabel="Customer Form Modal" // 모달의 레이블
  // >
  //   <h2>고객 정보 입력</h2>
  //           <form onSubmit={handleFormSubmit}>
  //             <label>
  //               프로필 이미지:
  //               <input
  //                 type="file"
  //                 value={formData.fileName}
  //                 // file={formData.file}
  //                 name='file'
  //                 onChange={handleFileChange}
  //               />
  //             </label>
  //             <label>
  //               이름:
  //               <input
  //                 type="text"
  //                 value={formData.name}
  //                 name='name'
  //                 onChange={handleValueChange}
  //               />
  //             </label>
  //             <label>
  //               생년월일:
  //               <input
  //                 type="text"
  //                 name='birthday'
  //                 value={formData.birthday}
  //                 onChange={handleValueChange}
  //               />
  //             </label>
  //             <label>
  //               성별:
  //               <input
  //                 type="text"
  //                 value={formData.gender}
  //                 name='gender'
  //                 onChange={handleValueChange}
  //               />
  //             </label>
  //             <label>
  //               직업:
  //               <input
  //                 type="text"
  //                 value={formData.job}
  //                 name='job'
  //                 onChange={handleValueChange}
  //               />
  //             </label>
  //             <button type="submit">
  //                 추가하기
  //               </button>
  //               <button type="button" onClick={toggleModal}>
  //                 취소
  //               </button>
  //           </form>
      
      
  //   </Modal>
  );
}

export default CustomerFormModal;
