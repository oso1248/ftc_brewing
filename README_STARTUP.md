# To Put Into Production Start Up

## Mods To Migration Data

1. [File: brandData.js](data/brandData.js)
   - Block All Module Exports
   - Unblock **methods_cold**
2. [File: brewplan.js](data/brewplan.js)
   - Block All Module Exports
3. [File: commoditiesData.js](data/commoditiesData.js)
   - Block Module Export **mtl_commodidity**
   * Block All Supplier Except **Anheuser Busch**
4. [File: craftInv.js](data/craftInv.js)
   - Block All Module Exports
5. [FIle: matrixData.js](data/matrixData.js)
   - Block All Module Exports
6. [FIle: usersData.js](data/usersData.js)
   - Block All Users Except **ea92284**

## Mods To Knex

1. [File:knexfile.js](knexfile.js)
   - Set Production Pool to Min 10 Max 100

## GIT Terminal Steps

1. Commit Dev Branch with message _Start Of Production_
2. Push Branch dev
3. Switch To Branch master
4. Merge Branch dev To Branch master
5. Push Branch master

## Heroku Deploy

1. Manually Deploy Branch

## Heroku postgres Terminal Commands to Set Timezone

1. heroku pg:psql -a bud-ftc
2. ALTER DATABASE **_database name_** SET timezone = 'America/Boise';
3. \q

## Heroku Config Vars

1.  Set PGSSLMODE Key Value Pair
2.  Set TZ = America/Boise

## Heroku CLI Commands To Run

1. heroku run knex migrate:latest -a bud-ftc
2. heroku run knex seed:run -a bud-ftc
