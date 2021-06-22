Feature: createProductOrder
	

Background:
* url baseUrl

Scenario Outline: Test createProductOrderUsingPOST for <status> status code
	* def req = read(<testDataFile>)
	* def result = call read('createProductOrderUsingPOST.feature@operation') req
	* match result.responseStatus == <status>
		Examples:
		| status | testDataFile |
		| 200 | 'test-data/createProductOrderUsingPOST_200.yml' |
		| 201 | 'test-data/createProductOrderUsingPOST_201.yml' |
		| 401 | 'test-data/createProductOrderUsingPOST_401.yml' |
		| 403 | 'test-data/createProductOrderUsingPOST_403.yml' |
		| 404 | 'test-data/createProductOrderUsingPOST_404.yml' |



@ignore @operation
Scenario: createProductOrderUsingPOST
* def req = __arg
* def authHeader = call read('classpath:karate-auth.js') req.auth
* def headers = karate.merge(req.headers || {}, authHeader || {})
Given path '/api/product-orders'
And headers headers
And request req.body
When method POST

* def expectedStatusCode = req.statusCode || responseStatus
* match responseStatus == expectedStatusCode

# match response schema in 'test-data' or any object
* def responseContains = req.matchResponse === true? req.responseMatch : responseType == 'json'? {} : ''
* match  response contains responseContains

