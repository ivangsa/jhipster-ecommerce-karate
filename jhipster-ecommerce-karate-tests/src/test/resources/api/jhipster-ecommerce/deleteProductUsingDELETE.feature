Feature: deleteProduct
	

Background:
* url baseUrl

Scenario Outline: Test deleteProductUsingDELETE for <status> status code
	* def req = read(<testDataFile>)
	* def result = call read('deleteProductUsingDELETE.feature@operation') req
	* match result.responseStatus == <status>
		Examples:
		| status | testDataFile |
		| 200 | 'test-data/deleteProductUsingDELETE_200.yml' |
		| 204 | 'test-data/deleteProductUsingDELETE_204.yml' |
		| 401 | 'test-data/deleteProductUsingDELETE_401.yml' |
		| 403 | 'test-data/deleteProductUsingDELETE_403.yml' |



@ignore @operation
Scenario: deleteProductUsingDELETE
* def req = __arg
* def authHeader = call read('classpath:karate-auth.js') req.auth
* def headers = karate.merge(req.headers || {}, authHeader || {})
Given path '/api/products/', req.params.id
And headers headers
When method DELETE

* def expectedStatusCode = req.statusCode || responseStatus
* match responseStatus == expectedStatusCode
