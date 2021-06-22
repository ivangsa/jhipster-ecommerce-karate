Feature: getProduct
	

Background:
* url baseUrl

Scenario Outline: Test getProductUsingGET for <status> status code
	* def req = read(<testDataFile>)
	* def result = call read('getProductUsingGET.feature@operation') req
	* match result.responseStatus == <status>
		Examples:
		| status | testDataFile |
		| 200 | 'test-data/getProductUsingGET_200.yml' |
		| 401 | 'test-data/getProductUsingGET_401.yml' |
		| 403 | 'test-data/getProductUsingGET_403.yml' |
		| 404 | 'test-data/getProductUsingGET_404.yml' |



@ignore @operation
Scenario: getProductUsingGET
* def req = __arg
* def authHeader = call read('classpath:karate-auth.js') req.auth
* def headers = karate.merge(req.headers || {}, authHeader || {})
Given path '/api/products/', req.params.id
And headers headers
When method GET

* def expectedStatusCode = req.statusCode || responseStatus
* match responseStatus == expectedStatusCode

# match response schema in 'test-data' or any object
* def responseContains = req.matchResponse === true? req.responseMatch : responseType == 'json'? {} : ''
* match  response contains responseContains

