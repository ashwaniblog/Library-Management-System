# Library-Management-System
steps to follow to configure 
1. npm install
2. look and install all the packages in package .json 
3. To use bootstrap and fontawsome paste the given in styles in angular .json 
"styles": [
              "./node_modules/bootstrap/dist/css/bootstrap.min.css",
              "src/styles.css",
              "node_modules/@fortawesome/fontawesome-free/css/all.css"
            ]
4. Run the frontend using npm start or ng serve
5. DB setup 
   1. Migration is already present in the project just run update-database in package manager console
6. Run the backend 
7. admin creds will be automatically seeded into db after running backend
8. Sign up the user using signup pass {
    points to remember 
    1. password should of atleast length of 8
    including one in caps letter , one special character like @ , one number
    
    for example user {
        Email : abcd@gmail.com,
        Password : Passwod@123
    },
    {
        Email : test@gmail.com,
        Password : Test@123
    }
}
9. Once Sign up with User login that user and add books of your required choice.
10. After Adding the book it will be available in dashbord for anonymous user to see book but can't perform operation like borrow or add books only logged in user can perform operation.
11. Validation is applied on the project for authentication and authorization Auth gaurd is implement in frontend and Jwt tokens in used in backend.
12. Enjoy the Project.