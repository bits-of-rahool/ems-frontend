import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddEmployee = () => {
  const [employee, setEmployee] = useState({
    name: "",
    email: "",
    mobile: "",
    designation: "HR",
    gender: "",
    course:"MCA",
    imageLocalPath: null, 
  });

  const designation = ["HR", "Sales", "Manager"];
  const course = ["MCA", "BCA", "BSC"];
  const [selectedGender, setSelectedGender] = useState('female'); 

  const handleGenderChange = (event) => {
    setSelectedGender(event.target.value);
  };

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();


    const formData = new FormData();
    formData.append('name', employee.name);
    formData.append('email', employee.email);
    formData.append('mobile', employee.mobile);
    formData.append('course', employee.course);
    formData.append('gender', selectedGender);
    formData.append('imageLocalPath', employee.imageLocalPath);
    formData.append('designation', employee.designation);


    axios.post('http://localhost:5000/api/v1/employee/register', formData)
    .then(result => {
        if(result.data.Status) {
            navigate('/dashboard/employee')
        } else {
            alert(result.data.Error)
        }
    })
    .catch(err => console.log(err))
  }

  const handleImageChange = (e) => {
    console.log(e.target.files[0]);
    setEmployee({ ...employee, imageLocalPath: e.target.files[0] });
  };

  return (
    <div className="d-flex justify-content-center align-items-center mt-3">
      <div className="p-3 rounded w-50 border">
        <h3 className="text-center">Add Employee</h3>
        <form className="row g-1" onSubmit={handleSubmit}>
          <div className="col-12">
            <label htmlFor="inputName" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control rounded-0"
              id="inputName"
              placeholder="Enter Name"
              onChange={(e) =>
                setEmployee({ ...employee, name: e.target.value })
              }
            />
          </div>
          <div className="col-12">
            <label htmlFor="inputEmail4" className="form-label">
              Email
            </label>
            <input
              type="email"
              className="form-control rounded-0"
              id="inputEmail4"
              placeholder="Enter Email"
              autoComplete="off"
              onChange={(e) =>
                setEmployee({ ...employee, email: e.target.value })
              }
            />
          </div>
          <div className="col-12">
            <label htmlFor="inputMobile" className="form-label">
              Mobile
            </label>
            <input
              type="text"
              className="form-control rounded-0"
              id="inputMobile"
              placeholder="Enter Mobile"
              autoComplete="off"
              onChange={(e) =>
                setEmployee({ ...employee, mobile: e.target.value })
              }
            />
          </div>
          <div className="col-12">
            <input
              className="form-check-input"
              type="radio"
              name="gender"
              id="male"
              value="male"
              checked={selectedGender === 'male'}
              onChange={handleGenderChange}
            />
            <label className="form-check-label" htmlFor="male">Male</label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="gender"
              id="female" 
              value="female"
              checked={selectedGender === 'female'}
              onChange={handleGenderChange}
            />
            <label className="form-check-label" htmlFor="female">Female</label>
          </div>
          <div className="col-12">
            <label htmlFor="course" className="form-label">
              Course
            </label>
            <select
              name="course"
              id="course"
              className="form-select"
              onChange={(e) =>
                setEmployee({ ...employee, course: e.target.value })
              }
            >
              {course.map((c, idx) => {
                return <option key={idx}>{c}</option>;
              })}
            </select>
          </div>
          <div className="col-12">
            <label htmlFor="designation" className="form-label">
              Designation
            </label>
            <select
              name="designation"
              id="designation"
              className="form-select"
              onChange={(e) =>{
                console.log(e.target.value);
                setEmployee({ ...employee, designation:e.target.value })}
              }
            >
              {designation.map((d, idx) => {
                return <option key={idx}>{d}</option>;
              })}
            </select>
          </div>
          <div className="col-12 mb-3">
            <label className="form-label" htmlFor="inputGroupFile01">
              Select Image
            </label>
            <input
              type="file"
              className="form-control rounded-0"
              id="inputGroupFile01"
              name="image"
              onChange={handleImageChange}
            />
          </div>
          <div className="col-12">
            <button type="submit" className="btn btn-primary w-100">
              Add Employee
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEmployee;
