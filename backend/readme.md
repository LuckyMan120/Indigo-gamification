# ReadMe for the backend server portion of this project

## Local Dev Environment Setup

### Prerequisites
- Node
- Docker Desktop
- Pull down the code repo
- cd backend
- npm install

### Environment Variables
The following envrionment variables should be set:
- NODE_ENV=development
- DEV_DB_HOSTNAME=localhost
- DEV_DB_PORT=1433
- DEV_DB_NAME=my_local_db
- DEV_DB_USERNAME=sa
- DEV_DB_PASSWORD=my_password
- JWT_TOKEN_SECRET=mylongrandomtoken

#### To generate a long random token, run from dynamic node repl:
$ require('crypto').randomBytes(64).toString('hex')


### Start local SQL Server inside a Docker container
- npm run dev-db-up

### DB Setup
- npx sequelize-cli db:create
- npx sequelize-cli db:migrate
- npx sequelize-cli db:seed:all

### Execute in dev environment
- npm run dev

### Stop local SQL Server running inside a Docker container
- npm run dev-db-down

## Endpoints
The following endpoints are part of this project:

- POST /api/Register
Creates a new GameUser. Adds a JWT cookie for the rest of the api calls

- GET /api/Badge
Returns the list of Badges for the game

- GET /api/Question
Returns the list of questions for the game plus if the GameUser has answered the question

- GET /api/GameUser
Returns the details about a GameUser

- PUT /api/GameUser
Updates an existing GameUser

- GET /api/BadgesEarned
Returns the list of Badges a GameUser has earned

- POST /api/BadgesEarned/{badge_id}
Records that a GameUser has earned a specific Badge

- GET /api/GameUserResponse
Returns the list of Questions that a GameUser has answered

- POST /api/GameUserResponse/{question_id}
Saves a GameUser's answer to a question. If the row isn't present, it is created, if it is present, it is updated.

- GET /api/Leaderboard
Returns the Leaderboard of top 100 GameUsers based on point_total and when they answered plus the rank of the GameUser. If the GameUser isn't in the top list, they are added to the list at the end.
