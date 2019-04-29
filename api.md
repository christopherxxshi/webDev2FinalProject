# API
## User

### GET /api/user/:id
- Return type

    ```
    {
        _id: String,
        username: String,
        languages: Array,
        imagePath：String (optional)
    }
    ```

- example
    
    ```json
    {
        "languages": [
            "OC"
        ],
        "_id": "f646e24c-5a8e-4fb6-bbb0-3cd0c94641b0",
        "username": "harry potter",
        "imagePath": "/user/3242432342.jpg",
        "__v": 0
    }
    ```
  
### POST /api/user/
  
  - data type
  
    ```
    {
        username: String,
        languages: Array(optional),
        imagePath: String(optional)
    } 
    ```

- example 

    ```JSON
    {
    	"username": "harry potter",
    	"imagePath": "/user/3242432342.jpg",
    	"languages": ["Java"]
    }
    ```
    
### PATCH /api/user/:id
- data type
  
    ```
    {
        username: String(optional),
        languages: Array(optional),
        imagePath: String(optional)
    } 
    ```
    
- example 

    ```JSON
    {
    	"username": "Mary potter"
    }
    ```
 
## Question 

### GET /api/questions

- Return type

    ```
    {
		LanguageName:[
			{
			_id,
			ownerId,
			title,
			desc,
			vote,
			comments:[
				{
					_id,
					userId,
					comment
				}
		  	]}
		]
    }
    ```

- Example

	```json
	{
	  "Javascript":[
		  {
			"_id": "0c4ddbac-8b90-462e-ba17-0e5da7a019b2",
			"ownerId": "c2c0d94e-7fe3-46ea-82a1-91dd4f1b6fea",
			"title": "How to learn Promise?",
			"desc" : "How to learn Promise? ...",
			"vote" : 5, 
			"comments": [
				{
					"_id": "ab36ec69-c502-4def-ac9c-3865d91fda84",
					"userId": "8372caad-0ec2-477a-a496-1b64534759ec",
					"comment": "It's easy."
				},
				{
					"_id": "6f7098df-fede-45b5-9a20-5e85c107ada8",
					"userId": "8372caad-0ec2-477a-a496-1b64534759ec",
					"comment": "I agree."
				}
			]
		  },
		  {
			"_id": "3b4e3555-77d3-42af-ae38-03e463e95292",
			"ownerId": "c2c0d94e-7fe3-46ea-82a1-91dd4f1b6fea",
			"title": "How to learn Async?",
			"desc" : "How to learn Async? ...",
			"vote": 10,
			"comments": []
		  }
	  ],
	  "Python":[
		  {
			"_id": "d0feb7c1-d4a8-4ca6-a8a7-2ed0a0189e28",
			"ownerId": "c2c0d94e-7fe3-46ea-82a1-91dd4f1b6fea",
			"title": "How to use dictionary in Python?",
			"desc" : "How to use dictionary in Python? ...",
			"vote": 1,
			"comments": [
				{
					"_id": "956f8670-3bb3-460f-88cd-24ca7ee9091f",
					"userId": "8372caad-0ec2-477a-a496-1b64534759ec",
					"comment": "..."
				}
			]
		  }
	  ]
	}
	```