// File importing
const http = require("http");
const fs = require('fs');
const path = require('path');
const querystring = require('querystring');
const crypto = require("crypto");

// file path

const filePath = path.join(__dirname, "contacts.json");

if (!fs.existsSync(filePath)) {
    fs.writeFile(filePath, "[]", (err) => {
        if (err) return console.error("File creation error");
    })

    console.log("File created");
} else {
    console.log("File already exists");
}


const getContacts = () => {
    const data = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(data);
}

const saveContacts = (contacts) => {
    fs.writeFileSync(filePath, JSON.stringify(contacts, null, 2), "utf-8");
}


const server = http.createServer((req, res) => {
    if (req.url === "/" && req.method === "GET") {
        const statusCode = 200;
        res.writeHead(statusCode, { "content-type": "text/html" });
        res.write(`
                    <div style="text-align: center; margin-top: 50px; font-family: Arial, sans-serif; background-color: #f0f4f8; padding: 40px; border-radius: 10px; width: 60%; margin-left: auto; margin-right: auto; box-shadow: 0 0 10px rgba(0,0,0,0.1);">
                        <h1 style="color: #2c3e50; margin-bottom: 30px;">Welcome to Contact Management System</h1>
                        <button style="background-color: #3498db; color: white; border: none; padding: 12px 20px; margin: 10px; border-radius: 6px; cursor: pointer; font-size: 16px;"><a href="/view-contacts-page" style="text-decoration: none; color: white;">View Contacts</a></button>
                        <button style="background-color: #2ecc71; color: white; border: none; padding: 12px 20px; margin: 10px; border-radius: 6px; cursor: pointer; font-size: 16px;"><a href="/add-contacts-page" style="text-decoration: none; color: white;">Add Contact</button>
                        <button style="background-color: #f1c40f; color: white; border: none; padding: 12px 20px; margin: 10px; border-radius: 6px; cursor: pointer; font-size: 16px;"><a href="/update-contacts-page" style="text-decoration: none; color: white;">Update Contact</a></button>
                        <button style="background-color: #e74c3c; color: white; border: none; padding: 12px 20px; margin: 10px; border-radius: 6px; cursor: pointer; font-size: 16px;"><a href="/delete-contacts-page" style="text-decoration: none; color: white;">Delete Contact</a></button>
                    </div>

                `)
        res.end();

    }
    else if (req.url === "/view-contacts-page" && req.method === "GET") {
        const statusCode = 200;
        res.writeHead(statusCode, { "content-type": "text/html" });
        const contacts = getContacts();
        console.log(contacts);
        const html = `
                    <div style="font-family: Arial, sans-serif; text-align: center; margin-top: 40px; background-color: #f4f6f8; padding: 40px; border-radius: 10px; width: 70%; margin-left: auto; margin-right: auto; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
                        <h1 style="color: #2c3e50; margin-bottom: 25px;">See the Full Details of Contacts</h1>
                        <table role="table" border="1" style="width: 100%; border-collapse: collapse; margin-top: 20px; background-color: white; border: 1px solid #ccc;">
                            <thead style="background-color: #3498db; color: white;">
                                <tr>
                                    <th style="padding: 12px; border: 1px solid #ccc; font-size: 18px;">Name</th>
                                    <th style="padding: 12px; border: 1px solid #ccc; font-size: 18px;">Phone Number</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${contacts.map(contact => `
                                    <tr style="text-align: center; background-color: #f9f9f9;">
                                        <td style="padding: 10px; border: 1px solid #ccc;">${contact.name}</td>
                                        <td style="padding: 10px; border: 1px solid #ccc;">${contact.phoneNumber}</td>
                                    </tr>
                                `).join('')}
                            </tbody>
                        </table>
                        <a href="/" style="display: inline-block; margin-top: 25px; padding: 10px 20px; background-color: #2ecc71; color: white; text-decoration: none; border-radius: 6px; font-size: 16px;">Back to Home</a>
                    </div>`;


        res.write(html);
        res.end();
    }
    else if (req.url === "/add-contacts-page" && req.method === "GET") {
        const statusCode = 200;
        res.writeHead(statusCode, { "content-type": "text/html" })
        const html = `<div style="font-family: Arial, sans-serif; background-color: #f4f6f8; width: 50%; margin: 60px auto; padding: 40px; border-radius: 10px; box-shadow: 0 4px 10px rgba(0,0,0,0.1); text-align: center;">
                        <h1 style="color: #2c3e50; margin-bottom: 30px;">Add Contact to the Contacts Register</h1>

                        <form action="/addContact" method="post" style="display: inline-block; text-align: left;">
                            <label for="name" style="display: inline-block; width: 100px; font-weight: bold; margin-bottom: 10px;">Name:</label>
                            <input type="text" id="name" name="name" style="width: 250px; padding: 8px; border: 1px solid #ccc; border-radius: 5px; margin-bottom: 15px;"><br>

                            <label for="phone" style="display: inline-block; width: 100px; font-weight: bold; margin-bottom: 10px;">Phone:</label>
                            <input type="text" id="phone" name="phone" style="width: 250px; padding: 8px; border: 1px solid #ccc; border-radius: 5px; margin-bottom: 20px;"><br>

                            <input type="submit" value="Add Contact" style="background-color: #2ecc71; color: white; border: none; padding: 10px 20px; border-radius: 6px; cursor: pointer; font-size: 16px;">
                        </form>

                        <br>
                        <a href="/" style="display: inline-block; margin-top: 20px; color: #3498db; text-decoration: none; font-size: 15px;">Back to Home</a>
                    </div>
                    `

        res.write(html)
        res.end();
    }
    else if (req.url === '/addContact' && req.method === 'POST') {
        const body = [];
        req.on("data", (chunk) => {
            body.push(chunk);
        });

        req.on('end', () => {
            const parsedBody = querystring.parse(Buffer.concat(body).toString());
            const newContact = {
                id: crypto.randomUUID().replaceAll('-', ''),
                name: parsedBody.name,
                phoneNumber: parsedBody.phone

            }

            const contacts = getContacts();
            contacts.push(newContact);

            saveContacts(contacts);


            const statusCode = 200;
            res.writeHead(statusCode, { "content-type": "text/html" });
            res.write(`<div style="
                    text-align: center; 
                    margin-top: 40px; 
                    background-color: #f9f9f9; 
                    padding: 25px; 
                    border-radius: 10px; 
                    box-shadow: 0 4px 8px rgba(0,0,0,0.1); 
                    font-family: Arial, sans-serif;
                ">
                    <h1 style="color: #2c3e50; margin-bottom: 15px;">Contact added Successfully!.......<h1 style="color: #555; margin-bottom: 20px; font-size: 15px;">
                        
                    </h1>

                    <a href="/" 
                    style="
                        display: inline-block; 
                        margin-top: 10px; 
                        color: white; 
                        text-decoration: none; 
                        font-size: 16px; 
                        background: linear-gradient(135deg, #3498db, #2980b9); 
                        padding: 10px 25px; 
                        border-radius: 8px; 
                        transition: all 0.3s ease; 
                        letter-spacing: 0.5px;
                        box-shadow: 0 4px 10px rgba(0,0,0,0.15);
                    "
                    onmouseover="this.style.opacity='0.9'; this.style.transform='translateY(-2px)';"
                    onmouseout="this.style.opacity='1'; this.style.transform='translateY(0)';"
                    >
                        Back to Home
                    </a>

                    <a href="/add-contacts-page" 
                    style="
                        display: inline-block; 
                        margin-top: 10px; 
                        margin-left: 15px; 
                        color: white; 
                        text-decoration: none; 
                        font-size: 16px; 
                        background: linear-gradient(135deg, #2ecc71, #27ae60); 
                        padding: 10px 25px; 
                        border-radius: 8px; 
                        transition: all 0.3s ease; 
                        letter-spacing: 0.5px;
                        box-shadow: 0 4px 10px rgba(0,0,0,0.15);
                    "
                    onmouseover="this.style.opacity='0.9'; this.style.transform='translateY(-2px)';"
                    onmouseout="this.style.opacity='1'; this.style.transform='translateY(0)';"
                    >
                        Add Another Contact
                    </a>
                </div>`);
            res.end();





        })
    }
    else if (req.url === '/delete-contacts-page' && req.method === "GET") {
        const statusCode = 200;
        res.writeHead(statusCode, { "content-type": "text/html" });
        const contacts = getContacts();
        const html = `
                    <div style="font-family: Arial, sans-serif; text-align: center; margin-top: 40px; background-color: #f4f6f8; padding: 40px; border-radius: 10px; width: 70%; margin-left: auto; margin-right: auto; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
                        <h1 style="color: #2c3e50; margin-bottom: 25px;">See the Full Details of Contacts</h1>
                        <table role="table" border="1" style="width: 100%; border-collapse: collapse; margin-top: 20px; background-color: white; border: 1px solid #ccc;">
                            <thead style="background-color: #3498db; color: white;">
                                <tr>
                                    <th style="padding: 12px; border: 1px solid #ccc; font-size: 18px;">Name</th>
                                    <th style="padding: 12px; border: 1px solid #ccc; font-size: 18px;">Phone Number</th>
                                    <th style="padding: 12px; border: 1px solid #ccc; font-size: 18px;"> Delete Contact</th>

                                </tr>
                            </thead>
                            <tbody>
                                ${contacts.map(contact => `
                                    <tr style="text-align: center; background-color: #f9f9f9;">
                                        <td style="padding: 10px; border: 1px solid #ccc;">${contact.name}</td>
                                        <td style="padding: 10px; border: 1px solid #ccc;">${contact.phoneNumber}</td>
                                        <td style="padding: 10px; border: 1px solid #ccc;">
                                        <form action="/deleteContact" method="POST" style="display: inline;">
                                            <input type="hidden" name="id" value="${contact.id}">
                                            <button type="submit" 
                                                style="
                                                    background-color: #e74c3c;
                                                    color: white;
                                                    border: none;
                                                    padding: 8px 15px;
                                                    border-radius: 6px;
                                                    cursor: pointer;
                                                    font-size: 14px;
                                                    transition: all 0.3s ease;
                                                    box-shadow: 0 3px 8px rgba(0,0,0,0.15);
                                                "
                                                onmouseover="this.style.opacity='0.9'; this.style.transform='translateY(-2px)';"
                                                onmouseout="this.style.opacity='1'; this.style.transform='translateY(0)';"
                                            >
                                                Delete
                                            </button>
                                        </form>
                        </td>
                                    </tr>
                                `).join('')}
                            </tbody>
                        </table>
                        <a href="/" style="display: inline-block; margin-top: 25px; padding: 10px 20px; background-color: #2ecc71; color: white; text-decoration: none; border-radius: 6px; font-size: 16px;">Back to Home</a>
                    </div>`;


        res.write(html);
        res.end();
    }
    else if (req.url === '/deleteContact' && req.method === 'POST') {
        const body = [];
        req.on('data', (chunk) => {
            body.push(chunk);
        });

        req.on("end", () => {
            const parsedBody = querystring.parse(Buffer.concat(body).toString());
            const contacts = getContacts();
            const updatedContacts = contacts.filter(contact => contact.id !== parsedBody.id);
            saveContacts(updatedContacts);
            const statusCode = 200;
            res.writeHead(statusCode, { "content-type": "text/html" });
            res.write(`<div style="
                    text-align: center; 
                    margin-top: 40px; 
                    background-color: #f9f9f9; 
                    padding: 25px; 
                    border-radius: 10px; 
                    box-shadow: 0 4px 8px rgba(0,0,0,0.1); 
                    font-family: Arial, sans-serif;
                ">
                    <h3 style="color: #2c3e50; margin-bottom: 15px;">Navigation Panel</h3>
                    <p style="color: #555; margin-bottom: 20px; font-size: 15px;">
                        You can return to the home page or manage more contacts below 
                    </p>

                    <a href="/" 
                    style="
                        display: inline-block; 
                        margin-top: 10px; 
                        color: white; 
                        text-decoration: none; 
                        font-size: 16px; 
                        background: linear-gradient(135deg, #3498db, #2980b9); 
                        padding: 10px 25px; 
                        border-radius: 8px; 
                        transition: all 0.3s ease; 
                        letter-spacing: 0.5px;
                        box-shadow: 0 4px 10px rgba(0,0,0,0.15);
                    "
                    onmouseover="this.style.opacity='0.9'; this.style.transform='translateY(-2px)';"
                    onmouseout="this.style.opacity='1'; this.style.transform='translateY(0)';"
                    >
                        Back to Home
                    </a>

                    <a href="/add-contacts-page" 
                    style="
                        display: inline-block; 
                        margin-top: 10px; 
                        margin-left: 15px; 
                        color: white; 
                        text-decoration: none; 
                        font-size: 16px; 
                        background: linear-gradient(135deg, #2ecc71, #27ae60); 
                        padding: 10px 25px; 
                        border-radius: 8px; 
                        transition: all 0.3s ease; 
                        letter-spacing: 0.5px;
                        box-shadow: 0 4px 10px rgba(0,0,0,0.15);
                    "
                    onmouseover="this.style.opacity='0.9'; this.style.transform='translateY(-2px)';"
                    onmouseout="this.style.opacity='1'; this.style.transform='translateY(0)';"
                    >
                        Add Another Contact
                    </a>
                </div>`);
            res.end();
        })




    }
    else if (req.url === '/update-contacts-page' && req.method === "GET") {
        const statusCode = 200;
        res.writeHead(statusCode, { "content-type": "text/html" });
        const contacts = getContacts();
        const html = `
                    <div style="font-family: Arial, sans-serif; text-align: center; margin-top: 40px; background-color: #f4f6f8; padding: 40px; border-radius: 10px; width: 70%; margin-left: auto; margin-right: auto; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
                        <h1 style="color: #2c3e50; margin-bottom: 25px;">See the Full Details of Contacts</h1>
                        <table role="table" border="1" style="width: 100%; border-collapse: collapse; margin-top: 20px; background-color: white; border: 1px solid #ccc;">
                            <thead style="background-color: #3498db; color: white;">
                                <tr>
                                    <th style="padding: 12px; border: 1px solid #ccc; font-size: 18px;">Name</th>
                                    <th style="padding: 12px; border: 1px solid #ccc; font-size: 18px;">Phone Number</th>
                                    <th style="padding: 12px; border: 1px solid #ccc; font-size: 18px;"> Delete Contact</th>

                                </tr>
                            </thead>
                            <tbody>
                                ${contacts.map(contact => `
                                    <tr style="text-align: center; background-color: #f9f9f9;">
                                        <td style="padding: 10px; border: 1px solid #ccc;">${contact.name}</td>
                                        <td style="padding: 10px; border: 1px solid #ccc;">${contact.phoneNumber}</td>
                                        <td style="padding: 10px; border: 1px solid #ccc;">
                                        <form action="/edit-contact-page" method="GET" style="display: inline;">
                                            <input type="hidden" name="id" value="${contact.id}">
                                            <button type="submit" 
                                                style="
                                                    background-color: #e74c3c;
                                                    color: white;
                                                    border: none;
                                                    padding: 8px 15px;
                                                    border-radius: 6px;
                                                    cursor: pointer;
                                                    font-size: 14px;
                                                    transition: all 0.3s ease;
                                                    box-shadow: 0 3px 8px rgba(0,0,0,0.15);
                                                "
                                                onmouseover="this.style.opacity='0.9'; this.style.transform='translateY(-2px)';"
                                                onmouseout="this.style.opacity='1'; this.style.transform='translateY(0)';"
                                            >
                                                Update
                                            </button>
                                        </form>
                        </td>
                                    </tr>
                                `).join('')}
                            </tbody>
                        </table>
                        <a href="/" style="display: inline-block; margin-top: 25px; padding: 10px 20px; background-color: #2ecc71; color: white; text-decoration: none; border-radius: 6px; font-size: 16px;">Back to Home</a>
                    </div>`;


        res.write(html);
        res.end();



    }
    else if (req.url.startsWith("/edit-contact-page") && req.method === "GET") {
        const query = new URL(req.url, `http://${req.headers.host}`).searchParams
        const id = query.get("id");
        
        console.log(id);

        const contacts = getContacts();
        const contact = contacts.find(contact => contact.id === id);

        const html = `
        <div style="font-family: Arial, sans-serif; background-color: #f4f6f8; width: 50%; margin: 60px auto; padding: 40px; border-radius: 10px; box-shadow: 0 4px 10px rgba(0,0,0,0.1); text-align: center;">
            <h1 style="color: #2c3e50; margin-bottom: 30px;">Update Contact</h1>
            <form action="/updateContact" method="POST" style="display: inline-block; text-align: left;">
                <input type="hidden" name="id" value="${contact.id}">
                <label for="name" style="display: inline-block; width: 100px; font-weight: bold;">Name:</label>
                <input type="text" id="name" name="name" value="${contact.name}" style="width: 250px; padding: 8px; border: 1px solid #ccc; border-radius: 5px;"><br><br>

                <label for="phone" style="display: inline-block; width: 100px; font-weight: bold;">Phone:</label>
                <input type="text" id="phone" name="phone" value="${contact.phoneNumber}" style="width: 250px; padding: 8px; border: 1px solid #ccc; border-radius: 5px;"><br><br>

                <input type="submit" value="Update Contact" style="background-color: #f1c40f; color: white; border: none; padding: 10px 20px; border-radius: 6px; cursor: pointer; font-size: 16px;">
            </form>
            <br>
            <a href="/" style="display: inline-block; margin-top: 20px; color: #3498db; text-decoration: none; font-size: 15px;">Back to Home</a>
        </div>
    `;
        res.writeHead(200, { "content-type": "text/html" });
        res.end(html);
    }
    else if (req.url === "/updateContact" && req.method === "POST") {
        const contacts = getContacts();

        const body = [];
        req.on("data", (chunk) => {
            body.push(chunk);
        });

        req.on('end', () => {
            const parsedBody = querystring.parse(Buffer.concat(body).toString());
            const contact = contacts.find(contact => contact.id === parsedBody.id);
            contact.name = parsedBody.name;
            contact.phoneNumber = parsedBody.phone;

            saveContacts(contacts);

            const statusCode = 302;
            res.writeHead(statusCode, { "location": "/update-contacts-page" });

            res.end();



        })
    }
})

const PORT = 3000;

server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);

})