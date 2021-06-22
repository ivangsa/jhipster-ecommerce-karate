Feature: deleteProductCategory
	

Background:
* url baseUrl

Scenario Outline: Test deleteProductCategoryUsingDELETE for <status> status code
	* def req = read(<testDataFile>)
	* def result = call read('deleteProductCategoryUsingDELETE.feature@operation') req
	* match result.responseStatus == <status>
		Examples:
		| status | testDataFile |
		| 200 | 'test-data/deleteProductCategoryUsingDELETE_200.yml' |
		| 204 | 'test-data/deleteProductCategoryUsingDELETE_204.yml' |
		| 401 | 'test-data/deleteProductCategoryUsingDELETE_401.yml' |
		| 403 | 'test-data/deleteProductCategoryUsingDELETE_403.yml' |



@ignore @operation
Scenario: deleteProductCategoryUsingDELETE
* def req = __arg
* def authHeader = call read('classpath:karate-auth.js') req.auth
* def headers = karate.merge(req.headers || {}, authHeader || {})
Given path '/api/product-categories/', req.params.id
And headers headers
When method DELETE

* def expectedStatusCode = req.statusCode || responseStatus
* match responseStatus == expectedStatusCode
