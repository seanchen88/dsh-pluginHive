/*
 * GENERATED — do not edit by hand. Regenerate with:
 *
 *   MCPHUB_CATALOG=/path/to/mcphub_custom/servers.json pnpm gen:catalog
 *
 * Bundled local MCP catalog (the community "MCPM" list as vendored by MCP Hub).
 * It exists so the market panel has a catalog with no network at all, and it is
 * the stdio half of what mcphub's market shows: each entry carries a complete
 * command line plus `${VAR}` holes for the credentials the user must supply.
 *
 * Upstream: MCP Hub community catalog (servers.json), itself the MCPM catalog
 * License:  Apache-2.0 (MCP Hub); community data terms follow mcpm.sh — attribution kept deliberately
 *           visible here because this repository is MIT and this data is not.
 */

/** Raw catalog document; shape asserted once in `local-catalog.ts`, not inferred here. */
export const LOCAL_CATALOG_RAW: unknown = {
 "provenance": {
  "source": "MCP Hub community catalog (servers.json), itself the MCPM catalog",
  "upstreamLicense": "Apache-2.0 (MCP Hub); community data terms follow mcpm.sh",
  "generatedBy": "scripts/gen-local-catalog.mjs",
  "generatedFrom": "servers.json",
  "entryCount": 300
 },
 "servers": {
  "firecrawl": {
   "displayName": "Firecrawl",
   "description": "Advanced web scraping with JavaScript rendering, PDF support, and smart rate limiting",
   "categories": [
    "Web Services"
   ],
   "tags": [
    "firecrawl",
    "scraping",
    "web",
    "api",
    "automation"
   ],
   "repository": "https://github.com/mendableai/firecrawl-mcp-server",
   "homepage": "https://github.com/mendableai/firecrawl-mcp-server",
   "official": true,
   "methods": [
    {
     "type": "npm",
     "command": "npx",
     "args": [
      "-y",
      "firecrawl-mcp"
     ],
     "env": {
      "FIRECRAWL_API_KEY": null
     }
    }
   ],
   "variables": {
    "FIRECRAWL_API_KEY": {
     "description": "Your FireCrawl API key. Required for using the cloud API (default) and optional for self-hosted instances.",
     "required": true,
     "example": "fc-YOUR_API_KEY"
    }
   }
  },
  "rabbitmq": {
   "displayName": "RabbitMQ",
   "description": "The MCP server that interacts with RabbitMQ to publish and consume messages.",
   "categories": [
    "Messaging"
   ],
   "tags": [
    "rabbitmq",
    "server",
    "messaging"
   ],
   "repository": "https://github.com/kenliao94/mcp-server-rabbitmq",
   "homepage": "https://github.com/kenliao94/mcp-server-rabbitmq",
   "official": false,
   "methods": [
    {
     "type": "uvx",
     "command": "uvx",
     "args": [
      "--from",
      "git+https://github.com/kenliao94/mcp-server-rabbitmq",
      "mcp-server-rabbitmq",
      "--rabbitmq-host",
      "${RABBITMQ_HOST}",
      "--port",
      "${RABBITMQ_PORT}",
      "--username",
      "${RABBITMQ_USERNAME}",
      "--password",
      "${RABBITMQ_PASSWORD}",
      "--use-tls",
      "${USE_TLS}"
     ],
     "env": {}
    }
   ],
   "variables": {
    "RABBITMQ_HOST": {
     "description": "The hostname of the RabbitMQ server (e.g., test.rabbit.com, localhost).",
     "required": true,
     "example": "test.rabbit.com"
    },
    "RABBITMQ_PORT": {
     "description": "The port number to connect to the RabbitMQ server (e.g., 5672).",
     "required": true,
     "example": "5672"
    },
    "RABBITMQ_USERNAME": {
     "description": "The username to authenticate with the RabbitMQ server.",
     "required": true,
     "example": "guest"
    },
    "RABBITMQ_PASSWORD": {
     "description": "The password for the RabbitMQ username provided.",
     "required": true,
     "example": "guest"
    },
    "USE_TLS": {
     "description": "Set to true if using TLS (AMQPS), otherwise false.",
     "required": false,
     "example": "true or false"
    }
   }
  },
  "mcp-server-axiom": {
   "displayName": "Axiom MCP Server",
   "description": "A [Model Context Protocol](https://modelcontextprotocol.io/) server implementation for [Axiom](https://axiom.co) that enables AI agents to query your data using Axiom Processing Language (APL).",
   "categories": [
    "Analytics"
   ],
   "tags": [
    "axiom",
    "apl",
    "data",
    "query"
   ],
   "repository": "https://github.com/axiomhq/mcp-server-axiom",
   "homepage": "https://axiom.co",
   "official": true,
   "methods": [
    {
     "type": "custom",
     "command": "axiom-mcp",
     "args": [
      "--config",
      "config.txt"
     ],
     "env": {}
    }
   ],
   "variables": {
    "token": {
     "description": "Axiom API token",
     "required": true,
     "example": "xaat-your-token"
    },
    "url": {
     "description": "Axiom API URL",
     "required": true,
     "example": "https://api.axiom.co"
    },
    "query-rate": {
     "description": "Rate limit for queries",
     "required": false,
     "example": "1"
    },
    "query-burst": {
     "description": "Burst limit for queries",
     "required": false,
     "example": "1"
    },
    "datasets-rate": {
     "description": "Rate limit for dataset listing",
     "required": false,
     "example": "1"
    },
    "datasets-burst": {
     "description": "Burst limit for dataset listing",
     "required": false,
     "example": "1"
    }
   }
  },
  "mcp-clickhouse": {
   "displayName": "ClickHouse MCP Server",
   "description": "An MCP server for ClickHouse.",
   "categories": [
    "Databases"
   ],
   "tags": [
    "clickhouse",
    "database",
    "sql"
   ],
   "repository": "https://github.com/ClickHouse/mcp-clickhouse",
   "homepage": "https://glama.ai/mcp/servers/yvjy4csvo1",
   "official": true,
   "methods": [
    {
     "type": "uvx",
     "command": "uv",
     "args": [
      "run",
      "--with",
      "mcp-clickhouse",
      "--python",
      "3.13",
      "mcp-clickhouse"
     ],
     "env": {
      "CLICKHOUSE_HOST": "<clickhouse-host>",
      "CLICKHOUSE_PORT": "<clickhouse-port>",
      "CLICKHOUSE_USER": "<clickhouse-user>",
      "CLICKHOUSE_PASSWORD": "<clickhouse-password>",
      "CLICKHOUSE_SECURE": "true",
      "CLICKHOUSE_VERIFY": "true",
      "CLICKHOUSE_CONNECT_TIMEOUT": "30",
      "CLICKHOUSE_SEND_RECEIVE_TIMEOUT": "30"
     }
    },
    {
     "type": "python",
     "command": "pip",
     "args": [
      "install",
      "mcp-clickhouse"
     ],
     "env": {}
    }
   ],
   "variables": {
    "CLICKHOUSE_HOST": {
     "description": "The hostname of your ClickHouse server",
     "required": true,
     "example": "sql-clickhouse.clickhouse.com"
    },
    "CLICKHOUSE_USER": {
     "description": "The username for authentication",
     "required": true,
     "example": "demo"
    },
    "CLICKHOUSE_PASSWORD": {
     "description": "The password for authentication",
     "required": true,
     "example": ""
    },
    "CLICKHOUSE_PORT": {
     "description": "The port number of your ClickHouse server",
     "required": false,
     "example": "8443"
    },
    "CLICKHOUSE_SECURE": {
     "description": "Enable/disable HTTPS connection",
     "required": false,
     "example": "true"
    },
    "CLICKHOUSE_VERIFY": {
     "description": "Enable/disable SSL certificate verification",
     "required": false,
     "example": "true"
    },
    "CLICKHOUSE_CONNECT_TIMEOUT": {
     "description": "Connection timeout in seconds",
     "required": false,
     "example": "30"
    },
    "CLICKHOUSE_SEND_RECEIVE_TIMEOUT": {
     "description": "Send/receive timeout in seconds",
     "required": false,
     "example": "300"
    },
    "CLICKHOUSE_DATABASE": {
     "description": "Default database to use",
     "required": false,
     "example": "your_database"
    }
   }
  },
  "aws-cost-explorer": {
   "displayName": "AWS Cost Explorer",
   "description": "Optimize your AWS spend (including Amazon Bedrock spend) with this MCP server by examining spend across regions, services, instance types and foundation models ([demo video](https://www.youtube.com/watch?v=WuVOmYLRFmI&feature=youtu.be)).",
   "categories": [
    "Analytics"
   ],
   "tags": [
    "Cost Explorer",
    "Amazon Bedrock",
    "AWS"
   ],
   "repository": "https://github.com/aarora79/aws-cost-explorer-mcp-server",
   "homepage": "https://github.com/aarora79/aws-cost-explorer-mcp-server",
   "official": false,
   "methods": [
    {
     "type": "uvx",
     "command": "uvx",
     "args": [
      "--directory",
      "/path/to/aws-cost-explorer-mcp-server",
      "run",
      "server.py"
     ],
     "env": {
      "AWS_ACCESS_KEY_ID": null,
      "AWS_SECRET_ACCESS_KEY": null,
      "AWS_REGION": null,
      "BEDROCK_LOG_GROUP_NAME": null,
      "MCP_TRANSPORT": "stdio"
     }
    },
    {
     "type": "docker",
     "command": "docker",
     "args": [
      "run",
      "-i",
      "--rm",
      "-e",
      "AWS_ACCESS_KEY_ID",
      "-e",
      "AWS_SECRET_ACCESS_KEY",
      "-e",
      "AWS_REGION",
      "-e",
      "BEDROCK_LOG_GROUP_NAME",
      "-e",
      "MCP_TRANSPORT",
      "aws-cost-explorer-mcp:latest"
     ],
     "env": {
      "AWS_ACCESS_KEY_ID": null,
      "AWS_SECRET_ACCESS_KEY": null,
      "AWS_REGION": null,
      "BEDROCK_LOG_GROUP_NAME": null,
      "MCP_TRANSPORT": "stdio"
     }
    }
   ],
   "variables": {
    "AWS_ACCESS_KEY_ID": {
     "description": "Your AWS Access Key ID required for authenticating API calls to AWS services.",
     "required": true,
     "example": "AKIA…example…"
    },
    "AWS_SECRET_ACCESS_KEY": {
     "description": "Your AWS Secret Access Key required alongside the Access Key ID for authentication.",
     "required": true,
     "example": "wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY"
    },
    "AWS_REGION": {
     "description": "The AWS region where your resources are located. Examples include 'us-east-1', 'eu-west-1'.",
     "required": true,
     "example": "us-east-1"
    },
    "BEDROCK_LOG_GROUP_NAME": {
     "description": "The name of the CloudWatch log group where Amazon Bedrock model invocation logs are stored.",
     "required": true,
     "example": "my-bedrock-log-group-name"
    }
   }
  },
  "meilisearch-mcp": {
   "displayName": "Meilisearch MCP Server",
   "description": "A Model Context Protocol (MCP) server for interacting with Meilisearch through LLM interfaces like Claude.",
   "categories": [
    "Databases"
   ],
   "tags": [
    "search",
    "meilisearch",
    "indexing",
    "document management"
   ],
   "repository": "https://github.com/meilisearch/meilisearch-mcp",
   "homepage": "https://github.com/meilisearch/meilisearch-mcp",
   "official": true,
   "methods": [
    {
     "type": "uvx",
     "command": "uvx",
     "args": [
      "-n",
      "meilisearch-mcp"
     ],
     "env": {}
    },
    {
     "type": "python",
     "command": "python",
     "args": [
      "-m",
      "src.meilisearch_mcp"
     ],
     "env": {
      "MEILI_HTTP_ADDR": "http://localhost:7700",
      "MEILI_MASTER_KEY": "your_master_key"
     }
    }
   ],
   "variables": {
    "url": {
     "description": "Meilisearch instance URL",
     "required": false,
     "example": "http://localhost:7700"
    },
    "api_key": {
     "description": "Meilisearch API key",
     "required": false,
     "example": "your_master_key"
    }
   }
  },
  "actors-mcp-server": {
   "displayName": "Apify Model Context Protocol (MCP) Server",
   "description": "Implementation of an MCP server for all [Apify Actors](https://apify.com/store).",
   "categories": [
    "Web Services"
   ],
   "tags": [
    "mcp",
    "model-context-protocol",
    "apify",
    "actors",
    "ai-agents"
   ],
   "repository": "https://github.com/apify/actors-mcp-server",
   "homepage": "https://apify.com/apify/actors-mcp-server",
   "official": true,
   "methods": [
    {
     "type": "npm",
     "command": "npx",
     "args": [
      "-y",
      "@apify/actors-mcp-server"
     ],
     "env": {
      "APIFY_TOKEN": "your-apify-token"
     }
    }
   ],
   "variables": {
    "APIFY_TOKEN": {
     "description": "Your Apify API token for authentication",
     "required": true,
     "example": "your-apify-token"
    }
   }
  },
  "cfbd-api": {
   "displayName": "College Football Data API",
   "description": "An MCP server for the [College Football Data API](https://collegefootballdata.com/).",
   "categories": [
    "Analytics"
   ],
   "tags": [
    "football",
    "college",
    "API",
    "statistics"
   ],
   "repository": "https://github.com/lenwood/cfbd-mcp-server",
   "homepage": "https://github.com/lenwood/cfbd-mcp-server",
   "official": false,
   "methods": [
    {
     "type": "uvx",
     "command": "uvx",
     "args": [
      "--from",
      "git+https://github.com/lenwood/cfbd-mcp-server",
      "cfbd-mcp-server"
     ],
     "env": {
      "CFB_API_KEY": null,
      "PATH": null
     }
    }
   ],
   "variables": {
    "CFB_API_KEY": {
     "description": "The API key required to authenticate requests to the College Football Data API.",
     "required": true,
     "example": "your_api_key_here"
    },
    "PATH": {
     "description": "Environment variable that specifies the path to the Python executable being used by the server.",
     "required": false,
     "example": "/full/path/to/python"
    }
   }
  },
  "redis": {
   "displayName": "Redis",
   "description": "MCP server to interact with Redis Server, AWS Memory DB, etc for caching or other use-cases where in-memory and key-value based storage is appropriate",
   "categories": [
    "Databases"
   ],
   "tags": [],
   "repository": "https://github.com/prajwalnayak7/mcp-server-redis",
   "homepage": "https://github.com/prajwalnayak7/mcp-server-redis",
   "official": false,
   "methods": [
    {
     "type": "uvx",
     "command": "uvx",
     "args": [
      "--from",
      "git+https://github.com/prajwalnayak7/mcp-server-redis",
      "src/server.py"
     ],
     "env": {}
    }
   ],
   "variables": {}
  },
  "iterm-mcp": {
   "displayName": "iTerm",
   "description": "Integration with iTerm2 terminal emulator for macOS, enabling LLMs to execute and monitor terminal commands.",
   "categories": [
    "System Tools"
   ],
   "tags": [
    "iTerm",
    "server",
    "automation"
   ],
   "repository": "https://github.com/ferrislucas/iterm-mcp",
   "homepage": "https://github.com/ferrislucas/iterm-mcp",
   "official": false,
   "methods": [
    {
     "type": "npm",
     "command": "npx",
     "args": [
      "-y",
      "iterm-mcp"
     ],
     "env": {}
    }
   ],
   "variables": {}
  },
  "everything-search": {
   "displayName": "Everything Search",
   "description": "Fast file searching capabilities across Windows (using [Everything SDK](https://www.voidtools.com/support/everything/sdk/)), macOS (using mdfind command), and Linux (using locate/plocate command).",
   "categories": [
    "System Tools"
   ],
   "tags": [
    "search",
    "everything"
   ],
   "repository": "https://github.com/mamertofabian/mcp-everything-search",
   "homepage": "https://github.com/mamertofabian/mcp-everything-search",
   "official": false,
   "methods": [
    {
     "type": "uvx",
     "command": "uvx",
     "args": [
      "mcp-server-everything-search"
     ],
     "env": {
      "EVERYTHING_SDK_PATH": null
     }
    },
    {
     "type": "python",
     "command": "python",
     "args": [
      "-m",
      "mcp_server_everything_search"
     ],
     "env": {
      "EVERYTHING_SDK_PATH": null
     }
    }
   ],
   "variables": {
    "EVERYTHING_SDK_PATH": {
     "description": "Environment variable that specifies the path to the Everything SDK DLL required for the server to function properly.",
     "required": true,
     "example": "path/to/Everything-SDK/dll/Everything64.dll"
    }
   }
  },
  "playwright-mcp": {
   "displayName": "Playwright",
   "description": "This MCP Server will help you run browser automation and webscraping using Playwright",
   "categories": [
    "Web Services"
   ],
   "tags": [
    "Playwright",
    "Browser Automation"
   ],
   "repository": "https://github.com/executeautomation/mcp-playwright",
   "homepage": "https://github.com/executeautomation/mcp-playwright",
   "official": false,
   "methods": [
    {
     "type": "npm",
     "command": "npx",
     "args": [
      "-y",
      "@executeautomation/playwright-mcp-server"
     ],
     "env": {}
    }
   ],
   "variables": {}
  },
  "chroma": {
   "displayName": "Chroma",
   "description": "Vector database server for semantic document search and metadata filtering, built on Chroma",
   "categories": [
    "Databases"
   ],
   "tags": [
    "vector database",
    "semantic search"
   ],
   "repository": "https://github.com/privetin/chroma",
   "homepage": "https://github.com/privetin/chroma",
   "official": false,
   "methods": [
    {
     "type": "uvx",
     "command": "uvx",
     "args": [
      "--from",
      "git+https://github.com/privetin/chroma",
      "chroma"
     ],
     "env": {}
    }
   ],
   "variables": {}
  },
  "fetch-mcp": {
   "displayName": "Fetch",
   "description": "A server that flexibly fetches HTML, JSON, Markdown, or plaintext.",
   "categories": [
    "Web Services"
   ],
   "tags": [
    "fetch",
    "web",
    "api",
    "html",
    "json",
    "markdown"
   ],
   "repository": "https://github.com/zcaceres/fetch-mcp",
   "homepage": "https://github.com/zcaceres/fetch-mcp",
   "official": false,
   "methods": [
    {
     "type": "npm",
     "command": "npx",
     "args": [
      "-y",
      "https://github.com/zcaceres/fetch-mcp"
     ],
     "env": {}
    }
   ],
   "variables": {
    "url": {
     "description": "URL of the website to fetch",
     "required": true,
     "example": "https://example.com"
    },
    "headers": {
     "description": "Custom headers to include in the request",
     "required": false,
     "example": "{\"Authorization\": \"Bearer token\"}"
    }
   }
  },
  "kubernetes": {
   "displayName": "Kubernetes",
   "description": "Connect to Kubernetes cluster and manage pods, deployments, and services.",
   "categories": [
    "Dev Tools"
   ],
   "tags": [
    "kubernetes",
    "server",
    "management"
   ],
   "repository": "https://github.com/Flux159/mcp-server-kubernetes",
   "homepage": "https://github.com/Flux159/mcp-server-kubernetes",
   "official": false,
   "methods": [
    {
     "type": "npm",
     "command": "npx",
     "args": [
      "-y",
      "mcp-server-kubernetes"
     ],
     "env": {}
    }
   ],
   "variables": {}
  },
  "fibery-mcp-server": {
   "displayName": "Fibery MCP Server",
   "description": "This MCP (Model Context Protocol) server provides integration between Fibery and any LLM provider supporting the MCP protocol (e.g., Claude for Desktop), allowing you to interact with your Fibery workspace using natural language.",
   "categories": [
    "Productivity"
   ],
   "tags": [
    "fibery",
    "mcp",
    "llm"
   ],
   "repository": "https://github.com/Fibery-inc/fibery-mcp-server",
   "homepage": "[NOT GIVEN]",
   "official": true,
   "methods": [
    {
     "type": "uv",
     "command": "uv",
     "args": [
      "tool",
      "run",
      "fibery-mcp-server",
      "--fibery-host",
      "your-domain.fibery.io",
      "--fibery-api-token",
      "your-api-token"
     ],
     "env": {}
    }
   ],
   "variables": {
    "fibery-host": {
     "description": "Your Fibery domain (e.g., your-domain.fibery.io)",
     "required": true,
     "example": "your-domain.fibery.io"
    },
    "fibery-api-token": {
     "description": "Your Fibery API token",
     "required": true,
     "example": "your-api-token"
    }
   }
  },
  "unifai-mcp-server": {
   "displayName": "UnifAI MCP Server",
   "description": "Dynamically search and call tools using UnifAI Network",
   "categories": [
    "MCP Tools"
   ],
   "tags": [
    "unifai",
    "mcp"
   ],
   "repository": "https://github.com/unifai-network/unifai-mcp-server",
   "homepage": "https://github.com/unifai-network/unifai-mcp-server",
   "official": true,
   "methods": [
    {
     "type": "npm",
     "command": "npx",
     "args": [
      "-y",
      "-p",
      "unifai-sdk",
      "unifai-tools-mcp"
     ],
     "env": {
      "UNIFAI_AGENT_API_KEY": null
     }
    },
    {
     "type": "uvx",
     "command": "uvx",
     "args": [
      "--from",
      "unifai-sdk",
      "unifai-tools-mcp"
     ],
     "env": {
      "UNIFAI_AGENT_API_KEY": null
     }
    }
   ],
   "variables": {
    "UNIFAI_AGENT_API_KEY": {
     "description": "UnifAI Agent API Key for authentication",
     "required": true,
     "example": "<UNIFAI_AGENT_API_KEY>"
    }
   }
  },
  "contentful-mcp": {
   "displayName": "Contentful Management",
   "description": "Read, update, delete, publish content in your [Contentful](https://contentful.com/) space(s) from this MCP Server.",
   "categories": [
    "Productivity"
   ],
   "tags": [
    "Contentful",
    "Management API",
    "CRUD Operations"
   ],
   "repository": "https://github.com/ivo-toby/contentful-mcp",
   "homepage": "https://github.com/ivo-toby/contentful-mcp",
   "official": false,
   "methods": [
    {
     "type": "npm",
     "command": "npx",
     "args": [
      "-y",
      "@ivotoby/contentful-management-mcp-server"
     ],
     "env": {
      "CONTENTFUL_MANAGEMENT_ACCESS_TOKEN": null
     }
    }
   ],
   "variables": {
    "CONTENTFUL_MANAGEMENT_ACCESS_TOKEN": {
     "description": "Your Content Management API token for accessing Contentful services.",
     "required": true,
     "example": "<Your CMA token>"
    }
   }
  },
  "deepseek-mcp-server": {
   "displayName": "DeepSeek",
   "description": "Model Context Protocol server integrating DeepSeek's advanced language models, in addition to [other useful API endpoints](https://github.com/DMontgomery40/deepseek-mcp-server?tab=readme-ov-file#features)",
   "categories": [
    "AI Systems"
   ],
   "tags": [
    "DeepSeek",
    "API",
    "Language Model"
   ],
   "repository": "https://github.com/DMontgomery40/deepseek-mcp-server",
   "homepage": "https://github.com/DMontgomery40/deepseek-mcp-server",
   "official": false,
   "methods": [
    {
     "type": "npm",
     "command": "npx",
     "args": [
      "-y",
      "deepseek-mcp-server"
     ],
     "env": {
      "DEEPSEEK_API_KEY": null
     }
    }
   ],
   "variables": {
    "DEEPSEEK_API_KEY": {
     "description": "An API key required to authenticate requests to the DeepSeek API.",
     "required": true,
     "example": "your-api-key"
    }
   }
  },
  "gitlab": {
   "displayName": "GitLab",
   "description": "GitLab API, enabling project management",
   "categories": [
    "Dev Tools"
   ],
   "tags": [
    "GitLab",
    "API"
   ],
   "repository": "https://github.com/modelcontextprotocol/servers",
   "homepage": "https://github.com/modelcontextprotocol/servers/blob/main/src/gitlab",
   "official": true,
   "methods": [
    {
     "type": "npm",
     "command": "npx",
     "args": [
      "-y",
      "@modelcontextprotocol/server-gitlab"
     ],
     "env": {
      "GITLAB_PERSONAL_ACCESS_TOKEN": null,
      "GITLAB_API_URL": null
     }
    },
    {
     "type": "docker",
     "command": "docker",
     "args": [
      "run",
      "--rm",
      "-i",
      "-e",
      "GITLAB_PERSONAL_ACCESS_TOKEN",
      "-e",
      "GITLAB_API_URL",
      "mcp/gitlab"
     ],
     "env": {
      "GITLAB_PERSONAL_ACCESS_TOKEN": null,
      "GITLAB_API_URL": null
     }
    }
   ],
   "variables": {
    "GITLAB_PERSONAL_ACCESS_TOKEN": {
     "description": "Your GitLab personal access token",
     "required": true,
     "example": ""
    },
    "GITLAB_API_URL": {
     "description": "Base URL for GitLab API",
     "required": false,
     "example": "https://gitlab.com/api/v4"
    }
   }
  },
  "dune-analytics-mcp": {
   "displayName": "Dune Analytics",
   "description": "A mcp server that bridges Dune Analytics data to AI agents.",
   "categories": [
    "Finance"
   ],
   "tags": [
    "Dune",
    "Analytics",
    "AI agents"
   ],
   "repository": "https://github.com/kukapay/dune-analytics-mcp",
   "homepage": "https://github.com/kukapay/dune-analytics-mcp",
   "official": false,
   "methods": [
    {
     "type": "uvx",
     "command": "uvx",
     "args": [
      "--from",
      "git+https://github.com/kukapay/dune-analytics-mcp",
      "main.py"
     ],
     "env": {
      "DUNE_API_KEY": null
     }
    }
   ],
   "variables": {
    "DUNE_API_KEY": {
     "description": "A valid Dune Analytics API key obtained from Dune Analytics for authentication and data access.",
     "required": true,
     "example": "your_api_key_here"
    }
   }
  },
  "whois-mcp": {
   "displayName": "Whois Lookup",
   "description": "MCP server that performs whois lookup against domain, IP, ASN and TLD.",
   "categories": [
    "Web Services"
   ],
   "tags": [
    "whois",
    "domain",
    "tools"
   ],
   "repository": "https://github.com/bharathvaj-ganesan/whois-mcp",
   "homepage": "https://github.com/bharathvaj-ganesan/whois-mcp",
   "official": false,
   "methods": [
    {
     "type": "npm",
     "command": "npx",
     "args": [
      "-y",
      "@bharathvaj/whois-mcp@latest"
     ],
     "env": {}
    }
   ],
   "variables": {}
  },
  "deepseek-thinker-mcp": {
   "displayName": "Deepseek Thinker",
   "description": "A MCP (Model Context Protocol) provider Deepseek reasoning content to MCP-enabled AI Clients, like Claude Desktop. Supports access to Deepseek's thought processes from the Deepseek API service or from a local Ollama server.",
   "categories": [
    "AI Systems"
   ],
   "tags": [
    "Deepseek",
    "AI Clients",
    "Reasoning"
   ],
   "repository": "https://github.com/ruixingshi/deepseek-thinker-mcp",
   "homepage": "https://github.com/ruixingshi/deepseek-thinker-mcp",
   "official": false,
   "methods": [
    {
     "type": "npm",
     "command": "npx",
     "args": [
      "-y",
      "deepseek-thinker-mcp"
     ],
     "env": {
      "API_KEY": null,
      "BASE_URL": null
     }
    }
   ],
   "variables": {
    "API_KEY": {
     "description": "Your OpenAI API Key for authentication with the OpenAI services.",
     "required": true,
     "example": "sk-xxxxxxxxxx"
    },
    "BASE_URL": {
     "description": "The base URL for the OpenAI API that you are connecting to.",
     "required": true,
     "example": "https://api.openai.com/v1"
    }
   }
  },
  "inbox-zero": {
   "displayName": "Inbox Zero MCP Server",
   "description": "data-color-mode=\"auto\" data-light-theme=\"light\" data-dark-theme=\"dark\"",
   "categories": [
    "Messaging"
   ],
   "tags": [
    "email",
    "inbox",
    "assistant",
    "mcp"
   ],
   "repository": "https://github.com/elie222/inbox-zero",
   "homepage": "https://github.com/elie222/inbox-zero/tree/main/apps/mcp-server",
   "official": true,
   "methods": [
    {
     "type": "custom",
     "command": "node",
     "args": [
      "build/index.js"
     ],
     "env": {
      "API_KEY": ""
     }
    }
   ],
   "variables": {
    "API_KEY": {
     "description": "Your Inbox Zero API key from the /settings page in the web app",
     "required": true,
     "example": "your-api-key-here"
    }
   }
  },
  "git": {
   "displayName": "git",
   "description": "Tools to read, search, and manipulate Git repositories",
   "categories": [
    "Dev Tools"
   ],
   "tags": [
    "Git",
    "Server",
    "Automation"
   ],
   "repository": "https://github.com/modelcontextprotocol/servers",
   "homepage": "https://github.com/modelcontextprotocol/servers/blob/main/src/git",
   "official": true,
   "methods": [
    {
     "type": "uvx",
     "command": "uvx",
     "args": [
      "mcp-server-git",
      "--repository",
      "${GIT_REPO_PATH}"
     ],
     "env": {}
    },
    {
     "type": "docker",
     "command": "docker",
     "args": [
      "run",
      "--rm",
      "-i",
      "--mount",
      "type=bind,src=${GIT_REPO_PATH},dst=${GIT_REPO_PATH}",
      "mcp/git"
     ],
     "env": {}
    },
    {
     "type": "python",
     "command": "python",
     "args": [
      "-m",
      "mcp_server_git",
      "--repository",
      "${GIT_REPO_PATH}"
     ],
     "env": {}
    }
   ],
   "variables": {
    "GIT_REPO_PATH": {
     "description": "The path to the Git repository that the mcp-server-git will interact with.",
     "required": true,
     "example": "/path/to/git/repo"
    }
   }
  },
  "code-executor": {
   "displayName": "Code Executor",
   "description": "An MCP server that allows LLMs to execute Python code within a specified Conda environment.",
   "categories": [
    "Dev Tools"
   ],
   "tags": [
    "Python",
    "Conda",
    "Execution"
   ],
   "repository": "https://github.com/bazinga012/mcp_code_executor",
   "homepage": "https://github.com/bazinga012/mcp_code_executor",
   "official": false,
   "methods": [
    {
     "type": "npm",
     "command": "npx",
     "args": [
      "-y",
      "https://github.com/bazinga012/mcp_code_executor"
     ],
     "env": {
      "CODE_STORAGE_DIR": null,
      "CONDA_ENV_NAME": null
     }
    }
   ],
   "variables": {
    "CODE_STORAGE_DIR": {
     "description": "The directory where the generated code will be stored.",
     "required": true,
     "example": "/path/to/code/storage"
    },
    "CONDA_ENV_NAME": {
     "description": "The name of the Conda environment in which the code will be executed.",
     "required": true,
     "example": "your-conda-env"
    }
   }
  },
  "world-bank-data-api": {
   "displayName": "World Bank Data API",
   "description": "A server that fetches data indicators available with the World Bank as part of their data API",
   "categories": [
    "Knowledge Base"
   ],
   "tags": [
    "World Bank",
    "Data",
    "API",
    "Indicators",
    "Analysis"
   ],
   "repository": "https://github.com/anshumax/world_bank_mcp_server",
   "homepage": "https://github.com/anshumax/world_bank_mcp_server",
   "official": false,
   "methods": [
    {
     "type": "uvx",
     "command": "uvx",
     "args": [
      "--from",
      "git+https://github.com/anshumax/world_bank_mcp_server",
      "world_bank_mcp_server"
     ],
     "env": {}
    }
   ],
   "variables": {}
  },
  "firebase": {
   "displayName": "Firebase",
   "description": "Server to interact with Firebase services including Firebase Authentication, Firestore, and Firebase Storage.",
   "categories": [
    "Databases"
   ],
   "tags": [
    "Firebase",
    "LLM",
    "Server"
   ],
   "repository": "https://github.com/gannonh/firebase-mcp",
   "homepage": "https://github.com/gannonh/firebase-mcp",
   "official": false,
   "methods": [
    {
     "type": "npm",
     "command": "npx",
     "args": [
      "-y",
      "@gannonh/firebase-mcp"
     ],
     "env": {
      "SERVICE_ACCOUNT_KEY_PATH": null,
      "FIREBASE_STORAGE_BUCKET": null
     }
    }
   ],
   "variables": {
    "SERVICE_ACCOUNT_KEY_PATH": {
     "description": "Path to your Firebase service account key JSON file",
     "required": true,
     "example": "/absolute/path/to/serviceAccountKey.json"
    },
    "FIREBASE_STORAGE_BUCKET": {
     "description": "Bucket name for Firebase Storage",
     "required": false,
     "example": "your-project-id.firebasestorage.app"
    }
   }
  },
  "dify": {
   "displayName": "Dify",
   "description": "A simple implementation of an MCP server for dify workflows.",
   "categories": [
    "AI Systems"
   ],
   "tags": [
    "dify",
    "server",
    "workflows"
   ],
   "repository": "https://github.com/YanxingLiu/dify-mcp-server",
   "homepage": "https://github.com/YanxingLiu/dify-mcp-server",
   "official": false,
   "methods": [
    {
     "type": "uvx",
     "command": "uvx",
     "args": [
      "--from",
      "git+https://github.com/YanxingLiu/dify-mcp-server",
      "dify_mcp_server"
     ],
     "env": {
      "CONFIG_PATH": null
     }
    }
   ],
   "variables": {
    "CONFIG_PATH": {
     "description": "This environment variable indicates the path to the configuration file for the Dify MCP server, typically a YAML file containing necessary…",
     "required": true,
     "example": "/Users/lyx/Downloads/config.yaml"
    }
   }
  },
  "code-sandbox-mcp": {
   "displayName": "Code Sandbox",
   "description": "An MCP server to create secure code sandbox environment for executing code within Docker containers.",
   "categories": [
    "Dev Tools"
   ],
   "tags": [
    "Docker",
    "Sandbox",
    "Code Execution"
   ],
   "repository": "https://github.com/Automata-Labs-team/code-sandbox-mcp",
   "homepage": "https://github.com/Automata-Labs-team/code-sandbox-mcp",
   "official": false,
   "methods": [
    {
     "type": "custom",
     "command": "/path/to/code-sandbox-mcp",
     "args": [],
     "env": {}
    }
   ],
   "variables": {}
  },
  "rijksmuseum": {
   "displayName": "Rijksmuseum",
   "description": "Interface with the Rijksmuseum API to search artworks, retrieve artwork details, access image tiles, and explore user collections.",
   "categories": [
    "Analytics"
   ],
   "tags": [
    "collection",
    "Rijksmuseum"
   ],
   "repository": "https://github.com/r-huijts/rijksmuseum-mcp",
   "homepage": "https://github.com/r-huijts/rijksmuseum-mcp",
   "official": false,
   "methods": [
    {
     "type": "npm",
     "command": "npx",
     "args": [
      "-y",
      "mcp-server-rijksmuseum"
     ],
     "env": {
      "RIJKSMUSEUM_API_KEY": null
     }
    }
   ],
   "variables": {
    "RIJKSMUSEUM_API_KEY": {
     "description": "Your Rijksmuseum API key used for authenticating requests to the Rijksmuseum API.",
     "required": true,
     "example": "your_api_key_here"
    }
   }
  },
  "mem0-mcp": {
   "displayName": "Mem0 Server",
   "description": "A Model Context Protocol server for Mem0, which helps with managing coding preferences.",
   "categories": [
    "Dev Tools"
   ],
   "tags": [
    "coding preferences",
    "mem0"
   ],
   "repository": "https://github.com/mem0ai/mem0-mcp",
   "homepage": "https://github.com/mem0ai/mem0-mcp",
   "official": false,
   "methods": [
    {
     "type": "uvx",
     "command": "uvx",
     "args": [
      "--from",
      "git+https://github.com/mem0ai/mem0-mcp",
      "main.py"
     ],
     "env": {}
    }
   ],
   "variables": {
    "host": {
     "description": "The host address that the server will bind to. This can be configured to allow access from different IP addresses or set it to 'localhost'…",
     "required": false,
     "example": "0.0.0.0"
    },
    "port": {
     "description": "The port number on which the server will listen for incoming connections. Changing this can help to avoid port conflicts with other service…",
     "required": false,
     "example": "8080"
    }
   }
  },
  "slack": {
   "displayName": "Slack",
   "description": "Channel management and messaging capabilities",
   "categories": [
    "Messaging"
   ],
   "tags": [
    "slack",
    "api",
    "bot"
   ],
   "repository": "https://github.com/modelcontextprotocol/servers",
   "homepage": "https://github.com/modelcontextprotocol/servers/blob/main/src/slack",
   "official": true,
   "methods": [
    {
     "type": "npm",
     "command": "npx",
     "args": [
      "-y",
      "@modelcontextprotocol/server-slack"
     ],
     "env": {
      "SLACK_BOT_TOKEN": null,
      "SLACK_TEAM_ID": null
     }
    },
    {
     "type": "docker",
     "command": "docker",
     "args": [
      "run",
      "-i",
      "--rm",
      "-e",
      "SLACK_BOT_TOKEN",
      "-e",
      "SLACK_TEAM_ID",
      "mcp/slack"
     ],
     "env": {
      "SLACK_BOT_TOKEN": null,
      "SLACK_TEAM_ID": null
     }
    }
   ],
   "variables": {
    "SLACK_BOT_TOKEN": {
     "description": "The OAuth token for the bot user in the Slack workspace, used for authenticating API requests.",
     "required": true,
     "example": "xoxb-…example…"
    },
    "SLACK_TEAM_ID": {
     "description": "The unique identifier of the Slack workspace, required for operations within the workspace.",
     "required": true,
     "example": "T01234567"
    }
   }
  },
  "openai-websearch-mcp": {
   "displayName": "OpenAI WebSearch",
   "description": "This is a Python-based MCP server that provides OpenAI `web_search` build-in tool.",
   "categories": [
    "Web Services"
   ],
   "tags": [
    "openai",
    "websearch",
    "AI assistant"
   ],
   "repository": "https://github.com/ConechoAI/openai-websearch-mcp",
   "homepage": "https://github.com/ConechoAI/openai-websearch-mcp",
   "official": false,
   "methods": [
    {
     "type": "uvx",
     "command": "uvx",
     "args": [
      "openai-websearch-mcp"
     ],
     "env": {
      "OPENAI_API_KEY": null
     }
    },
    {
     "type": "python",
     "command": "python",
     "args": [
      "-m",
      "openai_websearch_mcp"
     ],
     "env": {
      "OPENAI_API_KEY": null
     }
    }
   ],
   "variables": {
    "OPENAI_API_KEY": {
     "description": "Your OpenAI API key to authenticate requests to the OpenAI API.",
     "required": true,
     "example": "sk-xxxx"
    }
   }
  },
  "linear": {
   "displayName": "Linear",
   "description": "Allows LLM to interact with Linear's API for project management, including searching, creating, and updating issues.",
   "categories": [
    "Productivity"
   ],
   "tags": [
    "linear",
    "issue tracking",
    "LLM"
   ],
   "repository": "https://github.com/jerhadf/linear-mcp-server",
   "homepage": "https://github.com/jerhadf/linear-mcp-server",
   "official": false,
   "methods": [
    {
     "type": "npm",
     "command": "npx",
     "args": [
      "-y",
      "linear-mcp-server"
     ],
     "env": {
      "LINEAR_API_KEY": null
     }
    }
   ],
   "variables": {
    "LINEAR_API_KEY": {
     "description": "Your Linear API key to authenticate requests to the Linear API.",
     "required": true,
     "example": "your_api_key_here"
    }
   }
  },
  "mcp-create": {
   "displayName": "Create Server",
   "description": "A dynamic MCP server management service that creates, runs, and manages Model Context Protocol servers on-the-fly.",
   "categories": [
    "MCP Tools"
   ],
   "tags": [
    "dynamic",
    "TypeScript"
   ],
   "repository": "https://github.com/tesla0225/mcp-create",
   "homepage": "https://github.com/tesla0225/mcp-create",
   "official": false,
   "methods": [
    {
     "type": "npm",
     "command": "npx",
     "args": [
      "-y",
      "https://github.com/tesla0225/mcp-create"
     ],
     "env": {}
    }
   ],
   "variables": {}
  },
  "thirdweb": {
   "displayName": "thirdweb MCP Server",
   "description": "Read/write to over 2k blockchains, enabling data querying, contract analysis/deployment, and transaction execution, powered by Thirdweb",
   "categories": [
    "AI Systems"
   ],
   "tags": [
    "blockchain",
    "mcp",
    "thirdweb",
    "web3",
    "ipfs"
   ],
   "repository": "https://github.com/thirdweb-dev/ai",
   "homepage": "https://thirdweb.com",
   "official": true,
   "methods": [
    {
     "type": "uvx",
     "command": "uvx",
     "args": [
      "thirdweb-mcp"
     ],
     "env": {
      "THIRDWEB_SECRET_KEY": "your-secret-key"
     }
    }
   ],
   "variables": {
    "THIRDWEB_SECRET_KEY": {
     "description": "Your thirdweb API secret key from dashboard",
     "required": true,
     "example": "your-secret-key"
    },
    "THIRDWEB_ENGINE_URL": {
     "description": "URL endpoint for thirdweb Engine service",
     "required": false,
     "example": "https://your-engine-url"
    },
    "THIRDWEB_ENGINE_AUTH_JWT": {
     "description": "Authentication JWT token for Engine",
     "required": false,
     "example": "your-jwt-token"
    },
    "THIRDWEB_ENGINE_BACKEND_WALLET_ADDRESS": {
     "description": "Wallet address for Engine backend",
     "required": false,
     "example": "0x..."
    },
    "chain-id": {
     "description": "Blockchain network IDs to connect to (e.g., 1 for Ethereum mainnet, 137 for Polygon)",
     "required": false,
     "example": "1"
    }
   }
  },
  "okta": {
   "displayName": "Okta",
   "description": "Interact with Okta API.",
   "categories": [
    "System Tools"
   ],
   "tags": [
    "Okta",
    "user management",
    "group management"
   ],
   "repository": "https://github.com/kapilduraphe/okta-mcp-server",
   "homepage": "https://github.com/kapilduraphe/okta-mcp-server",
   "official": false,
   "methods": [
    {
     "type": "npm",
     "command": "npx",
     "args": [
      "-y",
      "https://github.com/kapilduraphe/okta-mcp-server"
     ],
     "env": {
      "OKTA_ORG_URL": null,
      "OKTA_API_TOKEN": null
     }
    }
   ],
   "variables": {
    "OKTA_ORG_URL": {
     "description": "The base URL for your Okta organization, should include 'https://'.",
     "required": true,
     "example": "https://dev-123456.okta.com"
    },
    "OKTA_API_TOKEN": {
     "description": "A valid API token used to authenticate API requests to Okta.",
     "required": true,
     "example": ""
    }
   }
  },
  "base-free-usdc-transfer": {
   "displayName": "Free USDC Transfer",
   "description": "Send USDC on [Base](https://base.org/) for free using Claude AI! Built with [Coinbase CDP](https://docs.cdp.coinbase.com/mpc-wallet/docs/welcome).",
   "categories": [
    "Finance"
   ],
   "tags": [
    "USDC",
    "Base",
    "Coinbase",
    "MPC Wallet"
   ],
   "repository": "https://github.com/magnetai/mcp-free-usdc-transfer",
   "homepage": "https://github.com/magnetai/mcp-free-usdc-transfer",
   "official": false,
   "methods": [
    {
     "type": "npm",
     "command": "npx",
     "args": [
      "-y",
      "@magnetai/free-usdc-transfer"
     ],
     "env": {
      "COINBASE_CDP_API_KEY_NAME": null,
      "COINBASE_CDP_PRIVATE_KEY": null
     }
    }
   ],
   "variables": {
    "COINBASE_CDP_API_KEY_NAME": {
     "description": "The name of your Coinbase CDP API key, which is required for authenticating API requests.",
     "required": true,
     "example": "my_api_key_name"
    }
   }
  },
  "mariadb": {
   "displayName": "MariaDB Database Integration",
   "description": "MariaDB database integration with configurable access controls in Python.",
   "categories": [
    "Databases"
   ],
   "tags": [
    "MariaDB",
    "Data Retrieval"
   ],
   "repository": "https://github.com/abel9851/mcp-server-mariadb",
   "homepage": "https://github.com/abel9851/mcp-server-mariadb",
   "official": false,
   "methods": [
    {
     "type": "uvx",
     "command": "uvx",
     "args": [
      "mcp-server-mariadb",
      "--host",
      "${DB_HOST}",
      "--port",
      "${DB_PORT}",
      "--user",
      "${DB_USER}",
      "--password",
      "${DB_PASSWORD}",
      "--database",
      "${DB_NAME}"
     ],
     "env": {}
    }
   ],
   "variables": {
    "DB_HOST": {
     "description": "The hostname of the MariaDB server to connect to.",
     "required": true,
     "example": "localhost"
    },
    "DB_PORT": {
     "description": "The port number on which the MariaDB server is listening.",
     "required": true,
     "example": "3306"
    },
    "DB_USER": {
     "description": "The username to connect to the MariaDB database.",
     "required": true,
     "example": "root"
    },
    "DB_PASSWORD": {
     "description": "The password for the MariaDB user.",
     "required": true,
     "example": ""
    },
    "DB_NAME": {
     "description": "The name of the database to connect to.",
     "required": true,
     "example": ""
    }
   }
  },
  "servicenow": {
   "displayName": "ServiceNow",
   "description": "A MCP server to interact with a ServiceNow instance",
   "categories": [
    "Productivity"
   ],
   "tags": [
    "ServiceNow",
    "Automation"
   ],
   "repository": "https://github.com/osomai/servicenow-mcp",
   "homepage": "https://github.com/osomai/servicenow-mcp",
   "official": false,
   "methods": [
    {
     "type": "uvx",
     "command": "uvx",
     "args": [
      "--from",
      "git+https://github.com/osomai/servicenow-mcp",
      "servicenow-mcp"
     ],
     "env": {
      "SERVICENOW_INSTANCE_URL": null,
      "SERVICENOW_USERNAME": null,
      "SERVICENOW_PASSWORD": null,
      "SERVICENOW_AUTH_TYPE": null
     }
    }
   ],
   "variables": {
    "SERVICENOW_INSTANCE_URL": {
     "description": "URL of the ServiceNow instance to connect to.",
     "required": true,
     "example": "https://your-instance.service-now.com"
    },
    "SERVICENOW_USERNAME": {
     "description": "Username for accessing the ServiceNow instance.",
     "required": true,
     "example": "your-username"
    },
    "SERVICENOW_PASSWORD": {
     "description": "Password for the ServiceNow username.",
     "required": true,
     "example": "your-password"
    },
    "SERVICENOW_AUTH_TYPE": {
     "description": "Authentication type for connecting to ServiceNow. Options are 'basic', 'oauth', or 'api_key'.",
     "required": true,
     "example": "basic"
    }
   }
  },
  "mcp-compass": {
   "displayName": "Compass",
   "description": "Suggest the right MCP server for your needs",
   "categories": [
    "MCP Tools"
   ],
   "tags": [
    "compass",
    "service discovery"
   ],
   "repository": "https://github.com/liuyoshio/mcp-compass",
   "homepage": "https://github.com/liuyoshio/mcp-compass",
   "official": false,
   "methods": [
    {
     "type": "npm",
     "command": "npx",
     "args": [
      "-y",
      "@liuyoshio/mcp-compass"
     ],
     "env": {}
    }
   ],
   "variables": {}
  },
  "alicloud-hologres": {
   "displayName": "Hologres MCP Server",
   "description": "Hologres MCP Server serves as a universal interface between AI Agents and Hologres databases. It enables seamless communication between AI Agents and Hologres, helping AI Agents retrieve Hologres database metadata and execute SQL operation…",
   "categories": [
    "Databases"
   ],
   "tags": [
    "hologres",
    "database",
    "SQL"
   ],
   "repository": "https://github.com/aliyun/alibabacloud-hologres-mcp-server",
   "homepage": "https://github.com/aliyun/alibabacloud-hologres-mcp-server",
   "official": true,
   "methods": [
    {
     "type": "local_file",
     "command": "uvx",
     "args": [
      "hologres-mcp-server"
     ],
     "env": {
      "HOLOGRES_HOST": "host",
      "HOLOGRES_PORT": "port",
      "HOLOGRES_USER": "access_id",
      "HOLOGRES_PASSWORD": "access_key",
      "HOLOGRES_DATABASE": "database"
     }
    }
   ],
   "variables": {
    "HOLOGRES_HOST": {
     "description": "Hologres database host",
     "required": true,
     "example": "host"
    },
    "HOLOGRES_PORT": {
     "description": "Hologres database port",
     "required": true,
     "example": "port"
    },
    "HOLOGRES_USER": {
     "description": "Hologres database user (access_id)",
     "required": true,
     "example": "access_id"
    },
    "HOLOGRES_PASSWORD": {
     "description": "Hologres database password (access_key)",
     "required": true,
     "example": "access_key"
    },
    "HOLOGRES_DATABASE": {
     "description": "Hologres database name",
     "required": true,
     "example": "database"
    }
   }
  },
  "alphavantage": {
   "displayName": "Alphavantage",
   "description": "MCP server for stock market data API [AlphaVantage](https://www.alphavantage.co/)",
   "categories": [
    "Finance"
   ],
   "tags": [
    "alphavantage",
    "stock market"
   ],
   "repository": "https://github.com/calvernaz/alphavantage",
   "homepage": "https://github.com/calvernaz/alphavantage",
   "official": false,
   "methods": [
    {
     "type": "uvx",
     "command": "uvx",
     "args": [
      "--from",
      "git+https://github.com/calvernaz/alphavantage.git",
      "alphavantage"
     ],
     "env": {
      "ALPHAVANTAGE_API_KEY": null
     }
    }
   ],
   "variables": {
    "ALPHAVANTAGE_API_KEY": {
     "description": "The API key to access the Alphavantage service.",
     "required": true,
     "example": "YOUR_API_KEY_HERE"
    }
   }
  },
  "drupal": {
   "displayName": "Drupal Server",
   "description": "Server for interacting with [Drupal](https://www.drupal.org/project/mcp) using STDIO transport layer.",
   "categories": [
    "Web Services"
   ],
   "tags": [
    "Drupal",
    "TypeScript"
   ],
   "repository": "https://github.com/Omedia/mcp-server-drupal",
   "homepage": "https://github.com/Omedia/mcp-server-drupal",
   "official": false,
   "methods": [
    {
     "type": "npm",
     "command": "npx",
     "args": [
      "-y",
      "deno",
      "run",
      "-A",
      "jsr:@omedia/mcp-server-drupal@${VERSION}",
      "--drupal-url",
      "${DRUPAL_BASE_URL}"
     ],
     "env": {}
    }
   ],
   "variables": {
    "VERSION": {
     "description": "The version of the MCP server to be used. This must be provided to ensure compatibility with the installed Drupal version.",
     "required": true,
     "example": "1.0.0"
    },
    "DRUPAL_BASE_URL": {
     "description": "The base URL of the Drupal site that the MCP server will interact with.",
     "required": true,
     "example": "https://example.com"
    }
   }
  },
  "placid-app": {
   "displayName": "Placid.app",
   "description": "Generate image and video creatives using Placid.app templates",
   "categories": [
    "Media Creation"
   ],
   "tags": [
    "Placid",
    "Templates",
    "Image Generation",
    "Video Generation"
   ],
   "repository": "https://github.com/felores/placid-mcp-server",
   "homepage": "https://github.com/felores/placid-mcp-server",
   "official": false,
   "methods": [
    {
     "type": "npm",
     "command": "npx",
     "args": [
      "@felores/placid-mcp-server"
     ],
     "env": {
      "PLACID_API_TOKEN": null
     }
    }
   ],
   "variables": {
    "PLACID_API_TOKEN": {
     "description": "Your Placid API token used for authenticating requests to the Placid API.",
     "required": true,
     "example": "my-secret-api-token"
    }
   }
  },
  "web-fetch": {
   "displayName": "Web Fetch",
   "description": "A Model Context Protocol (MCP) server for fetching webpages including html/pdf/plain text type content.",
   "categories": [
    "Web Services"
   ],
   "tags": [
    "web",
    "fetch",
    "html",
    "pdf",
    "text"
   ],
   "repository": "https://github.com/pathintegral-institute/mcp.science",
   "homepage": "https://github.com/pathintegral-institute/mcp.science/tree/main/servers/web-fetch",
   "official": true,
   "methods": [
    {
     "type": "uvx",
     "command": "uvx",
     "args": [
      "--from",
      "git+https://github.com/pathintegral-institute/mcp.science#subdirectory=servers/web-fetch",
      "mcp-web-fetch"
     ],
     "env": {}
    },
    {
     "type": "docker",
     "command": "docker",
     "args": [
      "run",
      "-i",
      "--rm",
      "ghcr.io/mcp-servers/fetch:latest"
     ],
     "env": {}
    }
   ],
   "variables": {
    "user_agent": {
     "description": "Custom user-agent for fetching web content",
     "required": false,
     "example": "ModelContextProtocol/1.0 (User-Specified; +https://github.com/modelcontextproto…"
    }
   }
  },
  "siri-shortcuts": {
   "displayName": "Siri Shortcuts",
   "description": "MCP to interact with Siri Shortcuts on macOS. Exposes all Shortcuts as MCP tools.",
   "categories": [
    "System Tools"
   ],
   "tags": [
    "siri",
    "shortcuts",
    "automation"
   ],
   "repository": "https://github.com/dvcrn/mcp-server-siri-shortcuts",
   "homepage": "https://github.com/dvcrn/mcp-server-siri-shortcuts",
   "official": false,
   "methods": [
    {
     "type": "npm",
     "command": "npx",
     "args": [
      "mcp-server-siri-shortcuts"
     ],
     "env": {}
    }
   ],
   "variables": {}
  },
  "windows-cli": {
   "displayName": "Windows CLI",
   "description": "MCP server for secure command-line interactions on Windows systems, enabling controlled access to PowerShell, CMD, and Git Bash shells.",
   "categories": [
    "System Tools"
   ],
   "tags": [
    "CLI",
    "Windows",
    "Security",
    "SSH"
   ],
   "repository": "https://github.com/SimonB97/win-cli-mcp-server",
   "homepage": "https://github.com/SimonB97/win-cli-mcp-server",
   "official": false,
   "methods": [
    {
     "type": "npm",
     "command": "npx",
     "args": [
      "-y",
      "@simonb97/server-win-cli",
      "--config",
      "${config}"
     ],
     "env": {}
    }
   ],
   "variables": {
    "config": {
     "description": "The path to your configuration file, which customizes the server behavior.",
     "required": true,
     "example": "path/to/your/config.json"
    }
   }
  },
  "make-mcp-server": {
   "displayName": "Make MCP Server",
   "description": "A Model Context Protocol server that enables Make scenarios to be utilized as tools by AI assistants. This integration allows AI systems to trigger and interact with your Make automation workflows.",
   "categories": [
    "Productivity"
   ],
   "tags": [
    "make",
    "automation",
    "ai",
    "mcp",
    "scenarios"
   ],
   "repository": "https://github.com/integromat/make-mcp-server",
   "homepage": "https://github.com/integromat/make-mcp-server",
   "official": true,
   "methods": [
    {
     "type": "npm",
     "command": "npx",
     "args": [
      "-y",
      "@makehq/mcp-server"
     ],
     "env": {
      "MAKE_API_KEY": "<your-api-key>",
      "MAKE_ZONE": "<your-zone>",
      "MAKE_TEAM": "<your-team-id>"
     }
    }
   ],
   "variables": {
    "MAKE_API_KEY": {
     "description": "API key generated in your Make profile",
     "required": true,
     "example": "<your-api-key>"
    },
    "MAKE_ZONE": {
     "description": "The zone your organization is hosted in",
     "required": true,
     "example": "eu2.make.com"
    },
    "MAKE_TEAM": {
     "description": "Team ID found in the URL of the Team page",
     "required": true,
     "example": "<your-team-id>"
    }
   }
  },
  "x-twitter": {
   "displayName": "X (Twitter)",
   "description": "Create, manage and publish X/Twitter posts directly through Claude chat.",
   "categories": [
    "Messaging"
   ],
   "tags": [
    "Twitter",
    "X"
   ],
   "repository": "https://github.com/vidhupv/x-mcp",
   "homepage": "https://github.com/vidhupv/x-mcp",
   "official": false,
   "methods": [
    {
     "type": "uvx",
     "command": "uvx",
     "args": [
      "--from",
      "git+https://github.com/vidhupv/x-mcp",
      "x-mcp"
     ],
     "env": {
      "TWITTER_API_KEY": null,
      "TWITTER_API_SECRET": null,
      "TWITTER_ACCESS_TOKEN": null,
      "TWITTER_ACCESS_TOKEN_SECRET": null
     }
    }
   ],
   "variables": {
    "TWITTER_API_KEY": {
     "description": "The API key for accessing Twitter's API.",
     "required": true,
     "example": "your_api_key"
    },
    "TWITTER_API_SECRET": {
     "description": "The API secret key for accessing Twitter's API.",
     "required": true,
     "example": "your_api_secret"
    },
    "TWITTER_ACCESS_TOKEN": {
     "description": "The access token for authorizing the application to access Twitter on behalf of the user.",
     "required": true,
     "example": "your_access_token"
    },
    "TWITTER_ACCESS_TOKEN_SECRET": {
     "description": "The access token secret for authorizing the application to access Twitter on behalf of the user.",
     "required": true,
     "example": "your_access_token_secret"
    }
   }
  },
  "chatmcp": {
   "displayName": "Chat Desktop App",
   "description": "– An Open Source Cross-platform GUI Desktop application compatible with Linux, macOS, and Windows, enabling seamless interaction with MCP servers across dynamically selectable LLMs, by **[AIQL](https://github.com/AI-QL/chat-mcp)**",
   "categories": [
    "MCP Tools"
   ],
   "tags": [
    "LLM",
    "Electron",
    "cross-platform"
   ],
   "repository": "https://github.com/AI-QL/chat-mcp",
   "homepage": "https://github.com/AI-QL/chat-mcp",
   "official": false,
   "methods": [
    {
     "type": "npm",
     "command": "npx",
     "args": [
      "-y",
      "https://github.com/AI-QL/chat-mcp"
     ],
     "env": {
      "SEARCH_PATH": null
     }
    }
   ],
   "variables": {
    "SEARCH_PATH": {
     "description": "This environment variable specifies the system's executable search path, which determines where the operating system looks for executable f…",
     "required": false,
     "example": "C:\\Program Files\\nodejs;C:\\Windows\\System32"
    }
   }
  },
  "monday-com": {
   "displayName": "Monday.com",
   "description": "MCP Server to interact with Monday.com boards and items.",
   "categories": [
    "Productivity"
   ],
   "tags": [
    "monday.com",
    "API"
   ],
   "repository": "https://github.com/sakce/mcp-server-monday",
   "homepage": "https://github.com/sakce/mcp-server-monday",
   "official": false,
   "methods": [
    {
     "type": "uvx",
     "command": "uvx",
     "args": [
      "mcp-server-monday"
     ],
     "env": {
      "MONDAY_API_KEY": null,
      "MONDAY_WORKSPACE_NAME": null
     }
    },
    {
     "type": "docker",
     "command": "docker",
     "args": [
      "run",
      "--rm",
      "-i",
      "-e",
      "MONDAY_API_KEY=${MONDAY_API_KEY}",
      "-e",
      "MONDAY_WORKSPACE_NAME=${MONDAY_WORKSPACE_NAME}",
      "sakce/mcp-server-monday"
     ],
     "env": {}
    }
   ],
   "variables": {
    "MONDAY_API_KEY": {
     "description": "API key for authenticating with the Monday.com API.",
     "required": true,
     "example": "your-monday-api-key"
    },
    "MONDAY_WORKSPACE_NAME": {
     "description": "The name of the Monday.com workspace you are working with.",
     "required": true,
     "example": "myworkspace"
    }
   }
  },
  "crypto-feargreed-mcp": {
   "displayName": "Crypto Fear & Greed Index",
   "description": "Providing real-time and historical Crypto Fear & Greed Index data.",
   "categories": [
    "Finance"
   ],
   "tags": [
    "Fear & Greed",
    "Crypto Index",
    "Analytics"
   ],
   "repository": "https://github.com/kukapay/crypto-feargreed-mcp",
   "homepage": "https://github.com/kukapay/crypto-feargreed-mcp",
   "official": false,
   "methods": [
    {
     "type": "uvx",
     "command": "uvx",
     "args": [
      "--from",
      "git+https://github.com/kukapay/crypto-feargreed-mcp",
      "main.py"
     ],
     "env": {}
    }
   ],
   "variables": {}
  },
  "mcp-local-rag": {
   "displayName": "Local RAG",
   "description": "\"primitive\" RAG-like web search model context protocol (MCP) server that runs locally using Google's MediaPipe Text Embedder and DuckDuckGo Search. ✨ no APIs required ✨.",
   "categories": [
    "Knowledge Base"
   ],
   "tags": [
    "RAG",
    "Search"
   ],
   "repository": "https://github.com/nkapila6/mcp-local-rag",
   "homepage": "https://github.com/nkapila6/mcp-local-rag",
   "official": false,
   "methods": [
    {
     "type": "uvx",
     "command": "uvx",
     "args": [
      "--python=3.10",
      "--from",
      "git+https://github.com/nkapila6/mcp-local-rag",
      "mcp-local-rag"
     ],
     "env": {}
    }
   ],
   "variables": {}
  },
  "rememberizer-ai": {
   "displayName": "Rememberizer",
   "description": "An MCP server designed for interacting with the Rememberizer data source, facilitating enhanced knowledge retrieval.",
   "categories": [
    "Knowledge Base"
   ],
   "tags": [
    "Rememberizer",
    "Document Management",
    "Knowledge Management",
    "API"
   ],
   "repository": "https://github.com/skydeckai/mcp-server-rememberizer",
   "homepage": "https://github.com/skydeckai/mcp-server-rememberizer",
   "official": false,
   "methods": [
    {
     "type": "uvx",
     "command": "uvx",
     "args": [
      "mcp-server-rememberizer"
     ],
     "env": {
      "REMEMBERIZER_API_TOKEN": null
     }
    }
   ],
   "variables": {
    "REMEMBERIZER_API_TOKEN": {
     "description": "Your Rememberizer API token, required for accessing the Rememberizer API.",
     "required": true,
     "example": "your_rememberizer_api_token"
    }
   }
  },
  "octagon-mcp-server": {
   "displayName": "Octagon MCP Server",
   "description": "A Model Context Protocol (MCP) server implementation that integrates with Octagon Market Intelligence API.",
   "categories": [
    "Analytics"
   ],
   "tags": [
    "market intelligence",
    "financial analysis",
    "SEC filings",
    "earnings calls",
    "stock market data",
    "private company research"
   ],
   "repository": "https://github.com/OctagonAI/octagon-mcp-server",
   "homepage": "https://docs.octagonagents.com",
   "official": true,
   "methods": [
    {
     "type": "npm",
     "command": "npx",
     "args": [
      "-y",
      "octagon-mcp"
     ],
     "env": {
      "OCTAGON_API_KEY": "your_octagon_api_key"
     }
    }
   ],
   "variables": {
    "OCTAGON_API_KEY": {
     "description": "Your Octagon API key",
     "required": true,
     "example": "your_octagon_api_key"
    }
   }
  },
  "langflow-doc-qa-server": {
   "displayName": "Langflow Document Q&A",
   "description": "A Model Context Protocol server for document Q&A powered by Langflow. It demonstrates core MCP concepts by providing a simple interface to query documents through a Langflow backend.",
   "categories": [
    "Knowledge Base"
   ],
   "tags": [
    "Langflow",
    "Document Q&A"
   ],
   "repository": "https://github.com/GongRzhe/Langflow-DOC-QA-SERVER",
   "homepage": "https://github.com/GongRzhe/Langflow-DOC-QA-SERVER",
   "official": false,
   "methods": [
    {
     "type": "npm",
     "command": "npx",
     "args": [
      "-y",
      "https://github.com/GongRzhe/Langflow-DOC-QA-SERVER"
     ],
     "env": {
      "API_ENDPOINT": null
     }
    }
   ],
   "variables": {
    "API_ENDPOINT": {
     "description": "The endpoint URL for the Langflow API service.",
     "required": false,
     "example": "http://127.0.0.1:7860/api/v1/run/<flow-id>?stream=false"
    }
   }
  },
  "ssh-exec": {
   "displayName": "SSH Execution",
   "description": "A Model Context Protocol (MCP) server for executing command-line operations on remote servers via SSH.",
   "categories": [
    "System Tools"
   ],
   "tags": [
    "ssh",
    "command execution",
    "remote systems"
   ],
   "repository": "https://github.com/pathintegral-institute/mcp.science",
   "homepage": "https://github.com/pathintegral-institute/mcp.science/tree/main/servers/ssh-exec",
   "official": true,
   "methods": [
    {
     "type": "uvx",
     "command": "uvx",
     "args": [
      "--from",
      "git+https://github.com/pathintegral-institute/mcp.science#subdirectory=servers/ssh-exec",
      "mcp-ssh-exec"
     ],
     "env": {
      "SSH_HOST": "your-server.com",
      "SSH_PORT": "22",
      "SSH_USERNAME": "your_username",
      "SSH_PRIVATE_KEY": "$(cat ~/.ssh/id_rsa)",
      "SSH_ALLOWED_COMMANDS": "ls,ps,cat",
      "SSH_ALLOWED_PATHS": "/tmp,/home",
      "SSH_COMMANDS_BLACKLIST": "rm,mv,dd,mkfs,fdisk,format",
      "SSH_ARGUMENTS_BLACKLIST": "-rf,-fr,--force"
     }
    }
   ],
   "variables": {
    "SSH_HOST": {
     "description": "SSH host to connect to",
     "required": true,
     "example": "your-server.com"
    },
    "SSH_PORT": {
     "description": "SSH port",
     "required": false,
     "example": "22"
    },
    "SSH_USERNAME": {
     "description": "SSH username",
     "required": true,
     "example": "your_username"
    },
    "SSH_PRIVATE_KEY": {
     "description": "SSH private key content (not path)",
     "required": false,
     "example": "$(cat ~/.ssh/id_rsa)"
    },
    "SSH_PASSWORD": {
     "description": "SSH password",
     "required": false,
     "example": "[NOT GIVEN]"
    },
    "SSH_ALLOWED_COMMANDS": {
     "description": "Comma-separated list of commands that are allowed to be executed",
     "required": false,
     "example": "ls,ps,cat"
    },
    "SSH_ALLOWED_PATHS": {
     "description": "Comma-separated list of paths that are allowed for command execution",
     "required": false,
     "example": "/tmp,/home"
    },
    "SSH_COMMANDS_BLACKLIST": {
     "description": "Comma-separated list of commands that are not allowed",
     "required": false,
     "example": "rm,mv,dd,mkfs,fdisk,format"
    },
    "SSH_ARGUMENTS_BLACKLIST": {
     "description": "Comma-separated list of arguments that are not allowed",
     "required": false,
     "example": "-rf,-fr,--force"
    }
   }
  },
  "github": {
   "displayName": "GitHub",
   "description": "MCP Server for the GitHub API, enabling file operations, repository management, search functionality, and more.",
   "categories": [
    "Dev Tools"
   ],
   "tags": [
    "github",
    "code",
    "repository",
    "git"
   ],
   "repository": "https://github.com/modelcontextprotocol/servers",
   "homepage": "https://github.com/modelcontextprotocol/servers/tree/main/src/github#readme",
   "official": true,
   "methods": [
    {
     "type": "npm",
     "command": "npx",
     "args": [
      "-y",
      "@modelcontextprotocol/server-github"
     ],
     "env": {
      "GITHUB_PERSONAL_ACCESS_TOKEN": null
     }
    },
    {
     "type": "docker",
     "command": "docker",
     "args": [
      "run",
      "-i",
      "--rm",
      "-e",
      "GITHUB_PERSONAL_ACCESS_TOKEN",
      "mcp/github"
     ],
     "env": {
      "GITHUB_PERSONAL_ACCESS_TOKEN": null
     }
    }
   ],
   "variables": {
    "GITHUB_PERSONAL_ACCESS_TOKEN": {
     "description": "Personal Access Token for GitHub to authenticate API requests",
     "required": true,
     "example": "ghp_…example…"
    }
   }
  },
  "qgis": {
   "displayName": "QGIS Model Context Protocol Integration",
   "description": "connects QGIS to Claude AI through the MCP. This integration enables prompt-assisted project creation, layer loading, code execution, and more.",
   "categories": [
    "Analytics"
   ],
   "tags": [
    "QGIS"
   ],
   "repository": "https://github.com/jjsantos01/qgis_mcp",
   "homepage": "https://github.com/jjsantos01/qgis_mcp",
   "official": false,
   "methods": [
    {
     "type": "uvx",
     "command": "uvx",
     "args": [
      "--from",
      "git+https://github.com/jjsantos01/qgis_mcp",
      "src/qgis_mcp/qgis_mcp_server.py"
     ],
     "env": {}
    }
   ],
   "variables": {}
  },
  "exa-mcp-server": {
   "displayName": "Exa MCP Server",
   "description": "A Model Context Protocol (MCP) server lets AI assistants like Claude use the Exa AI Search API for web searches. This setup allows AI models to get real-time web information in a safe and controlled way.",
   "categories": [
    "Web Services"
   ],
   "tags": [
    "search",
    "web search",
    "AI",
    "Claude",
    "MCP",
    "Model Context Protocol"
   ],
   "repository": "https://github.com/exa-labs/exa-mcp-server",
   "homepage": "https://github.com/exa-labs/exa-mcp-server",
   "official": true,
   "methods": [
    {
     "type": "npm",
     "command": "npx",
     "args": [
      "exa-mcp-server"
     ],
     "env": {
      "EXA_API_KEY": "your-api-key-here"
     }
    }
   ],
   "variables": {
    "EXA_API_KEY": {
     "description": "API key from dashboard.exa.ai/api-keys",
     "required": true,
     "example": "your-api-key-here"
    }
   }
  },
  "openapi": {
   "displayName": "OpenAPI",
   "description": "Interact with [OpenAPI](https://www.openapis.org/) APIs.",
   "categories": [
    "Dev Tools"
   ],
   "tags": [
    "openapi",
    "api exploration"
   ],
   "repository": "https://github.com/snaggle-ai/openapi-mcp-server",
   "homepage": "https://github.com/snaggle-ai/openapi-mcp-server",
   "official": false,
   "methods": [
    {
     "type": "npm",
     "command": "npx",
     "args": [
      "-y",
      "openapi-mcp-server"
     ],
     "env": {}
    }
   ],
   "variables": {}
  },
  "rember-mcp": {
   "displayName": "Rember MCP",
   "description": "Create spaced repetition flashcards in Rember to remember anything you learn in your chats",
   "categories": [
    "Knowledge Base"
   ],
   "tags": [
    "flashcards",
    "spaced repetition",
    "learning",
    "memory"
   ],
   "repository": "https://github.com/rember/rember-mcp",
   "homepage": "https://rember.com",
   "official": true,
   "methods": [
    {
     "type": "npm",
     "command": "npx",
     "args": [
      "-y",
      "@getrember/mcp",
      "--api-key=${api-key}"
     ],
     "env": {}
    }
   ],
   "variables": {
    "api-key": {
     "description": "Your Rember API key from the Settings page",
     "required": true,
     "example": "rember_32randomcharacters"
    }
   }
  },
  "bicscan-mcp": {
   "displayName": "BICScan MCP Server",
   "description": "A powerful and efficient Blockchain address risk scoring API MCP Server, leveraging the BICScan API to provide comprehensive risk assessments and asset information for blockchain addresses, domains, and decentralized applications (dApps).",
   "categories": [
    "Finance"
   ],
   "tags": [
    "blockchain",
    "risk scoring",
    "crypto",
    "API"
   ],
   "repository": "https://github.com/ahnlabio/bicscan-mcp",
   "homepage": "https://bicscan.io",
   "official": true,
   "methods": [
    {
     "type": "uvx",
     "command": "uvx",
     "args": [
      "--from",
      "git+https://github.com/ahnlabio/bicscan-mcp",
      "bicscan-mcp"
     ],
     "env": {
      "BICSCAN_API_KEY": "{BICSCAN_API_KEY}"
     }
    },
    {
     "type": "docker",
     "command": "docker",
     "args": [
      "run",
      "--rm",
      "--interactive",
      "--env",
      "BICSCAN_API_KEY={BICSCAN_API_KEY}",
      "bicscan-mcp"
     ],
     "env": {}
    }
   ],
   "variables": {
    "BICSCAN_API_KEY": {
     "description": "API key obtained from https://bicscan.io",
     "required": true,
     "example": "YOUR_BICSCAN_API_KEY_HERE"
    }
   }
  },
  "financial-dataset": {
   "displayName": "Financial Datasets MCP Server",
   "description": "This is a Model Context Protocol (MCP) server that provides access to stock market data from [Financial Datasets](https://www.financialdatasets.ai/).",
   "categories": [
    "Finance"
   ],
   "tags": [
    "finance",
    "stock market",
    "financial data"
   ],
   "repository": "https://github.com/financial-datasets/mcp-server",
   "homepage": "https://www.financialdatasets.ai/",
   "official": true,
   "methods": [
    {
     "type": "custom",
     "command": "uv",
     "args": [
      "run",
      "server.py"
     ],
     "env": {
      "FINANCIAL_DATASETS_API_KEY": "your-financial-datasets-api-key"
     }
    }
   ],
   "variables": {
    "FINANCIAL_DATASETS_API_KEY": {
     "description": "API key for Financial Datasets",
     "required": true,
     "example": "your-financial-datasets-api-key"
    }
   }
  },
  "salesforce-mcp": {
   "displayName": "Salesforce Connector",
   "description": "Interact with Salesforce Data and Metadata",
   "categories": [
    "Productivity"
   ],
   "tags": [
    "salesforce"
   ],
   "repository": "https://github.com/smn2gnt/MCP-Salesforce",
   "homepage": "https://github.com/smn2gnt/MCP-Salesforce",
   "official": false,
   "methods": [
    {
     "type": "uvx",
     "command": "uvx",
     "args": [
      "--from",
      "mcp-salesforce-connector",
      "salesforce"
     ],
     "env": {
      "SALESFORCE_USERNAME": null,
      "SALESFORCE_PASSWORD": null,
      "SALESFORCE_SECURITY_TOKEN": null
     }
    }
   ],
   "variables": {
    "SALESFORCE_USERNAME": {
     "description": "Your Salesforce username for authentication",
     "required": true,
     "example": "myemail@example.com"
    },
    "SALESFORCE_PASSWORD": {
     "description": "Your Salesforce password for authentication",
     "required": true,
     "example": ""
    },
    "SALESFORCE_SECURITY_TOKEN": {
     "description": "Your Salesforce security token for additional security measures",
     "required": true,
     "example": ""
    }
   }
  },
  "youtube": {
   "displayName": "YouTube",
   "description": "Comprehensive YouTube API integration for video management, Shorts creation, and analytics.",
   "categories": [
    "Media Creation"
   ],
   "tags": [
    "youtube",
    "video",
    "transcripts",
    "api"
   ],
   "repository": "https://github.com/ZubeidHendricks/youtube-mcp-server",
   "homepage": "https://github.com/ZubeidHendricks/youtube-mcp-server",
   "official": false,
   "methods": [
    {
     "type": "npm",
     "command": "npx",
     "args": [
      "-y",
      "@modelcontextprotocol/server-youtube"
     ],
     "env": {
      "YOUTUBE_API_KEY": null
     }
    }
   ],
   "variables": {
    "YOUTUBE_API_KEY": {
     "description": "Your YouTube Data API key, needed for authentication when making requests to the YouTube API.",
     "required": true,
     "example": "AIzaSy…example…"
    }
   }
  },
  "scrapling-fetch": {
   "displayName": "Scrapling Fetch",
   "description": "Access text content from bot-protected websites. Fetches HTML/markdown from sites with anti-automation measures using Scrapling.",
   "categories": [
    "Web Services"
   ],
   "tags": [
    "scrapling",
    "fetch"
   ],
   "repository": "https://github.com/cyberchitta/scrapling-fetch-mcp",
   "homepage": "https://github.com/cyberchitta/scrapling-fetch-mcp",
   "official": false,
   "methods": [
    {
     "type": "uvx",
     "command": "uvx",
     "args": [
      "scrapling-fetch-mcp"
     ],
     "env": {}
    }
   ],
   "variables": {}
  },
  "mcp": {
   "displayName": "Semgrep MCP Server",
   "description": "An MCP server for using Semgrep to scan code for security vulnerabilies. Secure your vibe coding!",
   "categories": [
    "Dev Tools"
   ],
   "tags": [
    "security",
    "static analysis",
    "code scanning",
    "vulnerability detection"
   ],
   "repository": "https://github.com/semgrep/mcp",
   "homepage": "https://semgrep.dev",
   "official": true,
   "methods": [
    {
     "type": "uvx",
     "command": "uvx",
     "args": [
      "semgrep-mcp"
     ],
     "env": {}
    },
    {
     "type": "docker",
     "command": "docker",
     "args": [
      "run",
      "-i",
      "--rm",
      "ghcr.io/semgrep/mcp",
      "-t",
      "stdio"
     ],
     "env": {}
    }
   ],
   "variables": {
    "SEMGREP_APP_TOKEN": {
     "description": "Token for connecting to Semgrep AppSec Platform",
     "required": false,
     "example": "<token>"
    }
   }
  },
  "mcp-server-langfuse": {
   "displayName": "Langfuse Prompt Management MCP Server",
   "description": "Open-source tool for collaborative editing, versioning, evaluating, and releasing prompts.",
   "categories": [
    "Dev Tools"
   ],
   "tags": [
    "prompts",
    "mcp",
    "langfuse"
   ],
   "repository": "https://github.com/langfuse/mcp-server-langfuse",
   "homepage": "https://langfuse.com/docs/prompts/get-started",
   "official": true,
   "methods": [
    {
     "type": "custom",
     "command": "node",
     "args": [
      "./build/index.js"
     ],
     "env": {
      "LANGFUSE_PUBLIC_KEY": "your-public-key",
      "LANGFUSE_SECRET_KEY": "your-secret-key",
      "LANGFUSE_BASEURL": "https://cloud.langfuse.com"
     }
    }
   ],
   "variables": {
    "LANGFUSE_PUBLIC_KEY": {
     "description": "Your Langfuse public API key",
     "required": true,
     "example": "your-public-key"
    },
    "LANGFUSE_SECRET_KEY": {
     "description": "Your Langfuse secret API key",
     "required": true,
     "example": "your-secret-key"
    },
    "LANGFUSE_BASEURL": {
     "description": "Langfuse API base URL",
     "required": true,
     "example": "https://cloud.langfuse.com"
    }
   }
  },
  "mcp-tinybird": {
   "displayName": "Tinybird MCP server",
   "description": "An MCP server to interact with a Tinybird Workspace from any MCP client.",
   "categories": [
    "Analytics"
   ],
   "tags": [
    "tinybird",
    "data",
    "analytics"
   ],
   "repository": "https://github.com/tinybirdco/mcp-tinybird",
   "homepage": "https://github.com/tinybirdco/mcp-tinybird",
   "official": true,
   "methods": [
    {
     "type": "uvx",
     "command": "uvx",
     "args": [
      "mcp-tinybird",
      "stdio"
     ],
     "env": {
      "TB_API_URL": "<TINYBIRD_API_URL>",
      "TB_ADMIN_TOKEN": "<TINYBIRD_ADMIN_TOKEN>"
     }
    }
   ],
   "variables": {
    "TB_API_URL": {
     "description": "Tinybird API URL for your workspace",
     "required": true,
     "example": "<TINYBIRD_API_URL>"
    },
    "TB_ADMIN_TOKEN": {
     "description": "Tinybird Admin Token for authentication",
     "required": true,
     "example": "<TINYBIRD_ADMIN_TOKEN>"
    },
    "topic": {
     "description": "Topic of the data you want to explore",
     "required": true,
     "example": "Bluesky data"
    }
   }
  },
  "mcp-server-singlestore": {
   "displayName": "SingleStore MCP Server",
   "description": "Interact with the SingleStore database platform",
   "categories": [
    "Databases"
   ],
   "tags": [
    "singlestore",
    "database",
    "sql",
    "mcp",
    "model context protocol"
   ],
   "repository": "https://github.com/singlestore-labs/mcp-server-singlestore",
   "homepage": "https://github.com/singlestore-labs/mcp-server-singlestore",
   "official": true,
   "methods": [
    {
     "type": "uvx",
     "command": "uvx",
     "args": [
      "singlestore-mcp-server"
     ],
     "env": {
      "SINGLESTORE_DB_USERNAME": null,
      "SINGLESTORE_DB_PASSWORD": null,
      "SINGLESTORE_API_KEY": null
     }
    }
   ],
   "variables": {
    "SINGLESTORE_API_KEY": {
     "description": "SingleStore's management API key",
     "required": true,
     "example": "your_api_key_here"
    },
    "SINGLESTORE_DB_USERNAME": {
     "description": "Database username",
     "required": false,
     "example": "your_db_username_here"
    },
    "SINGLESTORE_DB_PASSWORD": {
     "description": "Database password",
     "required": false,
     "example": "your_db_password_here"
    }
   }
  },
  "materials-project": {
   "displayName": "Materials Project",
   "description": "A MCP (Model Context Protocol) server that interacts with the Materials Project database, allowing for material search, structure visualization, and manipulation.",
   "categories": [
    "MCP Tools"
   ],
   "tags": [
    "materials",
    "science"
   ],
   "repository": "https://github.com/pathintegral-institute/mcp.science",
   "homepage": "https://github.com/pathintegral-institute/mcp.science/tree/main/servers/materials-project",
   "official": true,
   "methods": [
    {
     "type": "uvx",
     "command": "uv",
     "args": [
      "--from",
      "git+https://github.com/pathintegral-institute/mcp.science#subdirectory=servers/materials-project",
      "mcp-materials-project"
     ],
     "env": {
      "MP_API_KEY": "your_materials_project_api_key_here"
     }
    }
   ],
   "variables": {
    "MP_API_KEY": {
     "description": "API key from the Materials Project",
     "required": true,
     "example": "your_materials_project_api_key_here"
    }
   }
  },
  "holaspirit": {
   "displayName": "Holaspirit",
   "description": "Interact with [Holaspirit](https://www.holaspirit.com/).",
   "categories": [
    "Productivity"
   ],
   "tags": [
    "Holaspirit",
    "AI"
   ],
   "repository": "https://github.com/syucream/holaspirit-mcp-server",
   "homepage": "https://github.com/syucream/holaspirit-mcp-server",
   "official": false,
   "methods": [
    {
     "type": "npm",
     "command": "npx",
     "args": [
      "-y",
      "holaspirit-mcp-server"
     ],
     "env": {
      "HOLASPIRIT_API_TOKEN": null
     }
    }
   ],
   "variables": {
    "HOLASPIRIT_API_TOKEN": {
     "description": "Your Holaspirit API token",
     "required": true,
     "example": "<your token>"
    }
   }
  },
  "rag-web-browser": {
   "displayName": "RAG Web Browser Server",
   "description": "An MCP server for Apify's open-source RAG Web Browser [Actor](https://apify.com/apify/rag-web-browser) to perform web searches, scrape URLs, and return content in Markdown.",
   "categories": [
    "Web Services"
   ],
   "tags": [
    "RAG",
    "Web Browser",
    "AI Agents"
   ],
   "repository": "https://github.com/apify/mcp-server-rag-web-browser",
   "homepage": "https://github.com/apify/mcp-server-rag-web-browser",
   "official": false,
   "methods": [
    {
     "type": "npm",
     "command": "npx",
     "args": [
      "@apify/mcp-server-rag-web-browser"
     ],
     "env": {
      "APIFY_TOKEN": null
     }
    }
   ],
   "variables": {
    "APIFY_TOKEN": {
     "description": "Environment variable for your Apify API token to authenticate requests.",
     "required": true,
     "example": "your-apify-api-token"
    }
   }
  },
  "aws-kb-retrieval": {
   "displayName": "AWS Knowledge Base Retrieval",
   "description": "Retrieval from AWS Knowledge Base using Bedrock Agent Runtime",
   "categories": [
    "Knowledge Base"
   ],
   "tags": [
    "Knowledge Base",
    "Retrieval",
    "AWS",
    "Bedrock Agent Runtime"
   ],
   "repository": "https://github.com/modelcontextprotocol/servers",
   "homepage": "https://github.com/modelcontextprotocol/servers/blob/main/src/aws-kb-retrieval-server",
   "official": true,
   "methods": [
    {
     "type": "npm",
     "command": "npx",
     "args": [
      "-y",
      "@modelcontextprotocol/server-aws-kb-retrieval"
     ],
     "env": {
      "AWS_ACCESS_KEY_ID": null,
      "AWS_SECRET_ACCESS_KEY": null,
      "AWS_REGION": null
     }
    },
    {
     "type": "docker",
     "command": "docker",
     "args": [
      "run",
      "-i",
      "--rm",
      "-e",
      "AWS_ACCESS_KEY_ID",
      "-e",
      "AWS_SECRET_ACCESS_KEY",
      "-e",
      "AWS_REGION",
      "mcp/aws-kb-retrieval-server"
     ],
     "env": {
      "AWS_ACCESS_KEY_ID": null,
      "AWS_SECRET_ACCESS_KEY": null,
      "AWS_REGION": null
     }
    }
   ],
   "variables": {
    "AWS_ACCESS_KEY_ID": {
     "description": "The access key ID for your AWS account used for authentication.",
     "required": true,
     "example": "YOUR_ACCESS_KEY_HERE"
    },
    "AWS_SECRET_ACCESS_KEY": {
     "description": "The secret access key for your AWS account used for authentication.",
     "required": true,
     "example": "YOUR_SECRET_ACCESS_KEY_HERE"
    },
    "AWS_REGION": {
     "description": "The AWS region where your resources are located.",
     "required": true,
     "example": "us-east-1"
    }
   }
  },
  "xiyan-mcp-server": {
   "displayName": "XiYan MCP Server",
   "description": "An MCP server that supports fetching data from a database using natural language queries, powered by XiyanSQL as the text-to-SQL LLM.",
   "categories": [
    "Databases"
   ],
   "tags": [
    "database",
    "sql",
    "database"
   ],
   "repository": "https://github.com/XGenerationLab/xiyan_mcp_server",
   "homepage": "https://github.com/XGenerationLab/xiyan_mcp_server",
   "official": false,
   "methods": [
    {
     "type": "python",
     "command": "python",
     "args": [
      "-m",
      "xiyan_mcp_server"
     ],
     "env": {
      "YML": null
     }
    }
   ],
   "variables": {
    "YML": {
     "description": "The path to the YAML configuration file required for setting up the server environment variables.",
     "required": true,
     "example": "path/to/yml"
    }
   }
  },
  "terminal-control": {
   "displayName": "Terminal Controller",
   "description": "A MCP server that enables secure terminal command execution, directory navigation, and file system operations through a standardized interface.",
   "categories": [
    "System Tools"
   ],
   "tags": [
    "terminal",
    "command execution",
    "file management",
    "cross-platform"
   ],
   "repository": "https://github.com/GongRzhe/terminal-controller-mcp",
   "homepage": "https://github.com/GongRzhe/terminal-controller-mcp",
   "official": false,
   "methods": [
    {
     "type": "uvx",
     "command": "uvx",
     "args": [
      "terminal-controller"
     ],
     "env": {}
    },
    {
     "type": "python",
     "command": "python",
     "args": [
      "-m",
      "terminal_controller"
     ],
     "env": {}
    }
   ],
   "variables": {
    "terminal_controller": {
     "description": "The Python module that contains the implementation of the Terminal Controller's functionalities.",
     "required": true,
     "example": "terminal_controller"
    }
   }
  },
  "mcp-neo4j-cypher": {
   "displayName": "Neo4j MCP",
   "description": "This server enables running Cypher graph queries, analyzing complex domain data, and automatically generating business insights that can be enhanced with Claude's analysis when an Anthropic API key is provided.",
   "categories": [
    "Databases"
   ],
   "tags": [
    "neo4j",
    "mcp",
    "cypher",
    "knowledge graph"
   ],
   "repository": "https://github.com/neo4j-contrib/mcp-neo4j",
   "homepage": "https://github.com/neo4j-contrib/mcp-neo4j",
   "official": true,
   "methods": [
    {
     "type": "uvx",
     "command": "uvx",
     "args": [
      "mcp-neo4j-cypher",
      "--db-url",
      "${NEO4J_URI}",
      "--username",
      "${NEO4J_USERNAME}",
      "--password",
      "${NEO4J_PASSWORD}"
     ],
     "env": {}
    }
   ],
   "variables": {
    "NEO4J_URI": {
     "description": "Neo4j database URL",
     "required": true,
     "example": "https://<username>:<password>@<instance>.databases.neo4j.com:7687"
    },
    "NEO4J_USERNAME": {
     "description": "Neo4j username",
     "required": true,
     "example": "<username>"
    },
    "NEO4J_PASSWORD": {
     "description": "Neo4j password",
     "required": true,
     "example": "<password>"
    }
   }
  },
  "tavily-search": {
   "displayName": "Tavily Search",
   "description": "An MCP server for Tavily's search & news API, with explicit site inclusions/exclusions",
   "categories": [
    "Web Services"
   ],
   "tags": [
    "AI",
    "Search"
   ],
   "repository": "https://github.com/RamXX/mcp-tavily",
   "homepage": "https://github.com/RamXX/mcp-tavily",
   "official": false,
   "methods": [
    {
     "type": "uvx",
     "command": "uvx",
     "args": [
      "mcp-tavily"
     ],
     "env": {
      "TAVILY_API_KEY": "your_api_key_here"
     }
    },
    {
     "type": "python",
     "command": "python",
     "args": [
      "-m",
      "mcp-tavily"
     ],
     "env": {
      "TAVILY_API_KEY": "your_api_key_here"
     }
    }
   ],
   "variables": {
    "TAVILY_API_KEY": {
     "description": "Your Tavily API key for accessing Tavily's search API functionalities.",
     "required": true,
     "example": "your_api_key_here"
    }
   }
  },
  "devhub-cms-mcp": {
   "displayName": "DevHub CMS MCP",
   "description": "Manage and utilize website content within the DevHub CMS platform",
   "categories": [
    "Productivity"
   ],
   "tags": [
    "cms",
    "content management",
    "devhub"
   ],
   "repository": "https://github.com/devhub/devhub-cms-mcp",
   "homepage": "https://github.com/devhub/devhub-cms-mcp",
   "official": true,
   "methods": [
    {
     "type": "uvx",
     "command": "uvx",
     "args": [
      "devhub-cms-mcp"
     ],
     "env": {
      "DEVHUB_API_KEY": "YOUR_KEY_HERE",
      "DEVHUB_API_SECRET": "YOUR_SECRET_HERE",
      "DEVHUB_BASE_URL": "https://yourbrand.cloudfrontend.net"
     }
    }
   ],
   "variables": {
    "DEVHUB_API_KEY": {
     "description": "Your DevHub API key",
     "required": true,
     "example": "YOUR_KEY_HERE"
    },
    "DEVHUB_API_SECRET": {
     "description": "Your DevHub API secret",
     "required": true,
     "example": "YOUR_SECRET_HERE"
    },
    "DEVHUB_BASE_URL": {
     "description": "Your DevHub base URL",
     "required": true,
     "example": "https://yourbrand.cloudfrontend.net"
    }
   }
  },
  "gmail": {
   "displayName": "Gmail AutoAuth",
   "description": "A Model Context Protocol (MCP) server for Gmail integration in Claude Desktop with auto authentication support.",
   "categories": [
    "Messaging"
   ],
   "tags": [
    "gmail",
    "autoauth",
    "claude"
   ],
   "repository": "https://github.com/GongRzhe/Gmail-MCP-Server",
   "homepage": "https://github.com/GongRzhe/Gmail-MCP-Server",
   "official": false,
   "methods": [
    {
     "type": "npm",
     "command": "npx",
     "args": [
      "@gongrzhe/server-gmail-autoauth-mcp"
     ],
     "env": {}
    },
    {
     "type": "docker",
     "command": "docker",
     "args": [
      "run",
      "-i",
      "--rm",
      "-v",
      "mcp-gmail:/gmail-server",
      "-e",
      "${GMAIL_CREDENTIALS_PATH}=/gmail-server/credentials.json",
      "mcp/gmail"
     ],
     "env": {}
    }
   ],
   "variables": {
    "GMAIL_CREDENTIALS_PATH": {
     "description": "The path to the Gmail credentials file that the server will use for OAuth authentication.",
     "required": true,
     "example": "/gmail-server/credentials.json"
    }
   }
  },
  "vectorize-mcp-server": {
   "displayName": "Vectorize MCP Server",
   "description": "A Model Context Protocol (MCP) server implementation that integrates with [Vectorize](https://vectorize.io/) for advanced Vector retrieval and text extraction.",
   "categories": [
    "Databases"
   ],
   "tags": [
    "vector retrieval",
    "text extraction"
   ],
   "repository": "https://github.com/vectorize-io/vectorize-mcp-server",
   "homepage": "https://vectorize.io/",
   "official": true,
   "methods": [
    {
     "type": "npm",
     "command": "npx",
     "args": [
      "-y",
      "@vectorize-io/vectorize-mcp-server@latest"
     ],
     "env": {
      "VECTORIZE_ORG_ID": null,
      "VECTORIZE_TOKEN": null,
      "VECTORIZE_PIPELINE_ID": null
     }
    }
   ],
   "variables": {
    "VECTORIZE_ORG_ID": {
     "description": "Vectorize Organization ID",
     "required": true,
     "example": "your-org-id"
    },
    "VECTORIZE_TOKEN": {
     "description": "Vectorize Token",
     "required": true,
     "example": "your-token"
    },
    "VECTORIZE_PIPELINE_ID": {
     "description": "Vectorize Pipeline ID",
     "required": true,
     "example": "your-pipeline-id"
    }
   }
  },
  "verodat-mcp-server": {
   "displayName": "Verodat MCP Server",
   "description": "A Model Context Protocol (MCP) server implementation for [Verodat](https://verodat.io), enabling seamless integration of Verodat's data management capabilities with AI systems like Claude Desktop.",
   "categories": [
    "Databases"
   ],
   "tags": [
    "MCP",
    "AI",
    "Data Management",
    "Claude Desktop"
   ],
   "repository": "https://github.com/Verodat/verodat-mcp-server",
   "homepage": "https://verodat.io",
   "official": true,
   "methods": [
    {
     "type": "custom",
     "command": "node",
     "args": [
      "path/to/verodat-mcp-server/build/src/index.js"
     ],
     "env": {
      "VERODAT_AI_API_KEY": null
     }
    }
   ],
   "variables": {
    "VERODAT_AI_API_KEY": {
     "description": "Your Verodat AI API key",
     "required": true,
     "example": "your-verodat-ai-api-key"
    }
   }
  },
  "wxflows": {
   "displayName": "wxflows MCP Server",
   "description": "data-color-mode=\"auto\" data-light-theme=\"light\" data-dark-theme=\"dark\"",
   "categories": [
    "Dev Tools"
   ],
   "tags": [
    "mcp",
    "ai",
    "tools",
    "watsonx"
   ],
   "repository": "https://github.com/IBM/wxflows/tree/main/examples/mcp",
   "homepage": "https://github.com/IBM/wxflows/",
   "official": true,
   "methods": [
    {
     "type": "custom",
     "command": "node",
     "args": [
      "build/index.js"
     ],
     "env": {
      "WXFLOWS_APIKEY": "YOUR_WXFLOWS_APIKEY",
      "WXFLOWS_ENDPOINT": "YOUR_WXFLOWS_ENDPOINT"
     }
    }
   ],
   "variables": {
    "WXFLOWS_APIKEY": {
     "description": "API key for wxflows service",
     "required": true,
     "example": "YOUR_WXFLOWS_APIKEY"
    },
    "WXFLOWS_ENDPOINT": {
     "description": "Endpoint URL for wxflows service",
     "required": true,
     "example": "YOUR_WXFLOWS_ENDPOINT"
    }
   }
  },
  "kubernetes-and-openshift": {
   "displayName": "Kubernetes and OpenShift",
   "description": "A powerful Kubernetes MCP server with additional support for OpenShift. Besides providing CRUD operations for any Kubernetes resource, this server provides specialized tools to interact with your cluster.",
   "categories": [
    "Dev Tools"
   ],
   "tags": [
    "Kubernetes",
    "Server"
   ],
   "repository": "https://github.com/manusa/kubernetes-mcp-server",
   "homepage": "https://github.com/manusa/kubernetes-mcp-server",
   "official": false,
   "methods": [
    {
     "type": "npm",
     "command": "npx",
     "args": [
      "-y",
      "kubernetes-mcp-server@latest"
     ],
     "env": {}
    }
   ],
   "variables": {}
  },
  "python-code-execution": {
   "displayName": "Python Code Execution",
   "description": "A secure sandboxed Python code execution environment for MCP (Model-Client-Program) architecture.",
   "categories": [
    "Dev Tools"
   ],
   "tags": [
    "python",
    "code-execution"
   ],
   "repository": "https://github.com/pathintegral-institute/mcp.science",
   "homepage": "https://github.com/pathintegral-institute/mcp.science/tree/main/servers/python-code-execution",
   "official": true,
   "methods": [
    {
     "type": "uvx",
     "command": "uvx",
     "args": [
      "--from",
      "git+https://github.com/pathintegral-institute/mcp.science@main#subdirectory=servers/python-code-execution",
      "mcp-python-code-execution"
     ],
     "env": {}
    }
   ],
   "variables": {}
  },
  "mysql": {
   "displayName": "MySQL Database Integration",
   "description": "MySQL database integration in Python with configurable access controls and schema inspection",
   "categories": [
    "Databases"
   ],
   "tags": [
    "MySQL",
    "Database Access"
   ],
   "repository": "https://github.com/designcomputer/mysql_mcp_server",
   "homepage": "https://github.com/designcomputer/mysql_mcp_server",
   "official": false,
   "methods": [
    {
     "type": "uvx",
     "command": "uvx",
     "args": [
      "mysql_mcp_server"
     ],
     "env": {
      "MYSQL_HOST": null,
      "MYSQL_PORT": null,
      "MYSQL_USER": null,
      "MYSQL_PASSWORD": null,
      "MYSQL_DATABASE": null
     }
    }
   ],
   "variables": {
    "MYSQL_HOST": {
     "description": "Database host",
     "required": true,
     "example": "localhost"
    },
    "MYSQL_PORT": {
     "description": "Database port (defaults to 3306 if not specified)",
     "required": false,
     "example": "3306"
    },
    "MYSQL_USER": {
     "description": "Username for database access",
     "required": true,
     "example": "your_username"
    },
    "MYSQL_PASSWORD": {
     "description": "Password for the database user",
     "required": true,
     "example": "your_password"
    },
    "MYSQL_DATABASE": {
     "description": "Database name to connect to",
     "required": true,
     "example": "your_database"
    }
   }
  },
  "mindmap": {
   "displayName": "Mindmap",
   "description": "A server that generates mindmaps from input containing markdown code.",
   "categories": [
    "Media Creation"
   ],
   "tags": [
    "mindmap",
    "markdown",
    "interactive"
   ],
   "repository": "https://github.com/YuChenSSR/mindmap-mcp-server",
   "homepage": "https://github.com/YuChenSSR/mindmap-mcp-server",
   "official": false,
   "methods": [
    {
     "type": "uvx",
     "command": "uvx",
     "args": [
      "mindmap-mcp-server",
      "--return-type",
      "html"
     ],
     "env": {}
    },
    {
     "type": "docker",
     "command": "docker",
     "args": [
      "run",
      "--rm",
      "-i",
      "-v",
      "/path/to/output/folder:/output",
      "ychen94/mindmap-converter-mcp:latest"
     ],
     "env": {}
    }
   ],
   "variables": {}
  },
  "mcp-server-raygun": {
   "displayName": "Raygun MCP Server",
   "description": "MCP Server for Raygun's API V3 endpoints for interacting with your Crash Reporting and Real User Monitoring applications. This server provides comprehensive access to Raygun's API features through the Model Context Protocol.",
   "categories": [
    "Dev Tools"
   ],
   "tags": [
    "raygun",
    "crash reporting",
    "real user monitoring",
    "error management",
    "performance monitoring"
   ],
   "repository": "https://github.com/MindscapeHQ/mcp-server-raygun",
   "homepage": "https://github.com/MindscapeHQ/mcp-server-raygun",
   "official": true,
   "methods": [
    {
     "type": "npm",
     "command": "npx",
     "args": [
      "-y",
      "@raygun.io/mcp-server-raygun"
     ],
     "env": {
      "RAYGUN_PAT_TOKEN": "your-pat-token-here"
     }
    },
    {
     "type": "custom",
     "command": "/path/to/server-raygun/build/index.js",
     "args": [],
     "env": {
      "RAYGUN_PAT_TOKEN": "your-pat-token-ken"
     }
    }
   ],
   "variables": {
    "RAYGUN_PAT_TOKEN": {
     "description": "Your Raygun PAT token",
     "required": true,
     "example": "your-pat-token-here"
    },
    "SOURCEMAP_ALLOWED_DIRS": {
     "description": "Comma-separated list of directories allowed for source map operations",
     "required": false,
     "example": ""
    }
   }
  },
  "mcp-zenml": {
   "displayName": "ZenML MCP Server",
   "description": "Interact with your MLOps and LLMOps pipelines through your ZenML MCP server",
   "categories": [
    "Dev Tools"
   ],
   "tags": [
    "zenml",
    "mcp",
    "ai",
    "ml",
    "pipelines"
   ],
   "repository": "https://github.com/zenml-io/mcp-zenml",
   "homepage": "https://zenml.io",
   "official": true,
   "methods": [
    {
     "type": "custom",
     "command": "uv",
     "args": [
      "run",
      "path/to/zenml_server.py"
     ],
     "env": {
      "LOGLEVEL": "INFO",
      "NO_COLOR": "1",
      "PYTHONUNBUFFERED": "1",
      "PYTHONIOENCODING": "UTF-8",
      "ZENML_STORE_URL": "https://your-zenml-server-goes-here.com",
      "ZENML_STORE_API_KEY": "your-api-key-here"
     }
    }
   ],
   "variables": {
    "ZENML_STORE_URL": {
     "description": "URL of your ZenML server",
     "required": true,
     "example": "https://d534d987a-zenml.cloudinfra.zenml.io"
    },
    "ZENML_STORE_API_KEY": {
     "description": "API key for your ZenML server",
     "required": true,
     "example": "your-api-key-here"
    },
    "LOGLEVEL": {
     "description": "Logging level",
     "required": false,
     "example": "INFO"
    }
   }
  },
  "travel-planner": {
   "displayName": "Travel Planner",
   "description": "Travel planning and itinerary management server integrating with Google Maps API for location search, place details, and route calculations.",
   "categories": [
    "Professional Apps"
   ],
   "tags": [
    "google-maps",
    "travel-planning"
   ],
   "repository": "https://github.com/GongRzhe/TRAVEL-PLANNER-MCP-Server",
   "homepage": "https://github.com/GongRzhe/TRAVEL-PLANNER-MCP-Server",
   "official": false,
   "methods": [
    {
     "type": "npm",
     "command": "npx",
     "args": [
      "@gongrzhe/server-travelplanner-mcp"
     ],
     "env": {
      "GOOGLE_MAPS_API_KEY": null
     }
    }
   ],
   "variables": {
    "GOOGLE_MAPS_API_KEY": {
     "description": "Your Google Maps API key with the following APIs enabled: Places API, Directions API, Geocoding API, Time Zone API",
     "required": true,
     "example": "your_google_maps_api_key"
    }
   }
  },
  "postgresql": {
   "displayName": "PostgreSQL",
   "description": "Read-only database access with schema inspection",
   "categories": [
    "Databases"
   ],
   "tags": [
    "PostgreSQL",
    "Database",
    "Read-Only"
   ],
   "repository": "https://github.com/modelcontextprotocol/servers",
   "homepage": "https://github.com/modelcontextprotocol/servers/blob/main/src/postgres",
   "official": true,
   "methods": [
    {
     "type": "npm",
     "command": "npx",
     "args": [
      "-y",
      "@modelcontextprotocol/server-postgres",
      "postgresql://localhost/mydb"
     ],
     "env": {}
    },
    {
     "type": "docker",
     "command": "docker",
     "args": [
      "run",
      "-i",
      "--rm",
      "mcp/postgres",
      "postgresql://host.docker.internal:5432/mydb"
     ],
     "env": {}
    }
   ],
   "variables": {}
  },
  "todoist": {
   "displayName": "Todoist",
   "description": "Interact with Todoist to manage your tasks.",
   "categories": [
    "Productivity"
   ],
   "tags": [
    "task management",
    "todoist",
    "natural language processing"
   ],
   "repository": "https://github.com/abhiz123/todoist-mcp-server",
   "homepage": "https://github.com/abhiz123/todoist-mcp-server",
   "official": false,
   "methods": [
    {
     "type": "npm",
     "command": "npx",
     "args": [
      "-y",
      "@abhiz123/todoist-mcp-server"
     ],
     "env": {
      "TODOIST_API_TOKEN": null
     }
    }
   ],
   "variables": {
    "TODOIST_API_TOKEN": {
     "description": "API token to authenticate with the Todoist service",
     "required": true,
     "example": "your_api_token_here"
    }
   }
  },
  "ntfy-mcp": {
   "displayName": "Your Friendly Task Completion Notifier",
   "description": "The MCP server that keeps you informed by sending the notification on phone using ntfy",
   "categories": [
    "Messaging"
   ],
   "tags": [
    "ntfy",
    "notifications"
   ],
   "repository": "https://github.com/teddyzxcv/ntfy-mcp",
   "homepage": "https://github.com/teddyzxcv/ntfy-mcp",
   "official": false,
   "methods": [
    {
     "type": "npm",
     "command": "npx",
     "args": [
      "-y",
      "https://github.com/teddyzxcv/ntfy-mcp"
     ],
     "env": {
      "NTFY_TOPIC": null
     }
    }
   ],
   "variables": {
    "NTFY_TOPIC": {
     "description": "Environment variable representing the topic name for notifications to be sent to.",
     "required": true,
     "example": "your_topic_name"
    }
   }
  },
  "everart": {
   "displayName": "EverArt",
   "description": "AI image generation using various models",
   "categories": [
    "Media Creation"
   ],
   "tags": [
    "EverArt",
    "API",
    "Claude Desktop"
   ],
   "repository": "https://github.com/modelcontextprotocol/servers",
   "homepage": "https://github.com/modelcontextprotocol/servers/blob/main/src/everart",
   "official": true,
   "methods": [
    {
     "type": "npm",
     "command": "npx",
     "args": [
      "-y",
      "@modelcontextprotocol/server-everart"
     ],
     "env": {
      "EVERART_API_KEY": null
     }
    },
    {
     "type": "docker",
     "command": "docker",
     "args": [
      "run",
      "-i",
      "--rm",
      "-e",
      "EVERART_API_KEY",
      "mcp/everart"
     ],
     "env": {
      "EVERART_API_KEY": null
     }
    }
   ],
   "variables": {
    "EVERART_API_KEY": {
     "description": "API key to access the EverArt API",
     "required": true,
     "example": "your_key_here"
    }
   }
  },
  "pushover": {
   "displayName": "Pushover Notifications",
   "description": "Send instant notifications to your devices using [Pushover.net](https://pushover.net/)",
   "categories": [
    "Messaging"
   ],
   "tags": [
    "pushover",
    "notifications"
   ],
   "repository": "https://github.com/ashiknesin/pushover-mcp",
   "homepage": "https://github.com/ashiknesin/pushover-mcp",
   "official": false,
   "methods": [
    {
     "type": "npm",
     "command": "npx",
     "args": [
      "-y",
      "pushover-mcp@latest",
      "start",
      "--token",
      "${YOUR_TOKEN}",
      "--user",
      "${YOUR_USER}"
     ],
     "env": {}
    }
   ],
   "variables": {
    "YOUR_TOKEN": {
     "description": "Application token required for authenticating with Pushover.net",
     "required": true,
     "example": "abcdef123456"
    },
    "YOUR_USER": {
     "description": "User key associated with your Pushover.net account",
     "required": true,
     "example": "1234567890:abcdef123456"
    }
   }
  },
  "memory": {
   "displayName": "Knowledge Graph Memory",
   "description": "Knowledge graph-based persistent memory system",
   "categories": [
    "Knowledge Base"
   ],
   "tags": [
    "knowledge graph",
    "memory",
    "persistent memory"
   ],
   "repository": "https://github.com/modelcontextprotocol/servers",
   "homepage": "https://github.com/modelcontextprotocol/servers/blob/main/src/memory",
   "official": true,
   "methods": [
    {
     "type": "npm",
     "command": "npx",
     "args": [
      "-y",
      "@modelcontextprotocol/server-memory"
     ],
     "env": {}
    },
    {
     "type": "docker",
     "command": "docker",
     "args": [
      "run",
      "-i",
      "-v",
      "claude-memory:/app/dist",
      "--rm",
      "mcp/memory"
     ],
     "env": {}
    }
   ],
   "variables": {
    "MEMORY_FILE_PATH": {
     "description": "Path to the memory storage JSON file (default: memory.json in the server directory)",
     "required": false,
     "example": "/path/to/custom/memory.json"
    }
   }
  },
  "elevenlabs": {
   "displayName": "ElevenLabs",
   "description": "A server that integrates with ElevenLabs text-to-speech API capable of generating full voiceovers with multiple voices.",
   "categories": [
    "Media Creation"
   ],
   "tags": [
    "ElevenLabs",
    "Text-to-Speech",
    "SvelteKit",
    "TTS"
   ],
   "repository": "https://github.com/mamertofabian/elevenlabs-mcp-server",
   "homepage": "https://github.com/mamertofabian/elevenlabs-mcp-server",
   "official": false,
   "methods": [
    {
     "type": "uvx",
     "command": "uvx",
     "args": [
      "elevenlabs-mcp-server"
     ],
     "env": {
      "ELEVENLABS_API_KEY": null,
      "ELEVENLABS_VOICE_ID": null,
      "ELEVENLABS_MODEL_ID": null,
      "ELEVENLABS_STABILITY": null,
      "ELEVENLABS_SIMILARITY_BOOST": null,
      "ELEVENLABS_STYLE": null,
      "ELEVENLABS_OUTPUT_DIR": null
     }
    }
   ],
   "variables": {
    "ELEVENLABS_API_KEY": {
     "description": "Your API key for ElevenLabs to access the text-to-speech services.",
     "required": true,
     "example": "sk-12345abcd"
    },
    "ELEVENLABS_VOICE_ID": {
     "description": "The ID of the voice you want to use for synthesis.",
     "required": true,
     "example": "voice-12345"
    },
    "ELEVENLABS_MODEL_ID": {
     "description": "The model ID to be used, indicating the version of the ElevenLabs API to utilize.",
     "required": false,
     "example": "eleven_flash_v2"
    },
    "ELEVENLABS_STABILITY": {
     "description": "Stability of the voice generation; controls variations in the output voice.",
     "required": false,
     "example": "0.5"
    },
    "ELEVENLABS_SIMILARITY_BOOST": {
     "description": "Boosting similarity for the voices; affects how closely the output mimics the selected voice.",
     "required": false,
     "example": "0.75"
    },
    "ELEVENLABS_STYLE": {
     "description": "Style parameter to adjust the expression in the generated speech.",
     "required": false,
     "example": "0.1"
    },
    "ELEVENLABS_OUTPUT_DIR": {
     "description": "Directory path where the generated audio files will be saved.",
     "required": false,
     "example": "output"
    }
   }
  },
  "airbnb": {
   "displayName": "Airbnb",
   "description": "Provides tools to search Airbnb and get listing details.",
   "categories": [
    "Web Services"
   ],
   "tags": [
    "Airbnb",
    "search",
    "listings"
   ],
   "repository": "https://github.com/openbnb-org/mcp-server-airbnb",
   "homepage": "https://github.com/openbnb-org/mcp-server-airbnb",
   "official": false,
   "methods": [
    {
     "type": "npm",
     "command": "npx",
     "args": [
      "-y",
      "@openbnb/mcp-server-airbnb"
     ],
     "env": {}
    }
   ],
   "variables": {
    "location": {
     "description": "The location where you want to search for Airbnb listings",
     "required": true,
     "example": "New York City"
    },
    "placeId": {
     "description": "The unique identifier for a specific place or location",
     "required": false,
     "example": "ChIJN1t_tDeuEmsRUsoyG83frY4"
    },
    "checkin": {
     "description": "The check-in date for your stay in YYYY-MM-DD format",
     "required": false,
     "example": "2023-10-01"
    },
    "checkout": {
     "description": "The check-out date for your stay in YYYY-MM-DD format",
     "required": false,
     "example": "2023-10-05"
    },
    "adults": {
     "description": "The number of adults staying",
     "required": false,
     "example": "2"
    },
    "children": {
     "description": "The number of children staying",
     "required": false,
     "example": "1"
    },
    "infants": {
     "description": "The number of infants staying",
     "required": false,
     "example": "1"
    },
    "pets": {
     "description": "The number of pets allowed in the listing",
     "required": false,
     "example": "2"
    },
    "minPrice": {
     "description": "The minimum price per night for the listings",
     "required": false,
     "example": "50"
    },
    "maxPrice": {
     "description": "The maximum price per night for the listings",
     "required": false,
     "example": "300"
    },
    "cursor": {
     "description": "A cursor for paginating through results",
     "required": false,
     "example": "next-page-token"
    },
    "ignoreRobotsText": {
     "description": "Set to true to disregard Airbnb's robots.txt rules for all requests",
     "required": false,
     "example": "true"
    }
   }
  },
  "prometheus": {
   "displayName": "Prometheus",
   "description": "Query and analyze Prometheus - open-source monitoring system.",
   "categories": [
    "Analytics"
   ],
   "tags": [
    "Prometheus",
    "Metrics",
    "AI"
   ],
   "repository": "https://github.com/pab1it0/prometheus-mcp-server",
   "homepage": "https://github.com/pab1it0/prometheus-mcp-server",
   "official": false,
   "methods": [
    {
     "type": "uvx",
     "command": "uvx",
     "args": [
      "--from",
      "git+https://github.com/pab1it0/prometheus-mcp-server",
      "prometheus-mcp-server"
     ],
     "env": {
      "PROMETHEUS_URL": null,
      "PROMETHEUS_USERNAME": null,
      "PROMETHEUS_PASSWORD": null
     }
    }
   ],
   "variables": {
    "PROMETHEUS_URL": {
     "description": "The URL of the Prometheus server you want to connect to.",
     "required": true,
     "example": "http://your-prometheus-server:9090"
    },
    "PROMETHEUS_USERNAME": {
     "description": "The username for basic authentication when accessing the Prometheus server.",
     "required": false,
     "example": "your_username"
    },
    "PROMETHEUS_PASSWORD": {
     "description": "The password for basic authentication when accessing the Prometheus server.",
     "required": false,
     "example": "your_password"
    }
   }
  },
  "searxng": {
   "displayName": "SearXNG",
   "description": "A Model Context Protocol Server for [SearXNG](https://docs.searxng.org/)",
   "categories": [
    "Web Services"
   ],
   "tags": [
    "search",
    "searxng",
    "api"
   ],
   "repository": "https://github.com/ihor-sokoliuk/mcp-searxng",
   "homepage": "https://github.com/ihor-sokoliuk/mcp-searxng",
   "official": false,
   "methods": [
    {
     "type": "npm",
     "command": "npx",
     "args": [
      "-y",
      "https://github.com/ihor-sokoliuk/mcp-searxng"
     ],
     "env": {
      "SEARXNG_URL": null
     }
    }
   ],
   "variables": {
    "SEARXNG_URL": {
     "description": "Environment variable to set the URL of the SearXNG instance that will be used for search queries.",
     "required": true,
     "example": "http://localhost:8080"
    }
   }
  },
  "greptimedb-mcp-server": {
   "displayName": "GreptimeDB MCP Server",
   "description": "A Model Context Protocol (MCP) server implementation for [GreptimeDB](https://github.com/GreptimeTeam/greptimedb).",
   "categories": [
    "Databases"
   ],
   "tags": [
    "database",
    "sql",
    "greptimedb",
    "mcp"
   ],
   "repository": "https://github.com/GreptimeTeam/greptimedb-mcp-server",
   "homepage": "https://github.com/GreptimeTeam/greptimedb-mcp-server",
   "official": true,
   "methods": [
    {
     "type": "uvx",
     "command": "uvx",
     "args": [
      "greptimedb-mcp-server"
     ],
     "env": {
      "GREPTIMEDB_HOST": "localhost",
      "GREPTIMEDB_PORT": "4002",
      "GREPTIMEDB_USER": "root",
      "GREPTIMEDB_PASSWORD": "",
      "GREPTIMEDB_DATABASE": "public"
     }
    }
   ],
   "variables": {
    "GREPTIMEDB_HOST": {
     "description": "Database host",
     "required": true,
     "example": "localhost"
    },
    "GREPTIMEDB_PORT": {
     "description": "Database port",
     "required": false,
     "example": "4002"
    },
    "GREPTIMEDB_USER": {
     "description": "Database username",
     "required": true,
     "example": "root"
    },
    "GREPTIMEDB_PASSWORD": {
     "description": "Database password",
     "required": true,
     "example": ""
    },
    "GREPTIMEDB_DATABASE": {
     "description": "Database name",
     "required": true,
     "example": "public"
    }
   }
  },
  "pinecone": {
   "displayName": "Pinecone Model Context Protocol for Claude Desktop",
   "description": "MCP server for searching and uploading records to Pinecone. Allows for simple RAG features, leveraging Pinecone's Inference API.",
   "categories": [
    "Databases"
   ],
   "tags": [
    "pinecone"
   ],
   "repository": "https://github.com/sirmews/mcp-pinecone",
   "homepage": "https://github.com/sirmews/mcp-pinecone",
   "official": false,
   "methods": [
    {
     "type": "uvx",
     "command": "uvx",
     "args": [
      "mcp-pinecone",
      "--index-name",
      "${your-index-name}",
      "--api-key",
      "${your-secret-api-key}"
     ],
     "env": {}
    }
   ],
   "variables": {}
  },
  "atlassian": {
   "displayName": "Atlassian",
   "description": "Interact with Atlassian Cloud products (Confluence and Jira) including searching/reading Confluence spaces/pages, accessing Jira issues, and project metadata.",
   "categories": [
    "Productivity"
   ],
   "tags": [
    "Atlassian",
    "Confluence",
    "Jira"
   ],
   "repository": "https://github.com/sooperset/mcp-atlassian",
   "homepage": "https://github.com/sooperset/mcp-atlassian",
   "official": false,
   "methods": [
    {
     "type": "uvx",
     "command": "uvx",
     "args": [
      "mcp-atlassian",
      "--confluence-url=${CONFLUENCE_URL}",
      "--confluence-username=${CONFLUENCE_USERNAME}",
      "--confluence-token=${CONFLUENCE_TOKEN}",
      "--jira-url=${JIRA_URL}",
      "--jira-username=${JIRA_USERNAME}",
      "--jira-token=${JIRA_TOKEN}"
     ],
     "env": {}
    },
    {
     "type": "python",
     "command": "python",
     "args": [
      "-m",
      "mcp-atlassian",
      "--confluence-url=${CONFLUENCE_URL}",
      "--confluence-username=${CONFLUENCE_USERNAME}",
      "--confluence-token=${CONFLUENCE_TOKEN}",
      "--jira-url=${JIRA_URL}",
      "--jira-username=${JIRA_USERNAME}",
      "--jira-token=${JIRA_TOKEN}"
     ],
     "env": {}
    },
    {
     "type": "docker",
     "command": "docker",
     "args": [
      "run",
      "--rm",
      "-i",
      "mcp/atlassian",
      "--confluence-url=${CONFLUENCE_URL}",
      "--confluence-username=${CONFLUENCE_USERNAME}",
      "--confluence-token=${CONFLUENCE_TOKEN}",
      "--jira-url=${JIRA_URL}",
      "--jira-username=${JIRA_USERNAME}",
      "--jira-token=${JIRA_TOKEN}"
     ],
     "env": {}
    }
   ],
   "variables": {
    "CONFLUENCE_URL": {
     "description": "The URL of the Confluence site to connect to. Required for both Cloud and Server/Data Center deployments.",
     "required": true,
     "example": "https://your-company.atlassian.net/wiki or https://confluence.your-company.com"
    },
    "CONFLUENCE_USERNAME": {
     "description": "The username for the Confluence account (email for Cloud). Required to authenticate with Confluence.",
     "required": true,
     "example": "your.email@company.com"
    },
    "CONFLUENCE_TOKEN": {
     "description": "The API token or personal access token for the Confluence account. Required for authentication with Confluence.",
     "required": true,
     "example": "your_api_token or your_token"
    },
    "JIRA_URL": {
     "description": "The URL of the Jira site to connect to. Required for both Cloud and Server/Data Center deployments.",
     "required": true,
     "example": "https://your-company.atlassian.net or https://jira.your-company.com"
    },
    "JIRA_USERNAME": {
     "description": "The username for the Jira account (email for Cloud). Required to authenticate with Jira.",
     "required": true,
     "example": "your.email@company.com"
    },
    "JIRA_TOKEN": {
     "description": "The API token or personal access token for the Jira account. Required for authentication with Jira.",
     "required": true,
     "example": "your_api_token or your_token"
    }
   }
  },
  "mcp-server-browserbase": {
   "displayName": "Browserbase MCP Server",
   "description": "Automate browser interactions in the cloud (e.g. web navigation, data extraction, form filling, and more)",
   "categories": [
    "Dev Tools"
   ],
   "tags": [
    "browser automation",
    "puppeteer",
    "stagehand",
    "web interaction",
    "screenshots",
    "javascript"
   ],
   "repository": "https://github.com/browserbase/mcp-server-browserbase",
   "homepage": "https://www.browserbase.com/",
   "official": true,
   "methods": [
    {
     "type": "custom",
     "command": "node",
     "args": [
      "src/build/dist/index.js"
     ],
     "env": {}
    }
   ],
   "variables": {}
  },
  "open-strategy-partners-marketing-tools": {
   "displayName": "Open Strategy Partners Marketing Tools",
   "description": "Content editing codes, value map, and positioning tools for product marketing.",
   "categories": [
    "Productivity"
   ],
   "tags": [
    "LLM",
    "Technical Writing",
    "Optimization"
   ],
   "repository": "https://github.com/open-strategy-partners/osp_marketing_tools",
   "homepage": "https://github.com/open-strategy-partners/osp_marketing_tools",
   "official": false,
   "methods": [
    {
     "type": "uvx",
     "command": "uvx",
     "args": [
      "--from",
      "git+https://github.com/open-strategy-partners/osp_marketing_tools@main",
      "osp_marketing_tools"
     ],
     "env": {}
    }
   ],
   "variables": {}
  },
  "mongodb-lens": {
   "displayName": "MongoDB Lens",
   "description": "Full Featured MCP Server for MongoDB Databases.",
   "categories": [
    "Databases"
   ],
   "tags": [
    "mongodb",
    "server"
   ],
   "repository": "https://github.com/furey/mongodb-lens",
   "homepage": "https://github.com/furey/mongodb-lens",
   "official": false,
   "methods": [
    {
     "type": "npm",
     "command": "npx",
     "args": [
      "-y",
      "mongodb-lens@latest",
      "${MONGODB_URI}"
     ],
     "env": {
      "CONFIG_LOG_LEVEL": null
     }
    },
    {
     "type": "docker",
     "command": "docker",
     "args": [
      "run",
      "--rm",
      "-i",
      "--network=host",
      "--pull=always",
      "-e",
      "CONFIG_LOG_LEVEL='verbose'",
      "furey/mongodb-lens",
      "${MONGODB_URI}"
     ],
     "env": {
      "CONFIG_LOG_LEVEL": null
     }
    }
   ],
   "variables": {
    "CONFIG_LOG_LEVEL": {
     "description": "Sets the logging level of MongoDB Lens, controlling the verbosity of log output.",
     "required": false,
     "example": "verbose"
    },
    "MONGODB_URI": {
     "description": "The connection string for the MongoDB database.",
     "required": true,
     "example": "mongodb://your-connection-string"
    }
   }
  },
  "devrev": {
   "displayName": "DevRev",
   "description": "An MCP server to integrate with DevRev APIs to search through your DevRev Knowledge Graph where objects can be imported from diff. sources listed [here](https://devrev.ai/docs/import#available-sources).",
   "categories": [
    "Knowledge Base"
   ],
   "tags": [
    "devrev",
    "server",
    "search"
   ],
   "repository": "https://github.com/kpsunil97/devrev-mcp-server",
   "homepage": "https://github.com/kpsunil97/devrev-mcp-server",
   "official": false,
   "methods": [
    {
     "type": "uvx",
     "command": "uvx",
     "args": [
      "devrev-mcp"
     ],
     "env": {
      "DEVREV_API_KEY": null
     }
    }
   ],
   "variables": {
    "DEVREV_API_KEY": {
     "description": "Your DevRev API key required to authenticate requests to the DevRev API.",
     "required": true,
     "example": "YOUR_DEVREV_API_KEY"
    }
   }
  },
  "eunomia": {
   "displayName": "Eunomia",
   "description": "Extension of the Eunomia framework that connects Eunomia instruments with MCP servers",
   "categories": [
    "AI Systems"
   ],
   "tags": [
    "Eunomia",
    "Data Governance"
   ],
   "repository": "https://github.com/whataboutyou-ai/eunomia-MCP-server",
   "homepage": "https://github.com/whataboutyou-ai/eunomia-MCP-server",
   "official": false,
   "methods": [
    {
     "type": "uvx",
     "command": "uvx",
     "args": [
      "--from",
      "git+https://github.com/whataboutyou-ai/eunomia-MCP-server",
      "orchestra_server"
     ],
     "env": {}
    }
   ],
   "variables": {
    "APP_NAME": {
     "description": "Name of the application",
     "required": true,
     "example": "mcp-server_orchestra"
    },
    "APP_VERSION": {
     "description": "Current version of the application",
     "required": true,
     "example": "0.1.0"
    },
    "LOG_LEVEL": {
     "description": "Logging level to control the verbosity of logs (default: 'info')",
     "required": false,
     "example": "info"
    },
    "REQUEST_TIMEOUT": {
     "description": "Environment variable that sets the request timeout duration in seconds",
     "required": false,
     "example": "30"
    }
   }
  },
  "amap": {
   "displayName": "Amap / 高德地图",
   "description": "MCP Server for the AMap Map API.",
   "categories": [
    "Web Services"
   ],
   "tags": [
    "amap",
    "map"
   ],
   "repository": "https://www.npmjs.com/package/@amap/amap-maps-mcp-server",
   "homepage": "https://lbs.amap.com/api/mcp-server/summary",
   "official": true,
   "methods": [
    {
     "type": "npm",
     "command": "npx",
     "args": [
      "-y",
      "@amap/amap-maps-mcp-server"
     ],
     "env": {
      "AMAP_MAPS_API_KEY": null
     }
    }
   ],
   "variables": {
    "AMAP_MAPS_API_KEY": {
     "description": "The API key to access the AMap service.",
     "required": true,
     "example": "YOUR_API_KEY_HERE"
    }
   }
  },
  "google-custom-search": {
   "displayName": "Google Custom Search",
   "description": "Provides Google Search results via the Google Custom Search API",
   "categories": [
    "Web Services"
   ],
   "tags": [
    "Google",
    "Custom Search",
    "Webpage Reading"
   ],
   "repository": "https://github.com/adenot/mcp-google-search",
   "homepage": "https://github.com/adenot/mcp-google-search",
   "official": false,
   "methods": [
    {
     "type": "npm",
     "command": "npx",
     "args": [
      "-y",
      "@adenot/mcp-google-search"
     ],
     "env": {
      "GOOGLE_API_KEY": "your-api-key-here",
      "GOOGLE_SEARCH_ENGINE_ID": "your-search-engine-id-here"
     }
    }
   ],
   "variables": {
    "GOOGLE_API_KEY": {
     "description": "Your Google API key for accessing the Google Custom Search API.",
     "required": true,
     "example": "AIzaSy…example…"
    },
    "GOOGLE_SEARCH_ENGINE_ID": {
     "description": "The unique identifier for your Custom Search Engine that you created on Google.",
     "required": true,
     "example": "012345678901234567890:abcdefghijk"
    }
   }
  },
  "bigquery": {
   "displayName": "BigQuery",
   "description": "Server implementation for Google BigQuery integration that enables direct BigQuery database access and querying capabilities",
   "categories": [
    "Databases"
   ],
   "tags": [
    "BigQuery",
    "AI",
    "LLM"
   ],
   "repository": "https://github.com/ergut/mcp-bigquery-server",
   "homepage": "https://github.com/ergut/mcp-bigquery-server",
   "official": false,
   "methods": [
    {
     "type": "npm",
     "command": "npx",
     "args": [
      "-y",
      "@ergut/mcp-bigquery-server",
      "--project-id",
      "${PROJECT_ID}",
      "--location",
      "${LOCATION}"
     ],
     "env": {}
    }
   ],
   "variables": {
    "PROJECT_ID": {
     "description": "Your Google Cloud project ID",
     "required": true,
     "example": "your-project-id"
    },
    "LOCATION": {
     "description": "BigQuery location, defaults to 'us-central1'.",
     "required": false,
     "example": "us-central1"
    }
   }
  },
  "e2b-mcp-server": {
   "displayName": "E2B MCP Server",
   "description": "This repository contains the source code for the [E2B](https://e2b.dev) MCP server.",
   "categories": [
    "MCP Tools"
   ],
   "tags": [
    "code-interpreter",
    "claude",
    "sandbox"
   ],
   "repository": "https://github.com/e2b-dev/mcp-server",
   "homepage": "https://e2b.dev",
   "official": true,
   "methods": [
    {
     "type": "npm",
     "command": "npx",
     "args": [
      "-y",
      "@e2b/mcp-server"
     ],
     "env": {
      "E2B_API_KEY": null
     }
    },
    {
     "type": "uvx",
     "command": "uvx",
     "args": [
      "e2b-mcp-server"
     ],
     "env": {
      "E2B_API_KEY": null
     }
    }
   ],
   "variables": {
    "e2bApiKey": {
     "description": "E2B API key",
     "required": true,
     "example": ""
    }
   }
  },
  "bitable-mcp": {
   "displayName": "Bitable",
   "description": "MCP server provides access to Lark Bitable through the Model Context Protocol. It allows users to interact with Bitable tables using predefined tools.",
   "categories": [
    "Databases"
   ],
   "tags": [
    "Bitable",
    "Lark"
   ],
   "repository": "https://github.com/lloydzhou/bitable-mcp",
   "homepage": "https://github.com/lloydzhou/bitable-mcp",
   "official": false,
   "methods": [
    {
     "type": "uvx",
     "command": "uvx",
     "args": [
      "bitable-mcp"
     ],
     "env": {
      "PERSONAL_BASE_TOKEN": null,
      "APP_TOKEN": null
     }
    },
    {
     "type": "python",
     "command": "python",
     "args": [
      "-m",
      "bitable_mcp"
     ],
     "env": {
      "PERSONAL_BASE_TOKEN": null,
      "APP_TOKEN": null
     }
    }
   ],
   "variables": {
    "PERSONAL_BASE_TOKEN": {
     "description": "Personal base token required for authentication with the Bitable API.",
     "required": true,
     "example": "your_personal_base_token"
    },
    "APP_TOKEN": {
     "description": "Application token required for the Bitable server to function properly.",
     "required": true,
     "example": "your_app_token"
    }
   }
  },
  "openapi-anyapi": {
   "displayName": "Scalable OpenAPI Endpoint Discovery Tool",
   "description": "Interact with large [OpenAPI](https://www.openapis.org/) docs using built-in semantic search for endpoints. Allows for customizing the MCP server prefix.",
   "categories": [
    "Dev Tools"
   ],
   "tags": [
    "OpenAPI",
    "API Discovery",
    "Semantic Search",
    "FastAPI"
   ],
   "repository": "https://github.com/baryhuang/mcp-server-any-openapi",
   "homepage": "https://github.com/baryhuang/mcp-server-any-openapi",
   "official": false,
   "methods": [
    {
     "type": "docker",
     "command": "docker",
     "args": [
      "run",
      "-i",
      "--rm",
      "-e",
      "OPENAPI_JSON_DOCS_URL=${OPENAPI_JSON_DOCS_URL}",
      "-e",
      "API_REQUEST_BASE_URL=${API_REQUEST_BASE_URL}",
      "-e",
      "MCP_API_PREFIX=${MCP_API_PREFIX}",
      "buryhuang/mcp-server-any-openapi:latest"
     ],
     "env": {
      "OPENAPI_JSON_DOCS_URL": null,
      "API_REQUEST_BASE_URL": null,
      "MCP_API_PREFIX": null
     }
    },
    {
     "type": "uvx",
     "command": "uvx",
     "args": [
      "--from",
      "git+https://github.com/baryhuang/mcp-server-any-openapi",
      "src/mcp_server_any_openapi/server.py"
     ],
     "env": {
      "OPENAPI_JSON_DOCS_URL": null,
      "API_REQUEST_BASE_URL": null,
      "MCP_API_PREFIX": null
     }
    }
   ],
   "variables": {
    "OPENAPI_JSON_DOCS_URL": {
     "description": "URL to the OpenAPI specification JSON (defaults to https://api.staging.readymojo.com/openapi.json)",
     "required": false,
     "example": "https://api.example.com/openapi.json"
    },
    "API_REQUEST_BASE_URL": {
     "description": "Optional base URL to override the default URL extracted from the OpenAPI document.",
     "required": false,
     "example": "https://api.finance.com"
    },
    "MCP_API_PREFIX": {
     "description": "Customizable tool namespace (default 'any_openapi'). Allows for control over tool naming.",
     "required": false,
     "example": "finance"
    }
   }
  },
  "blender": {
   "displayName": "Blender",
   "description": "Blender integration allowing prompt enabled 3D scene creation, modeling and manipulation.",
   "categories": [
    "Media Creation"
   ],
   "tags": [
    "Blender",
    "Claude AI",
    "3D Modeling"
   ],
   "repository": "https://github.com/ahujasid/blender-mcp",
   "homepage": "https://github.com/ahujasid/blender-mcp",
   "official": false,
   "methods": [
    {
     "type": "uvx",
     "command": "uvx",
     "args": [
      "blender-mcp"
     ],
     "env": {}
    }
   ],
   "variables": {}
  },
  "virtual-location-google-street-view-etc": {
   "displayName": "Virtual Traveling Bot",
   "description": "Integrates Google Map, Google Street View, PixAI, Stability.ai, ComfyUI API and Bluesky to provide a virtual location simulation in LLM (written in Effect.ts)",
   "categories": [
    "Web Services"
   ],
   "tags": [
    "Google Maps",
    "Avatar",
    "Virtual Travel"
   ],
   "repository": "https://github.com/mfukushim/map-traveler-mcp",
   "homepage": "https://github.com/mfukushim/map-traveler-mcp",
   "official": false,
   "methods": [
    {
     "type": "npm",
     "command": "npx",
     "args": [
      "-y",
      "@mfukushim/map-traveler-mcp"
     ],
     "env": {
      "GoogleMapApi_key": null,
      "mapApi_url": null,
      "time_scale": null,
      "sqlite_path": null,
      "rembg_path": null,
      "remBgUrl": null,
      "pixAi_key": null,
      "sd_key": null,
      "pixAi_modelId": null,
      "comfy_url": null,
      "comfy_workflow_t2i": null,
      "comfy_workflow_i2i": null,
      "comfy_params": null,
      "fixed_model_prompt": null,
      "bodyAreaRatio": null,
      "bodyHWRatio": null,
      "bodyWindowRatioW": null,
      "bodyWindowRatioH": null,
      "bs_id": null,
      "bs_pass": null,
      "bs_handle": null,
      "filter_tools": null,
      "moveMode": null,
      "image_width": null,
      "DATABASE_URL": null
     }
    }
   ],
   "variables": {
    "GoogleMapApi_key": {
     "description": "API key for accessing Google Maps services.",
     "required": true,
     "example": "YOUR_GOOGLE_MAP_API_KEY"
    },
    "mapApi_url": {
     "description": "Custom endpoint for the Map API, if any; otherwise, the default endpoint is used.",
     "required": false,
     "example": "https://your-custom-map-api.com"
    },
    "time_scale": {
     "description": "Scale factor to adjust the travel time based on real roads duration; default is 4.",
     "required": false,
     "example": "5"
    },
    "sqlite_path": {
     "description": "Path for saving the SQLite database file. It determines where the travel log will be stored.",
     "required": true,
     "example": "%USERPROFILE%/Desktop/traveler.sqlite"
    },
    "rembg_path": {
     "description": "Absolute path of the installed rembg command line interface for removing backgrounds from images.",
     "required": true,
     "example": "C:\\path\\to\\your\\rembg.exe"
    },
    "remBgUrl": {
     "description": "URL for the rembg API service if used; this is an alternative to the command line interface.",
     "required": false,
     "example": "http://rembg:7000"
    },
    "pixAi_key": {
     "description": "API key for accessing PixAI image generation services; either this or sd_key must be set to use image generation.",
     "required": true,
     "example": "YOUR_PIXAI_API_KEY"
    },
    "sd_key": {
     "description": "API key for accessing Stability.ai image generation services; either this or pixAi_key must be set.",
     "required": true,
     "example": "YOUR_STABILITY_AI_API_KEY"
    },
    "pixAi_modelId": {
     "description": "ID for the PixAI model to be used, if not set, the default model will be used.",
     "required": false,
     "example": "1648918127446573124"
    },
    "comfy_url": {
     "description": "URL to the ComfyUI API for image generation; must be set if using ComfyUI for this purpose.",
     "required": false,
     "example": "http://192.168.1.100:8188"
    },
    "comfy_workflow_t2i": {
     "description": "Path to the workflow JSON file for text-to-image conversion in ComfyUI.",
     "required": false,
     "example": "C:\\path\\to\\workflow\\t2i.json"
    },
    "comfy_workflow_i2i": {
     "description": "Path to the workflow JSON file for image-to-image conversion in ComfyUI.",
     "required": false,
     "example": "C:\\path\\to\\workflow\\i2i.json"
    },
    "comfy_params": {
     "description": "Parameters for the ComfyUI workflow in key-value format, received during the request.",
     "required": false,
     "example": "key1=value1,key2=value2"
    },
    "fixed_model_prompt": {
     "description": "A fixed prompt for avatar generation that prevents changes during conversations.",
     "required": false,
     "example": "Generate a friendly avatar."
    },
    "bodyAreaRatio": {
     "description": "Acceptable ratio for the avatar image area; affects how much of the image is used for the avatar.",
     "required": false,
     "example": "0.042"
    },
    "bodyHWRatio": {
     "description": "Acceptable aspect ratios for the avatar image; ensures correct proportions for the avatar.",
     "required": false,
     "example": "1.5~2.3"
    },
    "bodyWindowRatioW": {
     "description": "Horizontal ratio for the avatar composite window; affects layout.",
     "required": false,
     "example": "0.5"
    },
    "bodyWindowRatioH": {
     "description": "Aspect ratio for the avatar composite window; also affects layout.",
     "required": false,
     "example": "0.75"
    },
    "bs_id": {
     "description": "Bluesky SNS registration address for posting travel updates.",
     "required": false,
     "example": "YOUR_BSKY_ID"
    },
    "bs_pass": {
     "description": "Bluesky SNS password for the dedicated account used for posting.",
     "required": false,
     "example": "YOUR_BSKY_PASSWORD"
    },
    "bs_handle": {
     "description": "Bluesky SNS handle name for the account; used in the posts.",
     "required": false,
     "example": "myusername.bsky.social"
    },
    "filter_tools": {
     "description": "Settings to filter the tools available for use; all tools will be available by default.",
     "required": false,
     "example": "tips,set_traveler_location"
    },
    "moveMode": {
     "description": "Indicates whether the movement mode is realtime or skip; default is realtime.",
     "required": false,
     "example": "realtime"
    },
    "image_width": {
     "description": "Width of the generated output image in pixels; the default is 512.",
     "required": false,
     "example": "512"
    },
    "DATABASE_URL": {
     "description": "Database URL for persistent storage; used if a different database should be connected.",
     "required": false,
     "example": "mysql://user:password@host/dbname"
    }
   }
  },
  "multicluster-mcp-sever": {
   "displayName": "Multi-Cluster Server",
   "description": "The gateway for GenAI systems to interact with multiple Kubernetes clusters.",
   "categories": [
    "Dev Tools"
   ],
   "tags": [
    "Generative AI",
    "Kubernetes"
   ],
   "repository": "https://github.com/yanmxa/multicluster-mcp-server",
   "homepage": "https://github.com/yanmxa/multicluster-mcp-server",
   "official": false,
   "methods": [
    {
     "type": "npm",
     "command": "npx",
     "args": [
      "-y",
      "https://github.com/yanmxa/multicluster-mcp-server"
     ],
     "env": {}
    }
   ],
   "variables": {}
  },
  "txyz-search": {
   "displayName": "TXYZ Search",
   "description": "A Model Context Protocol (MCP) server for TXYZ Search API. Provides tools for academic and scholarly search, general web search, and smart search.",
   "categories": [
    "Web Services"
   ],
   "tags": [
    "search",
    "academic",
    "scholarly",
    "web search"
   ],
   "repository": "https://github.com/pathintegral-institute/mcp.science",
   "homepage": "https://github.com/pathintegral-institute/mcp.science/tree/main/servers/txyz-search",
   "official": true,
   "methods": [
    {
     "type": "uvx",
     "command": "uvx",
     "args": [
      "--from",
      "git+https://github.com/pathintegral-institute/mcp.science#subdirectory=servers/txyz-search",
      "mcp-txyz-search"
     ],
     "env": {
      "TXYZ_API_KEY": null
     }
    }
   ],
   "variables": {
    "TXYZ_API_KEY": {
     "description": "API key from [TXYZ Platform](https://platform.txyz.ai/console)",
     "required": true,
     "example": "your-txyz-api-key"
    }
   }
  },
  "google-maps": {
   "displayName": "Google Maps",
   "description": "Location services, directions, and place details",
   "categories": [
    "Web Services"
   ],
   "tags": [
    "Google Maps",
    "Geolocation"
   ],
   "repository": "https://github.com/modelcontextprotocol/servers",
   "homepage": "https://github.com/modelcontextprotocol/servers/blob/main/src/google-maps",
   "official": true,
   "methods": [
    {
     "type": "npm",
     "command": "npx",
     "args": [
      "-y",
      "@modelcontextprotocol/server-google-maps"
     ],
     "env": {
      "GOOGLE_MAPS_API_KEY": null
     }
    },
    {
     "type": "docker",
     "command": "docker",
     "args": [
      "run",
      "-i",
      "--rm",
      "-e",
      "GOOGLE_MAPS_API_KEY",
      "mcp/google-maps"
     ],
     "env": {
      "GOOGLE_MAPS_API_KEY": null
     }
    }
   ],
   "variables": {
    "GOOGLE_MAPS_API_KEY": {
     "description": "Your Google Maps API key obtained from the Google Developers Console.",
     "required": true,
     "example": "AIzaSyD..."
    }
   }
  },
  "mcp-server-starrocks": {
   "displayName": "StarRocks Official MCP Server",
   "description": "The StarRocks MCP Server acts as a bridge between AI assistants and StarRocks databases, allowing for direct SQL execution and database exploration without requiring complex setup or configuration.",
   "categories": [
    "Databases"
   ],
   "tags": [
    "database",
    "sql",
    "starrocks"
   ],
   "repository": "https://github.com/StarRocks/mcp-server-starrocks",
   "homepage": "https://github.com/StarRocks/mcp-server-starrocks",
   "official": true,
   "methods": [
    {
     "type": "uvx",
     "command": "uvx",
     "args": [
      "mcp-server-starrocks"
     ],
     "env": {
      "STARROCKS_HOST": "localhost",
      "STARROCKS_PORT": "9030",
      "STARROCKS_USER": "root",
      "STARROCKS_PASSWORD": ""
     }
    }
   ],
   "variables": {
    "STARROCKS_HOST": {
     "description": "StarRocks database host",
     "required": false,
     "example": "localhost"
    },
    "STARROCKS_PORT": {
     "description": "StarRocks database port",
     "required": false,
     "example": "9030"
    },
    "STARROCKS_USER": {
     "description": "StarRocks database user",
     "required": false,
     "example": "root"
    },
    "STARROCKS_PASSWORD": {
     "description": "StarRocks database password",
     "required": false,
     "example": ""
    }
   }
  },
  "mcp-gitee": {
   "displayName": "Gitee MCP Server",
   "description": "Gitee MCP Server is a Model Context Protocol (MCP) server implementation for Gitee. It provides a set of tools for interacting with Gitee's API, allowing AI assistants to manage repositories, issues, pull requests, and more.",
   "categories": [
    "Dev Tools"
   ],
   "tags": [
    "gitee",
    "mcp",
    "repository",
    "issues",
    "pull requests"
   ],
   "repository": "https://github.com/oschina/mcp-gitee",
   "homepage": "https://gitee.com/oschina/mcp-gitee",
   "official": true,
   "methods": [
    {
     "type": "custom",
     "command": "go",
     "args": [
      "install",
      "gitee.com/oschina/mcp-gitee@latest"
     ],
     "env": {}
    }
   ],
   "variables": {
    "GITEE_ACCESS_TOKEN": {
     "description": "Gitee access token",
     "required": true,
     "example": "<your personal access token>"
    },
    "api-base": {
     "description": "Gitee API base URL",
     "required": false,
     "example": "https://gitee.com/api/v5"
    }
   }
  },
  "chronulus-mcp": {
   "displayName": "Chronulus MCP",
   "description": "<img width=\"150px\" src=\"https://www.chronulus.com/brand-assets/chronulus-logo-blue-on-alpha-square.png\" alt=\"Chronulus AI\">",
   "categories": [
    "MCP Tools"
   ],
   "tags": [
    "forecasting",
    "prediction",
    "AI agents"
   ],
   "repository": "https://github.com/ChronulusAI/chronulus-mcp",
   "homepage": "https://www.chronulus.com",
   "official": true,
   "methods": [
    {
     "type": "uvx",
     "command": "uvx",
     "args": [
      "chronulus-mcp"
     ],
     "env": {
      "CHRONULUS_API_KEY": "<YOUR_CHRONULUS_API_KEY>"
     }
    },
    {
     "type": "pip",
     "command": "python",
     "args": [
      "-m",
      "chronulus_mcp"
     ],
     "env": {
      "CHRONULUS_API_KEY": "<YOUR_CHRONULUS_API_KEY>"
     }
    },
    {
     "type": "docker",
     "command": "docker",
     "args": [
      "run",
      "-i",
      "--rm",
      "-e",
      "CHRONULUS_API_KEY",
      "chronulus-mcp"
     ],
     "env": {
      "CHRONULUS_API_KEY": "<YOUR_CHRONULUS_API_KEY>"
     }
    }
   ],
   "variables": {
    "CHRONULUS_API_KEY": {
     "description": "API key for Chronulus services",
     "required": true,
     "example": "<YOUR_CHRONULUS_API_KEY>"
    }
   }
  },
  "spotify": {
   "displayName": "Spotify",
   "description": "This MCP allows an LLM to play and use Spotify.",
   "categories": [
    "Media Creation"
   ],
   "tags": [
    "spotify",
    "audio"
   ],
   "repository": "https://github.com/varunneal/spotify-mcp",
   "homepage": "https://github.com/varunneal/spotify-mcp",
   "official": false,
   "methods": [
    {
     "type": "uvx",
     "command": "uvx",
     "args": [
      "--from",
      "git+https://github.com/varunneal/spotify-mcp",
      "spotify-mcp"
     ],
     "env": {
      "SPOTIFY_CLIENT_ID": null,
      "SPOTIFY_CLIENT_SECRET": null,
      "SPOTIFY_REDIRECT_URI": null
     }
    }
   ],
   "variables": {
    "SPOTIFY_CLIENT_ID": {
     "description": "The client ID for your Spotify application, required to authenticate with the Spotify API.",
     "required": true,
     "example": "your_spotify_client_id_here"
    },
    "SPOTIFY_CLIENT_SECRET": {
     "description": "The client secret for your Spotify application, needed for secure authentication with the API.",
     "required": true,
     "example": "your_spotify_client_secret_here"
    },
    "SPOTIFY_REDIRECT_URI": {
     "description": "The redirect URI you specified when creating the Spotify application, needed for the OAuth authentication process.",
     "required": false,
     "example": "http://localhost:8888"
    }
   }
  },
  "any-chat-completions": {
   "displayName": "Any Chat Completions",
   "description": "Interact with any OpenAI SDK Compatible Chat Completions API like OpenAI, Perplexity, Groq, xAI and many more.",
   "categories": [
    "AI Systems"
   ],
   "tags": [
    "Claude",
    "OpenAI",
    "API",
    "Chat Completion"
   ],
   "repository": "https://github.com/pyroprompts/any-chat-completions-mcp",
   "homepage": "https://github.com/pyroprompts/any-chat-completions-mcp",
   "official": false,
   "methods": [
    {
     "type": "npm",
     "command": "npx",
     "args": [
      "-y",
      "https://github.com/pyroprompts/any-chat-completions-mcp"
     ],
     "env": {
      "AI_CHAT_KEY": null,
      "AI_CHAT_NAME": null,
      "AI_CHAT_MODEL": null,
      "AI_CHAT_BASE_URL": null
     }
    }
   ],
   "variables": {
    "AI_CHAT_KEY": {
     "description": "API key for authentication with the chat service provider.",
     "required": true,
     "example": "your_openai_secret_key_here"
    },
    "AI_CHAT_NAME": {
     "description": "The name of the AI chat provider to use, like 'OpenAI' or 'PyroPrompts'.",
     "required": true,
     "example": "OpenAI"
    },
    "AI_CHAT_MODEL": {
     "description": "Specifies which model to be used for the chat service, e.g., 'gpt-4o'.",
     "required": true,
     "example": "gpt-4o"
    },
    "AI_CHAT_BASE_URL": {
     "description": "The base URL for the API service of the chat provider.",
     "required": true,
     "example": "https://api.openai.com/v1"
    }
   }
  },
  "google-tasks": {
   "displayName": "Google Tasks",
   "description": "Google Tasks API Model Context Protocol Server.",
   "categories": [
    "Productivity"
   ],
   "tags": [
    "google",
    "tasks",
    "productivity"
   ],
   "repository": "https://github.com/zcaceres/gtasks-mcp",
   "homepage": "https://github.com/zcaceres/gtasks-mcp",
   "official": false,
   "methods": [
    {
     "type": "npm",
     "command": "npx",
     "args": [
      "-y",
      "https://github.com/zcaceres/gtasks-mcp"
     ],
     "env": {}
    }
   ],
   "variables": {}
  },
  "greptimedb": {
   "displayName": "GreptimeDB",
   "description": "<source media=\"(prefers-color-scheme: light)\" srcset=\"https://cdn.jsdelivr.net/gh/GreptimeTeam/greptimedb@main/docs/logo-text-padding.png\">",
   "categories": [
    "Databases"
   ],
   "tags": [
    "database",
    "timeseries",
    "observability",
    "metrics",
    "logs",
    "events"
   ],
   "repository": "https://github.com/GreptimeTeam/greptimedb",
   "homepage": "https://greptime.com",
   "official": true,
   "methods": [
    {
     "type": "docker",
     "command": "docker",
     "args": [
      "run",
      "-p",
      "127.0.0.1:4000-4003:4000-4003",
      "-v",
      "$(pwd)/greptimedb:./greptimedb_data",
      "--name",
      "greptime",
      "--rm",
      "greptime/greptimedb:latest",
      "standalone",
      "start",
      "--http-addr",
      "0.0.0.0:4000",
      "--rpc-bind-addr",
      "0.0.0.0:4001",
      "--mysql-addr",
      "0.0.0.0:4002",
      "--postgres-addr",
      "0.0.0.0:4003"
     ],
     "env": {}
    },
    {
     "type": "source",
     "command": "cargo",
     "args": [
      "run",
      "--",
      "standalone",
      "start"
     ],
     "env": {}
    }
   ],
   "variables": {
    "http-addr": {
     "description": "HTTP address to bind to",
     "required": true,
     "example": "0.0.0.0:4000"
    },
    "rpc-bind-addr": {
     "description": "RPC address to bind to",
     "required": true,
     "example": "0.0.0.0:4001"
    },
    "mysql-addr": {
     "description": "MySQL protocol address to bind to",
     "required": true,
     "example": "0.0.0.0:4002"
    },
    "postgres-addr": {
     "description": "PostgreSQL protocol address to bind to",
     "required": true,
     "example": "0.0.0.0:4003"
    }
   }
  },
  "chroma-mcp": {
   "displayName": "Chroma MCP Server",
   "description": "Embeddings, vector search, document storage, and full-text search with the open-source AI application database",
   "categories": [
    "Databases"
   ],
   "tags": [
    "vector database",
    "embeddings",
    "LLM",
    "retrieval",
    "MCP"
   ],
   "repository": "https://github.com/chroma-core/chroma-mcp",
   "homepage": "https://www.trychroma.com/",
   "official": true,
   "methods": [
    {
     "type": "uvx",
     "command": "uvx",
     "args": [
      "chroma-mcp"
     ],
     "env": {}
    }
   ],
   "variables": {
    "client-type": {
     "description": "Type of client to use (ephemeral, persistent, http, cloud)",
     "required": false,
     "example": "persistent"
    },
    "data-dir": {
     "description": "Directory to store data for persistent client",
     "required": false,
     "example": "/full/path/to/your/data/directory"
    },
    "host": {
     "description": "Host for HTTP client",
     "required": false,
     "example": "your-host"
    },
    "port": {
     "description": "Port for HTTP client",
     "required": false,
     "example": "your-port"
    },
    "tenant": {
     "description": "Tenant ID for cloud client",
     "required": false,
     "example": "your-tenant-id"
    },
    "database": {
     "description": "Database name for cloud client",
     "required": false,
     "example": "your-database-name"
    },
    "api-key": {
     "description": "API key for cloud client",
     "required": false,
     "example": "your-api-key"
    },
    "custom-auth-credentials": {
     "description": "Custom authentication credentials for HTTP client",
     "required": false,
     "example": "your-custom-auth-credentials"
    },
    "ssl": {
     "description": "Whether to use SSL for HTTP client",
     "required": false,
     "example": "true"
    },
    "dotenv-path": {
     "description": "Path to .env file",
     "required": false,
     "example": "/custom/path/.env"
    }
   }
  },
  "xmind": {
   "displayName": "XMind",
   "description": "Read and search through your XMind directory containing XMind files.",
   "categories": [
    "Knowledge Base"
   ],
   "tags": [
    "XMind",
    "Mind Mapping",
    "Analysis",
    "Productivity"
   ],
   "repository": "https://github.com/apeyroux/mcp-xmind",
   "homepage": "https://github.com/apeyroux/mcp-xmind",
   "official": false,
   "methods": [
    {
     "type": "npm",
     "command": "npx",
     "args": [
      "-y",
      "@41px/mcp-xmind",
      "${USER_XMIND_DIRECTORY}"
     ],
     "env": {}
    }
   ],
   "variables": {
    "USER_XMIND_DIRECTORY": {
     "description": "The path to the directory containing XMind files that should be processed by the server.",
     "required": true,
     "example": "/Users/alex/XMind"
    }
   }
  },
  "search1api-mcp": {
   "displayName": "Search1API MCP Server",
   "description": "A Model Context Protocol (MCP) server that provides search and crawl functionality using Search1API.",
   "categories": [
    "Web Services"
   ],
   "tags": [
    "search",
    "web",
    "news",
    "crawl",
    "sitemap",
    "reasoning"
   ],
   "repository": "https://github.com/fatwang2/search1api-mcp",
   "homepage": "https://www.search1api.com/?utm_source=mcp",
   "official": true,
   "methods": [
    {
     "type": "npm",
     "command": "npx",
     "args": [
      "-y",
      "search1api-mcp"
     ],
     "env": {
      "SEARCH1API_KEY": "YOUR_SEARCH1API_KEY"
     }
    }
   ],
   "variables": {
    "SEARCH1API_KEY": {
     "description": "Your Search1API API key",
     "required": true,
     "example": "your_api_key_here"
    }
   }
  },
  "influxdb": {
   "displayName": "InfluxDB",
   "description": "Run queries against InfluxDB OSS API v2.",
   "categories": [
    "Databases"
   ],
   "tags": [
    "InfluxDB",
    "API",
    "server",
    "time-series"
   ],
   "repository": "https://github.com/idoru/influxdb-mcp-server",
   "homepage": "https://github.com/idoru/influxdb-mcp-server",
   "official": false,
   "methods": [
    {
     "type": "npm",
     "command": "npx",
     "args": [
      "${INFLUXDB_TOKEN}",
      "${INFLUXDB_URL}",
      "${INFLUXDB_ORG}"
     ],
     "env": {
      "INFLUXDB_TOKEN": "your_token",
      "INFLUXDB_URL": "http://localhost:8086",
      "INFLUXDB_ORG": "your_org"
     }
    }
   ],
   "variables": {
    "INFLUXDB_TOKEN": {
     "description": "Authentication token for the InfluxDB API",
     "required": true,
     "example": "your_token"
    },
    "INFLUXDB_URL": {
     "description": "URL of the InfluxDB instance",
     "required": false,
     "example": "http://localhost:8086"
    },
    "INFLUXDB_ORG": {
     "description": "Default organization name for certain operations",
     "required": false,
     "example": "your_org"
    }
   }
  },
  "mssql": {
   "displayName": "MSSQL",
   "description": "MCP Server for MSSQL database in Python",
   "categories": [
    "Databases"
   ],
   "tags": [
    "MSSQL",
    "AI",
    "Database Access"
   ],
   "repository": "https://github.com/JexinSam/mssql_mcp_server",
   "homepage": "https://github.com/JexinSam/mssql_mcp_server",
   "official": false,
   "methods": [
    {
     "type": "uvx",
     "command": "uvx",
     "args": [
      "mssql_mcp_server"
     ],
     "env": {
      "MSSQL_DRIVER": null,
      "MSSQL_HOST": null,
      "MSSQL_USER": null,
      "MSSQL_PASSWORD": null,
      "MSSQL_DATABASE": null
     }
    }
   ],
   "variables": {
    "MSSQL_DRIVER": {
     "description": "Environment variable that specifies the driver to connect to the MSSQL database.",
     "required": true,
     "example": "mssql_driver"
    },
    "MSSQL_HOST": {
     "description": "Environment variable that specifies the hostname or IP address of the MSSQL server.",
     "required": true,
     "example": "localhost"
    },
    "MSSQL_USER": {
     "description": "Environment variable that defines the username for connecting to the MSSQL database.",
     "required": true,
     "example": "your_username"
    },
    "MSSQL_PASSWORD": {
     "description": "Environment variable that stores the password for the MSSQL user.",
     "required": true,
     "example": "your_password"
    },
    "MSSQL_DATABASE": {
     "description": "Environment variable that specifies the name of the MSSQL database to connect to.",
     "required": true,
     "example": "your_database"
    }
   }
  },
  "n8n": {
   "displayName": "n8n",
   "description": "This MCP server provides tools and resources for AI assistants to manage n8n workflows and executions, including listing, creating, updating, and deleting workflows, as well as monitoring their execution status.",
   "categories": [
    "Dev Tools"
   ],
   "tags": [
    "n8n",
    "server",
    "AI"
   ],
   "repository": "https://github.com/leonardsellem/n8n-mcp-server",
   "homepage": "https://github.com/leonardsellem/n8n-mcp-server",
   "official": false,
   "methods": [
    {
     "type": "npm",
     "command": "npx",
     "args": [
      "-y",
      "@anaisbetts/mcp-installer"
     ],
     "env": {
      "N8N_API_URL": null,
      "N8N_API_KEY": null
     }
    }
   ],
   "variables": {
    "N8N_API_URL": {
     "description": "URL of the n8n API",
     "required": true,
     "example": "http://localhost:5678/api/v1"
    },
    "N8N_API_KEY": {
     "description": "API key for authenticating with n8n",
     "required": true,
     "example": "n8n_api_..."
    }
   }
  },
  "bing-web-search-api": {
   "displayName": "Bing Search API",
   "description": "Server implementation for Microsoft Bing Web Search API.",
   "categories": [
    "Web Services"
   ],
   "tags": [
    "Bing",
    "Search",
    "Web",
    "News",
    "Images"
   ],
   "repository": "https://github.com/leehanchung/bing-search-mcp",
   "homepage": "https://github.com/leehanchung/bing-search-mcp",
   "official": false,
   "methods": [
    {
     "type": "uvx",
     "command": "uvx",
     "args": [
      "--from",
      "git+http://github.com/leehanchung/bing-search-mcp",
      "mcp-server-bing"
     ],
     "env": {
      "BING_API_KEY": null
     }
    }
   ],
   "variables": {
    "BING_API_KEY": {
     "description": "API key required for authenticating requests to the Microsoft Bing Search API.",
     "required": true,
     "example": "your-bing-api-key"
    }
   }
  },
  "image-generation": {
   "displayName": "Image Generation",
   "description": "This MCP server provides image generation capabilities using the Replicate Flux model.",
   "categories": [
    "Media Creation"
   ],
   "tags": [
    "image",
    "generation",
    "flux",
    "Replicate"
   ],
   "repository": "https://github.com/GongRzhe/Image-Generation-MCP-Server",
   "homepage": "https://github.com/GongRzhe/Image-Generation-MCP-Server",
   "official": false,
   "methods": [
    {
     "type": "npm",
     "command": "npx",
     "args": [
      "@gongrzhe/image-gen-server"
     ],
     "env": {
      "REPLICATE_API_TOKEN": null,
      "MODEL": null,
      "your-replicate-api-token": null,
      "alternative-model-name": null
     }
    }
   ],
   "variables": {
    "REPLICATE_API_TOKEN": {
     "description": "Your Replicate API token for authentication",
     "required": true,
     "example": "your-replicate-api-token"
    },
    "MODEL": {
     "description": "The Replicate model to use for image generation. Defaults to \"black-forest-labs/flux-schnell\"",
     "required": false,
     "example": "alternative-model-name"
    }
   }
  },
  "aws-s3": {
   "displayName": "Sample S3 Model Context Protocol",
   "description": "A sample MCP server for AWS S3 that flexibly fetches objects from S3 such as PDF documents.",
   "categories": [
    "Knowledge Base"
   ],
   "tags": [
    "S3",
    "PDF",
    "aws"
   ],
   "repository": "https://github.com/aws-samples/sample-mcp-server-s3",
   "homepage": "https://github.com/aws-samples/sample-mcp-server-s3",
   "official": false,
   "methods": [
    {
     "type": "uvx",
     "command": "uvx",
     "args": [
      "s3-mcp-server"
     ],
     "env": {}
    }
   ],
   "variables": {}
  },
  "markdownify": {
   "displayName": "Markdownify",
   "description": "MCP to convert almost anything to Markdown (PPTX, HTML, PDF, Youtube Transcripts and more)",
   "categories": [
    "Media Creation"
   ],
   "tags": [
    "markdown",
    "conversion"
   ],
   "repository": "https://github.com/zcaceres/mcp-markdownify-server",
   "homepage": "https://github.com/zcaceres/mcp-markdownify-server",
   "official": false,
   "methods": [
    {
     "type": "npm",
     "command": "npx",
     "args": [
      "-y",
      "https://github.com/zcaceres/mcp-markdownify-server"
     ],
     "env": {
      "UV_PATH": null
     }
    }
   ],
   "variables": {
    "UV_PATH": {
     "description": "Environment variable specifying the installation location of the `uv` dependency.",
     "required": false,
     "example": "/path/to/uv"
    }
   }
  },
  "openapi-schema": {
   "displayName": "OpenAPI Schema Model Context Protocol",
   "description": "Allow LLMs to explore large [OpenAPI](https://www.openapis.org/) schemas without bloating the context.",
   "categories": [
    "Dev Tools"
   ],
   "tags": [
    "OpenAPI",
    "LLM"
   ],
   "repository": "https://github.com/hannesj/mcp-openapi-schema",
   "homepage": "https://github.com/hannesj/mcp-openapi-schema",
   "official": false,
   "methods": [
    {
     "type": "npm",
     "command": "npx",
     "args": [
      "-y",
      "mcp-openapi-schema",
      "${ABSOLUTE_PATH_TO_OPENAPI_YAML}"
     ],
     "env": {}
    }
   ],
   "variables": {
    "ABSOLUTE_PATH_TO_OPENAPI_YAML": {
     "description": "The absolute path to the OpenAPI YAML file that the MCP server will use to load the schema.",
     "required": true,
     "example": "/absolute/path/to/openapi.yaml"
    }
   }
  },
  "xcodebuild": {
   "displayName": "Xcode Build",
   "description": "🍎 Build iOS Xcode workspace/project and feed back errors to llm.",
   "categories": [
    "Dev Tools"
   ],
   "tags": [
    "xcode",
    "mcpxcodebuild"
   ],
   "repository": "https://github.com/ShenghaiWang/xcodebuild",
   "homepage": "https://github.com/ShenghaiWang/xcodebuild",
   "official": false,
   "methods": [
    {
     "type": "uvx",
     "command": "uvx",
     "args": [
      "mcpxcodebuild"
     ],
     "env": {}
    },
    {
     "type": "python",
     "command": "python",
     "args": [
      "-m",
      "mcpxcodebuild"
     ],
     "env": {}
    }
   ],
   "variables": {}
  },
  "azure-adx": {
   "displayName": "Azure Data Explorer",
   "description": "Query and analyze Azure Data Explorer databases.",
   "categories": [
    "Databases"
   ],
   "tags": [
    "Azure",
    "KQL",
    "Data Explorer"
   ],
   "repository": "https://github.com/pab1it0/adx-mcp-server",
   "homepage": "https://github.com/pab1it0/adx-mcp-server",
   "official": false,
   "methods": [
    {
     "type": "uvx",
     "command": "uvx",
     "args": [
      "--from",
      "git+https://github.com/pab1it0/adx-mcp-server",
      "adx-mcp-server"
     ],
     "env": {
      "ADX_CLUSTER_URL": null,
      "ADX_DATABASE": null
     }
    }
   ],
   "variables": {
    "ADX_CLUSTER_URL": {
     "description": "The URL of the Azure Data Explorer cluster.",
     "required": true,
     "example": "https://yourcluster.region.kusto.windows.net"
    },
    "ADX_DATABASE": {
     "description": "The name of the Azure Data Explorer database to connect to.",
     "required": true,
     "example": "your_database"
    }
   }
  },
  "llm-context": {
   "displayName": "LLM Context",
   "description": "Provides a repo-packing MCP tool with configurable profiles that specify file inclusion/exclusion patterns and optional prompts.",
   "categories": [
    "Dev Tools"
   ],
   "tags": [
    "LLM",
    "Context Injection",
    "Development",
    "ChatGPT",
    "Productivity"
   ],
   "repository": "https://github.com/cyberchitta/llm-context.py",
   "homepage": "https://github.com/cyberchitta/llm-context.py",
   "official": false,
   "methods": [
    {
     "type": "uvx",
     "command": "uvx",
     "args": [
      "--from",
      "llm-context",
      "lc-mcp"
     ],
     "env": {}
    }
   ],
   "variables": {
    "mcp": {
     "description": "Indicates the model context protocol that should be used for communication.",
     "required": true,
     "example": "lc-mcp"
    }
   }
  },
  "gmail-headless": {
   "displayName": "Headless Gmail Server",
   "description": "Remote hostable MCP server that can get and send Gmail messages without local credential or file system setup.",
   "categories": [
    "Messaging"
   ],
   "tags": [
    "Gmail",
    "Headless",
    "Docker",
    "API"
   ],
   "repository": "https://github.com/baryhuang/mcp-headless-gmail",
   "homepage": "https://github.com/baryhuang/mcp-headless-gmail",
   "official": false,
   "methods": [
    {
     "type": "docker",
     "command": "docker",
     "args": [
      "run",
      "-i",
      "--rm",
      "buryhuang/mcp-headless-gmail:latest"
     ],
     "env": {}
    }
   ],
   "variables": {}
  },
  "graphlit-mcp-server": {
   "displayName": "Graphlit MCP Server",
   "description": "The Model Context Protocol (MCP) Server enables integration between MCP clients and the Graphlit service. This document outlines the setup process and provides a basic example of using the client.",
   "categories": [
    "Knowledge Base"
   ],
   "tags": [
    "mcp",
    "graphlit",
    "retrieval",
    "extraction",
    "ingestion",
    "web"
   ],
   "repository": "https://github.com/graphlit/graphlit-mcp-server",
   "homepage": "https://www.graphlit.com/blog/graphlit-mcp-server",
   "official": true,
   "methods": [
    {
     "type": "npx",
     "command": "npx",
     "args": [
      "-y",
      "graphlit-mcp-server"
     ],
     "env": {
      "GRAPHLIT_ORGANIZATION_ID": null,
      "GRAPHLIT_ENVIRONMENT_ID": null,
      "GRAPHLIT_JWT_SECRET": null
     }
    }
   ],
   "variables": {
    "GRAPHLIT_ORGANIZATION_ID": {
     "description": "Your organization ID from Graphlit Platform",
     "required": true,
     "example": "your-organization-id"
    },
    "GRAPHLIT_ENVIRONMENT_ID": {
     "description": "Your environment ID from Graphlit Platform",
     "required": true,
     "example": "your-environment-id"
    },
    "GRAPHLIT_JWT_SECRET": {
     "description": "Your JWT secret for signing the JWT token",
     "required": true,
     "example": "your-jwt-secret"
    }
   }
  },
  "mac-messages-mcp": {
   "displayName": "Mac Messages",
   "description": "An MCP server that securely interfaces with your iMessage database via the Model Context Protocol (MCP), allowing LLMs to query and analyze iMessage conversations. It includes robust phone number validation, attachment processing, contact…",
   "categories": [
    "Messaging"
   ],
   "tags": [
    "python",
    "mac",
    "messages"
   ],
   "repository": "https://github.com/carterlasalle/mac_messages_mcp",
   "homepage": "https://github.com/carterlasalle/mac_messages_mcp",
   "official": false,
   "methods": [
    {
     "type": "uvx",
     "command": "uvx",
     "args": [
      "mac-messages-mcp"
     ],
     "env": {}
    }
   ],
   "variables": {}
  },
  "llamacloud": {
   "displayName": "LlamaCloud",
   "description": "Integrate the data stored in a managed index on [LlamaCloud](https://cloud.llamaindex.ai/)",
   "categories": [
    "Knowledge Base"
   ],
   "tags": [
    "LlamaCloud",
    "TypeScript"
   ],
   "repository": "https://github.com/run-llama/mcp-server-llamacloud",
   "homepage": "https://github.com/run-llama/mcp-server-llamacloud",
   "official": false,
   "methods": [
    {
     "type": "npm",
     "command": "npx",
     "args": [
      "-y",
      "@llamaindex/mcp-server-llamacloud",
      "--index",
      "10k-SEC-Tesla",
      "--description",
      "10k SEC documents from 2023 for Tesla",
      "--index",
      "10k-SEC-Apple",
      "--description",
      "10k SEC documents from 2023 for Apple"
     ],
     "env": {
      "LLAMA_CLOUD_PROJECT_NAME": "<YOUR_PROJECT_NAME>",
      "LLAMA_CLOUD_API_KEY": "<YOUR_API_KEY>"
     }
    }
   ],
   "variables": {
    "LLAMA_CLOUD_PROJECT_NAME": {
     "description": "The name of your LlamaCloud project that you want to use with the transfer tools.",
     "required": true,
     "example": "MyProject"
    },
    "LLAMA_CLOUD_API_KEY": {
     "description": "Your API key for accessing LlamaCloud services, which is necessary for authentication.",
     "required": true,
     "example": "1234567890abcdef"
    }
   }
  },
  "mcp-server-motherduck": {
   "displayName": "MotherDuck MCP Server",
   "description": "Query and analyze data with MotherDuck and local DuckDB",
   "categories": [
    "Databases"
   ],
   "tags": [
    "SQL",
    "DuckDB",
    "MotherDuck",
    "analytics",
    "database"
   ],
   "repository": "https://github.com/motherduckdb/mcp-server-motherduck",
   "homepage": "https://motherduck.com",
   "official": true,
   "methods": [
    {
     "type": "uvx",
     "command": "uvx",
     "args": [
      "mcp-server-motherduck",
      "--db-path",
      "md:",
      "--motherduck-token",
      "${input:motherduck_token}"
     ],
     "env": {}
    }
   ],
   "variables": {
    "db-path": {
     "description": "Path to the database to connect to (md: for MotherDuck, :memory: for in-memory, or path to local file)",
     "required": true,
     "example": "md:"
    },
    "motherduck-token": {
     "description": "MotherDuck access token for authentication",
     "required": true,
     "example": "<YOUR_MOTHERDUCK_TOKEN_HERE>"
    }
   }
  },
  "replicate": {
   "displayName": "Replicate",
   "description": "Search, run and manage machine learning models on Replicate through a simple tool-based interface. Browse models, create predictions, track their status, and handle generated images.",
   "categories": [
    "AI Systems"
   ],
   "tags": [
    "Replicate",
    "API"
   ],
   "repository": "https://github.com/deepfates/mcp-replicate",
   "homepage": "https://github.com/deepfates/mcp-replicate",
   "official": false,
   "methods": [
    {
     "type": "npm",
     "command": "npx",
     "args": [
      "mcp-replicate"
     ],
     "env": {
      "REPLICATE_API_TOKEN": null
     }
    }
   ],
   "variables": {
    "REPLICATE_API_TOKEN": {
     "description": "Your Replicate API token to authenticate requests to the Replicate API. Needed for the server to function and fetch models or execute predi…",
     "required": true,
     "example": "your_token_here"
    }
   }
  },
  "metoro-mcp-server": {
   "displayName": "Metoro MCP Server",
   "description": "This MCP Server allows you to interact with your Kubernetes cluster via the Claude Desktop App!",
   "categories": [
    "MCP Tools"
   ],
   "tags": [
    "kubernetes",
    "observability",
    "eBPF",
    "microservices"
   ],
   "repository": "https://github.com/metoro-io/metoro-mcp-server",
   "homepage": "https://metoro.io/",
   "official": true,
   "methods": [
    {
     "type": "custom",
     "command": "metoro-mcp-server",
     "args": [],
     "env": {
      "METORO_AUTH_TOKEN": "<your auth token>",
      "METORO_API_URL": "https://us-east.metoro.io"
     }
    }
   ],
   "variables": {
    "METORO_AUTH_TOKEN": {
     "description": "Authentication token for Metoro API access",
     "required": true,
     "example": "eyJ…example…"
    },
    "METORO_API_URL": {
     "description": "URL for the Metoro API",
     "required": true,
     "example": "https://us-east.metoro.io"
    }
   }
  },
  "brave-search": {
   "displayName": "Brave Search",
   "description": "Web and local search using Brave's Search API",
   "categories": [
    "Web Services"
   ],
   "tags": [
    "brave",
    "search",
    "web",
    "local"
   ],
   "repository": "https://github.com/modelcontextprotocol/servers",
   "homepage": "https://github.com/modelcontextprotocol/servers/blob/main/src/brave-search",
   "official": true,
   "methods": [
    {
     "type": "npm",
     "command": "npx",
     "args": [
      "-y",
      "@modelcontextprotocol/server-brave-search"
     ],
     "env": {
      "BRAVE_API_KEY": null
     }
    },
    {
     "type": "docker",
     "command": "docker",
     "args": [
      "run",
      "-i",
      "--rm",
      "-e",
      "BRAVE_API_KEY",
      "mcp/brave-search"
     ],
     "env": {
      "BRAVE_API_KEY": null
     }
    }
   ],
   "variables": {
    "BRAVE_API_KEY": {
     "description": "The API key required to authenticate requests to the Brave Search API.",
     "required": true,
     "example": "YOUR_API_KEY_HERE"
    }
   }
  },
  "naver": {
   "displayName": "Naver",
   "description": "This MCP server provides tools to interact with various Naver services, such as searching blogs, news, books, and more.",
   "categories": [
    "Web Services"
   ],
   "tags": [
    "Naver",
    "API",
    "OpenAPI",
    "Search"
   ],
   "repository": "https://github.com/pfldy2850/py-mcp-naver",
   "homepage": "https://github.com/pfldy2850/py-mcp-naver",
   "official": false,
   "methods": [
    {
     "type": "uvx",
     "command": "uvx",
     "args": [
      "--from",
      "git+https://github.com/pfldy2850/py-mcp-naver.git",
      "src/server.py"
     ],
     "env": {
      "NAVER_CLIENT_ID": null,
      "NAVER_CLIENT_SECRET": null
     }
    }
   ],
   "variables": {
    "NAVER_CLIENT_ID": {
     "description": "The Client ID for accessing the Naver Open API, obtained from the Naver developer portal.",
     "required": true,
     "example": "your_naver_client_id"
    },
    "NAVER_CLIENT_SECRET": {
     "description": "The Client Secret for accessing the Naver Open API, obtained from the Naver developer portal.",
     "required": true,
     "example": "your_naver_client_secret"
    }
   }
  },
  "forevervm": {
   "displayName": "ForeverVM MCP Server",
   "description": "data-color-mode=\"auto\" data-light-theme=\"light\" data-dark-theme=\"dark\"",
   "categories": [
    "System Tools"
   ],
   "tags": [
    "python",
    "repl",
    "claude"
   ],
   "repository": "https://github.com/jamsocket/forevervm",
   "homepage": "https://forevervm.com/docs/guides/forevervm-mcp-server/",
   "official": true,
   "methods": [
    {
     "type": "cli",
     "command": "npx",
     "args": [
      "forevervm-mcp",
      "install",
      "--client",
      "${client}"
     ],
     "env": {}
    }
   ],
   "variables": {
    "client": {
     "description": "Client to use",
     "required": true,
     "example": "claude"
    }
   }
  },
  "kibela": {
   "displayName": "Kibela",
   "description": "Interact with Kibela API.",
   "categories": [
    "Knowledge Base"
   ],
   "tags": [
    "Kibela",
    "Integration"
   ],
   "repository": "https://github.com/kiwamizamurai/mcp-kibela-server",
   "homepage": "https://github.com/kiwamizamurai/mcp-kibela-server",
   "official": false,
   "methods": [
    {
     "type": "npm",
     "command": "npx",
     "args": [
      "-y",
      "https://github.com/kiwamizamurai/mcp-kibela-server"
     ],
     "env": {
      "KIBELA_TEAM": null,
      "KIBELA_TOKEN": null
     }
    }
   ],
   "variables": {
    "KIBELA_TEAM": {
     "description": "Your Kibela team name",
     "required": true,
     "example": "your-team"
    },
    "KIBELA_TOKEN": {
     "description": "Your Kibela API token",
     "required": true,
     "example": "your-token"
    }
   }
  },
  "whale-tracker-mcp": {
   "displayName": "Whale Tracker",
   "description": "A mcp server for tracking cryptocurrency whale transactions.",
   "categories": [
    "Finance"
   ],
   "tags": [
    "whale tracker",
    "cryptocurrency",
    "API"
   ],
   "repository": "https://github.com/kukapay/whale-tracker-mcp",
   "homepage": "https://github.com/kukapay/whale-tracker-mcp",
   "official": false,
   "methods": [
    {
     "type": "uvx",
     "command": "uvx",
     "args": [
      "--from",
      "git+https://github.com/kukapay/whale-tracker-mcp",
      "whale-tracker-mcp"
     ],
     "env": {
      "WHALE_TRACKER_API_KEY": "your_api_key_here"
     }
    }
   ],
   "variables": {
    "WHALE_TRACKER_API_KEY": {
     "description": "Environment variable to load the Whale Alert API key for the server.",
     "required": true,
     "example": "your_api_key_here"
    }
   }
  },
  "flightradar24": {
   "displayName": "Flightradar24",
   "description": "A Claude Desktop MCP server that helps you track flights in real-time using Flightradar24 data.",
   "categories": [
    "Web Services"
   ],
   "tags": [
    "Flightradar24",
    "Flight Tracking"
   ],
   "repository": "https://github.com/sunsetcoder/flightradar24-mcp-server",
   "homepage": "",
   "official": false,
   "methods": [
    {
     "type": "npm",
     "command": "npx",
     "args": [
      "-y",
      "https://github.com/sunsetcoder/flightradar24-mcp-server"
     ],
     "env": {
      "FR24_API_KEY": null,
      "FR24_API_URL": null
     }
    }
   ],
   "variables": {
    "FR24_API_KEY": {
     "description": "Flightradar24 API key required for accessing flight data from the Flightradar24 API.",
     "required": true,
     "example": "your_actual_api_key_here"
    },
    "FR24_API_URL": {
     "description": "The base URL for calling the Flightradar24 API for fetching real-time flight data.",
     "required": false,
     "example": "https://fr24api.flightradar24.com"
    }
   }
  },
  "fantasy-pl": {
   "displayName": "Fantasy Premier League",
   "description": "Give your coding agent direct access to up-to date Fantasy Premier League data",
   "categories": [
    "Analytics"
   ],
   "tags": [
    "FPL",
    "fantasy",
    "football"
   ],
   "repository": "https://github.com/rishijatia/fantasy-pl-mcp",
   "homepage": "https://github.com/rishijatia/fantasy-pl-mcp",
   "official": false,
   "methods": [
    {
     "type": "uvx",
     "command": "uvx",
     "args": [
      "fpl-mcp"
     ],
     "env": {}
    }
   ],
   "variables": {}
  },
  "claudepost": {
   "displayName": "Claude Post Email Management",
   "description": "ClaudePost enables seamless email management for Gmail, offering secure features like email search, reading, and sending.",
   "categories": [
    "Messaging"
   ],
   "tags": [
    "Email Management",
    "Natural Language Processing"
   ],
   "repository": "https://github.com/ZilongXue/claude-post",
   "homepage": "https://github.com/ZilongXue/claude-post",
   "official": false,
   "methods": [
    {
     "type": "uvx",
     "command": "uvx",
     "args": [
      "--from",
      "git+https://github.com/ZilongXue/claude-post",
      "email-client"
     ],
     "env": {}
    }
   ],
   "variables": {}
  },
  "quickchart": {
   "displayName": "Quickchart",
   "description": "A Model Context Protocol server for generating charts using QuickChart.io",
   "categories": [
    "Media Creation"
   ],
   "tags": [
    "quickchart",
    "chart generation",
    "data visualization"
   ],
   "repository": "https://github.com/GongRzhe/Quickchart-MCP-Server",
   "homepage": "https://github.com/GongRzhe/Quickchart-MCP-Server",
   "official": false,
   "methods": [
    {
     "type": "npm",
     "command": "npx",
     "args": [
      "-y",
      "@gongrzhe/quickchart-mcp-server"
     ],
     "env": {}
    }
   ],
   "variables": {
    "client": {
     "description": "Specifies the client type for which the QuickChart Server is installed. In this case, it's for Claude.",
     "required": true,
     "example": "claude"
    }
   }
  },
  "mcp-grafana": {
   "displayName": "Grafana MCP Server",
   "description": "A [Model Context Protocol][mcp] (MCP) server for Grafana.",
   "categories": [
    "Analytics"
   ],
   "tags": [
    "grafana",
    "mcp",
    "model context protocol"
   ],
   "repository": "https://github.com/grafana/mcp-grafana",
   "homepage": "https://github.com/grafana/mcp-grafana",
   "official": true,
   "methods": [
    {
     "type": "custom",
     "command": "go",
     "args": [
      "install",
      "github.com/grafana/mcp-grafana/cmd/mcp-grafana@latest"
     ],
     "env": {
      "GOBIN": "$HOME/go/bin"
     }
    }
   ],
   "variables": {
    "GRAFANA_URL": {
     "description": "URL of your Grafana instance",
     "required": true,
     "example": "http://localhost:3000"
    },
    "GRAFANA_API_KEY": {
     "description": "Service account token for Grafana authentication",
     "required": true,
     "example": "<your service account token>"
    }
   }
  },
  "puppeteer": {
   "displayName": "Puppeteer Browser Automation",
   "description": "Browser automation and web scraping",
   "categories": [
    "Web Services"
   ],
   "tags": [
    "puppeteer",
    "automation",
    "javascript",
    "screenshots",
    "web"
   ],
   "repository": "https://github.com/modelcontextprotocol/servers",
   "homepage": "https://github.com/modelcontextprotocol/servers/blob/main/src/puppeteer",
   "official": true,
   "methods": [
    {
     "type": "npm",
     "command": "npx",
     "args": [
      "-y",
      "@modelcontextprotocol/server-puppeteer"
     ],
     "env": {}
    },
    {
     "type": "docker",
     "command": "docker",
     "args": [
      "run",
      "-i",
      "--rm",
      "--init",
      "-e",
      "DOCKER_CONTAINER=true",
      "mcp/puppeteer"
     ],
     "env": {}
    }
   ],
   "variables": {}
  },
  "sqlite": {
   "displayName": "SQLite",
   "description": "Database interaction and business intelligence capabilities",
   "categories": [
    "Databases"
   ],
   "tags": [
    "sqlite",
    "database",
    "business insights"
   ],
   "repository": "https://github.com/modelcontextprotocol/servers",
   "homepage": "https://github.com/modelcontextprotocol/servers/blob/main/src/sqlite",
   "official": true,
   "methods": [
    {
     "type": "docker",
     "command": "docker",
     "args": [
      "run",
      "--rm",
      "-i",
      "-v",
      "mcp-test:/mcp",
      "mcp/sqlite",
      "--db-path",
      "/mcp/test.db"
     ],
     "env": {}
    }
   ],
   "variables": {}
  },
  "dbhub": {
   "displayName": "DBHub - Universal Database Gateway",
   "description": "Universal database MCP server connecting to MySQL, PostgreSQL, SQLite, DuckDB and etc.",
   "categories": [
    "Databases"
   ],
   "tags": [
    "Database Gateway",
    "PostgreSQL",
    "MySQL",
    "SQL Server",
    "SQLite"
   ],
   "repository": "https://github.com/bytebase/dbhub",
   "homepage": "https://github.com/bytebase/dbhub/",
   "official": false,
   "methods": [
    {
     "type": "docker",
     "command": "docker",
     "args": [
      "run",
      "-i",
      "--rm",
      "bytebase/dbhub",
      "--transport",
      "stdio",
      "--dsn",
      "${DATABASE_URL}"
     ],
     "env": {}
    },
    {
     "type": "npx",
     "command": "npx",
     "args": [
      "-y",
      "@bytebase/dbhub",
      "--transport",
      "stdio",
      "--dsn",
      "${DATABASE_URL}"
     ],
     "env": {}
    }
   ],
   "variables": {
    "DATABASE_URL": {
     "description": "The database connection string which includes the user, password, host, port, and database name.",
     "required": true,
     "example": "postgres://user:password@localhost:5432/dbname?sslmode=disable"
    }
   }
  },
  "obsidian-mcp": {
   "displayName": "Obsidian",
   "description": "(by Steven Stavrakis) An MCP server for Obsidian.md with tools for searching, reading, writing, and organizing notes.",
   "categories": [
    "Knowledge Base"
   ],
   "tags": [
    "Obsidian",
    "AI",
    "Notes",
    "Productivity"
   ],
   "repository": "https://github.com/StevenStavrakis/obsidian-mcp",
   "homepage": "https://github.com/StevenStavrakis/obsidian-mcp",
   "official": false,
   "methods": [
    {
     "type": "npm",
     "command": "npx",
     "args": [
      "-y",
      "obsidian-mcp",
      "${OBSIDIAN_VAULT_PATH}",
      "${OBSIDIAN_VAULT_PATH2}"
     ],
     "env": {}
    }
   ],
   "variables": {
    "OBSIDIAN_VAULT_PATH": {
     "description": "Path to your Obsidian vault",
     "required": true,
     "example": ""
    },
    "OBSIDIAN_VAULT_PATH2": {
     "description": "Path to your second Obsidian vault",
     "required": false,
     "example": ""
    }
   }
  },
  "mcp-server-qdrant": {
   "displayName": "Qdrant MCP Server",
   "description": "This repository is an example of how to create a MCP server for Qdrant, a vector search engine.",
   "categories": [
    "Databases"
   ],
   "tags": [
    "vector-search",
    "qdrant",
    "memory",
    "semantic-search"
   ],
   "repository": "https://github.com/qdrant/mcp-server-qdrant",
   "homepage": "https://github.com/qdrant/mcp-server-qdrant/",
   "official": true,
   "methods": [
    {
     "type": "uvx",
     "command": "uvx",
     "args": [
      "mcp-server-qdrant"
     ],
     "env": {
      "QDRANT_URL": "http://localhost:6333",
      "QDRANT_API_KEY": "your_api_key",
      "COLLECTION_NAME": "my-collection",
      "EMBEDDING_MODEL": "sentence-transformers/all-MiniLM-L6-v2"
     }
    }
   ],
   "variables": {
    "QDRANT_URL": {
     "description": "URL of the Qdrant server",
     "required": false,
     "example": "http://localhost:6333"
    },
    "QDRANT_API_KEY": {
     "description": "API key for the Qdrant server",
     "required": false,
     "example": "your-api-key"
    },
    "COLLECTION_NAME": {
     "description": "Name of the collection to use",
     "required": true,
     "example": "my-collection"
    },
    "QDRANT_LOCAL_PATH": {
     "description": "Path to the local Qdrant database (alternative to QDRANT_URL)",
     "required": false,
     "example": "/path/to/qdrant/database"
    },
    "EMBEDDING_PROVIDER": {
     "description": "Embedding provider to use (currently only \"fastembed\" is supported)",
     "required": false,
     "example": "fastembed"
    },
    "EMBEDDING_MODEL": {
     "description": "Name of the embedding model to use",
     "required": false,
     "example": "sentence-transformers/all-MiniLM-L6-v2"
    },
    "TOOL_STORE_DESCRIPTION": {
     "description": "Custom description for the store tool",
     "required": false,
     "example": "Store reusable code snippets for later retrieval."
    },
    "TOOL_FIND_DESCRIPTION": {
     "description": "Custom description for the find tool",
     "required": false,
     "example": "Search for relevant code snippets based on natural language descriptions."
    }
   }
  },
  "scholarly": {
   "displayName": "scholarly",
   "description": "A MCP server to search for scholarly and academic articles.",
   "categories": [
    "Knowledge Base"
   ],
   "tags": [
    "scholarly",
    "academic"
   ],
   "repository": "https://github.com/adityak74/mcp-scholarly",
   "homepage": "https://github.com/adityak74/mcp-scholarly",
   "official": false,
   "methods": [
    {
     "type": "uvx",
     "command": "uvx",
     "args": [
      "mcp-scholarly"
     ],
     "env": {}
    },
    {
     "type": "docker",
     "command": "docker",
     "args": [
      "run",
      "--rm",
      "-i",
      "mcp/scholarly"
     ],
     "env": {}
    }
   ],
   "variables": {
    "keyword": {
     "description": "The keyword to search for articles in arXiv.",
     "required": true,
     "example": "machine learning"
    }
   }
  },
  "fingertip": {
   "displayName": "Fingertip",
   "description": "MCP server for Fingertip.com to search and create new sites.",
   "categories": [
    "Web Services"
   ],
   "tags": [
    "Fingertip",
    "AI Assistants"
   ],
   "repository": "https://github.com/fingertip-com/fingertip-mcp",
   "homepage": "https://github.com/fingertip-com/fingertip-mcp",
   "official": false,
   "methods": [
    {
     "type": "npm",
     "command": "npx",
     "args": [
      "-y",
      "@fingertip/mcp"
     ],
     "env": {}
    }
   ],
   "variables": {}
  },
  "mcp-server-esignatures": {
   "displayName": "eSignatures MCP server",
   "description": "MCP server for eSignatures (https://esignatures.com)",
   "categories": [
    "Productivity"
   ],
   "tags": [
    "contracts",
    "templates",
    "collaborators",
    "esignatures"
   ],
   "repository": "https://github.com/esignaturescom/mcp-server-esignatures",
   "homepage": "https://esignatures.com",
   "official": true,
   "methods": [
    {
     "type": "uvx",
     "command": "uvx",
     "args": [
      "mcp-server-esignatures"
     ],
     "env": {
      "ESIGNATURES_SECRET_TOKEN": "your-esignatures-api-secret-token"
     }
    }
   ],
   "variables": {
    "ESIGNATURES_SECRET_TOKEN": {
     "description": "Your eSignatures API secret token",
     "required": true,
     "example": "your-esignatures-api-secret-token"
    }
   }
  },
  "keboola-mcp-server": {
   "displayName": "Keboola MCP Server",
   "description": "<a href=\"https://glama.ai/mcp/servers/72mwt1x862\"><img width=\"380\" height=\"200\" src=\"https://glama.ai/mcp/servers/72mwt1x862/badge\" alt=\"Keboola Explorer Server MCP server\" /></a>",
   "categories": [
    "Analytics"
   ],
   "tags": [
    "keboola",
    "data",
    "storage",
    "snowflake"
   ],
   "repository": "https://github.com/keboola/keboola-mcp-server",
   "homepage": "https://github.com/keboola/keboola-mcp-server",
   "official": true,
   "methods": [
    {
     "type": "uvx",
     "command": "uvx",
     "args": [
      "--from",
      "git+https://github.com/keboola/keboola-mcp-server.git",
      "keboola-mcp",
      "--api-url",
      "${api-url}"
     ],
     "env": {
      "KBC_STORAGE_TOKEN": "your-keboola-storage-token",
      "KBC_WORKSPACE_USER": "your-workspace-user"
     }
    }
   ],
   "variables": {
    "api-url": {
     "description": "Keboola Connection API URL",
     "required": true,
     "example": "https://connection.YOUR_REGION.keboola.com"
    },
    "KBC_STORAGE_TOKEN": {
     "description": "Keboola Storage API token",
     "required": true,
     "example": "your-keboola-storage-token"
    },
    "KBC_WORKSPACE_USER": {
     "description": "Snowflake workspace username",
     "required": true,
     "example": "your-workspace-user"
    }
   }
  },
  "anki": {
   "displayName": "Anki",
   "description": "An MCP server for interacting with your [Anki](https://apps.ankiweb.net/) decks and cards.",
   "categories": [
    "Knowledge Base"
   ],
   "tags": [
    "Anki",
    "Cards",
    "Review"
   ],
   "repository": "https://github.com/scorzeth/anki-mcp-server",
   "homepage": "https://github.com/scorzeth/anki-mcp-server",
   "official": false,
   "methods": [
    {
     "type": "npm",
     "command": "npx",
     "args": [
      "-y",
      "https://github.com/scorzeth/anki-mcp-server"
     ],
     "env": {}
    }
   ],
   "variables": {}
  },
  "obsidian-markdown-notes": {
   "displayName": "Obsidian Markdown Notes",
   "description": "Read and search through your Obsidian vault or any directory containing Markdown notes",
   "categories": [
    "Knowledge Base"
   ],
   "tags": [
    "obsidian"
   ],
   "repository": "https://github.com/calclavia/mcp-obsidian",
   "homepage": "https://github.com/calclavia/mcp-obsidian",
   "official": false,
   "methods": [
    {
     "type": "npm",
     "command": "npx",
     "args": [
      "-y",
      "https://github.com/calclavia/mcp-obsidian.git",
      "${OBSIDIAN_VAULT_PATH}"
     ],
     "env": {}
    }
   ],
   "variables": {
    "OBSIDIAN_VAULT_PATH": {
     "description": "Path to your Obsidian vault",
     "required": true,
     "example": ""
    }
   }
  },
  "fireproof-mcp": {
   "displayName": "Model Context Protocol and Fireproof Demo: JSON Document Server",
   "description": "Immutable ledger database with live synchronization",
   "categories": [
    "Databases"
   ],
   "tags": [
    "fireproof",
    "database",
    "MCP",
    "Model Context Protocol",
    "JSON",
    "document store"
   ],
   "repository": "https://github.com/fireproof-storage/mcp-database-server",
   "homepage": "https://github.com/fireproof-storage/mcp-database-server",
   "official": true,
   "methods": [
    {
     "type": "custom",
     "command": "node",
     "args": [
      "/path/to/fireproof-mcp/build/index.js"
     ],
     "env": {}
    }
   ],
   "variables": {}
  },
  "lingo-dev": {
   "displayName": "Lingo.dev MCP Server",
   "description": "The [Model Context Protocol](https://modelcontextprotocol.io/introduction) (MCP) is a standard for connecting Large Language Models (LLMs) to external services. This guide will walk you through how to connect AI tools to Lingo.dev using MC…",
   "categories": [
    "Dev Tools"
   ],
   "tags": [
    "translation",
    "localization",
    "mcp"
   ],
   "repository": "https://github.com/lingodotdev/lingo.dev",
   "homepage": "https://lingo.dev",
   "official": true,
   "methods": [
    {
     "type": "npm",
     "command": "npx",
     "args": [
      "-y",
      "lingo.dev",
      "mcp",
      "${api-key}"
     ],
     "env": {}
    }
   ],
   "variables": {
    "api-key": {
     "description": "Your Lingo.dev project API key",
     "required": true,
     "example": "<api-key>"
    }
   }
  },
  "veyrax-mcp": {
   "displayName": "VeyraX MCP",
   "description": "Single tool to control all 100+ API integrations, and UI components",
   "categories": [
    "MCP Tools"
   ],
   "tags": [
    "MCP",
    "Model Context Protocol",
    "AI tools",
    "LLM integration"
   ],
   "repository": "https://github.com/VeyraX/veyrax-mcp",
   "homepage": "https://www.veyrax.com",
   "official": true,
   "methods": [
    {
     "type": "custom",
     "command": "node",
     "args": [
      "path/to/veyrax-mcp/build/src/index.js",
      "--config",
      "\"{\\\"VEYRAX_API_KEY\\\":\\\"${VEYRAX_API_KEY}\\\"}\""
     ],
     "env": {}
    }
   ],
   "variables": {
    "VEYRAX_API_KEY": {
     "description": "Your VeyraX API key found in your account settings",
     "required": true,
     "example": ""
    }
   }
  },
  "mcp-server-neon": {
   "displayName": "Neon MCP Server",
   "description": "This lets you use Claude Desktop, or any MCP Client, to use natural language to accomplish things with Neon.",
   "categories": [
    "Databases"
   ],
   "tags": [
    "database",
    "postgres",
    "neon",
    "mcp",
    "llm"
   ],
   "repository": "https://github.com/neondatabase/mcp-server-neon",
   "homepage": "https://neon.tech",
   "official": true,
   "methods": [
    {
     "type": "cli",
     "command": "npx",
     "args": [
      "@neondatabase/mcp-server-neon",
      "init",
      "$NEON_API_KEY"
     ],
     "env": {}
    }
   ],
   "variables": {
    "NEON_API_KEY": {
     "description": "Neon API key - you can generate one through the Neon console",
     "required": true,
     "example": ""
    }
   }
  },
  "video-editor": {
   "displayName": "Video Editor",
   "description": "A Model Context Protocol Server to add, edit, and search videos with [Video Jungle](https://www.video-jungle.com/).",
   "categories": [
    "Media Creation"
   ],
   "tags": [
    "video",
    "editing",
    "API"
   ],
   "repository": "https://github.com/burningion/video-editing-mcp",
   "homepage": "https://github.com/burningion/video-editing-mcp",
   "official": false,
   "methods": [
    {
     "type": "uvx",
     "command": "uvx",
     "args": [
      "--from",
      "git+https://github.com/burningion/video-editing-mcp",
      "video-editor-mcp",
      "${YOURAPIKEY}"
     ],
     "env": {}
    }
   ],
   "variables": {
    "YOURAPIKEY": {
     "description": "API key required to authenticate and communicate with Video Jungle services.",
     "required": true,
     "example": "YOURAPIKEY"
    }
   }
  },
  "mongodb": {
   "displayName": "MongoDB",
   "description": "A Model Context Protocol Server for MongoDB.",
   "categories": [
    "Databases"
   ],
   "tags": [
    "MongoDB",
    "LLM"
   ],
   "repository": "https://github.com/kiliczsh/mcp-mongo-server",
   "homepage": "https://github.com/kiliczsh/mcp-mongo-server",
   "official": false,
   "methods": [
    {
     "type": "npm",
     "command": "npx",
     "args": [
      "-y",
      "mcp-mongo-server",
      "${MONGODB_URI}"
     ],
     "env": {}
    }
   ],
   "variables": {
    "MONGODB_URI": {
     "description": "The connection string for the MongoDB database.",
     "required": true,
     "example": "mongodb://muhammed:kilic@mongodb.localhost/sample_namespace"
    }
   }
  },
  "data-exploration": {
   "displayName": "Data Exploration",
   "description": "MCP server for autonomous data exploration on .csv-based datasets, providing intelligent insights with minimal effort. NOTE: Will execute arbitrary Python code on your machine, please use with caution!",
   "categories": [
    "Analytics"
   ],
   "tags": [
    "data",
    "exploration"
   ],
   "repository": "https://github.com/reading-plus-ai/mcp-server-data-exploration",
   "homepage": "https://github.com/reading-plus-ai/mcp-server-data-exploration",
   "official": false,
   "methods": [
    {
     "type": "uvx",
     "command": "uvx",
     "args": [
      "mcp-server-ds"
     ],
     "env": {}
    }
   ],
   "variables": {}
  },
  "tmdb": {
   "displayName": "TMDB",
   "description": "This MCP server integrates with The Movie Database (TMDB) API to provide movie information, search capabilities, and recommendations.",
   "categories": [
    "Professional Apps"
   ],
   "tags": [
    "tmdb",
    "movies",
    "recommendations"
   ],
   "repository": "https://github.com/Laksh-star/mcp-server-tmdb",
   "homepage": "https://github.com/Laksh-star/mcp-server-tmdb",
   "official": false,
   "methods": [
    {
     "type": "npm",
     "command": "npx",
     "args": [
      "-y",
      "https://github.com/Laksh-star/mcp-server-tmdb"
     ],
     "env": {
      "TMDB_API_KEY": null
     }
    }
   ],
   "variables": {
    "TMDB_API_KEY": {
     "description": "API key used to authenticate requests to the TMDB API.",
     "required": true,
     "example": "your_api_key_here"
    }
   }
  },
  "minima": {
   "displayName": "Minima",
   "description": "MCP server for RAG on local files",
   "categories": [
    "Knowledge Base"
   ],
   "tags": [
    "ChatGPT",
    "Integration",
    "Local",
    "Open Source"
   ],
   "repository": "https://github.com/dmayboroda/minima",
   "homepage": "https://github.com/dmayboroda/minima",
   "official": false,
   "methods": [
    {
     "type": "uvx",
     "command": "uvx",
     "args": [
      "--from",
      "git+https://github.com/dmayboroda/minima.git@main#subdirectory=mcp-server",
      "minima"
     ],
     "env": {}
    }
   ],
   "variables": {
    "LOCAL_FILES_PATH": {
     "description": "Specify the root folder for indexing (on your cloud or local pc). Indexing is a recursive process, meaning all documents within subfolders…",
     "required": true,
     "example": "/Users/davidmayboroda/Downloads/PDFs/"
    },
    "EMBEDDING_MODEL_ID": {
     "description": "Specify the embedding model to use. Currently, only Sentence Transformer models are supported. Testing has been done with sentence-transfor…",
     "required": false,
     "example": "sentence-transformers/all-mpnet-base-v2"
    },
    "EMBEDDING_SIZE": {
     "description": "Define the embedding dimension provided by the model, which is needed to configure Qdrant vector storage. Ensure this value matches the act…",
     "required": false,
     "example": "768"
    },
    "OLLAMA_MODEL": {
     "description": "Set up the Ollama model, use an ID available on the Ollama site. Please, use LLM model here, not an embedding.",
     "required": false,
     "example": "qwen2:0.5b"
    },
    "RERANKER_MODEL": {
     "description": "Specify the reranker model. Currently, we have tested with BAAI rerankers. You can explore all available rerankers using a specific link.",
     "required": false,
     "example": "BAAI/bge-reranker-base"
    },
    "USER_ID": {
     "description": "Just use your email here, this is needed to authenticate custom GPT to search in your data.",
     "required": true,
     "example": "user@gmail.com"
    },
    "PASSWORD": {
     "description": "Put any password here, this is used to create a firebase account for the email specified above.",
     "required": true,
     "example": "password"
    }
   }
  },
  "fastn-ai-unified-api-mcp-server": {
   "displayName": "Fastn AI Unified API",
   "description": "A remote, dynamic MCP server with a unified API that connects to 1,000+ tools, actions, and workflows, featuring built-in authentication and monitoring.",
   "categories": [
    "MCP Tools"
   ],
   "tags": [
    "Fastn",
    "Dynamic Tool Registration",
    "API-Driven Operations"
   ],
   "repository": "https://github.com/fastnai/mcp-fastn",
   "homepage": "https://github.com/fastnai/mcp-fastn",
   "official": false,
   "methods": [
    {
     "type": "uvx",
     "command": "uvx",
     "args": [
      "--from",
      "git+https://github.com/fastnai/mcp-fastn",
      "fastn",
      "--api_key",
      "${YOUR_API_KEY}",
      "--space_id",
      "${YOUR_WORKSPACE_ID}"
     ],
     "env": {}
    }
   ],
   "variables": {
    "YOUR_API_KEY": {
     "description": "The API key is required to authenticate and access the Fastn server's features and services.",
     "required": true,
     "example": "your_actual_api_key_here"
    },
    "YOUR_WORKSPACE_ID": {
     "description": "The unique identifier for your workspace in Fastn, which directs the server to the correct environment and settings.",
     "required": true,
     "example": "your_actual_workspace_id_here"
    }
   }
  },
  "sentry": {
   "displayName": "Sentry",
   "description": "Retrieving and analyzing issues from Sentry.io",
   "categories": [
    "Dev Tools"
   ],
   "tags": [
    "sentry",
    "monitoring",
    "errors",
    "debugging"
   ],
   "repository": "https://github.com/modelcontextprotocol/servers",
   "homepage": "https://github.com/modelcontextprotocol/servers/blob/main/src/sentry",
   "official": true,
   "methods": [
    {
     "type": "uvx",
     "command": "uvx",
     "args": [
      "mcp-server-sentry",
      "--auth-token",
      "${YOUR_SENTRY_TOKEN}"
     ],
     "env": {}
    },
    {
     "type": "docker",
     "command": "docker",
     "args": [
      "run",
      "-i",
      "--rm",
      "mcp/sentry",
      "--auth-token",
      "${YOUR_SENTRY_TOKEN}"
     ],
     "env": {}
    },
    {
     "type": "python",
     "command": "python",
     "args": [
      "-m",
      "mcp_server_sentry",
      "--auth-token",
      "${YOUR_SENTRY_TOKEN}"
     ],
     "env": {}
    }
   ],
   "variables": {
    "YOUR_SENTRY_TOKEN": {
     "description": "An authentication token required to access your Sentry account and retrieve issue details.",
     "required": true,
     "example": "abc123def456"
    }
   }
  },
  "mcp-proxy": {
   "displayName": "MCP Proxy",
   "description": "Connect to MCP servers that run on SSE transport, or expose stdio servers as an SSE server.",
   "categories": [
    "MCP Tools"
   ],
   "tags": [
    "proxy",
    "sse",
    "stdio"
   ],
   "repository": "https://github.com/sparfenyuk/mcp-proxy",
   "homepage": "https://github.com/sparfenyuk/mcp-proxy",
   "official": false,
   "methods": [
    {
     "type": "uvx",
     "command": "uvx",
     "args": [
      "mcp-proxy"
     ],
     "env": {}
    }
   ],
   "variables": {}
  },
  "dataset-viewer": {
   "displayName": "Dataset Viewer",
   "description": "Browse and analyze Hugging Face datasets with features like search, filtering, statistics, and data export",
   "categories": [
    "Analytics"
   ],
   "tags": [
    "Hugging Face",
    "datasets",
    "data analysis"
   ],
   "repository": "https://github.com/privetin/dataset-viewer",
   "homepage": "https://github.com/privetin/dataset-viewer",
   "official": false,
   "methods": [
    {
     "type": "uvx",
     "command": "uvx",
     "args": [
      "--from",
      "git+https://github.com/privetin/dataset-viewer",
      "dataset-viewer"
     ],
     "env": {}
    }
   ],
   "variables": {
    "HUGGINGFACE_TOKEN": {
     "description": "Your Hugging Face API token for accessing private datasets",
     "required": false,
     "example": ""
    }
   }
  },
  "intercom": {
   "displayName": "Intercom Support Server",
   "description": "An MCP-compliant server for retrieving customer support tickets from Intercom. This tool enables AI assistants like Claude Desktop and Cline to access and analyze your Intercom support tickets.",
   "categories": [
    "Messaging"
   ],
   "tags": [
    "Intercom",
    "support-tickets",
    "API"
   ],
   "repository": "https://github.com/raoulbia-ai/mcp-server-for-intercom",
   "homepage": "https://github.com/raoulbia-ai/mcp-server-for-intercom",
   "official": false,
   "methods": [
    {
     "type": "npm",
     "command": "npx",
     "args": [
      "-y",
      "https://github.com/raoulbia-ai/mcp-server-for-intercom"
     ],
     "env": {
      "INTERCOM_ACCESS_TOKEN": "your-intercom-access-token"
     }
    }
   ],
   "variables": {
    "INTERCOM_ACCESS_TOKEN": {
     "description": "Your Intercom API token used to authenticate requests to the Intercom API.",
     "required": true,
     "example": "your_intercom_api_token"
    }
   }
  },
  "xero-mcp-server@john-zhang-dev": {
   "displayName": "Xero",
   "description": "Enabling clients to interact with Xero system for streamlined accounting, invoicing, and business operations.",
   "categories": [
    "Finance"
   ],
   "tags": [],
   "repository": "https://github.com/john-zhang-dev/xero-mcp",
   "homepage": "https://github.com/john-zhang-dev/xero-mcp",
   "official": false,
   "methods": [
    {
     "type": "npm",
     "command": "npx",
     "args": [
      "-y",
      "xero-mcp@latest"
     ],
     "env": {
      "XERO_CLIENT_ID": null,
      "XERO_CLIENT_SECRET": null,
      "XERO_REDIRECT_URI": null
     }
    }
   ],
   "variables": {
    "XERO_CLIENT_ID": {
     "description": "The Client ID obtained from the Xero Developer center after creating an OAuth 2.0 app, required for authentication.",
     "required": true,
     "example": "YOUR_CLIENT_ID"
    },
    "XERO_CLIENT_SECRET": {
     "description": "The Client Secret generated in the Xero Developer center, necessary for authenticating requests.",
     "required": true,
     "example": "YOUR_CLIENT_SECRET"
    },
    "XERO_REDIRECT_URI": {
     "description": "The URI to redirect to after authentication, should typically match the redirect URI specified in the OAuth 2.0 app settings.",
     "required": false,
     "example": "http://localhost:5000/callback"
    }
   }
  },
  "vega-lite": {
   "displayName": "Vega-Lite Data Visualization",
   "description": "Generate visualizations from fetched data using the VegaLite format and renderer.",
   "categories": [
    "Media Creation"
   ],
   "tags": [
    "visualization",
    "data",
    "vega-lite"
   ],
   "repository": "https://github.com/isaacwasserman/mcp-vegalite-server",
   "homepage": "https://github.com/isaacwasserman/mcp-vegalite-server",
   "official": false,
   "methods": [
    {
     "type": "uvx",
     "command": "uvx",
     "args": [
      "--from",
      "git+https://github.com/isaacwasserman/mcp-vegalite-server",
      "mcp_server_vegalite"
     ],
     "env": {}
    }
   ],
   "variables": {}
  },
  "glean": {
   "displayName": "Glean",
   "description": "A server that uses Glean API to search and chat.",
   "categories": [
    "Knowledge Base"
   ],
   "tags": [
    "glean",
    "search",
    "chat",
    "docker"
   ],
   "repository": "https://github.com/longyi1207/glean-mcp-server",
   "homepage": "https://github.com/longyi1207/glean-mcp-server",
   "official": false,
   "methods": [
    {
     "type": "npm",
     "command": "npx",
     "args": [
      "-y",
      "https://github.com/longyi1207/glean-mcp-server"
     ],
     "env": {
      "GLEAN_API_KEY": "YOUR_API_KEY_HERE",
      "GLEAN_DOMAIN": "YOUR_DOMAIN_HERE"
     }
    }
   ],
   "variables": {
    "GLEAN_API_KEY": {
     "description": "The API key required to authenticate with the Glean API.",
     "required": true,
     "example": "YOUR_API_KEY_HERE"
    },
    "GLEAN_DOMAIN": {
     "description": "The domain used for the Glean API service operations.",
     "required": true,
     "example": "YOUR_DOMAIN_HERE"
    }
   }
  },
  "google-drive": {
   "displayName": "Google Drive",
   "description": "File access and search capabilities for Google Drive",
   "categories": [
    "Productivity"
   ],
   "tags": [
    "google drive",
    "files",
    "API"
   ],
   "repository": "https://github.com/modelcontextprotocol/servers",
   "homepage": "https://github.com/modelcontextprotocol/servers/blob/main/src/gdrive",
   "official": true,
   "methods": [
    {
     "type": "npm",
     "command": "npx",
     "args": [
      "-y",
      "@modelcontextprotocol/server-gdrive"
     ],
     "env": {}
    },
    {
     "type": "docker",
     "command": "docker",
     "args": [
      "run",
      "-i",
      "--rm",
      "-v",
      "mcp-gdrive:/gdrive-server",
      "-e",
      "GDRIVE_CREDENTIALS_PATH=/gdrive-server/credentials.json",
      "mcp/gdrive"
     ],
     "env": {}
    }
   ],
   "variables": {}
  },
  "excel": {
   "displayName": "Excel",
   "description": "Excel manipulation including data reading/writing, worksheet management, formatting, charts, and pivot table.",
   "categories": [
    "Productivity"
   ],
   "tags": [
    "Excel Manipulation",
    "Python"
   ],
   "repository": "https://github.com/haris-musa/excel-mcp-server",
   "homepage": "https://github.com/haris-musa/excel-mcp-server",
   "official": false,
   "methods": [
    {
     "type": "uvx",
     "command": "uvx",
     "args": [
      "--from",
      "git+https://github.com/haris-musa/excel-mcp-server",
      "excel-mcp-server"
     ],
     "env": {
      "EXCEL_FILES_PATH": null
     }
    }
   ],
   "variables": {
    "EXCEL_FILES_PATH": {
     "description": "Directory where Excel files will be stored.",
     "required": false,
     "example": "/path/to/excel/files"
    }
   }
  },
  "edubase": {
   "displayName": "EduBase MCP server",
   "description": "<img src=\"https://static.edubase.net/media/brand/title/color.png\" alt=\"EduBase logo\" height=\"150\" />",
   "categories": [
    "MCP Tools"
   ],
   "tags": [
    "education",
    "learning",
    "quiz",
    "assessment",
    "API"
   ],
   "repository": "https://github.com/EduBase/MCP",
   "homepage": "https://www.edubase.net",
   "official": true,
   "methods": [
    {
     "type": "docker",
     "command": "docker",
     "args": [
      "run",
      "-i",
      "--rm",
      "-e",
      "EDUBASE_API_URL",
      "-e",
      "EDUBASE_API_APP",
      "-e",
      "EDUBASE_API_KEY",
      "edubase/mcp"
     ],
     "env": {
      "EDUBASE_API_URL": "https://domain.edubase.net/api",
      "EDUBASE_API_APP": "your_integration_app_id",
      "EDUBASE_API_KEY": "your_integration_secret_key"
     }
    },
    {
     "type": "custom",
     "command": "node",
     "args": [
      "/path/to/dist/index.js"
     ],
     "env": {
      "EDUBASE_API_URL": "https://domain.edubase.net/api",
      "EDUBASE_API_APP": "your_integration_app_id",
      "EDUBASE_API_KEY": "your_integration_secret_key"
     }
    }
   ],
   "variables": {
    "EDUBASE_API_URL": {
     "description": "URL to the EduBase API",
     "required": true,
     "example": "https://domain.edubase.net/api"
    },
    "EDUBASE_API_APP": {
     "description": "Your integration app ID",
     "required": true,
     "example": "your_integration_app_id"
    },
    "EDUBASE_API_KEY": {
     "description": "Your integration secret key",
     "required": true,
     "example": "your_integration_secret_key"
    }
   }
  },
  "ramp-mcp": {
   "displayName": "Ramp MCP",
   "description": "A Model Context Protocol server for retrieving and analyzing data or running tasks for [Ramp](https://ramp.com) using [Developer API](https://docs.ramp.com/developer-api/v1/overview/introduction). In order to get around token and input siz…",
   "categories": [
    "Finance"
   ],
   "tags": [
    "ramp",
    "finance",
    "api",
    "database",
    "etl"
   ],
   "repository": "https://github.com/ramp-public/ramp-mcp",
   "homepage": "https://ramp.com",
   "official": true,
   "methods": [
    {
     "type": "uvx",
     "command": "uvx",
     "args": [
      "--from",
      "git+https://github.com/ramp-public/ramp-mcp.git",
      "ramp-mcp",
      "-s",
      "${-s}"
     ],
     "env": {
      "RAMP_CLIENT_ID": null,
      "RAMP_CLIENT_SECRET": null,
      "RAMP_ENV": null
     }
    }
   ],
   "variables": {
    "RAMP_CLIENT_ID": {
     "description": "Ramp API client ID",
     "required": true,
     "example": "<CLIENT_ID>"
    },
    "RAMP_CLIENT_SECRET": {
     "description": "Ramp API client secret",
     "required": true,
     "example": "<CLIENT_SECRET>"
    },
    "RAMP_ENV": {
     "description": "Ramp environment (demo, qa, or prd)",
     "required": true,
     "example": "demo"
    },
    "-s": {
     "description": "Comma-separated list of API scopes to enable",
     "required": true,
     "example": "transactions:read,reimbursements:read"
    }
   }
  },
  "opendota": {
   "displayName": "OpenDota",
   "description": "Interact with OpenDota API to retrieve Dota 2 match data, player statistics, and more.",
   "categories": [
    "Analytics"
   ],
   "tags": [
    "Dota 2",
    "API",
    "Gaming",
    "Statistics"
   ],
   "repository": "https://github.com/asusevski/opendota-mcp-server",
   "homepage": "https://github.com/asusevski/opendota-mcp-server",
   "official": false,
   "methods": [
    {
     "type": "uvx",
     "command": "uvx",
     "args": [
      "--from",
      "git+https://github.com/asusevski/opendota-mcp-server.git",
      "src/opendota_server/server"
     ],
     "env": {}
    }
   ],
   "variables": {}
  },
  "apimatic-validator-mcp": {
   "displayName": "APIMatic Validator MCP Server",
   "description": "This repository provides a Model Context Protocol (MCP) Server for validating OpenAPI specifications using [APIMatic](https://www.apimatic.io/). The server processes OpenAPI files and returns validation summaries by leveraging APIMatic’s A…",
   "categories": [
    "Dev Tools"
   ],
   "tags": [
    "OpenAPI",
    "validation",
    "APIMatic"
   ],
   "repository": "https://github.com/apimatic/apimatic-validator-mcp",
   "homepage": "https://www.apimatic.io/",
   "official": true,
   "methods": [
    {
     "type": "npm",
     "command": "node",
     "args": [
      "build/index.js"
     ],
     "env": {
      "APIMATIC_API_KEY": "<Add your APIMatic token here>"
     }
    }
   ],
   "variables": {
    "APIMATIC_API_KEY": {
     "description": "API key for APIMatic service",
     "required": true,
     "example": "<Add your APIMatic token here>"
    }
   }
  },
  "stripe": {
   "displayName": "Stripe Model Context Protocol",
   "description": "The Stripe Model Context Protocol server allows you to integrate with Stripe APIs through function calling. This protocol supports various tools to interact with different Stripe services.",
   "categories": [
    "Finance"
   ],
   "tags": [
    "stripe",
    "payments",
    "customers",
    "refunds"
   ],
   "repository": "https://github.com/stripe/agent-toolkit",
   "homepage": "https://github.com/stripe/agent-toolkit/tree/main/modelcontextprotocol",
   "official": true,
   "methods": [
    {
     "type": "npm",
     "command": "npx",
     "args": [
      "-y",
      "@stripe/mcp",
      "--tools=all",
      "--api-key=${STRIPE_SECRET_KEY}"
     ],
     "env": {}
    }
   ],
   "variables": {
    "STRIPE_SECRET_KEY": {
     "description": "Your Stripe secret API key required for authenticating requests to the Stripe API.",
     "required": true,
     "example": "sk_test_…example…"
    }
   }
  },
  "unity3d-game-engine": {
   "displayName": "Unity3D Game Engine",
   "description": "An MCP server that enables LLMs to interact with Unity3d Game Engine, supporting access to a variety of the Unit's Editor engine tools (e.g. Console Logs, Test Runner logs, Editor functions, hierarchy state, etc) and executing them as MCP…",
   "categories": [
    "Media Creation"
   ],
   "tags": [
    "Unity",
    "Node.js",
    "TypeScript",
    "WebSocket",
    "AI"
   ],
   "repository": "https://github.com/CoderGamester/mcp-unity",
   "homepage": "https://github.com/CoderGamester/mcp-unity",
   "official": false,
   "methods": [
    {
     "type": "npm",
     "command": "npx",
     "args": [
      "-y",
      "https://github.com/CoderGamester/mcp-unity"
     ],
     "env": {
      "UNITY_PORT": "8090"
     }
    }
   ],
   "variables": {
    "UNITY_PORT": {
     "description": "Environment variable to set the port number for the Unity MCP Server. This should be set to the desired port for the server to run and conn…",
     "required": false,
     "example": "8090"
    }
   }
  },
  "needle-mcp": {
   "displayName": "Needle MCP Server",
   "description": "MCP (Model Context Protocol) server to manage documents and perform searches using [Needle](https://needle-ai.com) through Claude’s Desktop Application.",
   "categories": [
    "Knowledge Base"
   ],
   "tags": [
    "document management",
    "search",
    "Needle"
   ],
   "repository": "https://github.com/needle-ai/needle-mcp",
   "homepage": "https://needle-ai.com",
   "official": true,
   "methods": [
    {
     "type": "uvx",
     "command": "uvx",
     "args": [
      "--from",
      "git+https://github.com/needle-ai/needle-mcp",
      "needle-mcp"
     ],
     "env": {
      "NEEDLE_API_KEY": "your_needle_api_key"
     }
    }
   ],
   "variables": {
    "NEEDLE_API_KEY": {
     "description": "API key for Needle service",
     "required": true,
     "example": "your_needle_api_key"
    }
   }
  },
  "cloudinary": {
   "displayName": "Cloudinary",
   "description": "Cloudinary Model Context Protocol Server to upload media to Cloudinary and get back the media link and details.",
   "categories": [
    "Media Creation"
   ],
   "tags": [
    "cloudinary",
    "images",
    "videos"
   ],
   "repository": "https://github.com/felores/cloudinary-mcp-server",
   "homepage": "https://github.com/felores/cloudinary-mcp-server",
   "official": false,
   "methods": [
    {
     "type": "npm",
     "command": "npx",
     "args": [
      "@felores/cloudinary-mcp-server@latest"
     ],
     "env": {
      "CLOUDINARY_CLOUD_NAME": null,
      "CLOUDINARY_API_KEY": null,
      "CLOUDINARY_API_SECRET": null
     }
    }
   ],
   "variables": {
    "CLOUDINARY_CLOUD_NAME": {
     "description": "Your Cloudinary cloud name, used to identify your account and resources.",
     "required": true,
     "example": "my_cloud_name"
    },
    "CLOUDINARY_API_KEY": {
     "description": "Your Cloudinary API key, used to authenticate requests to the Cloudinary API.",
     "required": true,
     "example": "my_api_key"
    },
    "CLOUDINARY_API_SECRET": {
     "description": "Your Cloudinary API secret, used to authenticate requests and secure your Cloudinary account.",
     "required": true,
     "example": "my_api_secret"
    }
   }
  },
  "notion": {
   "displayName": "Notion",
   "description": "Notion MCP integration. Search, Read, Update, and Create pages through Claude chat.",
   "categories": [
    "Productivity"
   ],
   "tags": [
    "Notion"
   ],
   "repository": "https://github.com/v-3/notion-server",
   "homepage": "https://github.com/v-3/notion-server",
   "official": false,
   "methods": [
    {
     "type": "npm",
     "command": "npx",
     "args": [
      "-y",
      "https://github.com/v-3/notion-server"
     ],
     "env": {
      "NOTION_API_KEY": null
     }
    }
   ],
   "variables": {
    "NOTION_API_KEY": {
     "description": "Your Notion API key for authentication to access data within your Notion workspace.",
     "required": true,
     "example": "your_notion_api_key_here"
    }
   }
  },
  "dicom": {
   "displayName": "DICOM Model Context Protocol",
   "description": "An MCP server to query and retrieve medical images and for parsing and reading dicom-encapsulated documents (pdf etc.).",
   "categories": [
    "Professional Apps"
   ],
   "tags": [
    "DICOM",
    "Medical Imaging",
    "AI",
    "PDF Extraction"
   ],
   "repository": "https://github.com/ChristianHinge/dicom-mcp",
   "homepage": "https://github.com/ChristianHinge/dicom-mcp",
   "official": false,
   "methods": [
    {
     "type": "uvx",
     "command": "uvx",
     "args": [
      "--from",
      "git+https://github.com/ChristianHinge/dicom-mcp",
      "dicom-mcp",
      "${CONFIG_PATH}"
     ],
     "env": {}
    }
   ],
   "variables": {
    "CONFIG_PATH": {
     "description": "Path to the configuration file",
     "required": true,
     "example": "/path/to/config.yaml"
    }
   }
  },
  "huggingface-spaces": {
   "displayName": "HuggingFace Spaces 🤗",
   "description": "Server for using HuggingFace Spaces, supporting Open Source Image, Audio, Text Models and more. Claude Desktop mode for easy integration.",
   "categories": [
    "AI Systems"
   ],
   "tags": [
    "Hugging Face",
    "Claude Desktop"
   ],
   "repository": "https://github.com/evalstate/mcp-hfspace",
   "homepage": "https://github.com/evalstate/mcp-hfspace",
   "official": false,
   "methods": [
    {
     "type": "npm",
     "command": "npx",
     "args": [
      "-y",
      "@llmindset/mcp-hfspace"
     ],
     "env": {}
    }
   ],
   "variables": {
    "CLAUDE_DESKTOP_MODE": {
     "description": "Enables or disables the Claude Desktop Mode for the server.",
     "required": false,
     "example": "false"
    }
   }
  },
  "mcp-audiense-insights": {
   "displayName": "Audiense Insights",
   "description": "This server, based on the [Model Context Protocol (MCP)](https://github.com/modelcontextprotocol), allows **Claude** or any other MCP-compatible client to interact with your [Audiense Insights](https://www.audiense.com/) account. It extrac…",
   "categories": [
    "Analytics"
   ],
   "tags": [
    "marketing",
    "audience analysis",
    "insights",
    "demographics",
    "influencers"
   ],
   "repository": "https://github.com/AudienseCo/mcp-audiense-insights",
   "homepage": "https://github.com/AudienseCo/mcp-audiense-insights",
   "official": true,
   "methods": [
    {
     "type": "custom",
     "command": "node",
     "args": [
      "/ABSOLUTE/PATH/TO/YOUR/build/index.js"
     ],
     "env": {
      "AUDIENSE_CLIENT_ID": "your_client_id_here",
      "AUDIENSE_CLIENT_SECRET": "your_client_secret_here",
      "TWITTER_BEARER_TOKEN": "your_token_here"
     }
    }
   ],
   "variables": {
    "AUDIENSE_CLIENT_ID": {
     "description": "Audiense API client ID",
     "required": true,
     "example": "your_client_id_here"
    },
    "AUDIENSE_CLIENT_SECRET": {
     "description": "Audiense API client secret",
     "required": true,
     "example": "your_client_secret_here"
    },
    "TWITTER_BEARER_TOKEN": {
     "description": "X/Twitter API Bearer Token for enriched influencer data",
     "required": false,
     "example": "your_token_here"
    }
   }
  },
  "hubspot": {
   "displayName": "HubSpot CRM Integration",
   "description": "HubSpot CRM integration for managing contacts and companies. Create and retrieve CRM data directly through Claude chat.",
   "categories": [
    "Productivity"
   ],
   "tags": [
    "HubSpot",
    "API",
    "AI",
    "CRM",
    "Integration"
   ],
   "repository": "https://github.com/buryhuang/mcp-hubspot",
   "homepage": "https://github.com/buryhuang/mcp-hubspot",
   "official": false,
   "methods": [
    {
     "type": "docker",
     "command": "docker",
     "args": [
      "run",
      "-i",
      "--rm",
      "-e",
      "HUBSPOT_ACCESS_TOKEN=${HUBSPOT_ACCESS_TOKEN}",
      "buryhuang/mcp-hubspot:latest"
     ],
     "env": {
      "HUBSPOT_ACCESS_TOKEN": null
     }
    }
   ],
   "variables": {
    "HUBSPOT_ACCESS_TOKEN": {
     "description": "The HubSpot access token required for authenticating API requests to HubSpot.",
     "required": true,
     "example": "your_access_token_here"
    }
   }
  },
  "ticketmaster": {
   "displayName": "Ticketmaster",
   "description": "Search for events, venues, and attractions through the Ticketmaster Discovery API",
   "categories": [
    "Web Services"
   ],
   "tags": [
    "ticketmaster",
    "events",
    "venues",
    "attractions"
   ],
   "repository": "https://github.com/delorenj/mcp-server-ticketmaster",
   "homepage": "https://github.com/delorenj/mcp-server-ticketmaster",
   "official": false,
   "methods": [
    {
     "type": "npm",
     "command": "npx",
     "args": [
      "-y",
      "@delorenj/mcp-server-ticketmaster"
     ],
     "env": {
      "TICKETMASTER_API_KEY": null
     }
    }
   ],
   "variables": {
    "TICKETMASTER_API_KEY": {
     "description": "API key required to access the Ticketmaster Discovery API.",
     "required": true,
     "example": "your-api-key-here"
    }
   }
  },
  "figma": {
   "displayName": "Figma",
   "description": "Give your coding agent direct access to Figma file data, helping it one-shot design implementation.",
   "categories": [
    "Professional Apps"
   ],
   "tags": [
    "Figma",
    "AI"
   ],
   "repository": "https://github.com/GLips/Figma-Context-MCP",
   "homepage": "https://github.com/GLips/Figma-Context-MCP",
   "official": false,
   "methods": [
    {
     "type": "npm",
     "command": "npx",
     "args": [
      "-y",
      "figma-developer-mcp",
      "--figma-api-key=${FIGMA_API_KEY}",
      "--stdio"
     ],
     "env": {}
    }
   ],
   "variables": {
    "FIGMA_API_KEY": {
     "description": "Your Figma API access token (required)",
     "required": true,
     "example": "<your-figma-api-key>"
    }
   }
  },
  "riza-mcp": {
   "displayName": "Riza MCP Server",
   "description": "[Riza](https://riza.io) offers an isolated code interpreter for your LLM-generated code.",
   "categories": [
    "Dev Tools"
   ],
   "tags": [
    "code interpreter",
    "LLM",
    "tools"
   ],
   "repository": "https://github.com/riza-io/riza-mcp",
   "homepage": "https://riza.io",
   "official": true,
   "methods": [
    {
     "type": "npm",
     "command": "npx",
     "args": [
      "@riza-io/riza-mcp"
     ],
     "env": {
      "RIZA_API_KEY": "your-api-key"
     }
    }
   ],
   "variables": {
    "RIZA_API_KEY": {
     "description": "API key for Riza service",
     "required": true,
     "example": "your-api-key"
    }
   }
  },
  "uns-mcp": {
   "displayName": "Unstructured API MCP Server",
   "description": "An MCP server implementation for interacting with the Unstructured API. This server provides tools to list sources and workflows.",
   "categories": [
    "Knowledge Base"
   ],
   "tags": [
    "unstructured",
    "api",
    "document processing",
    "workflow",
    "connectors"
   ],
   "repository": "https://github.com/Unstructured-IO/UNS-MCP",
   "homepage": "https://docs.unstructured.io/",
   "official": true,
   "methods": [
    {
     "type": "uvx",
     "command": "uvx",
     "args": [
      "uns_mcp"
     ],
     "env": {
      "UNSTRUCTURED_API_KEY": "YOUR_KEY"
     }
    }
   ],
   "variables": {
    "UNSTRUCTURED_API_KEY": {
     "description": "API key for the Unstructured platform",
     "required": true,
     "example": "YOUR_KEY"
    }
   }
  },
  "starwind-ui": {
   "displayName": "Starwind UI",
   "description": "This MCP provides relevant commands, documentation, and other information to allow LLMs to take full advantage of Starwind UI's open source Astro components.",
   "categories": [
    "Dev Tools"
   ],
   "tags": [
    "Starwind",
    "Developer Tools",
    "AI",
    "Components"
   ],
   "repository": "https://github.com/Boston343/starwind-ui-mcp",
   "homepage": "https://github.com/Boston343/starwind-ui-mcp/",
   "official": false,
   "methods": [
    {
     "type": "npm",
     "command": "npx",
     "args": [
      "-y",
      "https://github.com/Boston343/starwind-ui-mcp/"
     ],
     "env": {}
    }
   ],
   "variables": {}
  },
  "mcp-server-adfin": {
   "displayName": "Adfin MCP Server",
   "description": "1. Python 3.10 or higher",
   "categories": [
    "Finance"
   ],
   "tags": [
    "adfin",
    "finance",
    "invoicing"
   ],
   "repository": "https://github.com/Adfin-Engineering/mcp-server-adfin",
   "homepage": "[NOT GIVEN]",
   "official": true,
   "methods": [
    {
     "type": "python",
     "command": "uv",
     "args": [
      "--directory",
      "<absolute_path_to_adfin_mcp_folder>",
      "run",
      "main_adfin_mcp.py"
     ],
     "env": {
      "ADFIN_EMAIL": "<email>",
      "ADFIN_PASSWORD": "<password>"
     }
    },
    {
     "type": "filesystem",
     "command": "uv",
     "args": [
      "--directory",
      "<absolute_path_to_adfin_mcp_folder>",
      "run",
      "filesystem.py"
     ],
     "env": {}
    }
   ],
   "variables": {
    "ADFIN_EMAIL": {
     "description": "Email for Adfin authentication",
     "required": true,
     "example": ""
    },
    "ADFIN_PASSWORD": {
     "description": "Password for Adfin authentication",
     "required": true,
     "example": ""
    }
   }
  },
  "time": {
   "displayName": "Time",
   "description": "A Model Context Protocol server that provides time and timezone conversion capabilities. It automatically detects the system's timezone and offers tools for getting current time and converting between timezones.",
   "categories": [
    "System Tools"
   ],
   "tags": [
    "time",
    "timezone",
    "date",
    "converter"
   ],
   "repository": "https://github.com/modelcontextprotocol/servers",
   "homepage": "https://github.com/modelcontextprotocol/servers/tree/main/src/time#readme",
   "official": true,
   "methods": [
    {
     "type": "uvx",
     "command": "uvx",
     "args": [
      "mcp-server-time",
      "--local-timezone=${TZ}"
     ],
     "env": {}
    },
    {
     "type": "python",
     "command": "python",
     "args": [
      "-m",
      "mcp_server_time",
      "--local-timezone=${TZ}"
     ],
     "env": {}
    },
    {
     "type": "docker",
     "command": "docker",
     "args": [
      "run",
      "-i",
      "--rm",
      "mcp/time",
      "--local-timezone=${TZ}"
     ],
     "env": {}
    }
   ],
   "variables": {
    "TZ": {
     "description": "Environment variable to override the system's default timezone",
     "required": false,
     "example": "America/New_York"
    }
   }
  },
  "ableton-live": {
   "displayName": "Ableton Live",
   "description": "an MCP server to control Ableton Live.",
   "categories": [
    "Media Creation"
   ],
   "tags": [
    "Ableton Live",
    "OSC",
    "Music"
   ],
   "repository": "https://github.com/Simon-Kansara/ableton-live-mcp-server",
   "homepage": "https://github.com/Simon-Kansara/ableton-live-mcp-server",
   "official": false,
   "methods": [
    {
     "type": "custom",
     "command": "python",
     "args": [
      "mcp_ableton_server.py"
     ],
     "env": {}
    }
   ],
   "variables": {}
  },
  "pandoc": {
   "displayName": "Pandoc Document Conversion",
   "description": "MCP server for seamless document format conversion using Pandoc, supporting Markdown, HTML, PDF, DOCX (.docx), csv and more.",
   "categories": [
    "Media Creation"
   ],
   "tags": [
    "pandoc",
    "document",
    "conversion"
   ],
   "repository": "https://github.com/vivekVells/mcp-pandoc",
   "homepage": "https://github.com/vivekVells/mcp-pandoc",
   "official": false,
   "methods": [
    {
     "type": "uvx",
     "command": "uvx",
     "args": [
      "mcp-pandoc"
     ],
     "env": {}
    }
   ],
   "variables": {}
  },
  "mcp-server-cloudflare": {
   "displayName": "Cloudflare MCP Server",
   "description": "Model Context Protocol (MCP) is a [new, standardized protocol](https://modelcontextprotocol.io/introduction) for managing context between large language models (LLMs) and external systems. In this repository, we provide an installer as wel…",
   "categories": [
    "Dev Tools"
   ],
   "tags": [
    "cloudflare",
    "mcp",
    "model-context-protocol",
    "llm",
    "api"
   ],
   "repository": "https://github.com/cloudflare/mcp-server-cloudflare",
   "homepage": "https://github.com/cloudflare/mcp-server-cloudflare",
   "official": true,
   "methods": [
    {
     "type": "npm",
     "command": "npx",
     "args": [
      "@cloudflare/mcp-server-cloudflare",
      "init"
     ],
     "env": {}
    }
   ],
   "variables": {}
  },
  "aws-athena": {
   "displayName": "AWS Athena",
   "description": "A MCP server for AWS Athena to run SQL queries on Glue Catalog.",
   "categories": [
    "Databases"
   ],
   "tags": [
    "athena",
    "sql",
    "aws"
   ],
   "repository": "https://github.com/lishenxydlgzs/aws-athena-mcp",
   "homepage": "https://github.com/lishenxydlgzs/aws-athena-mcp",
   "official": false,
   "methods": [
    {
     "type": "npm",
     "command": "npx",
     "args": [
      "-y",
      "@lishenxydlgzs/aws-athena-mcp"
     ],
     "env": {
      "OUTPUT_S3_PATH": null,
      "AWS_REGION": null,
      "AWS_PROFILE": null,
      "AWS_ACCESS_KEY_ID": null,
      "AWS_SECRET_ACCESS_KEY": null,
      "AWS_SESSION_TOKEN": null,
      "QUERY_TIMEOUT_MS": null,
      "MAX_RETRIES": null,
      "RETRY_DELAY_MS": null
     }
    }
   ],
   "variables": {
    "OUTPUT_S3_PATH": {
     "description": "S3 bucket path for saving Athena query results.",
     "required": true,
     "example": "s3://your-bucket/athena-results/"
    },
    "AWS_REGION": {
     "description": "The AWS region to use for Athena queries, defaults to AWS CLI default region.",
     "required": false,
     "example": "us-east-1"
    },
    "AWS_PROFILE": {
     "description": "AWS CLI profile to use, defaults to 'default' profile.",
     "required": false,
     "example": "default"
    },
    "AWS_ACCESS_KEY_ID": {
     "description": "AWS access key for authentication, if not using IAM role or environment variables.",
     "required": false,
     "example": ""
    },
    "AWS_SECRET_ACCESS_KEY": {
     "description": "AWS secret key for authentication, if not using IAM role or environment variables.",
     "required": false,
     "example": ""
    },
    "AWS_SESSION_TOKEN": {
     "description": "Session token for temporary AWS credentials, if using temporary access.",
     "required": false,
     "example": ""
    },
    "QUERY_TIMEOUT_MS": {
     "description": "Timeout setting for queries in milliseconds (default: 300000 ms).",
     "required": false,
     "example": "300000"
    },
    "MAX_RETRIES": {
     "description": "Number of retry attempts for failed queries (default: 100).",
     "required": false,
     "example": "100"
    },
    "RETRY_DELAY_MS": {
     "description": "Delay between retry attempts in milliseconds (default: 500 ms).",
     "required": false,
     "example": "500"
    }
   }
  },
  "basic-memory": {
   "displayName": "Basic Memory",
   "description": "Local-first knowledge management system that builds a semantic graph from Markdown files, enabling persistent memory across conversations with LLMs.",
   "categories": [
    "Knowledge Base"
   ],
   "tags": [
    "LLM",
    "Markdown",
    "Knowledge Base"
   ],
   "repository": "https://github.com/basicmachines-co/basic-memory",
   "homepage": "https://github.com/basicmachines-co/basic-memory",
   "official": false,
   "methods": [
    {
     "type": "uvx",
     "command": "uvx",
     "args": [
      "basic-memory",
      "mcp"
     ],
     "env": {}
    }
   ],
   "variables": {}
  },
  "deepseek-r1": {
   "displayName": "Deepseek R1",
   "description": "A Model Context Protocol (MCP) server implementation connecting Claude Desktop with DeepSeek's language models (R1/V3)",
   "categories": [
    "AI Systems"
   ],
   "tags": [
    "Deepseek",
    "LLM"
   ],
   "repository": "https://github.com/66julienmartin/MCP-server-Deepseek_R1",
   "homepage": "https://github.com/66julienmartin/MCP-server-Deepseek_R1",
   "official": false,
   "methods": [
    {
     "type": "npm",
     "command": "npx",
     "args": [
      "-y",
      "https://github.com/66julienmartin/MCP-server-Deepseek_R1"
     ],
     "env": {
      "DEEPSEEK_API_KEY": null
     }
    }
   ],
   "variables": {
    "DEEPSEEK_API_KEY": {
     "description": "API key for authenticating with the Deepseek service.",
     "required": true,
     "example": "your-api-key"
    }
   }
  },
  "dart-mcp-server": {
   "displayName": "Dart MCP Server",
   "description": "<h1>Dart MCP Server</h1>",
   "categories": [
    "Dev Tools"
   ],
   "tags": [
    "AI",
    "MCP",
    "Model Context Protocol",
    "Project Management"
   ],
   "repository": "https://github.com/its-dart/dart-mcp-server",
   "homepage": "https://www.itsdart.com/?nr=1",
   "official": true,
   "methods": [
    {
     "type": "npm",
     "command": "npx",
     "args": [
      "-y",
      "dart-mcp-server"
     ],
     "env": {
      "DART_TOKEN": "dsa_..."
     }
    },
    {
     "type": "docker",
     "command": "docker",
     "args": [
      "run",
      "-i",
      "--rm",
      "-e",
      "DART_TOKEN",
      "mcp/dart"
     ],
     "env": {
      "DART_TOKEN": "dsa_..."
     }
    }
   ],
   "variables": {
    "DART_TOKEN": {
     "description": "Authentication token from Dart profile",
     "required": true,
     "example": "dsa_..."
    }
   }
  },
  "oceanbase": {
   "displayName": "OceanBase",
   "description": "(by yuanoOo) A Model Context Protocol (MCP) server that enables secure interaction with OceanBase databases.",
   "categories": [
    "Databases"
   ],
   "tags": [
    "OceanBase",
    "SQL",
    "Security"
   ],
   "repository": "https://github.com/yuanoOo/oceanbase_mcp_server",
   "homepage": "https://github.com/yuanoOo/oceanbase_mcp_server",
   "official": false,
   "methods": [
    {
     "type": "uvx",
     "command": "uvx",
     "args": [
      "--from",
      "git+https://github.com/yuanoOo/oceanbase_mcp_server.git",
      "oceanbase_mcp_server"
     ],
     "env": {
      "OB_HOST": null,
      "OB_PORT": null,
      "OB_USER": null,
      "OB_PASSWORD": null,
      "OB_DATABASE": null
     }
    }
   ],
   "variables": {
    "OB_HOST": {
     "description": "Database host for connecting to the OceanBase server.",
     "required": true,
     "example": "localhost"
    },
    "OB_PORT": {
     "description": "Optional: Database port to connect to OceanBase, defaults to 2881 if not specified.",
     "required": false,
     "example": "2881"
    },
    "OB_USER": {
     "description": "Username for authenticating with the OceanBase database.",
     "required": true,
     "example": "your_username"
    },
    "OB_PASSWORD": {
     "description": "Password for the specified database user.",
     "required": true,
     "example": "your_password"
    },
    "OB_DATABASE": {
     "description": "Name of the OceanBase database to connect to.",
     "required": true,
     "example": "your_database"
    }
   }
  },
  "mcp-installer": {
   "displayName": "Installer",
   "description": "This server is a server that installs other MCP servers for you.",
   "categories": [
    "MCP Tools"
   ],
   "tags": [
    "installer",
    "server"
   ],
   "repository": "https://github.com/anaisbetts/mcp-installer",
   "homepage": "https://github.com/anaisbetts/mcp-installer",
   "official": false,
   "methods": [
    {
     "type": "npm",
     "command": "npx",
     "args": [
      "@anaisbetts/mcp-installer"
     ],
     "env": {}
    }
   ],
   "variables": {}
  },
  "agentrpc": {
   "displayName": "AgentRPC",
   "description": "> Universal RPC layer for AI agents across network boundaries and languages",
   "categories": [
    "Dev Tools"
   ],
   "tags": [
    "RPC",
    "AI agents",
    "MCP",
    "OpenAI",
    "multi-language"
   ],
   "repository": "https://github.com/agentrpc/agentrpc",
   "homepage": "https://docs.agentrpc.com",
   "official": true,
   "methods": [
    {
     "type": "npm",
     "command": "npx",
     "args": [
      "-y",
      "agentrpc",
      "mcp"
     ],
     "env": {
      "AGENTRPC_API_SECRET": "<YOUR_API_SECRET>"
     }
    }
   ],
   "variables": {
    "AGENTRPC_API_SECRET": {
     "description": "API secret for authentication",
     "required": true,
     "example": "<YOUR_API_SECRET>"
    }
   }
  },
  "tavily-mcp": {
   "displayName": "Tavily MCP Server",
   "description": "Search engine for AI agents (search + extract) powered by Tavily",
   "categories": [
    "Web Services"
   ],
   "tags": [
    "search",
    "web",
    "extract",
    "mcp",
    "claude"
   ],
   "repository": "https://github.com/tavily-ai/tavily-mcp",
   "homepage": "https://github.com/tavily-ai/tavily-mcp",
   "official": true,
   "methods": [
    {
     "type": "npm",
     "command": "npx",
     "args": [
      "-y",
      "tavily-mcp"
     ],
     "env": {
      "TAVILY_API_KEY": "your-api-key-here"
     }
    }
   ],
   "variables": {
    "TAVILY_API_KEY": {
     "description": "API key for Tavily services",
     "required": true,
     "example": "your-api-key-here"
    }
   }
  },
  "gotohuman-mcp-server": {
   "displayName": "gotoHuman MCP Server",
   "description": "Let your **AI agents ask for human reviews** in gotoHuman via MCP.",
   "categories": [
    "AI Systems"
   ],
   "tags": [
    "human review",
    "AI agents",
    "webhook",
    "automation"
   ],
   "repository": "https://github.com/gotohuman/gotohuman-mcp-server",
   "homepage": "https://app.gotohuman.com",
   "official": true,
   "methods": [
    {
     "type": "custom",
     "command": "node",
     "args": [
      "build/index.js"
     ],
     "env": {
      "GOTOHUMAN_API_KEY": null
     }
    }
   ],
   "variables": {
    "GOTOHUMAN_API_KEY": {
     "description": "Your gotoHuman API key",
     "required": true,
     "example": "your-api-key"
    }
   }
  },
  "google-calendar": {
   "displayName": "Google Calendar",
   "description": "Google Calendar MCP Server for managing Google calendar events. Also supports searching for events by attributes like title and location.",
   "categories": [
    "Productivity"
   ],
   "tags": [
    "Google Calendar",
    "event management"
   ],
   "repository": "https://github.com/nspady/google-calendar-mcp",
   "homepage": "https://github.com/nspady/google-calendar-mcp",
   "official": false,
   "methods": [
    {
     "type": "npm",
     "command": "npx",
     "args": [
      "-y",
      "https://github.com/nspady/google-calendar-mcp"
     ],
     "env": {}
    }
   ],
   "variables": {}
  },
  "cryptopanic-mcp-server": {
   "displayName": "CryptoPanic News",
   "description": "Providing latest cryptocurrency news to AI agents, powered by CryptoPanic.",
   "categories": [
    "Finance"
   ],
   "tags": [
    "cryptocurrency",
    "news",
    "CryptoPanic"
   ],
   "repository": "https://github.com/kukapay/cryptopanic-mcp-server",
   "homepage": "https://github.com/kukapay/cryptopanic-mcp-server",
   "official": false,
   "methods": [
    {
     "type": "uvx",
     "command": "uvx",
     "args": [
      "--from",
      "git+https://github.com/kukapay/cryptopanic-mcp-server",
      "main.py"
     ],
     "env": {
      "CRYPTOPANIC_API_KEY": null
     }
    }
   ],
   "variables": {
    "CRYPTOPANIC_API_KEY": {
     "description": "API key to access CryptoPanic services. This key is necessary to authenticate requests made to the CryptoPanic API.",
     "required": true,
     "example": "your_api_key_here"
    }
   }
  },
  "ghost": {
   "displayName": "Ghost",
   "description": "A Model Context Protocol (MCP) server for interacting with Ghost CMS through LLM interfaces like Claude.",
   "categories": [
    "Professional Apps"
   ],
   "tags": [
    "Ghost",
    "CMS",
    "Admin API"
   ],
   "repository": "https://github.com/MFYDev/ghost-mcp",
   "homepage": "https://github.com/MFYDev/ghost-mcp",
   "official": false,
   "methods": [
    {
     "type": "uvx",
     "command": "uvx",
     "args": [
      "--from",
      "git+https://github.com/MFYDev/ghost-mcp",
      "src/main.py"
     ],
     "env": {
      "GHOST_API_URL": null,
      "GHOST_STAFF_API_KEY": null
     }
    }
   ],
   "variables": {
    "GHOST_API_URL": {
     "description": "Your Ghost Admin API URL",
     "required": true,
     "example": "https://yourblog.com"
    },
    "GHOST_STAFF_API_KEY": {
     "description": "Your Ghost Staff API key",
     "required": true,
     "example": "your_staff_api_key"
    }
   }
  },
  "mcp-server-box": {
   "displayName": "MCP Server Box",
   "description": "MCP Server Box is a Python project that integrates with the Box API to perform various operations such as file search, text extraction, AI-based querying, and data extraction. It leverages the `box-sdk-gen` library and provides a set of to…",
   "categories": [
    "Knowledge Base"
   ],
   "tags": [
    "box",
    "ai",
    "file-management",
    "search",
    "text-extraction"
   ],
   "repository": "https://github.com/box-community/mcp-server-box",
   "homepage": "https://github.com/box-community/mcp-server-box",
   "official": true,
   "methods": [
    {
     "type": "python",
     "command": "uv",
     "args": [
      "--directory",
      "/path/to/mcp-server-box",
      "run",
      "src/mcp_server_box.py"
     ],
     "env": {
      "BOX_CLIENT_ID": "your_client_id",
      "BOX_CLIENT_SECRET": "your_client_secret"
     }
    }
   ],
   "variables": {
    "BOX_CLIENT_ID": {
     "description": "Box API Client ID",
     "required": true,
     "example": "your_client_id"
    },
    "BOX_CLIENT_SECRET": {
     "description": "Box API Client Secret",
     "required": true,
     "example": "your_client_secret"
    }
   }
  },
  "fewsats-mcp": {
   "displayName": "Fewsats MCP Server",
   "description": "This MCP server integrates with [Fewsats](https://fewsats.com) and allows AI Agents to purchase anything in a secure way.",
   "categories": [
    "Finance"
   ],
   "tags": [
    "payments",
    "wallet",
    "offers"
   ],
   "repository": "https://github.com/Fewsats/fewsats-mcp",
   "homepage": "https://fewsats.com",
   "official": true,
   "methods": [
    {
     "type": "uvx",
     "command": "uvx",
     "args": [
      "fewsats-mcp"
     ],
     "env": {
      "FEWSATS_API_KEY": "YOUR_FEWSATS_API_KEY"
     }
    },
    {
     "type": "pip",
     "command": "fewsats-mcp",
     "args": [],
     "env": {}
    }
   ],
   "variables": {
    "FEWSATS_API_KEY": {
     "description": "API key obtained from Fewsats.com",
     "required": true,
     "example": "YOUR_FEWSATS_API_KEY"
    }
   }
  },
  "snowflake": {
   "displayName": "Snowflake",
   "description": "This MCP server enables LLMs to interact with Snowflake databases, allowing for secure and controlled data operations.",
   "categories": [
    "Databases"
   ],
   "tags": [
    "snowflake",
    "sql",
    "database"
   ],
   "repository": "https://github.com/isaacwasserman/mcp-snowflake-server",
   "homepage": "https://github.com/isaacwasserman/mcp-snowflake-server",
   "official": false,
   "methods": [
    {
     "type": "uvx",
     "command": "uvx",
     "args": [
      "mcp_snowflake_server",
      "--account",
      "${ACCOUNT}",
      "--warehouse",
      "${WAREHOUSE}",
      "--user",
      "${USER}",
      "--password",
      "${PASSWORD}",
      "--role",
      "${ROLE}",
      "--database",
      "${DATABASE}",
      "--schema",
      "${SCHEMA}"
     ],
     "env": {}
    }
   ],
   "variables": {
    "ACCOUNT": {
     "description": "The Snowflake account name to connect to.",
     "required": true,
     "example": "your_account_name"
    },
    "WAREHOUSE": {
     "description": "The name of the virtual warehouse to be used for the session.",
     "required": true,
     "example": "your_warehouse_name"
    },
    "USER": {
     "description": "The username to authenticate with Snowflake.",
     "required": true,
     "example": "your_username"
    },
    "PASSWORD": {
     "description": "The password for the specified user.",
     "required": true,
     "example": "your_password"
    },
    "ROLE": {
     "description": "The role to be assumed during the session.",
     "required": true,
     "example": "your_role_name"
    },
    "DATABASE": {
     "description": "The name of the Snowflake database to connect to.",
     "required": true,
     "example": "your_database_name"
    },
    "SCHEMA": {
     "description": "The schema within the database where queries will be executed.",
     "required": true,
     "example": "your_schema_name"
    }
   }
  },
  "rquest": {
   "displayName": "Rquest",
   "description": "An MCP server providing realistic browser-like HTTP request capabilities with accurate TLS/JA3/JA4 fingerprints for bypassing anti-bot measures.",
   "categories": [
    "Web Services"
   ],
   "tags": [
    "http",
    "request",
    "llm",
    "browser",
    "emulation",
    "pdf"
   ],
   "repository": "https://github.com/xxxbrian/mcp-rquest",
   "homepage": "https://github.com/xxxbrian/mcp-rquest",
   "official": false,
   "methods": [
    {
     "type": "uvx",
     "command": "uvx",
     "args": [
      "mcp-rquest"
     ],
     "env": {}
    },
    {
     "type": "python",
     "command": "python",
     "args": [
      "-m",
      "mcp-rquest"
     ],
     "env": {}
    }
   ],
   "variables": {}
  },
  "neo4j": {
   "displayName": "Neo4j Server",
   "description": "A community built server that interacts with Neo4j Graph Database.",
   "categories": [
    "Databases"
   ],
   "tags": [
    "neo4j",
    "database"
   ],
   "repository": "https://github.com/da-okazaki/mcp-neo4j-server",
   "homepage": "https://github.com/da-okazaki/mcp-neo4j-server",
   "official": false,
   "methods": [
    {
     "type": "npm",
     "command": "npx",
     "args": [
      "-y",
      "@alanse/mcp-neo4j-server"
     ],
     "env": {
      "NEO4J_URI": null,
      "NEO4J_USERNAME": null,
      "NEO4J_PASSWORD": null
     }
    }
   ],
   "variables": {
    "NEO4J_URI": {
     "description": "Neo4j database URI (default: bolt://localhost:7687)",
     "required": false,
     "example": "bolt://localhost:7687"
    },
    "NEO4J_USERNAME": {
     "description": "Neo4j username (default: neo4j)",
     "required": false,
     "example": "neo4j"
    },
    "NEO4J_PASSWORD": {
     "description": "Neo4j password",
     "required": true,
     "example": ""
    }
   }
  },
  "discord": {
   "displayName": "Discord",
   "description": "A MCP server to connect to Discord guilds through a bot and read and write messages in channels",
   "categories": [
    "Messaging"
   ],
   "tags": [
    "Discord",
    "LLM",
    "Bot"
   ],
   "repository": "https://github.com/v-3/discordmcp",
   "homepage": "https://github.com/v-3/discordmcp",
   "official": false,
   "methods": [
    {
     "type": "npm",
     "command": "npx",
     "args": [
      "-y",
      "https://github.com/v-3/discordmcp"
     ],
     "env": {
      "DISCORD_TOKEN": null
     }
    }
   ],
   "variables": {
    "DISCORD_TOKEN": {
     "description": "The Discord bot token required for authentication and to interact with Discord's API.",
     "required": true,
     "example": "your_discord_bot_token_here"
    }
   }
  },
  "airflow": {
   "displayName": "Apache Airflow",
   "description": "A MCP Server that connects to [Apache Airflow](https://airflow.apache.org/) using official python client.",
   "categories": [
    "Dev Tools"
   ],
   "tags": [
    "Apache Airflow",
    "DAG",
    "Workflow",
    "Data Pipeline"
   ],
   "repository": "https://github.com/yangkyeongmo/mcp-server-apache-airflow",
   "homepage": "https://github.com/yangkyeongmo/mcp-server-apache-airflow",
   "official": false,
   "methods": [
    {
     "type": "uvx",
     "command": "uvx",
     "args": [
      "mcp-server-apache-airflow"
     ],
     "env": {
      "AIRFLOW_HOST": null,
      "AIRFLOW_USERNAME": null,
      "AIRFLOW_PASSWORD": null
     }
    }
   ],
   "variables": {
    "AIRFLOW_HOST": {
     "description": "URL of your Apache Airflow instance",
     "required": true,
     "example": "https://your-airflow-host:8080"
    },
    "AIRFLOW_USERNAME": {
     "description": "Username for authenticating with Airflow",
     "required": true,
     "example": "admin"
    },
    "AIRFLOW_PASSWORD": {
     "description": "Password for authenticating with Airflow",
     "required": true,
     "example": "your_secure_password"
    }
   }
  },
  "volcengine-tos": {
   "displayName": "VolcEngine TOS",
   "description": "A sample MCP server for VolcEngine TOS that flexibly get objects from TOS.",
   "categories": [
    "System Tools"
   ],
   "tags": [
    "TOS",
    "Volcengine",
    "Data"
   ],
   "repository": "https://github.com/dinghuazhou/sample-mcp-server-tos",
   "homepage": "https://github.com/dinghuazhou/sample-mcp-server-tos",
   "official": false,
   "methods": [
    {
     "type": "uvx",
     "command": "uvx",
     "args": [
      "--from",
      "git+https://github.com/dinghuazhou/sample-mcp-server-tos",
      "tos-mcp-server"
     ],
     "env": {}
    }
   ],
   "variables": {}
  },
  "mcp-server-milvus": {
   "displayName": "MCP Server for Milvus",
   "description": "This repository contains a MCP server that provides access to Milvus vector database functionality.",
   "categories": [
    "Databases"
   ],
   "tags": [
    "milvus",
    "vector database",
    "mcp",
    "model context protocol"
   ],
   "repository": "https://github.com/zilliztech/mcp-server-milvus",
   "homepage": "https://github.com/zilliztech/mcp-server-milvus",
   "official": true,
   "methods": [
    {
     "type": "uvx",
     "command": "uvx",
     "args": [
      "--from",
      "git+https://github.com/zilliztech/mcp-server-milvus",
      "mcp-server-milvus"
     ],
     "env": {}
    }
   ],
   "variables": {
    "milvus-uri": {
     "description": "Milvus server URI",
     "required": true,
     "example": "http://localhost:19530"
    },
    "milvus-token": {
     "description": "Optional authentication token",
     "required": false,
     "example": "[NOT GIVEN]"
    },
    "milvus-db": {
     "description": "Database name",
     "required": false,
     "example": "default"
    }
   }
  },
  "opencti": {
   "displayName": "OpenCTI",
   "description": "Interact with OpenCTI platform to retrieve threat intelligence data including reports, indicators, malware and threat actors.",
   "categories": [
    "Knowledge Base"
   ],
   "tags": [
    "OpenCTI",
    "Threat Intelligence"
   ],
   "repository": "https://github.com/Spathodea-Network/opencti-mcp",
   "homepage": "https://github.com/Spathodea-Network/opencti-mcp",
   "official": false,
   "methods": [
    {
     "type": "npm",
     "command": "npx",
     "args": [
      "-y",
      "https://github.com/Spathodea-Network/opencti-mcp"
     ],
     "env": {
      "OPENCTI_URL": null,
      "OPENCTI_TOKEN": null
     }
    }
   ],
   "variables": {
    "OPENCTI_URL": {
     "description": "Your OpenCTI instance URL",
     "required": true,
     "example": ""
    },
    "OPENCTI_TOKEN": {
     "description": "Your OpenCTI API token",
     "required": true,
     "example": ""
    }
   }
  },
  "arangodb": {
   "displayName": "ArangoDB",
   "description": "MCP Server that provides database interaction capabilities through [ArangoDB](https://arangodb.com/).",
   "categories": [
    "Databases"
   ],
   "tags": [
    "ArangoDB",
    "TypeScript"
   ],
   "repository": "https://github.com/ravenwits/mcp-server-arangodb",
   "homepage": "https://github.com/ravenwits/mcp-server-arangodb",
   "official": false,
   "methods": [
    {
     "type": "npm",
     "command": "npx",
     "args": [
      "-y",
      "https://github.com/ravenwits/mcp-server-arangodb"
     ],
     "env": {
      "ARANGO_URL": null,
      "ARANGO_DATABASE": null,
      "ARANGO_USERNAME": null,
      "ARANGO_PASSWORD": null
     }
    }
   ],
   "variables": {
    "ARANGO_URL": {
     "description": "ArangoDB server URL (note: 8529 is the default port for ArangoDB for local development)",
     "required": true,
     "example": ""
    },
    "ARANGO_DATABASE": {
     "description": "Database name",
     "required": true,
     "example": ""
    },
    "ARANGO_USERNAME": {
     "description": "Database user",
     "required": true,
     "example": ""
    },
    "ARANGO_PASSWORD": {
     "description": "Database password",
     "required": true,
     "example": ""
    }
   }
  },
  "elasticsearch": {
   "displayName": "Elasticsearch",
   "description": "MCP server implementation that provides Elasticsearch interaction.",
   "categories": [
    "Databases"
   ],
   "tags": [
    "elasticsearch",
    "server"
   ],
   "repository": "https://github.com/cr7258/elasticsearch-mcp-server",
   "homepage": "https://github.com/cr7258/elasticsearch-mcp-server",
   "official": false,
   "methods": [
    {
     "type": "uvx",
     "command": "uvx",
     "args": [
      "elasticsearch-mcp-server"
     ],
     "env": {
      "ELASTIC_HOST": null,
      "ELASTIC_USERNAME": null,
      "ELASTIC_PASSWORD": null
     }
    }
   ],
   "variables": {
    "ELASTIC_HOST": {
     "description": "The host URL of the Elasticsearch server.",
     "required": true,
     "example": "https://localhost:9200"
    },
    "ELASTIC_USERNAME": {
     "description": "The username for authenticating with the Elasticsearch server.",
     "required": true,
     "example": "elastic"
    },
    "ELASTIC_PASSWORD": {
     "description": "The password for authenticating with the Elasticsearch server.",
     "required": true,
     "example": "test123"
    }
   }
  },
  "logfire-mcp": {
   "displayName": "Logfire MCP Server",
   "description": "This repository contains a Model Context Protocol (MCP) server with tools that can access the OpenTelemetry traces and",
   "categories": [
    "Dev Tools"
   ],
   "tags": [
    "OpenTelemetry",
    "traces",
    "metrics",
    "logging",
    "monitoring"
   ],
   "repository": "https://github.com/pydantic/logfire-mcp",
   "homepage": "https://logfire.pydantic.dev",
   "official": true,
   "methods": [
    {
     "type": "uvx",
     "command": "uvx",
     "args": [
      "logfire-mcp"
     ],
     "env": {
      "LOGFIRE_READ_TOKEN": "YOUR_READ_TOKEN"
     }
    }
   ],
   "variables": {
    "read_token": {
     "description": "Logfire read token for accessing the Logfire APIs",
     "required": true,
     "example": "YOUR_READ_TOKEN"
    },
    "base_url": {
     "description": "Base URL for the Logfire API (defaults to https://logfire-api.pydantic.dev)",
     "required": false,
     "example": "https://your-logfire-instance.com"
    }
   }
  },
  "goal-story": {
   "displayName": "Goal Story",
   "description": "a Goal Tracker and Visualization Tool for personal and professional development.",
   "categories": [
    "Productivity"
   ],
   "tags": [
    "goal tracking",
    "storytelling",
    "AI"
   ],
   "repository": "https://github.com/hichana/goalstory-mcp",
   "homepage": "https://github.com/hichana/goalstory-mcp",
   "official": false,
   "methods": [
    {
     "type": "npm",
     "command": "npx",
     "args": [
      "-y",
      "goalstory-mcp",
      "https://prod-goalstory-rqc2.encr.app",
      "${YOUR_API_KEY}"
     ],
     "env": {}
    }
   ],
   "variables": {
    "YOUR_API_KEY": {
     "description": "The API key required to authenticate your requests to the Goal Story service.",
     "required": true,
     "example": "abcdefgh12345678"
    }
   }
  },
  "heurist-mesh-agent": {
   "displayName": "Mesh Agent",
   "description": "Access specialized web3 AI agents for blockchain analysis, smart contract security, token metrics, and blockchain interactions through the [Heurist Mesh network](https://github.com/heurist-network/heurist-agent-framework/tree/main/mesh).",
   "categories": [
    "Finance"
   ],
   "tags": [
    "Heurist",
    "Agent Framework",
    "Blockchain Tools"
   ],
   "repository": "https://github.com/heurist-network/heurist-mesh-mcp-server",
   "homepage": "https://github.com/heurist-network/heurist-mesh-mcp-server",
   "official": false,
   "methods": [
    {
     "type": "uvx",
     "command": "uvx",
     "args": [
      "--from",
      "git+https://github.com/heurist-network/heurist-mesh-mcp-server",
      "mesh-tool-server"
     ],
     "env": {
      "HEURIST_API_KEY": null
     }
    }
   ],
   "variables": {
    "HEURIST_API_KEY": {
     "description": "API key for accessing the Heurist services.",
     "required": true,
     "example": "your-api-key-here"
    }
   }
  },
  "json": {
   "displayName": "JSON Model Context Protocol",
   "description": "JSON handling and processing server with advanced query capabilities using JSONPath syntax and support for array, string, numeric, and date operations.",
   "categories": [
    "Dev Tools"
   ],
   "tags": [
    "json",
    "data querying",
    "standardized tools"
   ],
   "repository": "https://github.com/GongRzhe/JSON-MCP-Server",
   "homepage": "https://github.com/GongRzhe/JSON-MCP-Server",
   "official": false,
   "methods": [
    {
     "type": "npm",
     "command": "npx",
     "args": [
      "@gongrzhe/server-json-mcp@1.0.3"
     ],
     "env": {}
    }
   ],
   "variables": {}
  },
  "algorand": {
   "displayName": "Algorand Implementation",
   "description": "A comprehensive MCP server for tooling interactions (40+) and resource accessibility (60+) plus many useful prompts for interacting with the Algorand blockchain.",
   "categories": [
    "Finance"
   ],
   "tags": [
    "Algorand",
    "Blockchain"
   ],
   "repository": "https://github.com/GoPlausible/algorand-mcp",
   "homepage": "https://github.com/GoPlausible/algorand-mcp",
   "official": false,
   "methods": [
    {
     "type": "npm",
     "command": "npx",
     "args": [
      "-y",
      "algorand-mcp"
     ],
     "env": {
      "NFD_API_KEY": null,
      "NFD_API_URL": null,
      "ALGORAND_ALGOD": null,
      "ALGORAND_TOKEN": null,
      "ALGORAND_INDEXER": null,
      "ALGORAND_INDEXER_API": null,
      "ALGORAND_INDEXER_PORT": null,
      "ALGORAND_NETWORK": null
     }
    }
   ],
   "variables": {
    "NFD_API_KEY": {
     "description": "API key for the NFD service, required for accessing domain functionalities.",
     "required": true,
     "example": "your_nfd_api_key_here"
    },
    "NFD_API_URL": {
     "description": "The URL endpoint for the NFD API service.",
     "required": false,
     "example": "https://api.nf.domains"
    },
    "ALGORAND_ALGOD": {
     "description": "The URL endpoint for the Algorand Algod node.",
     "required": true,
     "example": "https://testnet-api.algonode.cloud"
    },
    "ALGORAND_TOKEN": {
     "description": "The token required to interact with the Algorand Algod node, usually a blank string for testnets.",
     "required": false,
     "example": ""
    },
    "ALGORAND_INDEXER": {
     "description": "The URL endpoint for the Algorand Indexer service.",
     "required": true,
     "example": "https://testnet-idx.algonode.cloud"
    },
    "ALGORAND_INDEXER_API": {
     "description": "The API endpoint for accessing Algorand indexer functionalities.",
     "required": false,
     "example": "https://testnet-idx.algonode.cloud/v2"
    },
    "ALGORAND_INDEXER_PORT": {
     "description": "The port for the Algorand indexer service, usually left blank for default settings.",
     "required": false,
     "example": ""
    },
    "ALGORAND_NETWORK": {
     "description": "The network type being used (e.g., testnet or mainnet).",
     "required": true,
     "example": "testnet"
    }
   }
  },
  "mcp-aiven": {
   "displayName": "Aiven MCP Server",
   "description": "A [Model Context Protocol](https://modelcontextprotocol.io/) (MCP) server for Aiven.",
   "categories": [
    "Databases"
   ],
   "tags": [
    "PostgreSQL",
    "Kafka",
    "ClickHouse",
    "Valkey",
    "OpenSearch"
   ],
   "repository": "https://github.com/Aiven-Open/mcp-aiven",
   "homepage": "[NOT GIVEN]",
   "official": true,
   "methods": [
    {
     "type": "uvx",
     "command": "uvx",
     "args": [
      "--from",
      "git+https://github.com/Aiven-Open/mcp-aiven.git",
      "mcp-aiven"
     ],
     "env": {
      "AIVEN_BASE_URL": "https://api.aiven.io",
      "AIVEN_TOKEN": "$AIVEN_TOKEN"
     }
    }
   ],
   "variables": {
    "AIVEN_BASE_URL": {
     "description": "The Aiven API url",
     "required": true,
     "example": "https://api.aiven.io"
    },
    "AIVEN_TOKEN": {
     "description": "The authentication token",
     "required": true,
     "example": "$AIVEN_TOKEN"
    }
   }
  },
  "keycloak-mcp": {
   "displayName": "Keycloak Model Context Protocol",
   "description": "This MCP server enables natural language interaction with Keycloak for user and realm management including creating, deleting, and listing users and realms.",
   "categories": [
    "System Tools"
   ],
   "tags": [
    "Keycloak",
    "User Management",
    "Realm Management"
   ],
   "repository": "https://github.com/ChristophEnglisch/keycloak-model-context-protocol",
   "homepage": "https://github.com/ChristophEnglisch/keycloak-model-context-protocol",
   "official": false,
   "methods": [
    {
     "type": "npm",
     "command": "npx",
     "args": [
      "-y",
      "keycloak-model-context-protocol"
     ],
     "env": {
      "KEYCLOAK_URL": null,
      "KEYCLOAK_ADMIN": null,
      "KEYCLOAK_ADMIN_PASSWORD": null
     }
    }
   ],
   "variables": {
    "KEYCLOAK_URL": {
     "description": "The URL of the Keycloak server instance that the MCP will connect to.",
     "required": true,
     "example": "http://localhost:8080"
    },
    "KEYCLOAK_ADMIN": {
     "description": "The admin username for accessing the Keycloak server.",
     "required": true,
     "example": "admin"
    },
    "KEYCLOAK_ADMIN_PASSWORD": {
     "description": "The password for the admin user to access the Keycloak server.",
     "required": true,
     "example": "admin"
    }
   }
  },
  "coin-api-mcp": {
   "displayName": "Coin API",
   "description": "Provides access to [coinmarketcap](https://coinmarketcap.com/) cryptocurrency data.",
   "categories": [
    "Finance"
   ],
   "tags": [
    "CoinMarketCap",
    "Cryptocurrency",
    "Data"
   ],
   "repository": "https://github.com/longmans/coin_api_mcp",
   "homepage": "https://github.com/longmans/coin_api_mcp",
   "official": false,
   "methods": [
    {
     "type": "uvx",
     "command": "uvx",
     "args": [
      "--from",
      "git+https://github.com/longmans/coin_api_mcp",
      "coin-api"
     ],
     "env": {
      "COINMARKETCAP_API_KEY": null
     }
    }
   ],
   "variables": {
    "COINMARKETCAP_API_KEY": {
     "description": "The API key required to access CoinMarketCap data.",
     "required": true,
     "example": "your_api_key_here"
    }
   }
  },
  "pif": {
   "displayName": "PIF Framework",
   "description": "A Personal Intelligence Framework (PIF), providing tools for file operations, structured reasoning, and journal-based documentation to support continuity and evolving human-AI collaboration across sessions.",
   "categories": [
    "Knowledge Base"
   ],
   "tags": [
    "PIF",
    "TypeScript",
    "Node.js"
   ],
   "repository": "https://github.com/hungryrobot1/MCP-PIF",
   "homepage": "https://github.com/hungryrobot1/MCP-PIF",
   "official": false,
   "methods": [
    {
     "type": "npm",
     "command": "npx",
     "args": [
      "-y",
      "https://github.com/hungryrobot1/MCP-PIF"
     ],
     "env": {}
    }
   ],
   "variables": {
    "MCP_WORKSPACE_ROOT": {
     "description": "Environment variable to specify a workspace location for the server.",
     "required": false,
     "example": "/path/to/workspace"
    },
    "MCP_CONFIG": {
     "description": "Environment variable containing a JSON string of configuration options for the server.",
     "required": false,
     "example": "{\"key\": \"value\"}"
    }
   }
  },
  "graphql-schema": {
   "displayName": "GraphQL Schema Model Context Protocol",
   "description": "Allow LLMs to explore large GraphQL schemas without bloating the context.",
   "categories": [
    "Dev Tools"
   ],
   "tags": [
    "GraphQL",
    "LLMs",
    "Schema",
    "API"
   ],
   "repository": "https://github.com/hannesj/mcp-graphql-schema",
   "homepage": "https://github.com/hannesj/mcp-graphql-schema",
   "official": false,
   "methods": [
    {
     "type": "npm",
     "command": "npx",
     "args": [
      "-y",
      "mcp-graphql-schema",
      "/ABSOLUTE/PATH/TO/schema.graphqls"
     ],
     "env": {}
    }
   ],
   "variables": {}
  },
  "hyperbrowser": {
   "displayName": "Hyperbrowser MCP Server",
   "description": "This is Hyperbrowser's Model Context Protocol (MCP) Server. It provides various tools to scrape, extract structured data, and crawl webpages. It also provides easy access to general purpose browser agents like OpenAI's CUA, Anthropic's Cla…",
   "categories": [
    "Web Services"
   ],
   "tags": [
    "browser",
    "web",
    "scraping",
    "crawling",
    "automation"
   ],
   "repository": "https://github.com/hyperbrowserai/mcp",
   "homepage": "https://docs.hyperbrowser.ai/",
   "official": true,
   "methods": [
    {
     "type": "npm",
     "command": "npx",
     "args": [
      "hyperbrowser-mcp",
      "${HYPERBROWSER_API_KEY}"
     ],
     "env": {}
    },
    {
     "type": "custom",
     "command": "node",
     "args": [
      "dist/server.js"
     ],
     "env": {}
    }
   ],
   "variables": {
    "HYPERBROWSER_API_KEY": {
     "description": "Your Hyperbrowser API key",
     "required": true,
     "example": "YOUR-API-KEY"
    }
   }
  },
  "magic-mcp": {
   "displayName": "21st.dev Magic AI Agent",
   "description": "Magic Component Platform (MCP) is a powerful AI-driven tool that helps developers create beautiful, modern UI components instantly through natural language descriptions. It integrates seamlessly with popular IDEs and provides a streamlined…",
   "categories": [
    "Dev Tools"
   ],
   "tags": [
    "ui",
    "components",
    "ai",
    "generator",
    "react"
   ],
   "repository": "https://github.com/21st-dev/magic-mcp",
   "homepage": "https://21st.dev/magic",
   "official": true,
   "methods": [
    {
     "type": "npm",
     "command": "npx",
     "args": [
      "-y",
      "@21st-dev/magic@latest",
      "API_KEY=\"your-api-key\""
     ],
     "env": {
      "API_KEY": "your-api-key"
     }
    },
    {
     "type": "cli",
     "command": "npx",
     "args": [
      "@21st-dev/cli@latest",
      "install",
      "<client>",
      "--api-key",
      "<key>"
     ],
     "env": {}
    }
   ],
   "variables": {
    "API_KEY": {
     "description": "API key for authentication with Magic AI Agent",
     "required": true,
     "example": "your-api-key"
    }
   }
  },
  "onchain-mcp": {
   "displayName": "Bankless Onchain MCP Server",
   "description": "MCP (Model Context Protocol) server for blockchain data interaction through the Bankless API.",
   "categories": [
    "Finance"
   ],
   "tags": [
    "blockchain",
    "MCP",
    "smart contracts",
    "ethereum",
    "onchain"
   ],
   "repository": "https://github.com/bankless/onchain-mcp",
   "homepage": "https://docs.bankless.com/bankless-api/other-services/onchain-mcp",
   "official": true,
   "methods": [
    {
     "type": "npm",
     "command": "npx",
     "args": [
      "@bankless/onchain-mcp"
     ],
     "env": {
      "BANKLESS_API_TOKEN": "your_api_token_here"
     }
    }
   ],
   "variables": {
    "BANKLESS_API_TOKEN": {
     "description": "API token for Bankless API authentication",
     "required": true,
     "example": "your_api_token_here"
    }
   }
  },
  "lightdash": {
   "displayName": "Lightdash",
   "description": "Interact with [Lightdash](https://www.lightdash.com/), a BI tool.",
   "categories": [
    "Analytics"
   ],
   "tags": [
    "Lightdash",
    "AI"
   ],
   "repository": "https://github.com/syucream/lightdash-mcp-server",
   "homepage": "https://github.com/syucream/lightdash-mcp-server",
   "official": false,
   "methods": [
    {
     "type": "npm",
     "command": "npx",
     "args": [
      "-y",
      "lightdash-mcp-server"
     ],
     "env": {
      "LIGHTDASH_API_KEY": null,
      "LIGHTDASH_API_URL": null
     }
    }
   ],
   "variables": {
    "LIGHTDASH_API_KEY": {
     "description": "Your Lightdash PAT (Personal Access Token) required for authenticating API requests.",
     "required": true,
     "example": "your_personal_access_token_here"
    },
    "LIGHTDASH_API_URL": {
     "description": "The base URL for the Lightdash API that you are connecting to.",
     "required": true,
     "example": "https://your.base.url"
    }
   }
  },
  "goodnews": {
   "displayName": "Goodnews",
   "description": "A simple MCP server that delivers curated positive and uplifting news stories.",
   "categories": [
    "Web Services"
   ],
   "tags": [
    "positive news",
    "uplifting",
    "Cohere",
    "NewsAPI"
   ],
   "repository": "https://github.com/VectorInstitute/mcp-goodnews",
   "homepage": "https://github.com/VectorInstitute/mcp-goodnews",
   "official": false,
   "methods": [
    {
     "type": "uvx",
     "command": "uvx",
     "args": [
      "--from",
      "git+https://github.com/VectorInstitute/mcp-goodnews",
      "server.py"
     ],
     "env": {
      "NEWS_API_KEY": "<newsapi-api-key>",
      "COHERE_API_KEY": "<cohere-api-key>"
     }
    }
   ],
   "variables": {
    "NEWS_API_KEY": {
     "description": "API key for NewsAPI to fetch news articles",
     "required": true,
     "example": "your_newsapi_key_here"
    },
    "COHERE_API_KEY": {
     "description": "API key for Cohere to analyze sentiment of news articles",
     "required": true,
     "example": "your_cohere_api_key_here"
    }
   }
  },
  "oxylabs-mcp": {
   "displayName": "Oxylabs Scraper",
   "description": "A Model Context Protocol (MCP) server that enables AI assistants like Claude to seamlessly access web data through Oxylabs' powerful web scraping technology.",
   "categories": [
    "Web Services"
   ],
   "tags": [
    "web scraping",
    "data extraction",
    "web unblocker"
   ],
   "repository": "https://github.com/oxylabs/oxylabs-mcp",
   "homepage": "https://github.com/oxylabs/oxylabs-mcp",
   "official": true,
   "methods": [
    {
     "type": "uvx",
     "command": "uvx",
     "args": [
      "oxylabs-mcp"
     ],
     "env": {
      "OXYLABS_USERNAME": "YOUR_USERNAME_HERE",
      "OXYLABS_PASSWORD": "YOUR_PASSWORD_HERE"
     }
    }
   ],
   "variables": {
    "url": {
     "description": "The URL to scrape",
     "required": true,
     "example": "https://www.google.com/search?q=ai"
    },
    "parse": {
     "description": "Enable structured data extraction",
     "required": false,
     "example": "True"
    },
    "render": {
     "description": "Use headless browser rendering",
     "required": false,
     "example": "html"
    }
   }
  },
  "postman": {
   "displayName": "Postman",
   "description": "MCP server for running Postman Collections locally via Newman. Allows for simple execution of Postman Server and returns the results of whether the collection passed all the tests.",
   "categories": [
    "Dev Tools"
   ],
   "tags": [
    "Postman",
    "Newman",
    "API"
   ],
   "repository": "https://github.com/shannonlal/mcp-postman",
   "homepage": "https://github.com/shannonlal/mcp-postman",
   "official": false,
   "methods": [
    {
     "type": "npm",
     "command": "npx",
     "args": [
      "-y",
      "https://github.com/shannonlal/mcp-postman"
     ],
     "env": {}
    }
   ],
   "variables": {}
  },
  "reaper": {
   "displayName": "Reaper",
   "description": "Interact with your [Reaper](https://www.reaper.fm/) (Digital Audio Workstation) projects.",
   "categories": [
    "Media Creation"
   ],
   "tags": [
    "Reaper",
    "Claude"
   ],
   "repository": "https://github.com/dschuler36/reaper-mcp-server",
   "homepage": "https://github.com/dschuler36/reaper-mcp-server",
   "official": false,
   "methods": [
    {
     "type": "uvx",
     "command": "uvx",
     "args": [
      "--from",
      "git+https://github.com/dschuler36/reaper-mcp-server",
      "reaper-mcp-server",
      "--reaper-projects-dir",
      "${REAPER_PROJECTS_DIR}"
     ],
     "env": {}
    }
   ],
   "variables": {
    "REAPER_PROJECTS_DIR": {
     "description": "The directory where Reaper projects are stored, allowing the MCP server to find and interact with them.",
     "required": true,
     "example": "/path/to/reaper/projects"
    }
   }
  },
  "hyperliquid": {
   "displayName": "Hyperliquid",
   "description": "An MCP server implementation that integrates the Hyperliquid SDK for exchange data.",
   "categories": [
    "Finance"
   ],
   "tags": [
    "Hyperliquid",
    "Exchange"
   ],
   "repository": "https://github.com/mektigboy/server-hyperliquid",
   "homepage": "https://github.com/mektigboy/server-hyperliquid",
   "official": false,
   "methods": [
    {
     "type": "npm",
     "command": "npx",
     "args": [
      "-y",
      "@mektigboy/server-hyperliquid"
     ],
     "env": {}
    }
   ],
   "variables": {}
  },
  "evm-mcp-server": {
   "displayName": "EVM Server",
   "description": "Comprehensive blockchain services for 30+ EVM networks, supporting native tokens, ERC20, NFTs, smart contracts, transactions, and ENS resolution.",
   "categories": [
    "Finance"
   ],
   "tags": [
    "Ethereum",
    "Smart Contracts",
    "AI",
    "Token Transfers",
    "NFTs"
   ],
   "repository": "https://github.com/mcpdotdirect/evm-mcp-server",
   "homepage": "https://github.com/mcpdotdirect/evm-mcp-server",
   "official": false,
   "methods": [
    {
     "type": "npm",
     "command": "npx",
     "args": [
      "-y",
      "@mcpdotdirect/evm-mcp-server"
     ],
     "env": {}
    }
   ],
   "variables": {}
  },
  "neovim": {
   "displayName": "Neovim Server",
   "description": "An MCP Server for your Neovim session.",
   "categories": [
    "Dev Tools"
   ],
   "tags": [
    "Neovim",
    "MCP",
    "Claude Desktop"
   ],
   "repository": "https://github.com/bigcodegen/mcp-neovim-server",
   "homepage": "https://github.com/bigcodegen/mcp-neovim-server",
   "official": false,
   "methods": [
    {
     "type": "npm",
     "command": "npx",
     "args": [
      "-y",
      "mcp-neovim-server"
     ],
     "env": {
      "ALLOW_SHELL_COMMANDS": null,
      "NVIM_SOCKET_PATH": null
     }
    }
   ],
   "variables": {
    "ALLOW_SHELL_COMMANDS": {
     "description": "Set to 'true' to enable shell command execution (e.g. `!ls`).",
     "required": false,
     "example": "true"
    },
    "NVIM_SOCKET_PATH": {
     "description": "Set to the path of your Neovim socket.",
     "required": false,
     "example": "/tmp/nvim"
    }
   }
  },
  "aws-resources-operations": {
   "displayName": "AWS Resources",
   "description": "Run generated python code to securely query or modify any AWS resources supported by boto3.",
   "categories": [
    "Dev Tools"
   ],
   "tags": [
    "AWS",
    "Docker",
    "boto3"
   ],
   "repository": "https://github.com/baryhuang/mcp-server-aws-resources-python",
   "homepage": "https://github.com/baryhuang/mcp-server-aws-resources-python",
   "official": false,
   "methods": [
    {
     "type": "docker",
     "command": "docker",
     "args": [
      "run",
      "-i",
      "--rm",
      "-e",
      "AWS_ACCESS_KEY_ID=${AWS_ACCESS_KEY_ID}",
      "-e",
      "AWS_SECRET_ACCESS_KEY=${AWS_SECRET_ACCESS_KEY}",
      "-e",
      "AWS_DEFAULT_REGION=${AWS_DEFAULT_REGION}",
      "buryhuang/mcp-server-aws-resources:latest"
     ],
     "env": {
      "AWS_ACCESS_KEY_ID": null,
      "AWS_SECRET_ACCESS_KEY": null,
      "AWS_DEFAULT_REGION": null
     }
    }
   ],
   "variables": {
    "AWS_ACCESS_KEY_ID": {
     "description": "Your AWS access key.",
     "required": true,
     "example": "your_access_key_id_here"
    },
    "AWS_SECRET_ACCESS_KEY": {
     "description": "Your AWS secret key.",
     "required": true,
     "example": "your_secret_access_key_here"
    },
    "AWS_DEFAULT_REGION": {
     "description": "AWS region to operate in. Defaults to 'us-east-1' if not set.",
     "required": false,
     "example": "us-east-1"
    }
   }
  },
  "filesystem": {
   "displayName": "Filesystem",
   "description": "Secure file operations with configurable access controls",
   "categories": [
    "System Tools"
   ],
   "tags": [
    "Node.js",
    "server",
    "filesystem",
    "operations"
   ],
   "repository": "https://github.com/modelcontextprotocol/servers",
   "homepage": "https://github.com/modelcontextprotocol/servers/blob/main/src/filesystem",
   "official": true,
   "methods": [
    {
     "type": "npm",
     "command": "npx",
     "args": [
      "-y",
      "@modelcontextprotocol/server-filesystem",
      "${USER_FILESYSTEM_DIRECTORY}",
      "${USER_FILESYSTEM_ALLOWED_DIR}"
     ],
     "env": {}
    },
    {
     "type": "docker",
     "command": "docker",
     "args": [
      "run",
      "-i",
      "--rm",
      "--mount",
      "type=bind,src=${USER_FILESYSTEM_DIRECTORY},dst=/projects/Desktop",
      "--mount",
      "type=bind,src=${USER_FILESYSTEM_ALLOWED_DIR},dst=/projects/other/allowed/dir,ro",
      "--mount",
      "type=bind,src=${USER_FILESYSTEM_ALLOWED_FILE},dst=/projects/path/to/file.txt",
      "mcp/filesystem",
      "/projects"
     ],
     "env": {}
    }
   ],
   "variables": {
    "USER_FILESYSTEM_DIRECTORY": {
     "description": "The directory to be mounted in the container",
     "required": true,
     "example": "/Users/username/Desktop"
    },
    "USER_FILESYSTEM_ALLOWED_DIR": {
     "description": "The directory to be mounted in the container",
     "required": true,
     "example": "/Users/username/Desktop"
    }
   }
  },
  "ergo-blockchain-mcp": {
   "displayName": "Ergo Blockchain Explorer",
   "description": "-An MCP server to integrate Ergo Blockchain Node and Explorer APIs for checking address balances, analyzing transactions, viewing transaction history, performing forensic analysis of addresses, searching for tokens, and monitoring network…",
   "categories": [
    "Finance"
   ],
   "tags": [
    "Ergo",
    "Blockchain",
    "Python",
    "API"
   ],
   "repository": "https://github.com/marctheshark3/ergo-mcp",
   "homepage": "https://github.com/marctheshark3/ergo-mcp",
   "official": false,
   "methods": [
    {
     "type": "uvx",
     "command": "uvx",
     "args": [
      "ergo-mcp"
     ],
     "env": {
      "SERVER_HOST": "<YOUR_HOST>",
      "SERVER_PORT": "<YOUR_PORT>",
      "SERVER_WORKERS": "<YOUR_WORKERS>",
      "ERGO_NODE_API": "<YOUR_ERGO_NODE_API>",
      "ERGO_NODE_API_KEY": "<YOUR_ERGO_NODE_API_KEY>"
     }
    }
   ],
   "variables": {
    "SERVER_HOST": {
     "description": "Host to bind the server to (default: 0.0.0.0)",
     "required": false,
     "example": "localhost"
    },
    "SERVER_PORT": {
     "description": "Port to run the server on (default: 3001)",
     "required": false,
     "example": "3001"
    },
    "SERVER_WORKERS": {
     "description": "Number of worker processes (default: 4)",
     "required": false,
     "example": "4"
    },
    "ERGO_NODE_API": {
     "description": "URL of the Ergo node API (for node-specific features)",
     "required": false,
     "example": "http://localhost:8080"
    },
    "ERGO_NODE_API_KEY": {
     "description": "API key for the Ergo node (if required)",
     "required": false,
     "example": "your_api_key"
    }
   }
  },
  "nasa": {
   "displayName": "NASA",
   "description": "Access to a unified gateway of NASA's data sources including but not limited to APOD, NEO, EPIC, GIBS.",
   "categories": [
    "Knowledge Base"
   ],
   "tags": [
    "NASA",
    "API",
    "Data",
    "Space",
    "Science"
   ],
   "repository": "https://github.com/ProgramComputer/NASA-MCP-server",
   "homepage": "https://github.com/ProgramComputer/NASA-MCP-server",
   "official": false,
   "methods": [
    {
     "type": "npm",
     "command": "npx",
     "args": [
      "-y",
      "@programcomputer/nasa-mcp-server"
     ],
     "env": {
      "NASA_API_KEY": null
     }
    }
   ],
   "variables": {
    "NASA_API_KEY": {
     "description": "Your NASA API key (get at api.nasa.gov)",
     "required": false,
     "example": "DEMO_KEY"
    }
   }
  },
  "perplexity": {
   "displayName": "Perplexity Ask MCP Server",
   "description": "An MCP server implementation that integrates the Sonar API to provide Claude with unparalleled real-time, web-wide research.",
   "categories": [
    "Web Services"
   ],
   "tags": [
    "perplexity",
    "search",
    "sonar-api",
    "web-search"
   ],
   "repository": "https://github.com/ppl-ai/modelcontextprotocol",
   "homepage": "https://github.com/ppl-ai/modelcontextprotocol",
   "official": true,
   "methods": [
    {
     "type": "npx",
     "command": "npx",
     "args": [
      "-y",
      "server-perplexity-ask"
     ],
     "env": {
      "PERPLEXITY_API_KEY": "YOUR_API_KEY_HERE"
     }
    },
    {
     "type": "docker",
     "command": "docker",
     "args": [
      "run",
      "-i",
      "--rm",
      "-e",
      "PERPLEXITY_API_KEY",
      "mcp/perplexity-ask"
     ],
     "env": {
      "PERPLEXITY_API_KEY": "YOUR_API_KEY_HERE"
     }
    }
   ],
   "variables": {
    "PERPLEXITY_API_KEY": {
     "description": "API key for the Perplexity Sonar API",
     "required": true,
     "example": "YOUR_API_KEY_HERE"
    }
   }
  },
  "discourse": {
   "displayName": "Discourse",
   "description": "A MCP server to search Discourse posts on a Discourse forum.",
   "categories": [
    "Web Services"
   ],
   "tags": [
    "discourse",
    "search"
   ],
   "repository": "https://github.com/AshDevFr/discourse-mcp-server",
   "homepage": "https://github.com/AshDevFr/discourse-mcp-server",
   "official": false,
   "methods": [
    {
     "type": "npm",
     "command": "npx",
     "args": [
      "-y",
      "@ashdev/discourse-mcp-server"
     ],
     "env": {
      "DISCOURSE_API_URL": null,
      "DISCOURSE_API_KEY": null,
      "DISCOURSE_API_USERNAME": null
     }
    },
    {
     "type": "docker",
     "command": "docker",
     "args": [
      "run",
      "-i",
      "--rm",
      "-e",
      "DISCOURSE_API_URL=${DISCOURSE_API_URL}",
      "-e",
      "DISCOURSE_API_KEY=${DISCOURSE_API_KEY}",
      "-e",
      "DISCOURSE_API_USERNAME=${DISCOURSE_API_USERNAME}",
      "ashdev/discourse-mcp-server"
     ],
     "env": {}
    }
   ],
   "variables": {
    "DISCOURSE_API_URL": {
     "description": "API URL for the Discourse forum that the server will connect to.",
     "required": true,
     "example": "https://try.discourse.org"
    },
    "DISCOURSE_API_KEY": {
     "description": "API key for authenticating to the Discourse forum.",
     "required": true,
     "example": "1234"
    },
    "DISCOURSE_API_USERNAME": {
     "description": "Username for authenticating to the Discourse forum.",
     "required": true,
     "example": "ash"
    }
   }
  },
  "webflow": {
   "displayName": "Webflow",
   "description": "Interfact with the Webflow APIs",
   "categories": [
    "Professional Apps"
   ],
   "tags": [
    "webflow",
    "api"
   ],
   "repository": "https://github.com/kapilduraphe/webflow-mcp-server",
   "homepage": "https://github.com/kapilduraphe/webflow-mcp-server",
   "official": false,
   "methods": [
    {
     "type": "npm",
     "command": "npx",
     "args": [
      "-y",
      "https://github.com/kapilduraphe/webflow-mcp-server"
     ],
     "env": {
      "WEBFLOW_API_TOKEN": null
     }
    }
   ],
   "variables": {
    "WEBFLOW_API_TOKEN": {
     "description": "Your Webflow API token to authenticate requests to the Webflow API. This token is required for the server to function and should be kept se…",
     "required": true,
     "example": "your-api-token"
    }
   }
  },
  "opik": {
   "displayName": "Opik",
   "description": "<div align=\"center\"><b><a href=\"readme.md\">English</a> | <a href=\"readme_CN.md\">简体中文</a> | <a href=\"readme_JP.md\">日本語</a> | <a href=\"readme_KO.md\">한국어</a></b></div>",
   "categories": [
    "MCP Tools"
   ],
   "tags": [
    "llm",
    "evaluation",
    "tracing",
    "monitoring"
   ],
   "repository": "https://github.com/comet-ml/opik",
   "homepage": "https://www.comet.com/site/products/opik/",
   "official": true,
   "methods": [
    {
     "type": "docker",
     "command": "./opik.sh",
     "args": [],
     "env": {}
    },
    {
     "type": "pip",
     "command": "pip",
     "args": [
      "install",
      "opik"
     ],
     "env": {}
    }
   ],
   "variables": {
    "use_local": {
     "description": "Configure SDK to run on local installation",
     "required": false,
     "example": "True"
    }
   }
  },
  "airtable": {
   "displayName": "Airtable",
   "description": "Airtable Model Context Protocol Server.",
   "categories": [
    "Databases"
   ],
   "tags": [
    "Airtable",
    "Database",
    "API"
   ],
   "repository": "https://github.com/felores/airtable-mcp",
   "homepage": "https://github.com/felores/airtable-mcp",
   "official": false,
   "methods": [
    {
     "type": "npm",
     "command": "npx",
     "args": [
      "-y",
      "@felores/airtable-mcp-server"
     ],
     "env": {
      "AIRTABLE_API_KEY": null
     }
    }
   ],
   "variables": {
    "AIRTABLE_API_KEY": {
     "description": "Airtable API key for authenticating with the Airtable API",
     "required": true,
     "example": "pat.xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
    }
   }
  },
  "sequential-thinking": {
   "displayName": "Sequential Thinking",
   "description": "Dynamic and reflective problem-solving through thought sequences",
   "categories": [
    "AI Systems"
   ],
   "tags": [
    "dynamic thinking",
    "reflective process",
    "structured thinking"
   ],
   "repository": "https://github.com/modelcontextprotocol/servers",
   "homepage": "https://github.com/modelcontextprotocol/servers/blob/main/src/sequentialthinking",
   "official": true,
   "methods": [
    {
     "type": "npm",
     "command": "npx",
     "args": [
      "-y",
      "@modelcontextprotocol/server-sequential-thinking"
     ],
     "env": {}
    },
    {
     "type": "docker",
     "command": "docker",
     "args": [
      "run",
      "--rm",
      "-i",
      "mcp/sequentialthinking"
     ],
     "env": {}
    }
   ],
   "variables": {}
  },
  "agentql-mcp": {
   "displayName": "AgentQL MCP Server",
   "description": "This is a Model Context Protocol (MCP) server that integrates [AgentQL](https://agentql.com)'s data extraction capabilities.",
   "categories": [
    "Web Services"
   ],
   "tags": [
    "data extraction",
    "web scraping"
   ],
   "repository": "https://github.com/tinyfish-io/agentql-mcp",
   "homepage": "https://agentql.com",
   "official": true,
   "methods": [
    {
     "type": "npm",
     "command": "npx",
     "args": [
      "-y",
      "agentql-mcp"
     ],
     "env": {
      "AGENTQL_API_KEY": "YOUR_API_KEY"
     }
    },
    {
     "type": "development",
     "command": "/path/to/agentql-mcp/dist/index.js",
     "args": [],
     "env": {
      "AGENTQL_API_KEY": "YOUR_API_KEY"
     }
    }
   ],
   "variables": {
    "AGENTQL_API_KEY": {
     "description": "API key from AgentQL Dev Portal",
     "required": true,
     "example": "YOUR_API_KEY"
    }
   }
  },
  "hdw-linkedin": {
   "displayName": "HDW",
   "description": "Access to profile data and management of user account with [HorizonDataWave.ai](https://horizondatawave.ai/).",
   "categories": [
    "Productivity"
   ],
   "tags": [
    "LinkedIn",
    "API access",
    "Data retrieval",
    "User management"
   ],
   "repository": "https://github.com/horizondatawave/hdw-mcp-server",
   "homepage": "https://github.com/horizondatawave/hdw-mcp-server",
   "official": false,
   "methods": [
    {
     "type": "npm",
     "command": "npx",
     "args": [
      "@horizondatawave/mcp"
     ],
     "env": {
      "HDW_ACCESS_TOKEN": null,
      "HDW_ACCOUNT_ID": null
     }
    }
   ],
   "variables": {
    "HDW_ACCESS_TOKEN": {
     "description": "Access token for HorizonDataWave API, used for authentication and authorization to access user data.",
     "required": true,
     "example": "YOUR_HD_W_ACCESS_TOKEN"
    },
    "HDW_ACCOUNT_ID": {
     "description": "Account ID for HorizonDataWave API, used to identify the user's account.",
     "required": true,
     "example": "YOUR_HD_W_ACCOUNT_ID"
    }
   }
  },
  "unity-integration-advanced": {
   "displayName": "Unity Integration",
   "description": "Advanced Unity3d Game Engine MCP which supports ,Execution of Any Editor Related Code Directly Inside of Unity, Fetch Logs, Get Editor State and Allow File Access of the Project making it much more useful in Script Editing or asset creatio…",
   "categories": [
    "Media Creation"
   ],
   "tags": [
    "Unity",
    "Integration",
    "AI"
   ],
   "repository": "https://github.com/quazaai/UnityMCPIntegration",
   "homepage": "https://github.com/quazaai/UnityMCPIntegration",
   "official": false,
   "methods": [
    {
     "type": "npm",
     "command": "npx",
     "args": [
      "-y",
      "https://github.com/quazaai/UnityMCPIntegration"
     ],
     "env": {
      "MCP_WEBSOCKET_PORT": null
     }
    }
   ],
   "variables": {
    "MCP_WEBSOCKET_PORT": {
     "description": "Environment variable to specify the WebSocket port used by the MCP server.",
     "required": false,
     "example": "5010"
    }
   }
  },
  "playwright": {
   "displayName": "Playwright MCP",
   "description": "A Model Context Protocol (MCP) server that provides browser automation capabilities using [Playwright](https://playwright.dev). This server enables LLMs to interact with web pages through structured accessibility snapshots, bypassing the n…",
   "categories": [
    "Web Services"
   ],
   "tags": [
    "browser automation",
    "web",
    "playwright",
    "accessibility",
    "LLM",
    "MCP"
   ],
   "repository": "https://github.com/microsoft/playwright-mcp",
   "homepage": "https://github.com/microsoft/playwright-mcp",
   "official": true,
   "methods": [
    {
     "type": "npm",
     "command": "npx",
     "args": [
      "@playwright/mcp@latest"
     ],
     "env": {}
    }
   ],
   "variables": {}
  },
  "screenshotone": {
   "displayName": "ScreenshotOne MCP Server",
   "description": "An official implementation of an [MCP (Model Context Protocol)](https://modelcontextprotocol.io/) server for [ScreenshotOne](https://screenshotone.com).",
   "categories": [
    "Web Services"
   ],
   "tags": [
    "screenshot",
    "website",
    "image"
   ],
   "repository": "https://github.com/screenshotone/mcp",
   "homepage": "https://screenshotone.com",
   "official": true,
   "methods": [
    {
     "type": "custom",
     "command": "node",
     "args": [
      "build/index.js"
     ],
     "env": {
      "SCREENSHOTONE_API_KEY": "your_api_key"
     }
    }
   ],
   "variables": {
    "SCREENSHOTONE_API_KEY": {
     "description": "API key for ScreenshotOne service",
     "required": true,
     "example": "<your api key>"
    }
   }
  },
  "mailgun-mcp-server": {
   "displayName": "Mailgun MCP Server",
   "description": "A Model Context Protocol (MCP) server implementation for [Mailgun](https://mailgun.com), enabling MCP-compatible AI clients like Claude Desktop to interract with the service.",
   "categories": [
    "Messaging"
   ],
   "tags": [
    "email",
    "mailgun",
    "mcp"
   ],
   "repository": "https://github.com/mailgun/mailgun-mcp-server",
   "homepage": "https://github.com/mailgun/mailgun-mcp-server",
   "official": true,
   "methods": [
    {
     "type": "custom",
     "command": "node",
     "args": [
      "path/to/mailgun-mcp-server/src/mailgun-mcp.js"
     ],
     "env": {
      "MAILGUN_API_KEY": "YOUR-mailgun-api-key"
     }
    }
   ],
   "variables": {
    "MAILGUN_API_KEY": {
     "description": "Your Mailgun API key",
     "required": true,
     "example": "YOUR-mailgun-api-key"
    }
   }
  },
  "productboard": {
   "displayName": "Productboard",
   "description": "Integrate the Productboard API into agentic workflows via MCP.",
   "categories": [
    "Productivity"
   ],
   "tags": [
    "Productboard",
    "API"
   ],
   "repository": "https://github.com/kenjihikmatullah/productboard-mcp",
   "homepage": "https://github.com/kenjihikmatullah/productboard-mcp",
   "official": false,
   "methods": [
    {
     "type": "npm",
     "command": "npx",
     "args": [
      "-y",
      "productboard-mcp"
     ],
     "env": {
      "PRODUCTBOARD_ACCESS_TOKEN": "<YOUR_TOKEN>"
     }
    }
   ],
   "variables": {
    "PRODUCTBOARD_ACCESS_TOKEN": {
     "description": "An access token needed to authenticate with the Productboard API. This token is required to make requests to the API and must be kept confi…",
     "required": true,
     "example": "your_access_token_here"
    }
   }
  },
  "qwen-max": {
   "displayName": "Qwen Max",
   "description": "A Model Context Protocol (MCP) server implementation for the Qwen models.",
   "categories": [
    "AI Systems"
   ],
   "tags": [
    "Qwen Max",
    "Server"
   ],
   "repository": "https://github.com/66julienmartin/MCP-server-Qwen_Max",
   "homepage": "https://github.com/66julienmartin/MCP-server-Qwen_Max",
   "official": false,
   "methods": [
    {
     "type": "npm",
     "command": "npx",
     "args": [
      "-y",
      "@gongrzhe/quickchart-mcp-server"
     ],
     "env": {}
    }
   ],
   "variables": {
    "DASHSCOPE_API_KEY": {
     "description": "API key required for authentication with the Dashscope service.",
     "required": true,
     "example": "your-api-key-here"
    }
   }
  },
  "inkeep": {
   "displayName": "Inkeep MCP Server",
   "description": "Inkeep MCP Server powered by your docs and product content.",
   "categories": [
    "Knowledge Base"
   ],
   "tags": [
    "rag",
    "documentation",
    "product content"
   ],
   "repository": "https://github.com/inkeep/mcp-server-python",
   "homepage": "https://inkeep.com",
   "official": true,
   "methods": [
    {
     "type": "custom",
     "command": "uv",
     "args": [
      "--directory",
      "<YOUR_INKEEP_MCP_SERVER_ABSOLUTE_PATH>",
      "run",
      "-m",
      "inkeep_mcp_server"
     ],
     "env": {
      "INKEEP_API_BASE_URL": "https://api.inkeep.com/v1",
      "INKEEP_API_KEY": "<YOUR_INKEEP_API_KEY>",
      "INKEEP_API_MODEL": "inkeep-rag",
      "INKEEP_MCP_TOOL_NAME": "search-product-content",
      "INKEEP_MCP_TOOL_DESCRIPTION": "Retrieves product documentation about Inkeep. The query should be framed as a conversational question about Inkeep."
     }
    }
   ],
   "variables": {
    "INKEEP_API_BASE_URL": {
     "description": "Base URL for the Inkeep API",
     "required": true,
     "example": "https://api.inkeep.com/v1"
    },
    "INKEEP_API_KEY": {
     "description": "API key for authenticating with Inkeep",
     "required": true,
     "example": "<YOUR_INKEEP_API_KEY>"
    },
    "INKEEP_API_MODEL": {
     "description": "The Inkeep model to use",
     "required": true,
     "example": "inkeep-rag"
    },
    "INKEEP_MCP_TOOL_NAME": {
     "description": "Name of the MCP tool",
     "required": true,
     "example": "search-product-content"
    },
    "INKEEP_MCP_TOOL_DESCRIPTION": {
     "description": "Description of the MCP tool",
     "required": true,
     "example": "Retrieves product documentation about Inkeep. The query should be framed as a c…"
    }
   }
  },
  "mcp-neo4j-aura-api": {
   "displayName": "Neo4j MCP (Aura API)",
   "description": "Neo4j graph database server (schema + read/write-cypher) and separate graph database backed memory",
   "categories": [
    "Databases"
   ],
   "tags": [
    "neo4j",
    "mcp",
    "knowledge graph",
    "aura"
   ],
   "repository": "https://github.com/neo4j-contrib/mcp-neo4j",
   "homepage": "https://github.com/neo4j-contrib/mcp-neo4j",
   "official": true,
   "methods": [
    {
     "type": "uvx",
     "command": "uvx",
     "args": [
      "mcp-neo4j-aura-manager",
      "--client-id",
      "${NEO4J_CLIENT_ID}",
      "--client-secret",
      "${NEO4J_CLIENT_SECRET}"
     ],
     "env": {}
    }
   ],
   "variables": {
    "NEO4J_CLIENT_ID": {
     "description": "Neo4j client ID",
     "required": true,
     "example": "<client_id>"
    },
    "NEO4J_CLIENT_SECRET": {
     "description": "Neo4j client secret",
     "required": true,
     "example": "<client_secret>"
    }
   }
  },
  "mcp-oceanbase": {
   "displayName": "OceanBase MCP Server",
   "description": "MCP Server for OceanBase database and its tools",
   "categories": [
    "Databases"
   ],
   "tags": [
    "database",
    "OceanBase"
   ],
   "repository": "https://github.com/oceanbase/mcp-oceanbase",
   "homepage": "https://github.com/oceanbase/mcp-oceanbase",
   "official": true,
   "methods": [
    {
     "type": "uvx",
     "command": "uvx",
     "args": [
      "--from",
      "git+https://github.com/oceanbase/mcp-oceanbase",
      "oceanbase_mcp_server"
     ],
     "env": {
      "OB_HOST": null,
      "OB_PORT": null,
      "OB_USER": null,
      "OB_PASSWORD": null,
      "OB_DATABASE": null
     }
    }
   ],
   "variables": {
    "OB_HOST": {
     "description": "Database host for connecting to the OceanBase server.",
     "required": true,
     "example": "localhost"
    },
    "OB_PORT": {
     "description": "Optional: Database port to connect to OceanBase, defaults to 2881 if not specified.",
     "required": false,
     "example": "2881"
    },
    "OB_USER": {
     "description": "Username for authenticating with the OceanBase database.",
     "required": true,
     "example": "your_username"
    },
    "OB_PASSWORD": {
     "description": "Password for the specified database user.",
     "required": true,
     "example": "your_password"
    },
    "OB_DATABASE": {
     "description": "Name of the OceanBase database to connect to.",
     "required": true,
     "example": "your_database"
    }
   }
  },
  "fetch": {
   "displayName": "fetch",
   "description": "A Model Context Protocol server that provides web content fetching capabilities.",
   "categories": [
    "Web Services"
   ],
   "tags": [
    "Fetch",
    "Server"
   ],
   "repository": "https://github.com/modelcontextprotocol/servers",
   "homepage": "https://github.com/modelcontextprotocol/servers/tree/main/src/fetch",
   "official": true,
   "methods": [
    {
     "type": "uvx",
     "command": "uvx",
     "args": [
      "mcp-server-fetch"
     ],
     "env": {}
    },
    {
     "type": "docker",
     "command": "docker",
     "args": [
      "run",
      "--rm",
      "-i",
      "mcp/fetch"
     ],
     "env": {}
    }
   ],
   "variables": {}
  },
  "inoyu": {
   "displayName": "Inoyu Apache Unomi",
   "description": "Interact with an Apache Unomi CDP customer data platform to retrieve and update customer profiles",
   "categories": [
    "Databases"
   ],
   "tags": [
    "Apache Unomi",
    "User Profiles",
    "Context Management"
   ],
   "repository": "https://github.com/sergehuber/inoyu-mcp-unomi-server",
   "homepage": "https://github.com/sergehuber/inoyu-mcp-unomi-server",
   "official": false,
   "methods": [
    {
     "type": "npm",
     "command": "npx",
     "args": [
      "@inoyu/mcp-unomi-server"
     ],
     "env": {
      "UNOMI_BASE_URL": null,
      "UNOMI_USERNAME": null,
      "UNOMI_PASSWORD": null,
      "UNOMI_PROFILE_ID": null,
      "UNOMI_KEY": null,
      "UNOMI_EMAIL": null,
      "UNOMI_SOURCE_ID": null
     }
    }
   ],
   "variables": {
    "UNOMI_BASE_URL": {
     "description": "The base URL of your Apache Unomi server (e.g., http://your-unomi-server:8181)",
     "required": true,
     "example": ""
    },
    "UNOMI_USERNAME": {
     "description": "The username to authenticate with the Apache Unomi server, default is 'karaf'",
     "required": true,
     "example": ""
    },
    "UNOMI_PASSWORD": {
     "description": "The password to authenticate with the Apache Unomi server, default is 'karaf'",
     "required": true,
     "example": ""
    },
    "UNOMI_PROFILE_ID": {
     "description": "The ID of the user profile to be used for context management",
     "required": false,
     "example": ""
    },
    "UNOMI_KEY": {
     "description": "The authorization key required for secured operations with the Unomi server, defaults to '670c26d1cc413346c3b2fd9ce65dab41'",
     "required": false,
     "example": ""
    },
    "UNOMI_EMAIL": {
     "description": "The email address associated with the user profile, used for profile lookup",
     "required": false,
     "example": ""
    },
    "UNOMI_SOURCE_ID": {
     "description": "An identifier for the source of the request (e.g., claude-desktop)",
     "required": false,
     "example": ""
    }
   }
  },
  "everything": {
   "displayName": "Everything",
   "description": "This MCP server exercises all the features of the MCP protocol. It is a test server for builders of MCP clients.",
   "categories": [
    "MCP Tools"
   ],
   "tags": [
    "testing",
    "reference",
    "example",
    "demo"
   ],
   "repository": "https://github.com/modelcontextprotocol/servers",
   "homepage": "https://github.com/modelcontextprotocol/servers/tree/main/src/everything#readme",
   "official": true,
   "methods": [
    {
     "type": "npm",
     "command": "npx",
     "args": [
      "-y",
      "@modelcontextprotocol/server-everything"
     ],
     "env": {}
    }
   ],
   "variables": {}
  },
  "godot": {
   "displayName": "Godot",
   "description": "A MCP server providing comprehensive Godot engine integration for project editing, debugging, and scene management.",
   "categories": [
    "Media Creation"
   ],
   "tags": [
    "Godot",
    "AI",
    "Game"
   ],
   "repository": "https://github.com/Coding-Solo/godot-mcp",
   "homepage": "https://github.com/Coding-Solo/godot-mcp",
   "official": false,
   "methods": [
    {
     "type": "npm",
     "command": "npx",
     "args": [
      "-y",
      "https://github.com/Coding-Solo/godot-mcp"
     ],
     "env": {}
    }
   ],
   "variables": {}
  },
  "aws": {
   "displayName": "AWS",
   "description": "Perform operations on your AWS resources using an LLM.",
   "categories": [
    "Dev Tools"
   ],
   "tags": [
    "s3",
    "dynamodb",
    "aws"
   ],
   "repository": "https://github.com/rishikavikondala/mcp-server-aws",
   "homepage": "https://github.com/rishikavikondala/mcp-server-aws",
   "official": false,
   "methods": [
    {
     "type": "uvx",
     "command": "uvx",
     "args": [
      "--from",
      "git+https://github.com/rishikavikondala/mcp-server-aws",
      "mcp-server-aws"
     ],
     "env": {}
    }
   ],
   "variables": {
    "AWS_ACCESS_KEY_ID": {
     "description": "This is the access key ID for your AWS account, required for authenticating requests to AWS services.",
     "required": true,
     "example": "AKIAEXAMPLE"
    },
    "AWS_SECRET_ACCESS_KEY": {
     "description": "This is the secret access key for your AWS account, used in conjunction with the access key ID to authenticate requests.",
     "required": true,
     "example": "wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY"
    },
    "AWS_REGION": {
     "description": "This specifies the AWS region you want to use for your operations. It defaults to `us-east-1` if not provided.",
     "required": false,
     "example": "us-west-2"
    }
   }
  },
  "github-actions": {
   "displayName": "GitHub Actions",
   "description": "A Model Context Protocol (MCP) server for interacting with Github Actions.",
   "categories": [
    "Dev Tools"
   ],
   "tags": [
    "GitHub Actions",
    "Workflow Management",
    "Automation"
   ],
   "repository": "https://github.com/ko1ynnky/github-actions-mcp-server",
   "homepage": "https://github.com/ko1ynnky/github-actions-mcp-server",
   "official": false,
   "methods": [
    {
     "type": "npm",
     "command": "npx",
     "args": [
      "-y",
      "https://github.com/ko1ynnky/github-actions-mcp-server"
     ],
     "env": {
      "GITHUB_PERSONAL_ACCESS_TOKEN": null
     }
    }
   ],
   "variables": {
    "GITHUB_PERSONAL_ACCESS_TOKEN": {
     "description": "A personal access token required for authentication with GitHub API, used to access user repositories and perform actions.",
     "required": true,
     "example": "ghp_16CharTokenHere"
    }
   }
  },
  "docker": {
   "displayName": "Docker Integration",
   "description": "Integrate with Docker to manage containers, images, volumes, and networks.",
   "categories": [
    "Dev Tools"
   ],
   "tags": [
    "Docker",
    "Container",
    "Image",
    "Volume",
    "Network"
   ],
   "repository": "https://github.com/ckreiling/mcp-server-docker",
   "homepage": "",
   "official": false,
   "methods": [
    {
     "type": "uvx",
     "command": "uvx",
     "args": [
      "--from",
      "git+https://github.com/ckreiling/mcp-server-docker",
      "mcp-server-docker"
     ],
     "env": {}
    }
   ],
   "variables": {}
  },
  "opik-mcp": {
   "displayName": "Opik MCP Server",
   "description": "Query and analyze your Opik logs, traces, prompts and all other telemtry data from your LLMs in natural language.",
   "categories": [
    "MCP Tools"
   ],
   "tags": [
    "MCP",
    "Opik",
    "IDE Integration"
   ],
   "repository": "https://github.com/comet-ml/opik-mcp",
   "homepage": "https://www.comet.com/site/products/opik/",
   "official": true,
   "methods": [
    {
     "type": "custom",
     "command": "node",
     "args": [
      "/path/to/opik-mcp/build/index.js"
     ],
     "env": {
      "OPIK_API_BASE_URL": "https://www.comet.com/opik/api",
      "OPIK_API_KEY": "YOUR_API_KEY",
      "OPIK_WORKSPACE_NAME": "default"
     }
    }
   ],
   "variables": {
    "apiUrl": {
     "description": "URL for the Opik API",
     "required": true,
     "example": "https://www.comet.com/opik/api"
    },
    "apiKey": {
     "description": "Your Opik API key",
     "required": true,
     "example": "YOUR_API_KEY"
    },
    "workspace": {
     "description": "Workspace name",
     "required": true,
     "example": "default"
    },
    "debug": {
     "description": "Enable debug mode",
     "required": false,
     "example": "true"
    }
   }
  },
  "openrpc": {
   "displayName": "OpenRPC",
   "description": "Interact with and discover JSON-RPC APIs via [OpenRPC](https://open-rpc.org/).",
   "categories": [
    "Dev Tools"
   ],
   "tags": [
    "OpenRPC",
    "JSON-RPC"
   ],
   "repository": "https://github.com/shanejonas/openrpc-mpc-server",
   "homepage": "https://github.com/shanejonas/openrpc-mpc-server",
   "official": false,
   "methods": [
    {
     "type": "npm",
     "command": "npx",
     "args": [
      "-y",
      "openrpc-mpc-server"
     ],
     "env": {}
    }
   ],
   "variables": {}
  },
  "xero-mcp-server": {
   "displayName": "Xero MCP Server",
   "description": "This is a Model Context Protocol (MCP) server implementation for Xero. It provides a bridge between the MCP protocol and Xero's API, allowing for standardized access to Xero's accounting and business features.",
   "categories": [
    "Finance"
   ],
   "tags": [
    "xero",
    "accounting",
    "mcp",
    "oauth2"
   ],
   "repository": "https://github.com/XeroAPI/xero-mcp-server",
   "homepage": "https://github.com/XeroAPI/xero-mcp-server",
   "official": true,
   "methods": [
    {
     "type": "npm",
     "command": "npx",
     "args": [
      "-y",
      "@xeroapi/xero-mcp-server@latest"
     ],
     "env": {
      "XERO_CLIENT_ID": "your_client_id_here",
      "XERO_CLIENT_SECRET": "your_client_secret_here"
     }
    }
   ],
   "variables": {
    "XERO_CLIENT_ID": {
     "description": "Your Xero API client ID from your developer account",
     "required": true,
     "example": "your_client_id_here"
    },
    "XERO_CLIENT_SECRET": {
     "description": "Your Xero API client secret from your developer account",
     "required": true,
     "example": "your_client_secret_here"
    }
   }
  },
  "home-assistant": {
   "displayName": "Hass",
   "description": "Docker-ready MCP server for Home Assistant with entity management, domain summaries, automation support, and guided conversations. Includes pre-built container images for easy installation.",
   "categories": [
    "System Tools"
   ],
   "tags": [
    "Home Assistant",
    "Claude",
    "LLM",
    "Automation"
   ],
   "repository": "https://github.com/voska/hass-mcp",
   "homepage": "https://github.com/voska/hass-mcp",
   "official": false,
   "methods": [
    {
     "type": "docker",
     "command": "docker",
     "args": [
      "run",
      "-i",
      "--rm",
      "-e",
      "HA_URL",
      "-e",
      "HA_TOKEN",
      "voska/hass-mcp"
     ],
     "env": {
      "HA_URL": "http://homeassistant.local:8123",
      "HA_TOKEN": "YOUR_LONG_LIVED_TOKEN"
     }
    }
   ],
   "variables": {
    "HA_URL": {
     "description": "The URL for the Home Assistant instance where the Hass-MCP server will connect to retrieve and manage entities.",
     "required": true,
     "example": "http://homeassistant.local:8123"
    },
    "HA_TOKEN": {
     "description": "The Long-Lived Access Token from Home Assistant, required for authentication to access the Home Assistant API.",
     "required": true,
     "example": "YOUR_LONG_LIVED_TOKEN"
    }
   }
  },
  "mcp-neo4j-memory": {
   "displayName": "Neo4j MCP (Memory)",
   "description": "Neo4j graph database server (schema + read/write-cypher) and separate graph database backed memory",
   "categories": [
    "Databases"
   ],
   "tags": [
    "neo4j",
    "mcp",
    "knowledge graph"
   ],
   "repository": "https://github.com/neo4j-contrib/mcp-neo4j",
   "homepage": "https://github.com/neo4j-contrib/mcp-neo4j",
   "official": true,
   "methods": [
    {
     "type": "uvx",
     "command": "uvx",
     "args": [
      "mcp-neo4j-memory",
      "--db-url",
      "${NEO4J_URI}",
      "--username",
      "${NEO4J_USERNAME}",
      "--password",
      "${NEO4J_PASSWORD}"
     ],
     "env": {}
    }
   ],
   "variables": {
    "NEO4J_URI": {
     "description": "Neo4j database URL",
     "required": true,
     "example": "neo4j+s://<username>:<password>@<instance>.databases.neo4j.com:7687"
    },
    "NEO4J_USERNAME": {
     "description": "Neo4j username",
     "required": true,
     "example": "<username>"
    },
    "NEO4J_PASSWORD": {
     "description": "Neo4j password",
     "required": true,
     "example": "<password>"
    }
   }
  },
  "kagimcp": {
   "displayName": "Kagi MCP server",
   "description": "<a href=\"https://glama.ai/mcp/servers/xabrrs4bka\">",
   "categories": [
    "Analytics"
   ],
   "tags": [
    "search",
    "summarizer"
   ],
   "repository": "https://github.com/kagisearch/kagimcp",
   "homepage": "https://github.com/kagisearch/kagimcp",
   "official": true,
   "methods": [
    {
     "type": "uvx",
     "command": "uvx",
     "args": [
      "kagimcp"
     ],
     "env": {
      "KAGI_API_KEY": "YOUR_API_KEY_HERE",
      "KAGI_SUMMARIZER_ENGINE": "YOUR_ENGINE_CHOICE_HERE"
     }
    }
   ],
   "variables": {
    "KAGI_API_KEY": {
     "description": "Your Kagi API key",
     "required": true,
     "example": "YOUR_API_KEY_HERE"
    },
    "KAGI_SUMMARIZER_ENGINE": {
     "description": "Summarizer engine choice (defaults to 'cecil')",
     "required": false,
     "example": "daphne"
    },
    "FASTMCP_LOG_LEVEL": {
     "description": "Level of logging",
     "required": false,
     "example": "ERROR"
    }
   }
  },
  "agentkit": {
   "displayName": "Chargebee Model Context Protocol (MCP) Server",
   "description": "MCP Server that connects AI agents to Chargebee platform.",
   "categories": [
    "Dev Tools"
   ],
   "tags": [
    "MCP",
    "Chargebee",
    "AI",
    "LLM"
   ],
   "repository": "https://github.com/chargebee/agentkit",
   "homepage": "https://github.com/chargebee/agentkit",
   "official": true,
   "methods": [
    {
     "type": "npm",
     "command": "npx",
     "args": [
      "-y",
      "@chargebee/mcp@latest"
     ],
     "env": {}
    }
   ],
   "variables": {}
  },
  "ns-travel-information": {
   "displayName": "NS Travel Information",
   "description": "Access Dutch Railways (NS) real-time train travel information and disruptions through the official NS API.",
   "categories": [
    "Professional Apps"
   ],
   "tags": [
    "NS",
    "Train",
    "Travel",
    "Information"
   ],
   "repository": "https://github.com/r-huijts/ns-mcp-server",
   "homepage": "https://github.com/r-huijts/ns-mcp-server",
   "official": false,
   "methods": [
    {
     "type": "npm",
     "command": "npx",
     "args": [
      "-y",
      "ns-mcp-server"
     ],
     "env": {
      "NS_API_KEY": null
     }
    }
   ],
   "variables": {
    "NS_API_KEY": {
     "description": "Your NS API key, required for authenticating API requests to access NS travel information.",
     "required": true,
     "example": "your_api_key_here"
    }
   }
  },
  "unity-catalog": {
   "displayName": "Unity Catalog",
   "description": "An MCP server that enables LLMs to interact with Unity Catalog AI, supporting CRUD operations on Unity Catalog Functions and executing them as MCP tools.",
   "categories": [
    "Dev Tools"
   ],
   "tags": [
    "Unity Catalog",
    "API",
    "Functions"
   ],
   "repository": "https://github.com/ognis1205/mcp-server-unitycatalog",
   "homepage": "https://github.com/ognis1205/mcp-server-unitycatalog",
   "official": false,
   "methods": [
    {
     "type": "uvx",
     "command": "uvx",
     "args": [
      "--from",
      "git+https://github.com/ognis1205/mcp-server-unitycatalog",
      "mcp-server-unitycatalog",
      "--uc_server",
      "${UC_SERVER}",
      "--uc_catalog",
      "${UC_CATALOG}",
      "--uc_schema",
      "${UC_SCHEMA}"
     ],
     "env": {}
    },
    {
     "type": "docker",
     "command": "docker",
     "args": [
      "run",
      "--rm",
      "-i",
      "mcp/unitycatalog",
      "--uc_server",
      "${UC_SERVER}",
      "--uc_catalog",
      "${UC_CATALOG}",
      "--uc_schema",
      "${UC_SCHEMA}"
     ],
     "env": {}
    }
   ],
   "variables": {
    "UC_SERVER": {
     "description": "The base URL of the Unity Catalog server.",
     "required": true,
     "example": "https://my-unity-catalog.com"
    },
    "UC_CATALOG": {
     "description": "The name of the Unity Catalog catalog.",
     "required": true,
     "example": "my_catalog"
    },
    "UC_SCHEMA": {
     "description": "The name of the schema within a Unity Catalog catalog.",
     "required": true,
     "example": "my_schema"
    }
   }
  },
  "typesense": {
   "displayName": "Typesense",
   "description": "A Model Context Protocol (MCP) server implementation that provides AI models with access to Typesense search capabilities. This server enables LLMs to discover, search, and analyze data stored in Typesense collections.",
   "categories": [
    "Databases"
   ],
   "tags": [
    "Typesense",
    "Server",
    "Search"
   ],
   "repository": "https://github.com/suhail-ak-s/mcp-typesense-server",
   "homepage": "https://github.com/suhail-ak-s/mcp-typesense-server",
   "official": false,
   "methods": [
    {
     "type": "npm",
     "command": "npx",
     "args": [
      "-y",
      "typesense-mcp-server",
      "--host",
      "${TYPESENSE_HOST}",
      "--port",
      "8108",
      "--protocol",
      "http",
      "--api-key",
      "${API_KEY}"
     ],
     "env": {}
    }
   ],
   "variables": {
    "TYPESENSE_HOST": {
     "description": "The host for the Typesense server. This is the address where your Typesense server is running.",
     "required": true,
     "example": "localhost"
    },
    "API_KEY": {
     "description": "The API key for accessing the Typesense server. This is needed for authentication when making requests to the server.",
     "required": true,
     "example": "your_api_key_here"
    }
   }
  },
  "chatsum": {
   "displayName": "Chat Summary",
   "description": "Query and Summarize chat messages with LLM. by [mcpso](https://mcp.so/)",
   "categories": [
    "Messaging"
   ],
   "tags": [
    "chat",
    "summary"
   ],
   "repository": "https://github.com/mcpso/mcp-server-chatsum",
   "homepage": "https://github.com/mcpso/mcp-server-chatsum",
   "official": false,
   "methods": [
    {
     "type": "npm",
     "command": "npx",
     "args": [
      "-y",
      "https://github.com/mcpso/mcp-server-chatsum"
     ],
     "env": {
      "CHAT_DB_PATH": "path-to/mcp-server-chatsum/chatbot/data/chat.db"
     }
    }
   ],
   "variables": {
    "CHAT_DB_PATH": {
     "description": "Path to your chat database file that the server will use to store and retrieve chat messages.",
     "required": true,
     "example": "path-to/mcp-server-chatsum/chatbot/data/chat.db"
    }
   }
  },
  "descope": {
   "displayName": "Descope",
   "description": "An MCP server to integrate with [Descope](https://descope.com/) to search audit logs, manage users, and more.",
   "categories": [
    "System Tools"
   ],
   "tags": [
    "Descope",
    "API",
    "Server"
   ],
   "repository": "https://github.com/descope-sample-apps/descope-mcp-server",
   "homepage": "https://github.com/descope-sample-apps/descope-mcp-server",
   "official": false,
   "methods": [
    {
     "type": "npm",
     "command": "npx",
     "args": [
      "-y",
      "https://github.com/descope-sample-apps/descope-mcp-server"
     ],
     "env": {
      "DESCOPE_PROJECT_ID": null,
      "DESCOPE_MANAGEMENT_KEY": null
     }
    }
   ],
   "variables": {
    "DESCOPE_PROJECT_ID": {
     "description": "Your Descope Project ID",
     "required": true,
     "example": "12345-abcde-67890-fghij"
    },
    "DESCOPE_MANAGEMENT_KEY": {
     "description": "Your Descope Management Key",
     "required": true,
     "example": "sk_test_…example…"
    }
   }
  },
  "integration-app": {
   "displayName": "Integration App MCP Server",
   "description": "This is an implementation of the [Model Context Protocol (MCP) server](https://modelcontextprotocol.org/) that exposes tools powered by [Integration App](https://integration.app).",
   "categories": [
    "MCP Tools"
   ],
   "tags": [
    "integration",
    "tools",
    "mcp"
   ],
   "repository": "https://github.com/integration-app/mcp-server",
   "homepage": "https://integration.app",
   "official": true,
   "methods": [
    {
     "type": "npm",
     "command": "npx",
     "args": [
      "-y",
      "@integration-app/mcp-server"
     ],
     "env": {
      "INTEGRATION_APP_TOKEN": "<your-integration-app-token>",
      "INTEGRATION_KEY": "<integration-key>"
     }
    }
   ],
   "variables": {
    "INTEGRATION_APP_TOKEN": {
     "description": "Token for accessing Integration App API",
     "required": true,
     "example": "your-integration-app-token"
    },
    "INTEGRATION_KEY": {
     "description": "Key of the integration you want to use tools for",
     "required": true,
     "example": "your-integration-key"
    }
   }
  },
  "mcp-jetbrains": {
   "displayName": "JetBrains MCP Proxy Server",
   "description": "The server proxies requests from client to JetBrains IDE.",
   "categories": [
    "Dev Tools"
   ],
   "tags": [
    "jetbrains",
    "ide",
    "proxy"
   ],
   "repository": "https://github.com/JetBrains/mcp-jetbrains",
   "homepage": "https://github.com/JetBrains/mcp-jetbrains",
   "official": true,
   "methods": [
    {
     "type": "npm",
     "command": "npx",
     "args": [
      "-y",
      "@jetbrains/mcp-proxy"
     ],
     "env": {}
    }
   ],
   "variables": {
    "IDE_PORT": {
     "description": "Port of IDE's built-in webserver",
     "required": false,
     "example": "<port of IDE's built-in webserver>"
    },
    "HOST": {
     "description": "Host/address of IDE's built-in webserver (defaults to 127.0.0.1)",
     "required": false,
     "example": "<host/address of IDE's built-in webserver>"
    },
    "LOG_ENABLED": {
     "description": "Enable logging",
     "required": false,
     "example": "true"
    }
   }
  }
 }
}
