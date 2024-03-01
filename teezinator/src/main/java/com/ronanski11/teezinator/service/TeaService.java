package com.ronanski11.teezinator.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ronanski11.teezinator.model.Tea;
import com.ronanski11.teezinator.repository.TeaRepository;

@Service
public class TeaService {
	
	@Autowired
	private TeaRepository teaRepository;
	
	public List<Tea> getAllTeas() {
		return teaRepository.findAll();
	}

}
