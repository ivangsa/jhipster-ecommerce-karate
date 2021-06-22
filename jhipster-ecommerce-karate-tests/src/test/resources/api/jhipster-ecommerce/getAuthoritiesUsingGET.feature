Feature: getAuthorities
	

Background:
* url baseUrl

Scenario Outline: Test getAuthoritiesUsingGET for <status> status code
	* def req = read(<testDataFile>)
	* def result = call read('getAuthoritiesUsingGET.feature@operation') req
	* match result.responseStatus == <status>
		Examples:
		| status | testDataFile |
		| 200 | 'test-data/getAuthoritiesUsingGET_200.yml' |
		| 401 | 'test-data/getAuthoritiesUsingGET_401.yml' |
		| 403 | 'test-data/getAuthoritiesUsingGET_403.yml' |
		| 404 | 'test-data/getAuthoritiesUsingGET_404.yml' |



@ignore @operation
Scenario: getAuthoritiesUsingGET
* def req = __arg
* def authHeader = call read('classpath:karate-auth.js') req.auth
* def headers = karate.merge(req.headers || {}, authHeader || {})
Given path '/api/authorities'
And headers headers
When method GET

* def expectedStatusCode = req.statusCode || responseStatus
* match responseStatus == expectedStatusCode

# match response schema in 'test-data' or any object
* def responseContains = req.matchResponse === true? req.responseMatch : responseType == 'json'? {} : ''
* match  each  response contains responseContains

