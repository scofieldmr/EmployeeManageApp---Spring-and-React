import axios from "axios";

export const listEmployee = () => axios.get('http://localhost:5000/api/v1/employees/getAll');

export const createEmployee = (employee) => axios.post('http://localhost:5000/api/v1/employees/create',employee);

export const getEmployee = (employeeId) => axios.get(`http://localhost:5000/api/v1/employees/get/${employeeId}`);

export const deleteEmployee = (employeeId) => axios.post(`http://localhost:5000/api/v1/employees/deleteEmployee/${employeeId}`);

export const updateEmployeeDetails = (employeeId,employee) => axios.post(`http://localhost:5000/api/v1/employees/updateEmployee/${employeeId}`,employee);