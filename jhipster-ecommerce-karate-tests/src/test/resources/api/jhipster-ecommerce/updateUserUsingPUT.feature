Feature: updateUser
	

Background:
* url baseUrl

Scenario Outline: Test updateUserUsingPUT for <status> status code
	* def req = read(<testDataFile>)
	* def result = call read('updateUserUsingPUT.feature@operation') req
	* match result.responseStatus == <status>
		Examples:
		| status | testDataFile |
		| 200 | 'test-data/updateUserUsingPUT_200.yml' |
		| 201 | 'test-data/updateUserUsingPUT_201.yml' |
		| 401 | 'test-data/updateUserUsingPUT_401.yml' |
		| 403 | 'test-data/updateUserUsingPUT_403.yml' |
		| 404 | 'test-data/updateUserUsingPUT_404.yml' |



@ignore @operation
Scenario: updateUserUsingPUT
* def req = __arg
* def authHeader = call read('classpath:karate-auth.js') req.auth
* def headers = karate.merge(req.headers || {}, authHeader || {})
Given path '/api/admin/users'
And headers headers
And request req.body
When method PUT

* def expectedStatusCode = req.statusCode || responseStatus
* match responseStatus == expectedStatusCode

# match response schema in 'test-data' or any object
* def responseContains = req.matchResponse === true? req.responseMatch : responseType == 'json'? {} : ''
* match  response contains responseContains

# validate nested array: authorities
* def authorities_EachContains = req.matchResponse === true && req.responseMatchesEach && req.responseMatchesEach.authorities? req.responseMatchesEach.authorities : {}
* def authorities_Response = response.authorities || []
* match each authorities_Response contains authorities_EachContains
