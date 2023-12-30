## BlackBox-Testing-API with Karate-Gatling

This starter project allows you to launch a load test simulation with the following features :

- [x] Performance tests in **Karate DSL** with BDD formalism (**Given / When / Then**) and Javascript
- [x] Builds different **parallel scenarios** by grouping feature files based on feature tag
- [x] Enables **performance metrics assertions** and automatically detects performance drifts
- [x] Support **multiple injection profiles** : at-once, ramp, constant-per-sec, ramp-per-sec...
- [x] Enables execution of **setup / cleanup feature files** before and after simulation
- [x] **Dynatrace** and **xray-connector** friendly

For details about Karate DSL, please refer to [Karate documentation](https://intuit.github.io/karate)

### Support

Please feel free to report any issue and contribute by raising merge requests at any time.

### Prerequisites

OpenJDK 11

### Error handling

Whenever Gatling detects a performance drift compared to specification, it raises an exception.
Therefore **load-tests** execution should take place in a separate CI job, in order to allow it to fail.

### Credentials

To reach your application, you will need an IDP technical account with "password" grant_type, and create the following CI variables :

- **token_url** is your IDP url
- **scope** is the scope used for IDP

- **api_url** is your target url
- **api_client_id** is your application client id
- **api_client_secret** is the client secret related to your client id
- **api_client_user** is the user of your technical account
- **api_client_password** is the password related to your use

A special feature [Authentication.feature](https://gitlabee.dt.renault.com/shared/boilerplate/black-box-testing/functionnal/api/-/tree/master/src/test/java/com/renault/auth/Authentication.feature) will be invoked by [karate-config.js](https://gitlabee.dt.renault.com/shared/boilerplate/black-box-testing/functionnal/api/-/tree/master/src/test/java/karate-config.js) to get an access token with the CI variables

In order to use this token, your Karate features should always specify **api_url** as url, and configure headers with **headers.js** :

```
* url api_url
* configure headers = read('headers.js')
```

### Simulation

Please refer to **load-tests** stage in .gitlab.yml

All feature files should be located in the [ACTIVE](https://gitlabee.dt.renault.com/shared/boilerplate/black-box-testing/functionnal/api/-/tree/master/src/test/java/com/renault/ACTIVE) folder

You should only need to modify **TEST_CONFIGURATION_PATH** environment variable to specify the simulation configuration file in JSON format :

```
{
  "responseTimeMin": <number>,
  "responseTimeMax": <number>,
  "responseTimeMean": <number>,
  "responseTimeStdDev": <number>,
  "responseTimePercentile50th": <number>,
  "responseTimePercentile75th": <number>,
  "responseTimePercentile95th": <number>,
  "responseTimePercentile99th": <number>,
  "requestsPerSecond": <number>,
  "successfulRequestsPercent": <number>,

  "simulations": [
    {
      "tag": "<string>",
      "injectionSteps": [
        {
          "injectionProfile": "<string>",
          "users": <number>,
          "duration": <number>
        },
        {
          "injectionProfile": "<string>",
          "users": <number>,
          "duration": <number>
        }
      ]
    },
    ...
  ]
}
```

- **responseTimeMin** (optional) is the maximum value for the best response time of all requests
- **responseTimeMax** (optional) is the maximum value for the worst response time of all requests
- **responseTimeMean** (optional) is the minimum value for the mean response time of all requests
- **responseTimeStdDev** (optional) is the maximum value for the standard deviation of the response time of all requests
- **responseTimePercentile50th** (optional) is the maximum value for the 50th percentile of the response time of all requests
- **responseTimePercentile75th** (optional) is the maximum value for the 75th percentile of the response time of all requests
- **responseTimePercentile95th** (optional) is the maximum value for the 95th percentile of the response time of all requests
- **responseTimePercentile99th** (optional) is the maximum value for the 99th percentile of the response time of all requests
- **requestsPerSecond** (optional) is the minimum number of requests per second
- **successfulRequestsPercent** (optional) is the minimum percentage of successful requests - if not specified, a 100% value is assumed

For each scenario, you should specify in **simulations** :

- a field **tag** that will group together the feature files with the same tag, e.g. **@skf-load**. If __*__ is used, all the features will be included, except those tagged with **@ignore**
- a field **injectionSteps** which is an array of injection steps, each containing:

    - a field **users** that specifies the number of virtual users
    - a field **duration** that specifies the duration in seconds
    - a field **injectionProfile** that specifies the injection profile to use

For [open model workload model](https://gatling.io/docs/current/general/simulation_setup/#open-model), **injectionProfile** may be:

    - "open-model-at-once" injects a given number of users at once
    - "open-model-ramp" injects a given number of users with a linear ramp over a given duration
    - "open-model-constant-per-sec" injects users at a constant rate, defined in users per second, during a given duration. Users will be injected at regular intervals
    - "open-model-constant-per-sec-random" injects users at a constant rate, defined in users per second, during a given duration. Users will be injected at randomized intervals
    - "open-model-ramp-per-sec" injects users from 0 to target rate, defined in users per second, during a given duration. Users will be injected at regular intervals
    - "open-model-ramp-per-sec-random" injects users from 0 to target rate, defined in users per second, during a given duration. Users will be injected at randomized intervals
    - "open-model-heaviside" injects a given number of users following a smooth approximation of the heaviside step function stretched to a given duration

For [closed model workload model](https://gatling.io/docs/current/general/simulation_setup/#closed-model), **injectionProfile** may be:

    - "closed-model-constant-concurrent-users" injects so that number of concurrent users in the system is constant
    - "closed-model-ramp-concurrent-users" inject so that number of concurrent users in the system ramps linearly from a number to another

### Gatling session variables

Gatling session variables are available in Karate features through the **__gatling**, e.g. **__gatling.USER_ID**, which contains the current virtual user id

### Setup / cleanup scenarios

- Any feature with the tag "**@before-hook**" will be executed before the simulation
- Any feature with the tag "**@after-hook**" will be executed after the simulation

### Timeouts

Any request whose connection or read takes longer than **5s** will be regarded as failed ([karate-config.js](https://gitlabee.dt.renault.com/shared/boilerplate/black-box-testing/functionnal/api/-/tree/master/src/test/java/karate-config.js))

### Dynatrace

The header **x-dynatrace-test** will be added to your requests with value "VU=***virtual user***;SI=***source id***;TSN=***test step name***;LSN=***load script name***;LTN=***load test name***" ([headers.js](https://gitlabee.dt.renault.com/shared/boilerplate/black-box-testing/functionnal/api/-/tree/master/src/test/java/headers.js))

- **virtual user** will be "gatling_*random uuid*"
- **source id** will always be "gatling"
- **test step name**, **load script name**, **load test name** will be the tag used for your scenario

### Xray-connector

Please read [xray-connector documentation](https://gitlabee.dt.renault.com/shared/components/quality/xray-connector) for further details about the installation and use of this component

You will need a valid **JIRA_XRAY_LOGIN** and **JIRA_XRAY_PASSWD** environment variable

- For features and simulation configuration files retrieval from Jira, please refer to **get-features** stage in .gitlab.yml
- For report generation and sending to Jira, please refer to **send-report** stage in .gitlab.yml

You should only need to modify **XC_DEFAULT_TEST_PLAN** to specify the key of your Jira project, and the description of your Jira test plan should contain the following lines :

```
ASSERT_RESPONSE_TIME_MIN=<number>
ASSERT_RESPONSE_TIME_MAX=<number>
ASSERT_RESPONSE_TIME_MEAN=<number>
ASSERT_RESPONSE_TIME_STD_DEV=<number>
ASSERT_RESPONSE_TIME_PERCENTILE_50TH=<number>
ASSERT_RESPONSE_TIME_PERCENTILE_75TH=<number>
ASSERT_RESPONSE_TIME_PERCENTILE_95TH=<number>
ASSERT_RESPONSE_TIME_PERCENTILE_99TH=<number>
ASSERT_SUCCESSFUL_REQUESTS_PERCENT=<number>

TAG=<string>
INJECTION_PROFILE=<string>
USERS=1
DURATION=<number>
INJECTION_PROFILE=<string>
USERS=1
DURATION=<number>

TAG=<string>
INJECTION_PROFILE=<string>
USERS=1
DURATION=<number>
```

The Jira test plan description will be translated into the JSON format by the **get-features** command - as for the JSON format, the lines with ASSERT_xxx are optional
