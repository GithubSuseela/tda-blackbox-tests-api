function fn() {
    karate.configure('connectTimeout', 30000);
    karate.configure('readTimeout', 30000);

    var config = {};

    config.token_url = 'https://idp2.renault.com/nidp/oauth/nam/token'
    config.client_id = 'd71492b0-4577-45a3-bc82-cacbca047069'
    config.client_secret = '840BiIsXEARqFEcW2V-arW20Qsdyv2v5Aw7HaH1NrgyTLV7N0ZW-7yjAVyJOGJpO4y2p1zOfbEXnIxU8p-wlcw'
    config.username = 'awboy01'
    config.password = 'TECHaw01'
    config.scope = 'scope'

    var auth = karate.callSingle('classpath:com/Auth/Authentication.feature', {token_url:config.token_url, client_id:config.client_id, client_secret:config.client_secret, username:config.username, password:config.password, scope:config.scope})
    config.access_token = auth.access_token

    return config;
}
