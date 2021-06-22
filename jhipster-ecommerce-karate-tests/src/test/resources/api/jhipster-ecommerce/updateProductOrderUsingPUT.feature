Feature: updateProductOrder
	

Background:
* url baseUrl

Scenario Outline: Test updateProductOrderUsingPUT for <status> status code
	* def req = read(<testDataFile>)
	* def result = call read('updateProductOrderUsingPUT.feature@operation') req
	* match result.responseStatus == <status>
		Examples:
		| status | testDataFile |
		| 200 | 'test-data/updateProductOrderUsingPUT_200.yml' |
		| 201 | 'test-data/updateProductOrderUsingPUT_201.yml' |
		| 401 | 'test-data/updateProductOrderUsingPUT_401.yml' |
		| 403 | 'test-data/updateProductOrderUsingPUT_403.yml' |
		| 404 | 'test-data/updateProductOrderUsingPUT_404.yml' |



@ignore @operation
Scenario: updateProductOrderUsingPUT
* def req = __arg
* def authHeader = call read('classpath:karate-auth.js') req.auth
* def headers = karate.merge(req.headers || {}, authHeader || {})
Given path '/api/product-orders/', req.params.id
And headers headers
And request req.body
When method PUT

* def expectedStatusCode = req.statusCode || responseStatus
* match responseStatus == expectedStatusCode

# match response schema in 'test-data' or any object
* def responseContains = req.matchResponse === true? req.responseMatch : responseType == 'json'? {} : ''
* match  response contains responseContains

