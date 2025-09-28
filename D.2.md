# D.2 Requirements
## **Positioning**
### *Problem Statement:*
The problem of unsafe and disorganized second hand selling through social media platforms affects NAU students who want to buy and sell items on campus. The impact of this problem is that students face safety risks when meeting unknown sellers, experience unreliable transactions, and lack an affordable system for selling used items.

### *Product Position Statement*
For NAU students who want a safe, reliable, and organized way to buy and sell second hand items on campus, LinkU is an online marketplace that verifies student status, organizes listings, and supports safe pickups at campus locations, unlike Snapchat or Facebook Marketplace, our product has safer transactions, reduces risk, and provides a platform dedicated to student needs.

### *Value Proposition and Customer Segment*
LinkU provides a safe, organized, and affordable way for NAU students to buy and sell used items on campus, reducing the risks and headaches of informal transactions through social media. It targets students who have previously bought or sold second-hand items on campus and want a safer, more organized and secure way to carry out these transactions.

## Stakeholders
**Primary user (Students):**  Those with a verified campus email address will be able to use this website to create listings and purchase items. They can also provide feedback for improvements.

**Development team:** Zazel, Kaylee, Henry, alexa, jordin and kendahl. We all are responsible for the design and implementation of the website. We ensure that we are communicating with prospective users and addressing the problems they bring up. 

**Competitors:** Depop, Facebook marketplace and offer-up. These apps/websites indirectly influence the user's expectations. 

**Skeptics/ Potential partners:** University Administrators. We would have to partner with administration on locker set up and user verification. They can also help in promotion of the website as a safer alternative to public marketplaces. 

**Potential sponsors:** Local Businesses, universities or startup incubators. This would provide a guideline for scaling based on funding. Depending on their role they may help with mentorship in starting a new business such as this. 

## Functional Requirements (Features)
1. Account verification
2. School selection
3. User login
4. Profile management
5. Ability for users to sell items
6. List items with pictures
7. Report suspicious activity
8. Select pickup location
9. Item categories
10. Budget filters
11. Free shipping
12. Bookmark or “favorite” items
13. Private messaging
14. Rate sellers
15. Price check against retail value

## Non-functional Requirements
1. Security 
    - The website will only be fully functional for users with verified school emails
    - All transactions will be encrypted and comply with industry security standards
2. Performance
    - The website will load the homepage within 2 seconds under normal network conditions 
3. Portability
    - The website shall be compatible with all major browsers
    - The website shall be responsive and usable on both desktop and mobile devices
4. Usability
    - The website must be usable by 90% first-time users without a tutorial
    - The user interface shall follow standard design principles to ensure intuitive navigation and accessibility
    - The website will comply with ADA accessibility standards
5. Maintainability
    - The system codebase shall follow consistent coding standards and include documentation
6. Scalability
    - The system shall be scalable to handle 90% user traffic during peak times
7. Availability
    - The system will be available 99% of the time
    - The system must notify users in advance of scheduled downtime
8. Reliability
    - The system must be able to recover from server failure without data loss using automated recovery tools

## MVP
The MVP for this project will include the core features necessary such as University email verification, a listing system and a manual system to check the locker exchange workflow. 
For university email verification we will start with a .edu check until we can get direct university verification (DUO). We will also implement a basic listing system where users can post items for sale with photos, descriptions and pricing. It will also be available for buyers to browse and contact sellers. And finally we should manually try locker drop offs while observing how Amazon lockers are utilized and what the customer experience looks like. Possibly interviewing customers as they finish their pick up. By doing these we will be validating if there is a demand for the product, the trustworthiness of the product because of the email verification and the convenience/usability of the locker system and listing program. 

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




