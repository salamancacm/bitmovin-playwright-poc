# Bitmovin Player Playwright POC

This is a Proof of Concept (POC) to demonstrate how to test various functionalities of the Bitmovin Player using its API via Playwright.

## Prerequisites

- **Node.js** (v14 or higher)
- **NPM** or **Yarn**

## Project Setup

### 1. Clone the Repository

First, clone this repository to your local machine:

```bash
git clone https://github.com/salamancacm/bitmovin-playwright-poc.git
cd bitmovin-playwright-poc
```

### 2. Install Dependencies
```bash
npm install
```
This will install Playwright and any other required packages.

## Running the Tests

### 1. Serve the HTML File
To run the tests, you need to serve the bitmovin-player.html file on a local server. The simplest way to do this is by using http-server, a lightweight HTTP server that you can install globally with npm.

#### Install http-server
If you haven't already installed http-server, you can do so by running:

```bash
npm install -g http-server
```

#### Serve the HTML File
Navigate to the public directory where the bitmovin-player.html file is located:
```bash
cd public
```
Start the server by running:
```bash
http-server
```
By default, this will serve the contents of the public directory at http://localhost:8080.

### 2. Run Playwright Tests
Now that the HTML file is being served, you can run the Playwright tests. Navigate back to the root directory of your project:
```bash
cd ..
```
Or you can just open a new terminal

Run the tests using the following command:
```bash
npx playwright install
```
```bash
npm test
```

# Troubleshooting
## Common Issues
Port Conflicts: If http-server fails to start, it might be because port 8080 is already in use. You can start http-server on a different port using the -p flag:
```bash
http-server -p 9090
```



