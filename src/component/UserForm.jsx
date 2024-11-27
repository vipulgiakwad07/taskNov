import React, { useState } from "react";

const UserForm = ({ user, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    firstName: user.name.split(" ")[0],
    lastName: user.name.split(" ")[1] || "",
    email: user.email,
    department: user.company?.name || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      id: user.id,
      name: `${formData.firstName} ${formData.lastName}`,
      email: formData.email,
      company: { name: formData.department },
    });
  };

  return (
    <div style={{ marginTop: "20px", padding: "20px", border: "1px solid #ddd" }}>
      <h3>{user.id ? "Edit User" : "Add User"}</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label>First Name:</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Last Name:</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Department:</label>
          <input
            type="text"
            name="department"
            value={formData.department}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <button type="submit">Save</button>
          <button type="button" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserForm;
