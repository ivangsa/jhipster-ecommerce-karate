Feature: saveAccount
	

Background:
* url baseUrl

Scenario Outline: Test saveAccountUsingPOST for <status> status code
	* def req = read(<testDataFile>)
	* def result = call read('saveAccountUsingPOST.feature@operation') req
	* match result.responseStatus == <status>
		Examples:
		| status | testDataFile |
		| 200 | 'test-data/saveAccountUsingPOST_200.yml' |
		| 201 | 'test-data/saveAccountUsingPOST_201.yml' |
		| 401 | 'test-data/saveAccountUsingPOST_401.yml' |
		| 403 | 'test-data/saveAccountUsingPOST_403.yml' |
		| 404 | 'test-data/saveAccountUsingPOST_404.yml' |



@ignore @operation
Scenario: saveAccountUsingPOST
* def req = __arg
* def authHeader = call read('classpath:karate-auth.js') req.auth
* def headers = karate.merge(req.headers || {}, authHeader || {})
Given path '/api/account'
And headers headers
And request req.body
When method POST

* def expectedStatusCode = req.statusCode || responseStatus
* match responseStatus == expectedStatusCode
