Feature: deleteUser
	

Background:
* url baseUrl

Scenario Outline: Test deleteUserUsingDELETE for <status> status code
	* def req = read(<testDataFile>)
	* def result = call read('deleteUserUsingDELETE.feature@operation') req
	* match result.responseStatus == <status>
		Examples:
		| status | testDataFile |
		| 200 | 'test-data/deleteUserUsingDELETE_200.yml' |
		| 204 | 'test-data/deleteUserUsingDELETE_204.yml' |
		| 401 | 'test-data/deleteUserUsingDELETE_401.yml' |
		| 403 | 'test-data/deleteUserUsingDELETE_403.yml' |



@ignore @operation
Scenario: deleteUserUsingDELETE
* def req = __arg
* def authHeader = call read('classpath:karate-auth.js') req.auth
* def headers = karate.merge(req.headers || {}, authHeader || {})
Given path '/api/admin/users/', req.params.login
And headers headers
When method DELETE

* def expectedStatusCode = req.statusCode || responseStatus
* match responseStatus == expectedStatusCode
