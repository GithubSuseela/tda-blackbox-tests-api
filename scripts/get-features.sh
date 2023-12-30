export JIRA_XRAY_LOGIN=xxx
export JIRA_XRAY_PASSWD=xxx
export XC_DEFAULT_TEST_PLAN=xxx

export JIRA_XRAY_HOST=jira.dt.renault.com
export XC_USE_XRAY_FEATURE_FILES=false
export XC_FEATURES_DOWNLOAD_DIRECTORY=../../src/test/java/com
export XC_TEST_PLAN_FILE=../../src/test/java/test-plan.json

cd ./tools/xray-connector
npm install
npm run xc:get-features
