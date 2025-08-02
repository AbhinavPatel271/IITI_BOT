import requests

url = "http://localhost:8001/v1/retrieve"

payload = {
    "query": "What are the Anti-ragging measures in the college?",
    "k": 2,
    "metadata_filter": None,
    "filepath_globpattern": None
}

response = requests.post(url, json=payload)

if response.status_code == 200:
    results = response.json()
    print("Retrieved documents:")
    for doc in results:
        print(doc)
else:
    print("Request failed with status code:", response.status_code)
    print("Response body:", response.text)
