<h1>IITI-BOT Pathway Agentic Backend Server</h1>

<p>This is the <strong>Agentic Backend Server</strong> for the <strong>IITI-BOT</strong> project, powered by Pathway. It handles LLM-based reasoning, multi-step query routing, and document-based question answering.</p>

<h2>📁 Folder Structure</h2>
<pre>
IITISoC_Backend/
└── pathway_agentic_backend/
    ├── main.py
    ├── requirements.txt
    ├── Dockerfile
    ├── .env
    └── ...
</pre>

<h2>🚀 Ways to Run the Backend Server Locally</h2>

<h3>📌 Method 1: Using Virtual Environment (venv) , This method won't work in windows.</h3>
<ol>
  <li>Navigate to the folder:</li>
  <pre><code>cd IITISoC_Backend/pathway_agentic_backend</code></pre>

  <li>Create and activate a virtual environment:</li>
  <pre><code>
python3 -m venv venv
source venv/bin/activate    
</code></pre>

  <li>Install dependencies:</li>
  <pre><code>pip install -r requirements.txt</code></pre>

  <li>Create a <code>.env</code> file in the same folder and add:</li>
  <pre><code>GROQ_API_KEY=your_groq_api_key</code></pre>

  <li>Run the server (runs on port 3000):</li>
  <pre><code>python main.py</code></pre>
</ol>

<h3>🐳 Method 2: Using Docker</h3>
<ol>
  <li>Navigate to the folder:</li>
  <pre><code>cd IITISoC_Backend/pathway_agentic_backend</code></pre>

  <li>Build the Docker image:</li>
  <pre><code>docker build -t agentic-backend .</code></pre>

  <li>Run the container (binds host port 3000 to container port 3000):</li>
  <pre><code>
docker run -p 3000:3000 \
  --env-file .env \
  agentic-backend
</code></pre>

  
</ol>

<h2>🌐 Required Environment Variable</h2>
<p>
Make sure to define this in a <code>.env</code> file inside <code>pathway_agentic_backend/</code>:
</p>
<pre><code>GROQ_API_KEY=your_groq_api_key</code></pre>

<h2>⚠️ NOTE</h2>
<p>
This backend server depends on the <strong>Document Store Server</strong>. Please ensure that the document store is <strong>already running</strong> before starting this backend, otherwise document retrieval will fail and query responses may be incomplete.
</p>
