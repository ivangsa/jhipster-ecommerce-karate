Feature: createCustomerDetails
	

Background:
* url baseUrl

Scenario Outline: Test createCustomerDetailsUsingPOST for <status> status code
	* def req = read(<testDataFile>)
	* def result = call read('createCustomerDetailsUsingPOST.feature@operation') req
	* match result.responseStatus == <status>
		Examples:
		| status | testDataFile |
		| 200 | 'test-data/createCustomerDetailsUsingPOST_200.yml' |
		| 201 | 'test-data/createCustomerDetailsUsingPOST_201.yml' |
		| 401 | 'test-data/createCustomerDetailsUsingPOST_401.yml' |
		| 403 | 'test-data/createCustomerDetailsUsingPOST_403.yml' |
		| 404 | 'test-data/createCustomerDetailsUsingPOST_404.yml' |



@ignore @operation
Scenario: createCustomerDetailsUsingPOST
* def req = __arg
* def authHeader = call read('classpath:karate-auth.js') req.auth
* def headers = karate.merge(req.headers || {}, authHeader || {})
Given path '/api/customer-details'
And headers headers
And request req.body
When method POST

* def expectedStatusCode = req.statusCode || responseStatus
* match responseStatus == expectedStatusCode

# match response schema in 'test-data' or any object
* def responseContains = req.matchResponse === true? req.responseMatch : responseType == 'json'? {} : ''
* match  response contains responseContains

# validate nested array: carts
* def carts_EachContains = req.matchResponse === true && req.responseMatchesEach && req.responseMatchesEach.carts? req.responseMatchesEach.carts : {}
* def carts_Response = response.carts || []
* match each carts_Response contains carts_EachContains
