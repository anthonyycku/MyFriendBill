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
