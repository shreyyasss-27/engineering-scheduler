Engineering Scheduler
A web-based application to manage class schedules for engineering students. Users can add, view, search, export/import, and delete schedules, with a timetable view and PDF download feature. Built with Node.js, Express, MongoDB, and vanilla JavaScript.

Features
Add class schedules with day, time, class name, subject, and teacher
View all schedules in a card layout
Search schedules by class, subject, or teacher
Export schedules as JSON and import from JSON files
View a complete timetable with filtering by class and day
Download timetable as PDF
Persistent storage using MongoDB
Prerequisites
Before you begin, ensure you have the following installed:

Node.js (v14 or higher)
MongoDB (Community Server)
A web browser (e.g., Chrome, Firefox)
Optional: MongoDB Compass for a GUI to view database data
Installation
Clone the Repository
bash

Collapse

Wrap

Copy
git clone https://github.com/your-username/engineering-scheduler.git
cd engineering-scheduler
Replace your-username with your GitHub username.
Install Node.js Dependencies
bash

Collapse

Wrap

Copy
npm install
This installs Express, Mongoose, body-parser, and cors.
Set Up MongoDB
Windows:
Download and install MongoDB Community Server from the official site.
Create a data directory: mkdir C:\data\db.
macOS/Linux:
Install via Homebrew (macOS):
bash

Collapse

Wrap

Copy
brew tap mongodb/brew
brew install mongodb-community
Or follow MongoDB Docs for Linux.
Create a data directory: mkdir -p /data/db.
Directory Structure Ensure your project looks like this:
text

Collapse

Wrap

Copy
engineering-scheduler/
├── public/
│   ├── index.html
│   ├── timetable.html
│   ├── style.css
│   └── script.js
├── models/
│   └── Schedule.js
├── server.js
├── package.json
└── README.md
Running the Project
Start MongoDB
Open a terminal and run:
bash

Collapse

Wrap

Copy
mongod
Windows: If not in PATH, use mongod --dbpath C:\data\db.
Keep this terminal open.
Start the Node.js Server
Open a new terminal in the project directory:
bash

Collapse

Wrap

Copy
cd engineering-scheduler
node server.js
You should see:
text

Collapse

Wrap

Copy
Server running on port 3000
MongoDB connected
Keep this terminal open.
Access the Application
Open a web browser and go to:
http://localhost:3000 for the scheduler page
http://localhost:3000/timetable for the timetable view
Usage
Add a Schedule:
On the home page (/), fill in the form (day, start/end time, class, subject, teacher) and click "Add Schedule."
Schedules appear below in the "Scheduled Classes" section.
Search Schedules:
Type in the search bar to filter schedules by class, subject, or teacher.
Delete a Schedule:
Click the "🗑️ Delete" button on a schedule card.
Export/Import Schedules:
Click "Export Schedule" to download as JSON.
Click "Import Schedule," select a JSON file, and upload.
View Timetable:
Go to /timetable, filter by class or day, and click "Download PDF" to save as a PDF.
Troubleshooting
MongoDB Not Connecting:
Ensure mongod is running and the connection string in server.js matches your setup (mongodb://localhost:27017/engineering-scheduler).
Schedules Not Saving:
Check browser Console (F12 > Console) for errors.
Verify MongoDB data: mongo, use engineering-scheduler, db.schedules.find().
Port Conflict:
If port 3000 is in use, edit server.js to change PORT (e.g., const PORT = 3001).
Technologies Used
Frontend: HTML, CSS, Vanilla JavaScript, html2pdf.js
Backend: Node.js, Express
Database: MongoDB with Mongoose
Styling: Custom CSS with responsive design
Contributing
Fork the repository.
Create a new branch: git checkout -b feature-name.
Make changes and commit: git commit -m "Add feature".
Push to your fork: git push origin feature-name.
Create a pull request.
License
This project is open-source and available under the .

Steps to Add to GitHub
Create a New File:
In your engineering-scheduler directory, create a file named README.md.
Copy and paste the content above into it.
Initialize Git (if not already done):
bash

Collapse

Wrap

Copy
git init
Add Files to Git:
bash

Collapse

Wrap

Copy
git add .
Commit Changes:
bash

Collapse

Wrap

Copy
git commit -m "Initial commit with Engineering Scheduler project"
Create a GitHub Repository:
Go to GitHub, log in, and click "New" to create a repository.
Name it engineering-scheduler (or your preferred name).
Don’t initialize with a README (since we’re adding our own).
Link Local Project to GitHub:
Follow the GitHub instructions after creating the repo, typically:
bash

Collapse

Wrap

Copy
git remote add origin https://github.com/your-username/engineering-scheduler.git
git branch -M main
git push -u origin main
Replace your-username with your GitHub username.
Verify on GitHub:
Visit your repository URL (e.g., https://github.com/your-username/engineering-scheduler).
Check that all files, including README.md, are uploaded and the README displays correctly.