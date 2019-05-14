# Ask Overflow
### CS 554 Final Project Codebase
***

## Team - 9

* Gabrielle Padriga- 10416101
* Shuangwei Shi - 10427100
* Harish Indalkar - 10441759
* Allan Shivji - 10437270
* Amel George Rathappillil - 10442659

## Project Description

Ask Overflow is the best place to post your questions and get back great answers from highly talented people.
The users can upvote the question if they find its relevant one and do the vice versa. Askoverflow is made with intension to specifically target the questions based on programming language category.

This website is designed specifically for answering and posting technical questions. It’s a website for questions and answers for enthusiastic programmers.

It will allow users to select a particular computer language, then post their erroneous code or doubts on the website along with a picture(if available) of the error message. Other users will be able to comment/answer the posted question, if they are logged in.

Each of the questions will have votes and based on the votes, the sarch mechanism will sort having the highest votes. The users will be able to post a question only if they are logged in and if the user is not logged in, then they will be able to view the question and answers, but not able to post a question. Also users will be able to search for their question through a search bar provided. In addition is the user is logged in and asks the questions and if there are no comments to that posted question then the user has ability to edit that question and delete as well. But, if there are comments then the user cannot edit or delete his question.

Users can also see which programming language has the highest number of questions asked in a bar graph.

## Features:

* Post a question with code
* Upload the image of the error message
* Reply to the posted question
* Vote for the answers
* Search for a particular question and results will be the sorted questions with highest number of votes
* Login using Firebase Authentication (Google Account)
* Receive notification when other user answers to the posted question via E-mail
* Get to know which programming language has highest number of questions asked through a bar graph

## Course Technologies

__React__:
We​​ will ​​use ​​React ​​as ​​our​​ single-page web​ ​application ​​framework.​​We ​​will ​​create components ​​for ​​the ​​elements ​​that ​​we ​​include ​​on ​​our ​​pages.

__Firebase Auth__:
This technology will be used for user authentication. We will use this authentication technology to authenticate users using google account.

__Redis__:
Used to cache recently asked question. When a question is posted it is cached by redis and then stored in mongoDB and the home page shows the cached questions fro redis.


## Independent Technologies

__ImageMagick__:
When a user uploads a picture, server will use ImageMagick to compress the image if the image size is greater then 3MB and store it in mongoDB.

__FuzzySearch__:

We will use FuzzySearch as a search engine to search for the question based on title. Fuzzy Search helps the users to find out the previously asked question without knowing the complete terms. Also the search is sorted and optimized to show the questions having highest numbe of votes.

__D3.js__:
We have used data visualization technology to show which languages have highest number of questions posted through bar graph.

## Steps to run the code
1. Download the folder.
3. Make sure that you have redis, mongoDB running and ImageMagik is installed. (Installation steps for ImageMagick - https://imagemagick.org/script/install-source.php)
2. Navigate to backend folder and run __npm install --save__
3. After that run __npm start__
4. Navigate to tasks folder in another terminal window and run the seed file using command __node seed.js__. This will store data to mongoDB.
5. Navigate to frontend folder on another termminal window and run __npm install --save__  
6. Run command __npm start__
7. This will start the react app in your default browser
8. Now you can start navigating inside the app

(Note - When clciked on social media icon at the footeer make sure that the pop-up blocker of the browser is turned off)
