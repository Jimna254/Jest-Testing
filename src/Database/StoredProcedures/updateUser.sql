CREATE OR ALTER PROCEDURE updateUser(
    @user_id VARCHAR(300),
    @name VARCHAR(250),
    @email VARCHAR(100),
    @phone_number VARCHAR (250),
    @cohort_number VARCHAR(250)
)
AS
BEGIN
    UPDATE Users SET 
        name = @name, 
        email = @email, 
        phone_number = @phone_number,
        cohort_number = @cohort_number
    WHERE user_id = @user_id
END

