import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

function AdminPage() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

    // Pagination state for users
    const [currentUserPage, setCurrentUserPage] = useState(0);
    const [totalUserPages, setTotalUserPages] = useState(0);

    // Pagination state for categories
    const [currentCategoryPage, setCurrentCategoryPage] = useState(0);
    const [totalCategoryPages, setTotalCategoryPages] = useState(0);

  // Get token from localStorage
  const token = localStorage.getItem('token');

 // Fetch Users with pagination
   const fetchUsers = async (page = 0) => {
     setLoading(true);
     try {
       const response = await axios.get(`/api/admin/users?page=${page}`, {
         headers: { Authorization: `Bearer ${token}` },
       });
       setUsers(response.data.content);
       setTotalUserPages(response.data.totalPages);
     } catch (err) {
       console.error(err.response ? err.response.data : err.message);
       setError("Error fetching users.");
     } finally {
       setLoading(false);
     }
   };


  // Fetch Categories with pagination
  const fetchCategories = async (page = 0) => {
    setLoading(true);
    try {
      const response = await axios.get(`/api/admin/categories?page=${page}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCategories(response.data.content);
      setTotalCategoryPages(response.data.totalPages);
    } catch (err) {
      console.error(err.response ? err.response.data : err.message);
      setError("Error fetching categories.");
    } finally {
      setLoading(false);
    }
  };

   // Change User Page
    const changeUserPage = (newPage) => {
      if (newPage < 0 || newPage >= totalUserPages) return;
      setCurrentUserPage(newPage);
      fetchUsers(newPage);
    };

    // Change Category Page
    const changeCategoryPage = (newPage) => {
      if (newPage < 0 || newPage >= totalCategoryPages) return;
      setCurrentCategoryPage(newPage);
      fetchCategories(newPage);
    };

  // Handle Role Change
  const changeUserRole = async (userId, newRole) => {
    try {
      await axios.put(`/api/users/${userId}/role`, newRole , {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchUsers();
    } catch (err) {
      console.error(err.response ? err.response.data : err.message);
      setError("Error changing user role.");
    }
  };

  // Handle User Deletion
  const deleteUser = async (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await axios.delete(`/api/users/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        fetchUsers();
      } catch (err) {
        console.error(err.response ? err.response.data : err.message);
        setError("Error deleting user.");
      }
    }
  };

  // Handle Adding a Category
  const addCategory = async () => {
    if (newCategory) {
      try {
        await axios.post("/api/admin/categories",  newCategory , {
          headers: {
           Authorization: `Bearer ${token}`,
           "Content-Type": "text/plain",
},
        });
        setNewCategory("");
        fetchCategories();
      } catch (err) {
        console.error(err.response ? err.response.data : err.message); // Log the error for debugging
        setError("Error adding category.");
      }
    }
  };

  const deleteCategory = async (categoryId) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      try {
        await axios.delete(`/api/admin/categories/${categoryId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        fetchCategories();
      } catch (err) {
        console.error(err.response ? err.response.data : err.message);
        setError("Error deleting category.");
      }
    }
  };

 useEffect(() => {
     fetchUsers(currentUserPage);
     fetchCategories(currentCategoryPage);
   }, [currentUserPage, currentCategoryPage]);

   if (error) {
     return <div>Error: {error}</div>;
   }
 return (
     <div className="admin-page">
       <h1>Admin Page</h1>

       {/* User Management Section */}
       <section>
         <h2>User Management</h2>
         {loading && <p>Loading...</p>}
         <table>
           <thead>
             <tr>
               <th>ID</th>
               <th>Email</th>
               <th>Role</th>
               <th>Actions</th>
             </tr>
           </thead>
           <tbody>
             {users.map((user) => (
               <tr key={user.id}>
                 <td>{user.id}</td>
                 <td>{user.email}</td>
                 <td>
                   <select
                     value={user.appUserRole}
                     onChange={(e) => changeUserRole(user.id, e.target.value)}
                   >
                     <option value="USER">USER</option>
                     <option value="ADMIN">ADMIN</option>
                   </select>
                 </td>
                 <td>
                   <button onClick={() => deleteUser(user.id)}>Delete</button>
                 </td>
               </tr>
             ))}
           </tbody>
         </table>

         {/* Pagination Controls for Users */}
         <div className="pagination">
           <button onClick={() => changeUserPage(currentUserPage - 1)} disabled={currentUserPage === 0}>
             Previous
           </button>
           <span>Page {currentUserPage + 1} of {totalUserPages}</span>
           <button onClick={() => changeUserPage(currentUserPage + 1)} disabled={currentUserPage >= totalUserPages - 1}>
             Next
           </button>
         </div>
       </section>

       {/* Product Category Management Section */}
       <section>
         <h2>Product Category Management</h2>
         <div>
           <input
             type="text"
             placeholder="New Category"
             value={newCategory}
             onChange={(e) => setNewCategory(e.target.value)}
           />
           <button onClick={addCategory}>Add Category</button>
         </div>
         <ul>
           {categories.map((category) => (
             <li key={category.id}>
               {category.category}
               <button onClick={() => deleteCategory(category.id)}>Delete</button>
             </li>
           ))}
         </ul>

         {/* Pagination Controls for Categories */}
         <div className="pagination">
           <button onClick={() => changeCategoryPage(currentCategoryPage - 1)} disabled={currentCategoryPage === 0}>
             Previous
           </button>
           <span>Page {currentCategoryPage + 1} of {totalCategoryPages}</span>
           <button onClick={() => changeCategoryPage(currentCategoryPage + 1)} disabled={currentCategoryPage >= totalCategoryPages - 1}>
             Next
           </button>
         </div>
       </section>
     </div>
   );
 }
export default AdminPage;
