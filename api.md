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
  
  - post body type
  
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
- post body type
  
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

### GET /api/question

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

    ```JSON
    {
        "Java": [],
        "JavaScript": [
            {
                "_id": "0ba38a48-e55e-4705-a37f-734b01709366",
                "ownerId": "b7e6ee8f-7016-4624-94a9-944f48ee4e39",
                "title": "how to learn js?",
                "desc": "this is my first time to learn js",
                "language": "JavaScript",
                "vote": 2,
                "comments": [
                    {
                        "_id": "bb17ee46-7683-4c47-955a-fa43af4ded01",
                        "userId": "eb1fb1b6-c5e3-4173-aa81-1dff391dd4da",
                        "comment": "It's hard!"
                    }
                ],
                "__v": 0
            }
        ],
        "Python": [
            {
                "_id": "87a874d9-107a-4a96-9e45-69ac244af419",
                "ownerId": "b7e6ee8f-7016-4624-94a9-944f48ee4e39",
                "title": "how to learn Python?",
                "desc": "this is my first time to learn Python",
                "language": "Python",
                "vote": 0,
                "comments": [],
                "__v": 0
            }
        ],
        "Objective-C": [],
        "TypeScript": [],
        "C++": [],
        "C#": [],
        "C": [],
        "Others": []
    }
    ```
	
### GET /api/question/:qId

- return type

    ```
    {
        _id: String,
        ownerId: String,
        title: String, 
        desc: String,
        language: String,
        vote: Number,
        comments: Array (optional)
    }
    ``` 
    
- example

    ```JSON
    {
        "_id": "0ba38a48-e55e-4705-a37f-734b01709366",
        "ownerId": "b7e6ee8f-7016-4624-94a9-944f48ee4e39",
        "title": "how to learn js?",
        "desc": "this is my first time to learn js",
        "language": "JavaScript",
        "vote": 2,
        "comments": [
            {
                "_id": "bb17ee46-7683-4c47-955a-fa43af4ded01",
                "userId": "eb1fb1b6-c5e3-4173-aa81-1dff391dd4da",
                "comment": "It's hard!"
            }
        ],
        "__v": 0
    }
    ```
    
### GET /api/question/language/:language

- return type

    ```
    [
        {
            _id: String,
            ownerId: String,
            title: String, 
            desc: String,
            language: String,
            vote: Number,
            comments: Array (optional)
        },
    ]
    ```
    
- example

    ```JSON
    [
        {
            "_id": "87a874d9-107a-4a96-9e45-69ac244af419",
            "ownerId": "b7e6ee8f-7016-4624-94a9-944f48ee4e39",
            "title": "how to learn Python?",
            "desc": "this is my first time to learn Python",
            "language": "Python",
            "vote": 0,
            "comments": [],
            "__v": 0
        }
    ]
    ```
    
### POST /api/question/user/:userId

- post body type

    ```
    {
        title: String, 
        desc: String,
        language: String
    }
    ```
    
- example

    ```JSON
    {
    	"title" : "How to use Promise?",
    	"desc" : "How to use Promise?",
    	"language": "JavaScript"
    }
    ```    
    
    
### POST /api/question/:qId/comment

- post body type

    ```
    {
        userId: String,
        comment: String
    }
    ```

- example

    ```JSON
    {
    	"userId":"805b2a2b-ec8d-4758-a63a-38d76a68f361",
    	"comment":"look at this article"
    }
    ```


### DELETE /api/question/:questionId/comment/:commentId

### GET /api/question/user/:userId
    
- Get all questions posted by this user
- return type
    
    ```
    [
        {
            _id: String,
            ownerId: String,
            title: String, 
            desc: String,
            language: String,
            vote: Number,
            comments: Array (optional)
        },
    ]
    ```
- example
    
    ```JSON
    [
        {
            "_id": "0ba38a48-e55e-4705-a37f-734b01709366",
            "ownerId": "b7e6ee8f-7016-4624-94a9-944f48ee4e39",
            "title": "how to learn js?",
            "desc": "this is my first time to learn js",
            "language": "JavaScript",
            "vote": 2,
            "comments": [
                {
                    "_id": "bb17ee46-7683-4c47-955a-fa43af4ded01",
                    "userId": "eb1fb1b6-c5e3-4173-aa81-1dff391dd4da",
                    "comment": "It's hard!"
                }
            ],
            "__v": 0
        },
        {
            "_id": "87a874d9-107a-4a96-9e45-69ac244af419",
            "ownerId": "b7e6ee8f-7016-4624-94a9-944f48ee4e39",
            "title": "how to learn Python?",
            "desc": "this is my first time to learn Python",
            "language": "Python",
            "vote": 0,
            "comments": [],
            "__v": 0
        },
        {
            "_id": "024908dd-00fd-4a69-b636-d9329d9dad6a",
            "ownerId": "b7e6ee8f-7016-4624-94a9-944f48ee4e39",
            "title": "How to use Promise?",
            "desc": "How to use Promise?",
            "language": "JavaScript",
            "vote": 0,
            "comments": [
                {
                    "_id": "ccf41c47-b275-4edc-b724-8440f8b8a582",
                    "userId": "805b2a2b-ec8d-4758-a63a-38d76a68f361",
                    "comment": "look at this article"
                }
            ],
            "__v": 0
        }
    ]
    ```

### PATCH /api/question/:qId

- data type
    
    ```
    {
        title: String(optional), 
        desc: String(optional),
        language: String(optional),
        vote: Number(optional),
    }
    ```

- example
    
    ```JSON
    {
        "vote": 2
    }
    ```
    
## Langugage

### GET /api/language

- return type: Array[String]
- example
    
    ```JSON
    [
        "Java",
        "JavaScript",
        "Python",
        "Objective-C",
        "TypeScript",
        "C++",
        "C#",
        "C",
        "Others"
    ]
    ```
    
    