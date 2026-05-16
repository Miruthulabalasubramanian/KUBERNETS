const express = require('express');
const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
    // Read environment variables. If they don't exist, use default values.
    const appColor = process.env.APP_COLOR || 'lightgray';
    const appMode = process.env.APP_MODE || 'Development (Default)';
    const appMessage = process.env.APP_MESSAGE || 'No message provided (Default)';

    // Create simple HTML response
    const htmlResponse = `
        <!DOCTYPE html>
        <html>
        <head>
            <title>ConfigMap App</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    /* Use the APP_COLOR environment variable for the background color */
                    background-color: ${appColor};
                    color: #333;
                    text-align: center;
                    padding: 50px;
                    transition: background-color 0.5s;
                }
                .container {
                    background-color: rgba(255, 255, 255, 0.9);
                    padding: 30px;
                    border-radius: 10px;
                    display: inline-block;
                    box-shadow: 0 4px 8px rgba(0,0,0,0.2);
                }
                h1 {
                    /* Change heading color slightly based on background or keep dark */
                    color: ${appColor === 'lightgray' ? '#333' : appColor};
                }
            </style>
        </head>
        <body>
            <div class="container">
                <h1>Kubernetes ConfigMap Integration</h1>
                <hr>
                <h2>Application Mode: <strong>${appMode}</strong></h2>
                <h3>Application Message:</h3>
                <p style="font-size: 20px;"><em>"${appMessage}"</em></p>
                <br>
                <p>Background Color value: ${appColor}</p>
            </div>
        </body>
        </html>
    `;

    res.send(htmlResponse);
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`Ready to receive requests...`);
});
