package com.fullstack.Controller;

import com.fullstack.dto.EmployeeDto;
import com.fullstack.dto.EmployeeViewDto;
import com.fullstack.entity.Employee;
import com.fullstack.exception.ResourceNotFoundException;
import com.fullstack.service.EmployeeService;
import com.fullstack.service.EmployeeServiceImp;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("*")
@AllArgsConstructor
@RequestMapping("/api/v1/employees")
public class EmployeeController {

    @Autowired
    EmployeeService employeeService;

    @PostMapping("/create")
    public ResponseEntity<?> createEmployee(@RequestBody EmployeeDto employeeDto){
        try{
            Employee employee = employeeService.createEmployee(employeeDto);

            if(employee==null){
                return ResponseEntity.ok().body("Email is already used for different user");
            }

            return new ResponseEntity<>(employeeDto,HttpStatus.CREATED);
        }
        catch (Exception e){
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    @GetMapping("/getAll")
    public ResponseEntity<?> getAllEmployeeDetails(){
        try{
            List<EmployeeViewDto> employeeViewDtoList = employeeService.getAllEmployees();

            if(employeeViewDtoList==null){
                return ResponseEntity.ok().body("No Employee Details Present in the Database");
            }

            return ResponseEntity.ok().body(employeeViewDtoList);
        }
        catch (Exception e){
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/get/{id}")
    public ResponseEntity<?> getEmployeeDetailsById(@PathVariable("id") Long employeeId){
        try{
            EmployeeViewDto employeeDto = employeeService.findEmployeeById(employeeId);

            return ResponseEntity.ok().body(employeeDto);
        }
        catch (ResourceNotFoundException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        }
        catch (Exception e){
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    @PostMapping("/updateEmployee/{id}")
    public ResponseEntity<?> updateEmployeeDetails(@PathVariable("id") Long employeeId,
                                                   @RequestBody EmployeeDto employeeDto){
        try {
            EmployeeDto employee = employeeService.updateEmployee(employeeId, employeeDto);

            if (employee == null) {
                return ResponseEntity.ok().body("Email is already used for different user");
            }

            return new ResponseEntity<>(employeeDto,HttpStatus.ACCEPTED);
        }
            catch (ResourceNotFoundException e) {
                return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
            }
        catch (Exception e){
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/deleteEmployee/{id}")
    public ResponseEntity<?> deleteEmployeeDetails(@PathVariable("id") Long employeeId){
        try{
            boolean employeeDeleted = employeeService.deleteEmployee(employeeId);

            return ResponseEntity.ok().body("Employee Id :"+ employeeId + " Deleted Successfully..");
        }
        catch (ResourceNotFoundException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        }
        catch (Exception e){
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


}
