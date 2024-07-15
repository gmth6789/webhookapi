router.get('/', async (ctx) => {
    ctx.body = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Nanogen site</title>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.4.1/semantic.min.css">
        <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    </head>
    <body>
        <div class="ui container">
            <header>
                <h1>Welcome to Nanogen site</h1>
            </header>
            <main>
                <div class="ui form">
                    <div class="field">
                        <label>Access Token</label>
                        <input type="text" id="accessTokenField" placeholder="Access Token">
                    </div>
                    <button class="ui button" id="verifyButton">Verify</button>
                    <div class="field">
                        <label>URL</label>
                        <input type="text" id="url" placeholder="URL">
                    </div>
                    <div class="inline fields">
                        <label for="type">View Type</label>
                        <div class="field">
                            <div class="ui radio checkbox">
                                <input type="radio" name="type" id="tall" checked>
                                <label>Tall</label>
                            </div>
                        </div>
                        <div class="field">
                            <div class="ui radio checkbox">
                                <input type="radio" name="type" id="compact">
                                <label>Compact</label>
                            </div>
                        </div>
                    </div>
                    <div class="field">
                        <div class="ui checkbox">
                            <input type="checkbox" id="useBle">
                            <label>Use BLE</label>
                        </div>
                    </div>
                    <button class="ui button" id="addLiff">Add LIFF</button>
                </div>
                <div id="cards" class="ui cards"></div>
                <div id="links"></div>
            </main>
            <footer>
                <p>&copy; 2024 Nanogen site</p>
            </footer>
        </div>
        <script src="https://static.line-scdn.net/liff/edge/2/sdk.js"></script>
        <script type="module" src="/js/main.js"></script>
    </body>
    </html>`;
});

router.get('/dashboard', async (ctx) => {
    ctx.body = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Nanogen site - Dashboard</title>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.4.1/semantic.min.css">
        <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    </head>
    <body>
        <div class="ui sidebar inverted vertical menu">
            <a class="item" href="/">Home</a>
            <a class="item" href="/dashboard">Dashboard</a>
        </div>
        <div class="pusher">
            <div class="ui container">
                <header>
                    <h1>Dashboard - Nanogen site</h1>
                </header>
                <main>
                    <div class="ui form">
                        <div class="field">
                            <label>Dashboard Content</label>
                            <input type="text" placeholder="Dashboard Input">
                        </div>
                        <button class="ui button">Submit</button>
                    </div>
                    <div id="dashboard-content">
                        <!-- Dashboard specific content goes here -->
                    </div>
                </main>
                <footer>
                    <p>&copy; 2024 Nanogen site</p>
                </footer>
            </div>
        </div>
        <script src="https://static.line-scdn.net/liff/edge/2/sdk.js"></script>
        <script type="module" src="/js/dashboard.js"></script>
    </body>
    </html>`;
});

// Webhook to handle LINE events
router.post('/webhook', async (ctx) => {
    const events = ctx.request.body.events;
    for (let event of events) {
        if (event.type === 'message' && event.message.type === 'text') {
            const userId = event.source.userId;
            const userMessage = event.message.text;

            // Handle message, you can also store it in Dexie or process as needed
            console.log(`Received message from ${userId}: ${userMessage}`);

            // Reply to the user
            await axios.post('https://api.line.me/v2/bot/message/reply', {
                replyToken: event.replyToken,
                messages: [{ type: 'text', text: `You said: ${userMessage}` }]
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer YOUR_CHANNEL_ACCESS_TOKEN`
                }
            });
        }
    }
    ctx.status = 200;
});

app.use(router.routes()).use(router.allowedMethods());

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});