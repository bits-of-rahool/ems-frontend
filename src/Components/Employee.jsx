import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Employee = () => {
  const [employee, setEmployee] = useState([]);
  const [query, setQuery] = useState("");
  const navigate = useNavigate()

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/v1/employee/employeeList?filter={"name":"${query}"}`)
      .then((result) => {
        // console.log(result.data);
        if (result.data.Status) {
          setEmployee(result.data.Result);
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  }, [query]);


  const  handleSubmit=(e)=>{
    e.preventDefault();
    console.log(query);
  }

  const  handleChange=(e)=>{ 
    setQuery(e.target.value)
      // console.log(e.target.value) 
  }
  const handleDelete = (id) => {
    console.log(id);
    axios.delete('http://localhost:5000/api/v1/employee/delete/'+id)
    .then(result => {
        if(result.data.Status) {
            window.location.reload()
        } else {
            alert(result.data.Error)
        }
    })
  }

  return (
    <div className="px-5 mt-3">
      <div className="d-flex justify-content-center">
        <h3>Employee List</h3>
      </div>
      <div className="d-flex justify-content-between">
      <Link to="/dashboard/add_employee" className="btn btn-success">
        Add Employee
      </Link>
      <form className="d-flex" role="search" onSubmit={handleSubmit}>
        <input className="form-control me-2" type="search"
          onChange={handleChange}
          placeholder="Search" aria-label="Search"/>
        <button className="btn btn-outline-success" type="submit">Search</button>
      </form> 
      </div>
      <div className="mt-3">
        <table className="table">
          <thead>
            <tr>
              <th>Unique Id</th>
              <th>Image</th>
              <th>Name</th>
              <th>Email</th>
              <th>Mobile</th>
              <th>Designation</th>
              <th>Course</th>
              <th>Gender</th>
            </tr>
          </thead>
          <tbody>
          
            {employee.map((e,idx) => {return(
                <tr key={idx}>
                <td>{idx+1}</td>
                <td>
                  <img
                    src={`http://localhost:5000/temp/${e.image}`}
                    className="employee_image"
                  />
                </td>
                <td>{e.name}</td>
                <td>{e.email}</td>
                <td>{e.mobile}</td>
                <td>{e.designation}</td>
                <td>{e.course}</td>
                <td>{e.gender}</td>
                <td>
                  <Link
                    to={`/dashboard/edit_employee/` + e._id}
                    className="btn btn-info btn-sm me-2"
                  >
                    Edit
                  </Link>
                  <button
                    className="btn btn-warning btn-sm"
                    onClick={() => handleDelete(e._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            )})}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Employee;
