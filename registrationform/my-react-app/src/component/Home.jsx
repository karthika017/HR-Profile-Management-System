import React, { useEffect, useState } from "react";
import "./Home.css";

function Home() {
  const [employees, setEmployees] = useState([]);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await fetch(
        "https://localhost:7167/api/EmployeeApi/employeehome"
      );

      const data = await response.json();
      setEmployees(data);
    } catch (err) {
      console.error("Fetch Error:", err);
    }
  };

  const handleEdit = (emp) => {
    setEditId(emp.employeeId);
  };

  const handleChange = (index, e) => {
    const updated = [...employees];
    updated[index][e.target.name] = e.target.value;
    setEmployees(updated);
  };

  const handleCancel = () => {
    setEditId(null);
    fetchEmployees();
  };

  const handleUpdate = async (emp) => {
    try {
      const response = await fetch(
        `https://localhost:7167/api/EmployeeApi/employeehome/${emp.employeeId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(emp),
        }
      );

      const msg = await response.text();
      alert(msg);

      setEditId(null);
      fetchEmployees();
    } catch (error) {
      console.error(error);
      alert("Update Failed");
    }
  };

  return (
    <div className="home-container">
      <h2 className="title">Employee Details</h2>

      <div className="table-container">
        <table className="employee-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Full Name</th>
              <th>Father Name</th>
              <th>Mother Name</th>
              <th>DOB</th>
              <th>Gender</th>
              <th>Marital Status</th>
              <th>Email</th>
              <th>Mobile</th>
              <th>Department</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {employees.map((emp, index) => (
              <tr key={emp.employeeId}>
                <td>{emp.employeeId}</td>

                <td>
                  {editId === emp.employeeId ? (
                    <input
                      name="fullName"
                      value={emp.fullName || ""}
                      onChange={(e) => handleChange(index, e)}
                    />
                  ) : (
                    emp.fullName
                  )}
                </td>

                <td>
                  {editId === emp.employeeId ? (
                    <input
                      name="fatherName"
                      value={emp.fatherName || ""}
                      onChange={(e) => handleChange(index, e)}
                    />
                  ) : (
                    emp.fatherName
                  )}
                </td>

                <td>
                  {editId === emp.employeeId ? (
                    <input
                      name="motherName"
                      value={emp.motherName || ""}
                      onChange={(e) => handleChange(index, e)}
                    />
                  ) : (
                    emp.motherName
                  )}
                </td>

                <td>
                  {editId === emp.employeeId ? (
                    <input
                      type="date"
                      name="dateOfBirth"
                      value={emp.dateOfBirth?.substring(0, 10) || ""}
                      onChange={(e) => handleChange(index, e)}
                    />
                  ) : (
                    emp.dateOfBirth?.substring(0, 10)
                  )}
                </td>

                <td>
                  {editId === emp.employeeId ? (
                    <input
                      name="gender"
                      value={emp.gender || ""}
                      onChange={(e) => handleChange(index, e)}
                    />
                  ) : (
                    emp.gender
                  )}
                </td>

                <td>
                  {editId === emp.employeeId ? (
                    <input
                      name="maritalStatus"
                      value={emp.maritalStatus || ""}
                      onChange={(e) => handleChange(index, e)}
                    />
                  ) : (
                    emp.maritalStatus
                  )}
                </td>

                <td>
                  {editId === emp.employeeId ? (
                    <input
                      name="email"
                      value={emp.email || ""}
                      onChange={(e) => handleChange(index, e)}
                    />
                  ) : (
                    emp.email
                  )}
                </td>

                <td>
                  {editId === emp.employeeId ? (
                    <input
                      name="mobileNumber"
                      value={emp.mobileNumber || ""}
                      onChange={(e) => handleChange(index, e)}
                    />
                  ) : (
                    emp.mobileNumber
                  )}
                </td>

                <td>
                  {editId === emp.employeeId ? (
                    <input
                      name="department"
                      value={emp.department || ""}
                      onChange={(e) => handleChange(index, e)}
                    />
                  ) : (
                    emp.department
                  )}
                </td>

                <td>
                  {editId === emp.employeeId ? (
                    <input
                      name="role"
                      value={emp.role || ""}
                      onChange={(e) => handleChange(index, e)}
                    />
                  ) : (
                    emp.role
                  )}
                </td>

                <td>
                  {editId === emp.employeeId ? (
                    <>
                      <button className="save-btn" onClick={() => handleUpdate(emp)}>
                        Save
                      </button>

                      <button className="cancel-btn" onClick={handleCancel}>
                        Cancel
                      </button>
                    </>
                  ) : (
                    <button className="edit-btn" onClick={() => handleEdit(emp)}>
                      Edit
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Home;