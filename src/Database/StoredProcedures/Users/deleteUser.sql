CREATE OR ALTER PROCEDURE deleteUser(@user_id VARCHAR(100))
AS
BEGIN
    UPDATE Users SET isdeleted = 1 WHERE user_id = @user_id
END