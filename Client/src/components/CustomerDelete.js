import React, { useState } from 'react';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const CustomerDelete = ({id}) => {

  const [dialogOpen, setDialogOpen] = useState(false);

    // 화살표 함수를 이용한 자동 바인딩 처리
    const handleClickOpen = () => {
      setDialogOpen(true);
    };
  
    const handleClose = () => {
      setDialogOpen(false);
    };

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
    <div>
   <Button variant='contained' color='secondary' onClick={handleClickOpen}>삭제</Button>
   <Dialog open={dialogOpen} onClose={handleClose}>
      <DialogTitle onClose={handleClose}>
        삭제 경고
      </DialogTitle>
      <DialogContent>
        <Typography gutterBottom>
            선택한 고객 정보가 삭제됩니다.
        </Typography>
      </DialogContent>

      <DialogActions>
        <Button variant='contained' color='primary' onClick={deleteCustomer}>삭제</Button>
        <Button variant='outlined' color='primary' onClick={handleClose}>닫기</Button>

      </DialogActions>
   </Dialog>
   </div>
  )
}


export default CustomerDelete;

