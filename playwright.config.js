module.exports = {
    timeout: 60000,
    testDir: './tests',
    use: {
      headless: true, // Change to false if you want to see tests running
      viewport: { width: 1280, height: 720 },
      video: 'retain-on-failure', //Save video if the test fails
      trace: 'on-first-retry', //Create trace if there is fails
    },
    projects: [
      {
        name: 'chromium',
        use: { browserName: 'chromium' },
      },
      {
        name: 'firefox',
        use: { browserName: 'firefox' },
      },
      {
        name: 'webkit',
        use: { browserName: 'webkit' },
      },
    ],
  };
  