Version 1 hosted: [version 1](https://myfriendbill.netlify.app/)



## What is MyFriendBill?

MyFriendBill is an application that allows users to keep track of the money they are owed/owe to other users or institutions.

By signing in through Google, only your name and profile image are saved to the database. This is to allow other users to send/request debts from you

# Signing in
![image](https://user-images.githubusercontent.com/8136106/217979974-598f2504-4e16-49b0-9704-3a434086dd2d.png)

**Sign in with Google:** Signing in with Google allows the user to share their name with other users. Other than profile image and name, no other data is saved.

**Sign in as guest:** Signing in as guest will provide the user with a randomly generated name. If the user logs out, the user will be assigned a new name and a clean profile.

# Usage Guide
![image](https://user-images.githubusercontent.com/8136106/216792514-a1f52529-dfe3-4b62-ac93-f6b7522bf85a.png)

# Create a new bill
![image](https://user-images.githubusercontent.com/8136106/217980577-61badb00-9e9d-419b-a108-00a586f32158.png)

During bill creation, users can choose other users to send/request money to. Creating a bill to an existing user will show the bill on their side too.

Users can select whether to send (To) or receive (From) other users. Selecting an existing user will reciprocate the bill to the other user. Alternatively, if the existing user does not exist, it is possible to create "custom users".

# Update existing bill
Existing bills can be updated through the edit button in the secondary pane, after selecting a row from the table.

Note that both users (sender and receiver) will see the same changes to the updated bill.

![image](https://user-images.githubusercontent.com/8136106/217981046-72c7526b-631a-4674-bff7-d307e515fa6b.png)

![image](https://user-images.githubusercontent.com/8136106/217981027-82748ecc-9733-45bc-9cb6-12ce802af9a4.png)

# Table features
There are two tabs for the table - Active and Archive. Active shows current bills not yet completed. Archive shows bills that have been paid.

The search bar filters names, amounts, and descriptions.

Dropdown menu can show all bills, only debts the user owes, or only debts owed to the user.
![image](https://user-images.githubusercontent.com/8136106/217981309-c9996ad2-9f5f-41dc-ab54-28a8599696a9.png)

Users can complete bills by clicking either the check at the end of each row, or the "Mark as complete" button in the secondary pane
![image](https://user-images.githubusercontent.com/8136106/217981402-995cda9b-4337-47c8-a9c4-a5679a6f8b3b.png)

Completing a bill sends a copy of the current bill to the archive for record-keeping.

If the bill has a recurring frequency, a copy gets sent to the archive while the current bill's date will update to the date of its next recurrence (based on frequency).

On the archived bill, the creation date and time are replaced with the date and time the bill was archived.

![image](https://user-images.githubusercontent.com/8136106/217981482-647e0fe3-4aca-4a66-8895-b41413f55999.png)

# Archived bills
Archived bills can be deleted permanently by clicking the delete icon at the end of each row or the delete button in the secondary pane.

![image](https://user-images.githubusercontent.com/8136106/217981511-943599fb-4cd6-47cf-95c2-3594b6fe8402.png)

# Bill Summary
Bill Summary combines all active bills of the same name, displaying the final amount that the user owes or is owed from a specific user.
![image](https://user-images.githubusercontent.com/8136106/218374861-769cdb7c-5221-4831-8bd8-6e44a52b9fdd.png)


# Database

### User Table

| id | serial |
| -- | ------ |
| name | string |
| google_id | number |
| owner_id | number |

### Debt Table
| id | serial |
| -- | ------ |
| created_at | Date |
| sender_id | number |
| receiver_id | number |
| amount | number |
| description | string |
| frequency_interval | string |
| next_recurrence_date | Date |
| note | string |

### Archive Table
| id | serial |
| -- | ------ |
| archived_at | Date |
| created_at  | Date |
| sender_id | number |
| receiver_id | number |
| amount | number |
| description | string |
| frequency_interval | string |
| next_recurrence_date | Date |
| note | string |
