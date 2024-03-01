package com.ronanski11.teezinator.model;

import java.time.LocalDate;
import java.util.Map;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;

@Document
@Data
public class Stats {
	
	@Id
	private String id;
	
	@DBRef
	private User user;
	
	private Map<String, Integer> teaNumbers;
	
	private Map<String, Map<String, Integer>> teaNumbersPerWeek;
	
	private Map<LocalDate, Map<String, Integer>> teaNumbersPerDay;

}
