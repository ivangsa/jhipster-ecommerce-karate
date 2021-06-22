Feature: changePassword
	

Background:
* url baseUrl

Scenario Outline: Test changePasswordUsingPOST for <status> status code
	* def req = read(<testDataFile>)
	* def result = call read('changePasswordUsingPOST.feature@operation') req
	* match result.responseStatus == <status>
		Examples:
		| status | testDataFile |
		| 200 | 'test-data/changePasswordUsingPOST_200.yml' |
		| 201 | 'test-data/changePasswordUsingPOST_201.yml' |
		| 401 | 'test-data/changePasswordUsingPOST_401.yml' |
		| 403 | 'test-data/changePasswordUsingPOST_403.yml' |
		| 404 | 'test-data/changePasswordUsingPOST_404.yml' |



@ignore @operation
Scenario: changePasswordUsingPOST
* def req = __arg
* def authHeader = call read('classpath:karate-auth.js') req.auth
* def headers = karate.merge(req.headers || {}, authHeader || {})
Given path '/api/account/change-password'
And headers headers
And request req.body
When method POST

* def expectedStatusCode = req.statusCode || responseStatus
* match responseStatus == expectedStatusCode
