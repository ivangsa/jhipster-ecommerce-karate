Feature: deleteShoppingCart
	

Background:
* url baseUrl

Scenario Outline: Test deleteShoppingCartUsingDELETE for <status> status code
	* def req = read(<testDataFile>)
	* def result = call read('deleteShoppingCartUsingDELETE.feature@operation') req
	* match result.responseStatus == <status>
		Examples:
		| status | testDataFile |
		| 200 | 'test-data/deleteShoppingCartUsingDELETE_200.yml' |
		| 204 | 'test-data/deleteShoppingCartUsingDELETE_204.yml' |
		| 401 | 'test-data/deleteShoppingCartUsingDELETE_401.yml' |
		| 403 | 'test-data/deleteShoppingCartUsingDELETE_403.yml' |



@ignore @operation
Scenario: deleteShoppingCartUsingDELETE
* def req = __arg
* def authHeader = call read('classpath:karate-auth.js') req.auth
* def headers = karate.merge(req.headers || {}, authHeader || {})
Given path '/api/shopping-carts/', req.params.id
And headers headers
When method DELETE

* def expectedStatusCode = req.statusCode || responseStatus
* match responseStatus == expectedStatusCode
