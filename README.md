# CRM-Application-I
##Problem Statement 

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


