Feature: deleteCustomerDetails
	

Background:
* url baseUrl

Scenario Outline: Test deleteCustomerDetailsUsingDELETE for <status> status code
	* def req = read(<testDataFile>)
	* def result = call read('deleteCustomerDetailsUsingDELETE.feature@operation') req
	* match result.responseStatus == <status>
		Examples:
		| status | testDataFile |
		| 200 | 'test-data/deleteCustomerDetailsUsingDELETE_200.yml' |
		| 204 | 'test-data/deleteCustomerDetailsUsingDELETE_204.yml' |
		| 401 | 'test-data/deleteCustomerDetailsUsingDELETE_401.yml' |
		| 403 | 'test-data/deleteCustomerDetailsUsingDELETE_403.yml' |



@ignore @operation
Scenario: deleteCustomerDetailsUsingDELETE
* def req = __arg
* def authHeader = call read('classpath:karate-auth.js') req.auth
* def headers = karate.merge(req.headers || {}, authHeader || {})
Given path '/api/customer-details/', req.params.id
And headers headers
When method DELETE

* def expectedStatusCode = req.statusCode || responseStatus
* match responseStatus == expectedStatusCode
