import React from 'react';

const Customer = (customer) => {
  return (
    <div>
    <CustomerProfile id={customer.id} image={customer.image} name={customer.name}/>
    <CustomerInfo birthday ={customer.birthday} gender={customer.gender} job={customer.job} />
    </div>
  );
}

const CustomerProfile = (customer) => {
  return (
    <div>
      <img src={customer.image} alt='profile' />
      <h2>{customer.name}({customer.id})</h2>
    </div>
  )
}

const CustomerInfo = (customer) => {
  return (
    <div>
      <h3>{customer.birthday}</h3>
      <h3>{customer.gender}</h3>
      <h3>{customer.job}</h3>
    </div>
  )
}

export default Customer;
