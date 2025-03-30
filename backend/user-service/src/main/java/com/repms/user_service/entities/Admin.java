package com.repms.user_service.entities;

import jakarta.persistence.*;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "admin")
public class Admin {
    @Id
    @Column(name="admin_id")
    private int adminId;

    @Column(name = "username")
    public String username;

    @Column
    @Size(min = 8,message = "Password should contain atleast 8 characters")
    private String password;

    @Column(name = "full_name")
    private String fullName;

    @Column(name = "email_id")
    private String emailId;


    @Column
    private String gender;

    @Column(name = "mobileno")
    private long mobileNumber;

    @Column(name = "zipcode")
    private long zipcode;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "user_id")
    private User user;

    public Admin() {
        super();
    }
    public Admin(int adminId, String username, String password, String fullName, String emailId, String gender, long mobileNumber, long zipcode, User user) {
        this.adminId = adminId;
        this.username = username;
        this.password = password;
        this.fullName = fullName;
        this.emailId = emailId;
        this.gender = gender;
        this.mobileNumber = mobileNumber;
        this.zipcode = zipcode;
        this.user = user;
    }

    public Admin(int adminId, String username,
                    @Size(min = 8, message = "Password should contain atleast 8 characters") String password, String fullName,
                    String emailId, String gender, long mobileNumber, long zipcode) {
        super();
        this.adminId = adminId;
        this.username = username;
        this.password = password;
        this.fullName = fullName;
        this.emailId = emailId;
        this.gender = gender;
        this.mobileNumber = mobileNumber;
        this.zipcode = zipcode;
    }

    public int getAdminId() {

        return adminId;
    }

    public void setAdminId(int adminId) {
        this.adminId = adminId;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public @Size(min = 8, message = "Password should contain atleast 8 characters") String getPassword() {
        return password;
    }

    public void setPassword(@Size(min = 8, message = "Password should contain atleast 8 characters") String password) {
        this.password = password;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String getEmailId() {
        return emailId;
    }

    public void setEmailId(String emailId) {
        this.emailId = emailId;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public long getMobileNumber() {
        return mobileNumber;
    }

    public void setMobileNumber(long mobileNumber) {
        this.mobileNumber = mobileNumber;
    }

    public long getZipcode() {
        return zipcode;
    }

    public void setZipcode(long zipcode) {
        this.zipcode = zipcode;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    @Override
    public String toString() {
        return "Admin{" +
                "adminId=" + adminId +
                ", username='" + username + '\'' +
                ", password='" + password + '\'' +
                ", fullName='" + fullName + '\'' +
                ", emailId='" + emailId + '\'' +
                ", gender='" + gender + '\'' +
                ", mobileNumber=" + mobileNumber +
                ", zipcode=" + zipcode +
                ", user=" + user +
                '}';
    }
}
