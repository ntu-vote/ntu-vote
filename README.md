# NTU Vote

## Prerequisites
+ PostgreSQL 14 should be installed
+ Nodejs=^16 and npm=^8 should be installed

## Configuration
+ Copy file `ormconfig.json.ts-example` or `ormconfig.json.js-example`(depending on which method you are using, see details below) to `ormconfig.json` and configure it to connect to an existing clean database which the user has access to.
+ Schema `ntu_vote` should exist in the database specified in `ormconfig.json`
```
\c *db-name*
CREATE SCHEMA IF NOT EXISTS ntu_vote
```
## Usage(js)
Use `ormconfig.json.js-example` as template for `ormconfig.json`
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
Use `ormconfig.json.ts-example` as template for `ormconfig.json`
+ Run ORM migrations
```
npm run typeorm-run
```
+ Start server
```
npm run dev
```