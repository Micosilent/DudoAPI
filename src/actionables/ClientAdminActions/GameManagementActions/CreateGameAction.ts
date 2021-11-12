import { Game } from "../../../gameData/Game";
import { ServerData } from "../../../ServerData";
import { User } from "../../../userData/User";
import getErrorResponse from "../../../utils/Builders/ResponseBuilder/ErrorResponse";
import getJoinedGameResponse from "../../../utils/Builders/ResponseBuilder/JoinedGameResponse";
import { Response } from "../../../utils/Builders/ResponseBuilder/Responses/Response";
import { ErrorMessage } from "../../../utils/ErrorMessage";
import { Action } from "../../Action";

export class CreateGameAction extends Action {
    gameName: String;
    gamePassword: String;
    userName: String;
    game?: Game;

    constructor(requester: User, gameName: String, gamePassword: String, userName: String, serverData: ServerData) {
        super(requester, serverData);
        this.gameName = gameName;
        this.gamePassword = gamePassword;
        this.userName = userName;
    };

    public validate(): void {
        if (this.gameName === "") {
            // Game name must not be empty
            this.errorMessage = ErrorMessage.GAME_NAME;
        } else if (this.userName === "") {
            // User name must not be empty
            this.errorMessage = ErrorMessage.USER_NAME;
        } else if (!this.checkUserNotRegisteredInGame()) {
            // User must not be registered in any game in order to create a new game
            this.errorMessage = ErrorMessage.USER_REGISTERED;
        } else {
            this.isValid = true;
        }

        // Print message
        let message: String = (this.isValid ? "validated" : "invalid") + " create game action";
        console.log(message);
    }

    public launch(): void {
        // Set user name
        this.requester.setUserName(this.userName);
        // Create new game with the given name and password
        let game: Game = new Game(this.gameName, this.gamePassword);
        // Add the game creator as the first player of the game and Admin permissions
        game.addUser(this.requester);
        this.requester.grantAdminPermisions();
        // Add game Id to the user data set
        this.requester.joinGame(game.gameId);
        // Add the game to the game list in the server data base
        this.serverData.games[game.gameId.valueOf()] = game;
        this.game = game;
        // Set the user as not ready yet
        this.requester.isReady = false;
    }

    public response(): Response {
        if ((this.isValid) && (this.game != null)) {
            return getJoinedGameResponse(this.game);
        } else {
            return getErrorResponse(this.requester, this.errorMessage);
        }
    }

    private checkUserNotRegisteredInGame(): boolean {
        // Checks if the user is registered in any game in the server
        return (this.requester.joinedGame === "");
    }
}