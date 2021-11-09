# NTU Vote

## Prerequisites
+ PostgreSQL 14 should be installed
+ Nodejs=^16 and npm=^8 should be installed

## Configuration
+ Copy file `ormconfig.json.example` to `ormconfig.json` and configure it to connect to an existing clean database which the user has access to.
+ Schema `ntu_vote` should exist in the database specified in `ormconfig.json`
```
\c *db-name*
CREATE SCHEMA IF NOT EXISTS ntu_vote
```
## Usage(js)
change wildcard pattern extensions in ormconfig.json from `.ts` to `.js` and copy ormconfig.json to dist folder
+ Run ORM migrations
```
npm run typeorm-run
```
+ Transpile ts to js
```
npm run build
```
+ Start server
```
npm run start
```
## Usage(ts)
+ Run ORM migrations
```
npm run typeorm-run
```
+ Transpile ts to js
```
npm run build
```
+ Start server
```
npm run start
```