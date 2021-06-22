Feature: updateProduct
	

Background:
* url baseUrl

Scenario Outline: Test updateProductUsingPUT for <status> status code
	* def req = read(<testDataFile>)
	* def result = call read('updateProductUsingPUT.feature@operation') req
	* match result.responseStatus == <status>
		Examples:
		| status | testDataFile |
		| 200 | 'test-data/updateProductUsingPUT_200.yml' |
		| 201 | 'test-data/updateProductUsingPUT_201.yml' |
		| 401 | 'test-data/updateProductUsingPUT_401.yml' |
		| 403 | 'test-data/updateProductUsingPUT_403.yml' |
		| 404 | 'test-data/updateProductUsingPUT_404.yml' |



@ignore @operation
Scenario: updateProductUsingPUT
* def req = __arg
* def authHeader = call read('classpath:karate-auth.js') req.auth
* def headers = karate.merge(req.headers || {}, authHeader || {})
Given path '/api/products/', req.params.id
And headers headers
And request req.body
When method PUT

* def expectedStatusCode = req.statusCode || responseStatus
* match responseStatus == expectedStatusCode

# match response schema in 'test-data' or any object
* def responseContains = req.matchResponse === true? req.responseMatch : responseType == 'json'? {} : ''
* match  response contains responseContains

