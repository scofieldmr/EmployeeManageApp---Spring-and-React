import React, { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useNavigate } from 'react-router-dom';
import { createEmployee, getEmployee, updateEmployeeDetails } from '../services/EmployeeService';
import { useParams } from 'react-router-dom';

const EmployeeComp = () => {

  const [firstname, setFirstname] = useState('');

  const [lastname, setLastname] = useState('');

  const [age, setAge] = useState('');

  const [email, setEmail] = useState('');

  const navigator = useNavigate();

  const { id } = useParams();

  //Validation of the page
  const [errors,setErrors] = useState({
    firstname: '',
    lastname: '',
    age:'',
    email:''
  }) 

  function validateForm(){
    let valid = true;
    const errorCopy = {...errors};

    if(firstname.trim()){
      errorCopy.firstname = ''
    }
    else{
      errorCopy.firstname = 'First Name Required!'
      valid=false;
    }

    if(lastname.trim()){
      errorCopy.lastname = ''
    }
    else{
      errorCopy.lastname = 'Last Name Required!'
      valid=false;
    }

    if(String(age).trim()){
      errorCopy.age=''
    }
    else{
      errorCopy.age='Age Required!'
    }

    if(email.trim()){
      errorCopy.email=''
    }
    else{
      errorCopy.email = 'Email Required!'
    }

    setErrors(errorCopy);
    return valid;
  }

  //To Save the New Employee Details
  function saveEmployee(e) {
    e.preventDefault();

    const emp = { firstname, lastname, age, email };

    console.log(emp);

    if(validateForm()){

      createEmployee(emp)
       .then((response) => {
        console.log(response.data);
        navigator('/');
      })
      .catch((error) => {
        console.error(error);
      })
    }
  }

  //To change the Page Title
  function addOrUpdateTitle() {
    if (id) {
      return <h2 className='text-center' style={{ margin: '5px', color: 'Red' }}>Update Employee Form</h2>
    }
    else {
      return <h2 className='text-center' style={{ margin: '5px', color: 'Red' }}>Add Employee Form</h2>
    }
  }

  function changeButtonTitle(){
    if (id){
      return <button className='btn btn-success' style={{ marginTop: '10px' }} onClick={updateEmployee}>Update</button>
    }
    else{
      return <button className='btn btn-success' style={{ marginTop: '10px' }} onClick={saveEmployee}>Submit</button>
    }
  }

  //To get the details of the Employee in the form while selecting the Edit Button

  useEffect(() => {
    if (id) {
      getEmployee(id).then((response) => {
        setFirstname(response.data.firstname)
        setLastname(response.data.lastname)
        setAge(response.data.age)
        setEmail(response.data.email)
      })
        .catch((error) => {
          console.error(error);
        })
      }
    }, []);

    function updateEmployee(e){
       e.preventDefault();

       const upemp = {firstname,lastname,age,email};

       updateEmployeeDetails(id,upemp).then((response) => {
         console.log(response.data);
         navigator("/");
       })
       .catch((error) => {
        console.error(error);
       })
    }

  return (
    <div>
      <div className='container' style={{ marginTop: '10px' }}>
        <div className='row'>
          <div className='card col-md-6 offset-md-3 offset-md-3'>
            {
              addOrUpdateTitle()
            }
            <hr />
            <div className='card-body'>
              <form>
                <div className='form-group mb-6'>
                  <label>First Name : </label>
                  <input
                    type='text'
                    placeholder='Enter your first name'
                    name='firstname'
                    value={firstname}
                    className = {`form-control ${errors.firstname?'is-invalid':''}`}
                    onChange={(e) => setFirstname(e.target.value)}
                  ></input>
                  {errors.firstname && <div className='invalid-feedback'>{errors.firstname}</div>}
                </div>

                <div className='form-group mb-6'>
                  <label>Last Name : </label>
                  <input
                    type='text'
                    placeholder='Enter your last name'
                    name='lastname'
                    value={lastname}
                    className={`form-control ${errors.lastname ? 'is-invalid':''}`}
                    onChange={(e) => setLastname(e.target.value)}
                  ></input>

                  {errors.lastname && <div className='invalid-feedback'>{errors.lastname}</div>}
                </div>

                <div className='form-group mb-6'>
                  <label>Age : </label>
                  <input
                    type='number'
                    placeholder='Enter your age'
                    name='age'
                    value={age}
                    className={`form-control ${errors.age ? 'is-invalid' : ''}`}
                    onChange={(e) => setAge(e.target.value)}
                  ></input>

                  {errors.age && <div className='invalid-feedback'>{errors.age}</div>}
                </div>

                <div className='form-group mb-6'>
                  <label>Email : </label>
                  <input
                    type='text'
                    placeholder='Enter your email'
                    name='email'
                    value={email}
                    className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                    onChange={(e) => setEmail(e.target.value)}
                  ></input>

                  {errors.email && <div className='invalid-feedback'>{errors.email}</div>}
                </div>

                <div>
                 {
                  changeButtonTitle()
                 }
                </div>

              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EmployeeComp