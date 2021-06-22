Feature: updateShoppingCart
	

Background:
* url baseUrl

Scenario Outline: Test updateShoppingCartUsingPUT for <status> status code
	* def req = read(<testDataFile>)
	* def result = call read('updateShoppingCartUsingPUT.feature@operation') req
	* match result.responseStatus == <status>
		Examples:
		| status | testDataFile |
		| 200 | 'test-data/updateShoppingCartUsingPUT_200.yml' |
		| 201 | 'test-data/updateShoppingCartUsingPUT_201.yml' |
		| 401 | 'test-data/updateShoppingCartUsingPUT_401.yml' |
		| 403 | 'test-data/updateShoppingCartUsingPUT_403.yml' |
		| 404 | 'test-data/updateShoppingCartUsingPUT_404.yml' |



@ignore @operation
Scenario: updateShoppingCartUsingPUT
* def req = __arg
* def authHeader = call read('classpath:karate-auth.js') req.auth
* def headers = karate.merge(req.headers || {}, authHeader || {})
Given path '/api/shopping-carts/', req.params.id
And headers headers
And request req.body
When method PUT

* def expectedStatusCode = req.statusCode || responseStatus
* match responseStatus == expectedStatusCode

# match response schema in 'test-data' or any object
* def responseContains = req.matchResponse === true? req.responseMatch : responseType == 'json'? {} : ''
* match  response contains responseContains

# validate nested array: orders
* def orders_EachContains = req.matchResponse === true && req.responseMatchesEach && req.responseMatchesEach.orders? req.responseMatchesEach.orders : {}
* def orders_Response = response.orders || []
* match each orders_Response contains orders_EachContains
