# prisma

STEP 1 : npm init -y

STEP 2 : npm i --save-dev prisma typescript ts-node @types/node nodemon

STEP 3 : npx prisma init --datasource-provider postgresql

<!-- STEP 4 : npx prisma format // IF WE WANT TO MANULA FORMAT -->

STEP 4 : npx prisma migrate dev --name init // IF WE WANT TO MENSTION NAME TOO

STEP 5 : npm i @prisma/client


One-many 
User-Post

many-to-many
Category-Post

one-to-one


npx prisma init

or

npx prisma init --datasource-provider postgresql

---

#to Format
npx prisma format

---

# to create migration

npx prisma migrate dev --name init

npm i @prisma/client
