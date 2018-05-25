mongoscraper
============

UCF Full Stack Bootcamp Week 10, Mongo scraper

\*\* \*\* \*\*

This seems like a simple project & in fast each individual step is quite
do-able.

1.  Create Mondo Database : scraper,

    1.  Collection named scrapedData

        1.  articleTitle,

        2.  articleURL

        3.  articleSummary

2.  There are multiple ways to account for comments but I felt a 2nd database
    with a pointer (or Foreign Key in mySQL terminology) would be the easiest to
    manage. The second Mongo database: scrapeUsers

    1.  Collection named: scrapeComments:

        1.  userComment

        2.  userArticleID

3.  set up & execute scrape –eventually settled on worldrugby.com which is the
    one thing I was able to actually get working on this project.

4.  Set up a route to push scraped data into scraper /scrapedData database.

5.  Set up a route to push scraped date onto web page:Title, URL & Summary.

    1.  Follow this with a search through the comment database & driving each
        comment with an ID matching the article.

6.  Web page set up with HTML /Bootstrap via handlebars.

7.  Once those are working add a comment section under each article and accept
    user input.

    1.  If each user has the ability to delete or modify their comments, this
        requires some mechanism to log users in & restric

8.  As each comment arrives, drive it into to the database & make room for
    another comment below it.

9.  Additional steps to index comments on commentsdb database to the respective
    articles in scraper_db. When the article no longer shows up on the scrape,
    the comment is not deleted.

10. Build a for each into the handlebars to display a pre-determined number of
    articles on the page without writing more code.

11. Search key can be made active with “s=”\<search term\>” added to the end of
    the URL.

,,,, many more steps to be documented…
