package com.repms.user_service.repository;

import com.repms.user_service.entities.OneTimePasscode;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface OneTimePasscodeRepository extends JpaRepository<OneTimePasscode, Integer> {

}
