package com.fullstack.service;

import com.fullstack.dto.EmployeeDto;
import com.fullstack.dto.EmployeeViewDto;
import com.fullstack.entity.Employee;

import java.util.List;

public interface EmployeeService {

    public Employee createEmployee(EmployeeDto employeeDto);

    public List<EmployeeViewDto> getAllEmployees();

    public EmployeeViewDto findEmployeeById(Long employeeId);

    public EmployeeDto updateEmployee(Long employeeId, EmployeeDto employeeDto);

    public boolean deleteEmployee(Long employeeId);
}
