package com.fullstack.service;

import com.fullstack.Repository.EmployeeRepository;
import com.fullstack.dto.EmployeeDto;
import com.fullstack.dto.EmployeeViewDto;
import com.fullstack.entity.Employee;
import com.fullstack.exception.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class EmployeeServiceImp implements EmployeeService {

    @Autowired
    EmployeeRepository employeeRepository;

    @Override
    public Employee createEmployee(EmployeeDto employeeDto) {
        Employee employee = new Employee();

        if(employeeRepository.existsByEmail(employeeDto.getEmail())){
            return null;
        }

        employee.setFirstname(employeeDto.getFirstname());
        employee.setLastname(employeeDto.getLastname());
        employee.setAge(employeeDto.getAge());
        employee.setEmail(employeeDto.getEmail());

        employeeRepository.save(employee);

        return employee;
    }

    @Override
    public List<EmployeeViewDto> getAllEmployees() {
        List<Employee> employeeList = employeeRepository.findAll();

        List<EmployeeViewDto> employeeViewDtoList = new ArrayList<>();

        for(Employee e : employeeList){

            EmployeeViewDto employeeDto = new EmployeeViewDto();

            employeeDto.setId(e.getId());
            employeeDto.setFirstname(e.getFirstname());
            employeeDto.setLastname(e.getLastname());
            employeeDto.setAge(e.getAge());
            employeeDto.setEmail(e.getEmail());

            employeeViewDtoList.add(employeeDto);
        }

        return employeeViewDtoList;
    }

    @Override
    public EmployeeViewDto findEmployeeById(Long employeeId) {
        Employee employee = employeeRepository.findById(employeeId).orElseThrow(
                ()-> new ResourceNotFoundException("Employee Id is not exist with Id : "+ employeeId));

        EmployeeViewDto employeeDto = new EmployeeViewDto();

        employeeDto.setId(employee.getId());
        employeeDto.setFirstname(employee.getFirstname());
        employeeDto.setLastname(employee.getLastname());
        employeeDto.setAge(employee.getAge());
        employeeDto.setEmail(employee.getEmail());

        return employeeDto;
    }

    @Override
    public EmployeeDto updateEmployee(Long employeeId, EmployeeDto employeeDto) {
        Employee employee = employeeRepository.findById(employeeId).orElseThrow(
                ()-> new ResourceNotFoundException("Employee Id is not exist with Id : "+ employeeId));

        String updateEmail = employeeDto.getEmail();

        if(updateEmail.equals(employee.getEmail())){

            employee.setFirstname(employeeDto.getFirstname());
            employee.setLastname(employeeDto.getLastname());
            employee.setAge(employeeDto.getAge());
            employee.setEmail(employee.getEmail());
        }
        else{
            if(employeeRepository.existsByEmail(updateEmail)){
                return null;
            }

            employee.setFirstname(employeeDto.getFirstname());
            employee.setLastname(employeeDto.getLastname());
            employee.setAge(employeeDto.getAge());
            employee.setEmail(updateEmail);

            employeeRepository.save(employee);

            return employeeDto;

        }

        employeeRepository.save(employee);

        return employeeDto;
    }

    @Override
    public boolean deleteEmployee(Long employeeId) {
        Employee employee = employeeRepository.findById(employeeId).orElseThrow(
                ()-> new ResourceNotFoundException("Employee Id is not exist with Id : "+ employeeId));

        if(employee!=null){
            employeeRepository.delete(employee);
            return true;
        }

        return false;
    }
}
