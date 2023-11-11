import React from 'react';
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import CustomerDelete from "./CustomerDelete";

const Customer = (customers) => {
  const { id, image, name, birthday, gender, job } = customers; // customers(props) 객체에서 id를 추출

  return (

    <TableRow>

            <TableCell>{id}</TableCell>
            <TableCell><img src={image} alt='profile' width="64" height="64" /></TableCell>
            <TableCell>{name}</TableCell>
            <TableCell>{birthday}</TableCell>
            <TableCell>{gender}</TableCell>
            <TableCell>{job}</TableCell>
            <TableCell><CustomerDelete id={id}/></TableCell>
    </TableRow>
  )
}
export default Customer;
