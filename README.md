# Survey

For my user research project last semester I developed a website on which I started a survey. I programmed this website using a framework (Angular) in HTML, Typescript and SCSS. To store the data, I wrote a small API myself, which consisted of PHP files. The questions for the surveys were displayed dynamically from a JSON file. The answers were stored in a MySQL database. 
Because the survey should be filled out only once, I generated a token in the API when opening the survey and saved it in the database as well as in the browser session. If the survey results were sent to the database, the token was declared as "used". If the user wanted to open the survey again, there was a notification that the completion was only possible once.

### Tech

* Angular 
* Ionic 5
* PHP
* MySQL DB

### Installation

```sh
# Clone the repository
git clone https://github.com/ilapinski/rwd_survey.git

npm install

ionic serve
```

For production environments...

```sh
# Clone the repository
git clone https://github.com/ilapinski/rwd_survey.git

npm install

ionic build
```

