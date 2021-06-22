Feature: getAllProductCategories
	

Background:
* url baseUrl

Scenario Outline: Test getAllProductCategoriesUsingGET for <status> status code
	* def req = read(<testDataFile>)
	* def result = call read('getAllProductCategoriesUsingGET.feature@operation') req
	* match result.responseStatus == <status>
		Examples:
		| status | testDataFile |
		| 200 | 'test-data/getAllProductCategoriesUsingGET_200.yml' |
		| 401 | 'test-data/getAllProductCategoriesUsingGET_401.yml' |
		| 403 | 'test-data/getAllProductCategoriesUsingGET_403.yml' |
		| 404 | 'test-data/getAllProductCategoriesUsingGET_404.yml' |



@ignore @operation
Scenario: getAllProductCategoriesUsingGET
* def req = __arg
* def authHeader = call read('classpath:karate-auth.js') req.auth
* def headers = karate.merge(req.headers || {}, authHeader || {})
Given path '/api/product-categories'
And param page = req.params.page
And param size = req.params.size
And param sort = req.params.sort
And headers headers
When method GET

* def expectedStatusCode = req.statusCode || responseStatus
* match responseStatus == expectedStatusCode

# match response schema in 'test-data' or any object
* def responseContains = req.matchResponse === true? req.responseMatch : responseType == 'json'? {} : ''
* match  each  response contains responseContains

