# Help

Its a social welfare app build specially for girls so that they can get help in case for any inappropriate situation they might get into.

Make sure you have docker installed in system. There is a script file `./help.sh` that contains command to run containers.

Steps to run:
- Create a `config.json` file in `src/server/config` folder and update your postgresql credentials for sequelize with the same format as in `src/server/config/config.example.json`.

- Update your API key in `server.js` file to interact with Map My India APIs.

- From the project's root folder, run command `./help.sh` to start docker containers.

- Route to `http://localhost:3000`. You should be presented with a dashboard with MapMyIndiaMap with default coordinates set in pune. 