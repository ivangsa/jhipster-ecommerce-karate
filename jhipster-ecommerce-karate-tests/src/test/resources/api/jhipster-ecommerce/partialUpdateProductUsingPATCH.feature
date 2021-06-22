Feature: partialUpdateProduct
	

Background:
* url baseUrl

Scenario Outline: Test partialUpdateProductUsingPATCH for <status> status code
	* def req = read(<testDataFile>)
	* def result = call read('partialUpdateProductUsingPATCH.feature@operation') req
	* match result.responseStatus == <status>
		Examples:
		| status | testDataFile |
		| 200 | 'test-data/partialUpdateProductUsingPATCH_200.yml' |
		| 204 | 'test-data/partialUpdateProductUsingPATCH_204.yml' |
		| 401 | 'test-data/partialUpdateProductUsingPATCH_401.yml' |
		| 403 | 'test-data/partialUpdateProductUsingPATCH_403.yml' |



@ignore @operation
Scenario: partialUpdateProductUsingPATCH
* def req = __arg
* def authHeader = call read('classpath:karate-auth.js') req.auth
* def headers = karate.merge(req.headers || {}, authHeader || {})
Given path '/api/products/', req.params.id
And headers headers
And request req.body
When method PATCH

* def expectedStatusCode = req.statusCode || responseStatus
* match responseStatus == expectedStatusCode

# match response schema in 'test-data' or any object
* def responseContains = req.matchResponse === true? req.responseMatch : responseType == 'json'? {} : ''
* match  response contains responseContains

