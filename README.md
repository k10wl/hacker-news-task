#Hacker news task \

###This app was build following next requirements: \

* develop an app which makes a request to HackerNews api and lists the result as a table of 3 columns: time added, title and domain
* create a project without CRA (create-react-app)
* use React Hooks
* use 1 helper library besides react
* use any flux-like state management strategy(useReducer hook, flux utilities, context)
* table headers should be clickable and should sort the entries by according column
* upon reaching end of page load new entries using pagination api (infinity scroll)
* entry should be clickable and should lead to HackerNews comments(link)
* implement mobile version which consists of entry title column only (fills screen completely) and has floating sort by date button
* make table adaptive: breakline entries, truncate by ellipsis any overflow that doesn't fit into 3 lines


## How to run app \
`git clone https://github.com/k10wl/hacker-news-task` \
`cd hacker-news-task` \
`npm install` \
`npm run dev`

You can find this app on http://localhost:3000/

##Tech stack: \
`webpack`\
`babel`\
`html-webpack-plugin`\
`style-loader`\
`css-loader`\
`express`\
`react`\
`react-router-dom`
