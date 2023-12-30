export JIRA_XRAY_LOGIN=xxx
export JIRA_XRAY_PASSWD=xxx
export XC_DEFAULT_TEST_PLAN=xxx
export XC_TEST_ENVIRONMENT=xxx

export JIRA_XRAY_HOST=jira.dt.renault.com
export XC_FEATURES_DOWNLOAD_DIRECTORY=../../src/test/java/com
export XC_FEATURES_REPORT_DIRECTORY=../../build/surefire-reports
export XC_MERGED_REPORT_DIRECTORY=../../build/merged

cd ./tools/xray-connector
npm install
npm run xc:build-report
npm run xc:send-report
