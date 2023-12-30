Feature: Generate token for authentication feature
  Scenario: Generate token for authentication
    Given url token_url
    And form field grant_type = 'password'
    And form field client_id = client_id
    And form field client_secret = client_secret
    And form field username = username
    And form field password = password
    And form field scope = scope
    And method POST
    Then status 200
    * def access_token = response.access_token
    * print '[AUTHENTICATION TOKEN]' , access_token

