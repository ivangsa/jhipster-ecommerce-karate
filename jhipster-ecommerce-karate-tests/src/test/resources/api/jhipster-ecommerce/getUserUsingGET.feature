Feature: getUser
	

Background:
* url baseUrl

Scenario Outline: Test getUserUsingGET for <status> status code
	* def req = read(<testDataFile>)
	* def result = call read('getUserUsingGET.feature@operation') req
	* match result.responseStatus == <status>
		Examples:
		| status | testDataFile |
		| 200 | 'test-data/getUserUsingGET_200.yml' |
		| 401 | 'test-data/getUserUsingGET_401.yml' |
		| 403 | 'test-data/getUserUsingGET_403.yml' |
		| 404 | 'test-data/getUserUsingGET_404.yml' |



@ignore @operation
Scenario: getUserUsingGET
* def req = __arg
* def authHeader = call read('classpath:karate-auth.js') req.auth
* def headers = karate.merge(req.headers || {}, authHeader || {})
Given path '/api/admin/users/', req.params.login
And headers headers
When method GET

* def expectedStatusCode = req.statusCode || responseStatus
* match responseStatus == expectedStatusCode

# match response schema in 'test-data' or any object
* def responseContains = req.matchResponse === true? req.responseMatch : responseType == 'json'? {} : ''
* match  response contains responseContains

# validate nested array: authorities
* def authorities_EachContains = req.matchResponse === true && req.responseMatchesEach && req.responseMatchesEach.authorities? req.responseMatchesEach.authorities : {}
* def authorities_Response = response.authorities || []
* match each authorities_Response contains authorities_EachContains
