# fis3-deploy-gfe-script-inbottom
fis3-deploy-gfe-script-inbottom


## INSTALL

```bash
npm install [-g] fis3-deploy-script-inbottom
```

## USE

```js
fis.match('**', {
    deploy: [
        fis.plugin('gfe-script-inbottom'),
        fis.plugin('local-deliver') //must add a deliver, such as http-push, local-deliver
    ]
});
```