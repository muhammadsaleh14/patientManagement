Install the modules by **_npm install_  **

Run the project by running **_npm run dev_  **

**_The server is a bit slow to start_**  
  
**Patient Management System**  
This is a simple patient management system that a doctor can use to record his patients data. The app allows for high customizability.  
  
Flaws:  
So this is my very first react and nextjs project so it has some issues:  
* I had started out intending to make this a desktop app so the doctor could use it offline, I had looked up electron and thought it should work, after almost completion I realised that nextjs does not support making a webapp into a desktop app. So there is no way to run this as a desktop app.  
* I then tried to use mongodb with prisma instead of sqlite and prisma. It worked in the development server, I tried to deploy on netlify but it showed error which i gave up on as the project was intended to be used as a desktop application.  
  
Features:  
* A doctor can add a patient  
* A patient has visit in which the doctor can record chronic illnessed and the diagnosis related to that visit and assign prescription  
* The doctor can also sort the Acute illnesses by priority
* The table of acute illnessed is carried over for every new visit
* Other features are obvious

![image](https://github.com/muhammadsaleh14/patientManagement/assets/104164140/5dd7f7e4-10af-4c7a-a9f1-a7f47a431ef5)
![image](https://github.com/muhammadsaleh14/patientManagement/assets/104164140/c3a83085-41b4-4dbf-bc8d-92af3c7f8d61)
![image](https://github.com/muhammadsaleh14/patientManagement/assets/104164140/25d4051d-6910-4cce-9b5e-6440bfdaac4f)

