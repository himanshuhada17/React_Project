import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Data = () => {
  const [address, setAddress] = useState([]);
  const [editedAddress, setEditedAddress] = useState({
    id: '',
    address: '',
    user_id: '',
  });

  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/address');
      setAddress(response.data);
    } catch (error) {
      console.error('Error fetching data', error);
    }
  };

  const handleDelete = async (addressId) => {
    try {
      await axios.delete(`http://localhost:5000/address/${addressId}`);
      setAddress((prevAddress) => prevAddress.filter((addr) => addr.id !== addressId));
    } catch (error) {
      console.error('Error deleting address', error);
    }
  };

  const handleEdit = (addr) => {
    setIsEditing(true);
    setEditedAddress(addr);
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`http://localhost:5000/address/${editedAddress.id}`, editedAddress);
      setAddress((prevAddress) =>
        prevAddress.map((addr) =>
          addr.id === editedAddress.id ? editedAddress : addr
        )
      );
      setEditedAddress({
        id: '',
        address: '',
        user_id: '',
      });
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating address', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-4">Address</h1>
      {address.length > 0 ? (
        <table className="w-full border-collapse border">
          <thead>
            <tr>
              <th className="border p-2">ID</th>
              <th className="border p-2">Address</th>
              <th className="border p-2">User ID</th>
              <th className="border p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {address.map((addr) => (
              <tr key={addr.id}>
                <td className="border p-2">{addr.id}</td>
                <td className="border p-2">
                  {isEditing && editedAddress.id === addr.id ? (
                    <input
                      type="text"
                      value={editedAddress.address}
                      onChange={(e) =>
                        setEditedAddress({
                          ...editedAddress,
                          address: e.target.value,
                        })
                      }
                      className="w-full p-1 border rounded"
                    />
                  ) : (
                    addr.address
                  )}
                </td>
                <td className="border p-2">{addr.user_id}</td>
                <td className="border p-2">
                  {isEditing && editedAddress.id === addr.id ? (
                    <button onClick={handleUpdate} className="bg-green-500 text-white px-2 py-1 rounded">
                      Update
                    </button>
                  ) : (
                    <>
                      <button onClick={() => handleEdit(addr)} className="bg-yellow-500 text-white px-2 py-1 rounded mr-2">
                        Edit
                      </button>
                      <button onClick={() => handleDelete(addr.id)} className="bg-red-500 text-white px-2 py-1 rounded">
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
