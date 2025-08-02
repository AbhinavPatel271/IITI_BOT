import warnings
warnings.filterwarnings("ignore", message="pkg_resources is deprecated", category=UserWarning)

import pathway as pw
from pathway.stdlib.indexing.nearest_neighbors import BruteForceKnnFactory
from pathway.xpacks.llm.document_store import DocumentStore
from pathway.xpacks.llm.embedders import GeminiEmbedder
from pathway.xpacks.llm.parsers import PypdfParser  
from pathway.xpacks.llm.splitters import RecursiveSplitter  
from pathway.xpacks.llm.servers import DocumentStoreServer
import os
from dotenv import load_dotenv
load_dotenv()
gemini_api_key = os.environ.get("GEMINI_API_KEY")

documents = pw.io.fs.read(path="./data/", 
                        format="binary",
                        mode="static",
                        name="name_of_connector",
                        with_metadata=True)

parser = PypdfParser(
        apply_text_cleanup = True,
        cache_strategy = None
)

text_splitter = RecursiveSplitter(
    chunk_size=800,
    chunk_overlap=200
)

embedder = GeminiEmbedder(
    model="models/embedding-001",
    api_key=gemini_api_key
)

retriever_factory = BruteForceKnnFactory(
    embedder=embedder,
)

document_store = DocumentStore(
    docs=documents,
    retriever_factory=retriever_factory,
    parser=parser,
    splitter=text_splitter,
)

host = "0.0.0.0"
port = int(os.environ.get("PORT", 8001))  # Render will set $PORT

server = DocumentStoreServer(
    host=host,
    port=port,
    document_store=document_store
)

server.run(
    with_cache=False
)



 