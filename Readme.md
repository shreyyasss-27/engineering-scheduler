Engineering Scheduler
=====================

A web-based application to manage class schedules for engineering students. Users can add, view, search, export/import, and delete schedules, with a timetable view and PDF download feature. Built with Node.js, Express, MongoDB, and vanilla JavaScript.

Features
--------

*   Add class schedules with day, time, class name, subject, and teacher
*   View all schedules in a card layout
*   Search schedules by class, subject, or teacher
*   Export schedules as JSON and import from JSON files
*   View a complete timetable with filtering by class and day
*   Download timetable as PDF
*   Persistent storage using MongoDB

Prerequisites
-------------

Before you begin, ensure you have the following installed:

*   [Node.js](https://nodejs.org/) (v14 or higher)
*   [MongoDB](https://www.mongodb.com/try/download/community) (Community Server)
*   A web browser (e.g., Chrome, Firefox)
*   Optional: [MongoDB Compass](https://www.mongodb.com/products/compass) for a GUI to view database data

Installation
------------

1.  **Clone the Repository**
    
        git clone https://github.com/your-username/engineering-scheduler.git
        cd engineering-scheduler
    
    Replace `your-username` with your GitHub username.
2.  **Install Node.js Dependencies**
    
        npm install
    
    This installs Express, Mongoose, body-parser, and cors.
3.  **Set Up MongoDB**
    *   **Windows**:
        *   Download and install MongoDB Community Server from the official site.
        *   Create a data directory: `mkdir C:\data\db`.
    *   **macOS/Linux**:
        *   Install via Homebrew (macOS):
            
                brew tap mongodb/brew
                brew install mongodb-community
            
        *   Or follow [MongoDB Docs](https://docs.mongodb.com/manual/administration/install-on-linux/) for Linux.
        *   Create a data directory: `mkdir -p /data/db`.
4.  **Directory Structure**
    
    Ensure your project looks like this:
    
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
-------------------

1.  **Start MongoDB**
    
    Open a terminal and run:
    
        mongod
    
    *   Windows: If not in PATH, use `mongod --dbpath C:\data\db`.
    *   Keep this terminal open.
2.  **Start the Node.js Server**
    
    Open a new terminal in the project directory:
    
        cd engineering-scheduler
        node server.js
    
    You should see:
    
        Server running on port 3000
        MongoDB connected
    
    Keep this terminal open.
    
3.  **Access the Application**
    
    Open a web browser and go to:
    
    *   [http://localhost:3000](http://localhost:3000) for the scheduler page
    *   [http://localhost:3000/timetable](http://localhost:3000/timetable) for the timetable view

Usage
-----

*   **Add a Schedule**: On the home page (`/`), fill in the form (day, start/end time, class, subject, teacher) and click "Add Schedule." Schedules appear below in the "Scheduled Classes" section.
*   **Search Schedules**: Type in the search bar to filter schedules by class, subject, or teacher.
*   **Delete a Schedule**: Click the "🗑️ Delete" button on a schedule card.
*   **Export/Import Schedules**: Click "Export Schedule" to download as JSON. Click "Import Schedule," select a JSON file, and upload.
*   **View Timetable**: Go to `/timetable`, filter by class or day, and click "Download PDF" to save as a PDF.

Troubleshooting
---------------

*   **MongoDB Not Connecting**: Ensure `mongod` is running and the connection string in `server.js` matches your setup (`mongodb://localhost:27017/engineering-scheduler`).
*   **Schedules Not Saving**: Check browser Console (F12 > Console) for errors. Verify MongoDB data: `mongo`, `use engineering-scheduler`, `db.schedules.find()`.
*   **Port Conflict**: If port 3000 is in use, edit `server.js` to change `PORT` (e.g., `const PORT = 3001`).

Technologies Used
-----------------

*   **Frontend**: HTML, CSS, Vanilla JavaScript, html2pdf.js
*   **Backend**: Node.js, Express
*   **Database**: MongoDB with Mongoose
*   **Styling**: Custom CSS with responsive design

Contributing
------------

1.  Fork the repository.
2.  Create a new branch: `git checkout -b feature-name`.
3.  Make changes and commit: `git commit -m "Add feature"`.
4.  Push to your fork: `git push origin feature-name`.
5.  Create a pull request.

License
-------

This project is open-source and available under the [MIT License](LICENSE).
