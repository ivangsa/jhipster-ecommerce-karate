Feature: updateCustomerDetails
	

Background:
* url baseUrl

Scenario Outline: Test updateCustomerDetailsUsingPUT for <status> status code
	* def req = read(<testDataFile>)
	* def result = call read('updateCustomerDetailsUsingPUT.feature@operation') req
	* match result.responseStatus == <status>
		Examples:
		| status | testDataFile |
		| 200 | 'test-data/updateCustomerDetailsUsingPUT_200.yml' |
		| 201 | 'test-data/updateCustomerDetailsUsingPUT_201.yml' |
		| 401 | 'test-data/updateCustomerDetailsUsingPUT_401.yml' |
		| 403 | 'test-data/updateCustomerDetailsUsingPUT_403.yml' |
		| 404 | 'test-data/updateCustomerDetailsUsingPUT_404.yml' |



@ignore @operation
Scenario: updateCustomerDetailsUsingPUT
* def req = __arg
* def authHeader = call read('classpath:karate-auth.js') req.auth
* def headers = karate.merge(req.headers || {}, authHeader || {})
Given path '/api/customer-details/', req.params.id
And headers headers
And request req.body
When method PUT

* def expectedStatusCode = req.statusCode || responseStatus
* match responseStatus == expectedStatusCode

# match response schema in 'test-data' or any object
* def responseContains = req.matchResponse === true? req.responseMatch : responseType == 'json'? {} : ''
* match  response contains responseContains

# validate nested array: carts
* def carts_EachContains = req.matchResponse === true && req.responseMatchesEach && req.responseMatchesEach.carts? req.responseMatchesEach.carts : {}
* def carts_Response = response.carts || []
* match each carts_Response contains carts_EachContains
