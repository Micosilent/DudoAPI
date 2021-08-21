import { Action } from "../../../actionables/Action";
import { BidAction } from "../../../actionables/ClientGameActions/BidAction";
import { Game } from "../../../gameData/Game";
import { ServerData } from "../../../ServerData";
import { NormalUser } from "../../../userData/NormalUser";
import { User } from "../../../userData/User";
import { getUser } from "../../Getters/UserGetter";
import { UserAction } from "./UserAction";

export class BidActionBuilder{
    jsonAction: UserAction;
    serverData: ServerData;
    requester: User;

    constructor(json: UserAction, serverData: ServerData, requester: User) {
        this.jsonAction = json;
        this.serverData = serverData;
        this.requester = requester;
    }

    public build(): Action {
        return new BidAction(this.requester,
            this.serverData,
            this.getGame(),
            this.jsonAction.actionData.diceQuantity,
            this.jsonAction.actionData.diceValue)
    }

    public getGame(): Game {
        return new Game()
    }
}