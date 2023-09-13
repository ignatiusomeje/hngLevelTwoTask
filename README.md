# CRUD REST API 
This is a CRUD Rest API built with the NodeJS. It's a simple CRUD API that Creates, Reads, Updates and Deletes a person's name. 

It uses a Document/NOSQL database, specifically MongoDB. 

It accepts and returns data in the `application/json` content-type. 

## Setup

The API can be set up locally by cloning this repository and running the 
```NodeJs
Npm install
```
 to install all the dependencies. 

 In order to run the NodeJs app locally. Run the following command

```NOdeJs
node server.js
```

## API Url
`https://hngxtask1api.onrender.com/api`
    
## API Endpoints

### POST/CREATE - create a specific person resource.
`POST` - `/api/`

A POST request that creates a person instance. The body is sent as an `application/json` with the `name` and it's value as the json key . For example 
```Nodejs
{
  "name" : "Hadassah"
}
```
the response will be something like
```NodeJs
{
  "_id": "6500a9e5f9fe9f93529f585f",
  "name": "Hadassah"
}
```
`NOTE`: 

if an error was encountered while creating the user you will get a 400 status code with the error message.

### GET - Get a specific person resource by Id
`GET` - `/api/user_id` 

Gets a person in the databasase with the user's id. The endpoint receives a get request and returns the person that has the id in the database.
For example
```NodeJs
{
  "_id": "6500a9e5f9fe9f93529f585f",
  "name": "Hadassah"
}
```  

### UPDATE - Update a specific person resource 

`PUT` - `/api/user_id` 

A PUT request that updates an existing Person resource. A path parameter is required to as it specifies the user's id of the existing 
resource. The user's id is used to sort out the user from the DataBase which is now sent to the client. The Body will have something like this where the new name is given:
```Nodejs
{
  "name" : "Esther"
}
```
The response will be like
```NodeJs
{
  "_id": "6500a9e5f9fe9f93529f585f",
  "name": "Esther"
}
```  

`NOTE`: 

if user's id is not valid, it will show a `400` status code with the message `"Invalid Request Parameter"`

if the user's id is valid but the person is not found it will give you a `404` status code with the message `Not Found` 

### DELETE - Delete a specific person resource

`DELETE` - `/api/user_id`  

A path parameter is required as it specifies the user's id of the existing resource. If there's no existing resource, it returns an error of 404 stating no resource is found else the response will be:
```NodeJs
{
  "_id": "6500a9e5f9fe9f93529f585f",
  "name": "Hadassah"
}
```
`NOTE`: 

if user's id is not valid, it will show a `400` status code with the message `"Invalid Request Parameter"`

if the user's id is valid but the person is not found it will give you a `404` status code with the message `Not Found`


  
