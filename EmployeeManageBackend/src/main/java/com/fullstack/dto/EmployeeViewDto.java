package com.fullstack.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class EmployeeViewDto {

    private long id;

    private String firstname;

    private String lastname;

    private int age;

    private String email;
}

