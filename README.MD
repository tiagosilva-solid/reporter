# Reporter

### 1. create the following env vars on Postman

```
report: "true"
reporter_path: http://localhost:3017
```

add the following on the colection test tab after function setTestStatus()
```
// Reporter
if (pm.variables.get('report') == "true") {
    pm.sendRequest({
        url: `${pm.variables.get('reporter_path')}/report/${schema_name}`,
        method: 'POST',
        header: {
            'Content-Type':'application/json'
        },
        body: {
            mode: 'raw',
            raw: {
                "request": {
                    "requestType": pm.request.method,
                    "requestEndpoint": pm.variables.get('host') + pm.request.url.getPath(),
                    "requestHeaders": pm.request.getHeaders(),
                    "requestBody": pm.request.body
                },
                "response": {
                    "responseHeaders": pm.response.headers,
                    "responseBody": response_body,
                    "statusCode": pm.response.code
                },
                "schemasErrors": schema_errors
            }
        }
    }, (err, res) => {
        pm.test(`Reporter`, () => {
            pm.expect(res.code).to.eq(200);
        });
    });
}
```

### 2. Running
node version:
```
> v14.13.1
```
npm version:
```
> 6.14.8
```
running locally:
```
> npm start
```

build docker image "reporter"
> docker build . -t reporter

run docker container "reporter"
-d -> detached - runs on background
-it -> interactive mode
-p -> ports origin:end
> docker run -d -p 3017:3017 reporter


Make your requests and hit SEND on postman.
Check the reports folder for the recordings.

You're welcome 😀
