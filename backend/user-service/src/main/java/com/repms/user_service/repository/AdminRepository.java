package com.repms.user_service.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.repms.user_service.entities.Admin;

@Repository
public interface AdminRepository extends JpaRepository<Admin, Integer>{

    @Query("SELECT c FROM Customer c WHERE c.username = :username")
    Admin getAdminByUserName(String username);


}
