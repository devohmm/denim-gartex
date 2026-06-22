import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import './EmployeeDetail.css';

const API_BASE_URL = 'http://localhost:4004/api';

export default function EmployeeDetail({ id, onBack }) {
  const { getAuthHeaders } = useAuth();
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (id) {
      fetchEmployee();
    }
  }, [id]);

  const fetchEmployee = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/employees/${id}`, {
        headers: getAuthHeaders(),
      });

      if (response.ok) {
        const data = await response.json();
        setEmployee(data);
      } else {
        setError('Employee not found');
      }
    } catch (error) {
      setError('Failed to load employee details');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="detail-container">
        <div className="detail-loading">Loading...</div>
      </div>
    );
  }

  if (error || !employee) {
    return (
      <div className="detail-container">
        <div className="detail-error">{error || 'Employee not found'}</div>
        <button onClick={onBack} className="back-button">
          Back to Employees
        </button>
      </div>
    );
  }

  return (
    <div className="detail-container">
      <div className="detail-header">
        <button onClick={onBack} className="back-button">
          ← Back to Employees
        </button>
        <h1>Employee Details</h1>
      </div>

      <div className="detail-card">
        <div className="detail-section">
          <h2>Personal Information</h2>
          <div className="detail-grid">
            <div className="detail-item">
              <label>Employee ID</label>
              <p>{employee.employeeId}</p>
            </div>
            <div className="detail-item">
              <label>Full Name</label>
              <p>{employee.firstName} {employee.lastName}</p>
            </div>
            <div className="detail-item">
              <label>Email</label>
              <p>{employee.email}</p>
            </div>
            <div className="detail-item">
              <label>Phone</label>
              <p>{employee.phone}</p>
            </div>
          </div>
        </div>

        <div className="detail-section">
          <h2>Employment Information</h2>
          <div className="detail-grid">
            <div className="detail-item">
              <label>Department</label>
              <p>{employee.department}</p>
            </div>
            <div className="detail-item">
              <label>Position</label>
              <p>{employee.position}</p>
            </div>
            <div className="detail-item">
              <label>Join Date</label>
              <p>{new Date(employee.joinDate).toLocaleDateString()}</p>
            </div>
            <div className="detail-item">
              <label>Status</label>
              <p className={`status-badge status-${employee.status}`}>
                {employee.status}
              </p>
            </div>
          </div>
        </div>

        <div className="detail-section">
          <h2>Salary Information</h2>
          <div className="detail-grid">
            <div className="detail-item">
              <label>Salary</label>
              <p>₹{employee.salary.toLocaleString()}</p>
            </div>
            <div className="detail-item">
              <label>Salary Type</label>
              <p>{employee.salaryType}</p>
            </div>
          </div>
        </div>

        {employee.address && (
          <div className="detail-section">
            <h2>Address</h2>
            <div className="detail-grid">
              <div className="detail-item">
                <label>Street</label>
                <p>{employee.address.street || 'N/A'}</p>
              </div>
              <div className="detail-item">
                <label>City</label>
                <p>{employee.address.city || 'N/A'}</p>
              </div>
              <div className="detail-item">
                <label>State</label>
                <p>{employee.address.state || 'N/A'}</p>
              </div>
              <div className="detail-item">
                <label>Zip Code</label>
                <p>{employee.address.zipCode || 'N/A'}</p>
              </div>
            </div>
          </div>
        )}

        {employee.bankDetails && (
          <div className="detail-section">
            <h2>Bank Details</h2>
            <div className="detail-grid">
              <div className="detail-item">
                <label>Account Number</label>
                <p>{employee.bankDetails.accountNumber || 'N/A'}</p>
              </div>
              <div className="detail-item">
                <label>Bank Name</label>
                <p>{employee.bankDetails.bankName || 'N/A'}</p>
              </div>
              <div className="detail-item">
                <label>IFSC Code</label>
                <p>{employee.bankDetails.ifscCode || 'N/A'}</p>
              </div>
              <div className="detail-item">
                <label>Branch</label>
                <p>{employee.bankDetails.branch || 'N/A'}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

