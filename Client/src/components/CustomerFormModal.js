import React, { useState } from 'react';

function CustomerFormModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    id: '',
    image: '',
    name: '',
    birthday: '',
    gender: '',
    job: '',
  });

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // 여기에서 서버로 데이터를 전송하거나 상태(state)를 업데이트
    console.log('고객 정보를 제출', formData);
    // 모달을 종료
    toggleModal();
  };

  return (
    <div>
      <button onClick={toggleModal}>고객 추가</button>
      {isOpen && (
        <div className="modal">
          <div className="modal-content">
            <form onSubmit={handleSubmit}>
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
              <button type="submit">저장</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default CustomerFormModal;
