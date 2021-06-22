Feature: finishPasswordReset
	

Background:
* url baseUrl

Scenario Outline: Test finishPasswordResetUsingPOST for <status> status code
	* def req = read(<testDataFile>)
	* def result = call read('finishPasswordResetUsingPOST.feature@operation') req
	* match result.responseStatus == <status>
		Examples:
		| status | testDataFile |
		| 200 | 'test-data/finishPasswordResetUsingPOST_200.yml' |
		| 201 | 'test-data/finishPasswordResetUsingPOST_201.yml' |
		| 401 | 'test-data/finishPasswordResetUsingPOST_401.yml' |
		| 403 | 'test-data/finishPasswordResetUsingPOST_403.yml' |
		| 404 | 'test-data/finishPasswordResetUsingPOST_404.yml' |



@ignore @operation
Scenario: finishPasswordResetUsingPOST
* def req = __arg
* def authHeader = call read('classpath:karate-auth.js') req.auth
* def headers = karate.merge(req.headers || {}, authHeader || {})
Given path '/api/account/reset-password/finish'
And headers headers
And request req.body
When method POST

* def expectedStatusCode = req.statusCode || responseStatus
* match responseStatus == expectedStatusCode
