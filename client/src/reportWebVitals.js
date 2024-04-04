/**
 * reportWebVitals.js
 * 
 * This is a JavaScript module that exports a function to report web vitals. Web vitals are a set of metrics that measure the speed and user experience of a web application.
 * 
 * The `reportWebVitals` function takes an `onPerfEntry` callback function. If `onPerfEntry` is provided and is a function, the `web-vitals` module is imported dynamically. The `getCLS`, `getFID`, `getFCP`, `getLCP`, and `getTTFB` functions from the `web-vitals` module are then called with `onPerfEntry`.
 * 
 * The `getCLS` function measures the Cumulative Layout Shift (CLS) of the application. CLS measures the sum of all individual layout shift scores for every unexpected layout shift that occurs during the entire lifespan of the page.
 * 
 * The `getFID` function measures the First Input Delay (FID) of the application. FID measures the time from when a user first interacts with a page to the time when the browser is actually able to begin processing event handlers in response to that interaction.
 * 
 * The `getFCP` function measures the First Contentful Paint (FCP) of the application. FCP measures the time from when the page starts loading to when any part of the page's content is rendered on the screen.
 * 
 * The `getLCP` function measures the Largest Contentful Paint (LCP) of the application. LCP measures the render time of the largest image or text block visible within the viewport.
 * 
 * The `getTTFB` function measures the Time to First Byte (TTFB) of the application. TTFB measures the time from when the page starts loading to when the first byte of data is received.
 * 
 * @module reportWebVitals
 */

const reportWebVitals = onPerfEntry => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      getCLS(onPerfEntry);
      getFID(onPerfEntry);
      getFCP(onPerfEntry);
      getLCP(onPerfEntry);
      getTTFB(onPerfEntry);
    });
  }
};

export default reportWebVitals;
