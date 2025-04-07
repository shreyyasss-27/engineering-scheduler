<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Engineering Scheduler</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            margin: 0 auto;
            max-width: 800px;
            padding: 20px;
            background-color: #f9f9f9;
            color: #333;
        }
        h1, h2, h3 {
            color: #2c3e50;
        }
        h1 {
            border-bottom: 2px solid #2c3e50;
            padding-bottom: 10px;
        }
        h2 {
            margin-top: 20px;
        }
        pre {
            background-color: #eee;
            padding: 10px;
            border-radius: 5px;
            overflow-x: auto;
        }
        code {
            background-color: #eee;
            padding: 2px 5px;
            border-radius: 3px;
        }
        a {
            color: #2980b9;
            text-decoration: none;
        }
        a:hover {
            text-decoration: underline;
        }
        ul, ol {
            margin-left: 20px;
        }
        li {
            margin-bottom: 10px;
        }
    </style>
</head>
<body>
    <h1>Engineering Scheduler</h1>
    <p>A web-based application to manage class schedules for engineering students. Users can add, view, search, export/import, and delete schedules, with a timetable view and PDF download feature. Built with Node.js, Express, MongoDB, and vanilla JavaScript.</p>

    <h2>Features</h2>
    <ul>
        <li>Add class schedules with day, time, class name, subject, and teacher</li>
        <li>View all schedules in a card layout</li>
        <li>Search schedules by class, subject, or teacher</li>
        <li>Export schedules as JSON and import from JSON files</li>
        <li>View a complete timetable with filtering by class and day</li>
        <li>Download timetable as PDF</li>
        <li>Persistent storage using MongoDB</li>
    </ul>

    <h2>Prerequisites</h2>
    <p>Before you begin, ensure you have the following installed:</p>
    <ul>
        <li><a href="https://nodejs.org/">Node.js</a> (v14 or higher)</li>
        <li><a href="https://www.mongodb.com/try/download/community">MongoDB</a> (Community Server)</li>
        <li>A web browser (e.g., Chrome, Firefox)</li>
        <li>Optional: <a href="https://www.mongodb.com/products/compass">MongoDB Compass</a> for a GUI to view database data</li>
    </ul>

    <h2>Installation</h2>
    <ol>
        <li>
            <strong>Clone the Repository</strong>
            <pre><code>git clone https://github.com/your-username/engineering-scheduler.git
cd engineering-scheduler</code></pre>
            Replace <code>your-username</code> with your GitHub username.
        </li>
        <li>
            <strong>Install Node.js Dependencies</strong>
            <pre><code>npm install</code></pre>
            This installs Express, Mongoose, body-parser, and cors.
        </li>
        <li>
            <strong>Set Up MongoDB</strong>
            <ul>
                <li><strong>Windows</strong>:
                    <ul>
                        <li>Download and install MongoDB Community Server from the official site.</li>
                        <li>Create a data directory: <code>mkdir C:\data\db</code>.</li>
                    </ul>
                </li>
                <li><strong>macOS/Linux</strong>:
                    <ul>
                        <li>Install via Homebrew (macOS): 
                            <pre><code>brew tap mongodb/brew
brew install mongodb-community</code></pre>
                        </li>
                        <li>Or follow <a href="https://docs.mongodb.com/manual/administration/install-on-linux/">MongoDB Docs</a> for Linux.</li>
                        <li>Create a data directory: <code>mkdir -p /data/db</code>.</li>
                    </ul>
                </li>
            </ul>
        </li>
        <li>
            <strong>Directory Structure</strong>
            <p>Ensure your project looks like this:</p>
            <pre><code>engineering-scheduler/
├── public/
│   ├── index.html
│   ├── timetable.html
│   ├── style.css
│   └── script.js
├── models/
│   └── Schedule.js
├── server.js
├── package.json
└── README.md</code></pre>
        </li>
    </ol>

    <h2>Running the Project</h2>
    <ol>
        <li>
            <strong>Start MongoDB</strong>
            <p>Open a terminal and run:</p>
            <pre><code>mongod</code></pre>
            <ul>
                <li>Windows: If not in PATH, use <code>mongod --dbpath C:\data\db</code>.</li>
                <li>Keep this terminal open.</li>
            </ul>
        </li>
        <li>
            <strong>Start the Node.js Server</strong>
            <p>Open a new terminal in the project directory:</p>
            <pre><code>cd engineering-scheduler
node server.js</code></pre>
            <p>You should see:</p>
            <pre><code>Server running on port 3000
MongoDB connected</code></pre>
            <p>Keep this terminal open.</p>
        </li>
        <li>
            <strong>Access the Application</strong>
            <p>Open a web browser and go to:</p>
            <ul>
                <li><a href="http://localhost:3000">http://localhost:3000</a> for the scheduler page</li>
                <li><a href="http://localhost:3000/timetable">http://localhost:3000/timetable</a> for the timetable view</li>
            </ul>
        </li>
    </ol>

    <h2>Usage</h2>
    <ul>
        <li><strong>Add a Schedule</strong>: On the home page (<code>/</code>), fill in the form (day, start/end time, class, subject, teacher) and click "Add Schedule." Schedules appear below in the "Scheduled Classes" section.</li>
        <li><strong>Search Schedules</strong>: Type in the search bar to filter schedules by class, subject, or teacher.</li>
        <li><strong>Delete a Schedule</strong>: Click the "🗑️ Delete" button on a schedule card.</li>
        <li><strong>Export/Import Schedules</strong>: Click "Export Schedule" to download as JSON. Click "Import Schedule," select a JSON file, and upload.</li>
        <li><strong>View Timetable</strong>: Go to <code>/timetable</code>, filter by class or day, and click "Download PDF" to save as a PDF.</li>
    </ul>

    <h2>Troubleshooting</h2>
    <ul>
        <li><strong>MongoDB Not Connecting</strong>: Ensure <code>mongod</code> is running and the connection string in <code>server.js</code> matches your setup (<code>mongodb://localhost:27017/engineering-scheduler</code>).</li>
        <li><strong>Schedules Not Saving</strong>: Check browser Console (F12 > Console) for errors. Verify MongoDB data: <code>mongo</code>, <code>use engineering-scheduler</code>, <code>db.schedules.find()</code>.</li>
        <li><strong>Port Conflict</strong>: If port 3000 is in use, edit <code>server.js</code> to change <code>PORT</code> (e.g., <code>const PORT = 3001</code>).</li>
    </ul>

    <h2>Technologies Used</h2>
    <ul>
        <li><strong>Frontend</strong>: HTML, CSS, Vanilla JavaScript, html2pdf.js</li>
        <li><strong>Backend</strong>: Node.js, Express</li>
        <li><strong>Database</strong>: MongoDB with Mongoose</li>
        <li><strong>Styling</strong>: Custom CSS with responsive design</li>
    </ul>

    <h2>Contributing</h2>
    <ol>
        <li>Fork the repository.</li>
        <li>Create a new branch: <code>git checkout -b feature-name</code>.</li>
        <li>Make changes and commit: <code>git commit -m "Add feature"</code>.</li>
        <li>Push to your fork: <code>git push origin feature-name</code>.</li>
        <li>Create a pull request.</li>
    </ol>

    <h2>License</h2>
    <p>This project is open-source and available under the <a href="LICENSE">MIT License</a>.</p>
</body>
</html>
