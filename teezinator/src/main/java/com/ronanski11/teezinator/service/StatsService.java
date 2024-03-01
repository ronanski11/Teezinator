package com.ronanski11.teezinator.service;

import java.time.LocalDate;
import java.util.Calendar;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ronanski11.teezinator.model.Stats;
import com.ronanski11.teezinator.repository.StatsRepository;
import com.ronanski11.teezinator.repository.UserRepository;

@Service
public class StatsService {

	@Autowired
	StatsRepository statsRepository;

	@Autowired
	UserRepository userRepository;
	
	public Stats addTea(String username, String teaId) {
		
		String weekString = String.format("%s,%s", Calendar.getInstance().get(Calendar.WEEK_OF_YEAR), Calendar.getInstance().get(Calendar.YEAR));
		
		Stats stats = this.statsRepository.findByUser(this.userRepository.findByUsername(username).get());
		stats.getTeaNumbers().put(teaId, stats.getTeaNumbers().get(teaId) + 1);
		
		if (stats.getTeaNumbersPerDay().containsKey(LocalDate.now())) {
			stats.getTeaNumbersPerDay().get(LocalDate.now()).put(teaId, stats.getTeaNumbersPerDay().get(LocalDate.now()).get(teaId) + 1);
		} else {
			Map<String, Integer> dayMap = new HashMap<String, Integer>();
			dayMap.put(teaId, 1);
			stats.getTeaNumbersPerDay().put(LocalDate.now(), dayMap);
		}
		
		if (stats.getTeaNumbersPerWeek().containsKey(weekString)) {
			stats.getTeaNumbersPerWeek().get(weekString).put(teaId, stats.getTeaNumbersPerWeek().get(weekString).get(teaId) + 1);
		} else {
			Map<String, Integer> weekMap = new HashMap<String, Integer>();
			weekMap.put(teaId, 1);
			stats.getTeaNumbersPerWeek().put(weekString, weekMap);
		}
		
		return this.statsRepository.save(stats);
	}
	
	public Stats getAllStatsByUser(String username) {
		return this.statsRepository.findByUser(this.userRepository.findByUsername(username).get());
	}

}
