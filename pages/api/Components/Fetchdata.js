import React, { useEffect, useState } from "react";
import axios from "axios";

const Data = () => {
  const [users, setUsers] = useState([]);
  const [editedUser, setEditedUser] = useState(null);
  const [newUser, setNewUser] = useState({
    first_name: "",
    last_name: "",
    age: 0,
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/users");
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };

  const handleDelete = async (userId) => {
    try {
      await axios.delete(`http://localhost:5000/users/${userId}`);
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
    } catch (error) {
      console.error("Error deleting user", error);
    }
  };

  const handleEdit = (user) => {
    setEditedUser(user);
  };

  const handleUpdate = async () => {
    try {

      await axios.put(
        `http://localhost:5000/users/${editedUser.id}`,
        editedUser
      );

      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === editedUser.id ? editedUser : user
        )
      );

      setEditedUser(null);
    } catch (error) {
      console.error("Error updating user", error);
    }
  };

  const handleCreate = async () => {
    try {
      const response = await axios.post("http://localhost:5000/users", newUser);
      setUsers((prevUsers) => [...prevUsers, response.data]);
      setNewUser({
        first_name: "",
        last_name: "",
        age: 0,
      });
    } catch (error) {
      console.error("Error creating user", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-4">User Data</h1>
      <div className="mb-4">
        <h2 className="text-xl font-semibold mb-2">Create User</h2>
        <input
          type="text"
          placeholder="First Name"
          value={newUser.first_name}
          onChange={(e) =>
            setNewUser({
              ...newUser,
              first_name: e.target.value,
            })
          }
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          placeholder="Last Name"
          value={newUser.last_name}
          onChange={(e) =>
            setNewUser({
              ...newUser,
              last_name: e.target.value,
            })
          }
          className="w-full p-2 border rounded mt-2"
        />
        <input
          type="number"
          placeholder="Age"
          value={newUser.age}
          onChange={(e) =>
            setNewUser({
              ...newUser,
              age: parseInt(e.target.value),
            })
          }
          className="w-full p-2 border rounded mt-2"
        />
        <button onClick={handleCreate} className="bg-blue-500 text-white px-4 py-0 rounded mt-2">
          Create
        </button>
      </div>
      {users.length > 0 ? (
        <table className="w-full border-collapse border">
          <thead>
            <tr>
              <th className="border p-2">ID</th>
              <th className="border p-2">First Name</th>
              <th className="border p-2">Last Name</th>
              <th className="border p-2">Age</th>
              <th className="border p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td className="border p-2">{user.id}</td>
                <td className="border p-2">
                  {editedUser && editedUser.id === user.id ? (
                    <input
                      type="text"
                      value={editedUser.first_name}
                      onChange={(e) =>
                        setEditedUser({
                          ...editedUser,
                          first_name: e.target.value,
                        })
                      }
                      className="w-full p-1 border rounded"
                    />
                  ) : (
                    user.first_name
                  )}
                </td>
                <td className="border p-2">
                  {editedUser && editedUser.id === user.id ? (
                    <input
                      type="text"
                      value={editedUser.last_name}
                      onChange={(e) =>
                        setEditedUser({
                          ...editedUser,
                          last_name: e.target.value,
                        })
                      }
                      className="w-full p-1 border rounded"
                    />
                  ) : (
                    user.last_name
                  )}
                </td>
                <td className="border p-2">
                  {editedUser && editedUser.id === user.id ? (
                    <input
                      type="number"
                      value={editedUser.age}
                      onChange={(e) =>
                        setEditedUser({
                          ...editedUser,
                          age: parseInt(e.target.value),
                        })
                      }
                      className="w-full p-1 border rounded"
                    />
                  ) : (
                    user.age
                  )}
                </td>
                <td className="border p-2">
                  {editedUser && editedUser.id === user.id ? (
                    <button onClick={handleUpdate} className="bg-green-500 text-white px-2 py-1 rounded">
                      Update
                    </button>
                  ) : (
                    <>
                      <button onClick={() => handleEdit(user)} className="bg-yellow-500 text-white px-2 py-1 rounded mr-2">
                        Edit
                      </button>
                      <button onClick={() => handleDelete(user.id)} className="bg-red-500 text-white px-2 py-1 rounded">
                        Delete
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Loading data...</p>
      )}
    </div>
  );
};

export default Data;
