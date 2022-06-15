# IDM

## Permission List structure

```js

let permission_list = [
    {
        unique_id : ""
    }
]

```

 
## Store the permission list to the localStorage with permissionData as a keyName during the time of login

```jsx
import { checkWithCasbian } from "<%>path<%>/permissionHandler" // casbian file path
useEffect(() => {
    // function call
    
    let permissionList = await checkWithCasbian([uniqueIds]) // page unique ids
    // return only enabled unique ids from admin
}, [])

```


## PermissionHandler.js -  seperate file ( file content will be changed based on the permission list )

```js
const casbinjs = require("casbin.js");
const permissionJson = (funName = []) => {
    let pj = localStorage.getItem("permissionData");
    pj = JSON.parse(atob(pj))
    let returnJson = {
        read: [],
        write: []
    }
    funName.map(val => {
        pj.map(vl => {
            if (vl.unique_id === val) {
                returnJson.read.push(vl.unique_id)
            }
        })
    })
    return returnJson;
}
```

```js
export const checkWithCasbian = (funName = []) => {
    let permission = permissionJson(funName)
    const authorizer = new casbinjs.Authorizer("manual", permission);
    authorizer.setPermission(permission);
    let readList = await Promise.all(funName.map(async (val) => {
        return await new Promise(async (resolve, reject) => {
            let isread = await authorizer.can("read", val);
            resolve({ [val]: isread })
        })
    }))
    let readData = []
    readList.map(val => {
        let key = Object.keys(val)[0]
        if (val[key]) {
            readData.push(key)
        }
    })
    return readData
}

```