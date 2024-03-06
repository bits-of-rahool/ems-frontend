import axios from 'axios'
import React, { useEffect, useState } from 'react'

const Home = () => {

  const [adminName, setAdminName] = useState("Admin")
  const [employees, setEmployees] = useState(0)

  useEffect(() => {
    getAdminName();
    employeeCount();
    // salaryCount();
    // AdminRecords();
  }, [])

  // const AdminRecords = () => {
  //   axios.get('http://localhost:3000/auth/admin_records')
  //   .then(result => {
  //     if(result.data.Status) {
  //       setAdmins(result.data.Result)
  //     } else {
  //        alert(result.data.Error)
  //     }
  //   })
  // }
  const getAdminName = () => {
      const name = document.cookie
      .split('; ')
      .find((row) => row.startsWith('username='))?.split('=')[1];
      setAdminName(name)

  }
  const employeeCount = () => {
    axios.get('http://localhost:5000/api/v1/employee/count')
    .then(result => {
      if(result.data.Status) {
        setEmployees(result.data.Result)
      }
    })
  }
  // const salaryCount = () => {
  //   axios.get('http://localhost:3000/auth/salary_count')
  //   .then(result => {
  //     if(result.data.Status) {
  //       setSalaryTotal(result.data.Result[0].salaryOFEmp)
  //     } else {
  //       alert(result.data.Error)
  //     }
  //   })
  // }
  return (
    <div>
      <div className='p-3 d-flex justify-content-around mt-3'>
        <div className='px-3 pt-2 pb-3 border shadow-sm w-25'>
          <div className='text-center pb-1'>
          <h4>Welcome, {adminName} </h4>
          </div>
          <hr />
          <div className='d-flex flex-column justify-content-between text-center'>
            <h5>Total Employees: {employees} </h5>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home