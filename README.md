# React & Material UI NPM package boilerplate

A shareable Material UI component library with a playground folder to live-test components as you are developing them.

## Technologies used

 - React
 - Rollup
 - Material UI
   - To Add
     - Prettier
     - Lint
     - Husky
  

## Steps to bring the functional components to the UI Builder

  1. Create the functional component
  2. Export the component in the index.js file
     1. ``` export { default as CustLayout } from './components/layout' ```
  3. Run & test the functional component with the help of the playground project
  4. After testing, publish the npm package with the proper versioning
  5. Next, add the component JSON in the DB( ArangoDB) (Details Given Below)
  6. To show the component in the UI Builder, the package needs to be added to the UI Builder code, so contact the UI Builder team. (This is only required for newly created package, after that it won't be required)


## Functional Component Structure

```jsx
import React from 'react';
import Typography from '@material-ui/core/Typography';

function HelloWorld(props) {
    const {name}=props;
    return <Typography>Hello {name}</Typography>
}

HelloWorld.defaultProps={
    name:"React & Material UI NPM package boilerplate"
}

export default HelloWorld;

```


## Component Sample JSON to put in ArangoDB to show the component in UI Builder

```JSON
{
  "componentName": "CustLayout",
  "componentId": "cmuc-comp-1",
  "frameWork": "custom-material-ui-component",
  "componentType": "Layout",
  "isLayout": true,
  "supported": [
    "web"
  ],
  "defaultProps": {
    "childComponent": true
  },
  "props": {
    "ProjectTitle": {
      "componentToRender": "messageCatalog"
    },
    "VersionNo": {
      "componentToRender": "text"
    },
    "Title": {
      "componentToRender": "messageCatalog"
    },
    "SubTitle": {
      "componentToRender": "text"
    },
    "ImageSrc": {
      "componentToRender": "imageUpload"
    },
    "HeaderBackgroundColor": {
      "componentToRender": "text"
    },
    "HeaderFontColor": {
      "componentToRender": "text"
    },
    "Header": {
      "componentToRender": "select",
      "options": [
        true,
        false
      ]
    },
    "Transtale": {
      "componentToRender": "select",
      "options": [
        true,
        false
      ]
    },
    "Menu": {
      "componentToRender": "select",
      "options": [
        true,
        false
      ]
    },
    "Language": {
      "componentToRender": "multiSelect",
      "options": []
    },
    "childComponent": {
      "componentToRender": "select",
      "options": [
        true,
        false
      ]
    },
    "navBarType": {
      "componentToRender": "select",
      "options": [
        "Normal",
        "Nested"
      ]
    },
    "pages": {
      "componentToRender": "pageSelect",
      "value": [
        {
          "name": {
            "componentToRender": "text"
          },
          "page": {
            "componentToRender": "text"
          },
          "childPageSelect": {
            "componentToRender": "childPageSelect"
          }
        }
      ]
    }
  },
  "active": true
}
```

## Function Component Sample JSON Explanation

```JSON
{
  "componentName": "CustLayout", //component Name
  "componentId": "cmuc-comp-1", // packagename(fullname or shortform in kebab case) +  Unique Id (Serial No)
  "frameWork": "functional-components-boilerplate", //Package Name
  "componentType": "Layout", // Possible Values ["Lab","Layout","Data Display","Lab","Inputs","Surfaces"]. Refer UI Builder 
  "isLayout": false, // For custom components isLayout always will be false
  "supported": [
    "web"
  ],  // Default web
  "defaultProps": {
    "childComponent": true
  }, // Pass the default props of the component
  "props": {

    // Basic Structure
    "key":{
    "componentToRender":"text" // This is for the UI Builder. It will render the property with the componentToRender type like text ,select, etc.. in the properties panel
    }
    //Possible Values for componentToRender ["text","number", "messageCatalog","select","icons","imageUpload","component","pageSelect","NestedNav","arrayOfObject","freeMultiSelect","multiSelect"];

    //For More details contact the UI Builder Team

    //Examples

    "ProjectTitle": {
      "componentToRender": "messageCatalog"
    },
    "VersionNo": {
      "componentToRender": "text"
    },
    "Title": {
      "componentToRender": "messageCatalog"
    },
    "SubTitle": {
      "componentToRender": "text"
    },
    "ImageSrc": {
      "componentToRender": "imageUpload"
    },
    "HeaderBackgroundColor": {
      "componentToRender": "text"
    },
    "HeaderFontColor": {
      "componentToRender": "text"
    },
    "Header": {
      "componentToRender": "select",
      "options": [
        true,
        false
      ]
    },
    "Transtale": {
      "componentToRender": "select",
      "options": [
        true,
        false
      ]
    },
    "Menu": {
      "componentToRender": "select",
      "options": [
        true,
        false
      ]
    },
    "Language": {
      "componentToRender": "multiSelect",
      "options": []
    },
    "childComponent": {
      "componentToRender": "select",
      "options": [
        true,
        false
      ]
    },
    "navBarType": {
      "componentToRender": "select",
      "options": [
        "Normal",
        "Nested"
      ]
    },
    "pages": {
      "componentToRender": "pageSelect",
      "value": [
        {
          "name": {
            "componentToRender": "text"
          },
          "page": {
            "componentToRender": "text"
          },
          "childPageSelect": {
            "componentToRender": "childPageSelect"
          }
        }
      ]
    }
  },
  "active": true // When false the component will not be shown in the UI Builder
}
```

## Available Scripts

```JSON
    "build": "rollup -c", // To build the package
    "start": "rollup -c -w", // To build & watch the package
    "start-playground": "cd playground && npm run start", // To start the playground
    "i-all": "npm i && cd playground && npm i", // To the install the dependencies after cloning this boilerplate
    "dev": "npm-run-all --parallel start start-playground" // To run both the package & playground project

```

## To package and test the created component in the playground Project

1. Run ```npm run dev``` to live-test the components 


## To package and test the created component in a external react project 

To bundle and test in local follow below steps.  Make sure you have run the npm run build command or npm start before testing.

1. Run npm link. It will create a symlink in the global folder file.

2. Then go the project you want to use the package. And run the below command 
npm link packagename(functional-components-boilerplate).

The above command just include the functional-components-boilerplate in the node_modules (not add anything in package.json).

```jsx
import React from 'react';

import { HelloWorld } from 'functional-components-boilerplate';

const App = () => {
    return <HelloWorld />
}

export default App;

```

## To publish the package to NPM

To publish the package to NPM follow the below setps

1. First, build and commit the library  
    ```npm run build```
    ```git add .```
    ```git commit -m 'your commit message'```
2. Then update the version of the package  
   1. ```npm version patch``` - For a bug fix  
   2. ```npm version minor``` - For a new component addition  
   3. ```npm version major``` - For a completed feature.
3. Then login to the NPM account using the below command (ignore if you already logged in) ```npm login```  It asks the NPM credentials
4. Finally run  ```npm publish --access public``` to publish
5. Then, login into the NPM site and check the version update there.

For further more details refere the below link
[How to create,test and publish a NPM package in react.](https://gitlab.com/snippets/1995604)



## Requirements Status
 - [x] Boilerplate Setup with playground
 - [ ] Using components styles from the theme setup 
 - [ ] Access control for the components
 - [ ] Multilingual setup for the components
  

## Changelog

### 14-06-22
- Boiler Plate created
- Basic instructions to use this boilerplate (README.md) added