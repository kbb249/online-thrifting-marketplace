# D.2 Requirements
## **Positioning**
### *Problem Statement:*
The problem of unsafe and disorganized second hand selling through social media platforms affects NAU students who want to buy and sell items on campus. The impact of this problem is that students face safety risks when meeting unknown sellers, experience unreliable transactions, and lack an affordable system for selling used items.

### *Product Position Statement*
For NAU students who want a safe, reliable, and organized way to buy and sell second hand items on campus, LinkU is an online marketplace that verifies student status, organizes listings, and supports safe pickups at campus locations, unlike Snapchat or Facebook Marketplace, our product has safer transactions, reduces risk, and provides a platform dedicated to student needs.

### *Value Proposition and Customer Segment*
LinkU provides a safe, organized, and affordable way for NAU students to buy and sell used items on campus, reducing the risks and headaches of informal transactions through social media. It targets students who have previously bought or sold second-hand items on campus and want a safer, more organized and secure way to carry out these transactions.

## Stakeholders

## Functional Requirements (Features)

## Non-functional Requirements

## MVP

## Use Cases
### *Use Case Diagram*
<img width="591" height="537" alt="Section6 1 drawio" src="https://github.com/user-attachments/assets/cfd08e6f-b972-4ead-8973-1cc8d1c2c311" />

### *Use Case Descriptions and Interface Sketch*
Use Case: Inputting school selection

Actor: Buyer and Seller

Trigger: Creating an account

Pre-condition: users does not have an account

Post-condition: users’ shop is for their school campus

Success Scenario:
1. 	The user inputs personal information.
2. 	The user confirms that personal information is correct.
3. 	The system does a check to make sure information is not duplicated.
4. 	The user is prompted to give what school they go to.
5. 	The system does a check to make sure school is a valid option
6. 	The system adds the school’s location parameters to what is available for purchase.
7. 	The user can shop from other users from their school.
<img width="401" height="165" alt="schoolSelection drawio" src="https://github.com/user-attachments/assets/5cbf446c-8229-482d-af6d-b55f355c027e" />


Use Case: User Login

Actor: Buyer and Seller

Trigger: opening the website

Pre-condition: users have an account

Post-condition: The user will have an account and is able to shop.

Success Scenario:
1. 	The user inputs username and password.
2. 	The system does a check to make sure information is in the database.
3. 	The system does a check to confirm if the username and password are correct.
4. 	The user is logged in.
5. 	The user can shop on the website.
<img width="401" height="104" alt="Login drawio" src="https://github.com/user-attachments/assets/5ea9a2eb-d765-46c8-ae12-1e3b4b1399dd" />


Use Case: Post items  

Actor: Seller

Trigger: decided to sell items

Pre-condition: users is logged in

Post-condition: Items will be posted for other users to buy.

Success Scenario:
1. 	The user inputs a description of the item.
2. 	The user inputs images of the item.
3. 	The system does a check that all key information is inputted.
4. 	The system adds the post to the database of the school location.
5. 	The user can see their post set as available for purchase.

<img width="451" height="446" alt="Post drawio" src="https://github.com/user-attachments/assets/80141552-0a2b-4198-b319-aba7dbc199eb" />


Use Case: Select a pick-up location

Actor: Buyer

Trigger: Item is selected for purchase.

Pre-condition: Item is selected, and all information is filled out.

Post-condition: Item will be selected and ready for payment.

Success Scenario:
1. 	The user looks at the possible pick-up locations.
2. 	The user selects where they would like to pick-up purchased items.
3. 	The system collects information and prepares to give it to the seller.
4. 	The system confirms the pick-up location is valid.
5. 	The user is prompted for payment.

<img width="401" height="239" alt="pick-up drawio" src="https://github.com/user-attachments/assets/539e7532-3db5-443a-90aa-e600b4052ba2" />


Use Case: Item categories

Actor: Seller

Trigger: decided to sell items

Pre-condition: Seller is creating a post

Post-condition: Item post will have tags with categories.

Success Scenario:
1. 	The seller will select from a group of options that describe the item.
2. 	The system prepares to share the tags with the database search engine.
3. 	The seller creates a post with item accurate information and tags.

<img width="451" height="446" alt="Post drawio" src="https://github.com/user-attachments/assets/f7dfaac6-8b1e-4bda-bcf8-369285542825" />


Use Case: Rate sellers

Actor: Buyer

Trigger: items were purchased

Pre-condition: user pick-up their purchase.

Post-condition: The buyer will have a rating and review.

Success Scenario:
1. 	The user fills out a form.
2. 	The user gives details of what they bought.
3. 	The user shares thoughts on how the buyer treated them.
4. 	The user selects a rating from 1-5 of the buyers.
5. 	The system adds the new rating to the buyer’s record.
6. 	The rating and review is viable by the buyer and other users.
 
<img width="401" height="104" alt="rate drawio" src="https://github.com/user-attachments/assets/d3043e0e-bddf-43ad-aff6-e66afda68d78" />



## User Stories

## Issue Tracker




