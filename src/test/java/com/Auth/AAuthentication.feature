Feature: Generate token for authentication feature
  Scenario: Generate token for authentication
    Given url 'https://idp2.renault.com/nidp/oauth/nam/token'
    And form field grant_type = 'password'
    And form field client_id = 'd71492b0-4577-45a3-bc82-cacbca047069'
    And form field client_secret = '840BiIsXEARqFEcW2V-arW20Qsdyv2v5Aw7HaH1NrgyTLV7N0ZW-7yjAVyJOGJpO4y2p1zOfbEXnIxU8p-wlcw'
    And form field username = 'awboy01'
    And form field password = 'TECHaw01'
    And form field scope = 'arca'
    And method POST
    Then status 200
    * def access_token = response.access_token
    * print '[AUTHENTICATION TOKEN]' , access_token
    * print karate.get('name')

