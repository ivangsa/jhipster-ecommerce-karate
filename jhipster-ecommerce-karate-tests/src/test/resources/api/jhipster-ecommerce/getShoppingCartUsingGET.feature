Feature: getShoppingCart
	

Background:
* url baseUrl

Scenario Outline: Test getShoppingCartUsingGET for <status> status code
	* def req = read(<testDataFile>)
	* def result = call read('getShoppingCartUsingGET.feature@operation') req
	* match result.responseStatus == <status>
		Examples:
		| status | testDataFile |
		| 200 | 'test-data/getShoppingCartUsingGET_200.yml' |
		| 401 | 'test-data/getShoppingCartUsingGET_401.yml' |
		| 403 | 'test-data/getShoppingCartUsingGET_403.yml' |
		| 404 | 'test-data/getShoppingCartUsingGET_404.yml' |



@ignore @operation
Scenario: getShoppingCartUsingGET
* def req = __arg
* def authHeader = call read('classpath:karate-auth.js') req.auth
* def headers = karate.merge(req.headers || {}, authHeader || {})
Given path '/api/shopping-carts/', req.params.id
And headers headers
When method GET

* def expectedStatusCode = req.statusCode || responseStatus
* match responseStatus == expectedStatusCode

# match response schema in 'test-data' or any object
* def responseContains = req.matchResponse === true? req.responseMatch : responseType == 'json'? {} : ''
* match  response contains responseContains

# validate nested array: orders
* def orders_EachContains = req.matchResponse === true && req.responseMatchesEach && req.responseMatchesEach.orders? req.responseMatchesEach.orders : {}
* def orders_Response = response.orders || []
* match each orders_Response contains orders_EachContains
