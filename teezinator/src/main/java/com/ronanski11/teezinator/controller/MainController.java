package com.ronanski11.teezinator.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ronanski11.teezinator.model.Stats;
import com.ronanski11.teezinator.model.Tea;
import com.ronanski11.teezinator.repository.TeaRepository;
import com.ronanski11.teezinator.service.StatsService;
import com.ronanski11.teezinator.service.TeaService;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/tea")
public class MainController {

	@Autowired
	private TeaService teaService;

	@Autowired
	StatsService statsService;

	@Autowired
	TeaRepository t;

	@GetMapping("/getall")
	public List<Tea> helloWorld() {
		return teaService.getAllTeas();
	}
	
	@PostMapping("/addTea")
	public ResponseEntity<String> addTea(@RequestParam String teaId, @RequestParam String username) {
		this.statsService.addTea(username, teaId);
		return ResponseEntity.ok("Success!");	
	}
	
	@GetMapping("/getAllStatsByUser")
	public ResponseEntity<Stats> getAllStatsByUser(@RequestParam String username) {
		return ResponseEntity.ok(this.statsService.getAllStatsByUser(username));
	}
	
	

	/*
	 * @PostMapping("/initStats") public ResponseEntity<String> initStats() { Stats
	 * s = new Stats(); s.setUser(e.findAll().get(0)); Map<String, Integer> m = new
	 * HashMap<String, Integer>(); m.put("65d89f6d80a51d758ab2ce7c", 18);
	 * m.put("65d8792e80a51d758ab2ce6d", 26); m.put("65d8afae80a51d758ab2ce7d", 14);
	 * s.setTeaNumbers(m);
	 * 
	 * Map<LocalDate, Map<String, Integer>> dayStatsTotal = new HashMap<LocalDate,
	 * Map<String,Integer>>(); Map<String, Integer> weekStats1 = new HashMap<String,
	 * Integer>();
	 * 
	 * weekStats1.put("65d89f6d80a51d758ab2ce7c", 1);
	 * weekStats1.put("65d8792e80a51d758ab2ce6d", 2);
	 * weekStats1.put("65d8afae80a51d758ab2ce7d", 1);
	 * 
	 * dayStatsTotal.put(LocalDate.now().minusDays(20), weekStats1);
	 * 
	 * weekStats1.clear();
	 * 
	 * weekStats1.put("65d89f6d80a51d758ab2ce7c", 1);
	 * weekStats1.put("65d8792e80a51d758ab2ce6d", 1);
	 * weekStats1.put("65d8afae80a51d758ab2ce7d", 2);
	 * 
	 * dayStatsTotal.put(LocalDate.now().minusDays(19), weekStats1);
	 * 
	 * weekStats1.clear();
	 * 
	 * weekStats1.put("65d89f6d80a51d758ab2ce7c", 1);
	 * weekStats1.put("65d8792e80a51d758ab2ce6d", 1);
	 * weekStats1.put("65d8afae80a51d758ab2ce7d", 1);
	 * 
	 * dayStatsTotal.put(LocalDate.now().minusDays(18), weekStats1);
	 * 
	 * weekStats1.clear();
	 * 
	 * weekStats1.put("65d8792e80a51d758ab2ce6d", 1);
	 * weekStats1.put("65d8afae80a51d758ab2ce7d", 2);
	 * 
	 * dayStatsTotal.put(LocalDate.now().minusDays(16), weekStats1);
	 * 
	 * s.setTeaNumbersPerDay(dayStatsTotal);
	 * 
	 * sr.save(s); return ResponseEntity.ok("success"); }
	 */

}
