# cs3-1st-qtr-project
This is a project I have for Computer Science 3. This is a website called "climate-post". It is a website that focuses on spreading awareness on issues on the climate. Note that this project makes use of NodeJS for routing, and so **simply opening the html files will not work**. Instead, please go to [this link](https://climate-post.herokuapp.com/). Also, please note that the folder structure may not necessarily mirror the routes on the website.

I put all of the necessary files inside the "PotassiumDeVera1stQtr" folder. Anything outside the src folder is back-end code.

## Tech Stack
This project makes use of:
* NodeJS for the backend
* A custom components library (this allows me to reuse components such as headers in different pages of the website)
* TypeScript for client and server side scripting

## Possible Questions
I will go over some possible questions that you may have about this project. Hopefully this may clarify possible confusions.

### Can I open the html files directly using my own computer?
Since the project uses a custom back-end, simply opening the html files will **not** work. The back-end is there to help in resolving requests.

I recommend going to [https://climate-post.herokuapp.com/](https://climate-post.herokuapp.com/) to preview the output and then just look at the source code in GitHub ([https://github.com/RedBlazerFlame/cs3-1st-qtr-project](https://github.com/RedBlazerFlame/cs3-1st-qtr-project)).

### Why do the HTML files in the htdocs/articles folder not have a head, body, or DOCTYPE?
Good question! The reason behind that is that the files in the htdocs/articles folder is injected into the /article page. They are not meant to be viewed independently. I decided to use JavaScript to inject the code into the /article page because most of the article pages will have a similar structure. Doing it this way will prevent possible code duplication.

TL;DR this was a deliberate decision. The HTML files without a head, body, or DOCTYPE are inserted into another HTML file that does have a head, body, and DOCTYPE.
### Who created the website icon?
I created the website icon using Figma

### What are .ts and .js files?
.ts and .js files are TypeScript and JavaScript files, respectively. JavaScript is used for scripting on the web, while TypeScript is a strongly typed language that compiles to JavaScript. I recommend viewing the .ts files instead of the .js files when reviewing the code because the js file contains some polyfills (inserted by TypeScript) and does not contain any comments.

### What is a .json file?
.json file (JavaScript Object Notation files) are files that contain data. They can be easily processed by JavaScript, which is why I decided to use them for the project.

### What is the "custom components" library?
The custom components library is a small lightweight library that allows me to reuse components in different parts of the website. For example, the headers and footers are stored as components instead of html files. You can find the components in the "components" folder. The components are stored in ".ts" (TypeScript) files. The ".js" (JavaScript) files are the compiled versions of the ".ts" files.

So far, there are 4 components:
1. The Header Component
1. The ImageHeader Component
1. The ArticlePreview Component
1. The Footer Component

The Header Component (Header.ts) is the one that contains the website title and a searchbar.
The ImageHeader Component (ImageHeader.ts) is the one that contains the big image at the top of the page.
The Footer Component (Footer.ts) is, as the name suggests, the footer of the site.
The ArticlePreview Component (ArticlePreview.ts) contains the article previews that you see in the home page.

I will point out that there are good libraries such as [**React**](https://reactjs.org/) that make use of components; however, for this project, I decided not to use these libraries as it would overcomplicate the project. These libraries
also tend to be heavy and slow.

### Why are there some ".module.css" files in the "css" folder?
These ".module.css" files are css files that apply to a **specific component only**.
These files help declutter the other css files. Big css files tend to be difficult to maintain.
By splitting the css into different files based on its function, we can practice **[Separation of concerns](https://en.wikipedia.org/wiki/Separation_of_concerns)**.


## Possible Criticisms
I will end by pointing out that these decisions are not perfect. If you have any criticisms about my decisions, go ahead and raise them! It would also give me an idea on what I need to improve on.

Thanks for reading through all of this... You are a wonderful person! 😊