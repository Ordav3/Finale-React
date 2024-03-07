## Getting Started

### Installation

Clone the repository to your local machine:

git clone https://github.com/Ordav3/Finale-React.git


### Change into the project directory:

cd Finale-React

### Install project dependencies:

npm install

### Usage

Start the express server:  <br>
npm start

### Administrator user:
User email: adamb@gmail.com  <br>
Password: Aa1234567*    

### Normal user:
User email: israel@gmail.com    <br>
Password: Er@12345



## Features

1. *User Registration & Login*: New users can be created, and registered users can login.

2. *Users & Cards Handling*: Allows for creating, viewing, updating, and deleting users and cards.

3. *Authorization & Authentication*: Uses JWT for authentication and authorizing users to perform certain operations.

4. *Input Validation*: All user inputs are validated using Joi validation library.

5. *Password Security*: Passwords are hashed before storing in the database using bcrypt.

## API Endpoints

Here are the available API endpoints:

#### Users

- POST users/: Register a new user. Validates user input and checks for existing users before creating a new user in the database.
- POST users/login: Authenticate a user. Validates login credentials and returns a token if successful.
- GET users/: Get all users. Requires admin privileges. Returns a list of users without passwords, creation dates, and version information.
- GET users/userInfo: Get information of the logged-in user. Requires authentication. Returns user information without password, creation date, and version information.
- PUT users/userInfo/:id: Update the logged-in user's information by ID. Requires authentication and checks if the user ID matches the logged-in user's ID before updating.
- PATCH users/:id: (Endpoint present but related validation validateEditIsBusiness is not defined in the shared code.) Intended to update specific information (like business status) for the logged-in user by ID. Requires authentication and checks if the user ID matches the logged-in user's ID before updating.
- DELETE users/:id: Delete a user by ID. Requires authentication and checks if the user ID matches the logged-in user's ID or if the user is an admin before deleting.

#### Cards

- GET cards/: Get all cards.
- GET cards/my-cards: Get cards created by the logged-in user. Requires authentication.
- GET cards/fav: Get liked cards by the logged-in user. Requires authentication.
- GET cards/:id: Get a specific card by its ID.
- POST cards/: Create a new card. Requires authentication and admin privileges.
- PUT cards/:id: Update an existing card by its ID. Requires authentication and admin privileges.
- PATCH /:id: Like or unlike a card for the logged-in user. Requires authentication.
- DELETE /:id: Delete a specific card by its ID. Requires authentication and checks if the user is authorized.

## Editing a Card (Admins Only)

To edit a card in our system, you must have administrative privileges. Follow the steps below to make changes to an existing card:

1. **Access the Edit Interface**:
   - Navigate to the card you wish to edit on My Cards page.
   - Click on the 'Edit' button, that is represented by a pencil icon. This button is only visible to users with admin roles.

2. **Modify Card Details**:
   - Once in the edit mode, you will see a form with the current card details.
   - Update the fields you wish to change, such as the title, subtitle, description, contact information, and address.
   - If you need to update the card's image, provide the new image URL in the 'Image URL' field.

3. **Save Changes**:
   - After making the necessary updates, click on the 'SAVE CHANGES' button to apply the edits.
   - The system will automatically verify your admin status. If you are not an admin, you will receive an authorization error.

Please note that Only users with administrative rights have the capability to make changes or create cards to prevent unauthorized modifications.

## Editing a User Profile

To edit your user profile, please follow the instructions below:

1. **Access the Profile Edit Page**:
   - Click on the 'Profile' button in the top right corner of the navigation bar.
   - From the dropdown menu, select 'Edit Profile' to access the profile editing form.

2. **Edit Your Profile Details**:
   - You can now see the profile form filled with your current information.
   - Update any field as necessary, including your first name, last name, email, phone number, and address details.
   - If you want to update your profile image, paste the new image URL in the 'Image URL' field.
   - The 'Image Alt' field is for the alternative text that describes your profile image for accessibility and SEO.

3. **Form Validation**:
   - Fields marked with an asterisk (*) are required. Ensure these fields are complete before submitting.
   - If there are any errors during submission, error messages will guide you to correct them.

4. **Submit Your Changes**:
   - Once you have made your changes, click the 'UPDATE' button to save them.
   - If you change your mind or want to start over, you can click 'RESET FORM' to revert to the original information or 'CANCEL' to exit without saving changes.

5. **Confirmation**:
   - Upon successful update, you should receive a confirmation message.
   - In case of an error or lack of confirmation, verify the changes or contact support.
