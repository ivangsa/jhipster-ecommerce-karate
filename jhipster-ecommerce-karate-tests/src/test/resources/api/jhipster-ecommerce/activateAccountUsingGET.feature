Feature: activateAccount
	

Background:
* url baseUrl

Scenario Outline: Test activateAccountUsingGET for <status> status code
	* def req = read(<testDataFile>)
	* def result = call read('activateAccountUsingGET.feature@operation') req
	* match result.responseStatus == <status>
		Examples:
		| status | testDataFile |
		| 200 | 'test-data/activateAccountUsingGET_200.yml' |
		| 401 | 'test-data/activateAccountUsingGET_401.yml' |
		| 403 | 'test-data/activateAccountUsingGET_403.yml' |
		| 404 | 'test-data/activateAccountUsingGET_404.yml' |



@ignore @operation
Scenario: activateAccountUsingGET
* def req = __arg
* def authHeader = call read('classpath:karate-auth.js') req.auth
* def headers = karate.merge(req.headers || {}, authHeader || {})
Given path '/api/activate'
And param key = req.params.key
And headers headers
When method GET

* def expectedStatusCode = req.statusCode || responseStatus
* match responseStatus == expectedStatusCode
