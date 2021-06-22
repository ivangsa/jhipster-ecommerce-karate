Feature: requestPasswordReset
	

Background:
* url baseUrl

Scenario Outline: Test requestPasswordResetUsingPOST for <status> status code
	* def req = read(<testDataFile>)
	* def result = call read('requestPasswordResetUsingPOST.feature@operation') req
	* match result.responseStatus == <status>
		Examples:
		| status | testDataFile |
		| 200 | 'test-data/requestPasswordResetUsingPOST_200.yml' |
		| 201 | 'test-data/requestPasswordResetUsingPOST_201.yml' |
		| 401 | 'test-data/requestPasswordResetUsingPOST_401.yml' |
		| 403 | 'test-data/requestPasswordResetUsingPOST_403.yml' |
		| 404 | 'test-data/requestPasswordResetUsingPOST_404.yml' |



@ignore @operation
Scenario: requestPasswordResetUsingPOST
* def req = __arg
* def authHeader = call read('classpath:karate-auth.js') req.auth
* def headers = karate.merge(req.headers || {}, authHeader || {})
Given path '/api/account/reset-password/init'
And headers headers
And request req.body
When method POST

* def expectedStatusCode = req.statusCode || responseStatus
* match responseStatus == expectedStatusCode
