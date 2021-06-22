Feature: updateProductCategory
	

Background:
* url baseUrl

Scenario Outline: Test updateProductCategoryUsingPUT for <status> status code
	* def req = read(<testDataFile>)
	* def result = call read('updateProductCategoryUsingPUT.feature@operation') req
	* match result.responseStatus == <status>
		Examples:
		| status | testDataFile |
		| 200 | 'test-data/updateProductCategoryUsingPUT_200.yml' |
		| 201 | 'test-data/updateProductCategoryUsingPUT_201.yml' |
		| 401 | 'test-data/updateProductCategoryUsingPUT_401.yml' |
		| 403 | 'test-data/updateProductCategoryUsingPUT_403.yml' |
		| 404 | 'test-data/updateProductCategoryUsingPUT_404.yml' |



@ignore @operation
Scenario: updateProductCategoryUsingPUT
* def req = __arg
* def authHeader = call read('classpath:karate-auth.js') req.auth
* def headers = karate.merge(req.headers || {}, authHeader || {})
Given path '/api/product-categories/', req.params.id
And headers headers
And request req.body
When method PUT

* def expectedStatusCode = req.statusCode || responseStatus
* match responseStatus == expectedStatusCode

# match response schema in 'test-data' or any object
* def responseContains = req.matchResponse === true? req.responseMatch : responseType == 'json'? {} : ''
* match  response contains responseContains

# validate nested array: products
* def products_EachContains = req.matchResponse === true && req.responseMatchesEach && req.responseMatchesEach.products? req.responseMatchesEach.products : {}
* def products_Response = response.products || []
* match each products_Response contains products_EachContains
