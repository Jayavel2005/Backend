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
                        <button style="background-color: #f1c40f; color: white; border: none; padding: 12px 20px; margin: 10px; border-radius: 6px; cursor: pointer; font-size: 16px;">Update Contact</button>
                        <button style="background-color: #e74c3c; color: white; border: none; padding: 12px 20px; margin: 10px; border-radius: 6px; cursor: pointer; font-size: 16px;">Delete Contact</button>
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
            res.write(`<a href="/" style="display: inline-block; margin-top: 20px; color: #3498db; text-decoration: none; font-size: 15px;">Back to Home</a>`);
            res.end();





        })
    }
})

const PORT = 3000;

server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);

})