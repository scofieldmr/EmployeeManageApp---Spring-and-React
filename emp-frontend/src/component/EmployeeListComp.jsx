import React, { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { deleteEmployee, listEmployee } from '../services/EmployeeService';
import { useNavigate } from 'react-router-dom';

const EmployeeListComp = () => {

    const [employees,setEmployees] = useState([]);

    const navigator = useNavigate();

    function getAllEmployees(){
        listEmployee()
         .then((response) => {
            setEmployees(response.data);
         })
         .catch((error)=> {
            console.error(error)
        });
    }

    useEffect(() => {
        getAllEmployees()
    },[]);

    function addEmployee(){
        navigator('/add-employee')
    }

    //To Edit the Employee Details . We are re-directing to the Employee Comp and editing the details
    function editEmployee(id){
        navigator(`/update-employee/${id}`)
    }

    //To delete the Employee Details : 
    function removeEmployee(id){
        console.log(id);
        deleteEmployee(id).then(() => {
            getAllEmployees();
        })
        .catch((error) => {
            console.error(error);
        })
    }

    // useEffect(() => {
    //     setEmployees([
    //         {
    //          id : 1,
    //          firstname : 'Jon',
    //          lastname : 'Snow',
    //          age : 24,
    //          email : 'jon@gmail.com'
    //        },
    //     {
    //         id : 2,
    //         firstname : 'Jon',
    //         lastname : 'Wick',
    //         age : 24,
    //         email : 'jon@gmail.com'
    //     }
    //  ]);
    // },[]);

    return (
        <div>
            <div className='container'>
                <h2 className='text-center' style={{marginTop : '15px',color : 'Red'}}>Employee List</h2>
                <button className='btn btn-primary' style={{marginTop : '20px'}} onClick={addEmployee}>Add New Employee</button>
                <table className='table table-bordered' style={{marginTop : '20px'}}>
                    <thead style={{textAlign : 'center'}}>
                        <tr>
                            <th>Employee Id</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Age</th>
                            <th>Email</th>
                            <th>Action</th>
                        </tr>
                    </thead>

                    <tbody style={{textAlign : 'center'}}>
                        {
                          employees.map(employee =>
                            <tr key={employee.id}>
                                <td>{employee.id}</td>
                                <td>{employee.firstname}</td>
                                <td>{employee.lastname}</td>
                                <td>{employee.age}</td>
                                <td>{employee.email}</td>
                                <td>
                                    <button className='btn btn-info' onClick={()=>editEmployee(employee.id)}>Edit</button>
                                    <button className='btn btn-danger' onClick= {() => removeEmployee(employee.id)} style={{marginLeft : '20px'}}>Delete</button>
                                </td>
                            </tr>
                          )
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default EmployeeListComp