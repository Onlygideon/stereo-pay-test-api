# Stereo Pay Test API
## This is the solution to stereo pay backend task using NestJs, TypeOrm, MySql and Postman for API testing.

## Summary
### This Rest API helps to manage media objects. This API contain endpoints with the following fuctionalities:
### 1. Upload Media (audio or songs), save objects in mySql db and store the uploaded media using the file system.
### 2. Paginate and Fetch all media objects
### 3. Fetch a single media object using id
### 4. Search media objects by title and description
### 5. Fetch and Update the status field of the media object using the id
### 6. Soft delete the media object using the id

## Postman Documentation
https://documenter.getpostman.com/view/15715947/2s93JzMLpG

# Guidelines on how to build and run this REST API

## first step
git clone this repository

## Next: Installation of dependencies
$ npm install

## Next: run the nySql database and CREATE DATABASE stereo_media
### After installin MySql on pc, you can do this with 2 methods:
### 1. run XAMPP control panel and run mySql server with the admin (phpAdmin) active. you can create the database stereo_media through the admin
### 2. run mySql on commandline and login with username and password then run CREATE DATABASE stereo_media

## Next: run migration script
### When mySql database (stereo_media) is runnning, run $ npm migration:run

## Next: Create upload directory for storing uploaded medias (songs or images)
### create a folder in the src directory called uploads then create another folder inside the uploads folder called media

## Next: Running the app
### $ npm run start:dev



