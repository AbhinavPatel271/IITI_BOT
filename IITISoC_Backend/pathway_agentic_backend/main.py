import os
import pathway as pw
from Pipeline.pipeline import Pipeline
from pathway.xpacks.llm import llms
from pathway.xpacks.llm.servers import BaseRestServer


LLM = llms.LiteLLMChat(
    model="groq/llama3-70b-8192"
)

class CustomServer(BaseRestServer):
    def __init__(
        self,
        host: str,
        port: int,
        pipeline: "Pipeline",
        with_cors: bool,
        **rest_kwargs
    ):
    
        self.webserver = pw.io.http.PathwayWebserver(
            host=host,
            port=port,
            with_cors=with_cors
        )

        self.serve(
            route="/v1/chat",
            schema=pipeline.QuerySchema,
            handler=pipeline.run,
            **rest_kwargs,
        )

 
server = CustomServer(
    host="0.0.0.0",
    port=int(os.environ.get("PORT", 3000)),  # fallback to 3000 locally
    pipeline=Pipeline(LLM),
    with_cors=True
)


server.run()