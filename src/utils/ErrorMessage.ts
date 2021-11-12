export enum ErrorMessage {
    GAME_NAME = "Game name not inserted",
    USER_NAME = "User name not inserted",
    USER_REGISTERED = "User already registered in a different game",
    USER_NOT_REGISTERED = "User is not registered in this game",
    PASSWORD = "Incorrect game name or password, try again",
    GAME_STARTED = "Game has already been started",
    GAME_NOT_STARTED = "Game has not started",
    GAME_NOT_FOUND = "Game not found",
    USER_NOT_FOUND = "User not found in database",
    NOT_ADMIN = "User does not have admin permissions for this game",
    ROUND_NOT_ACTIVE = "Round is not active",
    ROUND_ACTIVE = "Round is still active",
    NOT_TURN = "User cannot act, not your turn",
    DICE_VAL_INT = "Dice value must be integer",
    DICE_VAL_1_6 = "Dice value must be between 1 and 6",
    DICE_NUM_INT = "Dice number must be integer",
    DICE_NUM_1 = "Dice number must be at least 1",
    BID = "Incorrect bid",
    CALL_NO_BID = "Cannot call, there is no current bid",
    SPOT_NO_BID = "Cannot spot on, there is no current bid",
    GENERAL_ERROR = "Error handling the client request. Malformed json response",
    END_GAME_ERROR = "Error handling the end of game action, review code paths",
    READY = "Duplicated or incorrect ready information",
    UNKNOWN_ACTION = "Unknown action name"
}