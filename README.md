### Back-End for the application of the "Distance Learning" discipline project

##### Description of the teacher about the project:

 - Teacher: Able to host content, modules and classes; open existing tools in the AVA, ​​assessment (choose a way to assess), place notes, insert student;

 - Student: Content, evaluation activities to be developed, interaction tools, access to notes.

 #### For testing the application:
 
 - With HTTP:
 ```
 $ git clone https://github.com/EAD-Group/EAD-BACKEND.git
 ``` 
 
 - With SSH:
 ```
 $ git clone git@github.com:EAD-Group/EAD-BACKEND.git
 ```
 
 - To install the necessary dependencies to run the project, enter the directory and run the command
 
 ```
 $ npm i ou $ npm install
 ```
 
 #### Environment variables:
 
 1 - Make a copy of the `.env.example` file and rename it to `.env`
 
 2 - In variable `CONNECTION DB` enter MongoDB Database URL
 
 Example:
 ```
 mongodb+srv://<user>:<password>@ead-back.y1gqz.mongodb.net/<dbname>?retryWrites=true&w=majority
 ```
 
 Enter `user` and `password` with your MongoDB access data
 
 #### Run the project

 - To run the project, enter the directory and run the command:
 
 `$ npm run dev`