<h1>IITI-BOT Document Store Server</h1>

<p>This is the <strong>Document Store Server</strong> for the <strong>IITI-BOT</strong> project. It serves as a vector database and embedding-based document retriever.</p>

<h2>📁 Folder Structure</h2>
<pre>
IITISOC_DocStore/
└── pathway_docstore/
    ├── main.py
    ├── requirements.txt
    ├── Dockerfile
    └── ...
</pre>

<h2>🚀 Ways to Run the Document Store Locally</h2>

<h3>📌 Method 1: Using Virtual Environment (venv)</h3>
<ol>
  <li>Assuming you are in the repository root in the terminal, navigate to the folder:</li>
  <pre><code>cd IITISOC_DocStore/pathway_docstore</code></pre>

  <li>Create and activate a virtual environment:</li>
  <pre><code>
python3 -m venv venv
source venv/bin/activate   # On Windows: venv\Scripts\activate
</code></pre>

  <li>Install dependencies:</li>
  <pre><code>pip install -r requirements.txt</code></pre>

  <li>Set the required environment variable:</li>
  <pre><code>export GEMINI_API_KEY=your_google_gemini_api_key</code></pre>

  <li>Run the server:</li>
  <pre><code>python main.py</code></pre>
</ol>

<h3>🐳 Method 2: Using Docker</h3>
<ol>
  <li>Navigate to the folder:</li>
  <pre><code>cd IITISOC_DocStore/pathway_docstore</code></pre>

  <li>Build the Docker image:</li>
  <pre><code>docker build -t docstore-server .</code></pre>

  <li>Run the container (passing the env variable):</li>
  <pre><code>
docker run -p 5000:5000 \
  -e GEMINI_API_KEY=your_google_gemini_api_key \
  docstore-server
</code></pre>
</ol>

<h2>🌐 Required Environment Variable</h2>
<p>
You must set the following environment variable before running:
</p>
<pre><code>GEMINI_API_KEY=your_google_gemini_api_key</code></pre>

<h2>⚠️ NOTE</h2>
<p>
When the document store is queried for the <strong>first time</strong>, it will take some time to respond because it needs to compute embeddings from scratch. However, once queried, the  embeddings are cached, <strong>subsequent queries</strong> will be much <strong>faster</strong> as the cached embeddings are reused.
</p>
