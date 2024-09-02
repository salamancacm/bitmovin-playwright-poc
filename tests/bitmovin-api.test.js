const { test, expect } = require('@playwright/test');

test.describe('Bitmovin Player POC', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:8080/bitmovin-player.html'); // Local server

    // Wait for the player to be available on the page
    await page.waitForFunction(() => window.player !== undefined);
  });

  test('Play and Pause Video', async ({ page }) => {
    await page.evaluate(() => window.player.play());
    await page.waitForTimeout(2000); // Wait for one second to ensure the video starts playing

    // Check that the video is playing
    const isPlaying = await page.evaluate(() => window.player.isPlaying());
    expect(isPlaying).toBe(true);

    // Pause the video
    await page.evaluate(() => window.player.pause());

    // Check that the video is paused
    const isPaused = await page.evaluate(() => window.player.isPaused());
    expect(isPaused).toBe(true);
  });

  test('Change Volume and Mute/Unmute', async ({ page }) => {
    // Mute the video
    await page.evaluate(() => window.player.mute());

    // Check that the video is muted
    const isMuted = await page.evaluate(() => window.player.isMuted());
    expect(isMuted).toBe(true);

    // Unmute the video
    await page.evaluate(() => window.player.unmute());

    // Check that the video is unmuted
    const isUnmuted = await page.evaluate(() => !window.player.isMuted());
    expect(isUnmuted).toBe(true);

    // Change the volume
    await page.evaluate(() => window.player.setVolume(0.5)); // Set volume to 50%

    // Check that the volume has changed
    const volume = await page.evaluate(() => window.player.getVolume());
    expect(volume).toBe(0.5);
  });

  test('Toggle Picture-in-Picture Mode', async ({ page }) => {
    await page.evaluate(() => window.player.setViewMode(window.bitmovin.player.ViewMode.PictureInPicture));

    // Check that Picture-in-Picture mode is enabled
    const isInPip = await page.evaluate(() => window.player.getViewMode() === window.bitmovin.player.ViewMode.PictureInPicture);
    expect(isInPip).toBe(true);

    // Exit Picture-in-Picture mode
    await page.evaluate(() => window.player.setViewMode(window.bitmovin.player.ViewMode.Inline));

    // Check that Picture-in-Picture mode is disabled
    const isNotInPip = await page.evaluate(() => window.player.getViewMode() !== window.bitmovin.player.ViewMode.PictureInPicture);
    expect(isNotInPip).toBe(true);
  });

  test('Change Playback Speed', async ({ page }) => {
    // Change the playback speed
    await page.evaluate(() => window.player.setPlaybackSpeed(1.5));

    // Check that the playback speed has changed to 1.5x
    const playbackRate = await page.evaluate(() => window.player.getPlaybackSpeed());
    expect(playbackRate).toBe(1.5);
  });

  test('Toggle Fullscreen Mode', async ({ page }) => {
    await page.evaluate(() => {
      window.player.setViewMode(window.bitmovin.player.ViewMode.Fullscreen);
    });
  
    // Wait a moment to ensure the fullscreen transition is complete
    await page.waitForTimeout(1000);
  
    // Check that the player is in fullscreen mode
    const isFullscreen = await page.evaluate(() => {
      return window.player.getViewMode() === window.bitmovin.player.ViewMode.Fullscreen;
    });
    expect(isFullscreen).toBe(true);
  
    // Exit fullscreen mode
    await page.evaluate(() => {
      window.player.setViewMode(window.bitmovin.player.ViewMode.Inline);
    });
  
    // Wait a moment to ensure the fullscreen exit transition is complete
    await page.waitForTimeout(1000);
  
    // Check that the player is no longer in fullscreen mode
    const isNotFullscreen = await page.evaluate(() => {
      return window.player.getViewMode() === window.bitmovin.player.ViewMode.Inline;
    });
    expect(isNotFullscreen).toBe(true);
  });
  
  
  

  test('Get Video Duration', async ({ page }) => {
    await page.waitForFunction(() => window.player.isPlaying());
  
    // Wait for the duration to be available (may need to wait for metadata to load)
    const duration = await page.evaluate(() => {
      return new Promise(resolve => {
        const checkDuration = () => {
          const duration = window.player.getDuration();
          if (duration > 0) {
            resolve(duration);
          } else {
            // If duration is not available, retry after a short delay
            setTimeout(checkDuration, 1000);
          }
        };
        checkDuration();
      });
    });
  
    // Check that the duration is greater than zero (video is loaded)
    expect(duration).toBeGreaterThan(0);
  });
  

});
