CREATE OR ALTER PROCEDURE registerUser(
    @user_id VARCHAR(250),
    @name VARCHAR(250),
    @email VARCHAR(250) , 
    @cohort_number VARCHAR(250),
    @password VARCHAR(200),
    @phone_number VARCHAR(255)
  ) 
  AS
  BEGIN
    INSERT INTO Users(user_id, name, email, cohort_number, password, phone_number )
    VALUES(@user_id, @name, @email, @cohort_number, @password, @phone_number)
  END