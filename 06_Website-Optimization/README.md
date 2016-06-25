## Website Performance Optimization portfolio project

Project #4 of Udacity's [Front-End Web Developer Nanodegree](https://www.udacity.com/course/front-end-web-developer-nanodegree--nd001). The task was to optimize a provided website with a number of optimization and performance-related issues so that it achieves a target PageSpeed score and runs at 60 frames per second.

### Getting started

#### Live

#### Locally (Mac)

##### Clone the git repository to your local machine:

Open a terminal where you want to clone to on your local machine
then type:

1. Check out the repository
1. To inspect the site on your phone, you can run a local server

  ```bash
  $ cd /path/to/your-project-folder
  $ python -m SimpleHTTPServer 8080
  ```

1. Open a browser and visit localhost:8080
1. Download and install [ngrok](https://ngrok.com/) to the top-level of your project directory to make your local server accessible remotely.

  ``` bash
  $ cd /path/to/your-project-folder
  $ ./ngrok http 8080
  ```

1. Copy the public URL ngrok gives you and try running it through PageSpeed Insights! Optional: [More on integrating ngrok, Grunt and PageSpeed.](http://www.jamescryer.com/2014/06/12/grunt-pagespeed-and-ngrok-locally-testing/)


### Part 1: Optimize the Google PageSpeed Insights Score for index.html

#### `index.html` optimisations :

* css/print --> media = print
* minified & inlined externaly linked but critical fonts, CSS and javascript files.
* `async` attribute for linked javascript files `analytics.js` and `perfmatters.js`.
* minified `index.html` (removed comments & whitespace)
* minified `style.css`, `print.css`, `perfmatters.js`
* image optimization with Photoshop
* small version of pizza.jpg, it was 2048 x 1536, but was resized by CSS to 100 x 75 (original image-size from 2.4 MB reduced to 6 KB)

#### additional `index.html` optimisations :

###### Gzip compression

Enable the [mod_deflate](http://httpd.apache.org/docs/2.2/mod/mod_deflate.html) (gzip) Apache module on the server.

###### Browser Caching

Leveraged [browser caching](https://developers.google.com/speed/docs/insights/LeverageBrowserCaching) by including an [.htaccess](http://httpd.apache.org/docs/2.2/howto/htaccess.html) file in the root of the website. The file contains expires headers, which sets long expiration times for all CSS, JavaScript and images.



## Part 2: Optimize Frames per Second in views/pizza.html & views/js/main.js


**Assignment:
To optimize `views/pizza.html`, you will need to modify `views/js/main.js` until your frames per second rate is 60 fps or higher.**

## `pizza.html` optimisations :
* used 'offline' gulp task `imagesForSite` to build resized and optimized image assets (compressed `.jpg` and `.png` images with alpha).
* minified `bootstrap-grid.css`, `style.css`, `main.js`.
* `async` attribute for linked javascript files `main.js`
* image optimization with Photoshop

## `main.js` optimisations :
most of the optimizations needed to improve the frame per seconds of the `pizza.html` page are within the javascript of `main.js`. See comments in `src/views/js/main.js` for more examples.

* optimized expensive javascript operations and DOM selection calls inside for-loops within functions, to help increase the speed of both the initial `randomPizzas` and `mover` elements being added to the DOM and the  (low frames per second performance) 'janky' resizing and animation.
* reduce of the number of "mover" class objects created from 200 to a smaller amount (approx 30-50) based on the browser window size.
* used style `transformX()` to animate the `mover` class objects as it is a composite-only operation and is GPU accelerated on some browsers.
* added a CSS `will-change: transform` rule to the `mover` class for further look-ahead type browser optimisations.


### Helpful Optimization Tips and Tricks

* [Optimizing Performance](https://developers.google.com/web/fundamentals/performance/ "web performance")
* [Analyzing the Critical Rendering Path](https://developers.google.com/web/fundamentals/performance/critical-rendering-path/analyzing-crp.html "analyzing crp")
* [Optimizing the Critical Rendering Path](https://developers.google.com/web/fundamentals/performance/critical-rendering-path/optimizing-critical-rendering-path.html "optimize the crp!")
* [Avoiding Rendering Blocking CSS](https://developers.google.com/web/fundamentals/performance/critical-rendering-path/render-blocking-css.html "render blocking css")
* [Optimizing JavaScript](https://developers.google.com/web/fundamentals/performance/critical-rendering-path/adding-interactivity-with-javascript.html "javascript")
* [Measuring with Navigation Timing](https://developers.google.com/web/fundamentals/performance/critical-rendering-path/measure-crp.html "nav timing api"). We didn't cover the Navigation Timing API in the first two lessons but it's an incredibly useful tool for automated page profiling. I highly recommend reading.
* <a href="https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/eliminate-downloads.html">The fewer the downloads, the better</a>
* <a href="https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/optimize-encoding-and-transfer.html">Reduce the size of text</a>
* <a href="https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/image-optimization.html">Optimize images</a>
* <a href="https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/http-caching.html">HTTP caching</a>

### Customization with Bootstrap
The portfolio was built on Twitter's <a href="http://getbootstrap.com/">Bootstrap</a> framework. All custom styles are in `dist/css/portfolio.css` in the portfolio repo.

* <a href="http://getbootstrap.com/css/">Bootstrap's CSS Classes</a>
* <a href="http://getbootstrap.com/components/">Bootstrap's Components</a>
