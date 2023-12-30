function fn() {
    karate.configure('connectTimeout', 30000);
    karate.configure('readTimeout', 30000);

    var config = {};
    var auth = karate.callSingle('classpath:com/Auth/Authentication.feature')
    config.access_token = auth.access_token
    config.name = 'Suseela'

    return config;
}
