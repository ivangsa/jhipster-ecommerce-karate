Feature: createProduct
	

Background:
* url baseUrl

Scenario Outline: Test createProductUsingPOST for <status> status code
	* def req = read(<testDataFile>)
	* def result = call read('createProductUsingPOST.feature@operation') req
	* match result.responseStatus == <status>
		Examples:
		| status | testDataFile |
		| 200 | 'test-data/createProductUsingPOST_200.yml' |
		| 201 | 'test-data/createProductUsingPOST_201.yml' |
		| 401 | 'test-data/createProductUsingPOST_401.yml' |
		| 403 | 'test-data/createProductUsingPOST_403.yml' |
		| 404 | 'test-data/createProductUsingPOST_404.yml' |



@ignore @operation
Scenario: createProductUsingPOST
* def req = __arg
* def authHeader = call read('classpath:karate-auth.js') req.auth
* def headers = karate.merge(req.headers || {}, authHeader || {})
Given path '/api/products'
And headers headers
And request req.body
When method POST

* def expectedStatusCode = req.statusCode || responseStatus
* match responseStatus == expectedStatusCode

# match response schema in 'test-data' or any object
* def responseContains = req.matchResponse === true? req.responseMatch : responseType == 'json'? {} : ''
* match  response contains responseContains

