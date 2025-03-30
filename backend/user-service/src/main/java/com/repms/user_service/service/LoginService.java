package com.repms.user_service.service;

import com.repms.user_service.dto.UserData;
import com.repms.user_service.entities.OneTimePasscode;
import com.repms.user_service.entities.User;
import com.repms.user_service.exceptions.*;

public interface LoginService {

	public String signup(User user) throws UserNameAlreadyExistsException, UserEmailIdAlreadyExistsException;
	
	public UserData loginUserFirstStep(String username, String password) throws InvalidLoginCredentialsException,UserNotFoundException;
	
	public String loginUserSecondStep(int id, long otp) throws OtpInvalidException, UserNotFoundException;
	
	public String changePassword(String username, String newPassword) throws UserNotFoundException;
	
	public User getUserById(int id) throws UserNotFoundException;
	
	public User getUserByUsername(String username) throws UserNameAlreadyExistsException ;
	
	public User getUserByEmailId(String emailId) throws UserEmailIdAlreadyExistsException;
	
	public OneTimePasscode generateAndSaveOtp(int id) throws UserNotFoundException;
	
	public long getOtpById(int id) throws UserNotFoundException;
	
	public void sendOtpEmail(String recipientEmail, long otp, int userId);
	
}
