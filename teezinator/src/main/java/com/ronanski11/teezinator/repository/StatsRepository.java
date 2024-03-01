package com.ronanski11.teezinator.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.ronanski11.teezinator.model.Stats;
import com.ronanski11.teezinator.model.User;

public interface StatsRepository extends MongoRepository<Stats, String>{

	public Stats findByUser(User user);

}
