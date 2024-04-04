// import React, { useState } from "react";

// const UpdateEmployee = ({ employeeId }) => {
//   const [formData, setFormData] = useState({
//     title: "",
//     department: "",
//     currentStatus: true,
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await fetch(
//         `http://localhost:4000/updateEmployee/${employeeId}`,
//         {
//           method: "PUT",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify(formData),
//         }
//       );
//       if (response.ok) {
//         // Handle success
//         console.log("Employee updated successfully");
//       } else {
//         console.error("Failed to update employee");
//       }
//     } catch (error) {
//       console.error("Error updating employee:", error);
//     }
//   };

//   return (
//     <div>
//       <h2>Update Employee</h2>
//       <form onSubmit={handleSubmit}>
//         <div className="form-group">
//           <label htmlFor="title">Title:</label>
//           <select
//             id="title"
//             name="title"
//             value={formData.title}
//             onChange={handleChange}
//             required
//           >
//             <option value="">Select Title</option>
//             <option value="Employee">Employee</option>
//             <option value="Manager">Manager</option>
//             <option value="Director">Director</option>
//             <option value="VP">VP</option>
//           </select>
//         </div>
//         <div className="form-group">
//           <label htmlFor="department">Department:</label>
//           <select
//             id="department"
//             name="department"
//             value={formData.department}
//             onChange={handleChange}
//             required
//           >
//             <option value="">Select Department</option>
//             <option value="IT">IT</option>
//             <option value="Marketing">Marketing</option>
//             <option value="HR">HR</option>
//             <option value="Engineering">Engineering</option>
//           </select>
//         </div>
//         <div className="form-group">
//           <label htmlFor="currentStatus">Current Status:</label>
//           <select
//             id="currentStatus"
//             name="currentStatus"
//             value={formData.currentStatus}
//             onChange={handleChange}
//             required
//           >
//             <option value={true}>Active</option>
//             <option value={false}>Inactive</option>
//           </select>
//         </div>
//         <button type="submit">Save</button>
//       </form>
//     </div>
//   );
// };

// export default UpdateEmployee;

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const UpdateEmployee = () => {
  const { id } = useParams(); // Extracting employeeId from URL
  const [formData, setFormData] = useState({
    title: "",
    department: "",
    currentStatus: true,
  });

  useEffect(() => {
    // Fetching employee data based on employeeId (id)
    const fetchEmployeeData = async () => {
      try {
        const response = await fetch(`http://localhost:4000/employee/${id}`);
        if (response.ok) {
          const employeeData = await response.json();
          setFormData({
            title: employeeData.title,
            department: employeeData.department,
            currentStatus: employeeData.currentStatus,
          });
        } else {
          console.error("Failed to fetch employee data");
        }
      } catch (error) {
        console.error("Error fetching employee data:", error);
      }
    };

    fetchEmployeeData(); // Fetching employee data when component mounts
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:4000/updateEmployee/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      if (response.ok) {
        console.log("Employee updated successfully");
      } else {
        console.error("Failed to update employee");
      }
    } catch (error) {
      console.error("Error updating employee:", error);
    }
  };

  return (
    <div>
      <h2>Update Employee</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title:</label>
          <select
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          >
            <option value="">Select Title</option>
            <option value="Employee">Employee</option>
            <option value="Manager">Manager</option>
            <option value="Director">Director</option>
            <option value="VP">VP</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="department">Department:</label>
          <select
            id="department"
            name="department"
            value={formData.department}
            onChange={handleChange}
            required
          >
            <option value="">Select Department</option>
            <option value="IT">IT</option>
            <option value="Marketing">Marketing</option>
            <option value="HR">HR</option>
            <option value="Engineering">Engineering</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="currentStatus">Current Status:</label>
          <select
            id="currentStatus"
            name="currentStatus"
            value={formData.currentStatus}
            onChange={handleChange}
            required
          >
            <option value={true}>Active</option>
            <option value={false}>Inactive</option>
          </select>
        </div>
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default UpdateEmployee;
