// initializing modules
const http = require("http");
const querystring = require("querystring");
const { MongoClient } = require("mongodb");
const { parse } = require("path");
const { URL } = require("url");


const url = `mongodb://localhost:27017/`
const mongodb = new MongoClient(url);
const dbName = "students";
const collectionName = "it";

const server = http.createServer(async (req, res) => {
    const url = req.url;
    const method = req.method;

    // routes

    if (url === "/" && method === "GET") {
        const statusCode = 200;
        res.writeHead(statusCode, { "content-type": "text/html" });
        const html = `<div style="display:flex; justify-content:center; align-items:center; height:100vh; font-family:Arial, sans-serif; background-color:#f8f9fa;">
                        <div style="text-align:center;">
                            <h1 style="color:#2c3e50; font-size:32px; margin-bottom:30px;">
                                Welcome to Student Management System
                            </h1>
                            <div>
                                <a href="/view-students-page" 
                                style="display:inline-block; margin:10px; padding:12px 24px; text-decoration:none; 
                                        background-color:#3498db; color:white; border-radius:8px; font-weight:bold;">
                                View Students
                                </a>
                                <a href="/add-students-page" 
                                style="display:inline-block; margin:10px; padding:12px 24px; text-decoration:none; 
                                        background-color:#2ecc71; color:white; border-radius:8px; font-weight:bold;">
                                Add Students
                                </a>
                            </div>
                        </div>
                    </div>`

        res.write(html)
        res.end();
    }
    else if (url === '/view-students-page' && method === "GET") {
        try {
            await mongodb.connect();
            const db = mongodb.db(dbName);
            const collection = db.collection(collectionName);
            const students = await collection.find().toArray();

            const statusCode = 200;
            res.writeHead(statusCode, { "content-type": "text/html" });
            const html = `
                        <div style="font-family: 'Segoe UI', Arial, sans-serif; margin: 50px auto; width: 80%; text-align: center;">
                            <h1 style="color: #2c3e50; background-color: #dff9fb; padding: 20px; border-radius: 12px; box-shadow: 0 2px 5px rgba(0,0,0,0.1); letter-spacing: 1px;">
                                View Student Details
                            </h1>
                            <table style="width: 100%; border-collapse: collapse; margin-top: 30px; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.15);">
                                <thead>
                                    <tr style="background: linear-gradient(90deg, #16a085, #27ae60); color: white; font-size: 18px;">
                                        <th style="padding: 14px; border: 1px solid #ddd;">Roll Number</th>
                                        <th style="padding: 14px; border: 1px solid #ddd;">Name</th>
                                        <th style="padding: 14px; border: 1px solid #ddd;">Department</th>
                                        <th style="padding: 14px; border: 1px solid #ddd;"></th>

                                    </tr>
                                </thead>
                                <tbody>
                                    ${students.map(student => `
                                        <tr style="background-color: #f8f9fa; transition: background 0.3s ease;">
                                            <td style="padding: 12px; border: 1px solid #ddd;">${student.rollNo}</td>
                                            <td style="padding: 12px; border: 1px solid #ddd;">${student.name}</td>
                                            <td style="padding: 12px; border: 1px solid #ddd;">${student.department}</td>
                                            <td><form action="/deleteStudent" method="GET" 
                                                style="display: inline-block; margin: 10px; text-align: center;">
                                                
                                                <input type="hidden" value=${student.rollNo} name="rollNo" id="rollNo">
                                                
                                                <button type="submit"
                                                    style="background: linear-gradient(90deg, #e74c3c, #c0392b);
                                                        color: white;
                                                        border: none;
                                                        padding: 10px 20px;
                                                        border-radius: 6px;
                                                        font-size: 15px;
                                                        cursor: pointer;
                                                        box-shadow: 0 3px 6px rgba(0,0,0,0.1);
                                                        transition: all 0.3s ease;"
                                                    onmouseover="this.style.background='linear-gradient(90deg, #ff6b6b, #e74c3c)'"
                                                    onmouseout="this.style.background='linear-gradient(90deg, #e74c3c, #c0392b)'"
                                                    onmousedown="this.style.transform='scale(0.95)'"
                                                    onmouseup="this.style.transform='scale(1)'">
                                                   Delete
                                                </button>
                                            </form>
                                            </td>
                                        </tr>
                                    `).join('')}
                                </tbody>
                            </table>

                            <p style="margin-top: 20px; color: #7f8c8d; font-size: 14px;">
                                Total Students: <strong>${students.length}</strong>
                            </p>

                            <a href="/"
                                style="
                                    display: inline-block;
                                    text-decoration: none;
                                    background: linear-gradient(90deg, #3498db, #2980b9);
                                    color: white;
                                    padding: 10px 20px;
                                    border-radius: 6px;
                                    font-size: 16px;
                                    font-weight: 500;
                                    box-shadow: 0 4px 10px rgba(0,0,0,0.1);
                                    transition: all 0.3s ease;
                                    margin-top: 20px;
                                "
                                onmouseover="this.style.background='linear-gradient(90deg, #5dade2, #3498db)'"
                                onmouseout="this.style.background='linear-gradient(90deg, #3498db, #2980b9)'"
                                onmousedown="this.style.transform='scale(0.95)'"
                                onmouseup="this.style.transform='scale(1)'">
                                Back to Home</a>

                        </div>

                        <script>
                            // Add simple hover effect inline using JS
                            document.querySelectorAll('tbody tr').forEach(row => {
                                row.addEventListener('mouseover', () => row.style.backgroundColor = '#e8f8f5');
                                row.addEventListener('mouseout', () => row.style.backgroundColor = '#f8f9fa');
                            });
                        </script>
                        `;


            res.write(html);
            res.end();

        } catch (error) {
            console.log(error);

        }
        finally {
            mongodb.close();
        }
    }
    else if (url === '/add-students-page' && method === "GET") {
        const statusCode = 200;
        res.writeHead(statusCode, { "content-type": "text/html" });
        const html = `<div style="font-family: 'Segoe UI', Arial, sans-serif; width: 400px; margin: 80px auto; padding: 30px; border-radius: 12px; background-color: #f8f9fa; box-shadow: 0 4px 20px rgba(0,0,0,0.1); text-align: center;">
    <h1 style="color: #2c3e50; background-color: #dff9fb; padding: 15px; border-radius: 8px; font-size: 24px; margin-bottom: 25px; letter-spacing: 1px;">
        Add Student
    </h1>
    <form action="/addStudent" method="POST" style="display: flex; flex-direction: column; gap: 15px;">
        <input type="number" id="rollNo" name="rollNo" placeholder="Enter Roll Number"
            style="padding: 12px; border: 1px solid #ccc; border-radius: 6px; font-size: 15px; outline: none; transition: border 0.3s ease;"
            onfocus="this.style.border='1px solid #27ae60'" onblur="this.style.border='1px solid #ccc'">
        
        <input type="text" id="name" name="name" placeholder="Enter Student Name"
            style="padding: 12px; border: 1px solid #ccc; border-radius: 6px; font-size: 15px; outline: none; transition: border 0.3s ease;"
            onfocus="this.style.border='1px solid #27ae60'" onblur="this.style.border='1px solid #ccc'">
        
        <input type="text" id="department" name="department" placeholder="Enter Department"
            style="padding: 12px; border: 1px solid #ccc; border-radius: 6px; font-size: 15px; outline: none; transition: border 0.3s ease;"
            onfocus="this.style.border='1px solid #27ae60'" onblur="this.style.border='1px solid #ccc'">
        
        <button type="submit"
            style="background: linear-gradient(90deg, #16a085, #27ae60); color: white; border: none; padding: 12px; border-radius: 6px; font-size: 16px; cursor: pointer; transition: background 0.3s ease;">
            Add Student
        </button>
    </form>
</div>
`
        res.write(html);
        res.end();
    }
    else if (url === '/addStudent' && method === 'POST') {
        const body = [];
        req.on("data", (chunk) => {
            body.push(chunk)
        })

        req.on("end", async () => {
            const parsedBody = querystring.parse(Buffer.concat(body).toString());
            const rollNo = parsedBody.rollNo;
            const name = parsedBody.name;
            const department = parsedBody.department;
            try {
                await mongodb.connect();
                const db = mongodb.db(dbName);
                const collection = db.collection(collectionName);
                await collection.insertOne({ rollNo, name, department });
                console.log("Student added successfully");
            } catch (error) {
                console.log(error);
            }
            finally {
                await mongodb.close();
            }
            res.writeHead(302, { "location": "/view-students-page" });
            res.end();

        })
    } else if (url.startsWith("/deleteStudent") && method === 'GET') {
        const query = new URL(url, `http://${req.headers.host}`);
        const rollNo = query.searchParams.get("rollNo");
        console.log(typeof rollNo);

        try {
            await mongodb.connect();
            const db = mongodb.db(dbName);
            const collection = db.collection(collectionName);
            await collection.deleteOne({ rollNo: rollNo });
            console.log("Student deleted successfully");
        } catch (error) {
            console.log(error);

        } finally {
            await mongodb.close();
        }

        res.writeHead(302, { "location": "/view-students-page" });
        res.end();

    }
})
const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);

})