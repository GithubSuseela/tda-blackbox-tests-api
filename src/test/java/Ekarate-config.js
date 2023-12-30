function fn() {
    karate.configure('connectTimeout', 30000);
    karate.configure('readTimeout', 30000);

    var env = java.lang.System.getenv('ENV');
    karate.log('karate.env system property was:', env);

    if (!env) {
        env = 'dev';
    }
    karate.log('[KARATE ENV]', env);

    var config = {
         env: env
    }
    if (env == 'dev') {
        config.token_url = 'https://idp2.renault.com/nidp/oauth/nam/token'
        config.client_id = 'd71492b0-4577-45a3-bc82-cacbca047069'
        config.client_secret = '840BiIsXEARqFEcW2V-arW20Qsdyv2v5Aw7HaH1NrgyTLV7N0ZW-7yjAVyJOGJpO4y2p1zOfbEXnIxU8p-wlcw'
        config.username = 'awboy01'
        config.password = 'Tdsecret'
        config.scope = 'scope'
        config.proxy_host = '10.246.3.249'
        config.proxy_port = '3128'
    }
    else
    {
        config.token_url = java.lang.System.getenv('token_url')
        config.client_id = java.lang.System.getenv('client_id')
        config.client_secret = java.lang.System.getenv('client_secret')
        config.username = java.lang.System.getenv('username')
        config.password = java.lang.System.getenv('password')
        config.scope = java.lang.System.getenv('scope')
        config.proxy_host = java.lang.System.getenv('proxy_host')
        config.proxy_port = java.lang.System.getenv('proxy_port')

    }
    if (config.proxy_host && config.proxy_port) {
    karate.configure('proxy', {uri:'http://' +config.proxy_host +':' +config.proxy_port})
    }

    var auth = karate.callSingle('classpath:com/Auth/Authentication.feature', {token_url:config.token_url, client_id:config.client_id, client_secret:config.client_secret, username:config.username, password:config.password, scope:config.scope})
    config.access_token = auth.access_token

    return config;
}

