Feature: createProductCategory
	

Background:
* url baseUrl

Scenario Outline: Test createProductCategoryUsingPOST for <status> status code
	* def req = read(<testDataFile>)
	* def result = call read('createProductCategoryUsingPOST.feature@operation') req
	* match result.responseStatus == <status>
		Examples:
		| status | testDataFile |
		| 200 | 'test-data/createProductCategoryUsingPOST_200.yml' |
		| 201 | 'test-data/createProductCategoryUsingPOST_201.yml' |
		| 401 | 'test-data/createProductCategoryUsingPOST_401.yml' |
		| 403 | 'test-data/createProductCategoryUsingPOST_403.yml' |
		| 404 | 'test-data/createProductCategoryUsingPOST_404.yml' |



@ignore @operation
Scenario: createProductCategoryUsingPOST
* def req = __arg
* def authHeader = call read('classpath:karate-auth.js') req.auth
* def headers = karate.merge(req.headers || {}, authHeader || {})
Given path '/api/product-categories'
And headers headers
And request req.body
When method POST

* def expectedStatusCode = req.statusCode || responseStatus
* match responseStatus == expectedStatusCode

# match response schema in 'test-data' or any object
* def responseContains = req.matchResponse === true? req.responseMatch : responseType == 'json'? {} : ''
* match  response contains responseContains

# validate nested array: products
* def products_EachContains = req.matchResponse === true && req.responseMatchesEach && req.responseMatchesEach.products? req.responseMatchesEach.products : {}
* def products_Response = response.products || []
* match each products_Response contains products_EachContains
