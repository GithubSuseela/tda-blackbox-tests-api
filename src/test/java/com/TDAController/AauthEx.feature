Feature: Authentication feature
  Background:
    * configure headers = read('classpath:headers.js')

  Scenario: Authentication scenario
    * url api_url
    Then path '/api/v1/users/me'
    And method GET
    * print response

