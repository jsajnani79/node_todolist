# node_todolist
Todo List WebApp made using node.js, express, and backbone

###Usage:

* Install Node Module Dependencies
```
npm i
```
* Setup an Environment File in the root directory. An environment file MUST exist for the app to run.
We use the [dotenv](https://github.com/bkeepers/dotenv) package to manage environment variables.
A sample .env file is follows. The default port is 3000.
```
PORT=8000
```

###Features:
* From the index, click the CREATE button to start a new To-Do list. 
* On your new To-Do list, edit the title by double-clicking the current title and adding in your desired title and proceeding to click ENTER.
* Add new to-do items by typing in the input field and hitting ENTER. 
* Each item can be checked if it was completed. Task items can also be edited with a double click and ENTER. 
* To delete a task, double click it to edit, remove all text, and hit ENTER.
* It is not possible to delete a list, or to save a list with no tasks.

###Deviations:
Included the ability to edit list items, remove list items, and edit the name of a list. 
Added a directory page from which it is easy to navigate to previously created lists or create a new list.

