package com.ronanski11.teezinator.controller;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.ronanski11.teezinator.model.Tea;
import com.ronanski11.teezinator.repository.TeaRepository;
import com.ronanski11.teezinator.security.AuthenticationService;
import com.ronanski11.teezinator.service.TeaService;

@RestController
@RequestMapping("/api/tea")
public class TeaController {

	@Autowired
	private TeaService teaService;
	
	@Autowired
	AuthenticationService auth;
	
	@Autowired
	TeaRepository t;
	
	@PostMapping("/addTea")
	public ResponseEntity<String> addTea(@RequestParam String teaId, @RequestParam LocalDateTime timeOfConsumption, @RequestParam(required = false) MultipartFile image) {
		this.teaService.addTea(auth.getUsername(), teaId, timeOfConsumption, image);
		return ResponseEntity.ok("Success!");	
	}

	@GetMapping("/getall")
	public List<Tea> helloWorld() {
		return teaService.getAllTeas();
	}
	
	@GetMapping("/getTea")
	public Tea getTeaById(@RequestParam(name = "teaId", required = true) String teaId) {
		return teaService.findById(teaId);
	}
	
}
