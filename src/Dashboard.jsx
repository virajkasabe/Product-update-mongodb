import './style.css';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useForm } from 'react-hook-form';
import { Toaster, toast } from 'react-hot-toast';
import Loader from './Loader';
import axios from 'axios';

export default function Dashboard() {
  const [isLoading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm();

  const fetchProducts = async () => {
    try {
      const res = await axios.get('https://mangodb-firstproject-c6cg.vercel.app/product/get');
      if (res.data.status) {
        setProducts(res.data.data);
      }
    } catch (err) {
      toast.error('Failed to fetch products');
    }
  };

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      let response;
      if (editMode) {
        response = await axios.put(`https://mangodb-firstproject-c6cg.vercel.app/product/update/${editId}`, data);
      } else {
        response = await axios.post('https://mangodb-firstproject-c6cg.vercel.app/product/add', data);
      }

      if (response.data.success) {
        toast.success(editMode ? 'Product updated!' : 'Product added!');
        fetchProducts();
        reset();
        setEditMode(false);
        setEditId(null);
      } else {
        toast.error(response.data.message || 'Operation failed');
      }
    } catch (err) {
      toast.error('Something went wrong!');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (product) => {
    setEditMode(true);
    setEditId(product._id);
    setValue('productName', product.productName);
    setValue('productDescription', product.productDescription);
    setValue('productUnit', product.productUnit);
    setValue('productPrice', product.productPrice);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;
    try {
      const res = await axios.delete(`https://mangodb-firstproject-c6cg.vercel.app/product/delete/${id}`);
      if (res.data.success) {
        toast.success('Product deleted');
        fetchProducts();
      } else {
        toast.error(res.data.message || 'Delete failed');
      }
    } catch (err) {
      toast.error('Failed to delete product');
    }
  };

  const handleLogout = () => {
    Cookies.remove('app-user');
    navigate('/');
  };

  useEffect(() => {
    if (!Cookies.get('app-user')) {
      navigate('/');
    }
    fetchProducts();
  }, []);

  return (
    <>
      <div className="header">
        <h1>{editMode ? 'Update Product' : 'Add Product'}</h1>
        <button onClick={handleLogout}>Logout</button>
      </div>

      {isLoading && <Loader />}

      <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{
          duration: 5000,
          style: {
            background: '#363636',
            color: '#fff',
          },
        }}
      />

      <div className="login-container">
        <form onSubmit={handleSubmit(onSubmit)}>
          <h2>{editMode ? 'Edit Product' : 'Add Product'}</h2>

          <div className="input-field">
            <label>Product Name</label>
            <input
              type="text"
              {...register('productName', {
                required: 'Product name is required',
                minLength: {
                  value: 3,
                  message: 'Product name must be at least 3 characters',
                },
              })}
            />
            {errors.productName && <p className="error">{errors.productName.message}</p>}
          </div>

          <div className="input-field">
            <label>Description</label>
            <textarea
              {...register('productDescription', {
                required: 'Description is required',
                minLength: {
                  value: 10,
                  message: 'Description must be at least 10 characters',
                },
              })}
            />
            {errors.productDescription && <p className="error">{errors.productDescription.message}</p>}
          </div>

          <div className="input-field">
            <label>Unit</label>
            <select {...register('productUnit', { required: 'Unit is required' })}>
              <option value="">Select unit</option>
              <option value="piece">Piece</option>
              <option value="kg">Kilogram</option>
              <option value="liter">Liter</option>
              <option value="box">Box</option>
            </select>
            {errors.productUnit && <p className="error">{errors.productUnit.message}</p>}
          </div>

          <div className="input-field">
            <label>Price</label>
            <input
              type="number"
              step="0.01"
              min="0"
              {...register('productPrice', {
                required: 'Price is required',
                min: { value: 0.01, message: 'Price must be greater than 0' },
              })}
            />
            {errors.productPrice && <p className="error">{errors.productPrice.message}</p>}
          </div>

          <button type="submit">{editMode ? 'Update Product' : 'Add Product'}</button>
        </form>

        <div className="dashboard-box">
          <div className="product-table">
            <h3>Product List</h3>
            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Price (Rs.)</th>
                    <th>Unit</th>
                    <th>Description</th>
                    <th colSpan="2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.length === 0 ? (
                    <tr>
                      <td colSpan="6">No products available</td>
                    </tr>
                  ) : (
                    products.map((ele, index) => (
                      <tr key={ele._id}>
                        <td>{ele.productName}</td>
                        <td>{ele.productPrice}</td>
                        <td>{ele.productUnit}</td>
                        <td>{ele.productDescription}</td>
                        <td>
                          <i
                            title="Edit"
                            onClick={() => handleEdit(ele)}
                            className="fa-solid fa-user-pen"
                            style={{ cursor: 'pointer' }}
                          ></i>
                        </td>
                        <td>
                          <i
                            title="Delete"
                            onClick={() => handleDelete(ele._id)}
                            className="fa-solid fa-trash"
                            style={{ cursor: 'pointer', color: 'red' }}
                          ></i>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
