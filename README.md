Version 1 hosted: [version 1](https://myfriendbill.netlify.app/)



## What is MyFriendBill?

MyFriendBill is an application that allows users to keep track of the money they are owed/owe to other users or institutions.

By signing in through Google, only your name and profile image are saved to the database. This is to allow other users to send/request debts from you

#UI (2/4/2023)
![image](https://user-images.githubusercontent.com/8136106/216792514-a1f52529-dfe3-4b62-ac93-f6b7522bf85a.png)

#UI (1/31/2023)
![327993215_1119641395381264_698175583430670011_n](https://user-images.githubusercontent.com/8136106/215684982-2e9d5efc-1826-4a9d-b9ab-4bc3ff28931c.png)

# Database

**User Table**

| id | serial |
| -- | ------ |
| name | string |
| google_id | number |
| owner_id | number |

**Debt Table**
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

**Archive Table**
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
