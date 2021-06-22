Feature: registerAccount
	

Background:
* url baseUrl

Scenario Outline: Test registerAccountUsingPOST for <status> status code
	* def req = read(<testDataFile>)
	* def result = call read('registerAccountUsingPOST.feature@operation') req
	* match result.responseStatus == <status>
		Examples:
		| status | testDataFile |
		| 201 | 'test-data/registerAccountUsingPOST_201.yml' |
		| 401 | 'test-data/registerAccountUsingPOST_401.yml' |
		| 403 | 'test-data/registerAccountUsingPOST_403.yml' |
		| 404 | 'test-data/registerAccountUsingPOST_404.yml' |



@ignore @operation
Scenario: registerAccountUsingPOST
* def req = __arg
* def authHeader = call read('classpath:karate-auth.js') req.auth
* def headers = karate.merge(req.headers || {}, authHeader || {})
Given path '/api/register'
And headers headers
And request req.body
When method POST

* def expectedStatusCode = req.statusCode || responseStatus
* match responseStatus == expectedStatusCode
