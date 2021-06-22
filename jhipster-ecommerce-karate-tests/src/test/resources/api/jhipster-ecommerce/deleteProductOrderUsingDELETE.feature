Feature: deleteProductOrder
	

Background:
* url baseUrl

Scenario Outline: Test deleteProductOrderUsingDELETE for <status> status code
	* def req = read(<testDataFile>)
	* def result = call read('deleteProductOrderUsingDELETE.feature@operation') req
	* match result.responseStatus == <status>
		Examples:
		| status | testDataFile |
		| 200 | 'test-data/deleteProductOrderUsingDELETE_200.yml' |
		| 204 | 'test-data/deleteProductOrderUsingDELETE_204.yml' |
		| 401 | 'test-data/deleteProductOrderUsingDELETE_401.yml' |
		| 403 | 'test-data/deleteProductOrderUsingDELETE_403.yml' |



@ignore @operation
Scenario: deleteProductOrderUsingDELETE
* def req = __arg
* def authHeader = call read('classpath:karate-auth.js') req.auth
* def headers = karate.merge(req.headers || {}, authHeader || {})
Given path '/api/product-orders/', req.params.id
And headers headers
When method DELETE

* def expectedStatusCode = req.statusCode || responseStatus
* match responseStatus == expectedStatusCode
