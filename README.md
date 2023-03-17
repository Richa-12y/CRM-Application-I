# CRM-Application-I
## Problem Statement 

- Create a CRM application that can be leveraged to accept the customer complaints and provide the complete life-cycle 
management of the issues raised by the customers.  Here is a sample CRM application interface.
---
## Use Cases 
> Customer 
- I should be able to register myself.
- I should be able to login myself for registering/viewing complaints.
- I should be able to raise an issue.
- I should be able to check the latest status of the issues I raised.
- I should be able to modify the issue raised.
- I should be able to check the complete history of the issues raised. 
- I should be able to close my ticket myself.
---

> Engineer 
- I should be able to accept an issue.
- I should be able to update an issue.
- I should be able to close an issue.
- I should be able to see the complete list of issues assigned to me.
- I should be able to search for an issue.
- I should be able to filter the issues assigned to me based on the ticket status.
---
>Admin 
- I should be able to see all the customers.
- I should be able to see all the engineers
- I should be able to see the details of all the tickets.
- I should be able to see all the active tickets.
- I should be able to filter the tickets based on status. 
- I should be able to re-assign a ticket to another engineer.
- I should be able to add a new Engineer.
- I should be able to remove an Engineer.
---

### Sign up Request

> Endpoint:  POST /crm/api/v1/auth/signup

> Sample request body :
> {
        "name": "Richa",
        "userId": "Richa07",
        "email" : "abc@xyz.com",
        "password" : "Welcome1",
        "userType" : "ENGINEER"
}

> Sample response body :
> {
   "name": "Richa",
    "userId": "Richa07",
    "email": "abc@xyz.com",
    "userTypes": "ENGINEER",
    "userStatus": "PENDING",
    "createdAt": "",
    "updatedAt": ""
}


### JSON structure:
name : Mandatory
userId : Mandatory + Unique
email : Manadtory + Unique
password : Mandatory
userType : Optional, default value is CUSTOMER. Other possible value : ADMIN | ENGINEER
userStatus: It represents the status of the user registered. Customers are by default approved.
ADMIN and Engineers need approval from Admin. 
Possible values: APPROVED | PENDING | REJECTED

> Feature 1: User registration and login

---

There are three kinds of users:

Customer
Engineer
Admin

- Engineer/Admin registration will be supported through API, but it needs to be approved by the ADMIN
- Customer registration will be supported through API with no approval needed from the ADMIN
- API to support the ADMIN login. Login API call should return the access token, which will be used to make all the other calls
- API to support the CUSTOMER login. Login API call should return the access token, which will be used to make all the other calls
- API to support the ENGINEER login. Login API call should return the access token, which will be used to make all the other calls. Login API will succeed only if the ENGINEER registration request has been approved by the ADMIN. Proper error message in the case ADMIN has not yet approved/rejected the registration request

---
> Login Request
---


Endpoint: POST /crm/api/v1/auth/signin
Sample request body :
{
        "userId": "",
        "password" : ""
    
}


Sample response body :
{
    "name": "",
    "userId": "",
    "email": "",
    "userTypes": "CUSTOMER",
    "userStatus": "APPROVED",
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IlZpc2gwMSIsImlhdCI6MTY0NTMzMjg3NiwiZXhwIjoxNjQ1NDE5Mjc2fQ.21IRt9VIL"
}



Feature 2: Authenticating and Authorising the User APIs

- API for getting the list of all users
- API for the getting the user based on UserID
- API for updating the user type and status
- Authenticating and authorising the APIs mentioned above, so that only authenticated ADMIN will be allowed to perform the above operations
ENGINEER/ADMIN user should be able to login successfully after the approval from the ADMIN user


