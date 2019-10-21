/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        it('url defined', function(){
          for(let feed of allFeeds){
            expect(feed.url).toBeDefined();
            expect(feed.url.length).not.toBe(0);
          }
        }) /* loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
         it('name defined', function() {
           for(let feed of allFeeds){
             expect(feed.name).toBeDefined();
             expect(feed.name.length).not.toBe('');
           }
         });/* loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
    });

      describe('The menu', function(){     /*Write a new test suite named "The menu" */
        it('Hidden by default', function(){
          const body = document.querySelector('body');
          expect(body.classList.contains('menu-hidden')).toBe(true);
        });  /*ensures the menu element is hidden by default.*/

        it('menu changes visability', function(){
          const body = document.querySelector('body');
          const menuLink = document.querySelector('.menu-icon-link');
          menuLink.click();
          expect(body.classList.contains('menu-hidden')).toBe(false); //menu displays when clicked
          menuLink.click();
          expect(body.classList.contains('menu-hidden')).toBe(true); //menu hides when clicked a second time
        });
      });

      describe('Initial Entries', function(){

        beforeEach(function(done){
          loadFeed (0, done);
          });

          it('loadfeed function puts .entry element into .feed container', function(){
            const feed = document.querySelector('.feed');
            const entry = document.querySelector('.entry');
            expect(feed.children.length > 0).toBe(true); //feed container has child entry elements after it's finished running
            expect(feed.contains(entry));
        }); //used beforeEach and done() because it's an async function
      });

      describe('New Feed Selection', function(){
        let oldFeed, newFeed;

        beforeEach(function(done){
          loadFeed (0, function(){
            oldFeed=document.querySelector('.feed').innerHTML
            loadFeed(1, function(){
              newFeed = document.querySelector('.feed').innerHTML;
              done();
            })
          });
        }); //beforeEach creates new and old feeds before each subsequent test.
        //beforeEach and done() are used again because it's an async function

          it('content changes on load', function(done){
            expect(oldFeed).not.toEqual(newFeed);
            done();
          })
      })
}());
