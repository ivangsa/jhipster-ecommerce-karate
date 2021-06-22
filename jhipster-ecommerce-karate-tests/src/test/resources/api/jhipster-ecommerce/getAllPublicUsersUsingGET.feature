Feature: getAllPublicUsers
	

Background:
* url baseUrl

Scenario Outline: Test getAllPublicUsersUsingGET for <status> status code
	* def req = read(<testDataFile>)
	* def result = call read('getAllPublicUsersUsingGET.feature@operation') req
	* match result.responseStatus == <status>
		Examples:
		| status | testDataFile |
		| 200 | 'test-data/getAllPublicUsersUsingGET_200.yml' |
		| 401 | 'test-data/getAllPublicUsersUsingGET_401.yml' |
		| 403 | 'test-data/getAllPublicUsersUsingGET_403.yml' |
		| 404 | 'test-data/getAllPublicUsersUsingGET_404.yml' |



@ignore @operation
Scenario: getAllPublicUsersUsingGET
* def req = __arg
* def authHeader = call read('classpath:karate-auth.js') req.auth
* def headers = karate.merge(req.headers || {}, authHeader || {})
Given path '/api/users'
And param page = req.params.page
And param size = req.params.size
And param sort = req.params.sort
And headers headers
When method GET

* def expectedStatusCode = req.statusCode || responseStatus
* match responseStatus == expectedStatusCode

# match response schema in 'test-data' or any object
* def responseContains = req.matchResponse === true? req.responseMatch : responseType == 'json'? {} : ''
* match  each  response contains responseContains

