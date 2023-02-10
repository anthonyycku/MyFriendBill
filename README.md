Version 1 hosted: [version 1](https://myfriendbill.netlify.app/)



## What is MyFriendBill?

MyFriendBill is an application that allows users to keep track of the money they are owed/owe to other users or institutions.

By signing in through Google, only your name and profile image are saved to the database. This is to allow other users to send/request debts from you

# Bills Table
![image](https://user-images.githubusercontent.com/8136106/216792514-a1f52529-dfe3-4b62-ac93-f6b7522bf85a.png)

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
